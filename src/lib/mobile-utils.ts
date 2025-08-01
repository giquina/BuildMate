// Mobile utilities specifically designed for construction sites
// Handles offline functionality, device features, and construction workflows

export interface DeviceCapabilities {
  camera: boolean
  gps: boolean
  vibration: boolean
  battery: boolean
  fullscreen: boolean
  speech: boolean
  offline: boolean
  serviceWorker: boolean
  backgroundSync: boolean
  pushNotifications: boolean
}

export interface LocationData {
  lat: number
  lng: number
  accuracy: number
  timestamp: string
  projectId?: string
  phase?: string
  notes?: string
}

export interface OfflinePhoto {
  id: string
  blob: Blob
  projectId: string
  location?: LocationData
  timestamp: string
  phase: string
  description?: string
}

export interface VoiceNote {
  id: string
  transcript: string
  audioBlob?: Blob
  projectId: string
  location?: LocationData
  timestamp: string
  duration?: number
}

export interface ConnectionStatus {
  online: boolean
  type: 'wifi' | '4g' | '3g' | '2g' | 'slow-2g' | 'offline'
  speed: 'fast' | 'moderate' | 'slow' | 'offline'
  saveData: boolean
}

// Check device capabilities for construction site usage
export function checkDeviceCapabilities(): DeviceCapabilities {
  const capabilities: DeviceCapabilities = {
    camera: false,
    gps: false,
    vibration: false,
    battery: false,
    fullscreen: false,
    speech: false,
    offline: false,
    serviceWorker: false,
    backgroundSync: false,
    pushNotifications: false
  }

  if (typeof window !== 'undefined') {
    capabilities.camera = 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices
    capabilities.gps = 'geolocation' in navigator
    capabilities.vibration = 'vibrate' in navigator
    capabilities.battery = 'getBattery' in navigator
    capabilities.fullscreen = 'requestFullscreen' in document.documentElement
    capabilities.speech = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
    capabilities.offline = 'onLine' in navigator
    capabilities.serviceWorker = 'serviceWorker' in navigator
    
    if (capabilities.serviceWorker) {
      capabilities.backgroundSync = 'sync' in window.ServiceWorkerRegistration.prototype
      capabilities.pushNotifications = 'Notification' in window && 'PushManager' in window
    }
  }

  return capabilities
}

// Get current connection status for construction site adaptation
export function getConnectionStatus(): ConnectionStatus {
  const status: ConnectionStatus = {
    online: true,
    type: 'wifi',
    speed: 'fast',
    saveData: false
  }

  if (typeof window !== 'undefined') {
    status.online = navigator.onLine
    
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      status.type = connection.effectiveType || 'wifi'
      status.saveData = connection.saveData || false
      
      // Determine speed based on connection type
      switch (connection.effectiveType) {
        case '4g':
          status.speed = 'fast'
          break
        case '3g':
          status.speed = 'moderate'
          break
        case '2g':
        case 'slow-2g':
          status.speed = 'slow'
          break
        default:
          status.speed = status.online ? 'fast' : 'offline'
      }
    }
    
    if (!status.online) {
      status.type = 'offline'
      status.speed = 'offline'
    }
  }

  return status
}

// GPS location utilities for construction sites
export async function getCurrentLocation(options: {
  highAccuracy?: boolean
  timeout?: number
  enableWifi?: boolean
} = {}): Promise<LocationData> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocation not supported'))
      return
    }

    const config: PositionOptions = {
      enableHighAccuracy: options.highAccuracy ?? true,
      timeout: options.timeout ?? 10000,
      maximumAge: 60000 // Cache for 1 minute
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toISOString()
        })
      },
      (error) => {
        reject(error)
      },
      config
    )
  })
}

// Watch location changes for construction site tracking
export function watchLocation(
  callback: (location: LocationData) => void,
  options: {
    highAccuracy?: boolean
    timeout?: number
    distanceFilter?: number
  } = {}
): number | null {
  if (!('geolocation' in navigator)) {
    return null
  }

  const config: PositionOptions = {
    enableHighAccuracy: options.highAccuracy ?? true,
    timeout: options.timeout ?? 10000,
    maximumAge: 30000 // Cache for 30 seconds
  }

  let lastLocation: LocationData | null = null

  return navigator.geolocation.watchPosition(
    (position) => {
      const newLocation: LocationData = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: new Date().toISOString()
      }

      // Apply distance filter if specified
      if (options.distanceFilter && lastLocation) {
        const distance = calculateDistance(
          lastLocation.lat,
          lastLocation.lng,
          newLocation.lat,
          newLocation.lng
        )
        
        if (distance < options.distanceFilter) {
          return // Skip update if movement is below threshold
        }
      }

      lastLocation = newLocation
      callback(newLocation)
    },
    (error) => {
      console.error('Location watch error:', error)
    },
    config
  )
}

