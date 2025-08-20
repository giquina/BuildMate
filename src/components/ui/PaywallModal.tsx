'use client'

import React, { useState, useEffect } from 'react'
import { FeatureType, SubscriptionTier } from '@/types/freemium'
import { cn } from '@/lib/utils'
import { Button } from './Button'
import { Card } from './Card'

interface PaywallModalProps {
  isOpen: boolean
  onClose: () => void
  onUpgrade: (tier: SubscriptionTier) => void
  onStartTrial: () => void
  feature: FeatureType
  context?: PaywallContext
  userTier: SubscriptionTier
  trialUsed: boolean
  className?: string
}

interface PaywallContext {
  itemsBlocked?: number
  progressLost?: boolean
  feature?: string
  socialProof?: SocialProofData[]
  urgency?: UrgencyData
  value?: ValueProposition
}

interface SocialProofData {
  type: 'upgrade' | 'usage' | 'review'
  message: string
  timestamp?: Date
  count?: number
}

interface UrgencyData {
  type: 'time_limited' | 'limited_spots' | 'price_increase'
  message: string
  endsAt?: Date
  spotsLeft?: number
}

interface ValueProposition {
  savings: string
  features: string[]
  guarantee: string
}

interface FeatureBlockData {
  title: string
  description: string
  icon: string
  lostValue: string
  urgencyMessage: string
}

const featureBlocks: Record<FeatureType, FeatureBlockData> = {
  save_progress: {
    title: 'Progress Will Be Lost!',
    description: 'Your project progress and AI suggestions will be deleted if you leave without saving.',
    icon: '⚠️',
    lostValue: 'Lose 2+ hours of work',
    urgencyMessage: 'Save your progress now to continue later'
  },
  projects: {
    title: 'Project Limit Reached',
    description: 'You can only create 1 project on the free plan. Upgrade to create unlimited projects.',
    icon: '🏗️',
    lostValue: 'Miss new opportunities',
    urgencyMessage: 'Start your next project immediately'
  },
  ai_suggestions: {
    title: 'AI Suggestions Exhausted',
    description: 'You\'ve used all your daily AI suggestions. Get unlimited AI-powered recommendations.',
    icon: '🤖',
    lostValue: 'Suboptimal project decisions',
    urgencyMessage: 'Get expert AI guidance now'
  },
  priority_support: {
    title: 'Need Expert Help?',
    description: 'Get priority support from construction experts and resolve issues faster.',
    icon: '🚀',
    lostValue: 'Delayed project timeline',
    urgencyMessage: 'Get help within 2 hours'
  },
  advanced_analytics: {
    title: 'Unlock Project Insights',
    description: 'Get detailed analytics, cost breakdowns, and optimization recommendations.',
    icon: '📊',
    lostValue: 'Hidden cost savings',
    urgencyMessage: 'Optimize costs and timeline'
  }
}

const testimonials = [
  {
    name: 'Sarah M.',
    project: 'Kitchen Extension',
    quote: 'BuildMate AI saved me £8,000 and 3 months on my project!',
    savings: '£8,000 saved'
  },
  {
    name: 'David L.',
    project: 'Home Office',
    quote: 'The AI suggestions were spot-on. Finished 2 weeks early.',
    savings: '2 weeks early'
  },
  {
    name: 'Emma K.',
    project: 'Loft Conversion',
    quote: 'Professional network feature connected me with amazing builders.',
    savings: 'Perfect team found'
  }
]

const pricingPlans = [
  {
    tier: 'trial' as SubscriptionTier,
    name: 'Free Trial',
    price: '£0',
    duration: '7 days',
    badge: 'Most Popular',
    features: [
      'Unlimited projects',
      'Unlimited AI suggestions',
      'Save progress',
      'Priority support',
      'Advanced analytics',
      'Professional network'
    ],
    cta: 'Start Free Trial',
    highlight: true
  },
  {
    tier: 'pro' as SubscriptionTier,
    name: 'Pro Plan',
    price: '£29',
    duration: 'per month',
    badge: 'Best Value',
    features: [
      'Everything in Free Trial',
      'Commercial projects',
      'Bulk ordering discounts',
      'ROI calculator',
      'Export project data',
      'Premium support'
    ],
    cta: 'Upgrade to Pro',
    highlight: false
  }
]

