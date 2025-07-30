'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { formatCurrency } from '@/lib/uk-utils'
import { 
  Plus, 
  TrendingUp, 
  ShoppingCart, 
  Clock, 
  CheckCircle, 
  Home, 
  Users, 
  Download, 
  Star,
  Calendar,
  MessageCircle,
  MapPin,
  Camera,
  Bell,
  Truck,
  Eye,
  Edit3,
  ChevronRight,
  Phone,
  Video,
  FileText,
  AlertCircle,
  Navigation,
  User,
  Package,
  Image as ImageIcon,
  Zap,
  Activity,
  Timer,
  PoundSterling,
  Shield,
  Heart,
  Send,
  Map,
  Play,
  Trophy,
  Award,
  Share2,
  ThumbsUp,
  Target,
  Gift,
  Sparkles,
  ShoppingBag,
  Bookmark,
  PartyPopper,
  Medal,
  Crown,
  Flame,
  TrendingDown,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  X,
  Settings,
  Volume2,
  VolumeX,
  Link,
  Copy,
  Download as DownloadIcon
} from 'lucide-react'

// Types
interface Project {
  id: string
  name: string
  type: 'new_build' | 'renovation' | 'extension'
  location: string
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold'
  progress: number
  currentWeek: number
  totalWeeks: number
  currentPhase: string
  nextMilestone: string
  nextMilestoneWeeks: number
  budget: number
  spent: number
  remaining: number
  teamOnSite: boolean
  lastActivity: string
  lastActivityTime: string
  builderName: string
  builderStatus: 'on_site' | 'en_route' | 'off_site'
  createdAt: string
  lastUpdated: string
}

interface TeamUpdate {
  id: string
  author: string
  message: string
  timestamp: string
  type: 'photo' | 'text' | 'milestone' | 'delivery'
  image?: string
}

interface Celebration {
  id: string
  type: 'milestone' | 'budget_savings' | 'timeline_achievement' | 'phase_completion' | 'streak'
  title: string
  description: string
  value?: string
  achievement?: string
  shareText?: string
  isActive: boolean
  timestamp: string
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned: boolean
  earnedDate?: string
  category: 'milestone' | 'budget' | 'timeline' | 'collaboration' | 'streak'
}

interface SuccessMetric {
  id: string
  title: string
  value: string
  improvement: string
  icon: string
  color: string
}

interface CelebrationSettings {
  enableCelebrations: boolean
  enableSounds: boolean
  celebrationFrequency: 'all' | 'major' | 'minimal'
  enableSharing: boolean
}

interface Delivery {
  id: string
  item: string
  status: 'ordered' | 'in_transit' | 'delivered' | 'delayed'
  expectedDate: string
  trackingNumber?: string
}

// Mock data - in a real app this would come from an API
const mockProject: Project = {
  id: '1',
  name: 'Dream Home Build',
  type: 'new_build',
  location: 'Surrey Hills, KT21',
  status: 'in_progress',
  progress: 15,
  currentWeek: 12,
  totalWeeks: 78,
  currentPhase: 'Foundation Complete',
  nextMilestone: 'Frame Installation',
  nextMilestoneWeeks: 2,
  budget: 450000,
  spent: 67500,
  remaining: 382500,
  teamOnSite: true,
  lastActivity: 'James posted update',
  lastActivityTime: '2 hours ago',
  builderName: 'James Mitchell',
  builderStatus: 'on_site',
  createdAt: '2024-01-15',
  lastUpdated: '2024-07-23'
}

const mockCelebrations: Celebration[] = [
  {
    id: '1',
    type: 'milestone',
    title: 'Foundation Complete!',
    description: 'Major milestone achieved ahead of schedule',
    achievement: 'Foundation Master',
    shareText: 'Just completed the foundation for my dream home build! 🏗️ #BuildMate #DreamHome',
    isActive: true,
    timestamp: '2024-07-23T10:00:00Z'
  },
  {
    id: '2',
    type: 'budget_savings',
    title: 'Budget Champion!',
    description: 'You\'re £15,000 under budget so far',
    value: '£15,000',
    shareText: 'Staying under budget on my home build thanks to smart planning! 💰 #BuildMate #SmartBuilding',
    isActive: false,
    timestamp: '2024-07-20T14:30:00Z'
  }
]