// Calculate distance between two GPS points (in meters)
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371e3 // Earth's radius in meters
  const φ1 = lat1 * Math.PI / 180
  const φ2 = lat2 * Math.PI / 180
  const Δφ = (lat2 - lat1) * Math.PI / 180
  const Δλ = (lng2 - lng1) * Math.PI / 180

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

// Vibration patterns for construction site feedback
export const VibrationPatterns = {
  short: [100],
  double: [100, 100, 100],
  success: [100, 50, 100],
  error: [300, 100, 300],
  notification: [200, 100, 200, 100, 200],
  emergency: [500, 200, 500, 200, 500]
} as const

export function vibrate(pattern: keyof typeof VibrationPatterns | number[] = 'short'): void {
  if ('vibrate' in navigator) {
    const vibrationPattern = typeof pattern === 'string' ? VibrationPatterns[pattern] : pattern
    navigator.vibrate(vibrationPattern)
  }
}

// Photo capture utilities for construction documentation
export async function capturePhoto(options: {
  quality?: number
  width?: number
  height?: number
  facing?: 'user' | 'environment'
} = {}): Promise<Blob> {
  const constraints: MediaStreamConstraints = {
    video: {
      width: options.width || 1920,
      height: options.height || 1080,
      facingMode: options.facing || 'environment' // Use back camera for construction sites
    }
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    const video = document.createElement('video')
    video.srcObject = stream
    video.play()

    return new Promise((resolve, reject) => {
      video.onloadedmetadata = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        
        if (ctx) {
          ctx.drawImage(video, 0, 0)
          
          canvas.toBlob(
            (blob) => {
              stream.getTracks().forEach(track => track.stop())
              if (blob) {
                resolve(blob)
              } else {
                reject(new Error('Failed to create photo blob'))
              }
            },
            'image/jpeg',
            options.quality || 0.8
          )
        } else {
          reject(new Error('Canvas context not available'))
        }
      }
    })
  } catch (error) {
    throw new Error(`Camera access failed: ${error}`)
  }
}

// Voice recording utilities for construction notes
export class VoiceRecorder {
  private mediaRecorder: MediaRecorder | null = null
  private audioChunks: Blob[] = []
  private stream: MediaStream | null = null
  private recognition: any = null
  private isRecording = false

  async startRecording(options: {
    withTranscription?: boolean
    language?: string
    continuous?: boolean
  } = {}): Promise<void> {
    try {
      // Start audio recording
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      this.mediaRecorder = new MediaRecorder(this.stream)
      this.audioChunks = []
      
      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data)
      }
      
      this.mediaRecorder.start()
      this.isRecording = true

      // Start speech recognition if requested
      if (options.withTranscription && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
        this.recognition = new SpeechRecognition()
        this.recognition.continuous = options.continuous ?? true
        this.recognition.interimResults = true
        this.recognition.lang = options.language || 'en-GB'
        
        this.recognition.start()
      }
    } catch (error) {
      throw new Error(`Voice recording failed: ${error}`)
    }
  }

  async stopRecording(): Promise<{ audioBlob: Blob; transcript?: string }> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder || !this.isRecording) {
        reject(new Error('No active recording'))
        return
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' })
        let transcript = ''

        if (this.recognition) {
          this.recognition.onstop = () => {
            resolve({ audioBlob, transcript })
          }
          
          this.recognition.onresult = (event: any) => {
            const results = Array.from(event.results)
            transcript = results
              .map((result: any) => result[0].transcript)
              .join('')
          }
          
          this.recognition.stop()
        } else {
          resolve({ audioBlob })
        }
      }

      this.mediaRecorder.stop()
      this.stream?.getTracks().forEach(track => track.stop())
      this.isRecording = false
    })
  }

  isCurrentlyRecording(): boolean {
    return this.isRecording
  }
}

