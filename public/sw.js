// BuildMate Service Worker - Optimized for Construction Industry Usage
const CACHE_NAME = 'buildmate-v1.1.0'
const CONSTRUCTION_CACHE = 'buildmate-construction-v1.1.0'
const API_CACHE = 'buildmate-api-v1.1.0'
const IMAGE_CACHE = 'buildmate-images-v1.1.0'
const PHOTO_CACHE = 'buildmate-photos-v1.1.0'
const OFFLINE_DATA_CACHE = 'buildmate-offline-v1.1.0'

// Critical resources for construction professionals
const CRITICAL_RESOURCES = [
  '/',
  '/materials',
  '/professionals',
  '/configure',
  '/dashboard',
  '/dashboard/mobile',
  '/_next/static/css/',
  '/_next/static/js/',
  '/offline',
  '/manifest.json'
]

// Construction-specific data to cache
const CONSTRUCTION_DATA_URLS = [
  '/api/materials',
  '/api/professionals',
  '/api/projects',
  '/api/uk-postcode',
  '/api/building-regulations'
]

// Install event - cache critical resources
self.addEventListener('install', event => {
  console.log('<� BuildMate SW: Installing service worker for construction site usage')
  
  event.waitUntil(
    Promise.all([
      // Cache critical app shell
      caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(CRITICAL_RESOURCES.filter(url => !url.includes('*')))
      }),
      
      // Pre-cache construction data
      caches.open(CONSTRUCTION_CACHE).then(cache => {
        return Promise.all(
          CONSTRUCTION_DATA_URLS.map(url => 
            fetch(url).then(response => {
              if (response.ok) {
                return cache.put(url, response.clone())
              }
            }).catch(() => {
              // Fail silently for unavailable endpoints
              console.log(`<� BuildMate SW: Could not pre-cache ${url}`)
            })
          )
        )
      })
    ]).then(() => {
      console.log('<� BuildMate SW: Installation complete - ready for construction sites')
      self.skipWaiting()
    })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('<� BuildMate SW: Activating for construction professional usage')
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheName.includes('buildmate-v1.0.0')) {
            console.log('<� BuildMate SW: Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      console.log('<� BuildMate SW: Activated - construction data cached and ready')
      return self.clients.claim()
    })
  )
})

// Fetch event - intelligent caching strategy for construction data
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Handle different types of requests with construction-optimized strategies
  if (request.method === 'GET') {
    event.respondWith(handleGetRequest(request, url))
  }
})

async function handleGetRequest(request, url) {
  const pathname = url.pathname

  try {
    // API requests - stale while revalidate for construction data
    if (pathname.startsWith('/api/')) {
      return handleApiRequest(request, pathname)
    }

    // Images - cache first for construction project images
    if (pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i)) {
      return handleImageRequest(request)
    }

    // Static assets - cache first with long expiry
    if (pathname.startsWith('/_next/static/')) {
      return handleStaticAssetRequest(request)
    }

    // HTML pages - network first with fallback
    if (request.headers.get('accept')?.includes('text/html')) {
      return handlePageRequest(request)
    }

    // Default: try network first
    return fetch(request)
  } catch (error) {
    console.log('<� BuildMate SW: Fetch error:', error)
    return handleOfflineRequest(request)
  }
}

// Construction data API caching - critical for on-site usage
async function handleApiRequest(request, pathname) {
  const cache = await caches.open(API_CACHE)
  
  try {
    // Network first for real-time pricing and availability
    if (pathname.includes('/materials/pricing') || pathname.includes('/professionals/availability')) {
      const networkResponse = await fetch(request)
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone())
        return networkResponse
      }
    }

    // Stale while revalidate for other construction data
    const cachedResponse = await cache.match(request)
    const networkPromise = fetch(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone())
      }
      return response
    })

    if (cachedResponse) {
      networkPromise.catch(() => {}) // Don't await, just update cache
      return cachedResponse
    } else {
      return await networkPromise
    }
  } catch (error) {
    // Return cached version if available (critical for construction sites with poor connectivity)
    const cachedResponse = await cache.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    throw error
  }
}

// Construction project images - cache first
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE)
  const cachedResponse = await cache.match(request)

  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    // Return placeholder for construction images
    return new Response('', { status: 204 })
  }
}

// Static assets - cache first with versioning
async function handleStaticAssetRequest(request) {
  const cache = await caches.open(CACHE_NAME)
  const cachedResponse = await cache.match(request)

  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    throw error
  }
}

// HTML pages - network first with construction data fallback
async function handlePageRequest(request) {
  const cache = await caches.open(CACHE_NAME)

  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    // Try to serve cached version
    const cachedResponse = await cache.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    // Last resort: offline page for construction professionals
    const offlinePage = await cache.match('/offline')
    if (offlinePage) {
      return offlinePage
    }

    // Basic offline response
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>BuildMate AI - Offline</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: system-ui, sans-serif; text-align: center; padding: 2rem; }
            .offline { max-width: 500px; margin: 0 auto; }
            .icon { font-size: 4rem; margin-bottom: 1rem; }
          </style>
        </head>
        <body>
          <div class="offline">
            <div class="icon"><�</div>
            <h1>BuildMate AI - Offline Mode</h1>
            <p>You're currently offline, but your construction data is cached and available.</p>
            <p>Reconnect to sync your latest project updates.</p>
            <button onclick="location.reload()">Try Again</button>
          </div>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    })
  }
}

