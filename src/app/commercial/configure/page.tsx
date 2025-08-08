'use client'

import { useState, useMemo, useCallback, useEffect, Suspense, memo } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Building2, MapPin, Zap, Target, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { LoadingSpinner, PropertyTypeSelectorSkeleton } from '@/components/ui/LoadingSpinner'
import { CommercialErrorBoundary } from '@/components/ui/ErrorBoundary'
import { calculateCommercialEnergyCost, getEnergyRecommendations, calculateEnergyUpgradeROI, ENERGY_BENCHMARKS } from '@/lib/uk-utils'
import type { CommercialPropertyType, EPCRating, BusinessIndustry, OccupancyType, OperatingHours } from '@/types'
import { usePerformanceMonitoring } from '@/lib/performance'

interface PropertyData {
  propertyType: CommercialPropertyType | ''
  floorArea: string
  postcode: string
  yearBuilt: string
  currentEPC: EPCRating | ''
  industry: BusinessIndustry | ''
  occupancyType: OccupancyType | ''
  operatingHours: OperatingHours | ''
  annualEnergyCost: string
  primaryGoals: string[]
  budget: 'low' | 'medium' | 'high' | 'unlimited' | ''
  urgency: 'immediate' | 'months_3' | 'months_6' | 'year_plus' | ''
}

const initialPropertyData: PropertyData = {
  propertyType: '',
  floorArea: '',
  postcode: '',
  yearBuilt: '',
  currentEPC: '',
  industry: '',
  occupancyType: '',
  operatingHours: '',
  annualEnergyCost: '',
  primaryGoals: [],
  budget: '',
  urgency: ''
}

