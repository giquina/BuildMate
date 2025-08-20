'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  X, 
  Home, 
  Settings, 
  Wrench, 
  Users, 
  ShoppingCart, 
  FileText,
  CreditCard,
  HelpCircle,
  LogOut,
  User,
  Building,
  ChevronRight,
  Crown,
  Shield,
  Zap
} from 'lucide-react'
import { Button } from './Button'
import { useUser } from '@/contexts/UserContext'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user, logout } = useUser()
  const pathname = usePathname()
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 200)
  }

  const handleLogout = async () => {
    await logout()
    handleClose()
  }

  const mainNavItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/configure', label: 'Configure Project', icon: Settings },
    { href: '/materials', label: 'Materials', icon: ShoppingCart },
    { href: '/professionals', label: 'Find Professionals', icon: Users },
    { href: '/commercial', label: 'Commercial', icon: Building }
  ]

  const userNavItems = user ? [
    { href: '/dashboard', label: 'Dashboard', icon: FileText },
    { href: '/wishlist', label: 'Wishlist', icon: ShoppingCart },
    { href: '/account/profile', label: 'Profile', icon: User },
    { href: '/account/settings', label: 'Settings', icon: Settings },
    { href: '/pricing', label: 'Pricing', icon: CreditCard }
  ] : []

  const supportItems = [
    { href: '/help', label: 'Help Center', icon: HelpCircle },
    { href: '/contact', label: 'Contact Us', icon: FileText }
  ]

  const getSubscriptionDisplay = () => {
    if (!user) return null
    
    const subscriptionConfig = {
      free: { label: 'Free Plan', icon: Shield, color: 'text-gray-600' },
      trial: { label: 'Free Trial', icon: Zap, color: 'text-green-600' },
      pro: { label: 'Pro Plan', icon: Zap, color: 'text-blue-600' },
      enterprise: { label: 'Enterprise Plan', icon: Crown, color: 'text-purple-600' }
    }
    
    return subscriptionConfig[user.subscription] || subscriptionConfig.free
  }

  const subscription = getSubscriptionDisplay()

  if (!isOpen) return null

  return (
    <div className={`fixed inset-0 z-50 lg:hidden ${
      isClosing ? 'animate-fade-out' : 'animate-fade-in'
    }`}>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={handleClose}
      />
      
      {/* Menu Panel */}
      <div className={`fixed inset-y-0 right-0 w-80 max-w-[90vw] bg-white shadow-2xl transform transition-transform duration-200 ${
        isClosing ? 'translate-x-full' : 'translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="text-xl font-bold text-blue-600">BuildMate</div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* User Section */}
          {user && (
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {user.name}
                  </div>
                  <div className="text-sm text-gray-600 truncate">
                    {user.email}
                  </div>
                </div>
              </div>
              
              {subscription && (
                <div className="flex items-center space-x-2 text-sm">
                  <subscription.icon className={`h-4 w-4 ${subscription.color}`} />
                  <span className={subscription.color}>{subscription.label}</span>
                  {user.subscription === 'free' && (
                    <Link href="/pricing" onClick={handleClose}>
                      <Button size="sm" className="text-xs ml-auto">
                        Upgrade
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            {/* Main Navigation */}
            <div className="p-4">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Main
              </div>
              <nav className="space-y-1">
                {mainNavItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleClose}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                      <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* User Navigation */}
            {user && userNavItems.length > 0 && (
              <div className="p-4 border-t border-gray-200">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Account
                </div>
                <nav className="space-y-1">
                  {userNavItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleClose}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                        <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
                      </Link>
                    )
                  })}
                </nav>
              </div>
            )}

            {/* Support */}
            <div className="p-4 border-t border-gray-200">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Support
              </div>
              <nav className="space-y-1">
                {supportItems.map((item) => {
                  const Icon = item.icon
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleClose}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                      <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 space-y-3">
            {user ? (
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full justify-center text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <div className="space-y-2">
                <Link href="/login" onClick={handleClose}>
                  <Button className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" onClick={handleClose}>
                  <Button variant="outline" className="w-full">
                    Create Account
                  </Button>
                </Link>
              </div>
            )}
            
            <div className="text-center text-xs text-gray-500">
              BuildMate v2.0 - UK Construction Platform
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}