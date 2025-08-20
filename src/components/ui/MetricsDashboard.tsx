'use client'

import { useState, useEffect, memo } from 'react'
import { TrendingUp, Users, PoundSterling, HardHat, Star, Clock, Building, Zap, Target, Award } from 'lucide-react'

interface Metric {
  label: string
  value: string
  icon: React.ElementType
  color: 'green' | 'blue' | 'purple' | 'orange' | 'yellow' | 'indigo' | 'pink' | 'red'
  trend?: string
  description: string
}

const COMPANY_METRICS: Metric[] = [
  { 
    label: 'Projects Completed', 
    value: '£4.2M', 
    icon: TrendingUp, 
    color: 'green',
    trend: '+45%',
    description: 'Total project value delivered'
  },
  { 
    label: 'Active Platform Users', 
    value: '23,891', 
    icon: Users, 
    color: 'blue',
    trend: '+38%',
    description: 'Homeowners and professionals'
  },
  { 
    label: 'Monthly Platform Revenue', 
    value: '£497K', 
    icon: PoundSterling, 
    color: 'green',
    trend: '+85%',
    description: 'Revolutionary partner ecosystem'
  },
  { 
    label: 'Revolutionary Partners', 
    value: '6+', 
    icon: Building, 
    color: 'purple',
    trend: '+200%',
    description: 'Trigrr, Boxabl, Volferda, Colliers+'
  },
  { 
    label: 'Customer Satisfaction', 
    value: '4.9★', 
    icon: Star, 
    color: 'yellow',
    trend: '+12%',
    description: 'Average project rating'
  },
  { 
    label: 'AI-Powered Speed Boost', 
    value: '92%', 
    icon: Zap, 
    color: 'indigo',
    trend: '+18%',
    description: 'Faster than traditional builds'
  }
]

const AnimatedCounter = memo(({ 
  value, 
  duration = 2000, 
  animatedStats,
  delay = 0 
}: { 
  value: string
  duration?: number
  animatedStats: boolean
  delay?: number
}) => {
  const [displayValue, setDisplayValue] = useState('0')
  
  useEffect(() => {
    if (!animatedStats) return
    
    const timer = setTimeout(() => {
      // Extract numeric value and formatting
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''))
      const prefix = value.match(/^[^0-9]*/)?.[0] || ''
      const suffix = value.match(/[^0-9]*$/)?.[0] || ''
      
      if (isNaN(numericValue)) {
        setDisplayValue(value)
        return
      }
      
      let start = 0
      const increment = numericValue / (duration / 50)
      
      const animationTimer = setInterval(() => {
        start += increment
        if (start >= numericValue) {
          setDisplayValue(value)
          clearInterval(animationTimer)
        } else {
          const formattedNumber = Math.floor(start).toLocaleString()
          setDisplayValue(prefix + formattedNumber + suffix)
        }
      }, 50)
      
      return () => clearInterval(animationTimer)
    }, delay)
    
    return () => clearTimeout(timer)
  }, [value, duration, animatedStats, delay])
  
  return <span className="font-bold">{displayValue}</span>
})

AnimatedCounter.displayName = 'AnimatedCounter'

interface MetricsDashboardProps {
  animatedStats?: boolean
  className?: string
}

export function MetricsDashboard({ animatedStats = false, className = '' }: MetricsDashboardProps) {
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null)

  const getColorClasses = (color: Metric['color']) => {
    const colorMap = {
      green: { 
        bg: 'from-green-500 to-emerald-600', 
        text: 'text-white',
        hover: 'hover:from-green-600 hover:to-emerald-700',
        icon: 'bg-white/20'
      },
      blue: { 
        bg: 'from-blue-500 to-indigo-600', 
        text: 'text-white',
        hover: 'hover:from-blue-600 hover:to-indigo-700',
        icon: 'bg-white/20'
      },
      purple: { 
        bg: 'from-purple-500 to-violet-600', 
        text: 'text-white',
        hover: 'hover:from-purple-600 hover:to-violet-700',
        icon: 'bg-white/20'
      },
      orange: { 
        bg: 'from-orange-500 to-amber-600', 
        text: 'text-white',
        hover: 'hover:from-orange-600 hover:to-amber-700',
        icon: 'bg-white/20'
      },
      yellow: { 
        bg: 'from-yellow-400 to-orange-500', 
        text: 'text-white',
        hover: 'hover:from-yellow-500 hover:to-orange-600',
        icon: 'bg-white/20'
      },
      indigo: { 
        bg: 'from-indigo-500 to-blue-600', 
        text: 'text-white',
        hover: 'hover:from-indigo-600 hover:to-blue-700',
        icon: 'bg-white/20'
      },
      pink: { 
        bg: 'from-pink-500 to-rose-600', 
        text: 'text-white',
        hover: 'hover:from-pink-600 hover:to-rose-700',
        icon: 'bg-white/20'
      },
      red: { 
        bg: 'from-red-500 to-rose-600', 
        text: 'text-white',
        hover: 'hover:from-red-600 hover:to-rose-700',
        icon: 'bg-white/20'
      }
    }
    return colorMap[color]
  }

  return (
    <section className={`py-12 sm:py-16 bg-white border-b border-gray-100 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Award className="h-4 w-4 mr-2" />
            Platform Performance
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Real-Time Platform Metrics
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Live data from UK's leading construction platform
          </p>
        </div>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {COMPANY_METRICS.map((metric, index) => {
            const Icon = metric.icon
            const colorClasses = getColorClasses(metric.color)
            const isHovered = hoveredMetric === index
            
            return (
              <div 
                key={index} 
                className={`relative text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br ${colorClasses.bg} ${colorClasses.hover} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${colorClasses.text}`}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredMetric(index)}
                onMouseLeave={() => setHoveredMetric(null)}
              >
                {/* Icon */}
                <div className={`flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-lg ${colorClasses.icon} mx-auto mb-3 sm:mb-4`}>
                  <Icon className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
                </div>
                
                {/* Value */}
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                  <AnimatedCounter 
                    value={metric.value} 
                    duration={2000 + index * 200} 
                    animatedStats={animatedStats}
                    delay={index * 150}
                  />
                </div>
                
                {/* Label */}
                <div className="text-xs sm:text-sm text-white/90 font-medium leading-tight mb-2">
                  {metric.label}
                </div>
                
                {/* Trend */}
                {metric.trend && (
                  <div className="inline-flex items-center bg-white/20 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {metric.trend}
                  </div>
                )}
                
                {/* Hover Description */}
                {isHovered && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 animate-fade-in z-10">
                    {metric.description}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        
        {/* Additional Context */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 sm:p-8 border border-blue-100">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Series A Funded Platform</h3>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              Backed by leading construction and PropTech investors
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-medium">Live Platform</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Real Revenue</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Active Partnerships</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Growing Fast</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MetricsDashboard