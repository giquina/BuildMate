'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, ShoppingCart, User, Star, Building } from 'lucide-react'

interface NotificationData {
  name: string
  location: string
  action: string
  type: 'project' | 'materials' | 'professional' | 'review' | 'completion'
  icon: any
  timeAgo: string
}

const notificationData: NotificationData[] = [
  { name: 'James Wilson', location: 'Manchester', action: 'started a kitchen extension project', type: 'project', icon: Building, timeAgo: '2 minutes ago' },
  { name: 'Sarah Thompson', location: 'Birmingham', action: 'ordered £2,400 of materials', type: 'materials', icon: ShoppingCart, timeAgo: '4 minutes ago' },
  { name: 'Michael Davies', location: 'Leeds', action: 'booked a verified architect', type: 'professional', icon: User, timeAgo: '6 minutes ago' },
  { name: 'Emma Johnson', location: 'Bristol', action: 'left a 5-star review', type: 'review', icon: Star, timeAgo: '8 minutes ago' },
  { name: 'David Brown', location: 'Liverpool', action: 'completed their loft conversion', type: 'completion', icon: CheckCircle, timeAgo: '11 minutes ago' },
  { name: 'Lisa Roberts', location: 'Newcastle', action: 'started planning a house extension', type: 'project', icon: Building, timeAgo: '13 minutes ago' },
  { name: 'Robert Taylor', location: 'Sheffield', action: 'ordered bathroom tiles and fixtures', type: 'materials', icon: ShoppingCart, timeAgo: '15 minutes ago' },
  { name: 'Jennifer White', location: 'Nottingham', action: 'connected with a local builder', type: 'professional', icon: User, timeAgo: '17 minutes ago' },
  { name: 'Mark Anderson', location: 'Leicester', action: 'completed their project planning', type: 'completion', icon: CheckCircle, timeAgo: '19 minutes ago' },
  { name: 'Rachel Green', location: 'Coventry', action: 'ordered £1,800 of building materials', type: 'materials', icon: ShoppingCart, timeAgo: '22 minutes ago' },
  { name: 'Thomas Miller', location: 'Southampton', action: 'started a garage conversion', type: 'project', icon: Building, timeAgo: '24 minutes ago' },
  { name: 'Helen Davis', location: 'Portsmouth', action: 'rated their builder 5 stars', type: 'review', icon: Star, timeAgo: '26 minutes ago' },
  { name: 'Paul Wilson', location: 'Oxford', action: 'booked structural engineer', type: 'professional', icon: User, timeAgo: '28 minutes ago' },
  { name: 'Claire Evans', location: 'Cambridge', action: 'completed material selection', type: 'completion', icon: CheckCircle, timeAgo: '30 minutes ago' },
  { name: 'Andrew Clark', location: 'Brighton', action: 'started basement conversion planning', type: 'project', icon: Building, timeAgo: '33 minutes ago' },
  { name: 'Victoria Lee', location: 'Reading', action: 'ordered kitchen appliances', type: 'materials', icon: ShoppingCart, timeAgo: '35 minutes ago' },
  { name: 'Simon Wright', location: 'Luton', action: 'hired a verified electrician', type: 'professional', icon: User, timeAgo: '37 minutes ago' },
  { name: 'Michelle Hall', location: 'Wolverhampton', action: 'left positive project feedback', type: 'review', icon: Star, timeAgo: '39 minutes ago' },
  { name: 'Kevin Martinez', location: 'Stoke-on-Trent', action: 'completed planning permission', type: 'completion', icon: CheckCircle, timeAgo: '42 minutes ago' },
  { name: 'Amanda Parker', location: 'Derby', action: 'started conservatory project', type: 'project', icon: Building, timeAgo: '44 minutes ago' }
]

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'project': return 'border-blue-200 bg-blue-50'
    case 'materials': return 'border-green-200 bg-green-50'
    case 'professional': return 'border-purple-200 bg-purple-50'
    case 'review': return 'border-yellow-200 bg-yellow-50'
    case 'completion': return 'border-orange-200 bg-orange-50'
    default: return 'border-gray-200 bg-gray-50'
  }
}

const getIconColor = (type: string) => {
  switch (type) {
    case 'project': return 'text-blue-600'
    case 'materials': return 'text-green-600'
    case 'professional': return 'text-purple-600'
    case 'review': return 'text-yellow-600'
    case 'completion': return 'text-orange-600'
    default: return 'text-gray-600'
  }
}

export function LiveNotifications() {
  const [currentNotification, setCurrentNotification] = useState<NotificationData | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [notificationIndex, setNotificationIndex] = useState(0)

  useEffect(() => {
    const showNotification = () => {
      // Set current notification
      setCurrentNotification(notificationData[notificationIndex])
      setIsVisible(true)

      // Hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false)
      }, 4000)

      // Move to next notification
      setTimeout(() => {
        setNotificationIndex((prev) => (prev + 1) % notificationData.length)
      }, 5000)
    }

    // Show first notification after 3 seconds
    const initialTimer = setTimeout(showNotification, 3000)

    // Then show every 8-12 seconds with some randomness
    const interval = setInterval(() => {
      const randomDelay = Math.random() * 4000 + 8000 // 8-12 seconds
      setTimeout(showNotification, randomDelay)
    }, 12000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [notificationIndex])

  if (!currentNotification) return null

  const IconComponent = currentNotification.icon

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
      <div
        className={`transform transition-all duration-500 ease-in-out ${
          isVisible 
            ? 'translate-x-0 opacity-100' 
            : '-translate-x-full opacity-0'
        }`}
      >
        <div 
          className={`
            ${getNotificationColor(currentNotification.type)}
            border rounded-lg shadow-lg p-4 max-w-sm
            backdrop-blur-sm bg-opacity-95
          `}
        >
          <div className="flex items-start space-x-3">
            <div className={`flex-shrink-0 ${getIconColor(currentNotification.type)}`}>
              <IconComponent className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                <span className="font-semibold">{currentNotification.name}</span>
                <span className="text-gray-500 font-normal"> from {currentNotification.location}</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {currentNotification.action}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {currentNotification.timeAgo}
              </p>
            </div>
          </div>
          
          {/* Small pulse indicator */}
          <div className="absolute -top-1 -right-1">
            <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}