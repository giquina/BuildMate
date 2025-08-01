// User Analytics Dashboard for BuildMate Admin
'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  TrendingUp, 
  Activity, 
  Clock, 
  MapPin, 
  Smartphone,
  Monitor,
  Tablet,
  Calendar,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download
} from 'lucide-react'
import { Card } from '../../../../components/ui/Card'
import { Button } from '../../../../components/ui/Button'
import UserAnalyticsCharts from '../../../../components/ui/UserAnalyticsCharts'
import GeographicDistribution from '../../../../components/ui/GeographicDistribution'
import EngagementFunnels from '../../../../components/ui/EngagementFunnels'

interface UserMetric {
  id: string
  label: string
  value: string
  change: string
  changeType: 'increase' | 'decrease' | 'neutral'
  icon: any
  description: string
}

interface UserSegment {
  name: string
  userCount: number
  percentage: number
  growth: string
  avgRevenue: string
  color: string
}

interface DeviceStats {
  type: string
  percentage: number
  userCount: number
  icon: any
}

export default function UserAnalyticsDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')
  const [metrics, setMetrics] = useState<UserMetric[]>([])
  const [userSegments, setUserSegments] = useState<UserSegment[]>([])
  const [deviceStats, setDeviceStats] = useState<DeviceStats[]>([])

  useEffect(() => {
    const loadAnalyticsData = async () => {
      setIsLoading(true)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1200))
      
      // Mock data - in production, this would come from AdminService.getUserAnalytics()
      setMetrics([
        {
          id: 'total-users',
          label: 'Total Users',
          value: '12,847',
          change: '+8.2%',
          changeType: 'increase',
          icon: Users,
          description: 'Total registered users on the platform'
        },
        {
          id: 'active-users',
          label: 'Monthly Active Users',
          value: '8,420',
          change: '+12.4%',
          changeType: 'increase',
          icon: Activity,
          description: 'Users who logged in within the last 30 days'
        },
        {
          id: 'new-registrations',
          label: 'New Registrations',
          value: '543',
          change: '+15.7%',
          changeType: 'increase',
          icon: TrendingUp,
          description: 'New user registrations this month'
        },
        {
          id: 'session-duration',
          label: 'Avg Session Duration',
          value: '12m 34s',
          change: '-2.1%',
          changeType: 'decrease',
          icon: Clock,
          description: 'Average time users spend per session'
        }
      ])

      setUserSegments([
        { name: 'Homeowners', userCount: 6890, percentage: 53.6, growth: '+5.2%', avgRevenue: '£45', color: '#3B82F6' },
        { name: 'Self-Builders', userCount: 3120, percentage: 24.3, growth: '+8.7%', avgRevenue: '£125', color: '#10B981' },
        { name: 'Property Developers', userCount: 1890, percentage: 14.7, growth: '+12.3%', avgRevenue: '£340', color: '#8B5CF6' },
        { name: 'Professionals', userCount: 947, percentage: 7.4, growth: '+18.9%', avgRevenue: '£85', color: '#F59E0B' }
      ])

      setDeviceStats([
        { type: 'Mobile', percentage: 68.4, userCount: 8789, icon: Smartphone },
        { type: 'Desktop', percentage: 27.3, userCount: 3507, icon: Monitor },
        { type: 'Tablet', percentage: 4.3, userCount: 551, icon: Tablet }
      ])

      setIsLoading(false)
    }

    loadAnalyticsData()
  }, [timeRange])

  const retentionData = [
    { period: 'Day 1', percentage: 85.3, users: 462 },
    { period: 'Day 7', percentage: 45.7, users: 248 },
    { period: 'Day 30', percentage: 28.4, users: 154 },
    { period: 'Day 90', percentage: 18.9, users: 102 }
  ]

  const topPages = [
    { page: '/configure', visits: 45670, percentage: 32.1, avgTime: '8m 42s' },
    { page: '/materials', visits: 38420, percentage: 27.0, avgTime: '6m 15s' },
    { page: '/professionals', visits: 28340, percentage: 19.9, avgTime: '4m 38s' },
    { page: '/dashboard', visits: 21890, percentage: 15.4, avgTime: '12m 25s' },
    { page: '/pricing', visits: 8230, percentage: 5.8, avgTime: '3m 12s' }
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="animate-pulse bg-slate-200 h-8 w-48 rounded"></div>
          <div className="animate-pulse bg-slate-200 h-10 w-32 rounded"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <Card className="p-6">
                <div className="bg-slate-200 h-4 w-24 rounded mb-4"></div>
                <div className="bg-slate-200 h-8 w-32 rounded mb-2"></div>
                <div className="bg-slate-200 h-4 w-16 rounded"></div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">User Analytics</h1>
          <p className="text-slate-600 mt-1">
            Comprehensive insights into user behavior and engagement patterns
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <div className="flex border border-slate-300 rounded-lg">
            <Button
              variant={timeRange === '7d' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-r-none border-0"
              onClick={() => setTimeRange('7d')}
            >
              7D
            </Button>
            <Button
              variant={timeRange === '30d' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-none border-0"
              onClick={() => setTimeRange('30d')}
            >
              30D
            </Button>
            <Button
              variant={timeRange === '90d' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-l-none border-0"
              onClick={() => setTimeRange('90d')}
            >
              90D
            </Button>
          </div>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                {metric.changeType === 'increase' ? (
                  <div className="flex items-center text-green-600">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{metric.change}</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{metric.change}</span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</p>
                <p className="text-sm font-medium text-slate-600 mb-2">{metric.label}</p>
                <p className="text-xs text-slate-500">{metric.description}</p>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserAnalyticsCharts timeRange={timeRange} />
        <GeographicDistribution />
      </div>

      {/* User Segments & Device Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Segments */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">User Segments</h3>
          <div className="space-y-4">
            {userSegments.map((segment, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: segment.color }}
                  />
                  <div>
                    <p className="font-medium text-slate-900">{segment.name}</p>
                    <p className="text-sm text-slate-500">{segment.userCount.toLocaleString()} users</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">{segment.percentage}%</p>
                  <p className="text-xs text-green-600">{segment.growth}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-slate-900">£89</p>
                <p className="text-sm text-slate-500">Avg Revenue Per User</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">15.2%</p>
                <p className="text-sm text-slate-500">Monthly Growth Rate</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Device Usage */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Device Usage</h3>
          <div className="space-y-4">
            {deviceStats.map((device, index) => {
              const Icon = device.icon
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-slate-600" />
                    <span className="font-medium text-slate-900">{device.type}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-900">{device.percentage}%</p>
                      <p className="text-xs text-slate-500">{device.userCount.toLocaleString()} users</p>
                    </div>
                    <div className="w-20 bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <h4 className="text-sm font-medium text-slate-700 mb-3">Operating Systems</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">iOS</span>
                <span className="font-medium">42.3%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Android</span>
                <span className="font-medium">26.1%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Windows</span>
                <span className="font-medium">18.7%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">macOS</span>
                <span className="font-medium">8.6%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Linux</span>
                <span className="font-medium">4.3%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Retention & Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Retention */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">User Retention</h3>
          <div className="space-y-4">
            {retentionData.map((period, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-16 text-sm font-medium text-slate-700">{period.period}</div>
                  <div className="flex-1 bg-slate-200 rounded-full h-2 min-w-[120px]">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${period.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="text-right min-w-[80px]">
                  <p className="text-sm font-medium text-slate-900">{period.percentage}%</p>
                  <p className="text-xs text-slate-500">{period.users} users</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">28.4%</p>
              <p className="text-sm text-slate-500">30-day retention rate</p>
            </div>
          </div>
        </Card>

        {/* Top Pages */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Most Visited Pages</h3>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{page.page}</p>
                  <p className="text-sm text-slate-500">Avg. time: {page.avgTime}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">{page.visits.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">{page.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="ghost" size="sm" className="w-full mt-4">
            View All Pages
          </Button>
        </Card>
      </div>

      {/* Engagement Funnels */}
      <EngagementFunnels />
    </div>
  )
}