// Handle offline requests
async function handleOfflineRequest(request) {
  const url = new URL(request.url)
  
  // Try to serve from any cache
  const cacheNames = await caches.keys()
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName)
    const cachedResponse = await cache.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
  }

  // Return appropriate offline response based on request type
  if (request.headers.get('accept')?.includes('text/html')) {
    return handlePageRequest(request)
  } else if (url.pathname.startsWith('/api/')) {
    return new Response(JSON.stringify({ 
      error: 'Offline', 
      message: 'Construction data unavailable offline',
      cached: false 
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 503
    })
  }

  return new Response('Offline', { status: 503 })
}

// Background sync for construction data when connection restored
self.addEventListener('sync', event => {
  if (event.tag === 'construction-data-sync') {
    console.log('<� BuildMate SW: Syncing construction data after reconnection')
    event.waitUntil(syncConstructionData())
  }
})

async function syncConstructionData() {
  try {
    // Sync critical construction data when connection is restored
    const constructionEndpoints = [
      '/api/materials/pricing',
      '/api/professionals/availability',
      '/api/projects/status'
    ]

    await Promise.all(
      constructionEndpoints.map(async (endpoint) => {
        try {
          const response = await fetch(endpoint)
          if (response.ok) {
            const cache = await caches.open(API_CACHE)
            await cache.put(endpoint, response.clone())
            console.log(`<� BuildMate SW: Synced ${endpoint}`)
          }
        } catch (error) {
          console.log(`<� BuildMate SW: Failed to sync ${endpoint}`)
        }
      })
    )
  } catch (error) {
    console.log('<� BuildMate SW: Background sync failed:', error)
  }
}

// Push notifications for construction updates
self.addEventListener('push', event => {
  const options = {
    body: 'Your construction project has updates available',
    icon: '/icons/buildmate-192x192.png',
    badge: '/icons/buildmate-72x72.png',
    tag: 'construction-update',
    requireInteraction: false,
    actions: [
      {
        action: 'view',
        title: 'View Project',
        icon: '/icons/view.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/dismiss.png'
      }
    ]
  }

  if (event.data) {
    const data = event.data.json()
    options.body = data.message || options.body
    options.tag = data.tag || options.tag
  }

  event.waitUntil(
    self.registration.showNotification('BuildMate AI', options)
  )
})

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close()

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/dashboard')
    )
  }
})

// Advanced sync functions for construction site data
async function syncPhotos() {
  try {
    console.log('🏗️ BuildMate SW: Syncing construction site photos')
    
    // Get photos from IndexedDB (stored offline)
    const photosToSync = await getOfflinePhotos()
    
    for (const photo of photosToSync) {
      try {
        const formData = new FormData()
        formData.append('photo', photo.blob)
        formData.append('projectId', photo.projectId)
        formData.append('location', JSON.stringify(photo.location))
        formData.append('timestamp', photo.timestamp)
        formData.append('phase', photo.phase)
        
        const response = await fetch('/api/photos/upload', {
          method: 'POST',
          body: formData
        })
        
        if (response.ok) {
          await removeOfflinePhoto(photo.id)
          console.log('🏗️ BuildMate SW: Photo synced successfully')
        }
      } catch (error) {
        console.log('🏗️ BuildMate SW: Failed to sync photo:', error)
      }
    }
  } catch (error) {
    console.log('🏗️ BuildMate SW: Photo sync failed:', error)
  }
}

async function syncVoiceNotes() {
  try {
    console.log('🏗️ BuildMate SW: Syncing voice notes')
    
    const voiceNotes = await getOfflineVoiceNotes()
    
    for (const note of voiceNotes) {
      try {
        const response = await fetch('/api/voice-notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectId: note.projectId,
            transcript: note.transcript,
            audio: note.audioBlob,
            timestamp: note.timestamp,
            location: note.location
          })
        })
        
        if (response.ok) {
          await removeOfflineVoiceNote(note.id)
          console.log('🏗️ BuildMate SW: Voice note synced successfully')
        }
      } catch (error) {
        console.log('🏗️ BuildMate SW: Failed to sync voice note:', error)
      }
    }
  } catch (error) {
    console.log('🏗️ BuildMate SW: Voice notes sync failed:', error)
  }
}

async function syncLocationData() {
  try {
    console.log('🏗️ BuildMate SW: Syncing GPS location data')
    
    const locations = JSON.parse(localStorage.getItem('construction_locations') || '[]')
    
    if (locations.length > 0) {
      const response = await fetch('/api/locations/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locations })
      })
      
      if (response.ok) {
        localStorage.removeItem('construction_locations')
        console.log('🏗️ BuildMate SW: Location data synced successfully')
      }
    }
  } catch (error) {
    console.log('🏗️ BuildMate SW: Location sync failed:', error)
  }
}

