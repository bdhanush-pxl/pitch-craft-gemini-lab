
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
    const { transcript } = await req.json()
    
    if (!transcript) {
      throw new Error('No transcript provided')
    }

    const prompt = `Based on the following founder story transcript, create a compelling pitch deck structure following Guy Kawasaki's methodology. Return the response as a JSON object with the following structure:

{
  "oneLiner": "A compelling one-sentence description of the company",
  "structure": {
    "problem": "Clear problem statement",
    "solution": "Your solution description", 
    "market": "Market size and opportunity",
    "competition": "Competitive landscape analysis",
    "businessModel": "How you make money",
    "traction": "Key metrics and progress",
    "team": "Team background and expertise",
    "financials": "Financial projections or current state",
    "funding": "Funding ask and use of funds",
    "timeline": "Key milestones and roadmap"
  }
}

Transcript: ${transcript}

Please analyze this transcript and generate a professional pitch deck structure. Be specific and actionable in each section.`

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${Deno.env.get('GEMINI_API_KEY')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${await response.text()}`)
    }

    const result = await response.json()
    const generatedText = result.candidates[0].content.parts[0].text
    
    // Extract JSON from the response
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from Gemini response')
    }
    
    const pitchData = JSON.parse(jsonMatch[0])

    return new Response(
      JSON.stringify(pitchData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Pitch generation error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