const mockAchievements: Achievement[] = [
  { id: '1', title: 'Foundation Master', description: 'Complete foundation phase ahead of schedule', icon: 'trophy', earned: true, earnedDate: '2024-07-23', category: 'milestone' },
  { id: '2', title: 'Budget Ninja', description: 'Stay under budget for 4 consecutive weeks', icon: 'target', earned: true, earnedDate: '2024-07-20', category: 'budget' },
  { id: '3', title: 'Communication Pro', description: 'Exchange 50+ messages with your team', icon: 'message-circle', earned: true, earnedDate: '2024-07-18', category: 'collaboration' },
  { id: '4', title: 'Early Bird', description: 'Complete 3 milestones ahead of schedule', icon: 'clock', earned: false, category: 'timeline' },
  { id: '5', title: 'Streak Master', description: 'Check dashboard for 30 consecutive days', icon: 'flame', earned: false, category: 'streak' },
  { id: '6', title: 'Photo Enthusiast', description: 'Share 100 project photos', icon: 'camera', earned: false, category: 'collaboration' }
]

const mockSuccessMetrics: SuccessMetric[] = [
  { id: '1', title: 'Money Saved', value: '£15,000', improvement: '+12% vs budget', icon: 'dollar-sign', color: 'green' },
  { id: '2', title: 'Time Saved', value: '2.5 weeks', improvement: 'Ahead of schedule', icon: 'clock', color: 'blue' },
  { id: '3', title: 'Quality Score', value: '9.8/10', improvement: '+0.3 this month', icon: 'star', color: 'yellow' },
  { id: '4', title: 'Team Rating', value: '4.9/5', improvement: 'Excellent feedback', icon: 'heart', color: 'red' }
]

const mockTeamUpdates: TeamUpdate[] = [
  {
    id: '1',
    author: 'James Mitchell',
    message: 'Foundation inspection completed successfully! Ready for next phase.',
    timestamp: '2 hours ago',
    type: 'milestone',
    image: '/api/placeholder/300/200'
  },
  {
    id: '2',
    author: 'Sarah Wilson',
    message: 'Concrete delivery scheduled for tomorrow morning at 8 AM.',
    timestamp: '4 hours ago',
    type: 'delivery'
  },
  {
    id: '3',
    author: 'Mike Thompson',
    message: 'Progress photos from today\'s work',
    timestamp: '6 hours ago',
    type: 'photo',
    image: '/api/placeholder/300/200'
  },
  {
    id: '4',
    author: 'James Mitchell',
    message: 'Weather looks good for the rest of the week. Full steam ahead!',
    timestamp: '1 day ago',
    type: 'text'
  }
]

const mockDeliveries: Delivery[] = [
  {
    id: '1',
    item: 'Steel Frame Components',
    status: 'in_transit',
    expectedDate: '2024-07-25',
    trackingNumber: 'TK789456123'
  },
  {
    id: '2',
    item: 'Concrete Mix (40 bags)',
    status: 'ordered',
    expectedDate: '2024-07-24'
  },
  {
    id: '3',
    item: 'Foundation Waterproofing',
    status: 'delivered',
    expectedDate: '2024-07-22'
  }
]

