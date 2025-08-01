// Main Admin Dashboard Page for BuildMate Platform
'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  TrendingUp, 
  CreditCard, 
  Shield, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import AdminDashboardCharts from '../../components/ui/AdminDashboardCharts'

interface DashboardMetric {
  label: string
  value: string
  change: string
  changeType: 'increase' | 'decrease' | 'neutral'
  icon: any
  color: string
}

interface SystemStatus {
  name: string
  status: 'operational' | 'degraded' | 'down'
  responseTime: string
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [metrics, setMetrics] = useState<DashboardMetric[]>([])
  const [systemStatus, setSystemStatus] = useState<SystemStatus[]>([])

  useEffect(() => {
    // Simulate loading dashboard data
    const loadDashboardData = async () => {
      setIsLoading(true)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data - in production, this would come from AdminService
      setMetrics([
        {
          label: 'Total Users',
          value: '12,847',
          change: '+8.2%',
          changeType: 'increase',
          icon: Users,
          color: 'blue'
        },
        {
          label: 'Monthly Revenue',
          value: '£47,230',
          change: '+12.4%',
          changeType: 'increase',
          icon: CreditCard,
          color: 'green'
        },
        {
          label: 'Active Projects',
          value: '3,421',
          change: '+5.7%',
          changeType: 'increase',
          icon: TrendingUp,
          color: 'purple'
        },
        {
          label: 'Pending Verifications',
          value: '23',
          change: '-18.2%',
          changeType: 'decrease',
          icon: Shield,
          color: 'orange'
        }
      ])

      setSystemStatus([
        { name: 'API Service', status: 'operational', responseTime: '127ms' },
        { name: 'Database', status: 'operational', responseTime: '23ms' },
        { name: 'CDN', status: 'operational', responseTime: '89ms' },
        { name: 'Email Service', status: 'degraded', responseTime: '2.1s' },
        { name: 'Payment Gateway', status: 'operational', responseTime: '156ms' }
      ])

      setIsLoading(false)
    }

    loadDashboardData()
  }, [])

  const getStatusIcon = (status: SystemStatus['status']) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'degraded':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'down':
        return <AlertTriangle className="w-5 h-5 text-red-500" />
    }
  }

  const getStatusColor = (status: SystemStatus['status']) => {
    switch (status) {
      case 'operational':
        return 'text-green-700 bg-green-50'
      case 'degraded':
        return 'text-yellow-700 bg-yellow-50'
      case 'down':
        return 'text-red-700 bg-red-50'
    }
  }

  const getMetricColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'text-blue-600 bg-blue-50'
      case 'green':
        return 'text-green-600 bg-green-50'
      case 'purple':
        return 'text-purple-600 bg-purple-50'
      case 'orange':
        return 'text-orange-600 bg-orange-50'
      default:
        return 'text-slate-600 bg-slate-50'
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <div className="animate-pulse bg-slate-200 h-10 w-32 rounded-lg"></div>
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
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600 mt-1">
            Welcome back! Here's what's happening with BuildMate today.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Clock className="w-4 h-4 mr-2" />
            Last 30 days
          </Button>
          <Button size="sm">
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">
                    {metric.label}
                  </p>
                  <p className="text-3xl font-bold text-slate-900 mb-2">
                    {metric.value}
                  </p>
                  <div className="flex items-center">
                    {metric.changeType === 'increase' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </span>
                    <span className="text-sm text-slate-500 ml-1">from last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${getMetricColor(metric.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminDashboardCharts />
      </div>

      {/* System Status & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">System Status</h3>
            <div className="flex items-center text-green-600">
              <Activity className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">All Systems Operational</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {systemStatus.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center">
                  {getStatusIcon(service.status)}
                  <span className="ml-3 font-medium text-slate-900">{service.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-slate-500">{service.responseTime}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(service.status)}`}>
                    {service.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Recent Activity</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-slate-900">New professional verified</p>
                <p className="text-xs text-slate-500">John Smith - Builder from Manchester</p>
                <p className="text-xs text-slate-400">2 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-slate-900">Revenue milestone reached</p>
                <p className="text-xs text-slate-500">Monthly recurring revenue: £47,230</p>
                <p className="text-xs text-slate-400">1 hour ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-slate-900">High priority ticket</p>
                <p className="text-xs text-slate-500">Payment processing issue #1234</p>
                <p className="text-xs text-slate-400">3 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-slate-900">New feature released</p>
                <p className="text-xs text-slate-500">Smart cost prediction v2.0</p>
                <p className="text-xs text-slate-400">6 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-slate-900">Content published</p>
                <p className="text-xs text-slate-500">UK Building Regulations Guide updated</p>
                <p className="text-xs text-slate-400">1 day ago</p>
              </div>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" className="w-full mt-4">
            View all activity
          </Button>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
            <Users className="w-6 h-6 mb-2" />
            <span className="text-sm">Manage Users</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
            <Shield className="w-6 h-6 mb-2" />
            <span className="text-sm">Verify Professionals</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
            <TrendingUp className="w-6 h-6 mb-2" />
            <span className="text-sm">View Analytics</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
            <Activity className="w-6 h-6 mb-2" />
            <span className="text-sm">System Health</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}