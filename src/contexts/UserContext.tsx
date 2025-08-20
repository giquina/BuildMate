'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { User, UserSession, RegisterData, LoginData, SavedProject, WishlistItem } from '@/types/user'
import { 
  FreemiumSession, 
  FreemiumState, 
  SubscriptionTier, 
  XPTracking, 
  Badge, 
  UserStreak, 
  DailyChallenge, 
  FeatureLimit, 
  UpgradeTrigger, 
  ProgressWarning,
  FreemiumFeatures,
  SUBSCRIPTION_FEATURES,
  XP_LEVELS,
  DEFAULT_BADGES,
  FeatureType
} from '@/types/freemium'

// Mock data for development - Free user with trial available
const mockUser: User = {
  id: 'user_123',
  email: 'john.smith@email.com',
  name: 'John Smith',
  avatar: '/avatars/john-smith.jpg',
  subscription: 'free', // Changed to free for freemium demo
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

// Mock freemium data for development
const mockFreemiumState: FreemiumState = {
  subscription: {
    tier: 'free',
    startDate: new Date('2024-01-15'),
    trialUsed: false,
    isTrialActive: false,
    autoRenew: false
  },
  xp: {
    totalXP: 150,
    currentLevel: 2,
    xpToNextLevel: 100,
    xpThisLevel: 50,
    levelProgress: 33,
    dailyXP: 25,
    weeklyXP: 75,
    monthlyXP: 150,
    lastXPEarned: new Date()
  },
  badges: [
    {
      ...DEFAULT_BADGES[0],
      unlockedAt: new Date('2024-01-15')
    }
  ],
  streaks: [
    {
      type: 'daily',
      current: 3,
      longest: 5,
      lastActivity: new Date(),
      multiplier: 1.1
    }
  ],
  challenges: [
    {
      id: 'daily_1',
      type: 'daily',
      name: 'AI Explorer',
      description: 'Generate 2 AI suggestions today',
      requirement: 2,
      progress: 1,
      completed: false,
      xpReward: 25,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      category: 'engagement'
    }
  ],
  featureLimits: [
    {
      type: 'projects',
      limit: 1,
      used: 0,
      resetPeriod: 'never'
    },
    {
      type: 'ai_suggestions',
      limit: 3,
      used: 1,
      resetDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      resetPeriod: 'daily'
    }
  ],
  upgradeTriggers: [],
  progressWarnings: [],
  features: SUBSCRIPTION_FEATURES.free,
  lastUpdated: new Date()
}

// Enhanced UserContext with freemium features
interface EnhancedUserSession extends UserSession {
  freemium: FreemiumSession
}

const UserContext = createContext<EnhancedUserSession | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [freemiumState, setFreemiumState] = useState<FreemiumState>(mockFreemiumState)
  const [freemiumLoading, setFreemiumLoading] = useState(false)

  // Simulate checking for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true)
      
      // Check localStorage for session token (mock implementation)
      const sessionToken = localStorage.getItem('buildmate_session')
      const freemiumData = localStorage.getItem('buildmate_freemium')
      
      if (sessionToken) {
        // In real implementation, validate token with backend
        setTimeout(() => {
          setUser(mockUser)
          
          // Load freemium state from localStorage if available
          if (freemiumData) {
            try {
              const parsed = JSON.parse(freemiumData)
              // Convert date strings back to Date objects
              const restoredState = {
                ...parsed,
                subscription: {
                  ...parsed.subscription,
                  startDate: new Date(parsed.subscription.startDate),
                  endDate: parsed.subscription.endDate ? new Date(parsed.subscription.endDate) : undefined
                },
                xp: {
                  ...parsed.xp,
                  lastXPEarned: new Date(parsed.xp.lastXPEarned)
                },
                lastUpdated: new Date(parsed.lastUpdated)
              }
              setFreemiumState(restoredState)
            } catch (error) {
              console.warn('Failed to parse freemium data from localStorage')
            }
          }
          
          setIsLoading(false)
        }, 500)
      } else {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  // Persist freemium state to localStorage
  useEffect(() => {
    if (user && freemiumState) {
      localStorage.setItem('buildmate_freemium', JSON.stringify(freemiumState))
    }
  }, [user, freemiumState])

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
          
          // Initialize freemium state for new user
          const initialFreemiumState: FreemiumState = {
            ...mockFreemiumState,
            subscription: {
              tier: (userData.subscription as SubscriptionTier) || 'free',
              startDate: new Date(),
              trialUsed: false,
              isTrialActive: false,
              autoRenew: false
            },
            features: SUBSCRIPTION_FEATURES[(userData.subscription as SubscriptionTier) || 'free'],
            lastUpdated: new Date()
          }
          
          const sessionToken = 'mock_session_token_' + Date.now()
          localStorage.setItem('buildmate_session', sessionToken)
          setUser(newUser)
          setFreemiumState(initialFreemiumState)
          
          // Award welcome XP and badge
          setTimeout(() => {
            awardXP(50, 'Welcome to BuildMate AI!')
          }, 1000)
          
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
        localStorage.removeItem('buildmate_freemium')
        setUser(null)
        setFreemiumState(mockFreemiumState)
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

  const updatePreferences = async (preferences: Partial<User['preferences']>) => {
    if (!user) throw new Error('No user logged in')
    
    setIsLoading(true)
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser({ 
          ...user, 
          preferences: { 
            ...user.preferences, 
            ...preferences 
          }
        })
        setIsLoading(false)
        resolve()
      }, 300)
    })
  }

  // Freemium action implementations
  const awardXP = useCallback((amount: number, reason: string) => {
    if (!user) return
    
    setFreemiumState(prev => {
      const newTotalXP = prev.xp.totalXP + amount
      const currentLevel = XP_LEVELS.findIndex(level => newTotalXP < level.xpRequired) - 1
      const actualLevel = currentLevel === -1 ? XP_LEVELS.length - 1 : Math.max(0, currentLevel)
      const currentLevelXP = XP_LEVELS[actualLevel]?.xpRequired || 0
      const nextLevelXP = XP_LEVELS[actualLevel + 1]?.xpRequired || newTotalXP
      
      return {
        ...prev,
        xp: {
          ...prev.xp,
          totalXP: newTotalXP,
          currentLevel: actualLevel + 1,
          xpToNextLevel: nextLevelXP - newTotalXP,
          xpThisLevel: newTotalXP - currentLevelXP,
          levelProgress: Math.round(((newTotalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100),
          dailyXP: prev.xp.dailyXP + amount,
          weeklyXP: prev.xp.weeklyXP + amount,
          monthlyXP: prev.xp.monthlyXP + amount,
          lastXPEarned: new Date()
        },
        lastUpdated: new Date()
      }
    })
  }, [user])

  const unlockBadge = useCallback((badgeId: string) => {
    setFreemiumState(prev => {
      const badge = DEFAULT_BADGES.find(b => b.id === badgeId)
      if (!badge || prev.badges.some(b => b.id === badgeId)) return prev
      
      const unlockedBadge = {
        ...badge,
        unlockedAt: new Date()
      }
      
      // Award XP for badge unlock
      setTimeout(() => awardXP(badge.xpReward, `Badge unlocked: ${badge.name}`), 100)
      
      return {
        ...prev,
        badges: [...prev.badges, unlockedBadge],
        lastUpdated: new Date()
      }
    })
  }, [awardXP])

  const checkFeatureAccess = useCallback((feature: FeatureType): boolean => {
    const limit = freemiumState.featureLimits.find(l => l.type === feature)
    if (!limit) return true
    
    if (limit.limit === 'unlimited') return true
    return limit.used < (limit.limit as number)
  }, [freemiumState.featureLimits])

  const incrementFeatureUsage = useCallback((feature: FeatureType): boolean => {
    const canUse = checkFeatureAccess(feature)
    if (!canUse) return false
    
    setFreemiumState(prev => ({
      ...prev,
      featureLimits: prev.featureLimits.map(limit => 
        limit.type === feature 
          ? { ...limit, used: limit.used + 1 }
          : limit
      ),
      lastUpdated: new Date()
    }))
    
    return true
  }, [checkFeatureAccess])

  const startFreeTrial = useCallback(async () => {
    if (!user || freemiumState.subscription.trialUsed) return
    
    setFreemiumLoading(true)
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setFreemiumState(prev => ({
          ...prev,
          subscription: {
            ...prev.subscription,
            tier: 'trial',
            isTrialActive: true,
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            daysUntilExpiry: 7
          },
          features: SUBSCRIPTION_FEATURES.trial,
          featureLimits: [
            {
              type: 'projects',
              limit: 'unlimited',
              used: 0,
              resetPeriod: 'never'
            },
            {
              type: 'ai_suggestions',
              limit: 'unlimited',
              used: 0,
              resetPeriod: 'daily'
            }
          ],
          lastUpdated: new Date()
        }))
        
        // Update user subscription tier
        setUser(prev => prev ? { ...prev, subscription: 'trial' } : null)
        
        // Award trial badge and XP
        setTimeout(() => {
          awardXP(100, 'Started 7-day free trial!')
        }, 500)
        
        setFreemiumLoading(false)
        resolve()
      }, 1000)
    })
  }, [user, freemiumState.subscription.trialUsed, awardXP])

  const upgradeToPro = useCallback(async () => {
    if (!user) return
    
    setFreemiumLoading(true)
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setFreemiumState(prev => ({
          ...prev,
          subscription: {
            tier: 'pro',
            startDate: new Date(),
            trialUsed: true,
            isTrialActive: false,
            autoRenew: true,
            paymentMethod: 'card'
          },
          features: SUBSCRIPTION_FEATURES.pro,
          featureLimits: [
            {
              type: 'projects',
              limit: 'unlimited',
              used: prev.featureLimits.find(l => l.type === 'projects')?.used || 0,
              resetPeriod: 'never'
            },
            {
              type: 'ai_suggestions',
              limit: 'unlimited',
              used: 0,
              resetPeriod: 'daily'
            }
          ],
          lastUpdated: new Date()
        }))
        
        // Update user subscription tier
        setUser(prev => prev ? { ...prev, subscription: 'pro' } : null)
        
        // Award pro upgrade badge and XP
        setTimeout(() => {
          awardXP(250, 'Upgraded to BuildMate AI Pro!')
          unlockBadge('pro_upgrade')
        }, 500)
        
        setFreemiumLoading(false)
        resolve()
      }, 1500)
    })
  }, [user, awardXP, unlockBadge])

  const triggerUpgrade = useCallback((trigger: UpgradeTrigger) => {
    setFreemiumState(prev => ({
      ...prev,
      upgradeTriggers: [...prev.upgradeTriggers.filter(t => t.id !== trigger.id), {
        ...trigger,
        shown: true,
        shownAt: new Date()
      }],
      lastUpdated: new Date()
    }))
  }, [])

  const showProgressWarning = useCallback((warning: ProgressWarning) => {
    setFreemiumState(prev => ({
      ...prev,
      progressWarnings: [...prev.progressWarnings.filter(w => w.id !== warning.id), warning],
      lastUpdated: new Date()
    }))
  }, [])

  const freemiumSession: FreemiumSession = {
    ...freemiumState,
    isLoading: freemiumLoading,
    lastSyncDate: freemiumState.lastUpdated,
    // Actions
    upgradeToPro,
    startFreeTrial,
    cancelSubscription: async () => {},
    awardXP,
    unlockBadge,
    updateStreak: () => {},
    generateDailyChallenges: () => [],
    completeChallenge: () => {},
    checkFeatureAccess,
    incrementFeatureUsage,
    resetFeatureUsage: () => {},
    triggerUpgrade,
    dismissTrigger: () => {},
    showProgressWarning,
    dismissWarning: () => {}
  }

  const value: EnhancedUserSession = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    updatePreferences,
    freemium: freemiumSession
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

// Enhanced hook for freemium features
export function useFreemium() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useFreemium must be used within a UserProvider')
  }
  return context.freemium
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