// Helper functions
const getDeliveryStatusColor = (status: string) => {
  switch (status) {
    case 'delivered': return 'bg-green-100 text-green-800'
    case 'in_transit': return 'bg-blue-100 text-blue-800'
    case 'ordered': return 'bg-yellow-100 text-yellow-800'
    case 'delayed': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getBuilderStatusDisplay = (status: string) => {
  switch (status) {
    case 'on_site': return { text: 'On Site', color: 'text-green-600', dot: 'bg-green-500' }
    case 'en_route': return { text: 'En Route', color: 'text-blue-600', dot: 'bg-blue-500' }
    case 'off_site': return { text: 'Off Site', color: 'text-gray-600', dot: 'bg-gray-400' }
    default: return { text: 'Unknown', color: 'text-gray-600', dot: 'bg-gray-400' }
  }
}

const getUpdateIcon = (type: string) => {
  switch (type) {
    case 'photo': return Camera
    case 'milestone': return CheckCircle
    case 'delivery': return Truck
    default: return MessageCircle
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const [project] = useState<Project>(mockProject)
  const [teamUpdates] = useState<TeamUpdate[]>(mockTeamUpdates)
  const [deliveries] = useState<Delivery[]>(mockDeliveries)
  const [showNotifications, setShowNotifications] = useState(false)

  // Real-time effects
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates - in production this would be WebSocket/SSE
      setShowNotifications(true)
      setTimeout(() => setShowNotifications(false), 3000)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const builderStatus = getBuilderStatusDisplay(project.builderStatus)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Real-time Status */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
              <div className="flex items-center space-x-4 mt-1">
                <p className="text-gray-600">{project.location}</p>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${builderStatus.dot} animate-pulse`}></div>
                  <span className={`text-sm font-medium ${builderStatus.color}`}>
                    {project.builderName} • {builderStatus.text}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                className="relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-4 w-4" />
                {showNotifications && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                )}
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => alert('Contacting team...')}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Team
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Project Tracking */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Timeline - Uber Style */}
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Main Progress Bar */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <h2 className="text-xl font-bold text-gray-900">
                        Week {project.currentWeek} of {project.totalWeeks}
                      </h2>
                      <span className="text-sm text-gray-600">{project.progress}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-500 relative"
                        style={{ width: `${(project.currentWeek / project.totalWeeks) * 100}%` }}
                      >
                        <div className="absolute right-0 top-0 w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Current Phase Status */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-900">Current Phase</span>
                      </div>
                      <p className="text-lg font-bold text-green-900">{project.currentPhase}</p>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Timer className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Next Milestone</span>
                      </div>
                      <p className="text-lg font-bold text-blue-900">{project.nextMilestone}</p>
                      <p className="text-sm text-blue-700">{project.nextMilestoneWeeks} weeks</p>
                    </div>
                  </div>

                  {/* Budget Status - Uber Style */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">Budget Tracking</h3>
                      <span className="text-sm font-medium text-green-600">On Budget</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-600">Total Budget</p>
                        <p className="font-bold text-gray-900">{formatCurrency(project.budget)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Spent</p>
                        <p className="font-bold text-gray-900">{formatCurrency(project.spent)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Remaining</p>
                        <p className="font-bold text-green-600">{formatCurrency(project.remaining)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Activity Feed */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Team Activity</span>
                  </CardTitle>
                  <span className="text-sm text-gray-500">{project.lastActivity} • {project.lastActivityTime}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamUpdates.map((update) => {
                  const UpdateIcon = getUpdateIcon(update.type)
                  return (
                    <div key={update.id} className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <UpdateIcon className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium text-gray-900">{update.author}</p>
                          <span className="text-xs text-gray-500">{update.timestamp}</span>
                        </div>
                        <p className="text-gray-700">{update.message}</p>
                        {update.image && (
                          <div className="mt-2">
                            <img 
                              src={update.image} 
                              alt="Progress update" 
                              className="w-24 h-16 object-cover rounded cursor-pointer hover:scale-105 transition-transform"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Delivery Tracking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="h-5 w-5" />
                  <span>Material Deliveries</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {deliveries.map((delivery) => (
                  <div key={delivery.id} className="flex items-center justify-between p-3 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-center space-x-3">
                      <Package className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{delivery.item}</p>
                        <p className="text-sm text-gray-600">Expected: {new Date(delivery.expectedDate).toLocaleDateString('en-GB')}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDeliveryStatusColor(delivery.status)}`}>
                        {delivery.status.replace('_', ' ')}
                      </span>
                      {delivery.trackingNumber && (
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          Track
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact My Team
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Truck className="h-4 w-4 mr-2" />
                  View Materials Delivery
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Site Visit
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Camera className="h-4 w-4 mr-2" />
                  Project Photos
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Modify Timeline
                </Button>
              </CardContent>
            </Card>

            {/* Team Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Team Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="font-medium">{project.builderName}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${builderStatus.dot} animate-pulse`}></div>
                      <span className={`text-sm ${builderStatus.color}`}>{builderStatus.text}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" size="sm">
                    <Navigation className="h-4 w-4 mr-2" />
                    View on Map
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Real-time Notifications */}
            {showNotifications && (
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Bell className="h-5 w-5 text-blue-600 mt-0.5 animate-pulse" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">Live Update</h4>
                      <p className="text-sm text-blue-800">
                        Your builder just arrived on site and started today's work.
                      </p>
                      <p className="text-xs text-blue-600 mt-1">Just now</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Saved Items & Wishlist */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5" />
                    <span>Saved Items</span>
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={() => router.push('/wishlist')}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <Package className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Premium Oak Flooring</div>
                      <div className="text-xs text-gray-600">Saved 2 days ago</div>
                    </div>
                    <div className="text-sm font-medium">{formatCurrency(45.99)}</div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                      <Shield className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Security System</div>
                      <div className="text-xs text-gray-600">Saved 5 days ago</div>
                    </div>
                    <div className="text-sm font-medium">{formatCurrency(899.99)}</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full justify-start">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add Saved Items to Cart
                </Button>
              </CardContent>
            </Card>

            {/* Communication Hub */}
            <Card>
              <CardHeader>
                <CardTitle>Stay Connected</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Call {project.builderName}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Video Call Team
                </Button>
           
                <Button variant="outline" className="w-full justify-start">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Project Insights */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900 mb-1">Project Health</h4>
                    <p className="text-sm text-green-800 mb-2">
                      Your project is on track and within budget. Great progress!
                    </p>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-700">All systems go</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}