function PaywallContent({ feature, context }: { feature: FeatureType; context?: PaywallContext }) {
  const blockData = featureBlocks[feature]
  
  return (
    <div className="space-y-6">
      {/* Main Feature Block */}
      <div className="text-center space-y-4">
        <div className="text-6xl">{blockData.icon}</div>
        <h2 className="text-2xl font-bold text-gray-900">
          {blockData.title}
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          {blockData.description}
        </p>
        
        {/* Value Loss Warning */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-center space-x-2 text-red-700">
            <span className="text-xl">⏰</span>
            <span className="font-semibold">{blockData.lostValue}</span>
          </div>
          <p className="text-sm text-red-600 mt-1">
            {blockData.urgencyMessage}
          </p>
        </div>
      </div>

      {/* Context-specific content */}
      {context?.progressLost && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-yellow-800">
            <span className="text-xl">💔</span>
            <span className="font-semibold">Your work will be lost!</span>
          </div>
          <p className="text-sm text-yellow-700 mt-1">
            Don't lose hours of planning and AI optimization. Save now!
          </p>
        </div>
      )}

      {context?.itemsBlocked && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-blue-800">
            <span className="text-xl">🔒</span>
            <span className="font-semibold">{context.itemsBlocked} items blocked</span>
          </div>
          <p className="text-sm text-blue-700 mt-1">
            Upgrade to access all features and continue your project.
          </p>
        </div>
      )}
    </div>
  )
}

function SocialProof({ socialProof }: { socialProof?: SocialProofData[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!socialProof?.length) return
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % socialProof.length)
    }, 3000)
    
    return () => clearInterval(timer)
  }, [socialProof])

  if (!socialProof?.length) {
    // Default social proof
    const defaultProof = [
      { type: 'upgrade' as const, message: '23 people upgraded in the last hour', count: 23 },
      { type: 'usage' as const, message: '1,247 projects completed this week', count: 1247 },
      { type: 'review' as const, message: '4.9/5 stars from 500+ reviews', count: 500 }
    ]
    
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <div className="flex items-center justify-center space-x-2 text-green-700">
          <span className="animate-pulse">🔥</span>
          <span className="text-sm font-medium">
            {defaultProof[currentIndex % defaultProof.length].message}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
      <div className="flex items-center justify-center space-x-2 text-green-700">
        <span className="animate-pulse">🔥</span>
        <span className="text-sm font-medium">
          {socialProof[currentIndex].message}
        </span>
      </div>
    </div>
  )
}

function UrgencyBanner({ urgency }: { urgency?: UrgencyData }) {
  if (!urgency) return null

  return (
    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-lg">
      <div className="flex items-center justify-center space-x-2">
        <span className="text-lg animate-bounce">⏰</span>
        <span className="font-semibold">{urgency.message}</span>
      </div>
      {urgency.endsAt && (
        <div className="text-center text-sm mt-1 opacity-90">
          Offer expires: {urgency.endsAt.toLocaleString()}
        </div>
      )}
    </div>
  )
}

function TestimonialCarousel() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    
    return () => clearInterval(timer)
  }, [])

  const testimonial = testimonials[currentTestimonial]

  return (
    <Card className="p-4 bg-blue-50 border-blue-200">
      <div className="text-center space-y-3">
        <div className="flex justify-center text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-lg">⭐</span>
          ))}
        </div>
        <blockquote className="text-gray-700 italic">
          "{testimonial.quote}"
        </blockquote>
        <div>
          <div className="font-semibold text-gray-900">{testimonial.name}</div>
          <div className="text-sm text-gray-600">{testimonial.project}</div>
          <div className="text-sm font-medium text-green-600">{testimonial.savings}</div>
        </div>
        
        {/* Progress dots */}
        <div className="flex justify-center space-x-1 mt-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-colors',
                index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
              )}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}