// Offline storage utilities for construction data
export class OfflineStorage {
  private dbName = 'BuildMateOffline'
  private version = 1

  async init(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
      
      request.onupgradeneeded = () => {
        const db = request.result
        
        // Create object stores for offline data
        if (!db.objectStoreNames.contains('photos')) {
          const photoStore = db.createObjectStore('photos', { keyPath: 'id' })
          photoStore.createIndex('projectId', 'projectId', { unique: false })
          photoStore.createIndex('timestamp', 'timestamp', { unique: false })
        }
        
        if (!db.objectStoreNames.contains('voiceNotes')) {
          const voiceStore = db.createObjectStore('voiceNotes', { keyPath: 'id' })
          voiceStore.createIndex('projectId', 'projectId', { unique: false })
          voiceStore.createIndex('timestamp', 'timestamp', { unique: false })
        }
        
        if (!db.objectStoreNames.contains('tasks')) {
          const taskStore = db.createObjectStore('tasks', { keyPath: 'id' })
          taskStore.createIndex('projectId', 'projectId', { unique: false })
          taskStore.createIndex('status', 'status', { unique: false })
        }
      }
    })
  }

  async storePhoto(photo: OfflinePhoto): Promise<void> {
    const db = await this.init()
    const transaction = db.transaction(['photos'], 'readwrite')
    const store = transaction.objectStore('photos')
    await store.add(photo)
  }

  async storeVoiceNote(note: VoiceNote): Promise<void> {
    const db = await this.init()
    const transaction = db.transaction(['voiceNotes'], 'readwrite')
    const store = transaction.objectStore('voiceNotes')
    await store.add(note)
  }

  async getAllPhotos(): Promise<OfflinePhoto[]> {
    const db = await this.init()
    const transaction = db.transaction(['photos'], 'readonly')
    const store = transaction.objectStore('photos')
    return new Promise((resolve, reject) => {
      const request = store.getAll()
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async getAllVoiceNotes(): Promise<VoiceNote[]> {
    const db = await this.init()
    const transaction = db.transaction(['voiceNotes'], 'readonly')
    const store = transaction.objectStore('voiceNotes')
    return new Promise((resolve, reject) => {
      const request = store.getAll()
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async deletePhoto(photoId: string): Promise<void> {
    const db = await this.init()
    const transaction = db.transaction(['photos'], 'readwrite')
    const store = transaction.objectStore('photos')
    await store.delete(photoId)
  }

  async deleteVoiceNote(noteId: string): Promise<void> {
    const db = await this.init()
    const transaction = db.transaction(['voiceNotes'], 'readwrite')
    const store = transaction.objectStore('voiceNotes')
    await store.delete(noteId)
  }
}

// Construction site safety and emergency utilities
export const EmergencyContacts = {
  emergency: '999',
  healthAndSafety: '0845 345 0055',
  siteManager: '+44800123456',
  firstAid: '+44800123457'
} as const

export function callEmergency(type: keyof typeof EmergencyContacts = 'emergency'): void {
  const number = EmergencyContacts[type]
  window.location.href = `tel:${number}`
  
  // Vibrate for emergency calls
  vibrate('emergency')
}

// Battery optimization for construction sites
export async function getBatteryInfo(): Promise<{
  level: number
  charging: boolean
  chargingTime: number
  dischargingTime: number
}> {
  if ('getBattery' in navigator) {
    const battery = await (navigator as any).getBattery()
    return {
      level: battery.level,
      charging: battery.charging,
      chargingTime: battery.chargingTime,
      dischargingTime: battery.dischargingTime
    }
  }
  
  return {
    level: 1,
    charging: false,
    chargingTime: Infinity,
    dischargingTime: Infinity
  }
}

// Construction site weather integration
export interface WeatherData {
  temperature: number
  conditions: string
  humidity: number
  windSpeed: number
  visibility: 'good' | 'moderate' | 'poor'
  workable: boolean
  alerts: string[]
}

export async function getConstructionWeather(location: LocationData): Promise<WeatherData> {
  // This would integrate with a weather API
  // For now, return mock data optimized for construction sites
  return {
    temperature: 16,
    conditions: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    visibility: 'good',
    workable: true,
    alerts: []
  }
}

// Export singleton instances for common usage
export const offlineStorage = new OfflineStorage()
export const voiceRecorder = new VoiceRecorder()
