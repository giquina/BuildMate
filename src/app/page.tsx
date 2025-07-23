'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, CheckCircle, Star, Play, TrendingUp, Users, Award, Target, Clock, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [animatedStats, setAnimatedStats] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % extendedTestimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedStats(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const features = [
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
  ]

  const extendedTestimonials = [
    {
      name: 'Sarah Chen',
      role: 'Self-Builder, Manchester',
      content: 'BuildMate AI turned our extension nightmare into a dream project. The AI layouts saved us £15k in architectural fees!',
      rating: 5,
      savings: '£15,000',
      project: 'Victorian Extension',
      image: '👩‍💼'
    },
    {
      name: 'James Mitchell',
      role: 'Property Developer, Birmingham',
      content: 'The AI floor plans are incredible. What used to take weeks now takes minutes. My team efficiency increased by 40%.',
      rating: 5,
      savings: '£23,000',
      project: 'Commercial Development',
      image: '👨‍💼'
    },
    {
      name: 'Jennifer Mills',
      role: 'First-Time Builder, Leeds',
      content: 'As a first-time builder, I was terrified. BuildMate\'s professional network held my hand through everything.',
      rating: 5,
      savings: '£8,500',
      project: 'New Build Home',
      image: '👩‍🏭'
    },
    {
      name: 'Marcus Thompson',
      role: 'Renovation Specialist, Liverpool',
      content: 'The material savings alone paid for our Pro subscription 10 times over. Incredible platform.',
      rating: 5,
      savings: '£18,200',
      project: 'Heritage Restoration',
      image: '👨‍🔧'
    }
  ]

  const successMetrics = [
    { label: 'Houses Configured Today', value: '247', icon: Target, color: 'blue' },
    { label: 'Average Savings', value: '£23,450', icon: DollarSign, color: 'green' },
    { label: 'Time to Configure', value: '3 min', icon: Clock, color: 'purple' },
    { label: 'On-Time Completion', value: '94%', icon: Award, color: 'emerald' },
    { label: 'Customer Satisfaction', value: '4.8/5', icon: Star, color: 'yellow' },
    { label: 'Total Savings Generated', value: '£2.3M+', icon: TrendingUp, color: 'indigo' }
  ]

  const featuredCaseStudy = {
    title: 'Birmingham Victorian Extension: £45k Under Budget',
    client: 'The Johnson Family',
    project: 'Double-story rear extension',
    originalBudget: '£85k',
    finalCost: '£69k',
    savings: '£16k',
    timeline: '16 weeks (6 weeks early)',
    quote: 'BuildMate\'s AI optimization saved us more than we ever imagined possible.',
    beforeImage: '🏠',
    afterImage: '🏡'
  }

  const AnimatedCounter = ({ value, duration = 2000 }: { value: string, duration?: number }) => {
    const [displayValue, setDisplayValue] = useState('0')
    
    useEffect(() => {
      if (!animatedStats) return
      
      const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
      const prefix = value.replace(/[0-9]/g, '')
      const suffix = value.slice(numericValue.toString().length)
      
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
    }, [value, duration, animatedStats])
    
    return <span className="font-bold">{displayValue}</span>
  }

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

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Dream Home,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block mt-2">
                Delivered
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Configure once. We handle everything. Start building in one click.
              <span className="block mt-2 text-lg text-blue-600 font-semibold">
                Configure Your Dream Home Like a Tesla, Start Building Like Ordering an Uber
              </span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/configure" 
                className="inline-flex items-center bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg group transform hover:scale-105 hover:shadow-2xl text-lg"
              >
                <span className="relative z-10">Configure My Dream Home</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
              </Link>
              <button className="btn-secondary text-lg flex items-center justify-center group relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-50">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>See How It Works</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Free to start
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                UK building regulations
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Verified professionals
              </div>
            </div>
          </div>

          {/* Hero Image/Video Placeholder */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 transform transition-all duration-500 hover:shadow-3xl hover:-translate-y-2">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-xl"></div>
                <div className="text-center relative z-10">
                  <div className="text-6xl mb-4 animate-bounce">
                    <div className="relative">
                      🏠
                      <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                    </div>
                  </div>
                  <p className="text-gray-600 font-medium">Interactive Demo Coming Soon</p>
                  <div className="mt-4 flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics Banner */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Trusted by UK's Leading Builders
            </h2>
            <p className="text-gray-600">Real results from real projects across the UK</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {successMetrics.map((metric, index) => {
              const Icon = metric.icon
              return (
                <div 
                  key={index} 
                  className="text-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-${metric.color}-100 text-${metric.color}-600 mb-3 transform transition-transform hover:scale-110`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className={`text-2xl font-bold text-${metric.color}-600 mb-1`}>
                    <AnimatedCounter value={metric.value} duration={2000 + index * 200} />
                  </div>
                  <div className="text-xs text-gray-600 font-medium">{metric.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Carousel */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real Stories, Real Savings
            </h2>
            <p className="text-xl text-gray-600">
              See how UK builders are transforming their projects with BuildMate AI
            </p>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto transform transition-all duration-500">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto transform transition-transform hover:scale-110">
                    {extendedTestimonials[currentTestimonial].image}
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {extendedTestimonials[currentTestimonial].name}
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    {extendedTestimonials[currentTestimonial].role}
                  </div>
                  <div className="flex justify-center mb-2">
                    {[...Array(extendedTestimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Saved {extendedTestimonials[currentTestimonial].savings}
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <div className="text-4xl text-blue-200 mb-4">"</div>
                  <p className="text-xl text-gray-700 leading-relaxed mb-6 italic">
                    {extendedTestimonials[currentTestimonial].content}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {extendedTestimonials[currentTestimonial].project}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <button 
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + extendedTestimonials.length) % extendedTestimonials.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-900 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % extendedTestimonials.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-900 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {extendedTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentTestimonial 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Success Story
            </h2>
            <p className="text-xl text-gray-600">
              Deep dive into a real project transformation
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Before/After Images */}
              <div className="space-y-6">
                <div className="relative">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Visual Transformation</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="aspect-square bg-gradient-to-br from-red-100 to-orange-100 rounded-xl flex items-center justify-center text-4xl mb-2 transform transition-transform hover:scale-105">
                        {featuredCaseStudy.beforeImage}
                      </div>
                      <span className="text-sm text-gray-600 font-medium">Before</span>
                    </div>
                    <div className="text-center">
                      <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center text-4xl mb-2 transform transition-transform hover:scale-105">
                        {featuredCaseStudy.afterImage}
                      </div>
                      <span className="text-sm text-gray-600 font-medium">After</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">{featuredCaseStudy.savings}</div>
                  <div className="text-green-800 font-medium">Total Savings Achieved</div>
                  <div className="text-sm text-green-600 mt-1">Plus 6 weeks ahead of schedule</div>
                </div>
              </div>
              
              {/* Project Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{featuredCaseStudy.title}</h3>
                  <p className="text-gray-600 mb-4">{featuredCaseStudy.client} • {featuredCaseStudy.project}</p>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                    <div className="text-2xl text-blue-600 mb-2">"</div>
                    <p className="text-blue-800 italic font-medium">{featuredCaseStudy.quote}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-lg font-bold text-gray-900">{featuredCaseStudy.originalBudget}</div>
                    <div className="text-sm text-gray-600">Original Budget</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-lg font-bold text-gray-900">{featuredCaseStudy.finalCost}</div>
                    <div className="text-sm text-gray-600">Final Cost</div>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-purple-600 mr-2" />
                    <span className="font-semibold text-purple-900">Timeline: {featuredCaseStudy.timeline}</span>
                  </div>
                </div>
                
                <Link 
                  href="/case-studies" 
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium group"
                >
                  Read Complete Case Study
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Build
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From concept to completion, BuildMate AI streamlines every aspect of your building project
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="card text-center group hover:scale-105 transition-all duration-300 hover:shadow-xl relative overflow-hidden"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-200 animate-float" style={{animationDelay: `${index * 0.5}s`}}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tesla-Uber 3-Step Process */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Build Your Dream Home in 3 Steps
            </h2>
            <p className="text-2xl text-gray-600 mb-4">
              Configure → Review → Build
            </p>
            <p className="text-lg text-blue-600 font-medium">
              3 minutes to configure, 18 months to move in
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: '1',
                title: 'Configure',
                subtitle: 'Like Tesla',
                description: 'Design your perfect home with our Tesla-style configurator. Choose everything from layout to finishes with real-time 3D preview.',
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
                subtitle: 'Like Uber',
                description: 'One click starts your entire project. We handle the rest. Track progress like following your ride.',
                icon: '🚀',
                details: 'Timeline visualization',
                color: 'green',
                time: '18 months'
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-${item.color}-100 text-${item.color}-600 rounded-2xl flex items-center justify-center font-bold text-2xl mb-6 mx-auto transform transition-transform hover:scale-110`}>
                      {item.step}
                    </div>
                    
                    <div className="text-4xl mb-4 animate-bounce">
                      {item.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className={`text-${item.color}-600 font-semibold mb-4`}>{item.subtitle}</p>
                    <p className="text-gray-600 leading-relaxed mb-6">{item.description}</p>
                    
                    <div className={`bg-${item.color}-50 border border-${item.color}-200 rounded-xl p-4 mb-4`}>
                      <div className="text-sm text-gray-600 mb-1">Preview:</div>
                      <div className={`text-${item.color}-800 font-medium`}>{item.details}</div>
                    </div>
                    
                    <div className={`inline-flex items-center bg-${item.color}-100 text-${item.color}-800 px-3 py-1 rounded-full text-sm font-medium`}>
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
              <p className="text-blue-100">In 30 seconds, you'll have everything needed to build</p>
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
                    <div>✅ Complete 3D house design</div>
                    <div>✅ Full materials list (847 items)</div>
                    <div>✅ Professional team assigned</div>
                    <div>✅ 18-month timeline</div>
                    <div>✅ £187,450 total cost</div>
                    <div className="font-bold text-green-700">🎉 £12,550 under budget!</div>
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
              Join thousands who've built smarter with BuildMate AI
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
                content: 'The platform\'s project management tools help me deliver on time, every time. Game changer.',
                rating: 5,
                type: 'Professional',
                image: '⚡'
              },
              {
                name: 'The Anderson Family',
                role: 'Homeowners, Glasgow',
                content: 'From planning permission to final inspection, BuildMate guided every step. Couldn\'t be happier.',
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
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <div className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 animate-bounce">
            <Sparkles className="h-4 w-4 mr-2" />
            Free to start • No credit card required
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Configure Your Dream Home?
          </h2>
          <p className="text-blue-100 text-xl mb-8 leading-relaxed">
            <AnimatedCounter value="247" /> houses configured today. Join the Tesla-Uber revolution in home building.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link 
              href="/configure" 
              className="inline-flex items-center bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg group transform hover:scale-105 hover:shadow-2xl"
            >
              Configure My Dream Home
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
              <span>£2.3M+ Saved</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
              <span>92% Success Rate</span>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}