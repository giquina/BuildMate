'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, CheckCircle, Star, Play, TrendingUp, Users, Award, Target, Clock, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const AnimatedCounter = ({ value, duration = 2000, animatedStats }: { value: string, duration?: number, animatedStats: boolean }) => {
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

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [animatedStats, setAnimatedStats] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedStats(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0 bg-gray-50 opacity-20"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl animate-float"></div>
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
                AI-Powered Home Building
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block mt-2">
                  Made Simple
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Generate floorplans, visualize designs, source materials, and connect with verified builders - all in one platform.
                <span className="block mt-2 text-lg text-blue-600 font-semibold">
                  From concept to completion in 3 simple steps
                </span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link 
                  href="/configure" 
                  className="inline-flex items-center bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg group transform hover:scale-105 hover:shadow-2xl text-lg"
                >
                  <span className="relative z-10">Start Building Your Home</span>
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
                href="/configure" 
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