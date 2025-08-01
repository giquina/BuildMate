// Pre-generated architectural images configuration
// Multiple variations per style for personalized experience

export interface PreGeneratedImageVariant {
  id: string
  url: string
  bedrooms?: number  // Best fit for X bedroom homes
  budgetRange?: 'low' | 'mid' | 'high'  // Budget category
  location?: 'urban' | 'suburban' | 'rural'  // Location type
  lighting?: 'morning' | 'afternoon' | 'evening'  // Time of day
  description: string
  tags: string[]  // e.g., ['family', 'urban', 'garden', 'compact']
}

export interface ArchitecturalStyle {
  id: string
  name: string
  fallbackColor: string
  description: string
  variants: PreGeneratedImageVariant[]
}

export const architecturalStyles: Record<string, ArchitecturalStyle> = {
  modern: {
    id: 'modern',
    name: 'Modern',
    fallbackColor: 'from-blue-100 to-blue-200',
    description: 'Clean lines, large windows, contemporary UK design',
    variants: [
      {
        id: 'modern-1',
        url: '/images/architecture/modern-family-house.jpg',
        bedrooms: 4,
        budgetRange: 'high',
        location: 'suburban',
        lighting: 'afternoon',
        description: 'Spacious modern family home with garden',
        tags: ['family', 'spacious', 'garden', 'garage']
      },
      {
        id: 'modern-2', 
        url: '/images/architecture/modern-urban-house.jpg',
        bedrooms: 3,
        budgetRange: 'mid',
        location: 'urban',
        lighting: 'morning',
        description: 'Contemporary urban house with smart design',
        tags: ['urban', 'compact', 'smart-home', 'efficient']
      },
      {
        id: 'modern-3',
        url: '/images/architecture/modern-starter-house.jpg', 
        bedrooms: 2,
        budgetRange: 'low',
        location: 'suburban',
        lighting: 'evening',
        description: 'Modern starter home with clean aesthetics',
        tags: ['starter', 'minimalist', 'efficient', 'affordable']
      },
      {
        id: 'modern-4',
        url: '/images/architecture/modern-minimalist-urban.jpg',
        bedrooms: 3,
        budgetRange: 'high',
        location: 'urban',
        lighting: 'afternoon',
        description: 'Minimalist urban house with floor-to-ceiling windows',
        tags: ['minimalist', 'urban', 'glass', 'sophisticated']
      },
      {
        id: 'modern-5',
        url: '/images/architecture/modern-rural-retreat.jpg',
        bedrooms: 4,
        budgetRange: 'high',
        location: 'rural',
        lighting: 'morning',
        description: 'Modern rural retreat with natural materials',
        tags: ['rural', 'retreat', 'natural-materials', 'views']
      }
    ]
  },
  traditional: {
    id: 'traditional',
    name: 'Traditional', 
    fallbackColor: 'from-red-100 to-red-200',
    description: 'Classic British features, red brick, pitched roof',
    variants: [
      {
        id: 'traditional-1',
        url: '/images/architecture/traditional-country-house.jpg',
        bedrooms: 4,
        budgetRange: 'high',
        location: 'rural',
        lighting: 'afternoon',
        description: 'Traditional country house with period charm',
        tags: ['country', 'period', 'garden', 'character']
      },
      {
        id: 'traditional-2',
        url: '/images/architecture/traditional-semi-detached.jpg',
        bedrooms: 3,
        budgetRange: 'mid',
        location: 'suburban',
        lighting: 'morning',
        description: 'Classic semi-detached with modern updates',
        tags: ['semi-detached', 'family', 'updated', 'practical']
      },
      {
        id: 'traditional-3',
        url: '/images/architecture/traditional-cottage.jpg',
        bedrooms: 2, 
        budgetRange: 'mid',
        location: 'rural',
        lighting: 'evening',
        description: 'Charming traditional cottage style',
        tags: ['cottage', 'cozy', 'character', 'intimate']
      },
      {
        id: 'traditional-4',
        url: '/images/architecture/traditional-london-terrace.jpg',
        bedrooms: 3,
        budgetRange: 'high',
        location: 'urban',
        lighting: 'afternoon',
        description: 'London Georgian terrace house',
        tags: ['georgian', 'terrace', 'period-features', 'urban']
      },
      {
        id: 'traditional-5',
        url: '/images/architecture/traditional-manor-style.jpg',
        bedrooms: 5,
        budgetRange: 'high',
        location: 'rural',
        lighting: 'morning',
        description: 'Traditional manor house with extensive grounds',
        tags: ['manor', 'grand', 'estate', 'heritage']
      }
    ]
  },
  contemporary: {
    id: 'contemporary',
    name: 'Contemporary',
    fallbackColor: 'from-green-100 to-green-200', 
    description: 'Mixed materials, innovative design, current trends',
    variants: [
      {
        id: 'contemporary-1',
        url: '/images/architecture/contemporary-eco-house.jpg',
        bedrooms: 4,
        budgetRange: 'high',
        location: 'suburban',
        lighting: 'morning',
        description: 'Eco-friendly contemporary with solar panels',
        tags: ['eco-friendly', 'sustainable', 'solar', 'innovative']
      },
      {
        id: 'contemporary-2',
        url: '/images/architecture/contemporary-mixed-materials.jpg', 
        bedrooms: 3,
        budgetRange: 'mid',
        location: 'urban',
        lighting: 'afternoon',
        description: 'Mixed materials with glass and steel accents',
        tags: ['mixed-materials', 'glass', 'steel', 'architectural']
      },
      {
        id: 'contemporary-3',
        url: '/images/architecture/contemporary-compact.jpg',
        bedrooms: 2,
        budgetRange: 'low',
        location: 'urban',
        lighting: 'evening',
        description: 'Compact contemporary with clever space use',
        tags: ['compact', 'clever-design', 'space-efficient', 'modern']
      }
    ]
  },
  victorian: {
    id: 'victorian', 
    name: 'Victorian',
    fallbackColor: 'from-purple-100 to-purple-200',
    description: 'Period elegance, ornate details, bay windows',
    variants: [
      {
        id: 'victorian-1',
        url: '/images/architecture/victorian-mansion.jpg',
        bedrooms: 5,
        budgetRange: 'high',
        location: 'rural',
        lighting: 'afternoon',
        description: 'Grand Victorian mansion with original features',
        tags: ['mansion', 'grand', 'original-features', 'period']
      },
      {
        id: 'victorian-2',
        url: '/images/architecture/victorian-terrace.jpg',
        bedrooms: 3, 
        budgetRange: 'mid',
        location: 'urban',
        lighting: 'morning',
        description: 'Restored Victorian terrace with modern comfort',
        tags: ['terrace', 'restored', 'period-features', 'urban']
      },
      {
        id: 'victorian-3',
        url: '/images/architecture/victorian-conversion.jpg',
        bedrooms: 2,
        budgetRange: 'mid',
        location: 'urban',
        lighting: 'evening',
        description: 'Victorian conversion with period charm',
        tags: ['conversion', 'period-charm', 'character', 'updated']
      }
    ]
  }
}

