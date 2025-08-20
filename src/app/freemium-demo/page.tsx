'use client'

import React, { useState } from 'react'
import { 
  FreemiumSystem, 
  useFeatureAccess, 
  XPDisplay, 
  BadgeCollection,
  SubscriptionModal,
  Button,
  Card,
  Badge,
  Progress,
  // Advanced Conversion Optimization Components
  ExitIntentModal,
  CountdownTimer,
  SocialProofWidget,
  UrgencyTriggers,
  ProgressiveProfiler,
  useProgressiveProfiler
} from '@/components/ui'
import { useFreemium, useUser } from '@/contexts/UserContext'

export default function FreemiumDemoPage() {
  const { user } = useUser()
  const freemium = useFreemium()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [demoStep, setDemoStep] = useState(0)
  
  // Conversion Optimization Demo States
  const [showConversionDemo, setShowConversionDemo] = useState(false)
  const [activeComponent, setActiveComponent] = useState<string | null>(null)
  const { triggerProfiler } = useProgressiveProfiler()
  
  const projectAccess = useFeatureAccess('projects')
  const aiAccess = useFeatureAccess('ai_suggestions')
  
  // Get trial end date for countdown demo
  const trialEndDate = freemium.subscription.endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  
  const handleProjectAction = () => {
    if (projectAccess.canUse()) {
      freemium.awardXP(25, 'Created a new project!')
      alert('Project created! You earned 25 XP!')
    } else {
      setShowUpgradeModal(true)
    }
  }
  
  const handleAIAction = () => {
    if (aiAccess.canUse()) {
      freemium.awardXP(10, 'Used AI suggestion!')
      alert('AI suggestion generated! You earned 10 XP!')
    } else {
      setShowUpgradeModal(true)
    }
  }
  
  const demoSteps = [
    {
      title: 'Welcome to BuildMate AI Freemium System',
      description: 'This demo showcases the complete freemium experience with gamification, limits, and upgrade triggers.',
      action: () => freemium.awardXP(50, 'Started the demo!')
    },
    {
      title: 'Try Creating a Project',
      description: 'Free users can create 1 project. Try creating multiple projects to see the upgrade trigger.',
      action: handleProjectAction
    },
    {
      title: 'Use AI Suggestions',
      description: 'Free users get 3 AI suggestions per day. Use them all to trigger the upgrade prompt.',
      action: handleAIAction
    },
    {
      title: 'Experience Gamification',
      description: 'Earn XP, level up, and unlock badges as you use BuildMate AI features.',
      action: () => {
        freemium.awardXP(100, 'Completed demo step!')
        freemium.unlockBadge('first_project')
      }
    },
    {
      title: 'Advanced Conversion Features',
      description: 'Test our advanced conversion optimization components designed to increase conversion rates by 8-12%.',
      action: () => setShowConversionDemo(true)
    }
  ]

  const conversionDemos = [
    {
      id: 'exit-intent',
      name: 'Exit Intent Modal',
      description: 'Smart exit detection with personalized offers',
      component: 'ExitIntentModal',
      action: () => {
        setActiveComponent('exit-intent')
        // Simulate exit intent - in real usage this triggers automatically
        alert('Move your mouse to the top of the browser window to trigger exit intent!')
      }
    },
    {
      id: 'countdown',
      name: 'Trial Countdown Timer',
      description: 'Urgency-driven countdown with color coding',
      component: 'CountdownTimer',
      action: () => setActiveComponent('countdown')
    },
    {
      id: 'social-proof',
      name: 'Social Proof Widget',
      description: 'Live activity feeds with UK construction context',
      component: 'SocialProofWidget',
      action: () => setActiveComponent('social-proof')
    },
    {
      id: 'urgency',
      name: 'Urgency Triggers',
      description: 'Scarcity messaging with psychological triggers',
      component: 'UrgencyTriggers',
      action: () => setActiveComponent('urgency')
    },
    {
      id: 'profiler',
      name: 'Progressive Profiler',
      description: 'Smart data collection without friction',
      component: 'ProgressiveProfiler',
      action: () => {
        triggerProfiler('project_start')
        setActiveComponent('profiler')
      }
    }
  ]
  
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Log In</h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to experience the freemium system demo.
          </p>
          <p className="text-sm text-gray-500">
            Use demo credentials: <strong>demo@buildmate.co.uk</strong> / <strong>demo123</strong>
          </p>
        </Card>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">FreemiumSystem Demo</h1>
              <p className="text-gray-600 mt-1">
                Experience BuildMate AI's conversion-focused freemium system
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className={`${
                freemium.subscription.tier === 'free' ? 'bg-gray-100 text-gray-800' :
                freemium.subscription.tier === 'trial' ? 'bg-green-100 text-green-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {freemium.subscription.tier.toUpperCase()} Plan
              </Badge>
              
              <Button
                onClick={() => setShowUpgradeModal(true)}
                variant={freemium.subscription.tier === 'free' ? 'primary' : 'outline'}
                className={freemium.subscription.tier === 'free' ? 'bg-blue-600 hover:bg-blue-700' : ''}
              >
                {freemium.subscription.tier === 'free' && !freemium.subscription.trialUsed ? 'Start Free Trial' :
                 freemium.subscription.tier === 'trial' ? 'Upgrade to Pro' :
                 'Manage Subscription'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Demo Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Demo Step */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline">Step {demoStep + 1} of {demoSteps.length}</Badge>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {demoSteps[demoStep]?.title}
                  </h2>
                  <p className="text-gray-600">
                    {demoSteps[demoStep]?.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  onClick={demoSteps[demoStep]?.action}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Try This Feature
                </Button>
                
                {demoStep < demoSteps.length - 1 && (
                  <Button
                    onClick={() => setDemoStep(demoStep + 1)}
                    variant="outline"
                  >
                    Next Step
                  </Button>
                )}
                
                {demoStep > 0 && (
                  <Button
                    onClick={() => setDemoStep(demoStep - 1)}
                    variant="outline"
                  >
                    Previous
                  </Button>
                )}
              </div>
              
              <div className="mt-4">
                <Progress value={(demoStep + 1) / demoSteps.length * 100} />
              </div>
            </Card>
            
            {/* Feature Limits Display */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Usage</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* Projects Limit */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Projects</span>
                    <Badge variant={projectAccess.hasAccess ? 'default' : 'outline'} className="text-xs">
                      {projectAccess.featureLimit?.used || 0} / {projectAccess.featureLimit?.limit || 0}
                    </Badge>
                  </div>
                  
                  <FreemiumSystem feature="projects" onUpgradeClick={() => setShowUpgradeModal(true)}>
                    <Button 
                      size="sm" 
                      variant={projectAccess.hasAccess ? 'primary' : 'outline'}
                      className="w-full"
                      disabled={!projectAccess.hasAccess}
                    >
                      {projectAccess.hasAccess ? 'Create Project' : 'Limit Reached'}
                    </Button>
                  </FreemiumSystem>
                </div>
                
                {/* AI Suggestions Limit */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">AI Suggestions</span>
                    <Badge variant={aiAccess.hasAccess ? 'default' : 'outline'} className="text-xs">
                      {aiAccess.featureLimit?.used || 0} / {aiAccess.featureLimit?.limit || 0}
                    </Badge>
                  </div>
                  
                  <FreemiumSystem feature="ai_suggestions" onUpgradeClick={() => setShowUpgradeModal(true)}>
                    <Button 
                      size="sm" 
                      variant={aiAccess.hasAccess ? 'primary' : 'outline'}
                      className="w-full"
                      disabled={!aiAccess.hasAccess}
                    >
                      {aiAccess.hasAccess ? 'Get AI Suggestion' : 'Daily Limit Reached'}
                    </Button>
                  </FreemiumSystem>
                </div>
              </div>
            </Card>
            
            {/* Subscription Comparison */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Tiers</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                {/* Free Tier */}
                <div className={`border rounded-lg p-4 ${
                  freemium.subscription.tier === 'free' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}>
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 mb-2">Free</h4>
                    <div className="text-2xl font-bold text-gray-900 mb-2">£0</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>1 project maximum</li>
                      <li>3 AI suggestions/day</li>
                      <li>Basic features</li>
                    </ul>
                    {freemium.subscription.tier === 'free' && (
                      <Badge className="mt-2 bg-green-100 text-green-800">Current Plan</Badge>
                    )}
                  </div>
                </div>
                
                {/* Trial Tier */}
                <div className={`border rounded-lg p-4 ${
                  freemium.subscription.tier === 'trial' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}>
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 mb-2">7-Day Trial</h4>
                    <div className="text-2xl font-bold text-gray-900 mb-2">£0</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>Unlimited projects</li>
                      <li>Unlimited AI features</li>
                      <li>All Pro features</li>
                    </ul>
                    {freemium.subscription.tier === 'trial' && (
                      <Badge className="mt-2 bg-green-100 text-green-800">Current Plan</Badge>
                    )}
                  </div>
                </div>
                
                {/* Pro Tier */}
                <div className={`border rounded-lg p-4 ${
                  freemium.subscription.tier === 'pro' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}>
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 mb-2">Pro</h4>
                    <div className="text-2xl font-bold text-gray-900 mb-2">£29</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>Unlimited everything</li>
                      <li>Priority support</li>
                      <li>Advanced analytics</li>
                    </ul>
                    {freemium.subscription.tier === 'pro' && (
                      <Badge className="mt-2 bg-green-100 text-green-800">Current Plan</Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* XP Display */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
              <XPDisplay showDetails={true} />
            </Card>
            
            {/* Badge Collection */}
            <Card className="p-6">
              <BadgeCollection limit={10} />
            </Card>
            
            {/* Daily Challenges */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Challenges</h3>
              
              {freemium.challenges.length > 0 ? (
                <div className="space-y-3">
                  {freemium.challenges.slice(0, 3).map((challenge) => (
                    <div key={challenge.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900">{challenge.name}</h4>
                        <Badge size="sm" variant={challenge.completed ? 'default' : 'outline'}>
                          {challenge.xpReward} XP
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{challenge.description}</p>
                      <Progress value={(challenge.progress / challenge.requirement) * 100} className="h-1" />
                      <div className="text-xs text-gray-500 mt-1">
                        {challenge.progress} / {challenge.requirement}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No active challenges</p>
              )}
            </Card>
            
            {/* Subscription Status */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Status</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Tier:</span>
                  <Badge className={`${
                    freemium.subscription.tier === 'free' ? 'bg-gray-100 text-gray-800' :
                    freemium.subscription.tier === 'trial' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {freemium.subscription.tier.toUpperCase()}
                  </Badge>
                </div>
                
                {freemium.subscription.isTrialActive && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Trial Ends:</span>
                    <span className="text-sm font-medium text-orange-600">
                      {freemium.subscription.daysUntilExpiry} days
                    </span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Trial Used:</span>
                  <span className={`text-sm font-medium ${
                    freemium.subscription.trialUsed ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {freemium.subscription.trialUsed ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Advanced Conversion Optimization Demo */}
        {showConversionDemo && (
          <div className="mt-12 border-t pt-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Advanced Conversion Optimization Components
              </h2>
              <p className="text-gray-600 mb-4">
                These components are designed to increase free-to-paid conversion from 8-12% to 15-20% using sophisticated psychology and A/B testing.
              </p>
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => setShowConversionDemo(false)}
                  variant="outline"
                  size="sm"
                >
                  Hide Demo
                </Button>
                <Button
                  onClick={() => setActiveComponent(null)}
                  variant="outline"
                  size="sm"
                >
                  Clear Active
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {conversionDemos.map((demo) => (
                <Card key={demo.id} className={`p-6 transition-all duration-200 ${
                  activeComponent === demo.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-lg'
                }`}>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {demo.name}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {demo.component}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      {demo.description}
                    </p>
                  </div>
                  
                  <Button
                    onClick={demo.action}
                    variant={activeComponent === demo.id ? 'primary' : 'outline'}
                    size="sm"
                    className="w-full"
                  >
                    {activeComponent === demo.id ? 'Active' : 'Demo This'}
                  </Button>
                  
                  {activeComponent === demo.id && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                      <p className="text-xs text-green-700 font-medium">
                        ✅ Component Active - Check the UI for live demo!
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
            
            {/* Live Demo Status */}
            {activeComponent && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Live Demo Active: {conversionDemos.find(d => d.id === activeComponent)?.name}
                </h3>
                <p className="text-blue-700 text-sm">
                  The component is now active on the page. 
                  {activeComponent === 'exit-intent' && ' Move your mouse to the top of the browser window to trigger the exit intent modal.'}
                  {activeComponent === 'countdown' && ' Look for the countdown timer showing trial urgency.'}
                  {activeComponent === 'social-proof' && ' Check the bottom-left corner for live activity feeds.'}
                  {activeComponent === 'urgency' && ' Look for urgency triggers in the top-right corner.'}
                  {activeComponent === 'profiler' && ' A contextual question modal should have appeared.'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Conversion Optimization Components */}
      {/* Exit Intent Modal - Enabled when active */}
      <ExitIntentModal 
        enabled={activeComponent === 'exit-intent'} 
        onClose={() => setActiveComponent(null)}
      />
      
      {/* Social Proof Widget - Show when active */}
      {activeComponent === 'social-proof' && (
        <SocialProofWidget position="bottom-left" />
      )}
      
      {/* Urgency Triggers - Show when active */}
      {activeComponent === 'urgency' && (
        <UrgencyTriggers 
          triggers={[
            {
              id: 'demo_limited_spots',
              type: 'limited_spots',
              message: 'Only 2 Pro spots left today in your area',
              urgencyLevel: 'high',
              remainingCount: 2,
              action: {
                text: 'Secure Your Spot',
                onClick: () => setShowUpgradeModal(true)
              }
            }
          ]}
          onTriggerClick={() => setShowUpgradeModal(true)}
        />
      )}
      
      {/* Progressive Profiler - Always enabled for contextual triggering */}
      <ProgressiveProfiler 
        enabled={true}
        onComplete={(data) => {
          freemium.awardXP(25, 'Completed profile question!')
          console.log('Profile data collected:', data)
        }}
      />
      
      {/* Trial Countdown - Show when active or user is on trial */}
      {(activeComponent === 'countdown' || freemium.subscription.isTrialActive) && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40">
          <CountdownTimer
            endDate={trialEndDate}
            onExpiry={() => {
              alert('Trial expired! Time to upgrade.')
              setShowUpgradeModal(true)
            }}
            size={activeComponent === 'countdown' ? 'lg' : 'md'}
          />
        </div>
      )}
      
      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        triggerReason="feature_limit"
        highlightFeature="unlimited access"
      />
    </div>
  )
}