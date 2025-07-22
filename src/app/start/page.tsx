'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { validateUKPostcode, formatCurrency } from '@/lib/uk-utils'
import { Home, MapPin, Sparkles } from 'lucide-react'

interface ProjectData {
  budget: number
  postcode: string
  projectType: 'new_build' | 'renovation' | 'extension'
  propertyType: 'house' | 'flat' | 'bungalow'
  bedrooms: number
  style: 'modern' | 'traditional' | 'contemporary' | 'eco'
  timeline: 'urgent' | '6_months' | '1_year' | 'flexible'
}

export default function ProjectSetupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [projectData, setProjectData] = useState<ProjectData>({
    budget: 100000,
    postcode: '',
    projectType: 'new_build',
    propertyType: 'house',
    bedrooms: 3,
    style: 'modern',
    timeline: '1_year'
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleNext = () => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (projectData.budget < 10000) {
        newErrors.budget = 'Minimum budget is £10,000'
      }
      if (!validateUKPostcode(projectData.postcode)) {
        newErrors.postcode = 'Please enter a valid UK postcode'
      }
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      if (step < 3) {
        setStep(step + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const handleSubmit = () => {
    // Store project data and redirect to AI generator
    localStorage.setItem('buildmate_project', JSON.stringify(projectData))
    router.push('/generate')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Home className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Let's Plan Your Dream Build
          </h1>
          <p className="text-gray-600 mt-2">
            Tell us about your project and we'll create the perfect plan
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {step} of 3</span>
            <span className="text-sm text-gray-600">{Math.round((step / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>
        {/* Step Content */}
        <Card>
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-6 w-6 text-blue-600 mr-2" />
                  Project Basics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What's your budget range?
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="10000"
                      max="1000000"
                      step="10000"
                      value={projectData.budget}
                      onChange={(e) => setProjectData(prev => ({ ...prev, budget: Number(e.target.value) }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>£10k</span>
                      <span className="font-semibold text-blue-600">
                        {formatCurrency(projectData.budget)}
                      </span>
                      <span>£1M+</span>
                    </div>
                  </div>
                  {errors.budget && <p className="text-red-600 text-sm mt-1">{errors.budget}</p>}
                </div>

                <Input
                  label="Where is your project located?"
                  placeholder="e.g., SW1A 1AA"
                  value={projectData.postcode}
                  onChange={(e) => setProjectData(prev => ({ ...prev, postcode: e.target.value.toUpperCase() }))}
                  error={errors.postcode}
                  helperText="We'll use this to find local suppliers and check planning rules"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What type of project?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'new_build', label: 'New Build' },
                      { value: 'renovation', label: 'Renovation' },
                      { value: 'extension', label: 'Extension' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setProjectData(prev => ({ ...prev, projectType: option.value as any }))}
                        className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                          projectData.projectType === option.value
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Home className="h-6 w-6 text-blue-600 mr-2" />
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Property type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'house', label: 'House' },
                      { value: 'flat', label: 'Flat' },
                      { value: 'bungalow', label: 'Bungalow' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setProjectData(prev => ({ ...prev, propertyType: option.value as any }))}
                        className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                          projectData.propertyType === option.value
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Number of bedrooms
                  </label>
                  <div className="flex items-center space-x-4">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setProjectData(prev => ({ ...prev, bedrooms: num }))}
                        className={`w-12 h-12 rounded-lg border font-medium transition-colors ${
                          projectData.bedrooms === num
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Timeline
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'urgent', label: 'ASAP (3-6 months)' },
                      { value: '6_months', label: '6-12 months' },
                      { value: '1_year', label: '1-2 years' },
                      { value: 'flexible', label: 'Flexible timing' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setProjectData(prev => ({ ...prev, timeline: option.value as any }))}
                        className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                          projectData.timeline === option.value
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </>
          )}

          {step === 3 && (
            <>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-6 w-6 text-blue-600 mr-2" />
                  Style Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What's your preferred style?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'modern', label: 'Modern', desc: 'Clean lines, minimalist' },
                      { value: 'traditional', label: 'Traditional', desc: 'Classic British style' },
                      { value: 'contemporary', label: 'Contemporary', desc: 'Mixed modern & classic' },
                      { value: 'eco', label: 'Eco-Friendly', desc: 'Sustainable materials' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setProjectData(prev => ({ ...prev, style: option.value as any }))}
                        className={`p-4 rounded-lg border text-left transition-colors ${
                          projectData.style === option.value
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`font-medium ${projectData.style === option.value ? 'text-blue-600' : 'text-gray-900'}`}>
                          {option.label}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {option.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">Project Summary</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>Budget: {formatCurrency(projectData.budget)}</li>
                    <li>Location: {projectData.postcode}</li>
                    <li>Type: {projectData.projectType.replace('_', ' ')} • {projectData.bedrooms} bedrooms</li>
                    <li>Style: {projectData.style} • Timeline: {projectData.timeline.replace('_', ' ')}</li>
                  </ul>
                </div>
              </CardContent>
            </>
          )}

          <div className="flex justify-between pt-6 border-t">
            {step > 1 && (
              <Button 
                variant="outline" 
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
            )}
            <div className="ml-auto">
              <Button onClick={handleNext}>
                {step === 3 ? 'Generate My Plans' : 'Next Step'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}