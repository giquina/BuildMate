// Freemium system TypeScript interfaces for BuildMate AI

export type SubscriptionTier = 'free' | 'trial' | 'pro'
export type BadgeCategory = 'achievement' | 'milestone' | 'streak' | 'special'
export type ChallengeType = 'daily' | 'weekly' | 'monthly'
export type FeatureType = 'projects' | 'ai_suggestions' | 'save_progress' | 'priority_support' | 'advanced_analytics'

export interface UserSubscription {
  tier: SubscriptionTier
  startDate: Date
  endDate?: Date
  trialUsed: boolean
  isTrialActive: boolean
  daysUntilExpiry?: number
  autoRenew: boolean
  paymentMethod?: string
}

export interface Badge {
  id: string
  name: string
  description: string
  category: BadgeCategory
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlockedAt?: Date
  progress?: number
  maxProgress?: number
  xpReward: number
}

export interface XPTracking {
  totalXP: number
  currentLevel: number
  xpToNextLevel: number
  xpThisLevel: number
  levelProgress: number // 0-100
  dailyXP: number
  weeklyXP: number
  monthlyXP: number
  lastXPEarned: Date
}

export interface UserStreak {
  type: 'daily' | 'weekly'
  current: number
  longest: number
  lastActivity: Date
  multiplier: number // XP multiplier based on streak
}

export interface DailyChallenge {
  id: string
  type: ChallengeType
  name: string
  description: string
  requirement: number
  progress: number
  completed: boolean
  xpReward: number
  badgeReward?: string
  expiresAt: Date
  category: 'project' | 'engagement' | 'learning' | 'social'
}

export interface FeatureLimit {
  type: FeatureType
  limit: number | 'unlimited'
  used: number
  resetDate?: Date
  resetPeriod: 'daily' | 'weekly' | 'monthly' | 'never'
}

export interface UpgradeTrigger {
  id: string
  type: 'feature_limit' | 'progress_milestone' | 'time_based' | 'usage_pattern'
  condition: string
  message: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  shown: boolean
  shownAt?: Date
  convertible: boolean
}

export interface ProgressWarning {
  id: string
  type: 'save_blocked' | 'feature_locked' | 'trial_ending' | 'limit_reached'
  title: string
  message: string
  action: string
  severity: 'info' | 'warning' | 'error'
  dismissible: boolean
  ctaText: string
  ctaAction: () => void
}

export interface FreemiumFeatures {
  // Project limits
  maxProjects: number | 'unlimited'
  canSaveProgress: boolean
  
  // AI features
  aiSuggestionsPerDay: number | 'unlimited'
  aiImageGenerationPerDay: number | 'unlimited'
  advancedAIFeatures: boolean
  
  // Support & Analytics
  prioritySupport: boolean
  advancedAnalytics: boolean
  exportData: boolean
  
  // Social features
  publicProfile: boolean
  shareProjects: boolean
  professionalNetwork: boolean
  
  // Commercial features
  commercialProjects: boolean
  bulkOrdering: boolean
  roiCalculator: boolean
}

export interface FreemiumState {
  subscription: UserSubscription
  xp: XPTracking
  badges: Badge[]
  streaks: UserStreak[]
  challenges: DailyChallenge[]
  featureLimits: FeatureLimit[]
  upgradeTriggers: UpgradeTrigger[]
  progressWarnings: ProgressWarning[]
  features: FreemiumFeatures
  lastUpdated: Date
}

export interface FreemiumActions {
  // Subscription management
  upgradeToPro: () => Promise<void>
  startFreeTrial: () => Promise<void>
  cancelSubscription: () => Promise<void>
  
  // XP and progression
  awardXP: (amount: number, reason: string) => void
  unlockBadge: (badgeId: string) => void
  updateStreak: (type: 'daily' | 'weekly') => void
  
  // Challenge management
  generateDailyChallenges: () => DailyChallenge[]
  completeChallenge: (challengeId: string) => void
  
