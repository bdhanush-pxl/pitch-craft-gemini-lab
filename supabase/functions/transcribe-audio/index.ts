
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
    
    // Check if OpenAI API key is available
    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiKey) {
      console.error('OPENAI_API_KEY environment variable is not set');
      throw new Error('OpenAI API key is not configured. Please contact support.');
    }
    
    console.log('OpenAI API key is configured');
    
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

    // Prepare form data
    console.log('Preparing form data for OpenAI API...');
    const formData = new FormData()
    const blob = new Blob([binaryAudio], { type: 'audio/webm' })
    formData.append('file', blob, 'audio.webm')
    formData.append('model', 'whisper-1')
    formData.append('language', 'en') // Specify English for better performance

    console.log('Sending request to OpenAI Whisper API...');

    // Send to OpenAI with timeout and better error handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log('Request timeout after 45 seconds');
      controller.abort();
    }, 45000); // 45 second timeout

    try {
      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiKey}`,
        },
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log('OpenAI response status:', response.status);
      console.log('OpenAI response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenAI API error response:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });

        // Handle specific error cases
        if (response.status === 429) {
          throw new Error('OpenAI API quota exceeded. Please add credits to your account or upgrade your plan.');
        } else if (response.status === 401) {
          throw new Error('OpenAI API key is invalid. Please check your API key configuration.');
        } else if (response.status === 413) {
          throw new Error('Audio file is too large. Please record a shorter audio clip.');
        } else {
          throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
        }
      }

      const result = await response.json();
      console.log('Transcription successful. Response keys:', Object.keys(result));
      console.log('Transcription text length:', result.text?.length || 0);

      if (!result.text) {
        console.error('No text in OpenAI response:', result);
        throw new Error('No transcription text received from OpenAI');
      }

      console.log('=== Transcription completed successfully ===');
      
      return new Response(
        JSON.stringify({ text: result.text }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        console.error('OpenAI request timed out after 45 seconds');
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
