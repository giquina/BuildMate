'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from './Button'

interface FOOMNotificationsProps {
  notifications: FOOMNotification[]
  onNotificationClick?: (notification: FOOMNotification) => void
  onDismiss?: (notificationId: string) => void
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'
  className?: string
}

interface FOOMNotification {
  id: string
  type: 'upgrade_activity' | 'streak_warning' | 'progress_loss' | 'time_sensitive' | 'social_proof' | 'scarcity' | 'milestone'
  title: string
  message: string
  urgency: 'low' | 'medium' | 'high' | 'critical'
  icon?: string
  ctaText?: string
  ctaAction?: () => void
  dismissible: boolean
  autoHide?: boolean
  hideAfter?: number // milliseconds
  animation?: 'slide' | 'bounce' | 'pulse' | 'shake'
  soundEffect?: boolean
  timestamp: Date
  expiresAt?: Date
}

interface NotificationCardProps {
  notification: FOOMNotification
  onDismiss?: (id: string) => void
  onClick?: () => void
}

const urgencyStyles = {
  low: 'border-gray-300 bg-gray-50 text-gray-800',
  medium: 'border-blue-300 bg-blue-50 text-blue-800',
  high: 'border-orange-300 bg-orange-50 text-orange-800',
  critical: 'border-red-300 bg-red-50 text-red-800'
}

const urgencyIcons = {
  low: 'ℹ️',
  medium: '💡', 
  high: '⚠️',
  critical: '🚨'
}

const typeColors = {
  upgrade_activity: 'from-green-400 to-green-600',
  streak_warning: 'from-red-400 to-red-600',
  progress_loss: 'from-yellow-400 to-yellow-600',
  time_sensitive: 'from-orange-400 to-orange-600',
  social_proof: 'from-blue-400 to-blue-600',
  scarcity: 'from-purple-400 to-purple-600',
  milestone: 'from-indigo-400 to-indigo-600'
}

const animations = {
  slide: 'animate-slide-in-right',
  bounce: 'animate-bounce-in',
  pulse: 'animate-pulse-in',
  shake: 'animate-shake'
}

function NotificationCard({ notification, onDismiss, onClick }: NotificationCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHiding, setIsHiding] = useState(false)

  useEffect(() => {
    // Show animation
    const showTimer = setTimeout(() => setIsVisible(true), 100)
    
    // Auto-hide if enabled
    let hideTimer: NodeJS.Timeout
    if (notification.autoHide && notification.hideAfter) {
      hideTimer = setTimeout(() => {
        handleHide()
      }, notification.hideAfter)
    }

    // Sound effect
    if (notification.soundEffect && notification.urgency === 'critical') {
      // In a real app, you would play a sound here
      // navigator.vibrate?.([200, 100, 200])
    }

    return () => {
      clearTimeout(showTimer)
      if (hideTimer) clearTimeout(hideTimer)
    }
  }, [notification])

  const handleHide = () => {
    setIsHiding(true)
    setTimeout(() => {
      onDismiss?.(notification.id)
    }, 300)
  }

  const handleClick = () => {
    if (notification.ctaAction) {
      notification.ctaAction()
    } else {
      onClick?.()
    }
  }

  const isExpired = notification.expiresAt && new Date() > notification.expiresAt
  const timeLeft = notification.expiresAt ? notification.expiresAt.getTime() - Date.now() : null
  const minutesLeft = timeLeft ? Math.ceil(timeLeft / (1000 * 60)) : null

  return (
    <div
      className={cn(
        'relative max-w-sm w-full bg-white rounded-lg border shadow-lg overflow-hidden',
        'transform transition-all duration-300 ease-out',
        urgencyStyles[notification.urgency],
        isVisible && !isHiding ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95',
        isHiding && 'translate-x-full opacity-0',
        notification.animation && animations[notification.animation],
        notification.urgency === 'critical' && 'animate-pulse shadow-red-500/25',
        'cursor-pointer hover:shadow-xl hover:scale-105',
        isExpired && 'opacity-60 grayscale'
      )}
      onClick={handleClick}
    >
      {/* Urgency indicator stripe */}
      <div className={cn(
        'absolute left-0 top-0 w-1 h-full',
        'bg-gradient-to-b',
        typeColors[notification.type]
      )} />

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start space-x-3">
          {/* Icon */}
          <div className="flex-shrink-0 mt-0.5">
            <span className="text-lg">
              {notification.icon || urgencyIcons[notification.urgency]}
            </span>
          </div>

          {/* Message */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 leading-tight">
                  {notification.title}
                </h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  {notification.message}
                </p>
              </div>
              
              {notification.dismissible && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleHide()
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Time indicator */}
            {minutesLeft && minutesLeft > 0 && (
              <div className="mt-2 text-xs font-medium text-gray-500">
                ⏰ {minutesLeft < 60 ? `${minutesLeft}m left` : `${Math.ceil(minutesLeft/60)}h left`}
              </div>
            )}

            {/* CTA Button */}
            {notification.ctaText && (
              <div className="mt-3">
                <Button
                  size="sm"
                  variant={notification.urgency === 'critical' ? 'warning' : 'primary'}
                  className="w-full text-xs py-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClick()
                  }}
                >
                  {notification.ctaText}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Special effects */}
      {notification.urgency === 'critical' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-8 h-8 bg-red-400 rounded-full opacity-20 animate-ping" />
          <div className="absolute bottom-0 left-4 w-6 h-6 bg-orange-400 rounded-full opacity-20 animate-bounce" />
        </div>
      )}

      {notification.type === 'upgrade_activity' && (
        <div className="absolute top-1 right-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
      )}
    </div>
  )
}

