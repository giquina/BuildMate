import { NextRequest, NextResponse } from 'next/server'
// import OpenAI from 'openai'

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// })

export async function POST(request: NextRequest) {
  try {
    const { projectData } = await request.json()
    
    // Mock AI generation for now - replace with real OpenAI API call
    const mockFloorplan = {
      id: `fp_${Date.now()}`,
      name: `${projectData.style} ${projectData.bedrooms}-Bedroom ${projectData.propertyType}`,
      totalArea: 120 + (projectData.bedrooms * 15),
      rooms: [
        { name: 'Living Room', area: 25, type: 'living' },
        { name: 'Kitchen', area: 15, type: 'kitchen' },
        { name: 'Dining Room', area: 12, type: 'dining' },
        ...Array.from({ length: projectData.bedrooms }, (_, i) => ({
          name: `Bedroom ${i + 1}`,
          area: i === 0 ? 16 : 12,
          type: 'bedroom'
        })),
        { name: 'Bathroom', area: 6, type: 'bathroom' }
      ],
      estimatedCost: Math.round(projectData.budget * 0.85),
      svgData: generateMockSVG(projectData),
      aiGenerated: true,
      createdAt: new Date().toISOString()
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000))

    return NextResponse.json({ 
      success: true, 
      floorplan: mockFloorplan 
    })

  } catch (error) {
    console.error('AI generation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate floorplan' },
      { status: 500 }
    )
  }
}

function generateMockSVG(projectData: any): string {
  const width = 400
  const height = 300
  
  let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`
  svg += `<rect width="${width}" height="${height}" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>`
  
  // Generate room rectangles based on project data
  const rooms = ['Living', 'Kitchen', 'Bed 1', 'Bed 2', 'Bath']
  if (projectData.bedrooms > 2) rooms.push('Bed 3')
  if (projectData.bedrooms > 3) rooms.push('Bed 4')
  
  rooms.forEach((room, index) => {
    const cols = Math.ceil(Math.sqrt(rooms.length))
    const x = (index % cols) * (width / cols) + 10
    const y = Math.floor(index / cols) * (height / Math.ceil(rooms.length / cols)) + 10
    const w = (width / cols) - 20
    const h = (height / Math.ceil(rooms.length / cols)) - 20
    
    svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="white" stroke="#cbd5e1" stroke-width="1"/>`
    svg += `<text x="${x + w/2}" y="${y + h/2}" text-anchor="middle" fill="#334155" font-size="12">${room}</text>`
  })
  
  svg += '</svg>'
  return svg
}