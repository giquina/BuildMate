'use client'

import React, { useEffect, useState } from 'react'
import { useFreemium } from '@/contexts/UserContext'
import { FeatureType, ProgressWarning, UpgradeTrigger } from '@/types/freemium'
import { Button } from './Button'
import { Badge } from './Badge'
import { Progress } from './Progress'
import { Card } from './Card'

interface FreemiumSystemProps {
  children: React.ReactNode
  feature?: FeatureType
  onUpgradeClick?: () => void
}

export function FreemiumSystem({ children, feature, onUpgradeClick }: FreemiumSystemProps) {
  const freemium = useFreemium()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [currentWarning, setCurrentWarning] = useState<ProgressWarning | null>(null)

  // Check feature access and trigger warnings/upgrades
  useEffect(() => {
    if (!feature) return

    const hasAccess = freemium.checkFeatureAccess(feature)
    
    if (!hasAccess) {
      // Show feature limit warning
      const warning: ProgressWarning = {
        id: `limit_${feature}_${Date.now()}`,
        type: 'feature_locked',
        title: getFeatureLimitTitle(feature),
        message: getFeatureLimitMessage(feature),
        action: 'upgrade',
        severity: 'warning',
        dismissible: true,
        ctaText: freemium.subscription.trialUsed ? 'Upgrade to Pro' : 'Start Free Trial',
        ctaAction: () => {
          if (onUpgradeClick) {
            onUpgradeClick()
          } else {
            setShowUpgradeModal(true)
          }
        }
      }
      setCurrentWarning(warning)
      freemium.showProgressWarning(warning)
    }
  }, [feature, freemium, onUpgradeClick])

  // Monitor for upgrade triggers
  useEffect(() => {
    const activeTrigger = freemium.upgradeTriggers.find(t => !t.shown && t.priority === 'high')
    if (activeTrigger) {
      setShowUpgradeModal(true)
    }
  }, [freemium.upgradeTriggers])

  const handleFeatureAction = () => {
    if (!feature) return true
    
    const canUse = freemium.incrementFeatureUsage(feature)
    
    if (!canUse) {
      // Trigger upgrade flow
      const trigger: UpgradeTrigger = {
        id: `feature_limit_${feature}_${Date.now()}`,
        type: 'feature_limit',
        condition: `Reached limit for ${feature}`,
        message: `You've reached your ${feature} limit. Upgrade to continue!`,
        priority: 'high',
        shown: false,
        convertible: true
      }
      freemium.triggerUpgrade(trigger)
      return false
    }
    
    return true
  }

  return (
    <div className="freemium-wrapper">
      {/* Progress Warning Banner */}
      {currentWarning && currentWarning.severity === 'warning' && (
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-800">
                  {currentWarning.title}
                </h3>
                <p className="mt-1 text-sm text-amber-700">
                  {currentWarning.message}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Button
                onClick={currentWarning.ctaAction}
                size="sm"
                variant="outline"
                className="border-amber-300 text-amber-800 hover:bg-amber-100"
              >
                {currentWarning.ctaText}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div onClick={handleFeatureAction}>
        {children}
      </div>

      {/* Upgrade Modal Trigger */}
      {showUpgradeModal && (
        <UpgradeModalTrigger 
          onClose={() => setShowUpgradeModal(false)}
          onUpgrade={() => {
            setShowUpgradeModal(false)
            if (!freemium.subscription.trialUsed) {
              freemium.startFreeTrial()
            } else {
              freemium.upgradeToPro()
            }
          }}
        />
      )}
    </div>
  )
}

// Helper component for upgrade modal trigger
function UpgradeModalTrigger({ onClose, onUpgrade }: { onClose: () => void, onUpgrade: () => void }) {
  const freemium = useFreemium()
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {freemium.subscription.trialUsed ? 'Upgrade to Pro' : 'Start Your Free Trial'}
          </h3>
          
          <p className="text-sm text-gray-500 mb-6">
            {freemium.subscription.trialUsed 
              ? 'Unlock unlimited projects, AI suggestions, and premium features.'
              : 'Get 7 days of unlimited access to all BuildMate AI features.'}
          </p>
          
          <div className="flex space-x-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Maybe Later
            </Button>
            <Button
              onClick={onUpgrade}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {freemium.subscription.trialUsed ? 'Upgrade Now' : 'Start Free Trial'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Feature access validation hook
export function useFeatureAccess(feature: FeatureType) {
  const freemium = useFreemium()
  
  const hasAccess = freemium.checkFeatureAccess(feature)
  const canUse = () => freemium.incrementFeatureUsage(feature)
  
  return {
    hasAccess,
    canUse,
    subscription: freemium.subscription,
    featureLimit: freemium.featureLimits.find(l => l.type === feature)
  }
}

// XP and Leveling Display Component
export function XPDisplay({ showDetails = false }: { showDetails?: boolean }) {
  const freemium = useFreemium()
  const { xp } = freemium
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            Level {xp.currentLevel}
          </Badge>
          <span className="text-sm font-medium text-gray-700">
            {xp.totalXP.toLocaleString()} XP
          </span>
        </div>
        <div className="text-xs text-gray-500">
          {xp.xpToNextLevel} to next level
        </div>
      </div>
      
      <Progress 
        value={xp.levelProgress} 
        className="mb-2"
      />
      
      {showDetails && (
        <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
          <div>
            <span className="font-medium">Today:</span> {xp.dailyXP} XP
          </div>
          <div>
            <span className="font-medium">Week:</span> {xp.weeklyXP} XP
          </div>
          <div>
            <span className="font-medium">Month:</span> {xp.monthlyXP} XP
          </div>
        </div>
      )}
    </div>
  )
}

// Badge Collection Display
export function BadgeCollection({ limit = 5 }: { limit?: number }) {
  const freemium = useFreemium()
  const recentBadges = freemium.badges
    .sort((a, b) => (b.unlockedAt?.getTime() || 0) - (a.unlockedAt?.getTime() || 0))
    .slice(0, limit)
  
  if (recentBadges.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-gray-500">No badges earned yet</p>
        <p className="text-xs text-gray-400 mt-1">Complete challenges to earn your first badge!</p>
      </div>
    )
  }
  
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Badges</h4>
      <div className="grid grid-cols-5 gap-2">
        {recentBadges.map((badge) => (
          <div key={badge.id} className="text-center group">
            <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">
              {badge.icon}
            </div>
            <p className="text-xs text-gray-600 truncate" title={badge.name}>
              {badge.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Helper functions
function getFeatureLimitTitle(feature: FeatureType): string {
  const titles = {
    projects: 'Project Limit Reached',
    ai_suggestions: 'AI Suggestions Limit Reached',
    save_progress: 'Progress Saving Blocked',
    priority_support: 'Priority Support Required',
    advanced_analytics: 'Advanced Analytics Locked'
  }
  return titles[feature] || 'Feature Limit Reached'
}

function getFeatureLimitMessage(feature: FeatureType): string {
  const messages = {
    projects: 'Free users can create 1 project. Upgrade to create unlimited projects.',
    ai_suggestions: 'You\'ve used your daily AI suggestions. Upgrade for unlimited access.',
    save_progress: 'Progress saving is a Pro feature. Start your free trial to save your work.',
    priority_support: 'Get priority email and chat support with a Pro subscription.',
    advanced_analytics: 'Access detailed project analytics and insights with Pro.'
  }
  return messages[feature] || 'This feature requires a Pro subscription.'
}