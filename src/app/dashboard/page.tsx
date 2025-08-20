'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { AnimatedProgressBar } from '@/components/ui/AnimatedProgressBar'
import { AchievementBadge, defaultAchievements, type Achievement } from '@/components/ui/AchievementBadge'
import { SkeletonDashboard } from '@/components/ui/SkeletonLoader'
import { EmptyState } from '@/components/ui/EmptyState'
import { Breadcrumbs, useBreadcrumbs } from '@/components/ui/Breadcrumbs'
import { WelcomeFlow } from '@/components/ui/WelcomeFlow'
import { formatCurrency } from '@/lib/uk-utils'
import { useUser, useUserProjects, useFreemium } from '@/contexts/UserContext'
import { XPDisplay, BadgeCollection, FreemiumSystem, useFeatureAccess, BadgeSystem, DailyChallenges } from '@/components/ui'
import { useNotifications, useXPNotification } from '@/components/ui/NotificationSystem'
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
    shareText: 'Just completed the foundation for my dream home build! 🏗️ #BuildMate AI #DreamHome',
    isActive: true,
    timestamp: '2024-07-23T10:00:00Z'
  },
  {
    id: '2',
    type: 'budget_savings',
    title: 'Budget Champion!',
    description: 'You\'re £15,000 under budget so far',
    value: '£15,000',
    shareText: 'Staying under budget on my home build thanks to smart planning! 💰 #BuildMate AI #SmartBuilding',
    isActive: false,
    timestamp: '2024-07-20T14:30:00Z'
  }
]

