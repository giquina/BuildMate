'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { 
  WifiOff, 
  Camera, 
  Mic, 
  MapPin, 
  CheckCircle,
  RefreshCw,
  Download,
  Upload,
  Phone,
  AlertTriangle,
  Home,
  User,
  Package,
  Activity,
  Settings,
  ArrowRight,
  Cloud,
  Smartphone,
  Shield,
  Clock,
  FileText,
  Image as ImageIcon,
  Navigation,
  Battery,
  Signal
} from 'lucide-react'

interface OfflineData {
  photos: number
  voiceNotes: number
  locationMarks: number
  taskUpdates: number
  lastSync: string | null
}

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [offlineData, setOfflineData] = useState<OfflineData>({
    photos: 0,
    voiceNotes: 0,
    locationMarks: 0,
    taskUpdates: 0,
    lastSync: null
  })
  const [syncInProgress, setSyncInProgress] = useState(false)

  useEffect(() => {
    // Check online status
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    updateOnlineStatus()
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    // Load offline data counts
    loadOfflineDataCounts()

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  const loadOfflineDataCounts = () => {
    // Count photos in IndexedDB
    const request = indexedDB.open('BuildMate AIOffline', 1)
    request.onsuccess = () => {
      const db = request.result
      
      // Count photos
      const photoTransaction = db.transaction(['photos'], 'readonly')
      const photoStore = photoTransaction.objectStore('photos')
      const photoCountRequest = photoStore.count()
      
      photoCountRequest.onsuccess = () => {
        setOfflineData(prev => ({ ...prev, photos: photoCountRequest.result }))
      }
      
      // Count voice notes
      const voiceTransaction = db.transaction(['voiceNotes'], 'readonly')
      const voiceStore = voiceTransaction.objectStore('voiceNotes')
      const voiceCountRequest = voiceStore.count()
      
      voiceCountRequest.onsuccess = () => {
        setOfflineData(prev => ({ ...prev, voiceNotes: voiceCountRequest.result }))
      }
    }

    // Count location marks from localStorage
    const locations = JSON.parse(localStorage.getItem('construction_locations') || '[]')
    const taskUpdates = JSON.parse(localStorage.getItem('offline_task_updates') || '[]')
    const lastSync = localStorage.getItem('last_sync_timestamp')
    
    setOfflineData(prev => ({
      ...prev,
      locationMarks: locations.length,
      taskUpdates: taskUpdates.length,
      lastSync: lastSync
    }))
  }

  const handleRetryConnection = async () => {
    setRetryCount(prev => prev + 1)
    
    try {
      // Try to fetch a small resource to test connectivity
      const response = await fetch('/api/health', { 
        method: 'HEAD',
        cache: 'no-cache'
      })
      
      if (response.ok) {
        // Connection restored - trigger sync
        handleSyncData()
      }
    } catch (error) {
      console.log('Still offline:', error)
      setTimeout(() => {
        setRetryCount(prev => prev - 1)
      }, 2000)
    }
  }

  const handleSyncData = async () => {
    if (!isOnline) return
    
    setSyncInProgress(true)
    
    try {
      // Register background sync if supported
      if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
        const registration = await navigator.serviceWorker.ready
        
        // Register all sync events (if supported)
        if ('sync' in registration && registration.sync) {
          await Promise.all([
            (registration as any).sync.register('photo-upload-sync'),
            (registration as any).sync.register('voice-notes-sync'),
            (registration as any).sync.register('location-sync'),
            (registration as any).sync.register('task-updates-sync'),
            (registration as any).sync.register('construction-data-sync')
          ])
        }
        
        // Update last sync time
        localStorage.setItem('last_sync_timestamp', new Date().toISOString())
        
        // Reload offline data counts
        setTimeout(() => {
          loadOfflineDataCounts()
          setSyncInProgress(false)
        }, 2000)
      }
    } catch (error) {
      console.error('Sync failed:', error)
      setSyncInProgress(false)
    }
  }

  const formatSyncTime = (timestamp: string | null) => {
    if (!timestamp) return 'Never'
    const date = new Date(timestamp)
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                isOnline ? 'bg-green-100' : 'bg-orange-100'
              }`}>
                {isOnline ? (
                  <Shield className="h-8 w-8 text-green-600" />
                ) : (
                  <WifiOff className="h-8 w-8 text-orange-600" />
                )}
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isOnline ? 'Connection Restored' : 'Working Offline'}
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              {isOnline 
                ? 'Your internet connection is back. Sync your construction data now.'
                : 'No internet connection detected. You can still use BuildMate AI for essential construction tasks.'
              }
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
        {/* Connection Status Card */}
        <Card className={`mb-6 border-2 ${
          isOnline ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'
        }`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full animate-pulse ${
                  isOnline ? 'bg-green-500' : 'bg-orange-500'
                }`}></div>
                <div>
                  <p className={`font-semibold ${
                    isOnline ? 'text-green-800' : 'text-orange-800'
                  }`}>
                    {isOnline ? 'Online' : 'Offline Mode'}
                  </p>
                  <p className={`text-sm ${
                    isOnline ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {isOnline 
                      ? 'All features available' 
                      : 'Core construction features available'
                    }
                  </p>
                </div>
              </div>
              
              <Button
                onClick={isOnline ? handleSyncData : handleRetryConnection}
                disabled={syncInProgress || retryCount > 0}
                className={`${
                  isOnline 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-orange-600 hover:bg-orange-700'
                } min-h-[44px]`}
              >
                {syncInProgress ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Syncing...
                  </>
                ) : retryCount > 0 ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Retrying...
                  </>
                ) : isOnline ? (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Sync Data
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retry Connection
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Offline Data Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Offline Data Ready to Sync</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <Camera className="h-5 w-5 text-blue-600" />
                  <span className="text-2xl font-bold text-blue-700">{offlineData.photos}</span>
                </div>
                <p className="text-sm font-medium text-blue-700">Construction Photos</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <Mic className="h-5 w-5 text-green-600" />
                  <span className="text-2xl font-bold text-green-700">{offlineData.voiceNotes}</span>
                </div>
                <p className="text-sm font-medium text-green-700">Voice Notes</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <span className="text-2xl font-bold text-purple-700">{offlineData.locationMarks}</span>
                </div>
                <p className="text-sm font-medium text-purple-700">Location Marks</p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="h-5 w-5 text-orange-600" />
                  <span className="text-2xl font-bold text-orange-700">{offlineData.taskUpdates}</span>
                </div>
                <p className="text-sm font-medium text-orange-700">Task Updates</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Last sync: {formatSyncTime(offlineData.lastSync)}</span>
              </div>
              {!isOnline && (
                <span className="text-orange-600 font-medium">
                  Data will sync automatically when online
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Available Offline Features */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Smartphone className="h-5 w-5" />
              <span>Available Offline Features</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Camera className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Photo Capture</p>
                    <p className="text-sm text-green-600">Take construction progress photos</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Mic className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Voice Recording</p>
                    <p className="text-sm text-green-600">Record site notes and observations</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Location Marking</p>
                    <p className="text-sm text-green-600">Mark important GPS coordinates</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Task Management</p>
                    <p className="text-sm text-green-600">Update task status and progress</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-600">Cached Project Data</p>
                    <p className="text-sm text-gray-500">View saved project information</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-600">Emergency Contacts</p>
                    <p className="text-sm text-gray-500">Access important phone numbers</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <Navigation className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-600">Site Navigation</p>
                    <p className="text-sm text-gray-500">Use GPS for site navigation</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <Settings className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-600">Local Settings</p>
                    <p className="text-sm text-gray-500">Adjust offline preferences</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Actions */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              <span>Emergency Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white min-h-[44px]"
                onClick={() => window.location.href = 'tel:999'}
              >
                <Phone className="h-4 w-4 mr-2" />
                Emergency Services
              </Button>
              
              <Button 
                variant="outline" 
                className="border-red-300 text-red-700 hover:bg-red-100 min-h-[44px]"
                onClick={() => window.location.href = 'tel:+44800123456'}
              >
                <User className="h-4 w-4 mr-2" />
                Site Manager
              </Button>
              
              <Button 
                variant="outline" 
                className="border-red-300 text-red-700 hover:bg-red-100 min-h-[44px]"
                onClick={() => window.location.href = '/safety-info'}
              >
                <Shield className="h-4 w-4 mr-2" />
                Safety Info
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Navigation */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/dashboard'}
              className="min-h-[44px]"
            >
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/dashboard/mobile'}
              className="min-h-[44px]"
            >
              <Smartphone className="h-4 w-4 mr-2" />
              Mobile View
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/materials'}
              className="min-h-[44px]"
            >
              <Package className="h-4 w-4 mr-2" />
              Materials
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
