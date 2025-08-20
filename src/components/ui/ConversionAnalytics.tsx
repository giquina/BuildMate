'use client'

import React, { useState, useMemo } from 'react'
import { useUser, useFreemium } from '@/contexts/UserContext'
import { formatCurrency } from '@/lib/uk-utils'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  CreditCard, 
  Eye, 
  Target,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  RefreshCw
} from 'lucide-react'

interface ConversionAnalyticsProps {
  timeRange: '24h' | '7d' | '30d' | '90d'
  onTimeRangeChange: (range: '24h' | '7d' | '30d' | '90d') => void
  className?: string
}

export function ConversionAnalytics({
  timeRange,
  onTimeRangeChange,
  className = ''
}: ConversionAnalyticsProps) {
  const { user, isAuthenticated } = useUser()
  const { subscription } = useFreemium()
  const [selectedView, setSelectedView] = useState<'funnel' | 'segments' | 'tactics'>('funnel')
  const [isLoading, setIsLoading] = useState(false)

  // Mock conversion funnel data
  const funnelData = useMemo(() => [
    {
      step: 'materials_viewed',
      label: 'Materials Viewed',
      count: 12547,
      conversionRate: 100,
      averageTime: 45,
      icon: <Eye className="h-4 w-4" />
    },
    {
      step: 'items_added',
      label: 'Items Added to Cart',
      count: 8734,
      conversionRate: 69.6,
      averageTime: 127,
      icon: <ShoppingCart className="h-4 w-4" />
    },
    {
      step: 'checkout_started',
      label: 'Checkout Started',
      count: 4156,
      conversionRate: 60.3,
      averageTime: 234,
      icon: <CreditCard className="h-4 w-4" />
    },
    {
      step: 'orders_completed',
      label: 'Orders Completed',
      count: 2847,
      conversionRate: 68.5,
      averageTime: 312,
      icon: <CheckCircle className="h-4 w-4" />
    }
  ], [])

  // Mock user segment data
  const segmentData = useMemo(() => [
    {
      segment: 'new_users',
      label: 'New Users',
      users: 4580,
      conversionRate: 18.2,
      averageOrderValue: 284,
      revenue: 236847,
      color: 'bg-blue-500'
    },
    {
      segment: 'returning_users',
      label: 'Returning Users',
      users: 2847,
      conversionRate: 32.1,
      averageOrderValue: 456,
      revenue: 417293,
      color: 'bg-green-500'
    },
    {
      segment: 'pro_users',
      label: 'Pro Subscribers',
      users: 1238,
      conversionRate: 67.4,
      averageOrderValue: 892,
      revenue: 744271,
      color: 'bg-purple-500'
    }
  ], [])

  // Mock conversion tactic performance
  const tacticData = useMemo(() => [
    {
      id: 'exit_intent',
      name: 'Exit Intent Modal',
      triggered: 2847,
      converted: 456,
      conversionRate: 16.0,
      revenue: 127593,
      roi: 4392
    },
    {
      id: 'social_proof',
      name: 'Social Proof Widget',
      triggered: 8734,
      converted: 1247,
      conversionRate: 14.3,
      revenue: 284791,
      roi: 3162
    },
    {
      id: 'urgency_timer',
      name: 'Urgency Countdown',
      triggered: 3456,
      converted: 421,
      conversionRate: 12.2,
      revenue: 98274,
      roi: 2748
    }
  ], [])

  // Mock real-time metrics
  const realtimeMetrics = useMemo(() => [
    {
      label: 'Conversion Rate',
      value: 22.7,
      change: 2.3,
      changeType: 'increase' as const,
      unit: '%',
      icon: <Target className="h-4 w-4" />
    },
    {
      label: 'Average Order Value',
      value: 387,
      change: -12,
      changeType: 'decrease' as const,
      unit: '£',
      icon: <DollarSign className="h-4 w-4" />
    },
    {
      label: 'Active Carts',
      value: 247,
      change: 15,
      changeType: 'increase' as const,
      unit: '',
      icon: <ShoppingCart className="h-4 w-4" />
    },
    {
      label: 'Abandoned Carts',
      value: 89,
      change: -7,
      changeType: 'decrease' as const,
      unit: '',
      icon: <AlertCircle className="h-4 w-4" />
    }
  ], [])

  const overallConversionRate = useMemo(() => {
    const firstStep = funnelData[0]
    const lastStep = funnelData[funnelData.length - 1]
    return ((lastStep.count / firstStep.count) * 100).toFixed(1)
  }, [funnelData])

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleExport = () => {
    const data = {
      timeRange,
      funnel: funnelData,
      segments: segmentData,
      tactics: tacticData,
      metrics: realtimeMetrics,
      generatedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `conversion-analytics-${timeRange}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
            Conversion Analytics
          </h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleExport}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          {(['24h', '7d', '30d', '90d'] as const).map(range => (
            <button
              key={range}
              onClick={() => onTimeRangeChange(range)}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                timeRange === range
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4">
          {realtimeMetrics.map((metric, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">{metric.label}</span>
                <div className="p-1 bg-gray-200 rounded">
                  {metric.icon}
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-lg font-semibold text-gray-900">
                  {metric.unit === '£' ? formatCurrency(metric.value) : `${metric.value}${metric.unit}`}
                </span>
                <span className={`text-sm flex items-center ${
                  metric.changeType === 'increase' ? 'text-green-600' :
                  metric.changeType === 'decrease' ? 'text-red-600' :
                  'text-gray-500'
                }`}>
                  {metric.changeType === 'increase' ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : metric.changeType === 'decrease' ? (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  ) : null}
                  {Math.abs(metric.change)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-gray-100">
        <div className="flex space-x-8 px-6">
          {[
            { key: 'funnel', label: 'Conversion Funnel', icon: Target },
            { key: 'segments', label: 'User Segments', icon: Users },
            { key: 'tactics', label: 'Recovery Tactics', icon: TrendingUp }
          ].map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedView(tab.key as any)}
                className={`py-4 flex items-center space-x-2 border-b-2 font-medium text-sm transition-colors ${
                  selectedView === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="p-6">
        {selectedView === 'funnel' && (
          <div>
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">
                Conversion Funnel ({timeRange})
              </h4>
              <p className="text-sm text-gray-600">
                Overall conversion rate: <span className="font-semibold text-green-600">{overallConversionRate}%</span>
              </p>
            </div>

            <div className="space-y-4">
              {funnelData.map((step) => (
                <div key={step.step} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {step.icon}
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900">{step.label}</h5>
                        <div className="text-sm text-gray-600">
                          {formatNumber(step.count)} users " {step.averageTime}s avg time
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">
                        {step.conversionRate.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${step.conversionRate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'segments' && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-6">
              User Segment Performance ({timeRange})
            </h4>

            <div className="grid grid-cols-1 gap-4">
              {segmentData.map((segment) => (
                <div key={segment.segment} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${segment.color}`} />
                      <h5 className="font-medium text-gray-900">{segment.label}</h5>
                    </div>
                    <span className="text-sm text-gray-600">
                      {formatNumber(segment.users)} users
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Conversion Rate</div>
                      <div className="font-medium">{segment.conversionRate}%</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Avg Order Value</div>
                      <div className="font-medium">{formatCurrency(segment.averageOrderValue)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Total Revenue</div>
                      <div className="font-medium text-green-600">
                        {formatCurrency(segment.revenue)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'tactics' && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-6">
              Recovery Tactic Performance ({timeRange})
            </h4>

            <div className="space-y-4">
              {tacticData.map((tactic) => (
                <div key={tactic.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-gray-900">{tactic.name}</h5>
                  </div>

                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Triggered</div>
                      <div className="font-medium">{formatNumber(tactic.triggered)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Converted</div>
                      <div className="font-medium">{formatNumber(tactic.converted)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Conv. Rate</div>
                      <div className="font-medium">{tactic.conversionRate}%</div>
                    </div>
                    <div>
                      <div className="text-gray-600">ROI</div>
                      <div className="font-medium text-blue-600">
                        {tactic.roi}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConversionAnalytics