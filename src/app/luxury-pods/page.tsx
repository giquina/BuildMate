'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, Shield, Award, CheckCircle, Zap, Globe, Lightbulb, Wifi, Home, Building, Car, Star, Phone, Mail, Calendar, ChevronDown, ChevronUp, Play, X } from 'lucide-react'
import { useState, useEffect, memo, useMemo, useCallback } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui'

// Animated Counter for luxury metrics
const LuxuryCounter = memo(({ value, suffix, duration = 2000 }: { value: string, suffix?: string, duration?: number }) => {
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
  
  return <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">{displayValue}</span>
})

LuxuryCounter.displayName = 'LuxuryCounter'

// Premium Pod Models
interface PodModel {
  name: string
  icon: string
  basePrice: string
  size: string
  capacity: string
  features: string[]
  description: string
  image: string
  gradient: string
  textGradient: string
}

const POD_MODELS: PodModel[] = [
  {
    name: 'Tourist Elite',
    icon: '🏨',
    basePrice: '£85,000',
    size: '25m²',
    capacity: '2 guests',
    features: ['Space-age design', 'Premium finishes', 'Smart systems', 'Luxury amenities'],
    description: 'Ultra-premium tourist accommodation with futuristic space pod design',
    image: '🚀',
    gradient: 'from-blue-600 via-indigo-600 to-purple-700',
    textGradient: 'from-blue-400 to-indigo-500'
  },
  {
    name: 'Residential Luxury',
    icon: '🏠',
    basePrice: '£125,000',
    size: '40m²',
    capacity: '1-2 residents',
    features: ['Full living space', 'Premium kitchen', 'Smart automation', 'Sustainable tech'],
    description: 'Luxury living redefined with space pod aesthetics and premium technology',
    image: '🌟',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-700',
    textGradient: 'from-emerald-400 to-teal-500'
  },
  {
    name: 'Commercial Premium',
    icon: '🏢',
    basePrice: '£195,000',
    size: '60m²',
    capacity: '4-6 people',
    features: ['Commercial grade', 'Meeting spaces', 'Premium facilities', 'Enterprise systems'],
    description: 'Premium commercial space pod for exclusive business operations',
    image: '💎',
    gradient: 'from-purple-600 via-violet-600 to-fuchsia-700',
    textGradient: 'from-purple-400 to-violet-500'
  }
]

// Luxury Features
const LUXURY_FEATURES = [
  {
    category: 'Space-Age Design',
    icon: '🚀',
    features: [
      { name: 'Aerodynamic pod structure', description: 'Sleek, futuristic exterior design' },
      { name: 'Premium glass panels', description: 'Floor-to-ceiling smart glass with privacy modes' },
      { name: 'LED accent lighting', description: 'Customizable ambient lighting systems' },
      { name: 'Premium materials', description: 'Carbon fiber, titanium, and luxury composites' }
    ],
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    category: 'Smart Technology',
    icon: '🤖',
    features: [
      { name: 'AI home automation', description: 'Voice-controlled smart environment systems' },
      { name: 'Climate perfection', description: 'Advanced HVAC with air purification' },
      { name: 'Integrated entertainment', description: 'Premium audio-visual systems built-in' },
      { name: 'Security systems', description: 'Biometric access and monitoring' }
    ],
    gradient: 'from-purple-500 to-violet-600'
  },
  {
    category: 'Sustainable Luxury',
    icon: '🌱',
    features: [
      { name: 'Solar power systems', description: 'Integrated renewable energy generation' },
      { name: 'Water recycling', description: 'Advanced greywater and rainwater systems' },
      { name: 'Energy efficiency', description: 'Net-zero energy consumption capability' },
      { name: 'Eco-premium materials', description: 'Sustainable luxury material selection' }
    ],
    gradient: 'from-emerald-500 to-teal-600'
  }
] as const

