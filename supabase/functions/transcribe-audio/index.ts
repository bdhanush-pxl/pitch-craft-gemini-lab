
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('=== Transcription request received ===');
    
    // Check if Gemini API key is available
    const geminiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiKey) {
      console.error('GEMINI_API_KEY environment variable is not set');
      throw new Error('Gemini API key is not configured. Please contact support.');
    }
    
    console.log('Gemini API key is configured');
    
    const { audio } = await req.json()
    
    if (!audio) {
      console.error('No audio data provided in request');
      throw new Error('No audio data provided')
    }

    console.log('Audio data received, length:', audio.length);

    // Simple base64 validation
    if (!audio.match(/^[A-Za-z0-9+/]*={0,2}$/)) {
      console.error('Invalid base64 format detected');
      throw new Error('Invalid audio data format');
    }

    console.log('Sending request to Gemini API for transcription...');

    // Use Gemini API for audio transcription
    const prompt = `Please transcribe the following audio content. Return only the transcribed text without any additional commentary or formatting.`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log('Request timeout after 30 seconds');
      controller.abort();
    }, 30000);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: "audio/webm",
                  data: audio
                }
              }
            ]
          }],
          generationConfig: {
            temperature: 0.1,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log('Gemini response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API error response:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });

        if (response.status === 429) {
          throw new Error('Gemini API quota exceeded. Please try again later.');
        } else if (response.status === 401) {
          throw new Error('Gemini API key is invalid. Please check your API key configuration.');
        } else if (response.status === 413) {
          throw new Error('Audio file is too large. Please record a shorter audio clip.');
        } else {
          throw new Error(`Gemini API error (${response.status}): ${errorText}`);
        }
      }

      const result = await response.json();
      console.log('Transcription successful. Response keys:', Object.keys(result));

      if (!result.candidates || !result.candidates[0] || !result.candidates[0].content) {
        console.error('No transcription content in Gemini response:', result);
        throw new Error('No transcription content received from Gemini');
      }

      const transcribedText = result.candidates[0].content.parts[0].text;
      console.log('Transcription text length:', transcribedText?.length || 0);

      if (!transcribedText) {
        console.error('No transcription text in response');
        throw new Error('No transcription text received from Gemini');
      }

      console.log('=== Transcription completed successfully ===');
      
      return new Response(
        JSON.stringify({ text: transcribedText }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        console.error('Gemini request timed out after 30 seconds');
        throw new Error('Transcription request timed out. Please try with a shorter audio clip.');
      }
      
      console.error('Fetch error:', fetchError);
      throw fetchError;
    }

  } catch (error) {
    console.error('=== Transcription error ===');
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
