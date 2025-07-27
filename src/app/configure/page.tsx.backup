'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, RotateCcw, Home, MapPin, Calendar, Palette, Settings, Sparkles, Check } from 'lucide-react'

interface HouseConfig {
  type: string
  location: string
  budget: number
  timeline: string
  style: string
  bedrooms: number
  bathrooms: number
  features: string[]
  kitchenGrade: string
  flooring: string
  smartHome: boolean
}

export default function ConfigurePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [config, setConfig] = useState<HouseConfig>({
    type: '',
    location: '',
    budget: 200000,
    timeline: '',
    style: '',
    bedrooms: 3,
    bathrooms: 2,
    features: [],
    kitchenGrade: '',
    flooring: '',
    smartHome: false
  })
  
  const [estimatedCost, setEstimatedCost] = useState(200000)
  const [estimatedTimeline, setEstimatedTimeline] = useState('18 months')

  useEffect(() => {
    // Simulate real-time price updates based on configuration
    let baseCost = config.budget
    if (config.kitchenGrade === 'premium') baseCost += 15000
    if (config.kitchenGrade === 'luxury') baseCost += 30000
    if (config.smartHome) baseCost += 8000
    if (config.features.includes('garage')) baseCost += 12000
    if (config.features.includes('office')) baseCost += 8000
    
    setEstimatedCost(Math.max(baseCost - 12550, config.budget * 0.85)) // Always show savings
    
    // Update timeline based on complexity
    const complexity = config.features.length + (config.smartHome ? 1 : 0)
    if (complexity > 3) {
      setEstimatedTimeline('20 months')
    } else if (complexity > 1) {
      setEstimatedTimeline('18 months')
    } else {
      setEstimatedTimeline('16 months')
    }
  }, [config])

  const houseTypes = [
    { id: 'new-build', name: 'New Build', description: 'Build from scratch', icon: '🏗️' },
    { id: 'extension', name: 'Extension', description: 'Extend existing home', icon: '🏠' },
    { id: 'renovation', name: 'Renovation', description: 'Complete makeover', icon: '🔨' },
    { id: 'conversion', name: 'Conversion', description: 'Loft or garage conversion', icon: '🏡' }
  ]

  const houseStyles = [
    { id: 'modern', name: 'Modern', preview: '🏢' },
    { id: 'traditional', name: 'Traditional', preview: '🏡' },
    { id: 'contemporary', name: 'Contemporary', preview: '🏠' },
    { id: 'victorian', name: 'Victorian', preview: '🏛️' }
  ]

  const features = [
    { id: 'garage', name: 'Garage', icon: '🚗', cost: '+£12k' },
    { id: 'office', name: 'Home Office', icon: '💼', cost: '+£8k' },
    { id: 'garden', name: 'Garden Design', icon: '🌱', cost: '+£5k' },
    { id: 'solar', name: 'Solar Panels', icon: '☀️', cost: '+£10k' },
    { id: 'ensuite', name: 'En-suite', icon: '🛁', cost: '+£6k' },
    { id: 'utility', name: 'Utility Room', icon: '🧺', cost: '+£4k' }
  ]

  const kitchenGrades = [
    { id: 'standard', name: 'Standard', price: 'Included', description: 'Quality units and appliances' },
    { id: 'premium', name: 'Premium', price: '+£15k', description: 'High-end finishes and appliances' },
    { id: 'luxury', name: 'Luxury', price: '+£30k', description: 'Designer kitchen with premium appliances' }
  ]

  const progressPercentage = (currentStep / 3) * 100

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleFeature = (featureId: string) => {
    setConfig(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId]
    }))
  }

  const canProceed = () => {
    if (currentStep === 1) return config.type && config.location && config.budget && config.timeline
    if (currentStep === 2) return config.style && config.bedrooms && config.bathrooms
    if (currentStep === 3) return config.kitchenGrade && config.flooring
    return false
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Configure Your Dream Home</h1>
              <p className="text-gray-600">Step {currentStep} of 3</p>
            </div>
            <button 
              onClick={() => setConfig({
                type: '', location: '', budget: 200000, timeline: '',
                style: '', bedrooms: 3, bathrooms: 2, features: [],
                kitchenGrade: '', flooring: '', smartHome: false
              })}
              className="flex items-center text-gray-600 hover:text-gray-700"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Reset
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Configuration Panel - 60% width */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Step 1: Basic Requirements */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
                <div className="flex items-center mb-6">
                  <Home className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Basic Requirements</h2>
                    <p className="text-gray-600">Tell us about your dream home</p>
                  </div>
                </div>

                {/* House Type Selection */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">What type of project?</label>
                  <div className="grid grid-cols-2 gap-4">
                    {houseTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setConfig(prev => ({ ...prev, type: type.id }))}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                          config.type === type.id
                            ? 'border-blue-500 bg-blue-50 shadow-lg'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-3xl mb-2">{type.icon}</div>
                        <div className="font-semibold text-gray-900">{type.name}</div>
                        <div className="text-sm text-gray-600">{type.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    <MapPin className="inline h-5 w-5 mr-2" />
                    Location
                  </label>
                  <select
                    value={config.location}
                    onChange={(e) => setConfig(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                  >
                    <option value="">Select your location</option>
                    <option value="london">London</option>
                    <option value="birmingham">Birmingham</option>
                    <option value="manchester">Manchester</option>
                    <option value="leeds">Leeds</option>
                    <option value="liverpool">Liverpool</option>
                    <option value="bristol">Bristol</option>
                    <option value="newcastle">Newcastle</option>
                    <option value="glasgow">Glasgow</option>
                  </select>
                </div>

                {/* Budget Slider */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    Budget: £{config.budget.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="50000"
                    max="500000"
                    step="5000"
                    value={config.budget}
                    onChange={(e) => setConfig(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>£50k</span>
                    <span>£500k</span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    <Calendar className="inline h-5 w-5 mr-2" />
                    Preferred Timeline
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {['ASAP', '6-12 months', '12+ months'].map((timeline) => (
                      <button
                        key={timeline}
                        onClick={() => setConfig(prev => ({ ...prev, timeline }))}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          config.timeline === timeline
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold text-gray-900">{timeline}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Style Customization */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
                <div className="flex items-center mb-6">
                  <Palette className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Style & Layout</h2>
                    <p className="text-gray-600">Customize your home's design</p>
                  </div>
                </div>

                {/* House Style */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">Architectural Style</label>
                  <div className="grid grid-cols-2 gap-4">
                    {houseStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setConfig(prev => ({ ...prev, style: style.id }))}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                          config.style === style.id
                            ? 'border-blue-500 bg-blue-50 shadow-lg'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-4xl mb-2">{style.preview}</div>
                        <div className="font-semibold text-gray-900">{style.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bedrooms & Bathrooms */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-4">Bedrooms</label>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setConfig(prev => ({ ...prev, bedrooms: Math.max(1, prev.bedrooms - 1) }))}
                        className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-xl"
                      >
                        -
                      </button>
                      <div className="text-3xl font-bold text-blue-600 w-16 text-center">{config.bedrooms}</div>
                      <button
                        onClick={() => setConfig(prev => ({ ...prev, bedrooms: prev.bedrooms + 1 }))}
                        className="w-12 h-12 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center font-bold text-xl text-blue-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-4">Bathrooms</label>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setConfig(prev => ({ ...prev, bathrooms: Math.max(1, prev.bathrooms - 1) }))}
                        className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-xl"
                      >
                        -
                      </button>
                      <div className="text-3xl font-bold text-blue-600 w-16 text-center">{config.bathrooms}</div>
                      <button
                        onClick={() => setConfig(prev => ({ ...prev, bathrooms: prev.bathrooms + 1 }))}
                        className="w-12 h-12 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center font-bold text-xl text-blue-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Special Features */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">Special Features</label>
                  <div className="grid grid-cols-2 gap-4">
                    {features.map((feature) => (
                      <button
                        key={feature.id}
                        onClick={() => toggleFeature(feature.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                          config.features.includes(feature.id)
                            ? 'border-blue-500 bg-blue-50 shadow-lg'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{feature.icon}</span>
                            <div className="text-left">
                              <div className="font-semibold text-gray-900">{feature.name}</div>
                              <div className="text-sm text-gray-600">{feature.cost}</div>
                            </div>
                          </div>
                          {config.features.includes(feature.id) && (
                            <Check className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Finish Selection */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
                <div className="flex items-center mb-6">
                  <Settings className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Finishes & Features</h2>
                    <p className="text-gray-600">Choose your interior specifications</p>
                  </div>
                </div>

                {/* Kitchen Grade */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">Kitchen Grade</label>
                  <div className="space-y-4">
                    {kitchenGrades.map((grade) => (
                      <button
                        key={grade.id}
                        onClick={() => setConfig(prev => ({ ...prev, kitchenGrade: grade.id }))}
                        className={`w-full p-6 rounded-xl border-2 transition-all duration-200 hover:scale-102 text-left ${
                          config.kitchenGrade === grade.id
                            ? 'border-blue-500 bg-blue-50 shadow-lg'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-gray-900 text-lg">{grade.name}</div>
                            <div className="text-gray-600">{grade.description}</div>
                          </div>
                          <div className="text-lg font-bold text-blue-600">{grade.price}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Flooring */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">Flooring</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['Hardwood', 'Laminate', 'Carpet', 'Tile'].map((flooring) => (
                      <button
                        key={flooring}
                        onClick={() => setConfig(prev => ({ ...prev, flooring }))}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          config.flooring === flooring
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold text-gray-900">{flooring}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Smart Home */}
                <div className="mb-8">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.smartHome}
                      onChange={(e) => setConfig(prev => ({ ...prev, smartHome: e.target.checked }))}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded border-2 mr-3 flex items-center justify-center transition-all duration-200 ${
                      config.smartHome ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                    }`}>
                      {config.smartHome && <Check className="h-4 w-4 text-white" />}
                    </div>
                    <div>
                      <span className="text-lg font-semibold text-gray-900">Smart Home Integration</span>
                      <div className="text-gray-600">Add smart lighting, heating, and security (+£8k)</div>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* 3D Preview & Price Panel - 40% width */}
          <div className="lg:col-span-2 space-y-6">
            {/* 3D House Preview */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Dream Home</h3>
              
              {/* 3D Model Placeholder */}
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-xl"></div>
                <div className="text-center relative z-10">
                  <div className="text-6xl mb-4 animate-float">
                    {config.style === 'modern' ? '🏢' : 
                     config.style === 'victorian' ? '🏛️' : 
                     config.style === 'contemporary' ? '🏠' : '🏡'}
                  </div>
                  <p className="text-gray-600 font-medium">3D Preview</p>
                  <div className="mt-2 text-sm text-gray-500">
                    {config.bedrooms > 0 && `${config.bedrooms} bed`}
                    {config.bathrooms > 0 && ` • ${config.bathrooms} bath`}
                  </div>
                </div>
              </div>

              {/* Real-time Price */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Estimated Cost</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      £{estimatedCost.toLocaleString()}
                    </div>
                    {estimatedCost < config.budget && (
                      <div className="text-sm text-green-600 font-medium">
                        £{(config.budget - estimatedCost).toLocaleString()} under budget! 🎉
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Timeline</span>
                  <span className="font-semibold text-gray-900">{estimatedTimeline}</span>
                </div>
              </div>

              {/* Configuration Summary */}
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-gray-900">Configuration Summary</h4>
                {config.type && (
                  <div className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <span className="text-gray-600 capitalize">{config.type.replace('-', ' ')}</span>
                  </div>
                )}
                {config.location && (
                  <div className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <span className="text-gray-600 capitalize">{config.location}</span>
                  </div>
                )}
                {config.features.length > 0 && (
                  <div className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <span className="text-gray-600">+{config.features.length} special features</span>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="space-y-3">
                {currentStep < 3 ? (
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center ${
                      canProceed()
                        ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Continue to Step {currentStep + 1}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                ) : (
                  <Link
                    href="/review"
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center ${
                      canProceed()
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg transform hover:scale-105'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
                    }`}
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Review My Project
                  </Link>
                )}
                
                {currentStep > 1 && (
                  <button
                    onClick={handlePrevious}
                    className="w-full py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:border-gray-300 transition-all duration-200 flex items-center justify-center"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Previous Step
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}