'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, CheckCircle, Star, Play, TrendingUp, Users, Award, Target, Clock, PoundSterling, ChevronLeft, ChevronRight, HardHat, Building, Wrench, FileCheck, Shield, X } from 'lucide-react'
import { useState, useEffect, memo, useMemo, useCallback } from 'react'
// import { usePerformanceMonitoring } from '@/lib/performance'

// Memoized Components for Performance
const TestimonialsSection = memo(({ 
  testimonials, 
  currentIndex, 
  onSelect 
}: { 
  testimonials: any[], 
  currentIndex: number, 
  onSelect: (index: number) => void 
}) => (
  <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
          Success Stories
        </h2>
        <p className="text-base sm:text-lg text-gray-600">
          Real UK builders, real results
        </p>
      </div>
      <div className="relative">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8 md:p-12 transform transition-all duration-500">
          <div className="text-center sm:text-left">
            {/* Mobile-first layout */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <div className="sm:w-1/3 text-center">
                <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-2xl sm:text-3xl mb-3 sm:mb-4 mx-auto">
                  {testimonials[currentIndex].image}
                </div>
                <div className="text-base sm:text-lg font-semibold text-gray-900">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-sm text-gray-600 mb-2 sm:mb-3">
                  {testimonials[currentIndex].role}
                </div>
                <div className="flex justify-center mb-2">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Saved {testimonials[currentIndex].savings}
                </div>
              </div>
              
              <div className="sm:w-2/3 mt-4 sm:mt-0">
                <div className="text-2xl sm:text-4xl text-blue-200 mb-2 sm:mb-4 text-center sm:text-left">"</div>
                <p className="text-base sm:text-xl text-gray-700 leading-relaxed mb-4 sm:mb-6 italic">
                  {testimonials[currentIndex].content}
                </p>
                <div className="flex items-center text-sm text-gray-500 justify-center sm:justify-start">
                  <span>Project: {testimonials[currentIndex].project}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Simplified Carousel Indicators */}
        <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-blue-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
))