function createMockNotifications(): FOOMNotification[] {
  const now = new Date()
  
  return [
    {
      id: '1',
      type: 'upgrade_activity',
      title: 'Live Activity',
      message: '23 people upgraded in the last hour',
      urgency: 'medium',
      icon: '🔥',
      ctaText: 'Join them',
      dismissible: true,
      autoHide: true,
      hideAfter: 8000,
      animation: 'slide',
      timestamp: now,
      ctaAction: () => console.log('Upgrade clicked')
    },
    {
      id: '2', 
      type: 'streak_warning',
      title: 'Streak at Risk!',
      message: 'Your 7-day streak ends in 2 hours. Complete a challenge to keep it alive!',
      urgency: 'high',
      icon: '💔',
      ctaText: 'Save Streak',
      dismissible: true,
      animation: 'shake',
      timestamp: new Date(now.getTime() - 5 * 60 * 1000),
      expiresAt: new Date(now.getTime() + 2 * 60 * 60 * 1000),
      ctaAction: () => console.log('Save streak clicked')
    },
    {
      id: '3',
      type: 'progress_loss',
      title: 'Progress Will Be Lost',
      message: '2 hours of AI suggestions and planning will be deleted if you don\'t save now',
      urgency: 'critical',
      icon: '⚠️',
      ctaText: 'Save Progress',
      dismissible: false,
      animation: 'pulse',
      soundEffect: true,
      timestamp: new Date(now.getTime() - 10 * 60 * 1000),
      ctaAction: () => console.log('Save progress clicked')
    },
    {
      id: '4',
      type: 'social_proof',
      title: 'Success Story',
      message: 'Sarah M. just saved £8,000 on her kitchen extension using BuildMate AI',
      urgency: 'low',
      icon: '💰',
      ctaText: 'See How',
      dismissible: true,
      autoHide: true,
      hideAfter: 10000,
      animation: 'slide',
      timestamp: new Date(now.getTime() - 15 * 60 * 1000)
    },
    {
      id: '5',
      type: 'time_sensitive',
      title: 'Limited Time Offer',
      message: '50% off Pro plan ends in 3 hours. Save £174 this year!',
      urgency: 'high',
      icon: '⚡',
      ctaText: 'Claim Discount',
      dismissible: true,
      animation: 'bounce',
      timestamp: new Date(now.getTime() - 20 * 60 * 1000),
      expiresAt: new Date(now.getTime() + 3 * 60 * 60 * 1000),
      ctaAction: () => console.log('Claim discount clicked')
    },
    {
      id: '6',
      type: 'scarcity',
      title: 'Almost Full!',
      message: 'Only 3 spots left in today\'s premium support queue',
      urgency: 'medium',
      icon: '🎯',
      ctaText: 'Reserve Spot',
      dismissible: true,
      animation: 'slide',
      timestamp: new Date(now.getTime() - 25 * 60 * 1000),
      ctaAction: () => console.log('Reserve spot clicked')
    },
    {
      id: '7',
      type: 'milestone',
      title: 'Achievement Unlocked!',
      message: 'You\'ve earned the "Design Master" badge! Claim your 200 XP bonus.',
      urgency: 'medium',
      icon: '🏆',
      ctaText: 'Claim Reward',
      dismissible: true,
      autoHide: true,
      hideAfter: 12000,
      animation: 'bounce',
      timestamp: new Date(now.getTime() - 30 * 60 * 1000)
    }
  ]
}

