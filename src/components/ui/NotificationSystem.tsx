'use client'

import React, { useState, useEffect, createContext, useContext, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'
import { X, Trophy, Zap, Target, Gift, Sparkles, TrendingUp } from 'lucide-react'
import { useUser, useFreemium } from '@/contexts/UserContext'
import { Button } from './Button'
import { Card } from './Card'

interface Notification {
  id: string
  type: 'xp' | 'badge' | 'level_up' | 'challenge' | 'upgrade' | 'warning' | 'achievement'
  title: string
  message: string
  xp?: number
  badge?: string
  icon?: React.ReactNode
  duration?: number
  priority?: 'low' | 'medium' | 'high'
  actions?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary'
  }[]
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

const NotificationContext = createContext<NotificationContextType | null>(null)

// Helper functions for creating common notifications
export const createXPNotification = (xp: number, activity: string): Omit<Notification, 'id'> => ({
  type: 'xp',
  title: `+${xp} XP Earned!`,
  message: activity,
  xp,
  icon: <Zap className="h-5 w-5" />,
  duration: 3000
})

export const createBadgeNotification = (badge: string, description: string): Omit<Notification, 'id'> => ({
  type: 'badge',
  title: 'New Badge Unlocked!',
  message: description,
  badge,
  icon: <Trophy className="h-5 w-5" />,
  duration: 5000,
  priority: 'high'
})

export const createLevelUpNotification = (level: number): Omit<Notification, 'id'> => ({
  type: 'level_up',
  title: `Level ${level} Reached!`,
  message: 'You\'ve unlocked new features and rewards!',
  icon: <Target className="h-5 w-5" />,
  duration: 4000,
  priority: 'high'
})

export const createUpgradeNotification = (feature: string, onUpgrade: () => void): Omit<Notification, 'id'> => ({
  type: 'upgrade',
  title: 'Upgrade to Continue',
  message: `You've reached your limit for ${feature}. Upgrade to Pro for unlimited access!`,
  icon: <TrendingUp className="h-5 w-5" />,
  duration: 0, // Persistent until dismissed
  priority: 'high',
  actions: [
    {
      label: 'Upgrade Now',
      onClick: onUpgrade,
      variant: 'primary'
    }
  ]
})

export const createProgressWarningNotification = (message: string): Omit<Notification, 'id'> => ({
  type: 'warning',
  title: 'Progress Warning',
  message,
  icon: <Gift className="h-5 w-5" />,
  duration: 6000,
  priority: 'medium'
})

function NotificationItem({ 
  notification, 
  onRemove 
}: { 
  notification: Notification
  onRemove: (id: string) => void 
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)

  useEffect(() => {
    // Slide in animation
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (notification.duration && notification.duration > 0) {
      const timer = setTimeout(() => {
        handleRemove()
      }, notification.duration)
      return () => clearTimeout(timer)
    }
  }, [notification.duration])

  const handleRemove = () => {
    setIsRemoving(true)
    setTimeout(() => onRemove(notification.id), 300)
  }

  const getNotificationStyle = () => {
    switch (notification.type) {
      case 'xp':
        return 'bg-blue-50 border-blue-200 text-blue-900'
      case 'badge':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900'
      case 'level_up':
        return 'bg-purple-50 border-purple-200 text-purple-900'
      case 'challenge':
        return 'bg-green-50 border-green-200 text-green-900'
      case 'upgrade':
        return 'bg-orange-50 border-orange-200 text-orange-900'
      case 'warning':
        return 'bg-red-50 border-red-200 text-red-900'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-900'
    }
  }

  const getIconColor = () => {
    switch (notification.type) {
      case 'xp':
        return 'text-blue-600'
      case 'badge':
        return 'text-yellow-600'
      case 'level_up':
        return 'text-purple-600'
      case 'challenge':
        return 'text-green-600'
      case 'upgrade':
        return 'text-orange-600'
      case 'warning':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div
      className={cn(
        'mb-3 max-w-sm w-full bg-white rounded-lg border shadow-lg pointer-events-auto transition-all duration-300 transform',
        getNotificationStyle(),
        isVisible && !isRemoving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        notification.priority === 'high' && 'ring-2 ring-opacity-50',
        notification.type === 'level_up' && 'animate-pulse',
        notification.type === 'badge' && 'animate-bounce'
      )}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className={cn('flex-shrink-0 mt-0.5', getIconColor())}>
            {notification.icon}
          </div>
          <div className="ml-3 w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                {notification.title}
                {notification.xp && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    +{notification.xp} XP
                  </span>
                )}
                {notification.badge && (
                  <span className="ml-2 text-lg">{notification.badge}</span>
                )}
              </p>
              <button
                onClick={handleRemove}
                className="ml-4 inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1 text-sm opacity-90">
              {notification.message}
            </p>
            {notification.actions && notification.actions.length > 0 && (
              <div className="mt-3 flex space-x-2">
                {notification.actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className={cn(
                      'px-3 py-1 rounded-md text-sm font-medium transition-colors',
                      action.variant === 'primary'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    )}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Special effects for important notifications */}
      {notification.type === 'level_up' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-300 rounded-full opacity-20 animate-ping" />
          <div className="absolute bottom-0 left-0 w-12 h-12 bg-yellow-300 rounded-full opacity-20 animate-bounce" />
        </div>
      )}
      
      {notification.type === 'badge' && (
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
          <Sparkles className="h-3 w-3 text-yellow-800" />
        </div>
      )}
    </div>
  )
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration ?? 4000
    }
    
    setNotifications(prev => {
      // Limit to 5 notifications max
      const updated = [newNotification, ...prev].slice(0, 5)
      return updated
    })
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearAll
    }}>
      {children}
      
      {/* Notification Container */}
      <div className="fixed top-6 right-6 z-[100] pointer-events-none">
        <div className="flex flex-col-reverse">
          {notifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onRemove={removeNotification}
            />
          ))}
        </div>
      </div>
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