const AnimatedCounter = memo(({ value, duration = 2000, animatedStats }: { value: string, duration?: number, animatedStats: boolean }) => {
  const [displayValue, setDisplayValue] = useState('0')
  
  const parsedValues = useMemo(() => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
    const prefix = value.replace(/[0-9]/g, '')
    const suffix = value.slice(numericValue.toString().length)
    return { numericValue, prefix, suffix }
  }, [value])
  
  useEffect(() => {
    if (!animatedStats) return
    
    const { numericValue, prefix, suffix } = parsedValues
    let start = 0
    const increment = numericValue / (duration / 50)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= numericValue) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(prefix + Math.floor(start).toLocaleString() + suffix)
      }
    }, 50)
    
    return () => clearInterval(timer)
  }, [value, duration, animatedStats, parsedValues])
  
  return <span className="font-bold">{displayValue}</span>
})

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [animatedStats, setAnimatedStats] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  // const { onMount, measureOperation } = usePerformanceMonitoring('HomePage')

  // Memoized features data to prevent re-creation
  const features = useMemo(() => [
    {
      icon: '🏗️',
      title: 'Smart Floor Plans',
      description: 'Generate professional layouts in seconds'
    },
    {
      icon: '🛒',
      title: 'Smart Shopping',
      description: 'Compare prices from top UK suppliers'
    },
    {
      icon: '👷',
      title: 'Verified Trades',
      description: 'Connect with rated professionals'
    },
    {
      icon: '📋',
      title: 'Project Management',
      description: 'Track progress from start to finish'
    }
  ], [])

  // Memoized testimonials data
  const extendedTestimonials = useMemo(() => [
    {
      name: 'Sarah Chen',
      role: 'Self-Builder, Manchester',
      content: 'BuildMate AI streamlined our extension project beautifully. The smart layouts saved us £5k in coordination fees and 6 weeks of back-and-forth!',
      rating: 5,
      savings: '£5,000',
      project: 'Victorian Extension',
      image: '👩‍💼'
    },
    {
      name: 'James Mitchell',
      role: 'Property Developer, Birmingham',
      content: 'The smart floor plans are excellent for initial concepts. What used to take weeks now takes days. My team efficiency increased by 40%.',
      rating: 5,
      savings: '£8,500',
      project: 'Commercial Development',
      image: '👨‍💼'
    },
    {
      name: 'Jennifer Mills',
      role: 'First-Time Builder, Leeds',
      content: 'As a first-time builder, I was terrified. BuildMate AI"s professional network held my hand through everything.',
      rating: 5,
      savings: '£8,500',
      project: 'New Build Home',
      image: '👩‍🏭'
    },
    {
      name: 'Marcus Thompson',
      role: 'Renovation Specialist, Liverpool',
      content: 'The material coordination saved us significant time and reduced waste. Great platform for project management.',
      rating: 5,
      savings: '£6,200',
      project: 'Heritage Restoration',
      image: '👨‍🔧'
    }
  ], [])

  // Memoized success metrics data
  const successMetrics = useMemo(() => [
    { label: 'Houses Configured Today', value: '247', icon: Target, color: 'blue' },
    { label: 'Average Coordination Savings', value: '£6,850', icon: PoundSterling, color: 'green' },
    { label: 'Time to Configure', value: '3 min', icon: Clock, color: 'purple' },
    { label: 'On-Time Completion', value: '94%', icon: Award, color: 'emerald' },
    { label: 'Customer Satisfaction', value: '4.8/5', icon: Star, color: 'yellow' },
    { label: 'Total Platform Savings', value: '£850K+', icon: TrendingUp, color: 'indigo' }
  ], [])

  // Memoized featured case study data
  const featuredCaseStudy = useMemo(() => ({
    title: 'Birmingham Victorian Extension: Professional Coordination Success',
    client: 'The Johnson Family',
    project: 'Double-story rear extension',
    originalBudget: '£85k',
    finalCost: '£79k',
    savings: '£6k',
    timeline: '18 weeks (on schedule)',
    quote: 'BuildMate AI"s coordination platform kept our project organized and on track throughout.',
    beforeImage: '🏠',
    afterImage: '🏡'
  }), [])

  // Memoized callbacks to prevent re-renders
  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % extendedTestimonials.length)
  }, [extendedTestimonials.length])

  const selectTestimonial = useCallback((index: number) => {
    setCurrentTestimonial(index)
  }, [])

  const handleShowDemo = useCallback(() => {
    setShowVideoModal(true)
  }, [])

  const handleCloseDemo = useCallback(() => {
    setShowVideoModal(false)
  }, [])

  useEffect(() => {
    // onMount() // Performance monitoring - DISABLED
    const timer = setInterval(nextTestimonial, 5000)
    return () => clearInterval(timer)
  }, [nextTestimonial])

  useEffect(() => {
    const timer = setTimeout(() => {
      // measureOperation('animateStats', () => setAnimatedStats(true)) // DISABLED
      setAnimatedStats(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%239C92AC%22%20fill-opacity=%220.02%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-12">
          <div className="max-w-6xl mx-auto px-4">
            {/* Announcement Bar */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                <Sparkles className="h-4 w-4 mr-2" />
                10,000+ UK builders trust BuildMate
              </div>
            </div>

            {/* Commercial/Residential Toggle */}
            <div className="flex justify-center mb-6">
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-1 shadow-md">
                <div className="flex items-center space-x-2">
                  <Link 
                    href="/"
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium transition-all duration-200 shadow-sm"
                  >
                    <span className="text-lg">🏠</span>
                    <div>Build Home</div>
                  </Link>
                  <Link 
                    href="/commercial"
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200"
                  >
                    <span className="text-lg">🏢</span>
                    <div>Optimize Property</div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight px-2">
                Build Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block">
                  Dream Home
                </span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 max-w-xl mx-auto px-4 leading-relaxed">
                UK's complete building platform. Design, price, and connect with professionals in minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6 px-4">
                <Link 
                  href="/configure" 
                  className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[52px] text-base sm:text-lg"
                >
                  <HardHat className="mr-2 h-5 w-5" />
                  Start Building Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <button 
                  onClick={handleShowDemo}
                  className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 font-medium px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 min-h-[52px]"
                >
                  <Play className="mr-2 h-4 w-4" />
                  See How It Works
                </button>
              </div>
              
              {/* Trust Indicators - Simplified for Mobile */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-sm text-gray-600 px-4">
                <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                  <span className="font-medium">Free to start</span>
                </div>
                <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-1" />
                  <span className="font-medium">UK compliant</span>
                </div>
                <div className="flex items-center bg-orange-50 px-3 py-1 rounded-full">
                  <CheckCircle className="h-4 w-4 text-orange-600 mr-1" />
                  <span className="font-medium">Verified trades</span>
                </div>
              </div>
            </div>

            {/* Simplified Hero Visual - Mobile-First */}
            <div className="relative max-w-3xl mx-auto px-4 mt-4">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl border border-gray-200 p-3 sm:p-6">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg sm:rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer" onClick={handleShowDemo}>
                  <div className="text-center relative z-10 px-3 sm:px-4">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md group-hover:shadow-lg transition-shadow">
                      <Play className="h-5 sm:h-6 w-5 sm:w-6 text-blue-600 ml-0.5" />
                    </div>
                    <p className="text-gray-800 font-semibold text-sm sm:text-base mb-1">See BuildMate in Action</p>
                    <p className="text-gray-600 text-xs sm:text-sm">3 min demo • Real UK builds</p>
                    <div className="hidden sm:flex items-center justify-center space-x-4 text-xs text-gray-600 mt-3">
                      <span className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        RIBA Certified
                      </span>
                      <span className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                        Building Regs
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Metrics - Simplified Mobile-First */}
        <section className="py-8 sm:py-12 bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Trusted by UK builders</h2>
              <p className="text-sm sm:text-base text-gray-600">Real results from construction projects</p>
            </div>
            
            {/* Show top 3 metrics on mobile, all on desktop */}
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
              {successMetrics.slice(0, 3).map((metric, index) => {
                const Icon = metric.icon
                const colorClasses = {
                  blue: { bg: 'bg-blue-600', text: 'text-blue-600' },
                  green: { bg: 'bg-green-600', text: 'text-green-600' },
                  purple: { bg: 'bg-purple-600', text: 'text-purple-600' },
                  emerald: { bg: 'bg-emerald-600', text: 'text-emerald-600' },
                  yellow: { bg: 'bg-yellow-600', text: 'text-yellow-600' },
                  indigo: { bg: 'bg-indigo-600', text: 'text-indigo-600' }
                }[metric.color] || { bg: 'bg-gray-600', text: 'text-gray-600' }

                return (
                  <div 
                    key={index} 
                    className={`text-center p-3 sm:p-4 rounded-xl ${colorClasses.bg} shadow-md hover:shadow-lg transition-all duration-300`}
                    style={{animationDelay: `${index * 100}ms`}}
                  >
                    <div className="flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-white/20 mx-auto mb-2">
                      <Icon className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-white mb-1">
                      <AnimatedCounter value={metric.value} duration={2000 + index * 200} animatedStats={animatedStats} />
                    </div>
                    <div className="text-xs text-white/90 font-medium leading-tight">{metric.label}</div>
                  </div>
                )
              })}
            </div>

            {/* Show remaining metrics on larger screens */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-4 lg:gap-6 mt-4">
              {successMetrics.slice(3).map((metric, index) => {
                const Icon = metric.icon
                const realIndex = index + 3
                const colorClasses = {
                  blue: { bg: 'bg-blue-600', text: 'text-blue-600' },
                  green: { bg: 'bg-green-600', text: 'text-green-600' },
                  purple: { bg: 'bg-purple-600', text: 'text-purple-600' },
                  emerald: { bg: 'bg-emerald-600', text: 'text-emerald-600' },
                  yellow: { bg: 'bg-yellow-600', text: 'text-yellow-600' },
                  indigo: { bg: 'bg-indigo-600', text: 'text-indigo-600' }
                }[metric.color] || { bg: 'bg-gray-600', text: 'text-gray-600' }

                return (
                  <div 
                    key={realIndex} 
                    className={`text-center p-4 rounded-xl ${colorClasses.bg} shadow-md hover:shadow-lg transition-all duration-300`}
                    style={{animationDelay: `${realIndex * 100}ms`}}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 mx-auto mb-2">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-xl font-bold text-white mb-1">
                      <AnimatedCounter value={metric.value} duration={2000 + realIndex * 200} animatedStats={animatedStats} />
                    </div>
                    <div className="text-xs text-white/90 font-medium leading-tight">{metric.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials Carousel - Memoized Component */}
        <TestimonialsSection 
          testimonials={extendedTestimonials} 
          currentIndex={currentTestimonial} 
          onSelect={selectTestimonial} 
        />

        {/* Featured Case Study */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Success Story
              </h2>
              <p className="text-xl text-gray-600">
                From concept to completion: a real BuildMate AI transformation
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredCaseStudy.title}</h3>
                  <p className="text-gray-600 mb-4">{featuredCaseStudy.client} • {featuredCaseStudy.project}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-gray-900">{featuredCaseStudy.originalBudget}</div>
                      <div className="text-sm text-gray-600">Original Budget</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-green-600">{featuredCaseStudy.finalCost}</div>
                      <div className="text-sm text-gray-600">Final Cost</div>
                    </div>
                  </div>
                  
                  <div className="bg-green-100 border border-green-200 rounded-xl p-4 mb-6">
                    <div className="text-green-800 font-semibold text-lg">Saved {featuredCaseStudy.savings}</div>
                    <div className="text-green-600 text-sm">Completed {featuredCaseStudy.timeline}</div>
                  </div>
                  
                  <blockquote className="text-lg italic text-gray-700 border-l-4 border-blue-500 pl-4">
                    "{featuredCaseStudy.quote}"
                  </blockquote>
                </div>
                
                <div className="text-center">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-6xl mb-3">{featuredCaseStudy.beforeImage}</div>
                      <div className="text-sm font-medium text-gray-600">Before</div>
                    </div>
                    <div className="text-center">
                      <div className="text-6xl mb-3">{featuredCaseStudy.afterImage}</div>
                      <div className="text-sm font-medium text-gray-600">After</div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Link 
                      href="/case-studies" 
                      className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium group"
                    >
                      View Full Case Study
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Simplified Features Section - Mobile-First */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Everything You Need to Build
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-3 sm:mb-4">
                Complete UK construction platform
              </p>
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-semibold">
                <Award className="h-4 w-4" />
                <span>Trusted by 10,000+ builders</span>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  icon: <Building className="h-8 w-8" />,
                  title: 'Smart Floor Plans',
                  description: 'Generate professional layouts in seconds with RIBA-compliant designs',
                  color: 'blue'
                },
                {
                  icon: <Wrench className="h-8 w-8" />,
                  title: 'Smart Shopping',
                  description: 'Compare prices from Travis Perkins, Wickes, B&Q and more',
                  color: 'orange'
                },
                {
                  icon: <HardHat className="h-8 w-8" />,
                  title: 'Verified Trades',
                  description: 'Connect with CSCS-certified, insured professionals',
                  color: 'green'
                },
                {
                  icon: <FileCheck className="h-8 w-8" />,
                  title: 'Project Management',
                  description: 'Track progress with building regs compliance',
                  color: 'purple'
                }
              ].map((feature, index) => {
                const colorMap = {
                  blue: { bg: 'from-blue-50 to-blue-100', icon: 'text-blue-700', border: 'border-blue-200' },
                  orange: { bg: 'from-orange-50 to-orange-100', icon: 'text-orange-700', border: 'border-orange-200' },
                  green: { bg: 'from-green-50 to-green-100', icon: 'text-green-700', border: 'border-green-200' },
                  purple: { bg: 'from-purple-50 to-purple-100', icon: 'text-purple-700', border: 'border-purple-200' }
                } as const
                
                const colorClasses = colorMap[feature.color as keyof typeof colorMap] || { bg: 'from-gray-50 to-gray-100', icon: 'text-gray-700', border: 'border-gray-200' }
                
                return (
                  <div 
                    key={index} 
                    className={`text-center p-6 sm:p-8 bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border-2 ${colorClasses.border}`}
                    style={{animationDelay: `${index * 150}ms`}}
                  >
                    <div className={`w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br ${colorClasses.bg} rounded-xl sm:rounded-2xl flex items-center justify-center ${colorClasses.icon} mb-4 sm:mb-6 mx-auto shadow-md transition-all duration-200 hover:scale-105`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>
            
            {/* Professional Certifications */}
            <div className="mt-16 text-center">
              <p className="text-gray-600 font-semibold mb-6">Certified by leading UK construction bodies:</p>
              <div className="flex flex-wrap justify-center items-center gap-6">
                {['RIBA', 'CITB', 'NHBC', 'FMB', 'RICS'].map((cert, index) => (
                  <div key={index} className="certification-badge animate-trust-indicator" style={{animationDelay: `${index * 0.1}s`}}>
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Simplified 3-Step Process - Mobile-First */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                How It Works
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-2 sm:mb-4">
                <span className="font-semibold">Configure → Review → Build</span>
              </p>
              <p className="text-sm sm:text-base text-blue-600 font-medium">
                3 minutes to start, professional results
              </p>
            </div>

            <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-8">
              {[
                {
                  step: '1',
                  title: 'Configure',
                  subtitle: 'Smart Design',
                  description: 'Design your perfect home with our intuitive configurator. Choose everything from layout to finishes with real-time 3D preview.',
                  icon: '🏠',
                  details: 'Interactive house model snippet',
                  color: 'blue',
                  time: '3 minutes'
                },
                {
                  step: '2', 
                  title: 'Review',
                  subtitle: 'Smart Assembly',
                  description: 'Our system assembles everything: team, materials, timeline, price. Get your complete project breakdown instantly.',
                  icon: '🤖',
                  details: 'Mock project dashboard',
                  color: 'purple',
                  time: '30 seconds'
                },
                {
                  step: '3',
                  title: 'Build',
                  subtitle: 'Professional Coordination',
                  description: 'Connect with verified professionals and begin your project. Track progress with real-time updates.',
                  icon: '🚀',
                  details: 'Timeline visualization',
                  color: 'green',
                  time: '24-36 months'
                }
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                    <div className="text-center">
                      <div className={`w-12 sm:w-16 h-12 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-xl sm:text-2xl mb-4 sm:mb-6 mx-auto ${
                        item.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                        item.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {item.step}
                      </div>
                      
                      <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">
                        {item.icon}
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{item.title}</h3>
                      <p className={`font-semibold mb-3 sm:mb-4 text-sm sm:text-base ${
                        item.color === 'blue' ? 'text-blue-600' :
                        item.color === 'purple' ? 'text-purple-600' :
                        'text-green-600'
                      }`}>{item.subtitle}</p>
                      <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">{item.description}</p>
                      
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                        item.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                        item.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        ⏱️ {item.time}
                      </div>
                    </div>
                  </div>
                  
                  {/* Connect arrow - show only on larger screens */}
                  {index < 2 && (
                    <div className="hidden sm:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Instant Value Demo */}
            <div className="mt-20 bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-6">
                <h3 className="text-2xl font-bold mb-2">See What You Get Instantly</h3>
                <p className="text-blue-100">In 30 seconds, you will have everything needed to build</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">What You Tell Us</h4>
                  <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300">
                    <div className="text-gray-600 space-y-2">
                      <div>🏠 3-bed modern house</div>
                      <div>💰 £200k budget</div>
                      <div>📍 Birmingham location</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">What You Get Back</h4>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                    <div className="text-green-800 space-y-2 text-sm">
                      <div>✅ Initial 3D house concept</div>
                      <div>✅ Estimated materials list</div>
                      <div>✅ Professional contacts available</div>
                      <div>✅ 24-36 month realistic timeline</div>
                      <div>✅ £195,000 estimated cost range</div>
                      <div className="font-bold text-green-700">🎉 £5,000 coordination savings!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Success Testimonials Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                More Success Stories
              </h2>
              <p className="text-xl text-gray-600">
                Join thousands who have built smarter with BuildMate AI
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'Mike Stevens',
                  role: 'Professional Builder, Elite Construction',
                  content: 'BuildMate AI connects me with serious, prepared clients. My project completion rate increased 40%.',
                  rating: 5,
                  type: 'Professional',
                  image: '👷‍♂️'
                },
                {
                  name: 'Rachel Cooper',
                  role: 'Electrician, RC Electrical Services',
                  content: 'The platform"s project management tools help me deliver on time, every time. Game changer.',
                  rating: 5,
                  type: 'Professional',
                  image: '⚡'
                },
                {
                  name: 'The Anderson Family',
                  role: 'Homeowners, Glasgow',
                  content: 'From planning permission to final inspection, BuildMate AI guided every step. Could not be happier.',
                  rating: 5,
                  type: 'Client',
                  image: '🏠'
                }
              ].map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{animationDelay: `${index * 150}ms`}}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-xl mr-4">
                      {testimonial.image}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                      testimonial.type === 'Professional' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {testimonial.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                href="/reviews" 
                className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium group"
              >
                View All Reviews
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Simplified CTA Section - Mobile-First */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Ready to Start Building?
            </h2>
            <p className="text-blue-100 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              Join <AnimatedCounter value="247" animatedStats={animatedStats} /> builders who started today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 max-w-lg mx-auto">
              <Link 
                href="/configure" 
                className="inline-flex items-center justify-center bg-white text-blue-600 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg text-base sm:text-lg min-h-[52px]"
              >
                Start Building Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                href="/materials" 
                className="inline-flex items-center justify-center bg-transparent text-white font-medium px-6 py-3 rounded-xl border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-300 text-base min-h-[52px]"
              >
                See Examples
              </Link>
            </div>
            
            {/* Trust indicators - Mobile-friendly */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-sm text-blue-100">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                <span>4.8★ Rating</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                <span>£850K+ Saved</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                <span>94% On-Time</span>
              </div>
            </div>
            
            {/* Legal Disclaimer */}
            <div className="mt-6 text-center">
              <p className="text-xs text-blue-200 max-w-4xl mx-auto leading-relaxed">
                *Cost estimates are indicative and subject to regional variations, market conditions, and project specifics. 
                Planning permission and building regulations approval times vary by local authority. All building work must comply with current UK Building Regulations. 
                Professional availability depends on local demand and seasonal factors.
              </p>
            </div>
          </div>
        </section>


        {/* Video Demo Modal */}
        {showVideoModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={handleCloseDemo}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">How BuildMate AI Works</h3>
                  <p className="text-gray-600 mt-1">3 minute demo • Real UK construction projects</p>
                </div>
                <button 
                  onClick={handleCloseDemo}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close video modal"
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Play className="h-8 w-8 text-blue-600 ml-1" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Demo Video Coming Soon</h4>
                    <p className="text-gray-600 mb-6">We're preparing a comprehensive 3-minute demo showing real UK construction projects built with BuildMate.</p>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-white/50 rounded-lg p-4">
                        <div className="text-blue-600 font-semibold mb-1">Step 1: Configure</div>
                        <div className="text-gray-700">Smart design tools</div>
                      </div>
                      <div className="bg-white/50 rounded-lg p-4">
                        <div className="text-purple-600 font-semibold mb-1">Step 2: Review</div>
                        <div className="text-gray-700">Smart project assembly</div>
                      </div>
                      <div className="bg-white/50 rounded-lg p-4">
                        <div className="text-green-600 font-semibold mb-1">Step 3: Build</div>
                        <div className="text-gray-700">Professional coordination</div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Link
                        href="/configure"
                        onClick={handleCloseDemo}
                        className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
                      >
                        Try BuildMate Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}