// Premium Package Tiers
const PRICING_TIERS = [
  {
    name: 'Essential Pod',
    price: '£80,000',
    description: 'Premium entry-level luxury capsule',
    features: [
      'Base space pod structure',
      'Premium finishes',
      'Basic smart systems',
      'Solar power ready',
      '1-year warranty'
    ],
    gradient: 'from-slate-600 to-gray-700',
    popular: false
  },
  {
    name: 'Elite Pod',
    price: '£125,000',
    description: 'Full luxury experience with premium technology',
    features: [
      'All Essential features',
      'Advanced smart automation',
      'Premium entertainment systems',
      'Water recycling systems',
      'Premium interior design',
      '3-year premium warranty'
    ],
    gradient: 'from-blue-600 to-indigo-700',
    popular: true
  },
  {
    name: 'Platinum Pod',
    price: '£200,000',
    description: 'Ultimate luxury with bespoke customization',
    features: [
      'All Elite features',
      'Custom design consultation',
      'Premium material upgrades',
      'Advanced security systems',
      'Concierge installation',
      '5-year platinum warranty',
      'Maintenance package included'
    ],
    gradient: 'from-purple-600 to-violet-700',
    popular: false
  }
] as const

// Location Suitability
const LOCATION_TYPES = [
  {
    type: 'Luxury Tourism',
    icon: '🏝️',
    description: 'Exclusive resorts, glamping sites, boutique destinations',
    benefits: ['Premium guest experience', 'Unique accommodation offering', 'High revenue potential'],
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    type: 'Private Estates',
    icon: '🏰',
    description: 'Luxury homes, private gardens, exclusive properties',
    benefits: ['Guest accommodation', 'Property value enhancement', 'Architectural statement'],
    gradient: 'from-emerald-500 to-green-600'
  },
  {
    type: 'Commercial Spaces',
    icon: '🏢',
    description: 'Corporate retreats, co-working spaces, event venues',
    benefits: ['Premium meeting spaces', 'Brand differentiation', 'Flexible usage'],
    gradient: 'from-purple-500 to-indigo-600'
  },
  {
    type: 'Investment Properties',
    icon: '💰',
    description: 'Rental properties, Airbnb, vacation rentals',
    benefits: ['High rental yields', 'Low maintenance', 'Unique market position'],
    gradient: 'from-gold-500 to-yellow-600'
  }
] as const

