'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, CheckCircle, Star, Play, TrendingUp, Users, Award, Target, Clock, PoundSterling, ChevronLeft, ChevronRight, HardHat, Building, Wrench, FileCheck } from 'lucide-react'
import { useState, useEffect, memo, useMemo, useCallback } from 'react'
import { usePerformanceMonitoring } from '@/lib/performance'

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
  <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Real Stories, Real Results
        </h2>
        <p className="text-xl text-gray-600">
          See how UK builders are succeeding with BuildMate AI coordination
        </p>
      </div>
      <div className="relative">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto transform transition-all duration-500">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto transform transition-transform hover:scale-110">
                {testimonials[currentIndex].image}
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {testimonials[currentIndex].name}
              </div>
              <div className="text-sm text-gray-600 mb-3">
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
            
            <div className="md:w-2/3">
              <div className="text-4xl text-blue-200 mb-4">"</div>
              <p className="text-xl text-gray-700 leading-relaxed mb-6 italic">
                {testimonials[currentIndex].content}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span>Project: {testimonials[currentIndex].project}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Carousel Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-blue-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
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
  const { onMount, measureOperation } = usePerformanceMonitoring('HomePage')

  // Memoized features data to prevent re-creation
  const features = useMemo(() => [
    {
      icon: '🏗️',
      title: 'AI Floor Plans',
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
      content: 'BuildMate AI streamlined our extension project beautifully. The AI layouts saved us £5k in coordination fees and 6 weeks of back-and-forth!',
      rating: 5,
      savings: '£5,000',
      project: 'Victorian Extension',
      image: '👩‍💼'
    },
    {
      name: 'James Mitchell',
      role: 'Property Developer, Birmingham',
      content: 'The AI floor plans are excellent for initial concepts. What used to take weeks now takes days. My team efficiency increased by 40%.',
      rating: 5,
      savings: '£8,500',
      project: 'Commercial Development',
      image: '👨‍💼'
    },
    {
      name: 'Jennifer Mills',
      role: 'First-Time Builder, Leeds',
      content: 'As a first-time builder, I was terrified. BuildMate"s professional network held my hand through everything.',
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
    quote: 'BuildMate"s coordination platform kept our project organized and on track throughout.',
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

  useEffect(() => {
    onMount() // Performance monitoring
    const timer = setInterval(nextTestimonial, 5000)
    return () => clearInterval(timer)
  }, [nextTestimonial, onMount])

  useEffect(() => {
    const timer = setTimeout(() => {
      measureOperation('animateStats', () => setAnimatedStats(true))
    }, 500)
    return () => clearTimeout(timer)
  }, [measureOperation])

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
        <section className="pt-8 pb-16">
          <div className="max-w-6xl mx-auto px-4">
            {/* Announcement Bar */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                <Sparkles className="h-4 w-4 mr-2" />
                Now serving 10,000+ UK builders
              </div>
            </div>

            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2 sm:px-0">
                AI-Powered Home Building
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block mt-2">
                  Made Simple
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
                Generate floorplans, visualize designs, source materials, and connect with verified UK builders - all in one professional platform.
                <span className="block mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg text-blue-600 font-semibold">
                  From concept to completion in 3 simple steps
                </span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
                <Link 
                  href="/configure" 
                  className="inline-flex items-center justify-center bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-bold px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-xl transition-all duration-300 shadow-xl group transform hover:scale-105 hover:shadow-2xl text-base sm:text-lg lg:text-xl min-h-[56px] sm:min-h-[64px] touch-manipulation focus:ring-4 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Start building your home with BuildMate AI configurator - Professional construction platform"
                  role="button"
                >
                  <HardHat className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  <span className="relative z-10">Start Building Your Home</span>
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform relative z-10" />
                </Link>
                <button 
                  className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 font-bold px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 shadow-lg group transform hover:scale-105 hover:shadow-xl text-base sm:text-lg lg:text-xl min-h-[56px] sm:min-h-[64px] touch-manipulation focus:ring-4 focus:ring-gray-500 focus:ring-offset-2"
                  aria-label="Watch how BuildMate AI works - Professional construction demo video"
                  role="button"
                >
                  <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span>See How It Works</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-xl"></div>
                </button>
              </div>
              
              {/* Enhanced Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 lg:gap-8 text-xs sm:text-sm text-gray-500 px-4">
                <div className="flex items-center bg-green-50 px-3 py-2 rounded-full border border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-green-700 font-medium">Free to start</span>
                </div>
                <div className="flex items-center bg-blue-50 px-3 py-2 rounded-full border border-blue-200">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-blue-700 font-medium">UK building regulations</span>
                </div>
                <div className="flex items-center bg-orange-50 px-3 py-2 rounded-full border border-orange-200">
                  <CheckCircle className="h-4 w-4 text-orange-600 mr-2" />
                  <span className="text-orange-700 font-medium">Verified professionals</span>
                </div>
              </div>
            </div>

            {/* Hero Image/Video Placeholder */}
            <div className="relative max-w-4xl mx-auto px-4">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 sm:p-8 transform transition-all duration-500 hover:shadow-3xl hover:-translate-y-2">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center relative overflow-hidden group touch-manipulation">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-xl"></div>
                  <div className="text-center relative z-10 px-4">
                    <div className="w-16 sm:w-20 h-16 sm:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg transform transition-transform group-hover:scale-110">
                      <Play className="h-6 sm:h-8 w-6 sm:w-8 text-blue-600 ml-1" />
                    </div>
                    <p className="text-gray-700 font-medium text-sm sm:text-base">Watch How BuildMate Works</p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">3 minute demo • Real UK projects</p>
                    <div className="mt-3 flex items-center justify-center space-x-4 text-xs text-gray-600">
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
                  {/* Professional indicators */}
                  <div className="absolute top-3 left-3 flex space-x-1 opacity-40">
                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-orange-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">Trusted by thousands of UK builders</h2>
              <p className="text-sm sm:text-base text-gray-600">Real results from real construction projects</p>
              <p className="text-xs text-gray-500 mt-2 px-2">*Results vary by region, project complexity, and market conditions. London projects typically 30-50% higher cost.</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
              {successMetrics.map((metric, index) => {
                const Icon = metric.icon
                const colorClasses = {
                  blue: { bg: 'bg-blue-100', text: 'text-blue-600', textBold: 'text-blue-600' },
                  green: { bg: 'bg-green-100', text: 'text-green-600', textBold: 'text-green-600' },
                  purple: { bg: 'bg-purple-100', text: 'text-purple-600', textBold: 'text-purple-600' },
                  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', textBold: 'text-emerald-600' },
                  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', textBold: 'text-yellow-600' },
                  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', textBold: 'text-indigo-600' }
                }[metric.color] || { bg: 'bg-gray-100', text: 'text-gray-600', textBold: 'text-gray-600' }

                return (
                  <div 
                    key={index} 
                    className="text-center p-3 sm:p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    style={{animationDelay: `${index * 100}ms`}}
                  >
                    <div className={`inline-flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-xl ${colorClasses.bg} ${colorClasses.text} mb-2 sm:mb-3 transform transition-transform hover:scale-110`}>
                      <Icon className="h-4 sm:h-6 w-4 sm:w-6" />
                    </div>
                    <div className={`text-lg sm:text-2xl font-bold ${colorClasses.textBold} mb-1`}>
                      <AnimatedCounter value={metric.value} duration={2000 + index * 200} animatedStats={animatedStats} />
                    </div>
                    <div className="text-xs sm:text-xs text-gray-600 font-medium leading-tight">{metric.label}</div>
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
                From concept to completion: a real BuildMate transformation
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

        {/* Enhanced Features Grid */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Professional Construction Platform
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                Trusted by 10,000+ UK construction professionals
              </p>
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold">
                <Award className="h-4 w-4" />
                <span>Industry Leading Technology</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Building className="h-8 w-8" />,
                  title: 'AI Floor Plans',
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
                    className={`text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-2 ${colorClasses.border} animate-construction-build`}
                    style={{animationDelay: `${index * 150}ms`}}
                  >
                    <div className={`w-20 h-20 bg-gradient-to-br ${colorClasses.bg} rounded-2xl flex items-center justify-center ${colorClasses.icon} mb-6 mx-auto shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
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

        {/* Smart 3-Step Process */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Build Your Perfect Home in 3 Steps
              </h2>
              <p className="text-2xl text-gray-600 mb-4">
                Configure → Review → Build
              </p>
              <p className="text-lg text-blue-600 font-medium">
                3 minutes to configure, 24-36 months including all approvals and construction
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
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
                  subtitle: 'AI Magic',
                  description: 'AI assembles everything: team, materials, timeline, price. Get your complete project breakdown instantly.',
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
                  <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <div className="text-center">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl mb-6 mx-auto transform transition-transform hover:scale-110 ${
                        item.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                        item.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {item.step}
                      </div>
                      
                      <div className="text-4xl mb-4 animate-bounce">
                        {item.icon}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className={`font-semibold mb-4 ${
                        item.color === 'blue' ? 'text-blue-600' :
                        item.color === 'purple' ? 'text-purple-600' :
                        'text-green-600'
                      }`}>{item.subtitle}</p>
                      <p className="text-gray-600 leading-relaxed mb-6">{item.description}</p>
                      
                      <div className={`border rounded-xl p-4 mb-4 ${
                        item.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                        item.color === 'purple' ? 'bg-purple-50 border-purple-200' :
                        'bg-green-50 border-green-200'
                      }`}>
                        <div className="text-sm text-gray-600 mb-1">Preview:</div>
                        <div className={`font-medium ${
                          item.color === 'blue' ? 'text-blue-800' :
                          item.color === 'purple' ? 'text-purple-800' :
                          'text-green-800'
                        }`}>{item.details}</div>
                      </div>
                      
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        item.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                        item.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        ⏱️ {item.time}
                      </div>
                    </div>
                  </div>
                  
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                      <div className="bg-white rounded-full p-2 shadow-lg">
                        <ArrowRight className="h-6 w-6 text-gray-400" />
                      </div>
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
                  content: 'BuildMate connects me with serious, prepared clients. My project completion rate increased 40%.',
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
                  content: 'From planning permission to final inspection, BuildMate guided every step. Could not be happier.',
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

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Building Your Home?
            </h2>
            <p className="text-blue-100 text-xl mb-8 leading-relaxed">
              <AnimatedCounter value="247" animatedStats={animatedStats} /> houses designed today. Start your home building journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/configure/step-1" 
                className="inline-flex items-center bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg group transform hover:scale-105 hover:shadow-2xl"
              >
                Start Building Your Home
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/case-studies" 
                className="inline-flex items-center bg-transparent text-white font-semibold px-8 py-4 rounded-xl border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                View Examples
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-blue-100">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                <span>4.8/5 Rating</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                <span>£850K+ Platform Savings</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                <span>94% On-Time Completion</span>
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
      </div>
    </div>
  )
}