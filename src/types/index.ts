// Core BuildMate AI Types
export interface User {
  id: string
  email: string
  fullName: string
  postcode?: string
  subscriptionTier: 'free' | 'pro' | 'enterprise'
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  userId: string
  name: string
  type: 'new_build' | 'renovation' | 'extension'
  status: 'planning' | 'design' | 'materials' | 'professionals' | 'building' | 'completed'
  budget: number
  location: string
  postcode: string
  createdAt: string
  updatedAt: string
}

export interface Floorplan {
  id: string
  projectId: string
  name: string
  svgData: string
  specifications: {
    totalArea: number
    roomCount: number
    bedrooms: number
    bathrooms: number
    floors: number
  }
  aiGenerated: boolean
  createdAt: string
}

export interface Material {
  id: string
  name: string
  description: string
  category: MaterialCategory
  subcategory: string
  price: number
  unit: string
  supplier: Supplier
  imageUrl?: string
  specifications: Record<string, any>
  inStock: boolean
  deliveryDays: number
}

export interface Supplier {
  id: string
  name: string
  logo: string
  website: string
  apiEndpoint?: string
  deliveryAreas: string[]
  minimumOrder?: number
}

export interface CartItem {
  id: string
  materialId: string
  material: Material
  quantity: number
  priceAtTime: number
  projectId: string
  addedAt: string
}

export interface Professional {
  id: string
  name: string
  company: string
  specialties: ProfessionalType[]
  location: string
  postcode: string
  radius: number
  rating: number
  reviewCount: number
  verified: boolean
  insurance: boolean
  contactInfo: {
    phone: string
    email: string
    website?: string
  }
  certifications: string[]
}

export interface Quote {
  id: string
  projectId: string
  professionalId: string
  professional: Professional
  amount: number
  description: string
  timeline: string
  status: 'pending' | 'accepted' | 'rejected' | 'expired'
  createdAt: string
  validUntil: string
}

// Enums
export type MaterialCategory = 
  | 'structural'
  | 'roofing'
  | 'windows_doors'
  | 'insulation'
  | 'electrical'
  | 'plumbing'
  | 'heating'
  | 'flooring'
  | 'walls_ceilings'
  | 'kitchen'
  | 'bathroom'
  | 'exterior'
  | 'tools'
  | 'hardware'

export type ProfessionalType =
  | 'architect'
  | 'builder'
  | 'electrician'
  | 'plumber'
  | 'heating_engineer'
  | 'roofer'
  | 'plasterer'
  | 'decorator'
  | 'flooring_specialist'
  | 'kitchen_fitter'
  | 'bathroom_fitter'
  | 'landscaper'
  | 'structural_engineer'

export type ProjectStage =
  | 'concept'
  | 'planning_permission'
  | 'building_regulations'
  | 'foundation'
  | 'structure'
  | 'roof'
  | 'first_fix'
  | 'insulation'
  | 'plastering'
  | 'second_fix'
  | 'decoration'
  | 'completion'