
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

    // Convert base64 to binary with better error handling
    let binaryAudio;
    try {
      console.log('Starting base64 decoding...');
      
      // Decode base64 in chunks to handle large files
      const chunkSize = 32768;
      const chunks = [];
      
      for (let i = 0; i < audio.length; i += chunkSize) {
        const chunk = audio.slice(i, i + chunkSize);
        try {
          const decodedChunk = atob(chunk);
          const bytes = new Uint8Array(decodedChunk.length);
          
          for (let j = 0; j < decodedChunk.length; j++) {
            bytes[j] = decodedChunk.charCodeAt(j);
          }
          
          chunks.push(bytes);
        } catch (chunkError) {
          console.error(`Error decoding chunk ${i}:`, chunkError);
          throw new Error(`Base64 decoding failed at chunk ${i}`);
        }
      }
      
      // Combine all chunks
      const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
      binaryAudio = new Uint8Array(totalLength);
      let offset = 0;
      
      for (const chunk of chunks) {
        binaryAudio.set(chunk, offset);
        offset += chunk.length;
      }
      
      console.log('Binary audio created successfully, size:', binaryAudio.length, 'bytes');
    } catch (error) {
      console.error('Base64 decoding error:', error);
      throw new Error(`Failed to decode audio data: ${error.message}`);
    }
    
    if (binaryAudio.length === 0) {
      console.error('Binary audio is empty after decoding');
      throw new Error('Audio data is empty after decoding');
    }

    // Convert binary audio to base64 for Gemini API
    const base64Audio = btoa(String.fromCharCode(...binaryAudio));
    
    console.log('Sending request to Gemini API for transcription...');

    // Use Gemini API for audio transcription
    const prompt = `Please transcribe the following audio content. Return only the transcribed text without any additional commentary or formatting.`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log('Request timeout after 45 seconds');
      controller.abort();
    }, 45000);

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
                  data: base64Audio
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
        console.error('Gemini request timed out after 45 seconds');
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
