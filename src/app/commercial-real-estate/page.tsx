'use client'

import Link from 'next/link'
import { ArrowRight, TrendingUp, Building2, DollarSign, BarChart3, Globe, Shield, Award, Users, Clock, Target, Lightbulb, CheckCircle, Phone, Mail, Calendar, Star, ChevronRight, PieChart, Building, MapPin, Briefcase } from 'lucide-react'
import { useState, useEffect, memo, useMemo, useCallback, Suspense } from 'react'
import { Card, Button, Input, LoadingSpinner, ROICalculator } from '@/components/ui'
import { CommercialErrorBoundary } from '@/components/ui/ErrorBoundary'
import { calculateCommercialEnergyCost, calculateEnergyUpgradeROI } from '@/lib/uk-utils'
import { usePerformanceMonitoring } from '@/lib/performance'
import type { CommercialPropertyType } from '@/types'

// Animated Counter for Business Metrics
const BusinessCounter = memo(({ value, suffix, duration = 2000 }: { value: string, suffix?: string, duration?: number }) => {
  const [displayValue, setDisplayValue] = useState('0')
  const [isAnimating, setIsAnimating] = useState(false)
  
  useEffect(() => {
    if (isAnimating) return
    
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

// Deal Flow Data
const CURRENT_DEALS = [
  {
    id: '001',
    type: 'Prime Office',
    location: 'City of London',
    size: '45,000 sq ft',
    value: '£18.5M',
    yield: '5.2%',
    status: 'Available',
    energyRating: 'B',
    features: ['BREEAM Excellent', 'Smart Building Tech', 'Cycle Storage']
  },
  {
    id: '002', 
    type: 'Retail Park',
    location: 'Manchester',
    size: '120,000 sq ft',
    value: '£24.8M',
    yield: '6.8%',
    status: 'Under Offer',
    energyRating: 'C',
    features: ['Multi-let', 'Anchor Tenants', 'Car Parking']
  },
  {
    id: '003',
    type: 'Industrial Estate', 
    location: 'Birmingham',
    size: '200,000 sq ft',
    value: '£31.2M',
    yield: '7.4%',
    status: 'Available',
    energyRating: 'A',
    features: ['Distribution Hub', 'EV Charging', 'Solar Panels']
  },
  {
    id: '004',
    type: 'Mixed Use',
    location: 'Edinburgh',
    size: '80,000 sq ft', 
    value: '£22.5M',
    yield: '5.9%',
    status: 'Available',
    energyRating: 'B',
    features: ['Retail + Residential', 'Historic Building', 'City Centre']
  }
] as const

// Market Intelligence Data
const MARKET_DATA = [
  { metric: 'Total Deals This Quarter', value: '£2.4B', change: '+12%', trend: 'up', color: 'emerald' },
  { metric: 'Average Yield', value: '6.2%', change: '+0.3%', trend: 'up', color: 'blue' },
  { metric: 'Properties Marketed', value: '1,247', change: '+8%', trend: 'up', color: 'purple' },
  { metric: 'Energy Upgrades ROI', value: '18.5%', change: '+2.1%', trend: 'up', color: 'green' },
  { metric: 'Average Days to Complete', value: '73', change: '-5%', trend: 'down', color: 'indigo' },
  { metric: 'Market Activity Index', value: '127', change: '+15%', trend: 'up', color: 'orange' }
] as const

// Property Types with Optimization Focus
const PROPERTY_TYPES = [
  {
    type: 'Prime Office Buildings',
    icon: '🏢',
    marketSize: '£48.2B',
    avgYield: '4.8%',
    optimizationPotential: '25-40%',
    keyMetrics: ['Energy efficiency upgrades', 'Smart building systems', 'Tenant satisfaction'],
    investmentRange: '£2M - £50M+'
  },
  {
    type: 'High Street Retail',
    icon: '🏪', 
    marketSize: '£32.1B',
    avgYield: '6.2%',
    optimizationPotential: '30-50%',
    keyMetrics: ['Omnichannel integration', 'Energy cost reduction', 'Space utilization'],
    investmentRange: '£500K - £15M+'
  },
  {
    type: 'Industrial & Logistics',
    icon: '🏭',
    marketSize: '£41.7B', 
    avgYield: '7.1%',
    optimizationPotential: '35-55%',
    keyMetrics: ['Automated systems', 'LED lighting', 'Temperature control'],
    investmentRange: '£1M - £25M+'
  },
  {
    type: 'Mixed-Use Development',
    icon: '🏬',
    marketSize: '£26.8B',
    avgYield: '5.9%', 
    optimizationPotential: '20-35%',
    keyMetrics: ['Flexible spaces', 'Integrated utilities', 'Multi-tenant systems'],
    investmentRange: '£3M - £75M+'
  }
] as const

// Service Packages
const SERVICE_PACKAGES = [
  {
    name: 'Market Intelligence',
    price: '£2,499',
    period: '/month',
    description: 'Comprehensive UK commercial real estate data and insights',
    features: [
      'Live deal flow dashboard',
      'Market trend analysis', 
      'Investment opportunity alerts',
      'Comparative market analysis',
      'Quarterly market reports'
    ],
    badge: 'Most Popular',
    color: 'blue'
  },
  {
    name: 'Property Optimization',
    price: '£4,999',
    period: '/month',
    description: 'Professional property enhancement and ROI maximization',
    features: [
      'Energy efficiency audits',
      'Smart building integration',
      'Tenant satisfaction programs',
      'Compliance management',
      'Value enhancement strategies'
    ],
    badge: 'Premium',
    color: 'emerald'
  },
  {
    name: 'Enterprise Advisory',
    price: 'Custom',
    period: '',
    description: 'Dedicated commercial real estate advisory services',
    features: [
      'Dedicated account manager',
      'Portfolio strategy consulting',
      'Custom market research',
      'Acquisition support',
      '24/7 market monitoring'
    ],
    badge: 'Enterprise',
    color: 'purple'
  }
] as const

// Consultation Booking Component
const ConsultationBooking = memo(() => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    propertyType: '',
    portfolioSize: '',
    timeframe: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    // Show success message
  }

  return (
    <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <div className="text-center mb-6">
        <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Schedule Professional Consultation</h3>
        <p className="text-gray-600">Speak with a Colliers International commercial property specialist</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <Input
            type="email" 
            placeholder="Business Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="Company Name"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            required
          />
          <Input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
          />
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <select 
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.propertyType}
            onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
            required
          >
            <option value="">Property Type Interest</option>
            <option value="office">Office Buildings</option>
            <option value="retail">Retail Properties</option>
            <option value="industrial">Industrial/Logistics</option>
            <option value="mixed">Mixed-Use</option>
            <option value="portfolio">Portfolio Diversification</option>
          </select>
          
          <select
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.portfolioSize}
            onChange={(e) => setFormData({...formData, portfolioSize: e.target.value})}
            required
          >
            <option value="">Portfolio Size</option>
            <option value="single">Single Property</option>
            <option value="small">2-10 Properties</option>
            <option value="medium">11-50 Properties</option>
            <option value="large">50+ Properties</option>
          </select>
          
          <select
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.timeframe}
            onChange={(e) => setFormData({...formData, timeframe: e.target.value})}
            required
          >
            <option value="">Investment Timeframe</option>
            <option value="immediate">Next 3 months</option>
            <option value="short">3-12 months</option>
            <option value="medium">1-2 years</option>
            <option value="long">2+ years</option>
          </select>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Scheduling...
            </>
          ) : (
            <>
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Free Consultation
            </>
          )}
        </Button>
      </form>
      
      <div className="text-center mt-4 text-sm text-gray-600">
        <Shield className="h-4 w-4 inline mr-1" />
        Your information is secure and will only be used by Colliers International specialists
      </div>
    </Card>
  )
})