export default function CommercialConfigurePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [propertyData, setPropertyData] = useState<PropertyData>(initialPropertyData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const totalSteps = 4

  // UK commercial real estate investment property types
  const propertyTypes = useMemo(() => [
    { id: 'office_building' as CommercialPropertyType, name: 'Office Investment', icon: '🏢', description: 'Grade A/B offices, business parks, corporate spaces' },
    { id: 'retail_space' as CommercialPropertyType, name: 'Retail Property', icon: '🏪', description: 'High street shops, retail parks, shopping centers' },
    { id: 'warehouse' as CommercialPropertyType, name: 'Industrial Asset', icon: '🏭', description: 'Warehouses, distribution centers, logistics facilities' },
    { id: 'manufacturing' as CommercialPropertyType, name: 'Industrial Estate', icon: '🏭', description: 'Manufacturing units, industrial estates, workshops' },
    { id: 'hospitality' as CommercialPropertyType, name: 'Hospitality Asset', icon: '🏨', description: 'Hotels, pubs, restaurants, leisure investments' },
    { id: 'healthcare' as CommercialPropertyType, name: 'Healthcare Property', icon: '🏥', description: 'Medical centers, care homes, specialist facilities' },
    { id: 'education' as CommercialPropertyType, name: 'Student Housing', icon: '🏫', description: 'PBSA, HMOs, educational facilities' },
    { id: 'mixed_use' as CommercialPropertyType, name: 'Mixed-Use Investment', icon: '🏬', description: 'Retail-residential, commercial-residential developments' }
  ], [])

  // Property investment goals
  const goalOptions = useMemo(() => [
    { id: 'rental_yield', name: 'Maximize Rental Yields', icon: '💰', description: 'Increase rental income and profitability' },
    { id: 'asset_value', name: 'Enhance Asset Value', icon: '📈', description: 'Capital appreciation and market value' },
    { id: 'tenant_retention', name: 'Improve Tenant Retention', icon: '😊', description: 'Reduce void periods and turnover' },
    { id: 'compliance', name: 'EPC Compliance', icon: '✅', description: 'Meet MEES requirements and avoid restrictions' },
    { id: 'operational_efficiency', name: 'Reduce Operating Costs', icon: '🔧', description: 'Lower maintenance and running costs' },
    { id: 'sustainability', name: 'ESG Credentials', icon: '🌱', description: 'Environmental and sustainability goals' }
  ], [])

  // Budget ranges
  const budgetOptions = useMemo(() => [
    { id: 'low' as const, name: '£10,000 - £50,000', description: 'Essential improvements only' },
    { id: 'medium' as const, name: '£50,000 - £200,000', description: 'Comprehensive upgrades' },
    { id: 'high' as const, name: '£200,000 - £1,000,000', description: 'Full modernization' },
    { id: 'unlimited' as const, name: '£1,000,000+', description: 'No budget constraints' }
  ], [])

  // Validation functions
  const validateStep = useCallback((step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!propertyData.propertyType) newErrors.propertyType = 'Please select a property type'
        if (!propertyData.floorArea) newErrors.floorArea = 'Please enter floor area'
        else if (isNaN(Number(propertyData.floorArea)) || Number(propertyData.floorArea) <= 0) {
          newErrors.floorArea = 'Please enter a valid floor area'
        }
        if (!propertyData.postcode) newErrors.postcode = 'Please enter postcode'
        if (!propertyData.yearBuilt) newErrors.yearBuilt = 'Please enter year built'
        break
      
      case 2:
        if (!propertyData.currentEPC) newErrors.currentEPC = 'Please select current EPC rating'
        if (!propertyData.industry) newErrors.industry = 'Please select business industry'
        if (!propertyData.operatingHours) newErrors.operatingHours = 'Please select operating hours'
        break
      
      case 3:
        if (propertyData.primaryGoals.length === 0) newErrors.primaryGoals = 'Please select at least one goal'
        if (!propertyData.budget) newErrors.budget = 'Please select budget range'
        break
      
      case 4:
        if (!propertyData.urgency) newErrors.urgency = 'Please select timeline'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [propertyData])

  const handleNext = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }, [currentStep, validateStep])

  const handleBack = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }, [])

  const updatePropertyData = useCallback(<K extends keyof PropertyData>(
    field: K, 
    value: PropertyData[K]
  ) => {
    setPropertyData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }, [errors])

  const toggleGoal = useCallback((goalId: string) => {
    setPropertyData(prev => ({
      ...prev,
      primaryGoals: prev.primaryGoals.includes(goalId)
        ? prev.primaryGoals.filter(id => id !== goalId)
        : [...prev.primaryGoals, goalId]
    }))
  }, [])

  // Calculate estimated energy costs if we have enough data
  const estimatedEnergyCost = useMemo(() => {
    if (propertyData.propertyType && propertyData.floorArea) {
      try {
        const floorArea = Number(propertyData.floorArea)
        if (floorArea > 0) {
          return calculateCommercialEnergyCost(propertyData.propertyType, floorArea)
        }
      } catch (e) {
        // Handle calculation errors silently
      }
    }
    return null
  }, [propertyData.propertyType, propertyData.floorArea])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Link href="/commercial" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Commercial
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Commercial Real Estate Assessment
          </h1>
          <p className="text-lg text-gray-600">
            Tell us about your investment property to get personalized optimization recommendations
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-4">
              {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                    step < currentStep 
                      ? 'bg-green-500 text-white' 
                      : step === currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
                  </div>
                  {step < totalSteps && (
                    <div className={`w-16 h-1 mx-2 transition-all duration-200 ${
                      step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="text-center text-sm text-gray-600">
            Step {currentStep} of {totalSteps}: {
              currentStep === 1 ? 'Property Details' :
              currentStep === 2 ? 'Current Systems' :
              currentStep === 3 ? 'Goals & Budget' :
              'Timeline & Review'
            }
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-8 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Details</h2>
                <p className="text-gray-600">Basic information about your commercial property</p>
              </div>

              {/* Property Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-4">Property Type *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {propertyTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => updatePropertyData('propertyType', type.id)}
                      className={`p-4 border-2 rounded-xl text-center transition-all duration-200 hover:scale-105 ${
                        propertyData.propertyType === type.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <div className="font-semibold text-sm">{type.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{type.description}</div>
                    </button>
                  ))}
                </div>
                {errors.propertyType && <p className="text-red-500 text-sm mt-2">{errors.propertyType}</p>}
              </div>

              {/* Floor Area */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Total Floor Area (sq ft) *</label>
                  <Input
                    type="number"
                    value={propertyData.floorArea}
                    onChange={(e) => updatePropertyData('floorArea', e.target.value)}
                    placeholder="e.g., 5000"
                    className={errors.floorArea ? 'border-red-500' : ''}
                  />
                  {errors.floorArea && <p className="text-red-500 text-sm mt-1">{errors.floorArea}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Postcode *</label>
                  <Input
                    value={propertyData.postcode}
                    onChange={(e) => updatePropertyData('postcode', e.target.value.toUpperCase())}
                    placeholder="e.g., SW1A 1AA"
                    className={errors.postcode ? 'border-red-500' : ''}
                  />
                  {errors.postcode && <p className="text-red-500 text-sm mt-1">{errors.postcode}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Year Built *</label>
                <Input
                  type="number"
                  value={propertyData.yearBuilt}
                  onChange={(e) => updatePropertyData('yearBuilt', e.target.value)}
                  placeholder="e.g., 1995"
                  className={`max-w-xs ${errors.yearBuilt ? 'border-red-500' : ''}`}
                />
                {errors.yearBuilt && <p className="text-red-500 text-sm mt-1">{errors.yearBuilt}</p>}
              </div>

              {/* Energy Cost Estimate Preview */}
              {estimatedEnergyCost && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Zap className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-blue-900">Estimated Current Energy Costs</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-blue-600">Annual Cost</div>
                      <div className="font-bold text-blue-900">£{estimatedEnergyCost.totalAnnualCost.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-blue-600">Cost per sq ft</div>
                      <div className="font-bold text-blue-900">£{estimatedEnergyCost.costPerSqM.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-blue-600">Electricity</div>
                      <div className="font-bold text-blue-900">{estimatedEnergyCost.annualElectricity.toLocaleString()} kWh</div>
                    </div>
                    <div>
                      <div className="text-blue-600">Carbon Footprint</div>
                      <div className="font-bold text-blue-900">{estimatedEnergyCost.carbonFootprint} tonnes CO2</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Current Systems</h2>
                <p className="text-gray-600">Information about your current building performance</p>
              </div>

              {/* EPC Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-4">Current EPC Rating *</label>
                <div className="flex flex-wrap gap-3">
                  {(['A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G'] as EPCRating[]).map((rating) => (
                    <button
                      key={rating}
                      onClick={() => updatePropertyData('currentEPC', rating)}
                      className={`px-4 py-3 rounded-lg font-bold transition-all duration-200 ${
                        propertyData.currentEPC === rating
                          ? 'bg-blue-600 text-white transform scale-110'
                          : ['A+', 'A', 'B'].includes(rating)
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : ['C', 'D'].includes(rating)
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
                {errors.currentEPC && <p className="text-red-500 text-sm mt-2">{errors.currentEPC}</p>}
                <p className="text-gray-500 text-sm mt-2">Don't know your EPC rating? We can arrange an assessment.</p>
              </div>

              {/* Property Investment Focus */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-4">Property Investment Focus *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {([
                    'technology', 'finance', 'healthcare', 'retail', 'manufacturing',
                    'education', 'hospitality', 'logistics', 'professional_services',
                    'public_sector', 'non_profit'
                  ] as BusinessIndustry[]).map((industry) => (
                    <button
                      key={industry}
                      onClick={() => updatePropertyData('industry', industry)}
                      className={`px-4 py-3 rounded-lg text-left transition-all duration-200 capitalize ${
                        propertyData.industry === industry
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {industry.replace('_', ' ')} properties
                    </button>
                  ))}
                </div>
                {errors.industry && <p className="text-red-500 text-sm mt-2">{errors.industry}</p>}
                <p className="text-gray-500 text-sm mt-2">What sector does your property serve or target?</p>
              </div>

              {/* Operating Hours */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-4">Typical Operating Hours *</label>
                <div className="space-y-3">
                  {([
                    { id: 'standard_business' as OperatingHours, name: 'Standard Business Hours', desc: '9 AM - 5 PM, Monday to Friday' },
                    { id: 'extended_hours' as OperatingHours, name: 'Extended Hours', desc: '7 AM - 9 PM, Monday to Saturday' },
                    { id: 'twenty_four_seven' as OperatingHours, name: '24/7 Operations', desc: 'Round-the-clock business operations' },
                    { id: 'seasonal' as OperatingHours, name: 'Seasonal/Variable', desc: 'Hours vary by season or demand' }
                  ]).map((hours) => (
                    <button
                      key={hours.id}
                      onClick={() => updatePropertyData('operatingHours', hours.id)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                        propertyData.operatingHours === hours.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold">{hours.name}</div>
                      <div className="text-sm text-gray-600">{hours.desc}</div>
                    </button>
                  ))}
                </div>
                {errors.operatingHours && <p className="text-red-500 text-sm mt-2">{errors.operatingHours}</p>}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <DollarSign className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Goals & Budget</h2>
                <p className="text-gray-600">What do you want to achieve and what's your budget?</p>
              </div>

              {/* Primary Goals */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-4">Primary Goals (select all that apply) *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {goalOptions.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className={`p-4 border-2 rounded-xl text-center transition-all duration-200 hover:scale-105 ${
                        propertyData.primaryGoals.includes(goal.id)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{goal.icon}</div>
                      <div className="font-semibold text-sm">{goal.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{goal.description}</div>
                    </button>
                  ))}
                </div>
                {errors.primaryGoals && <p className="text-red-500 text-sm mt-2">{errors.primaryGoals}</p>}
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-4">Investment Budget *</label>
                <div className="space-y-3">
                  {budgetOptions.map((budget) => (
                    <button
                      key={budget.id}
                      onClick={() => updatePropertyData('budget', budget.id)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                        propertyData.budget === budget.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">{budget.name}</div>
                          <div className="text-sm text-gray-600">{budget.description}</div>
                        </div>
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>
                {errors.budget && <p className="text-red-500 text-sm mt-2">{errors.budget}</p>}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Timeline & Review</h2>
                <p className="text-gray-600">When would you like to start your optimization project?</p>
              </div>

              {/* Timeline */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-4">Project Timeline *</label>
                <div className="space-y-3">
                  {[
                    { id: 'immediate', name: 'Immediate (within 1 month)', desc: 'Ready to start as soon as possible' },
                    { id: 'months_3', name: 'Next 3 months', desc: 'Planning phase, ready to begin soon' },
                    { id: 'months_6', name: 'Within 6 months', desc: 'Medium-term planning and budgeting' },
                    { id: 'year_plus', name: 'Over 12 months', desc: 'Long-term planning and evaluation' }
                  ].map((timeline) => (
                    <button
                      key={timeline.id}
                      onClick={() => updatePropertyData('urgency', timeline.id as any)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                        propertyData.urgency === timeline.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold">{timeline.name}</div>
                      <div className="text-sm text-gray-600">{timeline.desc}</div>
                    </button>
                  ))}
                </div>
                {errors.urgency && <p className="text-red-500 text-sm mt-2">{errors.urgency}</p>}
              </div>

              {/* Review Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Property Summary</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Property Type:</span>
                    <span className="ml-2 font-semibold">{propertyTypes.find(p => p.id === propertyData.propertyType)?.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Floor Area:</span>
                    <span className="ml-2 font-semibold">{propertyData.floorArea} sq ft</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Current EPC:</span>
                    <span className="ml-2 font-semibold">{propertyData.currentEPC}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Budget:</span>
                    <span className="ml-2 font-semibold">{budgetOptions.find(b => b.id === propertyData.budget)?.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Primary Goals:</span>
                    <span className="ml-2 font-semibold">{propertyData.primaryGoals.length} selected</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Timeline:</span>
                    <span className="ml-2 font-semibold">{propertyData.urgency?.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200">
            <Button
              onClick={handleBack}
              disabled={currentStep === 1}
              variant="outline"
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                className="flex items-center bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900"
              >
                Next Step
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Link 
                href="/commercial/solutions"
                className="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                View My Recommendations
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            )}
          </div>
        </Card>

        {/* Help Section */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            Need help with any of these questions?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Contact Our Experts
            </Link>
            <Link
              href="/commercial/pricing"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              View Business Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}