export default function LuxuryPodsPage() {
  const [animatedStats, setAnimatedStats] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [selectedPod, setSelectedPod] = useState(POD_MODELS[0])
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null)
  const [showPricingComparison, setShowPricingComparison] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedStats(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleConsultationClick = useCallback(() => {
    // In a real app, this would open a booking modal or redirect to scheduling
    alert('VIP Consultation booking system would open here. Contact: luxury@volferda.com')
  }, [])

  const handleVideoModal = useCallback(() => {
    setShowVideoModal(true)
  }, [])

  const handleCloseVideoModal = useCallback(() => {
    setShowVideoModal(false)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Futuristic Space Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
          {/* Animated stars */}
          <div className="absolute inset-0">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>
          {/* Gradient orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-500/20 via-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-gold-500/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        </div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Premium Brand Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-gradient-to-r from-gold-100/20 to-yellow-100/20 backdrop-blur-sm border border-gold-300/30 text-gold-200 px-8 py-4 rounded-2xl text-sm font-bold shadow-2xl mb-8">
                <Sparkles className="h-5 w-5 mr-3 text-gold-400" />
                <span className="flex items-center space-x-6">
                  <span className="text-gold-300">Volferda Capsule Houses</span>
                  <span className="text-white/50">|</span>
                  <span className="text-blue-300">Future of Luxury Living</span>
                  <span className="text-white/50">|</span>
                  <span className="text-purple-300">Space-Age Design</span>
                </span>
              </div>
            </div>

            {/* Main Hero */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                <span className="block mb-4 text-white">Luxury</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-yellow-400 to-gold-600 animate-pulse">
                  Space Pod
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-violet-500 mt-4">
                  Accommodation
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed font-light">
                <span className="text-gold-400 font-semibold">The future of luxury living has arrived.</span> 
                Experience premium space pod technology with 
                <span className="text-blue-400 font-semibold">sustainable luxury</span>, 
                <span className="text-purple-400 font-semibold">smart automation</span>, and 
                <span className="text-emerald-400 font-semibold">space-age design</span>
              </p>
              
              {/* Premium Value Props */}
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
                <div className="bg-gradient-to-br from-gold-500/20 via-yellow-500/10 to-gold-600/20 backdrop-blur-sm border border-gold-300/30 p-6 rounded-2xl shadow-2xl hover:shadow-gold-500/20 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl mb-4 mx-auto flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gold-400 mb-2">£80K - £200K</div>
                  <div className="text-gold-300 font-semibold mb-2">Luxury Investment Range</div>
                  <div className="text-sm text-gold-200/80">Premium space pod technology</div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-blue-600/20 backdrop-blur-sm border border-blue-300/30 p-6 rounded-2xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl mb-4 mx-auto flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-blue-400 mb-2">Net Zero</div>
                  <div className="text-blue-300 font-semibold mb-2">Energy Consumption</div>
                  <div className="text-sm text-blue-200/80">Sustainable luxury technology</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500/20 via-violet-500/10 to-purple-600/20 backdrop-blur-sm border border-purple-300/30 p-6 rounded-2xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl mb-4 mx-auto flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-purple-400 mb-2">25 Year</div>
                  <div className="text-purple-300 font-semibold mb-2">Warranty Available</div>
                  <div className="text-sm text-purple-200/80">Premium build quality assurance</div>
                </div>
              </div>

              {/* Premium CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={handleConsultationClick}
                  className="relative inline-flex items-center justify-center bg-gradient-to-r from-gold-500 via-gold-600 to-yellow-600 hover:from-gold-600 hover:via-gold-700 hover:to-yellow-700 text-black font-bold px-12 py-6 rounded-2xl transition-all duration-300 shadow-2xl group transform hover:scale-105 hover:shadow-gold-500/30 text-xl border border-gold-400"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Calendar className="mr-3 h-7 w-7 group-hover:rotate-12 transition-transform relative z-10" />
                  <span className="relative z-10">Book VIP Consultation</span>
                  <ArrowRight className="ml-3 h-7 w-7 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">EXCLUSIVE</div>
                </button>
                
                <button 
                  onClick={handleVideoModal}
                  className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold px-12 py-6 rounded-2xl border-2 border-white/30 hover:border-white/50 transition-all duration-300 shadow-2xl group transform hover:scale-105 hover:shadow-white/20 text-xl"
                >
                  <Play className="mr-3 h-7 w-7 group-hover:scale-110 transition-transform" />
                  Experience Virtual Tour
                </button>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 hover:shadow-white/10 transition-all duration-500">
                <div className="aspect-video bg-gradient-to-br from-slate-800 via-blue-900 to-purple-900 rounded-2xl flex items-center justify-center relative overflow-hidden group cursor-pointer" onClick={handleVideoModal}>
                  <div className="text-center relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-gold-500/30 transition-shadow border border-gold-300">
                      <Play className="h-8 w-8 text-black ml-1" />
                    </div>
                    <p className="text-white font-bold text-xl mb-2">Volferda Space Pod Experience</p>
                    <p className="text-gray-300 text-sm">Luxury • Technology • Sustainability</p>
                  </div>
                  
                  {/* Floating space elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl opacity-20 animate-pulse">🚀</div>
                  </div>
                  <div className="absolute top-4 right-4 text-4xl opacity-30 animate-bounce" style={{animationDelay: '1s'}}>⭐</div>
                  <div className="absolute bottom-4 left-4 text-3xl opacity-25 animate-pulse" style={{animationDelay: '2s'}}>✨</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pod Models Showcase */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-purple-100/20 to-blue-100/20 backdrop-blur-sm border border-purple-300/30 text-purple-200 px-6 py-3 rounded-full text-sm font-bold mb-8">
                <Home className="h-4 w-4 mr-2" />
                Premium Pod Collection
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                <span className="block mb-2">Choose Your</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Space Pod Model
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Each Volferda pod is engineered for <span className="text-gold-400 font-semibold">luxury</span>, designed for the <span className="text-blue-400 font-semibold">future</span>
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {POD_MODELS.map((pod, index) => (
                <Card key={index} className={`bg-gradient-to-br ${pod.gradient} backdrop-blur-xl border-white/20 hover:border-white/40 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 cursor-pointer`} 
                      onClick={() => setSelectedPod(pod)}>
                  <CardHeader className="text-center">
                    <div className="text-6xl mb-4">{pod.image}</div>
                    <CardTitle className="text-2xl text-white mb-2">{pod.name}</CardTitle>
                    <div className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${pod.textGradient} mb-2`}>{pod.basePrice}</div>
                    <CardDescription className="text-white/80">{pod.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">{pod.size}</div>
                        <div className="text-sm text-white/70">Living Space</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">{pod.capacity}</div>
                        <div className="text-sm text-white/70">Capacity</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {pod.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-white/90 text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Luxury Features */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-900/50 to-blue-900/30 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-yellow-400">
                  Luxury Features
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Every detail engineered for the ultimate luxury experience
              </p>
            </div>

            <div className="space-y-8">
              {LUXURY_FEATURES.map((category, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-300">
                  <button 
                    className="flex items-center justify-between w-full text-left"
                    onClick={() => setExpandedFeature(expandedFeature === index ? null : index)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-2xl shadow-2xl`}>
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{category.category}</h3>
                        <p className="text-gray-300">{category.features.length} premium features included</p>
                      </div>
                    </div>
                    {expandedFeature === index ? 
                      <ChevronUp className="h-6 w-6 text-white" /> : 
                      <ChevronDown className="h-6 w-6 text-white" />
                    }
                  </button>
                  
                  {expandedFeature === index && (
                    <div className="mt-8 grid md:grid-cols-2 gap-6">
                      {category.features.map((feature, idx) => (
                        <div key={idx} className="bg-white/5 rounded-xl p-6 border border-white/10">
                          <h4 className="text-lg font-bold text-white mb-2">{feature.name}</h4>
                          <p className="text-gray-300">{feature.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location Suitability */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Perfect Locations
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Volferda pods enhance any premium location with space-age luxury
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {LOCATION_TYPES.map((location, index) => (
                <div key={index} className={`bg-gradient-to-br ${location.gradient}/20 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:border-white/40 transition-all duration-300 transform hover:scale-105 shadow-2xl`}>
                  <div className="text-center">
                    <div className="text-4xl mb-4">{location.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-4">{location.type}</h3>
                    <p className="text-gray-300 mb-6 text-sm">{location.description}</p>
                    
                    <div className="space-y-2">
                      {location.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center text-white/90 text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-400 mr-2 flex-shrink-0" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Luxury Pricing */}
        <section className="py-20 px-4 bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-gold-100/20 to-yellow-100/20 backdrop-blur-sm border border-gold-300/30 text-gold-200 px-6 py-3 rounded-full text-sm font-bold mb-8">
                <Award className="h-4 w-4 mr-2" />
                Premium Investment Tiers
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-yellow-400">
                  Luxury Pricing
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Choose your level of luxury with our premium pod packages
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {PRICING_TIERS.map((tier, index) => (
                <div key={index} className={`relative bg-gradient-to-br ${tier.gradient}/20 backdrop-blur-xl border ${tier.popular ? 'border-gold-400/50' : 'border-white/20'} rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                  tier.popular ? 'ring-2 ring-gold-400/30' : ''
                }`}>
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-gold-400 to-yellow-500 text-black px-6 py-2 rounded-full text-sm font-bold">
                        MOST POPULAR
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-yellow-400 mb-4">{tier.price}</div>
                    <p className="text-gray-300 mb-8">{tier.description}</p>
                    
                    <div className="space-y-3 mb-8">
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-white/90 text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-400 mr-3 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <button 
                      onClick={handleConsultationClick}
                      className={`w-full px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                        tier.popular 
                          ? 'bg-gradient-to-r from-gold-500 to-yellow-500 text-black hover:from-gold-600 hover:to-yellow-600 shadow-gold-500/20' 
                          : 'bg-white/10 text-white hover:bg-white/20 border border-white/30'
                      }`}
                    >
                      Configure This Pod
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VIP Consultation CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-gold-600/20 via-yellow-600/20 to-gold-700/20 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-12 shadow-2xl">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Own the Future?
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Experience luxury space pod living with our exclusive VIP consultation. 
                Our design experts will create your perfect pod sanctuary.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
                <button 
                  onClick={handleConsultationClick}
                  className="inline-flex items-center bg-gradient-to-r from-gold-500 to-yellow-500 text-black font-bold px-12 py-6 rounded-2xl hover:from-gold-600 hover:to-yellow-600 transition-all duration-300 shadow-2xl group transform hover:scale-105 hover:shadow-gold-500/30 text-xl"
                >
                  <Calendar className="mr-3 h-7 w-7 group-hover:rotate-12 transition-transform" />
                  Book VIP Consultation
                  <ArrowRight className="ml-3 h-7 w-7 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <Link
                  href="tel:+44-800-VOLFERDA"
                  className="inline-flex items-center bg-transparent text-white font-bold px-12 py-6 rounded-2xl border-2 border-white/30 hover:border-white/50 hover:bg-white/10 transition-all duration-300 text-xl"
                >
                  <Phone className="mr-3 h-7 w-7" />
                  Call: 0800 VOLFERDA
                </Link>
              </div>
              
              {/* Luxury Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-white/80">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-gold-400 mr-2" />
                  <span>25-Year Warranty</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-gold-400 mr-2" />
                  <span>Luxury Certified</span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-4 w-4 text-gold-400 mr-2" />
                  <span>Net-Zero Technology</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 text-gold-400 mr-2" />
                  <span>Global Installation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Modal */}
        {showVideoModal && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={handleCloseVideoModal}>
            <div className="bg-gradient-to-br from-slate-800 to-blue-900 rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-white/20" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-8 border-b border-white/20">
                <div>
                  <h3 className="text-3xl font-bold text-white">Volferda Space Pod Experience</h3>
                  <p className="text-gray-300 mt-2">Virtual tour • Luxury features • Technology showcase</p>
                </div>
                <button 
                  onClick={handleCloseVideoModal}
                  className="p-3 hover:bg-white/10 rounded-full transition-colors border border-white/30"
                  aria-label="Close video modal"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              
              <div className="p-8">
                <div className="aspect-video bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl border border-gold-300">
                      <Play className="h-10 w-10 text-black ml-1" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">Virtual Experience Coming Soon</h4>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">We're preparing an immersive virtual tour showcasing our luxury space pods with 360° views, interactive features, and customization options.</p>
                    
                    <div className="grid md:grid-cols-3 gap-6 text-sm">
                      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                        <div className="text-gold-400 font-bold mb-2">🚀 Space Design</div>
                        <div className="text-gray-300">Futuristic architecture & luxury finishes</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                        <div className="text-blue-400 font-bold mb-2">🤖 Smart Technology</div>
                        <div className="text-gray-300">AI automation & premium systems</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                        <div className="text-emerald-400 font-bold mb-2">🌱 Sustainability</div>
                        <div className="text-gray-300">Net-zero luxury living</div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <button
                        onClick={handleConsultationClick}
                        className="inline-flex items-center bg-gradient-to-r from-gold-500 to-yellow-500 text-black px-10 py-4 rounded-xl hover:from-gold-600 hover:to-yellow-600 transition-all duration-300 font-bold shadow-2xl"
                      >
                        Book Personal Tour
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-9xl opacity-10 animate-pulse">🚀</div>
                  </div>
                  <div className="absolute top-8 right-8 text-4xl opacity-20 animate-bounce" style={{animationDelay: '1s'}}>⭐</div>
                  <div className="absolute bottom-8 left-8 text-3xl opacity-15 animate-pulse" style={{animationDelay: '2s'}}>✨</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}