ConsultationBooking.displayName = 'ConsultationBooking'

function CommercialRealEstatePageInner() {
  const { onMount, measureOperation } = usePerformanceMonitoring('CommercialRealEstatePage')
  const [selectedPropertyType, setSelectedPropertyType] = useState<CommercialPropertyType>('office_building')
  const [isLoading, setIsLoading] = useState(false)
  const [animatedStats, setAnimatedStats] = useState(false)
  
  // Performance monitoring on mount
  useEffect(() => {
    onMount()
    const timer = setTimeout(() => {
      setIsLoading(false)
      setAnimatedStats(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [onMount])
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <LoadingSpinner size="lg" text="Loading commercial real estate intelligence..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Corporate Professional Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23E2E8F0%22%20fill-opacity=%220.3%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Header with Partnership Branding */}
        <section className="pt-8 pb-4">
          <div className="max-w-7xl mx-auto px-4">
            {/* Partnership Badge */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-900 to-indigo-900 text-white px-8 py-4 rounded-2xl shadow-2xl border border-blue-700">
                <Building2 className="h-6 w-6 mr-3" />
                <div className="text-left">
                  <div className="font-bold text-lg">Colliers International</div>
                  <div className="text-xs opacity-90">Powered by BuildMate AI Intelligence</div>
                </div>
                <div className="ml-6 text-right">
                  <div className="text-sm font-semibold">Tier 1 Partnership</div>
                  <div className="text-xs opacity-75">Commercial Real Estate</div>
                </div>
              </div>
            </div>
            
            {/* Professional Certifications */}
            <div className="flex justify-center items-center space-x-6 mb-8 opacity-75">
              {['RICS', 'CBRE Global', 'Investment Property Forum', 'Property Week', 'BCSC'].map((cert, index) => (
                <div key={index} className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm text-sm font-semibold text-gray-700">
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Section - Corporate B2B */}
        <section className="pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                <span className="block mb-2">Commercial Real Estate</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600">
                  Intelligence Platform
                </span>
                <span className="block text-2xl md:text-3xl lg:text-4xl text-gray-700 font-medium mt-4">
                  Powered by Advanced Market Analytics
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-6xl mx-auto leading-relaxed font-medium">
                <span className="text-blue-600 font-semibold">Access live deal flow</span>, 
                <span className="text-emerald-600 font-semibold">optimize property performance by 25-50%</span>, and 
                <span className="text-purple-600 font-semibold">maximize investment returns</span> 
                through intelligent commercial real estate solutions
              </p>
              
              {/* Enhanced Value Proposition Cards */}
              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4 mx-auto">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-800 mb-2">£2.4B+</div>
                  <div className="text-blue-700 font-semibold mb-2">Quarterly Deal Volume</div>
                  <div className="text-sm text-blue-600">Live transaction data & insights</div>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-50 to-green-100 border-2 border-emerald-200 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-xl mb-4 mx-auto">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-emerald-800 mb-2">18.5%</div>
                  <div className="text-emerald-700 font-semibold mb-2">Average ROI Enhancement</div>
                  <div className="text-sm text-emerald-600">Property optimization returns</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-violet-100 border-2 border-purple-200 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center justify-center w-16 h-16 bg-purple-600 rounded-xl mb-4 mx-auto">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-purple-800 mb-2">1,247</div>
                  <div className="text-purple-700 font-semibold mb-2">Active Properties</div>
                  <div className="text-sm text-purple-600">Currently marketed opportunities</div>
                </div>
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  className="relative bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-800 hover:from-blue-800 hover:via-blue-900 hover:to-indigo-900 text-white font-bold px-12 py-6 text-xl border border-blue-600 shadow-2xl group transform hover:scale-105 hover:shadow-3xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <BarChart3 className="mr-3 h-7 w-7 group-hover:rotate-12 transition-transform relative z-10" />
                  <span className="relative z-10">Access Deal Flow</span>
                  <ArrowRight className="ml-3 h-7 w-7 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">LIVE</div>
                </Button>
                
                <Button 
                  variant="outline"
                  className="bg-white hover:bg-gray-50 text-gray-800 font-bold px-12 py-6 border-3 border-gray-300 hover:border-blue-400 shadow-xl group transform hover:scale-105 hover:shadow-2xl text-xl"
                >
                  <Calendar className="mr-3 h-7 w-7 group-hover:scale-110 transition-transform text-blue-600" />
                  Book Consultation
                  <div className="ml-3 bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full">FREE</div>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Live Market Intelligence Dashboard */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-sm font-bold mb-8">
                <Globe className="h-4 w-4 mr-2" />
                Live Market Intelligence
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                UK Commercial Property Market
              </h2>
              <p className="text-blue-100 text-xl max-w-4xl mx-auto">
                Real-time market data, deal flow insights, and investment intelligence across all UK commercial sectors
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
              {MARKET_DATA.map((data, index) => {
                const gradients = {
                  emerald: 'from-emerald-500 to-green-600',
                  blue: 'from-blue-500 to-indigo-600', 
                  purple: 'from-purple-500 to-violet-600',
                  green: 'from-green-500 to-emerald-600',
                  indigo: 'from-indigo-500 to-blue-600',
                  orange: 'from-orange-500 to-red-500'
                }
                const gradient = gradients[data.color as keyof typeof gradients] || gradients.blue
                
                return (
                  <div key={index} className="text-center p-6 bg-white/15 backdrop-blur-lg rounded-2xl border border-white/30 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} mb-4 shadow-lg`}>
                      {data.trend === 'up' ? <TrendingUp className="h-6 w-6 text-white" /> : <TrendingUp className="h-6 w-6 text-white transform rotate-180" />}
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                      <BusinessCounter value={data.value} duration={2000 + index * 200} />
                    </div>
                    <div className="text-xs md:text-sm text-blue-100 font-semibold leading-tight mb-2">
                      {data.metric}
                    </div>
                    <div className={`text-xs font-bold px-2 py-1 rounded-full ${
                      data.trend === 'up' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                    }`}>
                      {data.change}
                    </div>
                  </div>
                )
              })}
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-4xl mx-auto">
                <p className="text-white text-base font-medium mb-2">
                  ✓ Data updated every 15 minutes from live property transactions
                </p>
                <p className="text-blue-100 text-sm">
                  Source: Colliers International UK, Property Week, CoStar, and 50+ integrated data providers
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Deal Flow Showcase */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-200 text-emerald-800 px-6 py-3 rounded-full text-sm font-bold mb-8">
                <Briefcase className="h-4 w-4 mr-2" />
                Live Deal Flow
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
                <span className="block mb-2">Current Investment</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">
                  Opportunities
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 max-w-5xl mx-auto font-medium">
                Exclusive access to <span className="text-emerald-600 font-bold">live commercial property deals</span> across the UK with detailed investment analysis
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {CURRENT_DEALS.map((deal, index) => (
                <Card key={deal.id} className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-emerald-500">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{deal.type}</h3>
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {deal.location}
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                      deal.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {deal.status}
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-semibold">{deal.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Value:</span>
                      <span className="font-bold text-emerald-600">{deal.value}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Yield:</span>
                      <span className="font-bold text-blue-600">{deal.yield}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">EPC Rating:</span>
                      <span className={`font-bold ${
                        deal.energyRating === 'A' ? 'text-green-600' :
                        deal.energyRating === 'B' ? 'text-blue-600' : 'text-orange-600'
                      }`}>{deal.energyRating}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Features:</h4>
                    <div className="space-y-1">
                      {deal.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-600">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold px-10 py-4 text-lg">
                <Globe className="h-5 w-5 mr-2" />
                Access Full Deal Database
                <span className="ml-2 bg-white/20 px-2 py-1 rounded text-sm">1,247 Properties</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Commercial Property Types with Market Data */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 text-blue-800 px-6 py-3 rounded-full text-sm font-bold mb-8">
                <Building2 className="h-4 w-4 mr-2" />
                Commercial Property Intelligence
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
                <span className="block mb-2">UK Commercial Property</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">
                  Market Analysis
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 max-w-5xl mx-auto font-medium">
                Comprehensive market intelligence and <span className="text-blue-600 font-bold">optimization opportunities</span> across all commercial property sectors
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {PROPERTY_TYPES.map((property, index) => (
                <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-blue-500">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-6">{property.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{property.type}</h3>
                    <div className="text-2xl font-bold text-blue-600 mb-1">{property.marketSize}</div>
                    <div className="text-sm text-gray-500 mb-4">UK Market Size</div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Average Yield:</span>
                      <span className="font-bold text-emerald-600">{property.avgYield}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Optimization Potential:</span>
                      <span className="font-bold text-orange-600">{property.optimizationPotential}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Investment Range:</span>
                      <span className="font-semibold text-gray-900 text-sm">{property.investmentRange}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">Key Optimization Areas:</h4>
                    <ul className="space-y-2">
                      {property.keyMetrics.map((metric, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => setSelectedPropertyType(property.type.toLowerCase().replace(/\s+/g, '_') as CommercialPropertyType)}
                  >
                    Analyze Market
                    <BarChart3 className="h-4 w-4 ml-2" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ROI Calculator with Market Intelligence */}
        <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-12">
                <h2 className="text-4xl font-bold mb-4">Commercial Property ROI Calculator</h2>
                <p className="text-blue-100 text-xl max-w-3xl mx-auto">
                  Calculate investment returns and optimization potential with real UK market data
                </p>
              </div>
              
              <div className="p-8 md:p-12">
                <ROICalculator 
                  initialPropertyType={selectedPropertyType}
                  initialFloorArea={10000}
                  className=""
                />
              </div>
            </div>
          </div>
        </section>

        {/* Service Packages */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Professional Advisory Services
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Comprehensive commercial real estate intelligence and optimization services for serious investors
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {SERVICE_PACKAGES.map((service, index) => {
                const isPopular = service.badge === 'Most Popular'
                
                return (
                  <Card key={index} className={`p-8 relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${
                    isPopular ? 'border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50' : ''
                  }`}>
                    {service.badge && (
                      <div className={`absolute top-0 right-0 px-4 py-2 text-xs font-bold text-white ${
                        service.color === 'blue' ? 'bg-blue-600' :
                        service.color === 'emerald' ? 'bg-emerald-600' : 'bg-purple-600'
                      }`} style={{clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)'}}>
                        {service.badge}
                      </div>
                    )}
                    
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.name}</h3>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-gray-900">{service.price}</span>
                        <span className="text-gray-600 ml-1">{service.period}</span>
                      </div>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                    
                    <ul className="space-y-4 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button className={`w-full font-bold py-4 ${
                      service.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                      service.color === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' :
                      'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}>
                      {service.name === 'Enterprise Advisory' ? 'Contact Sales' : 'Get Started'}
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Professional Consultation Booking */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Speak with Commercial Property Experts
              </h2>
              <p className="text-xl text-gray-600">
                Get personalized advice from Colliers International specialists on your commercial property investments
              </p>
            </div>
            
            <ConsultationBooking />
          </div>
        </section>

        {/* Trust & Partnership Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-700 to-indigo-700">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Trusted by Leading Commercial Property Investors
              </h2>
              <p className="text-blue-100 text-xl leading-relaxed max-w-4xl mx-auto">
                Join institutional investors, property developers, and fund managers who rely on our intelligence platform for commercial real estate decisions
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {[
                { metric: '£2.4B+', label: 'Quarterly Deal Volume', icon: DollarSign },
                { metric: '1,247', label: 'Active Properties', icon: Building2 },
                { metric: '18.5%', label: 'Average ROI Enhancement', icon: TrendingUp },
                { metric: '50+', label: 'Data Sources', icon: BarChart3 }
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">
                      <BusinessCounter value={stat.metric} duration={2000 + index * 300} />
                    </div>
                    <div className="text-blue-100 font-medium">{stat.label}</div>
                  </div>
                )
              })}
            </div>
            
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button className="bg-white text-blue-700 font-semibold px-8 py-4 hover:bg-blue-50 shadow-lg group transform hover:scale-105 hover:shadow-2xl">
                  <Phone className="h-5 w-5 mr-2" />
                  Call: 020 7935 4499
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" className="bg-transparent text-white font-semibold px-8 py-4 border-2 border-white hover:bg-white hover:text-blue-700 transform hover:scale-105">
                  <Mail className="h-5 w-5 mr-2" />
                  commercial@colliers.com
                </Button>
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-blue-100">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-2" />
                  <span>4.9/5 Client Satisfaction</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-green-400 mr-2" />
                  <span>FCA Regulated</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-yellow-400 mr-2" />
                  <span>RICS Professional Standards</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

// Export with performance optimizations
export default function CommercialRealEstatePage() {
  return (
    <CommercialErrorBoundary>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <LoadingSpinner size="lg" text="Loading commercial real estate intelligence..." />
        </div>
      }>
        <CommercialRealEstatePageInner />
      </Suspense>
    </CommercialErrorBoundary>
  )
}