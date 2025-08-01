'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { AnimatedProgressBar } from '@/components/ui/AnimatedProgressBar'
import { formatCurrency } from '@/lib/uk-utils'
import { useUser, useUserProjects } from '@/contexts/UserContext'
import { 
  Camera, 
  MapPin, 
  Mic, 
  Phone, 
  MessageCircle, 
  CheckCircle, 
  Timer, 
  Truck, 
  Home,
  Navigation,
  User,
  Package,
  Bell,
  Zap,
  Activity,
  Heart,
  Settings,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Battery,
  Signal,
  AlertTriangle,
  Shield,
  CloudRain,
  Thermometer,
  Wind,
  Eye,
  RotateCcw,
  Share2,
  Download,
  Upload,
  Play,
  Pause,
  Square,
  FileText,
  Image as ImageIcon,
  Send,
  PlusCircle,
  MinusCircle,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  MoreVertical,
  Grid3X3,
  List,
  Filter,
  Search,
  X,
  Calendar,
  Clock
} from 'lucide-react'

// Types for mobile dashboard
interface MobileProject {
  id: string
  name: string
  location: string
  progress: number
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold'
  currentPhase: string
  nextMilestone: string
  teamOnSite: boolean
  builderName: string
  lastUpdate: string
  urgentTasks: number
  todayTasks: number
}

interface QuickAction {
  id: string
  label: string
  icon: React.ComponentType<any>
  action: () => void
  color: string
  urgent?: boolean
}

interface SiteCondition {
  weather: string
  temperature: number
  conditions: string
  visibility: 'good' | 'fair' | 'poor'
  workable: boolean
}

// Mock data optimized for mobile construction use
const mockMobileProject: MobileProject = {
  id: '1',
  name: 'Surrey Extension',
  location: 'Surrey Hills, KT21',
  progress: 15,
  status: 'in_progress',
  currentPhase: 'Foundation',
  nextMilestone: 'Frame Install',
  teamOnSite: true,
  builderName: 'James M.',
  lastUpdate: '2h ago',
  urgentTasks: 2,
  todayTasks: 5
}

const mockSiteConditions: SiteCondition = {
  weather: 'Partly Cloudy',
  temperature: 16,
  conditions: 'Light winds, dry',
  visibility: 'good',
  workable: true
}

