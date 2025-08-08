'use client'

import Link from 'next/link'
import { ArrowRight, TrendingUp, Zap, Shield, Award, CheckCircle, Building2, DollarSign, Clock, Target, Lightbulb, BarChart3, Users, Globe, Star } from 'lucide-react'
import { useState, useEffect, memo, useMemo, useCallback, Suspense } from 'react'
import { calculateCommercialEnergyCost, calculateEnergyUpgradeROI, ENERGY_BENCHMARKS } from '@/lib/uk-utils'
import { CommercialErrorBoundary } from '@/components/ui/ErrorBoundary'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { usePerformanceMonitoring } from '@/lib/performance'

// Optimized Animated Counter Component for Business Metrics
const BusinessCounter = memo(({ value, suffix, duration = 2000 }: { value: string, suffix?: string, duration?: number }) => {
  const [displayValue, setDisplayValue] = useState('0')
  const [isAnimating, setIsAnimating] = useState(false)
  
  useEffect(() => {
    if (isAnimating) return // Prevent multiple animations
    
    setIsAnimating(true)
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
    const prefix = value.replace(/[0-9]/g, '')
    let start = 0
    const increment = numericValue / (duration / 50)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= numericValue) {
        setDisplayValue(value + (suffix || ''))
        setIsAnimating(false)
        clearInterval(timer)
      } else {
        setDisplayValue(prefix + Math.floor(start).toLocaleString() + (suffix || ''))
      }
    }, 50)
    
    return () => {
      clearInterval(timer)
      setIsAnimating(false)
    }
  }, [value, suffix, duration, isAnimating])
  
  return <span className="font-bold text-white">{displayValue}</span>
})

BusinessCounter.displayName = 'BusinessCounter'

// Memoized property types to prevent re-creation
const PROPERTY_TYPES = [
  {
    type: 'Prime Office Buildings',
    icon: '🏢',
    savings: '£8,000-£25,000',
    description: 'Grade A offices, business parks, corporate headquarters',
    improvements: ['Smart building automation', 'Energy performance certificates', 'Tenant attraction features'],
    roiMonths: '18-24',
    color: 'blue'
  },
  {
    type: 'High Street Retail',
    icon: '🏪',
    savings: '£12,000-£40,000',
    description: 'Shop units, retail parks, shopping centers',
    improvements: ['Energy-efficient systems', 'Modern fit-outs', 'Digital infrastructure'],
    roiMonths: '12-18',
    color: 'green'
  },
  {
    type: 'Industrial & Logistics',
    icon: '🏭',
    savings: '£15,000-£60,000',
    description: 'Warehouses, distribution centers, industrial estates',
    improvements: ['LED lighting upgrades', 'Automated systems', 'Energy monitoring'],
    roiMonths: '6-12',
    color: 'orange'
  },
  {
    type: 'Hospitality Properties',
    icon: '🏨',
    savings: '£20,000-£80,000',
    description: 'Hotels, pubs, restaurants, leisure facilities',
    improvements: ['Guest experience systems', 'Energy management', 'Revenue optimization'],
    roiMonths: '24-36',
    color: 'purple'
  },
  {
    type: 'Healthcare Real Estate',
    icon: '🏥',
    savings: '£25,000-£75,000',
    description: 'Medical centers, care homes, dental practices',
    improvements: ['Specialist HVAC systems', 'Compliance upgrades', 'Patient comfort features'],
    roiMonths: '18-30',
    color: 'blue'
  },
  {
    type: 'Student Accommodation',
    icon: '🏫',
    savings: '£18,000-£55,000',
    description: 'Purpose-built student housing, HMOs, educational facilities',
    improvements: ['Energy-efficient heating', 'Modern amenities', 'Security systems'],
    roiMonths: '20-36',
    color: 'green'
  },
  {
    type: 'Mixed-Use Investments',
    icon: '🏬',
    savings: '£30,000-£120,000',
    description: 'Retail-residential, commercial-residential developments',
    improvements: ['Flexible space design', 'Multi-tenant systems', 'Asset diversification'],
    roiMonths: '24-42',
    color: 'orange'
  },
  {
    type: 'Alternative Investments',
    icon: '💻',
    savings: '£50,000-£200,000',
    description: 'Data centers, self-storage, car parks, specialist facilities',
    improvements: ['Specialized optimization', 'Technology upgrades', 'Operational efficiency'],
    roiMonths: '12-24',
    color: 'purple'
  }
] as const

