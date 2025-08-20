// Enhanced UI Components - Professional Design System
// Export all UI components for easy importing

// Core Components
export * from './Button'
export * from './Card'
export * from './Input'
export * from './AuthModal'

// Utility Components
export * from './Badge'
export * from './Progress'
export * from './Tooltip'

// Dashboard Components
export * from './AnimatedProgressBar'
export * from './AchievementBadge'

// Live Components
export * from './LiveNotifications'

// Layout Components
export * from './Footer'

// Performance & Loading Components
export * from './LoadingSpinner'
export * from './ErrorBoundary'
export * from './ROICalculator'

// New UX Enhancement Components
export * from './WelcomeFlow'
export * from './SkeletonLoader'
export * from './Breadcrumbs'
export * from './EmptyState'
export * from './Toast'

// Re-export commonly used component combinations
export {
  // Button variants
  Button,
  ButtonSpinner
} from './Button'

export {
  // Card variants
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  FeatureCard,
  StatsCard
} from './Card'

export {
  // Input variants
  Input,
  Textarea
} from './Input'

export {
  // Badge variants
  Badge,
  StatusBadge,
  PriorityBadge,
  NotificationBadge,
  FeatureBadge,
  PulseBadge,
  InteractiveBadge
} from './Badge'

export {
  // Progress variants
  Progress,
  CircularProgress,
  StepProgress
} from './Progress'

export {
  // Tooltip variants
  Tooltip,
  InteractiveTooltip,
  StatusTooltip,
  KeyboardTooltip,
  HoverCard
} from './Tooltip'

export {
  // Dashboard Components
  AnimatedProgressBar
} from './AnimatedProgressBar'

export {
  // Achievement Components
  AchievementBadge,
  defaultAchievements,
  type Achievement
} from './AchievementBadge'

export {
  // Live Components
  LiveNotifications
} from './LiveNotifications'

export {
  // Layout Components
  Footer
} from './Footer'

// New UX Enhancement Components
export {
  WelcomeFlow
} from './WelcomeFlow'

export {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonProject,
  SkeletonDashboard
} from './SkeletonLoader'

export {
  Breadcrumbs,
  useBreadcrumbs,
  type BreadcrumbItem
} from './Breadcrumbs'

export {
  EmptyState
} from './EmptyState'

export {
  ToastProvider,
  useToast
} from './Toast'

// Partnership and Professional Components
export {
  PartnershipShowcase,
  type Partner
} from './PartnershipShowcase'

export {
  MetricsDashboard
} from './MetricsDashboard'

export {
  EnhancedCommercialToggle
} from './EnhancedCommercialToggle'

export {
  CustomerSuccessStories
} from './CustomerSuccessStories'

export {
  BulkOrderingSystem
} from './BulkOrderingSystem'

// Freemium System Components
export {
  FreemiumSystem,
  useFeatureAccess,
  XPDisplay,
  BadgeCollection
} from './FreemiumSystem'

export {
  SubscriptionModal
} from './SubscriptionModal'

// Gamification System Components
export {
  BadgeSystem
} from './BadgeSystem'

export {
  ProgressTracking
} from './ProgressTracking'

export {
  DailyChallenges
} from './DailyChallenges'

export {
  PaywallModal
} from './PaywallModal'

export {
  FOOMNotifications,
  useFOOMNotifications,
  createUpgradeActivityNotification,
  createStreakWarningNotification,
  createProgressLossNotification,
  createSocialProofNotification
} from './FOOMNotifications'

// Gamification Notification System
export {
  NotificationSystem,
  useNotifications,
  useXPNotification,
  useBadgeNotification,
  useLevelUpNotification,
  useUpgradeNotification,
  // Advanced Conversion Optimization Components
  ExitIntentModal,
  CountdownTimer,
  SocialProofWidget,
  UrgencyTriggers,
  ProgressiveProfiler,
  // Conversion Optimization Hooks
  useProgressiveProfiler,
  useExitIntentAnalytics
} from './NotificationSystem'

// Abandoned Cart Recovery & Conversion System
export {
  AbandonedCartTracker,
  useAbandonedCartTracker,
  type CartSession,
  type AbandonmentEvent,
  type CartAnalytics
} from './AbandonedCartTracker'

export {
  CartRecoveryModal
} from './CartRecoveryModal'

export {
  CartValueOptimizer
} from './CartValueOptimizer'

export {
  ReturnUserWelcome
} from './ReturnUserWelcome'

export {
  ConversionAnalytics
} from './ConversionAnalytics'