// Convenience hooks for common notification types
export function useXPNotification() {
  const { addNotification } = useNotifications()
  
  return (xp: number, activity: string) => {
    addNotification(createXPNotification(xp, activity))
  }
}

export function useBadgeNotification() {
  const { addNotification } = useNotifications()
  
  return (badge: string, description: string) => {
    addNotification(createBadgeNotification(badge, description))
  }
}

export function useLevelUpNotification() {
  const { addNotification } = useNotifications()
  
  return (level: number) => {
    addNotification(createLevelUpNotification(level))
  }
}

export function useUpgradeNotification() {
  const { addNotification } = useNotifications()
  
  return (feature: string, onUpgrade: () => void) => {
    addNotification(createUpgradeNotification(feature, onUpgrade))
  }
}

// Export the NotificationSystem as the main component
export const NotificationSystem = NotificationProvider

// ============================================
// ADVANCED CONVERSION OPTIMIZATION COMPONENTS
// ============================================

// ============================================
// 1. EXIT INTENT MODAL - Smart exit detection with personalized offers
// ============================================

interface ExitIntentModalProps {
  enabled?: boolean
  cooldownMinutes?: number
  onClose?: () => void
  className?: string
}

interface ExitIntentOffer {
  id: string
  type: 'discount' | 'trial_extension' | 'feature_unlock' | 'guarantee'
  title: string
  description: string
  value: string
  urgency: string
  cta: string
  icon: string
  personalizedFor: ('free' | 'trial' | 'pro')[]
  testVariant?: 'A' | 'B' | 'C'
}

const exitIntentOffers: ExitIntentOffer[] = [
  {
    id: 'trial_extension',
    type: 'trial_extension',
    title: 'Wait! Get 3 Extra Days FREE',
    description: 'We noticed you\'re interested in BuildMate AI. Get 3 additional trial days to complete your project planning.',
    value: '3 extra days',
    urgency: 'This offer expires in 10 minutes',
    cta: 'Extend My Trial',
    icon: '⏰',
    personalizedFor: ['free'],
    testVariant: 'A'
  },
  {
    id: 'pro_discount',
    type: 'discount',
    title: 'Don\'t Miss 50% Off Your First Month',
    description: 'Save £14.50 on BuildMate AI Pro. Perfect timing for your construction project planning.',
    value: '£14.50 off',
    urgency: 'Limited time: 50% off expires today',
    cta: 'Claim 50% Discount',
    icon: '💰',
    personalizedFor: ['trial', 'free'],
    testVariant: 'B'
  },
  {
    id: 'progress_save',
    type: 'feature_unlock',
    title: 'Your Project Progress Will Be Lost!',
    description: 'Don\'t lose hours of AI-generated suggestions and project planning. Save your progress now.',
    value: 'Save your work',
    urgency: 'All progress deleted in 24 hours',
    cta: 'Save My Project',
    icon: '⚠️',
    personalizedFor: ['free'],
    testVariant: 'C'
  },
  {
    id: 'money_back',
    type: 'guarantee',
    title: 'Try Risk-Free with Our Guarantee',
    description: 'Get your full money back if BuildMate AI doesn\'t save you £500+ on your project.',
    value: '£500+ savings or refund',
    urgency: '30-day money-back guarantee',
    cta: 'Start Risk-Free',
    icon: '🛡️',
    personalizedFor: ['free', 'trial'],
    testVariant: 'A'
  }
]

