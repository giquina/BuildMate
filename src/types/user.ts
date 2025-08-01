// User-related TypeScript interfaces for BuildMate

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  subscription: 'free' | 'pro' | 'enterprise'
  postcode?: string
  phone?: string
  preferences: UserPreferences
  createdAt: Date
  lastLoginAt: Date
}

export interface UserPreferences {
  projectTypes: string[]
  preferredSuppliers: string[]
  budgetRange: {
    min: number
    max: number
  }
  notifications: {
    email: boolean
    sms: boolean
    browser: boolean
  }
  privacy: {
    profilePublic: boolean
    shareDataWithPartners: boolean
  }
}

export interface SavedProject {
  id: string
  userId: string
  name: string
  description?: string
  type: 'new_build' | 'renovation' | 'extension' | 'loft_conversion'
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold'
  budget: number
  location: string
  postcode: string
  floorplan?: {
    svg: string
    specifications: any
  }
  materials: SavedMaterial[]
  professionals: SavedProfessional[]
  notes: string[]
  createdAt: Date
  updatedAt: Date
  progress: number // 0-100
}

export interface SavedMaterial {
  id: string
  name: string
  category: string
  supplier: string
  price: number
  quantity: number
  unit: string
  specifications?: any
  addedAt: Date
}

export interface SavedProfessional {
  id: string
  name: string
  trade: string
  company: string
  rating: number
  contact: {
    email: string
    phone: string
  }
  location: string
  addedAt: Date
}

export interface WishlistItem {
  id: string
  userId: string
  type: 'material' | 'professional'
  itemId: string
  itemData: SavedMaterial | SavedProfessional
  notes?: string
  addedAt: Date
}

export interface UserSession {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<void>
}

export interface RegisterData {
  name: string
  email: string
  password: string
  postcode?: string
  phone?: string
  subscription?: 'free' | 'pro' | 'enterprise'
}

export interface LoginData {
  email: string
  password: string
  rememberMe?: boolean
}