const VALUE_PROPS = [
  {
    title: 'Maximize Rental Yields',
    description: 'Increase rental income through property improvements and efficiency',
    icon: '💰',
    metrics: 'Typical yield improvement: 12-20% increase',
    color: 'green'
  },
  {
    title: 'Enhance Asset Value',
    description: 'Boost capital appreciation with smart building upgrades',
    icon: '📈',
    metrics: 'Average increase: 8-15% property value',
    color: 'blue'
  },
  {
    title: 'Improve Tenant Retention',
    description: 'Reduce void periods with modern, efficient properties',
    icon: '😊',
    metrics: 'Up to 40% longer tenancy agreements',
    color: 'purple'
  },
  {
    title: 'Ensure Regulatory Compliance',
    description: 'Meet EPC requirements and avoid letting restrictions',
    icon: '✅',
    metrics: 'MEES compliance and C-rating achievement',
    color: 'emerald'
  }
] as const

const BUSINESS_METRICS = [
  { label: 'Average Annual Savings', value: '£45,000', icon: DollarSign, color: 'green', suffix: '' },
  { label: 'Typical ROI', value: '15', icon: TrendingUp, color: 'blue', suffix: '%' },
  { label: 'Payback Period', value: '3.2', icon: Clock, color: 'purple', suffix: ' years' },
  { label: 'Carbon Reduction', value: '40', icon: Globe, color: 'emerald', suffix: '%' },
  { label: 'Property Value Increase', value: '12', icon: Building2, color: 'indigo', suffix: '%' },
  { label: 'Properties Optimized', value: '2,400', icon: Users, color: 'orange', suffix: '+' }
] as const

