'use client'

import { useState, useEffect } from 'react'
import { X, ChevronRight, CheckCircle, Star, Target, Settings, Home, HelpCircle } from 'lucide-react'
import { Button } from './Button'
import { Card } from './Card'
import { useUser } from '@/contexts/UserContext'

interface WelcomeFlowProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

interface WelcomeStep {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  content: React.ReactNode
}

export function WelcomeFlow({ isOpen, onClose, onComplete }: WelcomeFlowProps) {
  const { user } = useUser()
  const [currentStep, setCurrentStep] = useState(0)
  const [userPreferences, setUserPreferences] = useState({
    projectTypes: [] as string[],
    budgetRange: { min: 10000, max: 100000 },
    location: '',
    timeline: '',
    experience: ''
  })

  const steps: WelcomeStep[] = [
    {
      id: 'welcome',
      title: `Welcome to BuildMate, ${user?.name?.split(' ')[0] || 'Builder'}!`,
      description: 'Let\'s get you set up for success with a quick 2-minute tour',
      icon: Star,
      content: (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">You're in great company!</h3>
          <p className="text-gray-600 mb-4">Join 10,000+ UK builders who have successfully completed their projects with BuildMate.</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-600">£850K+</div>
              <div className="text-xs text-gray-600">Total Saved</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-600">94%</div>
              <div className="text-xs text-gray-600">On-Time</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-orange-600">4.8★</div>
              <div className="text-xs text-gray-600">Rating</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'project-type',
      title: 'What are you building?',
      description: 'Help us understand your project so we can provide better recommendations',
      icon: Home,
      content: (
        <div className="py-6">
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: 'new_build', label: 'New Build Home', icon: '🏗️', desc: 'Build from scratch' },
              { id: 'extension', label: 'Home Extension', icon: '🏠', desc: 'Add space to existing home' },
              { id: 'renovation', label: 'Renovation', icon: '🔨', desc: 'Update existing property' },
              { id: 'loft_conversion', label: 'Loft Conversion', icon: '🏡', desc: 'Convert unused space' },
              { id: 'garage_conversion', label: 'Garage Conversion', icon: '🚗', desc: 'Transform garage space' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  const newTypes = userPreferences.projectTypes.includes(type.id)
                    ? userPreferences.projectTypes.filter(t => t !== type.id)
                    : [...userPreferences.projectTypes, type.id]
                  setUserPreferences(prev => ({ ...prev, projectTypes: newTypes }))
                }}
                className={`flex items-center space-x-4 p-4 border-2 rounded-lg transition-all ${
                  userPreferences.projectTypes.includes(type.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-2xl">{type.icon}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900">{type.label}</div>
                  <div className="text-sm text-gray-600">{type.desc}</div>
                </div>
                {userPreferences.projectTypes.includes(type.id) && (
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                )}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">You can select multiple project types</p>
        </div>
      )
    },
    {
      id: 'budget',
      title: 'What\'s your budget range?',
      description: 'This helps us show you relevant materials and professionals',
      icon: Target,
      content: (
        <div className="py-6">
          <div className="grid grid-cols-1 gap-3">
            {[
              { min: 0, max: 25000, label: 'Under £25K', desc: 'Small renovations' },
              { min: 25000, max: 75000, label: '£25K - £75K', desc: 'Extensions, conversions' },
              { min: 75000, max: 200000, label: '£75K - £200K', desc: 'Major renovations' },
              { min: 200000, max: 500000, label: '£200K - £500K', desc: 'New builds, large projects' },
              { min: 500000, max: 1000000, label: '£500K+', desc: 'Premium projects' }
            ].map((range) => (
              <button
                key={`${range.min}-${range.max}`}
                onClick={() => setUserPreferences(prev => ({ 
                  ...prev, 
                  budgetRange: { min: range.min, max: range.max }
                }))}
                className={`flex items-center justify-between p-4 border-2 rounded-lg transition-all ${
                  userPreferences.budgetRange.min === range.min && userPreferences.budgetRange.max === range.max
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-left">
                  <div className="font-medium text-gray-900">{range.label}</div>
                  <div className="text-sm text-gray-600">{range.desc}</div>
                </div>
                {userPreferences.budgetRange.min === range.min && userPreferences.budgetRange.max === range.max && (
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                )}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4">Don't worry, you can adjust this later</p>
        </div>
      )
    },
    {
      id: 'ready',
      title: 'You\'re all set!',
      description: 'Here\'s what you can do next to get started with your project',
      icon: CheckCircle,
      content: (
        <div className="py-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Build!</h3>
            <p className="text-gray-600">Your profile is set up. Here are your next steps:</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Configure Your Project</h4>
                <p className="text-sm text-gray-600 mt-1">Use our smart tools to design your perfect space in minutes</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-purple-600 font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Browse Materials</h4>
                <p className="text-sm text-gray-600 mt-1">Compare prices from top UK suppliers and save money</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-600 font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Find Professionals</h4>
                <p className="text-sm text-gray-600 mt-1">Connect with verified, local tradespeople and contractors</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  const currentStepData = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0

  const handleNext = () => {
    if (isLastStep) {
      // Save user preferences
      // TODO: Save preferences to user context/backend
      onComplete()
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleSkip = () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentStep
                      ? 'bg-blue-600 scale-125'
                      : index < currentStep
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {currentStep + 1} of {steps.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="mb-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <currentStepData.icon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{currentStepData.title}</h2>
                <p className="text-sm text-gray-600">{currentStepData.description}</p>
              </div>
            </div>
          </div>
          
          {currentStepData.content}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            {!isFirstStep && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={handleSkip}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Skip tour
            </button>
          </div>
          
          <Button
            onClick={handleNext}
            disabled={currentStep === 1 && userPreferences.projectTypes.length === 0}
            className="flex items-center space-x-2"
          >
            <span>{isLastStep ? 'Start Building' : 'Next'}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
}