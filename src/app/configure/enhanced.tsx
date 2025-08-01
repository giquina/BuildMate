'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { 
  ChevronLeft, 
  ChevronRight,
  Building2, 
  Home, 
  Sparkles, 
  Castle,
  CheckCircle,
  Loader2,
  ArrowRight,
  Lightbulb,
  MapPin,
  Target,
  Clock,
  TrendingUp,
  AlertCircle
} from 'lucide-react'

import { 
  configurationSteps, 
  generateSmartSuggestions, 
  type Question 
} from '@/lib/intelligentQuestions'

// Icon mapping for different question types
const getQuestionIcon = (questionId: string) => {
  const iconMap: Record<string, any> = {
    propertyType: Home,
    currentStyle: Building2,
    postcode: MapPin,
    primaryGoal: Target,
    budget: Sparkles,
    timeline: Clock,
    rooms: Building2,
    specialRequirements: CheckCircle
  }
  return iconMap[questionId] || CheckCircle
}

export default function EnhancedConfigurePage() {
  const router = useRouter()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [smartSuggestions, setSmartSuggestions] = useState<Array<any>>([])
  
  const currentStep = configurationSteps[currentStepIndex]
  const isLastStep = currentStepIndex === configurationSteps.length - 1
  const canProceed = currentStep?.questions.every(q => 
    !q.required || (answers[q.id] !== undefined && answers[q.id] !== '')
  )

  // Update answers and generate AI suggestions
  const updateAnswer = (questionId: string, value: any) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)
    
    // Generate smart suggestions based on current answers
    const suggestions = generateSmartSuggestions(newAnswers)
    setSmartSuggestions(suggestions)
  }
  
  const nextStep = () => {
    if (canProceed && !isLastStep) {
      setCurrentStepIndex(prev => prev + 1)
    } else if (isLastStep) {
      handleComplete()
    }
  }
  
  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1)
    }
  }
  
  const handleComplete = async () => {
    setIsGenerating(true)
    // Here you would typically save the configuration and generate recommendations
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
  }

  useEffect(() => {
    // Generate initial smart suggestions
    const suggestions = generateSmartSuggestions(answers)
    setSmartSuggestions(suggestions)
  }, [])

  const renderQuestion = (question: Question) => {
    const Icon = getQuestionIcon(question.id)
    
    switch (question.type) {
      case 'select':
        return (
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <Icon className="h-5 w-5 mr-2 text-blue-600" />
              <h3 className="text-lg font-semibold">{question.question}</h3>
            </div>
            {question.hint && (
              <p className="text-sm text-gray-600 mb-4">{question.hint}</p>
            )}
            <div className="grid gap-3">
              {question.options?.map((option) => (
                <button
                  key={option.value}
                  className={`p-4 text-left border-2 rounded-lg transition-all hover:shadow-md ${
                    answers[question.id] === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => updateAnswer(question.id, option.value)}
                >
                  <div className="font-medium">{option.label}</div>
                  {option.description && (
                    <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                  )}
                </button>
              ))}
            </div>
            {question.smartSuggestion && answers[question.id] && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start">
                <Lightbulb className="h-4 w-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  {question.smartSuggestion(answers)}
                </p>
              </div>
            )}
          </div>
        )

      case 'multiselect':
        return (
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <Icon className="h-5 w-5 mr-2 text-blue-600" />
              <h3 className="text-lg font-semibold">{question.question}</h3>
            </div>
            <div className="grid gap-3">
              {question.options?.map((option) => {
                const isSelected = answers[question.id]?.includes(option.value)
                return (
                  <button
                    key={option.value}
                    className={`p-4 text-left border-2 rounded-lg transition-all hover:shadow-md ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => {
                      const current = answers[question.id] || []
                      const updated = isSelected
                        ? current.filter((v: string) => v !== option.value)
                        : [...current, option.value]
                      updateAnswer(question.id, updated)
                    }}
                  >
                    <div className="flex items-center">
                      <CheckCircle className={`h-5 w-5 mr-3 ${
                        isSelected ? 'text-blue-600' : 'text-gray-300'
                      }`} />
                      <div>
                        <div className="font-medium">{option.label}</div>
                        {option.description && (
                          <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )

      case 'text':
        return (
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <Icon className="h-5 w-5 mr-2 text-blue-600" />
              <h3 className="text-lg font-semibold">{question.question}</h3>
            </div>
            {question.hint && (
              <p className="text-sm text-gray-600 mb-4">{question.hint}</p>
            )}
            <input
              type="text"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder={`Enter ${question.question.toLowerCase()}`}
              value={answers[question.id] || ''}
              onChange={(e) => updateAnswer(question.id, e.target.value)}
            />
          </div>
        )

      default:
        return null
    }
  }

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Generating Your Recommendations</h2>
          <p className="text-gray-600">Our AI is analyzing your requirements and creating a personalized plan...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Configure Your Project
          </h1>
          <p className="text-gray-600">
            Let our AI help you create the perfect plan for your property
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStepIndex + 1} of {configurationSteps.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentStepIndex + 1) / configurationSteps.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / configurationSteps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {currentStep.title}
                  </h2>
                  <p className="text-gray-600">{currentStep.description}</p>
                </div>

                {/* Questions */}
                <div className="space-y-8">
                  {currentStep.questions.map((question) => (
                    <div key={question.id}>
                      {renderQuestion(question)}
                    </div>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStepIndex === 0}
                    leftIcon={<ChevronLeft className="h-4 w-4" />}
                  >
                    Previous
                  </Button>
                  
                  <Button
                    onClick={nextStep}
                    disabled={!canProceed}
                    rightIcon={isLastStep ? <CheckCircle className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  >
                    {isLastStep ? 'Complete Configuration' : 'Next Step'}
                  </Button>
                </div>
              </Card>
            </div>

            {/* AI Insights Sidebar */}
            <div className="space-y-6">
              {/* AI Insights */}
              {currentStep.smartInsights && (
                <Card className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />
                    AI Insights
                  </h3>
                  <div className="space-y-3">
                    {currentStep.smartInsights(answers).map((insight, index) => (
                      <div key={index} className="text-sm text-gray-700 p-3 bg-amber-50 rounded-lg">
                        {insight}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* AI Suggestions */}
              {smartSuggestions.length > 0 && (
                <Card className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                    Smart Suggestions
                  </h3>
                  <div className="space-y-3">
                    {smartSuggestions.map((suggestion, index) => (
                      <div key={index} className="p-3 bg-green-50 rounded-lg">
                        <div className="font-medium text-green-900 text-sm mb-1">
                          {suggestion.title}
                        </div>
                        <div className="text-xs text-green-700 mb-2">
                          {suggestion.message}
                        </div>
                        <div className="text-xs text-green-600">
                          💡 {suggestion.action}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Progress Summary */}
              <Card className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Configuration Progress</h3>
                <div className="space-y-2">
                  {configurationSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center text-sm">
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        index < currentStepIndex ? 'bg-green-500' :
                        index === currentStepIndex ? 'bg-blue-500' : 'bg-gray-300'
                      }`} />
                      <span className={index <= currentStepIndex ? 'text-gray-900' : 'text-gray-500'}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}