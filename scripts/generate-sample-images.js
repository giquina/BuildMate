// Script to generate and save sample architectural images
// Run once to create pre-generated image library

const fs = require('fs');
const path = require('path');

const architecturalStyles = [
  {
    id: 'modern',
    name: 'Modern',
    prompts: [
      'modern UK house with large windows, clean lines, contemporary architecture, professional photography, high quality, detailed, realistic lighting, british residential design',
      'sleek modern UK home with glass facade, minimalist design, professional architectural photography',
      'contemporary British house with steel and concrete, urban design, professional real estate photography'
    ]
  },
  {
    id: 'traditional',
    name: 'Traditional', 
    prompts: [
      'traditional British house, classic design, period features, red brick, pitched roof, professional photography, high quality, detailed, realistic lighting, UK residential architecture',
      'classic English cottage with thatched roof, stone walls, country garden, professional photography',
      'Victorian terraced house in London, red brick facade, period features, professional architectural photography'
    ]
  },
  {
    id: 'contemporary',
    name: 'Contemporary',
    prompts: [
      'contemporary UK house, mixed materials, current trends, glass and steel, innovative design, professional photography, high quality, detailed, realistic lighting, modern british architecture',
      'cutting-edge British home with sustainable features, solar panels, green design, professional photography',
      'innovative UK house design with unique geometry, mixed textures, professional architectural photography'
    ]
  },
  {
    id: 'victorian',
    name: 'Victorian',
    prompts: [
      'Victorian UK house, period elegance, ornate details, bay windows, decorative features, professional photography, high quality, detailed, realistic lighting, historic british architecture',
      'grand Victorian mansion with turrets, ornate stonework, period landscaping, professional photography',
      'restored Victorian terrace with original features, sash windows, period charm, professional architectural photography'
    ]
  }
];

async function generateAndSaveImages() {
  console.log('🏠 Generating sample architectural images for BuildMate AI');
  console.log('This will create a one-time library of pre-generated images.');
  console.log('');

  // Create directory structure
  const imagesDir = path.join(process.cwd(), 'public', 'images', 'architecture');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log('✅ Created directory: public/images/architecture/');
  }

  let totalCost = 0;
  let successCount = 0;

  for (const style of architecturalStyles) {
    console.log(`📸 Generating images for ${style.name} style...`);
    
    for (let i = 0; i < style.prompts.length; i++) {
      const prompt = style.prompts[i];
      const filename = `${style.id}-${i + 1}.jpg`;
      const filepath = path.join(imagesDir, filename);

      try {
        console.log(`  🔄 Generating: ${filename}`);
        
        // Make API call to our image generation endpoint
        const response = await fetch('http://localhost:3000/api/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            style: style.id,
            prompt: prompt
          })
        });

        const data = await response.json();

        if (data.success && data.imageUrl) {
          // Download and save the image
          const imageResponse = await fetch(data.imageUrl);
          const buffer = await imageResponse.arrayBuffer();
          
          fs.writeFileSync(filepath, Buffer.from(buffer));
          
          console.log(`  ✅ Saved: ${filename}`);
          successCount++;
          totalCost += 0.002; // £0.002 per image
        } else {
          console.log(`  ❌ Failed: ${filename} - ${data.error || 'Unknown error'}`);
        }
        
        // Wait 2 seconds between generations to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        console.log(`  ❌ Error generating ${filename}:`, error.message);
      }
    }
    
    console.log('');
  }

  console.log('🎉 Image generation complete!');
  console.log(`📊 Successfully generated: ${successCount} images`);
  console.log(`💰 Total cost: £${totalCost.toFixed(3)}`);
  console.log(`💡 This will save £${(totalCost * 250).toFixed(2)} per 1,000 users!`);
  console.log('');
  console.log('📁 Images saved to: public/images/architecture/');
  console.log('🚀 Ready to update configure page to use pre-generated images!');
}

// Export the image mapping for use in components
const imageMapping = {
  modern: ['modern-1.jpg', 'modern-2.jpg', 'modern-3.jpg'],
  traditional: ['traditional-1.jpg', 'traditional-2.jpg', 'traditional-3.jpg'],
  contemporary: ['contemporary-1.jpg', 'contemporary-2.jpg', 'contemporary-3.jpg'],
  victorian: ['victorian-1.jpg', 'victorian-2.jpg', 'victorian-3.jpg']
};

console.log('Generated image mapping:', JSON.stringify(imageMapping, null, 2));

if (require.main === module) {
  generateAndSaveImages().catch(console.error);
}

module.exports = { generateAndSaveImages, imageMapping };