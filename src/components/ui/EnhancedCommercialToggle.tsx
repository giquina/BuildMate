'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, TrendingUp, Clock, PoundSterling, Home, Building2 } from 'lucide-react'

interface ToggleOption {
  id: 'residential' | 'commercial'
  icon: React.ElementType
  title: string
  subtitle: string
  description: string
  valueProps: string[]
  metrics: {
    savings: string
    timeline: string
    satisfaction: string
  }
  gradient: string
  href: string
  cta: string
}

const TOGGLE_OPTIONS: ToggleOption[] = [
  {
    id: 'residential',
    icon: Home,
    title: 'Build Your Dream Home',
    subtitle: 'Extensions, new builds, renovations',
    description: 'Complete home building platform with AI-powered design, verified professionals, and guaranteed pricing.',
    valueProps: [
      '£6,850 average project savings',
      'RIBA certified designs & compliance',
      '94% on-time delivery guarantee',
      '500+ verified UK professionals'
    ],
    metrics: {
      savings: '32%',
      timeline: '8 weeks',
      satisfaction: '4.9★'
    },
    gradient: 'from-blue-600 to-indigo-600',
    href: '/configure',
    cta: 'Start Building Now'
  },
  {
    id: 'commercial',
    icon: Building2,
    title: 'Optimize Your Property',
    subtitle: 'Commercial real estate optimization',
    description: 'AI-powered commercial property optimization delivering measurable ROI through energy efficiency and smart technology.',
    valueProps: [
      '30-50% energy cost reduction',
      '8-15% property value increase',
      '2-4 year investment payback',
      'EPC B+ rating improvements'
    ],
    metrics: {
      savings: '42%',
      timeline: '6 months',
      satisfaction: '4.8★'
    },
    gradient: 'from-indigo-600 to-purple-600',
    href: '/commercial',
    cta: 'Optimize Property'
  }
]

interface EnhancedCommercialToggleProps {
  className?: string
  defaultSelected?: 'residential' | 'commercial'
}

export function EnhancedCommercialToggle({ 
  className = '', 
  defaultSelected = 'residential' 
}: EnhancedCommercialToggleProps) {
  const [selectedOption, setSelectedOption] = useState<'residential' | 'commercial'>(defaultSelected)
  const [hoveredOption, setHoveredOption] = useState<'residential' | 'commercial' | null>(null)

  return (
    <section className={`py-8 sm:py-12 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Would You Like To Do?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6">
            Choose your path to property success
          </p>
          
          {/* Quick Toggle Tabs */}
          <div className="inline-flex bg-gray-100 rounded-xl p-1 mb-8">
            {TOGGLE_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  selectedOption === option.id
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {option.title}
              </button>
            ))}
          </div>
        </div>

        {/* Toggle Cards */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {TOGGLE_OPTIONS.map((option) => {
            const Icon = option.icon
            const isSelected = selectedOption === option.id
            const isHovered = hoveredOption === option.id
            
            return (
              <div
                key={option.id}
                className={`relative group transition-all duration-500 ${
                  isSelected 
                    ? 'scale-105 lg:scale-110' 
                    : isHovered 
                    ? 'scale-102' 
                    : 'hover:scale-102'
                }`}
                onMouseEnter={() => setHoveredOption(option.id)}
                onMouseLeave={() => setHoveredOption(null)}
                onClick={() => setSelectedOption(option.id)}
              >
                <div className={`bg-white rounded-2xl shadow-xl border-4 transition-all duration-300 overflow-hidden cursor-pointer ${
                  isSelected 
                    ? 'border-blue-500 shadow-2xl' 
                    : 'border-gray-100 hover:border-gray-200 hover:shadow-2xl'
                }`}>
                  {/* Header with Gradient */}
                  <div className={`bg-gradient-to-r ${option.gradient} text-white p-6 sm:p-8`}>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 sm:w-16 h-12 sm:h-16 bg-white/20 rounded-xl flex items-center justify-center">
                        <Icon className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold">{option.title}</h3>
                        <p className="text-white/90 text-sm sm:text-base">{option.subtitle}</p>
                      </div>
                    </div>
                    
                    {/* Metrics Row */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold">{option.metrics.savings}</div>
                        <div className="text-white/80 text-xs sm:text-sm">Avg Savings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold">{option.metrics.timeline}</div>
                        <div className="text-white/80 text-xs sm:text-sm">Timeline</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold">{option.metrics.satisfaction}</div>
                        <div className="text-white/80 text-xs sm:text-sm">Rating</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8">
                    {/* Description */}
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                      {option.description}
                    </p>

                    {/* Value Propositions */}
                    <div className="space-y-3 mb-6">
                      {option.valueProps.map((prop, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 text-sm sm:text-base">{prop}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Link 
                      href={option.href}
                      className={`group/btn w-full inline-flex items-center justify-center bg-gradient-to-r ${option.gradient} text-white font-semibold px-6 py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                    >
                      {option.cta}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Context */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 sm:p-8 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Trusted by 15,000+ UK Property Owners
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              From first-time builders to commercial property portfolios
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-gray-700 font-medium">£2.4M Projects Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-gray-700 font-medium">85% Faster Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <PoundSterling className="h-4 w-4 text-purple-600" />
                <span className="text-gray-700 font-medium">£247K Monthly Revenue</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EnhancedCommercialToggle