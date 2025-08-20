'use client'

import React, { useEffect, useCallback, useRef, useState } from 'react'
import { useUser } from '@/contexts/UserContext'

// Types for cart abandonment tracking
export interface CartItem {
  id: string
  materialId: string
  name: string
  price: number
  quantity: number
  addedAt: Date
  lastModified: Date
}

export interface CartSession {
  id: string
  userId?: string
  items: CartItem[]
  totalValue: number
  createdAt: Date
  lastActivity: Date
  abandonedAt?: Date
  recoveredAt?: Date
  recoveryAttempts: number
  source: 'direct' | 'search' | 'recommendation' | 'return_visit'
}

export interface AbandonmentEvent {
  sessionId: string
  userId?: string
  cartValue: number
  itemCount: number
  timeSpentOnCart: number
  exitTrigger: 'page_exit' | 'timeout' | 'tab_close' | 'navigation'
  recoveryTriggers: RecoveryTrigger[]
  timestamp: Date
}

export interface RecoveryTrigger {
  type: 'immediate_modal' | 'exit_intent' | 'email_sequence' | 'return_user_banner'
  triggered: boolean
  triggeredAt?: Date
  converted: boolean
  convertedAt?: Date
}

export interface CartAnalytics {
  totalSessions: number
  abandonedSessions: number
  recoveredSessions: number
  abandonmentRate: number
  recoveryRate: number
  averageCartValue: number
  averageTimeToAbandonment: number
  topAbandonmentReasons: string[]
  conversionFunnelData: {
    materialsViewed: number
    itemsAdded: number
    cartVisited: number
    checkoutStarted: number
    ordersCompleted: number
  }
}

interface AbandonedCartTrackerProps {
  onAbandonmentDetected?: (event: AbandonmentEvent) => void
  onRecoveryOpportunity?: (sessionId: string, cartValue: number) => void
  timeoutMinutes?: number
  enableEmailTriggers?: boolean
  children?: React.ReactNode
}

// Local storage keys
const CART_SESSION_KEY = 'buildmate_cart_session'
const ABANDONMENT_ANALYTICS_KEY = 'buildmate_abandonment_analytics'