interface ExitIntentAnalytics {
  timestamp: Date
  userTier: 'free' | 'trial' | 'pro'
  pageUrl: string
  offerId: string
  variant: string
  action: 'shown' | 'converted' | 'dismissed'
  sessionDuration: number
}

export function ExitIntentModal({ 
  enabled = true, 
  cooldownMinutes = 60, 
  onClose,
  className 
}: ExitIntentModalProps) {
  const { user, isAuthenticated } = useUser()
  const { 
    subscription, 
    startFreeTrial, 
    upgradeToPro, 
    checkFeatureAccess,
    awardXP 
  } = useFreemium()

  const [isVisible, setIsVisible] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState<ExitIntentOffer | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [analyticsData, setAnalyticsData] = useState<ExitIntentAnalytics[]>([])
  
  const sessionStartRef = useRef(Date.now())
  const hasShownRef = useRef(false)
  const mouseLeaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Smart offer selection based on user context
  const selectPersonalizedOffer = useCallback(() => {
    if (!user) return null

    const userTier = subscription.tier
    const eligibleOffers = exitIntentOffers.filter(offer => 
      offer.personalizedFor.includes(userTier)
    )

    if (eligibleOffers.length === 0) return null

    // A/B/C testing - rotate offers based on user ID hash
    const userHash = user.id.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    
    const offerIndex = Math.abs(userHash) % eligibleOffers.length
    return eligibleOffers[offerIndex]
  }, [user, subscription.tier])

  // Exit intent detection
  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Only trigger on upward movement (toward browser UI)
    if (e.clientY <= 5 && !hasShownRef.current && enabled && isAuthenticated) {
      
      // Set delay for mobile vs desktop
      const isMobile = window.innerWidth < 768
      const delay = isMobile ? 1000 : 500

      mouseLeaveTimeoutRef.current = setTimeout(() => {
        const offer = selectPersonalizedOffer()
        if (offer) {
          setSelectedOffer(offer)
          setIsVisible(true)
          hasShownRef.current = true
          
          // Track analytics
          const analytics: ExitIntentAnalytics = {
            timestamp: new Date(),
            userTier: subscription.tier,
            pageUrl: window.location.pathname,
            offerId: offer.id,
            variant: offer.testVariant || 'A',
            action: 'shown',
            sessionDuration: Date.now() - sessionStartRef.current
          }
          
          setAnalyticsData(prev => [...prev, analytics])
          awardXP(5, 'Engaged with exit-intent offer')
        }
      }, delay)
    }
  }, [enabled, isAuthenticated, selectPersonalizedOffer, subscription.tier, awardXP])

  // Set up exit intent listeners
  useEffect(() => {
    if (!enabled || !isAuthenticated) return

    // Check cooldown
    const lastShown = localStorage.getItem('buildmate_exit_intent_last_shown')
    if (lastShown) {
      const timeSinceLastShown = Date.now() - parseInt(lastShown)
      if (timeSinceLastShown < cooldownMinutes * 60 * 1000) {
        return
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      
      if (mouseLeaveTimeoutRef.current) {
        clearTimeout(mouseLeaveTimeoutRef.current)
      }
    }
  }, [enabled, isAuthenticated, cooldownMinutes, handleMouseLeave])

  // Handle offer actions
  const handleOfferAction = async (offer: ExitIntentOffer) => {
    if (!offer || isProcessing) return

    setIsProcessing(true)

    try {
      switch (offer.type) {
        case 'trial_extension':
          if (subscription.tier === 'free') {
            await startFreeTrial()
            awardXP(100, 'Started extended trial from exit-intent')
          }
          break

        case 'discount':
        case 'guarantee':
          await upgradeToPro()
          awardXP(250, 'Upgraded to Pro from exit-intent offer')
          break

        case 'feature_unlock':
          if (!checkFeatureAccess('save_progress')) {
            await startFreeTrial()
            awardXP(75, 'Saved project progress from exit-intent')
          }
          break
      }

      // Track conversion
      const conversionAnalytics: ExitIntentAnalytics = {
        timestamp: new Date(),
        userTier: subscription.tier,
        pageUrl: window.location.pathname,
        offerId: offer.id,
        variant: offer.testVariant || 'A',
        action: 'converted',
        sessionDuration: Date.now() - sessionStartRef.current
      }
      
      setAnalyticsData(prev => [...prev, conversionAnalytics])
      
      setTimeout(() => {
        handleClose()
      }, 1000)

    } catch (error) {
      console.error('Exit intent offer action failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    setSelectedOffer(null)
    
    // Set cooldown
    localStorage.setItem('buildmate_exit_intent_last_shown', Date.now().toString())
    
    // Track dismissal
    if (selectedOffer) {
      const dismissalAnalytics: ExitIntentAnalytics = {
        timestamp: new Date(),
        userTier: subscription.tier,
        pageUrl: window.location.pathname,
        offerId: selectedOffer.id,
        variant: selectedOffer.testVariant || 'A',
        action: 'dismissed',
        sessionDuration: Date.now() - sessionStartRef.current
      }
      
      setAnalyticsData(prev => [...prev, dismissalAnalytics])
    }
    
    onClose?.()
  }

  if (!isVisible || !selectedOffer) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <Card className={cn(
        'max-w-md w-full bg-white rounded-xl shadow-2xl transform animate-in zoom-in-95 duration-300',
        className
      )}>
        <div className="relative p-6 text-center">
          <button
            onClick={handleClose}
            disabled={isProcessing}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-5xl mb-4">{selectedOffer.icon}</div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {selectedOffer.title}
          </h2>
          
          <p className="text-gray-600 mb-4">
            {selectedOffer.description}
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-center space-x-2 text-green-700">
              <span className="font-semibold text-lg">{selectedOffer.value}</span>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
            <div className="flex items-center justify-center space-x-2 text-red-700">
              <span className="animate-pulse">⏰</span>
              <span className="text-sm font-medium">{selectedOffer.urgency}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => handleOfferAction(selectedOffer)}
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                selectedOffer.cta
              )}
            </Button>
            
            <Button
              onClick={handleClose}
              variant="ghost"
              size="sm"
              className="w-full"
              disabled={isProcessing}
            >
              No thanks, I'll continue browsing
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-center border-t pt-4">
            <div>
              <div className="text-sm font-medium text-gray-700">30-day guarantee</div>
              <div className="text-xs text-gray-500">Risk-free</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700">4.9/5 stars</div>
              <div className="text-xs text-gray-500">500+ reviews</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