export function FOOMNotifications({ 
  notifications = [], 
  onNotificationClick, 
  onDismiss, 
  position = 'top-right',
  className 
}: FOOMNotificationsProps) {
  const [activeNotifications, setActiveNotifications] = useState<FOOMNotification[]>([])
  const [notificationQueue, setNotificationQueue] = useState<FOOMNotification[]>([])

  // Use mock data if no notifications provided
  const allNotifications = notifications.length > 0 ? notifications : createMockNotifications()

  useEffect(() => {
    // Initialize with mock notifications for demo
    const initialNotifications = allNotifications.slice(0, 2) // Show first 2 immediately
    const queuedNotifications = allNotifications.slice(2) // Queue the rest
    
    setActiveNotifications(initialNotifications)
    setNotificationQueue(queuedNotifications)

    // Schedule queued notifications
    queuedNotifications.forEach((notification, index) => {
      setTimeout(() => {
        addNotification(notification)
      }, (index + 1) * 15000) // Show every 15 seconds
    })
  }, [])

  const addNotification = (notification: FOOMNotification) => {
    setActiveNotifications(current => {
      // Keep only the most recent 3 notifications
      const filtered = current.slice(-2)
      return [...filtered, notification]
    })
  }

  const removeNotification = (id: string) => {
    setActiveNotifications(current => 
      current.filter(notification => notification.id !== id)
    )
    onDismiss?.(id)
  }

  const handleNotificationClick = (notification: FOOMNotification) => {
    if (notification.ctaAction) {
      notification.ctaAction()
    }
    onNotificationClick?.(notification)
  }

  const positionStyles = {
    'top-right': 'top-4 right-4',
    'bottom-right': 'bottom-4 right-4', 
    'top-left': 'top-4 left-4',
    'bottom-left': 'bottom-4 left-4'
  }

  if (activeNotifications.length === 0) return null

  return (
    <div className={cn(
      'fixed z-50 pointer-events-none',
      positionStyles[position],
      className
    )}>
      <div className="space-y-3 pointer-events-auto">
        {activeNotifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onDismiss={removeNotification}
            onClick={() => handleNotificationClick(notification)}
          />
        ))}
      </div>
    </div>
  )
}

// Utility functions for creating notifications
export const createUpgradeActivityNotification = (count: number): FOOMNotification => ({
  id: `upgrade_${Date.now()}`,
  type: 'upgrade_activity',
  title: 'Live Activity',
  message: `${count} people upgraded in the last hour`,
  urgency: 'medium',
  icon: '🔥',
  ctaText: 'Join them',
  dismissible: true,
  autoHide: true,
  hideAfter: 8000,
  animation: 'slide',
  timestamp: new Date()
})

export const createStreakWarningNotification = (hoursLeft: number): FOOMNotification => ({
  id: `streak_${Date.now()}`,
  type: 'streak_warning',
  title: 'Streak at Risk!',
  message: `Your streak ends in ${hoursLeft} hour${hoursLeft !== 1 ? 's' : ''}. Don't lose your progress!`,
  urgency: 'high',
  icon: '💔',
  ctaText: 'Save Streak',
  dismissible: true,
  animation: 'shake',
  timestamp: new Date(),
  expiresAt: new Date(Date.now() + hoursLeft * 60 * 60 * 1000)
})

export const createProgressLossNotification = (): FOOMNotification => ({
  id: `progress_${Date.now()}`,
  type: 'progress_loss',
  title: 'Progress Will Be Lost',
  message: 'Hours of work will be deleted if you don\'t save now',
  urgency: 'critical',
  icon: '⚠️',
  ctaText: 'Save Progress',
  dismissible: false,
  animation: 'pulse',
  soundEffect: true,
  timestamp: new Date()
})

export const createSocialProofNotification = (name: string, achievement: string): FOOMNotification => ({
  id: `social_${Date.now()}`,
  type: 'social_proof',
  title: 'Success Story',
  message: `${name} just ${achievement} using BuildMate AI`,
  urgency: 'low',
  icon: '💰',
  ctaText: 'See How',
  dismissible: true,
  autoHide: true,
  hideAfter: 10000,
  animation: 'slide',
  timestamp: new Date()
})

// Hook for managing FOOM notifications
export function useFOOMNotifications() {
  const [notifications, setNotifications] = useState<FOOMNotification[]>([])

  const addNotification = (notification: FOOMNotification) => {
    setNotifications(current => [...current, notification])
  }

  const removeNotification = (id: string) => {
    setNotifications(current => current.filter(n => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    // Convenience methods
    showUpgradeActivity: (count: number) => addNotification(createUpgradeActivityNotification(count)),
    showStreakWarning: (hoursLeft: number) => addNotification(createStreakWarningNotification(hoursLeft)),
    showProgressLoss: () => addNotification(createProgressLossNotification()),
    showSocialProof: (name: string, achievement: string) => addNotification(createSocialProofNotification(name, achievement))
  }
}