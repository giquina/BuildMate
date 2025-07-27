import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function generateHomeImage(prompt: string) {
  const output = await replicate.run(
    "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b" as any, {
      input: {
        prompt,
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
  );
  return output;
}

export async function generateConstructionImage(prompt: string, style: 'modern' | 'traditional' | 'industrial' = 'modern') {
  const enhancedPrompt = `${prompt}, ${style} UK architecture, professional photography, high quality, detailed, realistic lighting, construction industry standard`;
  
  const output = await replicate.run(
    "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b" as any, {
      input: {
        prompt: enhancedPrompt,
        negative_prompt: "blurry, low quality, cartoon, anime, painting, sketch, unrealistic",
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
  );
  return output;
}