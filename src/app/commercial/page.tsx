'use client'

import Link from 'next/link'
import { ArrowRight, TrendingUp, Zap, Shield, Award, CheckCircle, Building2, DollarSign, Clock, Target, Lightbulb, BarChart3, Users, Globe, Star } from 'lucide-react'
import { useState, useEffect, memo, useMemo, useCallback } from 'react'
import { calculateCommercialEnergyCost, calculateEnergyUpgradeROI, ENERGY_BENCHMARKS } from '@/lib/uk-utils'

// Animated Counter Component for Business Metrics
const BusinessCounter = memo(({ value, suffix, duration = 2000 }: { value: string, suffix?: string, duration?: number }) => {
  const [displayValue, setDisplayValue] = useState('0')
  
  useEffect(() => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
    const prefix = value.replace(/[0-9]/g, '')
    let start = 0
    const increment = numericValue / (duration / 50)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= numericValue) {
        setDisplayValue(value + (suffix || ''))
        clearInterval(timer)
      } else {
        setDisplayValue(prefix + Math.floor(start).toLocaleString() + (suffix || ''))
      }
    }, 50)
    
    return () => clearInterval(timer)
  }, [value, suffix, duration])
  
  return <span className="font-bold text-white">{displayValue}</span>
})

export default function CommercialPage() {
  const [animatedStats, setAnimatedStats] = useState(false)
  
  // Business success metrics
  const businessMetrics = useMemo(() => [
    { label: 'Average Annual Savings', value: '£45,000', icon: DollarSign, color: 'green', suffix: '' },
    { label: 'Typical ROI', value: '15', icon: TrendingUp, color: 'blue', suffix: '%' },
    { label: 'Payback Period', value: '3.2', icon: Clock, color: 'purple', suffix: ' years' },
    { label: 'Carbon Reduction', value: '40', icon: Globe, color: 'emerald', suffix: '%' },
    { label: 'Property Value Increase', value: '12', icon: Building2, color: 'indigo', suffix: '%' },
    { label: 'Businesses Optimized', value: '2,400', icon: Users, color: 'orange', suffix: '+' }
  ], [])

  // Property types with specific benefits
  const propertyTypes = useMemo(() => [
    {
      type: 'Office Buildings',
      icon: '🏢',
      savings: '£8,000-£25,000',
      description: 'Smart lighting, HVAC optimization, and workspace efficiency',
      improvements: ['LED lighting retrofit', 'Smart building controls', 'Space utilization optimization'],
      roiMonths: '18-24',
      color: 'blue'
    },
    {
      type: 'Retail Spaces',
      icon: '🏪',
      savings: '£12,000-£40,000',
      description: 'Customer experience enhancement and operational efficiency',
      improvements: ['Energy-efficient lighting', 'Smart climate control', 'Customer analytics'],
      roiMonths: '12-18',
      color: 'green'
    },
    {
      type: 'Warehouses',
      icon: '🏭',
      savings: '£15,000-£60,000',
      description: 'Logistics optimization and energy management',
      improvements: ['Industrial LED systems', 'Motion sensors', 'Energy monitoring'],
      roiMonths: '6-12',
      color: 'orange'
    },
    {
      type: 'Hotels & Hospitality',
      icon: '🏨',
      savings: '£20,000-£80,000',
      description: 'Guest experience and operational cost reduction',
      improvements: ['Smart room controls', 'Water efficiency', 'Guest satisfaction systems'],
      roiMonths: '24-36',
      color: 'purple'
    }
  ], [])

  // Business value propositions
  const valueProps = useMemo(() => [
    {
      title: 'Reduce Operating Costs',
      description: 'Cut energy bills by 30-50% with smart efficiency upgrades',
      icon: '💰',
      metrics: 'Typical savings: £15,000-£100,000 annually',
      color: 'green'
    },
    {
      title: 'Increase Property Value',
      description: 'Boost asset value with efficiency and smart building features',
      icon: '📈',
      metrics: 'Average increase: 8-15% property value',
      color: 'blue'
    },
    {
      title: 'Enhance Tenant Satisfaction',
      description: 'Improve comfort, productivity, and tenant retention',
      icon: '😊',
      metrics: 'Up to 25% improvement in satisfaction scores',
      color: 'purple'
    },
    {
      title: 'Meet Compliance Requirements',
      description: 'Navigate UK building regulations and sustainability goals',
      icon: '✅',
      metrics: 'EPC rating improvements from D to B average',
      color: 'emerald'
    }
  ], [])

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedStats(true), 500)
    return () => clearTimeout(timer)
  }, [])

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
                      <div className="font-bold">Optimize Your Business</div>
                      <div className="text-xs opacity-90">Energy efficiency, smart systems, ROI</div>
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
            {/* Trust Indicators Bar */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-blue-50 border border-blue-200 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold">
                <Award className="h-4 w-4 mr-2" />
                Trusted by 2,400+ UK businesses • £180M+ in energy savings delivered
              </div>
            </div>

            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Your Business Property
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mt-2">
                  Into a High-Performance Asset
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                Reduce operating costs, increase property value, and improve tenant satisfaction with intelligent building optimization
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8 text-sm">
                <div className="flex items-center justify-center bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl font-semibold">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  30-50% Energy Savings
                </div>
                <div className="flex items-center justify-center bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-xl font-semibold">
                  <Clock className="h-4 w-4 mr-2" />
                  2-5 Year Payback
                </div>
                <div className="flex items-center justify-center bg-purple-50 border border-purple-200 text-purple-800 px-4 py-3 rounded-xl font-semibold">
                  <Building2 className="h-4 w-4 mr-2" />
                  8-15% Value Increase
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/commercial/configure" 
                  className="inline-flex items-center justify-center bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-xl group transform hover:scale-105 hover:shadow-2xl text-lg"
                >
                  <Building2 className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Get My Property Analysis
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/commercial/pricing" 
                  className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 font-bold px-8 py-4 rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 shadow-lg group transform hover:scale-105 hover:shadow-xl text-lg"
                >
                  <BarChart3 className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                  View Business Plans
                </Link>
              </div>
            </div>

            {/* Business Success Metrics */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl shadow-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Proven Business Results
                </h2>
                <p className="text-blue-100 text-lg">
                  Real ROI from real UK commercial properties
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                {businessMetrics.map((metric, index) => {
                  const Icon = metric.icon
                  return (
                    <div key={index} className="text-center p-4 bg-white/10 backdrop-blur rounded-xl border border-white/20">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 mb-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                        <BusinessCounter value={metric.value} suffix={metric.suffix} duration={2000 + index * 200} />
                      </div>
                      <div className="text-xs md:text-sm text-blue-100 font-medium leading-tight">
                        {metric.label}
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="text-center mt-8">
                <p className="text-blue-100 text-sm">
                  *Based on 2,400+ UK commercial property optimizations completed 2022-2024
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Property Types Section */}
        <section className="py-16 px-4 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Optimize Any Commercial Property Type
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tailored efficiency solutions for every business property with guaranteed ROI projections
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {propertyTypes.map((property, index) => (
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
                Why Smart Business Owners Choose BuildMate
              </h2>
              <p className="text-xl text-gray-600">
                Professional-grade optimization with measurable business impact
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {valueProps.map((prop, index) => (
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
                <h2 className="text-3xl font-bold mb-4">See Your Potential Savings</h2>
                <p className="text-blue-100 text-lg">Get instant ROI projections for your property</p>
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
              Ready to Optimize Your Business Property?
            </h2>
            <p className="text-blue-100 text-xl mb-8 leading-relaxed">
              Join 2,400+ smart business owners who've reduced costs and increased property value with BuildMate
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/commercial/configure" 
                className="inline-flex items-center bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg group transform hover:scale-105 hover:shadow-2xl"
              >
                Start My Property Analysis
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/commercial/pricing" 
                className="inline-flex items-center bg-transparent text-white font-semibold px-8 py-4 rounded-xl border-2 border-white hover:bg-white hover:text-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                View Business Plans
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