// ============================================
// 2. COUNTDOWN TIMER - Trial urgency with visual countdown
// ============================================

interface CountdownTimerProps {
  endDate: Date
  onExpiry?: () => void
  urgencyThresholds?: {
    critical: number // hours
    warning: number // hours
  }
  size?: 'sm' | 'md' | 'lg'
  showLabels?: boolean
  className?: string
}

export function CountdownTimer({
  endDate,
  onExpiry,
  urgencyThresholds = { critical: 24, warning: 72 },
  size = 'md',
  showLabels = true,
  className
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const now = new Date().getTime()
    const end = endDate.getTime()
    return Math.max(0, end - now)
  })

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpiry?.()
      return
    }

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const end = endDate.getTime()
      const remaining = Math.max(0, end - now)
      
      setTimeLeft(remaining)
      
      if (remaining <= 0) {
        onExpiry?.()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, endDate, onExpiry])

  const formatTime = (ms: number) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24))
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((ms % (1000 * 60)) / 1000)

    return { days, hours, minutes, seconds }
  }

  const { days, hours, minutes, seconds } = formatTime(timeLeft)
  const totalHours = Math.floor(timeLeft / (1000 * 60 * 60))

  const getUrgencyLevel = () => {
    if (totalHours <= urgencyThresholds.critical) return 'critical'
    if (totalHours <= urgencyThresholds.warning) return 'warning'
    return 'normal'
  }

  const urgencyLevel = getUrgencyLevel()

  const getColorClasses = () => {
    switch (urgencyLevel) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'warning':
        return 'text-orange-600 bg-orange-50 border-orange-200'
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200'
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-sm px-3 py-2'
      case 'lg':
        return 'text-xl px-6 py-4'
      default:
        return 'text-base px-4 py-3'
    }
  }

  if (timeLeft <= 0) {
    return (
      <div className={cn(
        'inline-flex items-center space-x-2 rounded-lg border font-semibold',
        'text-red-600 bg-red-50 border-red-200',
        getSizeClasses(),
        className
      )}>
        <span>⏰</span>
        <span>Trial Expired</span>
      </div>
    )
  }

  return (
    <div className={cn(
      'inline-flex items-center space-x-2 rounded-lg border font-mono font-semibold',
      getColorClasses(),
      getSizeClasses(),
      urgencyLevel === 'critical' && 'animate-pulse',
      className
    )}>
      {urgencyLevel === 'critical' && <span className="animate-bounce">🚨</span>}
      {urgencyLevel === 'warning' && <span>⚠️</span>}
      {urgencyLevel === 'normal' && <span>⏰</span>}
      
      <div className="flex items-center space-x-1">
        {days > 0 && (
          <>
            <span>{days}</span>
            {showLabels && <span className="text-xs opacity-70">d</span>}
          </>
        )}
        
        {(days > 0 || hours > 0) && (
          <>
            {days > 0 && <span className="opacity-50">:</span>}
            <span>{hours.toString().padStart(2, '0')}</span>
            {showLabels && <span className="text-xs opacity-70">h</span>}
          </>
        )}
        
        <span className="opacity-50">:</span>
        <span>{minutes.toString().padStart(2, '0')}</span>
        {showLabels && <span className="text-xs opacity-70">m</span>}
        
        <span className="opacity-50">:</span>
        <span>{seconds.toString().padStart(2, '0')}</span>
        {showLabels && <span className="text-xs opacity-70">s</span>}
      </div>
      
      {urgencyLevel === 'critical' && (
        <span className="text-xs font-normal opacity-75">left!</span>
      )}
    </div>
  )
}

