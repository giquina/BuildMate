// Admin Dashboard Charts Component for BuildMate Platform
'use client'

import { useState } from 'react'
import { Card } from './Card'
import { Button } from './Button'
import { TrendingUp, TrendingDown, BarChart3, PieChart } from 'lucide-react'

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor?: string
    backgroundColor?: string
  }[]
}

export default function AdminDashboardCharts() {
  const [revenueTimeframe, setRevenueTimeframe] = useState('30d')
  const [userTimeframe, setUserTimeframe] = useState('30d')

  // Mock chart data - in production, this would come from AdminService
  const revenueData: ChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Revenue',
      data: [8400, 9200, 11800, 12600],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)'
    }]
  }

  const userGrowthData: ChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'New Users',
      data: [45, 52, 38, 67, 73, 89, 61],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)'
    }]
  }

  const subscriptionData = [
    { name: 'Free', value: 8420, percentage: 65.5, color: '#E5E7EB' },
    { name: 'Pro', value: 3890, percentage: 30.3, color: '#3B82F6' },
    { name: 'Enterprise', value: 537, percentage: 4.2, color: '#10B981' }
  ]

  const projectStatusData = [
    { name: 'Planning', value: 1240, color: '#F59E0B' },
    { name: 'Design', value: 890, color: '#8B5CF6' },
    { name: 'Materials', value: 670, color: '#06B6D4' },
    { name: 'Building', value: 456, color: '#10B981' },
    { name: 'Completed', value: 234, color: '#6B7280' }
  ]

  const SimpleBarChart = ({ data, title }: { data: ChartData, title: string }) => {
    const maxValue = Math.max(...data.datasets[0].data)
    
    return (
      <div>
        <h4 className="text-sm font-medium text-slate-700 mb-4">{title}</h4>
        <div className="space-y-3">
          {data.labels.map((label, index) => {
            const value = data.datasets[0].data[index]
            const percentage = (value / maxValue) * 100
            
            return (
              <div key={label} className="flex items-center space-x-3">
                <div className="w-16 text-xs text-slate-600">{label}</div>
                <div className="flex-1 bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-12 text-xs text-slate-600 text-right">
                  {value.toLocaleString()}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const SimplePieChart = ({ data, title }: { data: any[], title: string }) => {
    return (
      <div>
        <h4 className="text-sm font-medium text-slate-700 mb-4">{title}</h4>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-slate-700">{item.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-slate-900">
                  {item.value.toLocaleString()}
                </div>
                {item.percentage && (
                  <div className="text-xs text-slate-500">
                    {item.percentage}%
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Revenue Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-slate-900">Revenue Trends</h3>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={revenueTimeframe === '7d' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setRevenueTimeframe('7d')}
            >
              7D
            </Button>
            <Button
              variant={revenueTimeframe === '30d' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setRevenueTimeframe('30d')}
            >
              30D
            </Button>
            <Button
              variant={revenueTimeframe === '90d' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setRevenueTimeframe('90d')}
            >
              90D
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-2xl font-bold text-slate-900">£47,230</div>
          <div className="flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+12.4%</span>
            <span className="text-slate-500 ml-1">from last month</span>
          </div>
        </div>

        <SimpleBarChart data={revenueData} title="Weekly Revenue (£)" />
      </Card>

      {/* User Growth Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-900">User Growth</h3>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={userTimeframe === '7d' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setUserTimeframe('7d')}
            >
              7D
            </Button>
            <Button
              variant={userTimeframe === '30d' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setUserTimeframe('30d')}
            >
              30D
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-2xl font-bold text-slate-900">12,847</div>
          <div className="flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-blue-600 font-medium">+8.2%</span>
            <span className="text-slate-500 ml-1">total users</span>
          </div>
        </div>

        <SimpleBarChart data={userGrowthData} title="Daily New Registrations" />
      </Card>

      {/* Subscription Distribution */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <PieChart className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-slate-900">Subscription Tiers</h3>
        </div>

        <SimplePieChart data={subscriptionData} title="User Distribution" />

        <div className="mt-6 pt-4 border-t border-slate-200">
          <div className="text-sm text-slate-600">
            <span className="font-medium">Average Revenue Per User:</span> £3.67/month
          </div>
        </div>
      </Card>

      {/* Project Status Distribution */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <BarChart3 className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-slate-900">Project Status</h3>
        </div>

        <SimplePieChart data={projectStatusData} title="Active Projects by Stage" />

        <div className="mt-6 pt-4 border-t border-slate-200">
          <div className="text-sm text-slate-600">
            <span className="font-medium">Total Active Projects:</span> 3,490
          </div>
        </div>
      </Card>
    </>
  )
}