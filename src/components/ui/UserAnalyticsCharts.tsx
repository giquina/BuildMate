// User Analytics Charts Component for BuildMate AI Admin
'use client'

import { useState, useEffect } from 'react'
import { Card } from './Card'
import { Button } from './Button'
import { TrendingUp, Users, Activity, BarChart3 } from 'lucide-react'

interface UserAnalyticsChartsProps {
  timeRange: string
}

interface ChartDataPoint {
  date: string
  newUsers: number
  activeUsers: number
  sessions: number
}

export default function UserAnalyticsCharts({ timeRange }: UserAnalyticsChartsProps) {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [activeChart, setActiveChart] = useState<'registrations' | 'activity'>('registrations')

  useEffect(() => {
    // Generate mock data based on time range
    const generateMockData = () => {
      const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
      const data: ChartDataPoint[] = []
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        
        // Generate realistic-looking data with some variance
        const baseNewUsers = 18 + (Math.sin(i * 0.3) * 8)
        const baseActiveUsers = 280 + (Math.sin(i * 0.2) * 50)
        const baseSessions = 420 + (Math.sin(i * 0.25) * 80)
        
        data.push({
          date: date.toISOString().split('T')[0],
          newUsers: Math.max(0, Math.round(baseNewUsers + (Math.random() - 0.5) * 10)),
          activeUsers: Math.max(0, Math.round(baseActiveUsers + (Math.random() - 0.5) * 60)),
          sessions: Math.max(0, Math.round(baseSessions + (Math.random() - 0.5) * 100))
        })
      }
      
      setChartData(data)
    }

    generateMockData()
  }, [timeRange])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    if (timeRange === '7d') {
      return date.toLocaleDateString('en-GB', { weekday: 'short' })
    } else if (timeRange === '30d') {
      return date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })
    } else {
      return date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })
    }
  }

  const BarChart = ({ data, dataKey, color, title }: { 
    data: ChartDataPoint[]
    dataKey: keyof ChartDataPoint
    color: string
    title: string
  }) => {
    const maxValue = Math.max(...data.map(d => d[dataKey] as number))
    
    return (
      <div>
        <h4 className="text-sm font-medium text-slate-700 mb-4">{title}</h4>
        <div className="flex items-end space-x-1 h-40">
          {data.map((point, index) => {
            const value = point[dataKey] as number
            const height = (value / maxValue) * 100
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div className="w-full flex flex-col justify-end h-32">
                  <div 
                    className={`w-full rounded-t transition-all duration-300 group-hover:opacity-80 ${color}`}
                    style={{ height: `${height}%` }}
                  />
                </div>
                <div className="text-xs text-slate-500 mt-1 truncate w-full text-center">
                  {formatDate(point.date)}
                </div>
                <div className="absolute bg-slate-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity -translate-y-8 pointer-events-none">
                  {value.toLocaleString()}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const LineChart = ({ data, dataKey, color, title }: { 
    data: ChartDataPoint[]
    dataKey: keyof ChartDataPoint
    color: string
    title: string
  }) => {
    const maxValue = Math.max(...data.map(d => d[dataKey] as number))
    const minValue = Math.min(...data.map(d => d[dataKey] as number))
    const range = maxValue - minValue
    
    return (
      <div>
        <h4 className="text-sm font-medium text-slate-700 mb-4">{title}</h4>
        <div className="relative h-40">
          <svg className="w-full h-32" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`gradient-${dataKey}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.05 }} />
              </linearGradient>
            </defs>
            
            {/* Area under the line */}
            <path
              d={`M 0 100 ${data.map((point, index) => {
                const x = (index / (data.length - 1)) * 100
                const y = 100 - (((point[dataKey] as number) - minValue) / range) * 100
                return `L ${x} ${y}`
              }).join(' ')} L 100 100 Z`}
              fill={`url(#gradient-${dataKey})`}
            />
            
            {/* Line */}
            <path
              d={`M ${data.map((point, index) => {
                const x = (index / (data.length - 1)) * 100
                const y = 100 - (((point[dataKey] as number) - minValue) / range) * 100
                return `${x} ${y}`
              }).join(' L ')}`}
              fill="none"
              stroke={color}
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            
            {/* Data points */}
            {data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100
              const y = 100 - (((point[dataKey] as number) - minValue) / range) * 100
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="1.5"
                  fill={color}
                  vectorEffect="non-scaling-stroke"
                />
              )
            })}
          </svg>
          
          {/* X-axis labels */}
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            {data.map((point, index) => {
              if (index % Math.ceil(data.length / 6) === 0 || index === data.length - 1) {
                return (
                  <span key={index} className="truncate">
                    {formatDate(point.date)}
                  </span>
                )
              }
              return null
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* User Registrations Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-900">User Registrations</h3>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={activeChart === 'registrations' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveChart('registrations')}
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              Bars
            </Button>
            <Button
              variant={activeChart === 'activity' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveChart('activity')}
            >
              <TrendingUp className="w-4 h-4 mr-1" />
              Trend
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-2xl font-bold text-slate-900">
            {chartData.reduce((sum, point) => sum + point.newUsers, 0).toLocaleString()}
          </div>
          <div className="text-sm text-slate-500">Total new registrations</div>
        </div>

        {activeChart === 'registrations' ? (
          <BarChart 
            data={chartData} 
            dataKey="newUsers" 
            color="bg-blue-500" 
            title="Daily New Registrations"
          />
        ) : (
          <LineChart 
            data={chartData} 
            dataKey="newUsers" 
            color="#3B82F6" 
            title="Registration Trend"
          />
        )}
      </Card>

      {/* User Activity Chart */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Activity className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-slate-900">User Activity</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-2xl font-bold text-slate-900">
              {Math.round(chartData.reduce((sum, point) => sum + point.activeUsers, 0) / chartData.length).toLocaleString()}
            </div>
            <div className="text-sm text-slate-500">Avg daily active users</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">
              {Math.round(chartData.reduce((sum, point) => sum + point.sessions, 0) / chartData.length).toLocaleString()}
            </div>
            <div className="text-sm text-slate-500">Avg daily sessions</div>
          </div>
        </div>

        <LineChart 
          data={chartData} 
          dataKey="activeUsers" 
          color="#10B981" 
          title="Daily Active Users"
        />
      </Card>
    </>
  )
}