function CommercialPageInner() {
  const { onMount, measureOperation } = usePerformanceMonitoring('CommercialPage')
  const [animatedStats, setAnimatedStats] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // Performance monitoring on mount
  useEffect(() => {
    onMount()
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [onMount])
  
  // Trigger animations after component loads
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setAnimatedStats(true), 500)
      return () => clearTimeout(timer)
    }
  }, [isLoading])
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <LoadingSpinner size="lg" text="Loading commercial platform..." />
      </div>
    )
  }


  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Professional B2B Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23E2E8F0%22%20fill-opacity=%220.4%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Commercial/Residential Toggle */}
        <section className="pt-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center mb-8">
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-2 shadow-lg">
                <div className="flex items-center space-x-4">
                  <Link 
                    href="/"
                    className="flex items-center space-x-3 px-6 py-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-semibold transition-all duration-200"
                  >
                    <span className="text-2xl">🏠</span>
                    <div className="text-left">
                      <div className="font-bold">Build Your Home</div>
                      <div className="text-xs opacity-70">Extensions, new builds, renovations</div>
                    </div>
                  </Link>
                  <Link 
                    href="/commercial"
                    className="flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg"
                  >
                    <span className="text-2xl">🏢</span>
                    <div className="text-left">
                      <div className="font-bold">Optimize Your Real Estate</div>
                      <div className="text-xs opacity-90">Commercial property, investment returns, asset value</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Section - Professional B2B */}
        <section className="pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Trust Indicators Bar */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-gradient-to-r from-emerald-50 to-blue-50 border-2 border-emerald-200 text-gray-800 px-8 py-4 rounded-2xl text-sm font-bold shadow-lg">
                <Award className="h-5 w-5 mr-3 text-emerald-600" />
                <span className="flex items-center space-x-6">
                  <span className="text-emerald-700">2,400+ UK properties</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-blue-700">£180M+ energy savings</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-purple-700">ISO 50001 certified</span>
                </span>
              </div>
              
              {/* Professional Certifications */}
              <div className="flex justify-center items-center space-x-8 mt-6 opacity-70">
                {['RIBA', 'CIBSE', 'BSRIA', 'Energy Institute', 'CITB'].map((cert, index) => (
                  <div key={index} className="text-sm font-semibold text-gray-600 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                    {cert}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                <span className="block mb-2">Maximize Your</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600">
                  Real Estate Investment
                </span>
                <span className="block text-2xl md:text-3xl lg:text-4xl text-gray-700 font-medium mt-4">
                  Through Smart Property Optimization
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-5xl mx-auto leading-relaxed font-medium">
                <span className="text-emerald-600 font-semibold">Reduce operating costs by 30-50%</span>, 
                <span className="text-blue-600 font-semibold">increase asset value by 8-15%</span>, and 
                <span className="text-purple-600 font-semibold">enhance rental yields by 12-20%</span> 
                with intelligent property optimization
              </p>
              
              {/* Enhanced Value Proposition Cards */}
              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
                <div className="bg-gradient-to-br from-emerald-50 to-green-100 border-2 border-emerald-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center justify-center w-12 h-12 bg-emerald-600 rounded-xl mb-4 mx-auto">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-emerald-800 mb-2">30-50%</div>
                  <div className="text-emerald-700 font-semibold mb-2">Energy Cost Reduction</div>
                  <div className="text-sm text-emerald-600">Typical annual savings: £15K-£100K</div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-4 mx-auto">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-blue-800 mb-2">2-4 Years</div>
                  <div className="text-blue-700 font-semibold mb-2">ROI Payback Period</div>
                  <div className="text-sm text-blue-600">Industry-leading return rates</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-violet-100 border-2 border-purple-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-xl mb-4 mx-auto">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-purple-800 mb-2">8-15%</div>
                  <div className="text-purple-700 font-semibold mb-2">Property Value Increase</div>
                  <div className="text-sm text-purple-600">Enhanced asset marketability</div>
                </div>
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link 
                  href="/commercial/configure" 
                  className="relative inline-flex items-center justify-center bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-800 hover:from-blue-800 hover:via-blue-900 hover:to-indigo-900 text-white font-bold px-10 py-5 rounded-2xl transition-all duration-300 shadow-2xl group transform hover:scale-105 hover:shadow-3xl text-xl border border-blue-600"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Building2 className="mr-3 h-7 w-7 group-hover:rotate-12 transition-transform relative z-10" />
                  <span className="relative z-10">Get Free Property Analysis</span>
                  <ArrowRight className="ml-3 h-7 w-7 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">FREE</div>
                </Link>
                
                <Link 
                  href="/commercial/pricing" 
                  className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 font-bold px-10 py-5 rounded-2xl border-3 border-gray-300 hover:border-blue-400 transition-all duration-300 shadow-xl group transform hover:scale-105 hover:shadow-2xl text-xl"
                >
                  <BarChart3 className="mr-3 h-7 w-7 group-hover:scale-110 transition-transform text-blue-600" />
                  View Investment Plans
                  <div className="ml-3 bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full">from £199/mo</div>
                </Link>
              </div>
            </div>

            {/* Enhanced Business Success Metrics */}
            <div className="bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 rounded-3xl shadow-3xl p-8 md:p-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/5 to-transparent rounded-full blur-3xl"></div>
              
              <div className="text-center mb-12 relative z-10">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-sm font-bold mb-6">
                  <Shield className="h-4 w-4 mr-2" />
                  Verified Business Performance Data
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Proven Business Results
                </h2>
                <p className="text-blue-100 text-xl max-w-3xl mx-auto">
                  Real investment returns from 2,400+ UK commercial property optimizations completed 2022-2024
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
                {BUSINESS_METRICS.map((metric, index) => {
                  const Icon = metric.icon
                  const gradients = {
                    green: 'from-emerald-500 to-green-600',
                    blue: 'from-blue-500 to-indigo-600', 
                    purple: 'from-purple-500 to-violet-600',
                    emerald: 'from-emerald-500 to-teal-600',
                    indigo: 'from-indigo-500 to-blue-600',
                    orange: 'from-orange-500 to-red-500'
                  }
                  const gradient = gradients[metric.color as keyof typeof gradients] || gradients.blue
                  
                  return (
                    <div key={index} className="text-center p-6 bg-white/15 backdrop-blur-lg rounded-2xl border border-white/30 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} mb-6 shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-3xl md:text-4xl font-bold text-white mb-3">
                        <BusinessCounter value={metric.value} suffix={metric.suffix} duration={2000 + index * 200} />
                      </div>
                      <div className="text-sm md:text-base text-blue-100 font-semibold leading-tight">
                        {metric.label}
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="text-center mt-12 relative z-10">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-4xl mx-auto">
                  <p className="text-white text-base font-medium mb-2">
                    ✓ Data verified by independent energy consultants
                  </p>
                  <p className="text-blue-100 text-sm">
                    Based on 2,400+ UK commercial property optimizations completed 2022-2024 | Average project size: £120K investment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Commercial Real Estate Assets Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 text-blue-800 px-6 py-3 rounded-full text-sm font-bold mb-8">
                <Building2 className="h-4 w-4 mr-2" />
                Comprehensive Commercial Asset Optimization
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
                <span className="block mb-2">Every UK Commercial</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">
                  Property Investment
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 max-w-5xl mx-auto font-medium">
                Specialized optimization solutions for <span className="text-emerald-600 font-bold">every property investment type</span> with enhanced asset value and guaranteed returns
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {PROPERTY_TYPES.map((property, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-blue-500">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4">{property.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{property.type}</h3>
                    <div className="text-2xl font-bold text-green-600 mb-2">{property.savings}</div>
                    <div className="text-sm text-gray-500">Annual savings potential</div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{property.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Typical Improvements:</h4>
                    <ul className="space-y-1">
                      {property.improvements.map((improvement, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-sm text-blue-800 font-semibold">
                      ROI Timeline: {property.roiMonths} months
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Value Propositions */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Property Investors Choose BuildMate AI
              </h2>
              <p className="text-xl text-gray-600">
                Professional-grade optimization with measurable investment returns
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {VALUE_PROPS.map((prop, index) => (
                <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                  <div className="text-4xl mb-4">{prop.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{prop.title}</h3>
                  <p className="text-gray-600 mb-4">{prop.description}</p>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm font-semibold text-gray-800">{prop.metrics}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI Calculator Preview */}
        <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-8">
                <h2 className="text-3xl font-bold mb-4">See Your Investment Returns</h2>
                <p className="text-blue-100 text-lg">Get instant yield and value enhancement projections</p>
              </div>
              
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Example: 5,000 sq ft Office Building</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium">Current Annual Energy Cost:</span>
                        <span className="text-xl font-bold text-gray-900">£18,500</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                        <span className="font-medium">After Optimization:</span>
                        <span className="text-xl font-bold text-green-600">£11,100</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                        <span className="font-medium">Annual Savings:</span>
                        <span className="text-2xl font-bold text-blue-600">£7,400</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                        <span className="font-medium">Payback Period:</span>
                        <span className="text-xl font-bold text-purple-600">2.8 years</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 mb-6">
                      <div className="text-4xl font-bold text-green-600 mb-2">£148,000</div>
                      <div className="text-sm text-green-700 font-semibold">20-Year Total Savings</div>
                    </div>
                    
                    <Link 
                      href="/commercial/configure"
                      className="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Calculate My Savings
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-700 to-indigo-700">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Optimize Your Property Investment?
            </h2>
            <p className="text-blue-100 text-xl mb-8 leading-relaxed">
              Join 2,400+ property investors who've enhanced yields and increased asset value with BuildMate AI
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/commercial/configure" 
                className="inline-flex items-center bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg group transform hover:scale-105 hover:shadow-2xl"
              >
                Get Property Assessment
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/commercial/pricing" 
                className="inline-flex items-center bg-transparent text-white font-semibold px-8 py-4 rounded-xl border-2 border-white hover:bg-white hover:text-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                View Investment Plans
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-blue-100">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-2" />
                <span>4.9/5 Business Rating</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-green-400 mr-2" />
                <span>£180M+ Total Savings</span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 text-yellow-400 mr-2" />
                <span>UK Building Regulations Certified</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

// Export with performance optimizations
export default function CommercialPage() {
  return (
    <CommercialErrorBoundary>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <LoadingSpinner size="lg" text="Loading commercial platform..." />
        </div>
      }>
        <CommercialPageInner />
      </Suspense>
    </CommercialErrorBoundary>
  )
}