// Achievement state with some earned achievements
const mockAchievements: Achievement[] = [
  { ...defaultAchievements[0], earned: true, earnedDate: new Date('2024-07-23') }, // First Project
  { ...defaultAchievements[1], earned: true, earnedDate: new Date('2024-07-20') }, // Smart Architect
  { ...defaultAchievements[2], earned: true, earnedDate: new Date('2024-07-18') }, // Professional Network
  { ...defaultAchievements[3], earned: false }, // Budget Master
  { ...defaultAchievements[4], earned: false }, // Project Complete
  { ...defaultAchievements[5], earned: true, earnedDate: new Date('2024-01-15') } // Early Adopter
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
  const pathname = usePathname()
  const { user, isAuthenticated } = useUser()
  const { projects, isLoading } = useUserProjects()
  const freemium = useFreemium()
  const { addNotification } = useNotifications()
  const addXPNotification = useXPNotification()
  
  const [teamUpdates] = useState<TeamUpdate[]>(mockTeamUpdates)
  const [deliveries] = useState<Delivery[]>(mockDeliveries)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [isFirstVisit, setIsFirstVisit] = useState(false)
  
  const breadcrumbs = useBreadcrumbs(pathname)

  // Real-time effects - must be called before any early returns
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates - in production this would be WebSocket/SSE
      setShowNotifications(true)
      setTimeout(() => setShowNotifications(false), 3000)
    }, 30000)

    return () => clearInterval(interval)
  }, [])
  
  // Check if user is new and should see welcome flow
  useEffect(() => {
    if (user && projects) {
      const hasSeenWelcome = localStorage.getItem(`welcome-seen-${user.id}`)
      const isNewUser = projects.length === 0 && !hasSeenWelcome
      
      if (isNewUser) {
        setIsFirstVisit(true)
        setShowWelcome(true)
      }
    }
  }, [user, projects])
  
  // Use first project if available, otherwise fallback to mock
  const project = projects.length > 0 ? {
    ...mockProject,
    id: projects[0].id,
    name: projects[0].name,
    type: projects[0].type,
    location: projects[0].location,
    status: projects[0].status,
    progress: projects[0].progress,
    budget: projects[0].budget,
    currentPhase: projects[0].status === 'completed' ? 'Project Complete' : 
                  projects[0].status === 'in_progress' ? 'Construction Phase' : 'Planning Phase',
    nextMilestone: projects[0].status === 'completed' ? 'Complete' : 'Next Phase',
    spent: Math.floor(projects[0].budget * (projects[0].progress / 100)),
    remaining: projects[0].budget - Math.floor(projects[0].budget * (projects[0].progress / 100))
  } : mockProject

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">Please log in to access your dashboard.</p>
          <Button onClick={() => router.push('/')}>
            Go to Home
          </Button>
        </div>
      </div>
    )
  }

  // Show loading state with skeleton
  if (isLoading) {
    return <SkeletonDashboard />
  }

  const handleWelcomeComplete = () => {
    setShowWelcome(false)
    if (user) {
      localStorage.setItem(`welcome-seen-${user.id}`, 'true')
    }
    // Redirect to configure page to start first project
    router.push('/configure')
  }
  
  const handleWelcomeClose = () => {
    setShowWelcome(false)
    if (user) {
      localStorage.setItem(`welcome-seen-${user.id}`, 'true')
    }
  }
  
  // Show empty state if no projects
  if (projects.length === 0 && !isFirstVisit) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />
          
          <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
            <EmptyState
              icon={Home}
              title="Welcome to BuildMate!"
              description="You don't have any projects yet. Let's start by creating your first project and begin your building journey."
              actionLabel="Create Your First Project"
              onAction={() => router.push('/configure')}
              secondaryActionLabel="Browse Materials"
              onSecondaryAction={() => router.push('/materials')}
            >
              <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl mb-2">🏠</div>
                  <div className="text-sm font-medium text-blue-900">Design</div>
                  <div className="text-xs text-blue-700">Smart layouts</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl mb-2">🛒</div>
                  <div className="text-sm font-medium text-green-900">Shop</div>
                  <div className="text-xs text-green-700">Compare prices</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl mb-2">👷</div>
                  <div className="text-sm font-medium text-orange-900">Build</div>
                  <div className="text-xs text-orange-700">Find pros</div>
                </div>
              </div>
            </EmptyState>
          </div>
        </div>
        
        <WelcomeFlow 
          isOpen={showWelcome}
          onClose={handleWelcomeClose}
          onComplete={handleWelcomeComplete}
        />
      </div>
    )
  }

  const builderStatus = getBuilderStatusDisplay(project.builderStatus)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Real-time Status */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="mb-2">
                <p className="text-sm text-gray-600">Welcome back, {user?.name}!</p>
                {projects.length > 1 && (
                  <p className="text-xs text-gray-500">Managing {projects.length} projects</p>
                )}
              </div>
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
        {/* Welcome message with XP and Level Display */}
        {user && projects.length > 0 && (
          <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-blue-900">
                  Welcome back, {user.name?.split(' ')[0]}! 👋
                </h2>
                <p className="text-blue-700 text-sm">
                  You have {projects.length} active project{projects.length !== 1 ? 's' : ''} in progress.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {/* XP and Level Display */}
                <div className="text-right">
                  <XPDisplay showDetails={false} />
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-blue-900">
                    {user.subscription === 'free' ? 'Free Plan' : 
                     user.subscription === 'pro' ? 'Pro Plan' : 'Enterprise Plan'}
                  </div>
                  <div className="text-xs text-blue-600">
                    {user.subscription === 'free' ? 'Upgrade for more features' : 'All features unlocked'}
                  </div>
                </div>
                {user.subscription === 'free' && (
                  <Button size="sm" onClick={() => router.push('/pricing')}>
                    Upgrade
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
        {projects.length > 1 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Home className="h-5 w-5" />
                <span>All Projects</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((proj) => (
                  <div 
                    key={proj.id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      proj.id === project.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => {
                      // In a real app, you'd update the selected project
                      console.log('Switch to project:', proj.name)
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        proj.status === 'completed' ? 'bg-green-100 text-green-800' :
                        proj.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        proj.status === 'on_hold' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {proj.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{proj.type.replace('_', ' ').toUpperCase()}</p>
                    <p className="text-sm text-gray-600 mb-3">{proj.location}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress:</span>
                        <span className="font-medium">{proj.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all" 
                          style={{ width: `${proj.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Budget:</span>
                        <span className="font-medium">{formatCurrency(proj.budget)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Project Tracking */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Daily Challenges Section - New */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Daily Challenges</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DailyChallenges 
                  challenges={[]} 
                  streaks={[]}
                  onChallengeComplete={(challengeId) => {
                    console.log('Challenge completed:', challengeId)
                    addXPNotification(50, 'Challenge completed!')
                  }}
                  onClaimReward={(challengeId) => {
                    console.log('Reward claimed:', challengeId)
                    addNotification({
                      type: 'badge',
                      title: 'Badge Unlocked!',
                      message: 'Challenge Master badge earned!',
                      badge: '🏆',
                      duration: 5000
                    })
                  }}
                />
              </CardContent>
            </Card>
            {/* Progress Timeline - Uber Style */}
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Project Progress */}
                  <div className="space-y-4">
                    <AnimatedProgressBar
                      value={(project.currentWeek / project.totalWeeks) * 100}
                      label={`Week ${project.currentWeek} of ${project.totalWeeks}`}
                      description="Overall project timeline progress"
                      color="blue"
                      size="lg"
                      animationDuration={1500}
                    />
                    <AnimatedProgressBar
                      value={project.progress}
                      label="Phase Completion"
                      description={`${project.currentPhase} progress`}
                      color="green"
                      size="md"
                      animationDuration={1200}
                    />
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

                  {/* Budget Tracking */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">Budget Tracking</h3>
                      <span className="text-sm font-medium text-green-600">On Budget</span>
                    </div>
                    <AnimatedProgressBar
                      value={(project.spent / project.budget) * 100}
                      label="Budget Usage"
                      description={`${formatCurrency(project.spent)} of ${formatCurrency(project.budget)} spent`}
                      color="orange"
                      size="md"
                      animationDuration={1800}
                    />
                    <div className="grid grid-cols-3 gap-4 text-center mt-4">
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

            {/* Badge Collection Section - Enhanced */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span>Badge Collection</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <BadgeCollection limit={5} />
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="sm"
                  onClick={() => {
                    // Demo: Add a badge notification
                    addNotification({
                      type: 'badge',
                      title: 'New Badge Preview!',
                      message: 'This is how badge notifications work',
                      badge: '🎯',
                      duration: 4000
                    })
                  }}
                >
                  <Award className="h-4 w-4 mr-2" />
                  View All Badges
                </Button>
              </CardContent>
            </Card>

            {/* Project Health + Quick XP Actions */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-green-900 mb-1">Project Health</h4>
                    <p className="text-sm text-green-800 mb-2">
                      Your project is on track and within budget. Great progress!
                    </p>
                    <AnimatedProgressBar
                      value={87}
                      label="Health Score"
                      color="green"
                      size="sm"
                      className="mb-2"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span className="text-xs text-green-700">All systems go</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          addXPNotification(25, 'Daily check-in completed!')
                        }}
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        +25 XP
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Gamification Demo Actions */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-purple-900 mb-3">🎮 Test Gamification Features</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => addXPNotification(50, 'Project milestone reached!')}
                  >
                    +50 XP Test
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      addNotification({
                        type: 'level_up',
                        title: 'Level 3 Reached!',
                        message: 'You\'ve unlocked new features!',
                        duration: 5000
                      })
                    }}
                  >
                    Level Up Test
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      addNotification({
                        type: 'upgrade',
                        title: 'Upgrade Required',
                        message: 'You\'ve reached your daily AI limit',
                        duration: 0,
                        actions: [{
                          label: 'Upgrade Now',
                          onClick: () => router.push('/pricing'),
                          variant: 'primary'
                        }]
                      })
                    }}
                  >
                    Upgrade Test
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      addNotification({
                        type: 'warning',
                        title: 'Streak Warning!',
                        message: 'Complete a challenge today to maintain your 7-day streak',
                        duration: 6000
                      })
                    }}
                  >
                    Warning Test
                  </Button>
                </div>
                <p className="text-xs text-purple-600 mt-2">
                  These buttons demonstrate the gamification notification system
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Wrap in FreemiumSystem for upgrade prompts */}
        <FreemiumSystem feature="projects">
          <WelcomeFlow 
            isOpen={showWelcome}
            onClose={handleWelcomeClose}
            onComplete={handleWelcomeComplete}
          />
        </FreemiumSystem>
      </div>
    </div>
  )
}