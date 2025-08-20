'use client'

import React, { useState, useEffect } from 'react'
import { useFreemium } from '@/contexts/UserContext'
import { Button } from './Button'
import { Badge } from './Badge'
import { Card } from './Card'
import { Progress } from './Progress'

interface SubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  triggerReason?: string
  highlightFeature?: string
}

export function SubscriptionModal({ 
  isOpen, 
  onClose, 
  triggerReason = 'upgrade', 
  highlightFeature 
}: SubscriptionModalProps) {
  const freemium = useFreemium()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'trial' | 'pro'>('trial')
  const [showSocialProof, setShowSocialProof] = useState(false)

  // Show social proof after 3 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowSocialProof(true), 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleUpgrade = async () => {
    setIsLoading(true)
    
    try {
      if (selectedPlan === 'trial' && !freemium.subscription.trialUsed) {
        await freemium.startFreeTrial()
      } else {
        await freemium.upgradeToPro()
      }
      onClose()
    } catch (error) {
      console.error('Upgrade failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  const canStartTrial = !freemium.subscription.trialUsed
  const isCurrentlyTrial = freemium.subscription.tier === 'trial'

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">
              {canStartTrial ? 'Start Your Free Trial' : 'Upgrade to BuildMate AI Pro'}
            </h2>
            <p className="text-blue-100 text-lg">
              {canStartTrial 
                ? 'Get 7 days of unlimited access to all features' 
                : 'Unlock the full power of AI-driven construction planning'}
            </p>
            
            {triggerReason && (
              <div className="mt-4 bg-blue-700 bg-opacity-50 rounded-lg p-3">
                <p className="text-sm">
                  <span className="font-medium">Why upgrade now?</span> {getTriggerMessage(triggerReason, highlightFeature)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Plan Comparison */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Free Plan (Current) */}
            <Card className="relative border-2 border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Free</h3>
                  <Badge variant="outline" className="text-gray-600">
                    Current Plan
                  </Badge>
                </div>
                
                <div className="text-3xl font-bold text-gray-900 mb-4">
                  £0<span className="text-lg font-normal text-gray-500">/month</span>
                </div>
                
                <ul className="space-y-3">
                  {FREE_FEATURES.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                  
                  {PREMIUM_FEATURES.slice(0, 3).map((feature, index) => (
                    <li key={`blocked-${index}`} className="flex items-start opacity-50">
                      <svg className="h-5 w-5 text-gray-300 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-400 line-through">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Pro Plan */}
            <Card className={`relative border-2 ${selectedPlan === 'pro' ? 'border-blue-500 shadow-lg' : 'border-blue-200'}`}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-4 py-1">
                  {canStartTrial ? 'Recommended' : 'Best Value'}
                </Badge>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {canStartTrial ? '7-Day Free Trial' : 'BuildMate AI Pro'}
                  </h3>
                  {canStartTrial && (
                    <Badge className="bg-green-100 text-green-800">
                      No Credit Card
                    </Badge>
                  )}
                </div>
                
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {canStartTrial ? (
                    <>£0<span className="text-lg font-normal text-gray-500">/7 days</span></>
                  ) : (
                    <>£29<span className="text-lg font-normal text-gray-500">/month</span></>
                  )}
                </div>
                
                {canStartTrial && (
                  <p className="text-sm text-gray-500 mb-4">
                    Then £29/month, cancel anytime
                  </p>
                )}
                
                <ul className="space-y-3">
                  {ALL_FEATURES.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => {
                    setSelectedPlan(canStartTrial ? 'trial' : 'pro')
                    handleUpgrade()
                  }}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {canStartTrial ? 'Starting Trial...' : 'Upgrading...'}
                    </div>
                  ) : (
                    canStartTrial ? 'Start Free Trial' : 'Upgrade to Pro'
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Trust Signals */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Cancel Anytime</h4>
              <p className="text-sm text-gray-600">No long-term commitment required</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Instant Access</h4>
              <p className="text-sm text-gray-600">Unlock all features immediately</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">UK Support</h4>
              <p className="text-sm text-gray-600">Expert help from our UK team</p>
            </div>
          </div>

          {/* Social Proof */}
          {showSocialProof && (
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6 mb-6">
              <div className="text-center">
                <div className="flex justify-center space-x-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">2,847</span> UK builders have saved an average of 
                  <span className="font-semibold text-green-600">£12,300</span> using BuildMate AI Pro
                </p>
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span>347 signed up this week</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                    <span>23 builders online now</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">
              {canStartTrial ? (
                'Start your free trial today. No credit card required.'
              ) : (
                'Join thousands of UK builders saving time and money with BuildMate AI'
              )}
            </p>
            
            <div className="flex justify-center space-x-3">
              <Button
                onClick={onClose}
                variant="outline"
                className="px-6"
              >
                Maybe Later
              </Button>
              
              {isCurrentlyTrial && (
                <Button
                  onClick={() => {
                    setSelectedPlan('pro')
                    handleUpgrade()
                  }}
                  className="px-6 bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  Upgrade to Pro Now
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Feature lists
const FREE_FEATURES = [
  '1 project maximum',
  '3 AI suggestions per day',
  '2 AI images per day',
  'Basic floorplan generation',
  'UK supplier database access'
]

const PREMIUM_FEATURES = [
  'Unlimited projects',
  'Unlimited AI suggestions',
  'Advanced AI features',
  'Progress saving',
  'Priority support',
  'Advanced analytics',
  'Commercial projects',
  'Bulk ordering system',
  'ROI calculator',
  'Export data'
]

const ALL_FEATURES = [
  'Everything in Free, plus:',
  'Unlimited projects & AI suggestions',
  'Save and sync progress across devices',
  'Advanced AI-powered cost optimization',
  'Commercial property assessments',
  'Bulk material ordering system',
  'Priority email & chat support',
  'Advanced project analytics',
  'Export project data (PDF, Excel)',
  'Early access to new features'
]

// Helper functions
function getTriggerMessage(reason: string, feature?: string): string {
  const messages: Record<string, string> = {
    'project_limit': 'You\'ve reached your project limit. Create unlimited projects with Pro.',
    'ai_limit': 'You\'ve used your daily AI suggestions. Get unlimited access with Pro.',
    'save_progress': 'Save your progress and sync across devices with Pro.',
    'advanced_features': 'Unlock advanced AI features and commercial tools.',
    'trial_ending': 'Your free trial ends soon. Continue with full access.',
    'feature_locked': feature ? `${feature} is a Pro feature. Upgrade to unlock it.` : 'This feature requires Pro.'
  }
  
  return messages[reason] || 'Upgrade to unlock the full potential of BuildMate AI.'
}

export default SubscriptionModal