function PricingSection({ 
  onUpgrade, 
  onStartTrial, 
  userTier, 
  trialUsed 
}: { 
  onUpgrade: (tier: SubscriptionTier) => void
  onStartTrial: () => void
  userTier: SubscriptionTier
  trialUsed: boolean
}) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Choose Your Plan
        </h3>
        <p className="text-gray-600">
          Start building your dream project today
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pricingPlans.map((plan) => {
          const isTrialPlan = plan.tier === 'trial'
          const canSelectPlan = isTrialPlan ? !trialUsed : true
          const isCurrentPlan = plan.tier === userTier

          return (
            <Card 
              key={plan.tier}
              className={cn(
                'p-6 relative',
                plan.highlight && 'border-2 border-blue-500 bg-blue-50',
                !canSelectPlan && 'opacity-60'
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="text-center space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {plan.name}
                  </h4>
                  <div className="flex items-baseline justify-center space-x-1 mt-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600">
                      {plan.duration}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 text-sm text-gray-600">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => isTrialPlan ? onStartTrial() : onUpgrade(plan.tier)}
                  variant={plan.highlight ? 'primary' : 'outline'}
                  className="w-full"
                  disabled={!canSelectPlan || isCurrentPlan}
                >
                  {isCurrentPlan ? 'Current Plan' :
                   !canSelectPlan ? 'Trial Used' :
                   plan.cta}
                </Button>

                {isTrialPlan && !trialUsed && (
                  <p className="text-xs text-gray-500">
                    No credit card required
                  </p>
                )}
              </div>
            </Card>
          )
        })}
      </div>

      {/* Money-back guarantee */}
      <div className="text-center bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-center space-x-2 text-gray-700">
          <span className="text-green-600">🛡️</span>
          <span className="font-medium">30-day money-back guarantee</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Not satisfied? Get a full refund within 30 days.
        </p>
      </div>
    </div>
  )
}

export function PaywallModal({
  isOpen,
  onClose,
  onUpgrade,
  onStartTrial,
  feature,
  context,
  userTier,
  trialUsed,
  className
}: PaywallModalProps) {
  const [step, setStep] = useState<'block' | 'pricing'>('block')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className={cn(
        'bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto',
        className
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">
            {step === 'block' ? 'Upgrade Required' : 'Choose Your Plan'}
          </h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Social Proof */}
          <SocialProof socialProof={context?.socialProof} />
          
          {/* Urgency Banner */}
          <UrgencyBanner urgency={context?.urgency} />

          {step === 'block' ? (
            <>
              <PaywallContent feature={feature} context={context} />
              
              {/* Testimonial */}
              <TestimonialCarousel />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => setStep('pricing')}
                  variant="primary"
                  size="lg"
                  className="flex-1"
                >
                  {trialUsed ? 'See Pricing' : 'Start Free Trial'}
                </Button>
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="lg"
                  className="sm:w-auto"
                >
                  Maybe Later
                </Button>
              </div>
            </>
          ) : (
            <>
              <PricingSection
                onUpgrade={onUpgrade}
                onStartTrial={onStartTrial}
                userTier={userTier}
                trialUsed={trialUsed}
              />
              
              {/* Back Button */}
              <div className="flex justify-center">
                <Button
                  onClick={() => setStep('block')}
                  variant="ghost"
                  size="sm"
                >
                  ← Back
                </Button>
              </div>
            </>
          )}

          {/* Trust Indicators */}
          <div className="border-t pt-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl">🔒</div>
                <div className="text-sm font-medium text-gray-700">Secure Payment</div>
                <div className="text-xs text-gray-500">256-bit SSL encryption</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl">⭐</div>
                <div className="text-sm font-medium text-gray-700">4.9/5 Rating</div>
                <div className="text-xs text-gray-500">500+ reviews</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl">🚀</div>
                <div className="text-sm font-medium text-gray-700">Instant Access</div>
                <div className="text-xs text-gray-500">Start immediately</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}