export default function MobileDashboard() {
  const router = useRouter()
  const { user, isAuthenticated } = useUser()
  const { projects, isLoading } = useUserProjects()
  
  // Mobile-specific state
  const [isRecording, setIsRecording] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline' | 'poor'>('online')
  const [highContrastMode, setHighContrastMode] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [currentView, setCurrentView] = useState<'overview' | 'tasks' | 'team' | 'photos'>('overview')
  const [gpsLocation, setGpsLocation] = useState<{lat: number, lng: number} | null>(null)
  const [batteryLevel, setBatteryLevel] = useState(100)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  // Photo capture state
  const [captureMode, setCaptureMode] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Use project data
  const project = projects.length > 0 ? {
    ...mockMobileProject,
    ...projects[0]
  } : mockMobileProject

  // Mobile-optimized quick actions for construction sites
  const quickActions: QuickAction[] = [
    {
      id: 'photo',
      label: 'Quick Photo',
      icon: Camera,
      action: () => setCaptureMode(true),
      color: 'bg-blue-600 hover:bg-blue-700',
      urgent: false
    },
    {
      id: 'voice',
      label: 'Voice Note',
      icon: isRecording ? Square : Mic,
      action: () => handleVoiceRecord(),
      color: isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700',
      urgent: false
    },
    {
      id: 'emergency',
      label: 'Emergency',
      icon: Phone,
      action: () => handleEmergencyCall(),
      color: 'bg-red-600 hover:bg-red-700',
      urgent: true
    },
    {
      id: 'team',
      label: 'Call Team',
      icon: MessageCircle,
      action: () => handleTeamCall(),
      color: 'bg-orange-600 hover:bg-orange-700',
      urgent: false
    },
    {
      id: 'location',
      label: 'Mark Location',
      icon: MapPin,
      action: () => handleLocationMark(),
      color: 'bg-purple-600 hover:bg-purple-700',
      urgent: false
    },
    {
      id: 'checklist',
      label: 'Tasks',
      icon: CheckCircle,
      action: () => setCurrentView('tasks'),
      color: 'bg-indigo-600 hover:bg-indigo-700',
      urgent: project.urgentTasks > 0
    }
  ]

  // Effects for mobile optimization
  useEffect(() => {
    // Monitor connection status
    const updateConnectionStatus = () => {
      if (!navigator.onLine) {
        setConnectionStatus('offline')
      } else if ('connection' in navigator) {
        const connection = (navigator as any).connection
        const effectiveType = connection?.effectiveType
        if (effectiveType === 'slow-2g' || effectiveType === '2g') {
          setConnectionStatus('poor')
        } else {
          setConnectionStatus('online')
        }
      }
    }

    updateConnectionStatus()
    window.addEventListener('online', updateConnectionStatus)
    window.addEventListener('offline', updateConnectionStatus)
    
    // Monitor battery level
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setBatteryLevel(Math.round(battery.level * 100))
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(Math.round(battery.level * 100))
        })
      })
    }

    // Get GPS location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => console.log('GPS error:', error),
        { enableHighAccuracy: true }
      )
    }

    return () => {
      window.removeEventListener('online', updateConnectionStatus)
      window.removeEventListener('offline', updateConnectionStatus)
    }
  }, [])

  // Mobile action handlers
  const handleVoiceRecord = () => {
    if (!isRecording) {
      setIsRecording(true)
      // Start recording logic here
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = true
        recognition.start()
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[event.results.length - 1][0].transcript
          console.log('Voice note:', transcript)
        }
        
        recognition.onend = () => {
          setIsRecording(false)
        }
      }
    } else {
      setIsRecording(false)
    }
  }

  const handleEmergencyCall = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200])
    }
    window.location.href = 'tel:999'
  }

  const handleTeamCall = () => {
    window.location.href = `tel:${project.builderName.replace(/\s+/g, '')}`
  }

  const handleLocationMark = () => {
    if (gpsLocation) {
      const locationData = {
        lat: gpsLocation.lat,
        lng: gpsLocation.lng,
        timestamp: new Date().toISOString(),
        project: project.id,
        phase: project.currentPhase
      }
      // Save location data to local storage for offline sync
      const savedLocations = JSON.parse(localStorage.getItem('construction_locations') || '[]')
      savedLocations.push(locationData)
      localStorage.setItem('construction_locations', JSON.stringify(savedLocations))
      
      if ('vibrate' in navigator) {
        navigator.vibrate(100)
      }
      alert('Location marked successfully!')
    }
  }

  const handleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-gray-900 mb-2">Access Required</h1>
            <p className="text-gray-600 mb-4">Please log in to access your mobile dashboard.</p>
            <Button 
              onClick={() => router.push('/')}
              className="w-full bg-blue-600 hover:bg-blue-700 min-h-[48px]"
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`min-h-screen pb-20 ${highContrastMode ? 'bg-black text-white' : 'bg-gray-50'}`}>
      {/* Mobile Status Bar */}
      <div className={`sticky top-0 z-40 px-4 py-2 border-b ${
        highContrastMode ? 'bg-black border-white' : 'bg-white/95 backdrop-blur-md border-gray-200'
      }`}>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-3">
            {/* Connection Status */}
            <div className="flex items-center space-x-1">
              {connectionStatus === 'online' ? (
                <Wifi className="h-4 w-4 text-green-600" />
              ) : connectionStatus === 'poor' ? (
                <Signal className="h-4 w-4 text-yellow-600" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-600" />
              )}
              <span className={`text-xs font-medium ${
                connectionStatus === 'online' ? 'text-green-600' : 
                connectionStatus === 'poor' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {connectionStatus.toUpperCase()}
              </span>
            </div>
            
            {/* Battery Level */}
            <div className="flex items-center space-x-1">
              <Battery className={`h-4 w-4 ${
                batteryLevel > 50 ? 'text-green-600' : 
                batteryLevel > 20 ? 'text-yellow-600' : 'text-red-600'
              }`} />
              <span className={`text-xs font-medium ${
                batteryLevel > 50 ? 'text-green-600' : 
                batteryLevel > 20 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {batteryLevel}%
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Site Conditions */}
            <div className="flex items-center space-x-1">
              <Thermometer className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-600">
                {mockSiteConditions.temperature}°C
              </span>
            </div>
            
            {/* Settings */}
            <button
              onClick={() => setHighContrastMode(!highContrastMode)}
              className="p-1 rounded"
            >
              {highContrastMode ? 
                <Sun className="h-4 w-4 text-yellow-400" /> : 
                <Moon className="h-4 w-4 text-gray-600" />
              }
            </button>
            
            <button
              onClick={handleFullscreen}
              className="p-1 rounded"
            >
              <MoreVertical className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Project Header - Mobile Optimized */}
      <div className={`px-4 py-4 border-b ${
        highContrastMode ? 'bg-gray-900 border-white' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1">
            <h1 className="text-lg font-bold truncate">{project.name}</h1>
            <p className="text-sm text-gray-600 flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {project.location}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full animate-pulse ${
              project.teamOnSite ? 'bg-green-500' : 'bg-gray-400'
            }`}></div>
            <span className="text-xs font-medium">
              {project.teamOnSite ? 'Team On-Site' : 'Team Off-Site'}
            </span>
          </div>
        </div>
        
        {/* Progress Bar - Large for mobile */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{project.currentPhase}</span>
            <span className="text-blue-600 font-bold">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-600 to-blue-700 h-3 rounded-full transition-all duration-1000" 
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600">
            Next: {project.nextMilestone} • Updated {project.lastUpdate}
          </p>
        </div>
      </div>

      {/* Quick Actions Grid - Touch Optimized */}
      <div className="px-4 py-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <Zap className="h-4 w-4 mr-2" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action) => {
            const IconComponent = action.icon
            return (
              <button
                key={action.id}
                onClick={action.action}
                className={`relative p-4 rounded-xl text-white font-semibold text-xs text-center transition-all duration-200 active:scale-95 min-h-[80px] flex flex-col items-center justify-center ${action.color} hover:shadow-lg touch-manipulation`}
                style={{ minHeight: '80px', minWidth: '80px' }}
              >
                <IconComponent className="h-6 w-6 mb-2" />
                <span>{action.label}</span>
                {action.urgent && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {action.id === 'checklist' ? project.urgentTasks : '!'}
                    </span>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Today's Overview - Mobile Cards */}
      <div className="px-4 py-2">
        <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <Activity className="h-4 w-4 mr-2" />
          Today's Overview
        </h2>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Tasks Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold text-blue-700">{project.todayTasks}</span>
              </div>
              <p className="text-sm font-medium text-blue-700">Tasks Today</p>
              {project.urgentTasks > 0 && (
                <p className="text-xs text-red-600 mt-1">
                  {project.urgentTasks} urgent
                </p>
              )}
            </CardContent>
          </Card>

          {/* Weather Card */}
          <Card className={`border-2 ${
            mockSiteConditions.workable ? 
            'bg-gradient-to-br from-green-50 to-green-100 border-green-200' :
            'bg-gradient-to-br from-red-50 to-red-100 border-red-200'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <CloudRain className={`h-5 w-5 ${
                  mockSiteConditions.workable ? 'text-green-600' : 'text-red-600'
                }`} />
                <span className={`text-lg font-bold ${
                  mockSiteConditions.workable ? 'text-green-700' : 'text-red-700'
                }`}>
                  {mockSiteConditions.temperature}°C
                </span>
              </div>
              <p className={`text-sm font-medium ${
                mockSiteConditions.workable ? 'text-green-700' : 'text-red-700'
              }`}>
                {mockSiteConditions.workable ? 'Good to Work' : 'Check Conditions'}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {mockSiteConditions.conditions}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Offline Sync Status */}
      {connectionStatus === 'offline' && (
        <div className="mx-4 mb-4">
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <WifiOff className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-orange-800">
                    Working Offline
                  </p>
                  <p className="text-xs text-orange-600">
                    Data will sync when connection is restored
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Photo Capture Modal */}
      {captureMode && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex-1 relative">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
            />
            <div className="absolute bottom-20 left-0 right-0 flex justify-center space-x-4">
              <button
                onClick={() => {
                  // Capture photo logic here
                  setCaptureMode(false)
                }}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
              >
                <Camera className="h-8 w-8 text-gray-900" />
              </button>
            </div>
            <button
              onClick={() => setCaptureMode(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation - Construction Focused */}
      <div className={`fixed bottom-0 left-0 right-0 border-t z-40 ${
        highContrastMode ? 'bg-black border-white' : 'bg-white/95 backdrop-blur-md border-gray-200'
      }`}>
        <div className="flex justify-around py-2">
          {[
            { id: 'overview', icon: Home, label: 'Overview' },
            { id: 'tasks', icon: CheckCircle, label: 'Tasks' },
            { id: 'team', icon: User, label: 'Team' },
            { id: 'photos', icon: Camera, label: 'Photos' }
          ].map((tab) => {
            const IconComponent = tab.icon
            const isActive = currentView === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id as any)}
                className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 min-h-[60px] touch-manipulation ${
                  isActive 
                    ? 'text-blue-600 bg-blue-50 font-semibold' 
                    : highContrastMode 
                      ? 'text-white hover:text-blue-400' 
                      : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <IconComponent className="h-5 w-5 mb-1" />
                <span className="text-xs">{tab.label}</span>
                {tab.id === 'tasks' && project.urgentTasks > 0 && (
                  <div className="absolute top-1 right-3 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{project.urgentTasks}</span>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Utility function to check if device supports PWA features
export function checkPWASupport() {
  return {
    serviceWorker: 'serviceWorker' in navigator,
    camera: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
    gps: 'geolocation' in navigator,
    vibration: 'vibrate' in navigator,
    battery: 'getBattery' in navigator,
    fullscreen: 'requestFullscreen' in document.documentElement,
    speech: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window,
    offline: 'onLine' in navigator
  }
}
