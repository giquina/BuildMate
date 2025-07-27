import { NextRequest, NextResponse } from 'next/server'
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
})

export async function POST(request: NextRequest) {
  try {
    const { style, prompt } = await request.json()
    
    // Define UK architectural style prompts
    const stylePrompts = {
      modern: "modern UK house with large windows, clean lines, contemporary architecture, professional photography, high quality, detailed, realistic lighting, british residential design",
      traditional: "traditional British house, classic design, period features, red brick, pitched roof, professional photography, high quality, detailed, realistic lighting, UK residential architecture",
      contemporary: "contemporary UK house, mixed materials, current trends, glass and steel, innovative design, professional photography, high quality, detailed, realistic lighting, modern british architecture",
      victorian: "Victorian UK house, period elegance, ornate details, bay windows, decorative features, professional photography, high quality, detailed, realistic lighting, historic british architecture"
    }

    // Get style-specific prompt or use custom prompt
    const enhancedPrompt = prompt || stylePrompts[style as keyof typeof stylePrompts] || stylePrompts.modern
    
    // Add UK construction industry context
    const finalPrompt = `${enhancedPrompt}, UK construction standards, architectural accuracy, professional real estate photography, sharp focus, excellent lighting`
    
    console.log('Generating image with prompt:', finalPrompt)

    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b" as any,
      {
        input: {
          prompt: finalPrompt,
          negative_prompt: "blurry, low quality, cartoon, anime, painting, sketch, unrealistic, distorted, ugly, deformed",
          width: 1024,
          height: 768,
          num_outputs: 1,
          scheduler: "K_EULER",
          num_inference_steps: 50,
          guidance_scale: 7.5,
          prompt_strength: 0.8,
          refine: "expert_ensemble_refiner",
          high_noise_frac: 0.8
        }
      }
    )

    console.log('Replicate output:', output)

    // Return the first image URL from the output array
    const imageUrl = Array.isArray(output) ? output[0] : output
    
    return NextResponse.json({ 
      success: true, 
      imageUrl,
      style,
      prompt: finalPrompt
    })

  } catch (error) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate image',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Optional: Add GET method for testing
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const style = searchParams.get('style') || 'modern'
  
  try {
    // Test with a quick generation
    const testPrompt = `${style} UK house, professional photography, high quality`
    
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b" as any,
      {
        input: {
          prompt: testPrompt,
          width: 512,
          height: 384, // Smaller for testing
          num_outputs: 1,
          num_inference_steps: 20 // Faster for testing
        }
      }
    )

    const imageUrl = Array.isArray(output) ? output[0] : output
    
    return NextResponse.json({ 
      success: true, 
      imageUrl,
      style,
      prompt: testPrompt,
      test: true
    })

  } catch (error) {
    console.error('Test generation error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Test generation failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}