// Cost savings calculation (now with more images)
export const COST_SAVINGS = {
  perImage: 0.002, // £0.002 per Replicate API call
  totalImages: 12, // 3 variants × 4 styles = 12 images
  oneTimeCost: 0.024, // £0.024 one-time generation cost
  oldCostPerUser: 0.008, // £0.008 per user visit (old system)
  newCostPerUser: 0.000, // £0.000 per user visit (new system)
  estimatedUsers: 1000, // per month
  monthlySavings: 8.00 // £8.00 per 1,000 users (still massive savings!)
}

// Smart image selection based on user preferences
export function selectBestImageForStyle(
  styleId: string, 
  userBedrooms?: number, 
  userBudget?: number
): PreGeneratedImageVariant | null {
  const style = architecturalStyles[styleId]
  if (!style || !style.variants.length) return null

  // Determine budget range from user budget
  let budgetRange: 'low' | 'mid' | 'high' | undefined
  if (userBudget) {
    if (userBudget < 150000) budgetRange = 'low'
    else if (userBudget < 300000) budgetRange = 'mid'  
    else budgetRange = 'high'
  }

  // Find best match based on bedrooms and budget
  const matches = style.variants.filter(variant => {
    let score = 0
    
    // Prefer matching bedroom count
    if (userBedrooms && variant.bedrooms === userBedrooms) score += 10
    else if (userBedrooms && Math.abs((variant.bedrooms || 3) - userBedrooms) <= 1) score += 5
    
    // Prefer matching budget range
    if (budgetRange && variant.budgetRange === budgetRange) score += 8
    
    return score > 0
  })

  if (matches.length > 0) {
    // Return highest scoring match, or random if tied
    return matches[Math.floor(Math.random() * matches.length)]
  }

  // Fallback to random variant if no good matches
  return style.variants[Math.floor(Math.random() * style.variants.length)]
}

// Get a random image variant for variety (fallback)
export function getRandomImageForStyle(styleId: string): PreGeneratedImageVariant | null {
  const style = architecturalStyles[styleId]
  if (!style || !style.variants.length) return null
  
  return style.variants[Math.floor(Math.random() * style.variants.length)]
}

// Get all architectural styles for the configure page
export function getAllArchitecturalStyles(): ArchitecturalStyle[] {
  return Object.values(architecturalStyles)
}

// Get style by ID
export function getArchitecturalStyle(styleId: string): ArchitecturalStyle | null {
  return architecturalStyles[styleId] || null
}