'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, UserSession, RegisterData, LoginData, SavedProject, WishlistItem } from '@/types/user'

// Mock data for development
const mockUser: User = {
  id: 'user_123',
  email: 'john.smith@email.com',
  name: 'John Smith',
  avatar: '/avatars/john-smith.jpg',
  subscription: 'pro',
  postcode: 'SW1A 1AA',
  phone: '+44 7700 900123',
  preferences: {
    projectTypes: ['extension', 'renovation'],
    preferredSuppliers: ['Travis Perkins', 'Wickes', 'B&Q'],
    budgetRange: {
      min: 10000,
      max: 50000
    },
    notifications: {
      email: true,
      sms: false,
      browser: true
    },
    privacy: {
      profilePublic: false,
      shareDataWithPartners: false
    }
  },
  createdAt: new Date('2024-01-15'),
  lastLoginAt: new Date()
}

const UserContext = createContext<UserSession | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate checking for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true)
      
      // Check localStorage for session token (mock implementation)
      const sessionToken = localStorage.getItem('buildmate_session')
      if (sessionToken) {
        // In real implementation, validate token with backend
        setTimeout(() => {
          setUser(mockUser)
          setIsLoading(false)
        }, 500)
      } else {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    
    // Mock login API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email === 'demo@buildmate.co.uk' && password === 'demo123') {
          const sessionToken = 'mock_session_token_' + Date.now()
          localStorage.setItem('buildmate_session', sessionToken)
          setUser(mockUser)
          setIsLoading(false)
          resolve()
        } else {
          setIsLoading(false)
          reject(new Error('Invalid credentials'))
        }
      }, 1000)
    })
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    
    // Mock registration API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (userData.email && userData.password && userData.name) {
          const newUser: User = {
            id: 'user_' + Date.now(),
            email: userData.email,
            name: userData.name,
            subscription: userData.subscription || 'free',
            postcode: userData.postcode,
            phone: userData.phone,
            preferences: {
              projectTypes: [],
              preferredSuppliers: [],
              budgetRange: { min: 0, max: 100000 },
              notifications: {
                email: true,
                sms: false,
                browser: true
              },
              privacy: {
                profilePublic: false,
                shareDataWithPartners: false
              }
            },
            createdAt: new Date(),
            lastLoginAt: new Date()
          }
          
          const sessionToken = 'mock_session_token_' + Date.now()
          localStorage.setItem('buildmate_session', sessionToken)
          setUser(newUser)
          setIsLoading(false)
          resolve()
        } else {
          setIsLoading(false)
          reject(new Error('Missing required fields'))
        }
      }, 1000)
    })
  }

  const logout = async () => {
    setIsLoading(true)
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('buildmate_session')
        setUser(null)
        setIsLoading(false)
        resolve()
      }, 500)
    })
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) throw new Error('No user logged in')
    
    setIsLoading(true)
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser({ ...user, ...updates })
        setIsLoading(false)
        resolve()
      }, 500)
    })
  }

  const value: UserSession = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

// Custom hooks for specific user features
export function useUserProjects() {
  const { user } = useUser()
  const [projects, setProjects] = useState<SavedProject[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const mockProjects: SavedProject[] = [
    {
      id: 'proj_1',
      userId: user?.id || '',
      name: 'Kitchen Extension',
      description: 'Single-story rear extension with bi-fold doors',
      type: 'extension',
      status: 'planning',
      budget: 25000,
      location: 'London',
      postcode: 'SW1A 1AA',
      materials: [],
      professionals: [],
      notes: ['Need planning permission', 'Consider underfloor heating'],
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date(),
      progress: 15
    },
    {
      id: 'proj_2', 
      userId: user?.id || '',
      name: 'Loft Conversion',
      description: 'Convert loft into master bedroom with ensuite',
      type: 'loft_conversion',
      status: 'in_progress',
      budget: 35000,
      location: 'London',
      postcode: 'SW1A 1AA',
      materials: [],
      professionals: [],
      notes: ['Structural engineer required', 'Building regs application submitted'],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date(),
      progress: 60
    }
  ]

  useEffect(() => {
    if (user) {
      setIsLoading(true)
      setTimeout(() => {
        setProjects(mockProjects)
        setIsLoading(false)
      }, 500)
    }
  }, [user])

  const saveProject = async (project: Omit<SavedProject, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    const newProject: SavedProject = {
      ...project,
      id: 'proj_' + Date.now(),
      userId: user?.id || '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setProjects(prev => [...prev, newProject])
  }

  const updateProject = async (projectId: string, updates: Partial<SavedProject>) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, ...updates, updatedAt: new Date() } : p
    ))
  }

  const deleteProject = async (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId))
  }

  return {
    projects,
    isLoading,
    saveProject,
    updateProject,
    deleteProject
  }
}

export function useWishlist() {
  const { user } = useUser()
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setIsLoading(true)
      // Mock wishlist data
      setTimeout(() => {
        setWishlist([])
        setIsLoading(false)
      }, 300)
    }
  }, [user])

  const addToWishlist = async (type: 'material' | 'professional', itemId: string, itemData: any) => {
    const newItem: WishlistItem = {
      id: 'wish_' + Date.now(),
      userId: user?.id || '',
      type,
      itemId,
      itemData,
      addedAt: new Date()
    }
    setWishlist(prev => [...prev, newItem])
  }

  const removeFromWishlist = async (itemId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== itemId))
  }

  const isInWishlist = (itemId: string) => {
    return wishlist.some(item => item.itemId === itemId)
  }

  return {
    wishlist,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  }
}