// ============================================
// 3. SOCIAL PROOF WIDGET - Live activity feeds
// ============================================

interface SocialProofWidgetProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  rotationInterval?: number
  className?: string
}

interface SocialProofEvent {
  type: 'signup' | 'upgrade' | 'project_completed' | 'material_ordered' | 'professional_contacted'
  message: string
  timestamp: Date
  location?: string
  value?: string
  icon: string
}

const socialProofEvents: SocialProofEvent[] = [
  {
    type: 'upgrade',
    message: 'Sarah from Leeds upgraded to Pro',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    location: 'Leeds',
    icon: '🚀'
  },
  {
    type: 'project_completed',
    message: 'Michael completed a kitchen extension project',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    location: 'Manchester',
    value: '£28,000 saved',
    icon: '🏗️'
  },
  {
    type: 'signup',
    message: 'Emma started her free trial',
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    location: 'Birmingham',
    icon: '✨'
  },
  {
    type: 'material_ordered',
    message: 'James ordered materials for his bathroom renovation',
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    location: 'Bristol',
    value: '15% discount',
    icon: '📦'
  },
  {
    type: 'professional_contacted',
    message: 'Lisa contacted 3 verified builders',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    location: 'Liverpool',
    icon: '👷'
  }
]

export function SocialProofWidget({
  position = 'bottom-left',
  rotationInterval = 4000,
  className
}: SocialProofWidgetProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false)
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % socialProofEvents.length)
        setIsVisible(true)
      }, 300)
    }, rotationInterval)

    return () => clearInterval(timer)
  }, [rotationInterval])

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-6 left-6'
      case 'top-right':
        return 'top-6 right-6'
      case 'bottom-right':
        return 'bottom-6 right-6'
      default:
        return 'bottom-6 left-6'
    }
  }

  const currentEvent = socialProofEvents[currentIndex]
  const timeAgo = Math.floor((Date.now() - currentEvent.timestamp.getTime()) / (60 * 1000))

  return (
    <div className={cn(
      'fixed z-50 max-w-sm',
      getPositionClasses(),
      className
    )}>
      <div className={cn(
        'bg-white rounded-lg shadow-lg border border-gray-200 p-4 transform transition-all duration-300',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      )}>
        <div className="flex items-start space-x-3">
          <div className="text-2xl">{currentEvent.icon}</div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {currentEvent.message}
            </p>
            
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-500">
                {timeAgo} minutes ago
              </span>
              
              {currentEvent.value && (
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {currentEvent.value}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Progress dots */}
        <div className="flex justify-center space-x-1 mt-3">
          {socialProofEvents.map((_, index) => (
            <div
              key={index}
              className={cn(
                'w-1.5 h-1.5 rounded-full transition-colors',
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// 4. URGENCY TRIGGERS - Scarcity messaging
// ============================================

interface UrgencyTriggersProps {
  triggers: UrgencyTrigger[]
  onTriggerClick?: (trigger: UrgencyTrigger) => void
  className?: string
}

interface UrgencyTrigger {
  id: string
  type: 'limited_spots' | 'price_increase' | 'time_limited' | 'geographic' | 'usage_based'
  message: string
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical'
  expiresAt?: Date
  remainingCount?: number
  action?: {
    text: string
    onClick: () => void
  }
  conditions?: {
    userTier?: ('free' | 'trial' | 'pro')[]
    pageContext?: string[]
  }
}

const defaultUrgencyTriggers: UrgencyTrigger[] = [
  {
    id: 'limited_pro_spots',
    type: 'limited_spots',
    message: 'Only 3 Pro spots left today in your area',
    urgencyLevel: 'high',
    remainingCount: 3,
    action: {
      text: 'Secure Your Spot',
      onClick: () => console.log('Upgrade to Pro')
    },
    conditions: {
      userTier: ['free', 'trial']
    }
  },
  {
    id: 'price_increase_warning',
    type: 'price_increase',
    message: 'Price increasing by 20% next month',
    urgencyLevel: 'medium',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    action: {
      text: 'Lock In Current Price',
      onClick: () => console.log('Upgrade now')
    },
    conditions: {
      userTier: ['free', 'trial']
    }
  },
  {
    id: 'geographic_scarcity',
    type: 'geographic',
    message: 'Last Pro subscription available in Leeds today',
    urgencyLevel: 'critical',
    action: {
      text: 'Claim Now',
      onClick: () => console.log('Geographic urgency')
    },
    conditions: {
      userTier: ['free']
    }
  }
]

export function UrgencyTriggers({
  triggers = defaultUrgencyTriggers,
  onTriggerClick,
  className
}: UrgencyTriggersProps) {
  const [activeTriggers, setActiveTriggers] = useState<UrgencyTrigger[]>([])
  const [dismissedTriggers, setDismissedTriggers] = useState<string[]>([])

  useEffect(() => {
    // Filter triggers based on conditions and dismissal status
    const validTriggers = triggers.filter(trigger => {
      // Skip dismissed triggers
      if (dismissedTriggers.includes(trigger.id)) return false
      
      // Check expiry
      if (trigger.expiresAt && trigger.expiresAt < new Date()) return false
      
      // Check remaining count
      if (trigger.remainingCount !== undefined && trigger.remainingCount <= 0) return false
      
      // In real implementation, check user tier and page context
      return true
    })

    setActiveTriggers(validTriggers.slice(0, 2)) // Show max 2 triggers
  }, [triggers, dismissedTriggers])

  const handleDismiss = (triggerId: string) => {
    setDismissedTriggers(prev => [...prev, triggerId])
  }

  const handleTriggerClick = (trigger: UrgencyTrigger) => {
    onTriggerClick?.(trigger)
    trigger.action?.onClick()
  }

  const getUrgencyColors = (level: UrgencyTrigger['urgencyLevel']) => {
    switch (level) {
      case 'critical':
        return 'bg-red-500 text-white border-red-600'
      case 'high':
        return 'bg-orange-500 text-white border-orange-600'
      case 'medium':
        return 'bg-yellow-500 text-white border-yellow-600'
      default:
        return 'bg-blue-500 text-white border-blue-600'
    }
  }

  const getUrgencyIcon = (type: UrgencyTrigger['type']) => {
    switch (type) {
      case 'limited_spots':
        return '🔥'
      case 'price_increase':
        return '📈'
      case 'time_limited':
        return '⏰'
      case 'geographic':
        return '📍'
      case 'usage_based':
        return '⚡'
      default:
        return '⚠️'
    }
  }

  if (activeTriggers.length === 0) return null

  return (
    <div className={cn('fixed top-20 right-6 z-50 space-y-2', className)}>
      {activeTriggers.map((trigger) => (
        <div
          key={trigger.id}
          className={cn(
            'max-w-sm p-4 rounded-lg shadow-lg border transform transition-all duration-300 animate-in slide-in-from-right',
            getUrgencyColors(trigger.urgencyLevel),
            trigger.urgencyLevel === 'critical' && 'animate-pulse'
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-2">
              <span className="text-xl">{getUrgencyIcon(trigger.type)}</span>
              <div>
                <p className="text-sm font-medium">
                  {trigger.message}
                </p>
                
                {trigger.remainingCount !== undefined && (
                  <p className="text-xs opacity-90 mt-1">
                    Only {trigger.remainingCount} remaining
                  </p>
                )}
                
                {trigger.expiresAt && (
                  <p className="text-xs opacity-90 mt-1">
                    Expires: {trigger.expiresAt.toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            
            <button
              onClick={() => handleDismiss(trigger.id)}
              className="text-white opacity-70 hover:opacity-100 ml-2"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          {trigger.action && (
            <button
              onClick={() => handleTriggerClick(trigger)}
              className="mt-3 w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm"
            >
              {trigger.action.text}
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

// ============================================
// 5. PROGRESSIVE PROFILER - Contextual data collection
// ============================================

interface ProgressiveProfilerProps {
  enabled?: boolean
  maxQuestionsPerSession?: number
  onComplete?: (data: ProfileData) => void
  className?: string
}

interface ProfileQuestion {
  id: string
  type: 'select' | 'text' | 'range' | 'multiselect'
  question: string
  options?: string[]
  placeholder?: string
  required?: boolean
  context: 'onboarding' | 'project_start' | 'materials' | 'professionals'
  priority: number
  userTypes: ('homeowner' | 'professional' | 'developer')[]
}

interface ProfileData {
  [key: string]: any
}

const profileQuestions: ProfileQuestion[] = [
  {
    id: 'project_type',
    type: 'select',
    question: 'What type of project are you planning?',
    options: ['Kitchen Extension', 'Loft Conversion', 'Bathroom Renovation', 'Full House Renovation', 'New Build', 'Garden Office', 'Other'],
    required: true,
    context: 'project_start',
    priority: 1,
    userTypes: ['homeowner', 'developer']
  },
  {
    id: 'budget_range',
    type: 'range',
    question: 'What\'s your approximate budget?',
    required: false,
    context: 'project_start',
    priority: 2,
    userTypes: ['homeowner', 'developer']
  },
  {
    id: 'timeline',
    type: 'select',
    question: 'When do you want to start?',
    options: ['Within 1 month', '1-3 months', '3-6 months', '6+ months', 'Just exploring'],
    required: false,
    context: 'project_start',
    priority: 3,
    userTypes: ['homeowner', 'developer']
  }
]

export function ProgressiveProfiler({
  enabled = true,
  maxQuestionsPerSession = 2,
  onComplete,
  className
}: ProgressiveProfilerProps) {
  const { user } = useUser()
  const { awardXP } = useFreemium()
  
  const [isVisible, setIsVisible] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<ProfileQuestion | null>(null)
  const [answers, setAnswers] = useState<ProfileData>({})
  const [sessionQuestionCount, setSessionQuestionCount] = useState(0)
  
  // Determine next question to ask
  const getNextQuestion = useCallback(() => {
    if (!user || sessionQuestionCount >= maxQuestionsPerSession) return null
    
    // Get user's profile data from localStorage
    const existingProfile = JSON.parse(localStorage.getItem('buildmate_profile_data') || '{}')
    
    // Filter questions based on context, user type, and what's already answered
    const relevantQuestions = profileQuestions.filter(q => {
      // Skip if already answered
      if (existingProfile[q.id]) return false
      
      // For now, assume user is homeowner - in real implementation, detect from behavior
      const userType = 'homeowner'
      if (!q.userTypes.includes(userType)) return false
      
      return true
    })
    
    // Sort by priority and return first
    relevantQuestions.sort((a, b) => a.priority - b.priority)
    return relevantQuestions[0] || null
  }, [user, sessionQuestionCount, maxQuestionsPerSession])

  // Trigger profiler at strategic moments
  const triggerProfiler = useCallback((context: ProfileQuestion['context']) => {
    if (!enabled || !user || sessionQuestionCount >= maxQuestionsPerSession) return
    
    const nextQuestion = getNextQuestion()
    if (nextQuestion && nextQuestion.context === context) {
      setCurrentQuestion(nextQuestion)
      setIsVisible(true)
    }
  }, [enabled, user, sessionQuestionCount, maxQuestionsPerSession, getNextQuestion])

  // Handle answer submission
  const handleAnswer = (answer: any) => {
    if (!currentQuestion) return
    
    const newAnswers = { ...answers, [currentQuestion.id]: answer }
    setAnswers(newAnswers)
    
    // Save to localStorage
    const existingProfile = JSON.parse(localStorage.getItem('buildmate_profile_data') || '{}')
    const updatedProfile = { ...existingProfile, ...newAnswers }
    localStorage.setItem('buildmate_profile_data', JSON.stringify(updatedProfile))
    
    // Award XP for engagement
    awardXP(10, `Answered profile question: ${currentQuestion.question}`)
    
    // Increment session count
    setSessionQuestionCount(prev => prev + 1)
    
    // Close modal
    setIsVisible(false)
    setCurrentQuestion(null)
    
    // Call completion callback
    onComplete?.(updatedProfile)
  }

  const handleSkip = () => {
    setIsVisible(false)
    setCurrentQuestion(null)
    setSessionQuestionCount(prev => prev + 1)
  }

  // Expose trigger function globally for other components to use
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).triggerProgressiveProfiler = triggerProfiler
    }
  }, [triggerProfiler])

  if (!isVisible || !currentQuestion) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className={cn(
        'max-w-lg w-full bg-white rounded-xl shadow-xl transform animate-in slide-in-from-bottom duration-300',
        className
      )}>
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Quick Question
            </h3>
            <p className="text-gray-600">
              {currentQuestion.question}
            </p>
          </div>

          <div className="space-y-3">
            {currentQuestion.type === 'select' && currentQuestion.options && (
              <div className="space-y-2">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'text' && (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder={currentQuestion.placeholder}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAnswer((e.target as HTMLInputElement).value)
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    const input = document.querySelector('input') as HTMLInputElement
                    if (input.value.trim()) {
                      handleAnswer(input.value.trim())
                    }
                  }}
                  variant="primary"
                  className="w-full"
                >
                  Continue
                </Button>
              </div>
            )}

            {currentQuestion.type === 'range' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm text-gray-600">Budget Range</label>
                  <input
                    type="range"
                    min="5000"
                    max="200000"
                    step="5000"
                    defaultValue="25000"
                    className="w-full"
                    onChange={(e) => {
                      const value = parseInt(e.target.value)
                      const display = document.getElementById('budget-display')
                      if (display) display.textContent = `£${value.toLocaleString()}`
                    }}
                  />
                  <div className="text-center">
                    <span id="budget-display" className="text-lg font-semibold text-blue-600">£25,000</span>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    const range = document.querySelector('input[type="range"]') as HTMLInputElement
                    handleAnswer(parseInt(range.value))
                  }}
                  variant="primary"
                  className="w-full"
                >
                  Continue
                </Button>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
            <span>
              {sessionQuestionCount + 1} of {maxQuestionsPerSession} questions
            </span>
            <button
              onClick={handleSkip}
              className="text-blue-600 hover:text-blue-700"
            >
              Skip for now
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}

// Hook for other components to trigger profiler
export function useProgressiveProfiler() {
  const triggerProfiler = (context: ProfileQuestion['context']) => {
    if (typeof window !== 'undefined' && (window as any).triggerProgressiveProfiler) {
      (window as any).triggerProgressiveProfiler(context)
    }
  }

  return { triggerProfiler }
}

// Hook for accessing exit intent analytics (for admin dashboard)
export function useExitIntentAnalytics() {
  const [analytics, setAnalytics] = useState<ExitIntentAnalytics[]>([])

  const getConversionRate = () => {
    const shown = analytics.filter(a => a.action === 'shown').length
    const converted = analytics.filter(a => a.action === 'converted').length
    return shown > 0 ? (converted / shown) * 100 : 0
  }

  const getAnalyticsByVariant = () => {
    const byVariant = analytics.reduce((acc, item) => {
      const key = item.variant
      if (!acc[key]) acc[key] = { shown: 0, converted: 0, dismissed: 0 }
      acc[key][item.action]++
      return acc
    }, {} as Record<string, Record<string, number>>)

    return Object.entries(byVariant).map(([variant, data]) => ({
      variant,
      ...data,
      conversionRate: data.shown > 0 ? (data.converted / data.shown) * 100 : 0
    }))
  }

  return {
    analytics,
    conversionRate: getConversionRate(),
    variantPerformance: getAnalyticsByVariant(),
    totalShown: analytics.filter(a => a.action === 'shown').length,
    totalConverted: analytics.filter(a => a.action === 'converted').length
  }
}