export function AbandonedCartTracker({
  onAbandonmentDetected,
  onRecoveryOpportunity,
  timeoutMinutes = 5,
  enableEmailTriggers = true,
  children
}: AbandonedCartTrackerProps) {
  const { user, isAuthenticated } = useUser()
  const [currentSession, setCurrentSession] = useState<CartSession | null>(null)
  const [analytics, setAnalytics] = useState<CartAnalytics | null>(null)
  
  const sessionRef = useRef<CartSession | null>(null)
  const lastActivityRef = useRef<Date>(new Date())
  const abandonmentTimerRef = useRef<NodeJS.Timeout | null>(null)
  const activityListenersRef = useRef<boolean>(false)

  // Initialize or restore cart session
  const initializeSession = useCallback(() => {
    const existingSession = localStorage.getItem(CART_SESSION_KEY)
    let session: CartSession

    if (existingSession) {
      try {
        const parsed = JSON.parse(existingSession)
        session = {
          ...parsed,
          createdAt: new Date(parsed.createdAt),
          lastActivity: new Date(parsed.lastActivity),
          abandonedAt: parsed.abandonedAt ? new Date(parsed.abandonedAt) : undefined,
          recoveredAt: parsed.recoveredAt ? new Date(parsed.recoveredAt) : undefined,
          items: parsed.items.map((item: any) => ({
            ...item,
            addedAt: new Date(item.addedAt),
            lastModified: new Date(item.lastModified)
          }))
        }
        
        // Check if session was abandoned and user returned
        if (session.abandonedAt && !session.recoveredAt) {
          const abandonedHours = (Date.now() - session.abandonedAt.getTime()) / (1000 * 60 * 60)
          if (abandonedHours < 72 && session.items.length > 0) {
            // Recovery opportunity detected
            onRecoveryOpportunity?.(session.id, session.totalValue)
            session.recoveredAt = new Date()
            session.recoveryAttempts += 1
          }
        }
      } catch (error) {
        console.warn('Failed to parse cart session from localStorage')
        session = createNewSession()
      }
    } else {
      session = createNewSession()
    }

    setCurrentSession(session)
    sessionRef.current = session
    persistSession(session)
    return session
  }, [onRecoveryOpportunity])

  // Create new cart session
  const createNewSession = useCallback((): CartSession => {
    return {
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: user?.id,
      items: [],
      totalValue: 0,
      createdAt: new Date(),
      lastActivity: new Date(),
      recoveryAttempts: 0,
      source: 'direct'
    }
  }, [user?.id])

  // Persist session to localStorage
  const persistSession = useCallback((session: CartSession) => {
    localStorage.setItem(CART_SESSION_KEY, JSON.stringify(session))
  }, [])

  // Update analytics
  const updateAnalytics = useCallback((event: AbandonmentEvent) => {
    const existing = localStorage.getItem(ABANDONMENT_ANALYTICS_KEY)
    let analytics: CartAnalytics

    if (existing) {
      try {
        analytics = JSON.parse(existing)
      } catch {
        analytics = createEmptyAnalytics()
      }
    } else {
      analytics = createEmptyAnalytics()
    }

    // Update abandonment analytics
    analytics.totalSessions += 1
    analytics.abandonedSessions += 1
    analytics.averageCartValue = (analytics.averageCartValue + event.cartValue) / 2
    
    // Update funnel data
    analytics.conversionFunnelData.cartVisited += 1
    
    analytics.abandonmentRate = (analytics.abandonedSessions / analytics.totalSessions) * 100
    
    localStorage.setItem(ABANDONMENT_ANALYTICS_KEY, JSON.stringify(analytics))
    setAnalytics(analytics)
  }, [])

  const createEmptyAnalytics = (): CartAnalytics => ({
    totalSessions: 0,
    abandonedSessions: 0,
    recoveredSessions: 0,
    abandonmentRate: 0,
    recoveryRate: 0,
    averageCartValue: 0,
    averageTimeToAbandonment: 0,
    topAbandonmentReasons: [],
    conversionFunnelData: {
      materialsViewed: 0,
      itemsAdded: 0,
      cartVisited: 0,
      checkoutStarted: 0,
      ordersCompleted: 0
    }
  })

  // Track cart activity
  const trackActivity = useCallback(() => {
    const now = new Date()
    lastActivityRef.current = now
    
    if (sessionRef.current) {
      sessionRef.current.lastActivity = now
      if (sessionRef.current.abandonedAt) {
        // Session was recovered
        sessionRef.current.recoveredAt = now
        sessionRef.current.abandonedAt = undefined
      }
      persistSession(sessionRef.current)
      setCurrentSession({ ...sessionRef.current })
    }

    // Reset abandonment timer
    if (abandonmentTimerRef.current) {
      clearTimeout(abandonmentTimerRef.current)
    }
    
    abandonmentTimerRef.current = setTimeout(() => {
      detectAbandonment()
    }, timeoutMinutes * 60 * 1000)
  }, [timeoutMinutes])

  // Detect cart abandonment
  const detectAbandonment = useCallback(() => {
    if (!sessionRef.current || sessionRef.current.items.length === 0) {
      return
    }

    const now = new Date()
    const timeSpent = now.getTime() - sessionRef.current.createdAt.getTime()
    
    const abandonmentEvent: AbandonmentEvent = {
      sessionId: sessionRef.current.id,
      userId: sessionRef.current.userId,
      cartValue: sessionRef.current.totalValue,
      itemCount: sessionRef.current.items.length,
      timeSpentOnCart: timeSpent,
      exitTrigger: 'timeout',
      recoveryTriggers: [
        {
          type: 'immediate_modal',
          triggered: false,
          converted: false
        },
        {
          type: 'exit_intent',
          triggered: false,
          converted: false
        },
        ...(enableEmailTriggers && isAuthenticated ? [{
          type: 'email_sequence' as const,
          triggered: false,
          converted: false
        }] : []),
        {
          type: 'return_user_banner',
          triggered: false,
          converted: false
        }
      ],
      timestamp: now
    }

    // Mark session as abandoned
    sessionRef.current.abandonedAt = now
    persistSession(sessionRef.current)
    setCurrentSession({ ...sessionRef.current })

    // Update analytics
    updateAnalytics(abandonmentEvent)

    // Trigger abandonment callback
    onAbandonmentDetected?.(abandonmentEvent)
  }, [enableEmailTriggers, isAuthenticated, onAbandonmentDetected, updateAnalytics])

  // Add item to cart
  const addToCart = useCallback((item: Omit<CartItem, 'addedAt' | 'lastModified'>) => {
    if (!sessionRef.current) return

    const now = new Date()
    const cartItem: CartItem = {
      ...item,
      addedAt: now,
      lastModified: now
    }

    const existingItemIndex = sessionRef.current.items.findIndex(i => i.materialId === item.materialId)
    
    if (existingItemIndex >= 0) {
      // Update existing item
      sessionRef.current.items[existingItemIndex] = {
        ...sessionRef.current.items[existingItemIndex],
        quantity: sessionRef.current.items[existingItemIndex].quantity + item.quantity,
        lastModified: now
      }
    } else {
      // Add new item
      sessionRef.current.items.push(cartItem)
    }

    // Recalculate total value
    sessionRef.current.totalValue = sessionRef.current.items.reduce(
      (total, item) => total + (item.price * item.quantity), 0
    )

    persistSession(sessionRef.current)
    setCurrentSession({ ...sessionRef.current })
    trackActivity()
  }, [trackActivity])

  // Remove item from cart
  const removeFromCart = useCallback((materialId: string) => {
    if (!sessionRef.current) return

    sessionRef.current.items = sessionRef.current.items.filter(item => item.materialId !== materialId)
    sessionRef.current.totalValue = sessionRef.current.items.reduce(
      (total, item) => total + (item.price * item.quantity), 0
    )

    persistSession(sessionRef.current)
    setCurrentSession({ ...sessionRef.current })
    trackActivity()
  }, [trackActivity])

  // Update item quantity
  const updateQuantity = useCallback((materialId: string, quantity: number) => {
    if (!sessionRef.current) return

    const itemIndex = sessionRef.current.items.findIndex(item => item.materialId === materialId)
    if (itemIndex >= 0) {
      if (quantity <= 0) {
        removeFromCart(materialId)
      } else {
        sessionRef.current.items[itemIndex].quantity = quantity
        sessionRef.current.items[itemIndex].lastModified = new Date()
        sessionRef.current.totalValue = sessionRef.current.items.reduce(
          (total, item) => total + (item.price * item.quantity), 0
        )
        persistSession(sessionRef.current)
        setCurrentSession({ ...sessionRef.current })
        trackActivity()
      }
    }
  }, [removeFromCart, trackActivity])

  // Mark conversion completed
  const markConversion = useCallback(() => {
    if (!sessionRef.current) return

    // Clear abandoned cart
    sessionRef.current.items = []
    sessionRef.current.totalValue = 0
    sessionRef.current.recoveredAt = new Date()
    
    persistSession(sessionRef.current)
    setCurrentSession({ ...sessionRef.current })

    // Update analytics for successful conversion
    const existing = localStorage.getItem(ABANDONMENT_ANALYTICS_KEY)
    if (existing) {
      try {
        const analytics: CartAnalytics = JSON.parse(existing)
        analytics.conversionFunnelData.ordersCompleted += 1
        if (sessionRef.current.abandonedAt) {
          analytics.recoveredSessions += 1
          analytics.recoveryRate = (analytics.recoveredSessions / analytics.abandonedSessions) * 100
        }
        localStorage.setItem(ABANDONMENT_ANALYTICS_KEY, JSON.stringify(analytics))
        setAnalytics(analytics)
      } catch (error) {
        console.warn('Failed to update conversion analytics')
      }
    }
  }, [])

  // Setup activity listeners
  useEffect(() => {
    if (activityListenersRef.current) return

    const handleActivity = () => trackActivity()
    const handlePageUnload = () => {
      if (sessionRef.current && sessionRef.current.items.length > 0) {
        detectAbandonment()
      }
    }

    // Activity tracking events
    window.addEventListener('mousemove', handleActivity)
    window.addEventListener('keydown', handleActivity)
    window.addEventListener('scroll', handleActivity)
    window.addEventListener('click', handleActivity)
    
    // Page unload detection
    window.addEventListener('beforeunload', handlePageUnload)

    activityListenersRef.current = true

    return () => {
      window.removeEventListener('mousemove', handleActivity)
      window.removeEventListener('keydown', handleActivity)
      window.removeEventListener('scroll', handleActivity)
      window.removeEventListener('click', handleActivity)
      window.removeEventListener('beforeunload', handlePageUnload)
      
      if (abandonmentTimerRef.current) {
        clearTimeout(abandonmentTimerRef.current)
      }
      
      activityListenersRef.current = false
    }
  }, [trackActivity, detectAbandonment])

  // Initialize session on mount
  useEffect(() => {
    initializeSession()
  }, [initializeSession])

  // Load analytics on mount
  useEffect(() => {
    const existing = localStorage.getItem(ABANDONMENT_ANALYTICS_KEY)
    if (existing) {
      try {
        setAnalytics(JSON.parse(existing))
      } catch (error) {
        console.warn('Failed to load abandonment analytics')
      }
    }
  }, [])

  // Provide cart functions to children via context or props
  const cartFunctions = {
    currentSession,
    analytics,
    addToCart,
    removeFromCart,
    updateQuantity,
    markConversion,
    trackActivity
  }

  return (
    <>
      {children}
    </>
  )
}

// Hook for cart tracking
export function useAbandonedCartTracker() {
  const [isTracking, setIsTracking] = useState(false)
  const [currentSession, setCurrentSession] = useState<CartSession | null>(null)

  const startTracking = useCallback(() => {
    setIsTracking(true)
  }, [])

  const stopTracking = useCallback(() => {
    setIsTracking(false)
  }, [])

  return {
    isTracking,
    currentSession,
    startTracking,
    stopTracking
  }
}

export default AbandonedCartTracker