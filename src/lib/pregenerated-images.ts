// Pre-generated architectural images configuration
// This eliminates the need for API calls on every page load

export interface PreGeneratedImage {
  id: string
  name: string
  url: string
  fallbackColor: string
  description: string
}

export const preGeneratedImages: Record<string, PreGeneratedImage> = {
  modern: {
    id: 'modern',
    name: 'Modern',
    url: '/images/architecture/modern-sample.jpg',
    fallbackColor: 'from-blue-100 to-blue-200',
    description: 'Clean lines, large windows, contemporary UK design'
  },
  traditional: {
    id: 'traditional', 
    name: 'Traditional',
    url: '/images/architecture/traditional-sample.jpg',
    fallbackColor: 'from-red-100 to-red-200',
    description: 'Classic British features, red brick, pitched roof'
  },
  contemporary: {
    id: 'contemporary',
    name: 'Contemporary', 
    url: '/images/architecture/contemporary-sample.jpg',
    fallbackColor: 'from-green-100 to-green-200',
    description: 'Mixed materials, innovative design, current trends'
  },
  victorian: {
    id: 'victorian',
    name: 'Victorian',
    url: '/images/architecture/victorian-sample.jpg', 
    fallbackColor: 'from-purple-100 to-purple-200',
    description: 'Period elegance, ornate details, bay windows'
  }
}

// Cost savings calculation
export const COST_SAVINGS = {
  perImage: 0.002, // £0.002 per Replicate API call
  imagesPerUser: 4, // 4 architectural styles
  costPerUser: 0.008, // £0.008 per user visit
  estimatedUsers: 1000, // per month
  monthlySavings: 8.00 // £8.00 per 1,000 users
}

// Check if we have a real image or should use fallback
export function getImageForStyle(styleId: string): PreGeneratedImage | null {
  return preGeneratedImages[styleId] || null
}

// Get all available styles
export function getAllStyles(): PreGeneratedImage[] {
  return Object.values(preGeneratedImages)
}