  // Feature limits
  checkFeatureAccess: (feature: FeatureType) => boolean
  incrementFeatureUsage: (feature: FeatureType) => boolean
  resetFeatureUsage: (feature: FeatureType) => void
  
  // Upgrade triggers
  triggerUpgrade: (trigger: UpgradeTrigger) => void
  dismissTrigger: (triggerId: string) => void
  
  // Progress warnings
  showProgressWarning: (warning: ProgressWarning) => void
  dismissWarning: (warningId: string) => void
}

export interface FreemiumSession extends FreemiumState, FreemiumActions {
  isLoading: boolean
  lastSyncDate: Date
}

// Predefined subscription tiers with features
export const SUBSCRIPTION_FEATURES: Record<SubscriptionTier, FreemiumFeatures> = {
  free: {
    maxProjects: 1,
    canSaveProgress: false,
    aiSuggestionsPerDay: 3,
    aiImageGenerationPerDay: 2,
    advancedAIFeatures: false,
    prioritySupport: false,
    advancedAnalytics: false,
    exportData: false,
    publicProfile: false,
    shareProjects: false,
    professionalNetwork: false,
    commercialProjects: false,
    bulkOrdering: false,
    roiCalculator: false
  },
  trial: {
    maxProjects: 'unlimited',
    canSaveProgress: true,
    aiSuggestionsPerDay: 'unlimited',
    aiImageGenerationPerDay: 'unlimited',
    advancedAIFeatures: true,
    prioritySupport: true,
    advancedAnalytics: true,
    exportData: true,
    publicProfile: true,
    shareProjects: true,
    professionalNetwork: true,
    commercialProjects: true,
    bulkOrdering: true,
    roiCalculator: true
  },
  pro: {
    maxProjects: 'unlimited',
    canSaveProgress: true,
    aiSuggestionsPerDay: 'unlimited',
    aiImageGenerationPerDay: 'unlimited',
    advancedAIFeatures: true,
    prioritySupport: true,
    advancedAnalytics: true,
    exportData: true,
    publicProfile: true,
    shareProjects: true,
    professionalNetwork: true,
    commercialProjects: true,
    bulkOrdering: true,
    roiCalculator: true
  }
}

// XP Level System
export const XP_LEVELS = [
  { level: 1, xpRequired: 0, title: 'Apprentice Builder' },
  { level: 2, xpRequired: 100, title: 'Novice Constructor' },
  { level: 3, xpRequired: 250, title: 'Skilled Tradesperson' },
  { level: 4, xpRequired: 500, title: 'Expert Builder' },
  { level: 5, xpRequired: 800, title: 'Master Craftsperson' },
  { level: 6, xpRequired: 1200, title: 'Construction Guru' },
  { level: 7, xpRequired: 1700, title: 'Building Legend' },
  { level: 8, xpRequired: 2300, title: 'Architectural Wizard' },
  { level: 9, xpRequired: 3000, title: 'BuildMate Champion' },
  { level: 10, xpRequired: 4000, title: 'AI Building Master' }
]

// Default badges system
export const DEFAULT_BADGES: Badge[] = [
  {
    id: 'first_project',
    name: 'First Blueprint',
    description: 'Created your first project in BuildMate AI',
    category: 'milestone',
    icon: '🏗️',
    rarity: 'common',
    xpReward: 50
  },
  {
    id: 'streak_7',
    name: 'Weekly Warrior',
    description: 'Used BuildMate AI for 7 consecutive days',
    category: 'streak',
    icon: '🔥',
    rarity: 'rare',
    xpReward: 100
  },
  {
    id: 'ai_master',
    name: 'AI Whisperer',
    description: 'Generated 50 AI suggestions',
    category: 'achievement',
    icon: '🤖',
    rarity: 'epic',
    maxProgress: 50,
    xpReward: 200
  },
  {
    id: 'early_adopter',
    name: 'Pioneer',
    description: 'One of the first 1000 users of BuildMate AI',
    category: 'special',
    icon: '🚀',
    rarity: 'legendary',
    xpReward: 500
  }
]