async function syncTaskUpdates() {
  try {
    console.log('🏗️ BuildMate SW: Syncing task updates')
    
    const taskUpdates = JSON.parse(localStorage.getItem('offline_task_updates') || '[]')
    
    for (const update of taskUpdates) {
      try {
        const response = await fetch('/api/tasks/update', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(update)
        })
        
        if (response.ok) {
          // Remove from offline storage
          const updatedTasks = taskUpdates.filter(t => t.id !== update.id)
          localStorage.setItem('offline_task_updates', JSON.stringify(updatedTasks))
          console.log('🏗️ BuildMate SW: Task update synced successfully')
        }
      } catch (error) {
        console.log('🏗️ BuildMate SW: Failed to sync task update:', error)
      }
    }
  } catch (error) {
    console.log('🏗️ BuildMate SW: Task updates sync failed:', error)
  }
}

// IndexedDB helpers for offline photo storage
async function getOfflinePhotos() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('BuildMateOffline', 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['photos'], 'readonly')
      const store = transaction.objectStore('photos')
      const getAllRequest = store.getAll()
      
      getAllRequest.onsuccess = () => resolve(getAllRequest.result)
      getAllRequest.onerror = () => reject(getAllRequest.error)
    }
    
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains('photos')) {
        db.createObjectStore('photos', { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains('voiceNotes')) {
        db.createObjectStore('voiceNotes', { keyPath: 'id' })
      }
    }
  })
}

async function getOfflineVoiceNotes() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('BuildMateOffline', 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['voiceNotes'], 'readonly')
      const store = transaction.objectStore('voiceNotes')
      const getAllRequest = store.getAll()
      
      getAllRequest.onsuccess = () => resolve(getAllRequest.result)
      getAllRequest.onerror = () => reject(getAllRequest.error)
    }
  })
}

async function removeOfflinePhoto(photoId) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('BuildMateOffline', 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['photos'], 'readwrite')
      const store = transaction.objectStore('photos')
      const deleteRequest = store.delete(photoId)
      
      deleteRequest.onsuccess = () => resolve()
      deleteRequest.onerror = () => reject(deleteRequest.error)
    }
  })
}

async function removeOfflineVoiceNote(noteId) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('BuildMateOffline', 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['voiceNotes'], 'readwrite')
      const store = transaction.objectStore('voiceNotes')
      const deleteRequest = store.delete(noteId)
      
      deleteRequest.onsuccess = () => resolve()
      deleteRequest.onerror = () => reject(deleteRequest.error)
    }
  })
}

// Enhanced push notification handling for construction updates
self.addEventListener('push', event => {
  console.log('🏗️ BuildMate SW: Push notification received')
  
  let options = {
    body: 'Your construction project has updates available',
    icon: '/icons/buildmate-192x192.png',
    badge: '/icons/buildmate-72x72.png',
    tag: 'construction-update',
    requireInteraction: true,
    vibrate: [200, 100, 200, 100, 200],
    actions: [
      {
        action: 'view-project',
        title: 'View Project',
        icon: '/icons/view.png'
      },
      {
        action: 'call-team',
        title: 'Call Team',
        icon: '/icons/phone.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/dismiss.png'
      }
    ],
    data: {
      url: '/dashboard',
      timestamp: Date.now()
    }
  }

  if (event.data) {
    try {
      const data = event.data.json()
      options = {
        ...options,
        body: data.message || options.body,
        tag: data.tag || options.tag,
        data: { ...options.data, ...data }
      }
      
      // Construction-specific notification types
      if (data.type === 'milestone') {
        options.body = `🎉 Milestone completed: ${data.milestone}`
        options.vibrate = [100, 50, 100, 50, 100, 50, 200]
      } else if (data.type === 'delivery') {
        options.body = `📦 Material delivery: ${data.material}`
        options.vibrate = [200, 100, 200]
      } else if (data.type === 'weather_alert') {
        options.body = `⚠️ Weather alert: ${data.condition}`
        options.requireInteraction = true
        options.vibrate = [300, 100, 300]
      } else if (data.type === 'team_update') {
        options.body = `👷 Team update: ${data.message}`
        options.vibrate = [100, 100, 100]
      }
    } catch (error) {
      console.log('🏗️ BuildMate SW: Failed to parse push data:', error)
    }
  }

  event.waitUntil(
    self.registration.showNotification('BuildMate Construction', options)
  )
})

// Enhanced notification click handling
self.addEventListener('notificationclick', event => {
  console.log('🏗️ BuildMate SW: Notification clicked:', event.action)
  
  event.notification.close()

  switch (event.action) {
    case 'view-project':
      event.waitUntil(
        clients.openWindow(event.notification.data?.url || '/dashboard')
      )
      break
    case 'call-team':
      event.waitUntil(
        clients.openWindow('tel:+44800123456') // Emergency construction line
      )
      break
    case 'dismiss':
      // Just close the notification
      break
    default:
      event.waitUntil(
        clients.openWindow('/dashboard')
      )
  }
})