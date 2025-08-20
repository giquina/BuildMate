'use client'

import { useState, useRef, useEffect } from 'react'
import { User, Settings, BookmarkIcon, FolderOpen, LogOut, Crown, ChevronDown, Zap, Trophy } from 'lucide-react'
import Link from 'next/link'
import { useUser, useFreemium } from '@/contexts/UserContext'
import { Button } from './Button'
import { Badge } from './Badge'

interface UserMenuProps {
  onOpenAuth: () => void
}

export function UserMenu({ onOpenAuth }: UserMenuProps) {
  const { user, isAuthenticated, logout, isLoading } = useUser()
  const freemium = useFreemium()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      setIsOpen(false)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
    )
  }

  if (!isAuthenticated) {
    return (
      <Button
        onClick={onOpenAuth}
        variant="outline"
        size="sm"
        className="hidden md:flex"
      >
        Sign In
      </Button>
    )
  }

  const getSubscriptionBadge = () => {
    switch (user?.subscription) {
      case 'pro':
        return <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Pro</span>
      case 'enterprise':
        return <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full flex items-center">
          <Crown className="h-3 w-3 mr-1" />
          Enterprise
        </span>
      default:
        return <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Free</span>
    }
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* User Avatar/Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="hidden md:block text-left">
          <div className="flex items-center space-x-1">
            <span className="text-sm font-medium text-gray-900 truncate max-w-24">
              {user?.name}
            </span>
            {getSubscriptionBadge()}
          </div>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info Header with Gamification */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center relative">
                  <span className="text-white font-medium">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                  {/* Level Badge */}
                  <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {freemium.xp.currentLevel}
                  </div>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email}
                </p>
                <div className="flex items-center mt-1 space-x-2">
                  {getSubscriptionBadge()}
                  <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-full">
                    <Zap className="h-3 w-3 text-blue-600" />
                    <span className="text-xs font-medium text-blue-800">
                      {freemium.xp.totalXP.toLocaleString()} XP
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* XP Progress Bar */}
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Level {freemium.xp.currentLevel}</span>
                <span className="text-gray-600">{freemium.xp.xpToNextLevel} XP to next level</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${freemium.xp.levelProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FolderOpen className="h-4 w-4 mr-3 text-gray-400" />
              My Projects
            </Link>

            <Link
              href="/wishlist"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <BookmarkIcon className="h-4 w-4 mr-3 text-gray-400" />
              Wishlist
            </Link>

            <Link
              href="/account/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Settings className="h-4 w-4 mr-3 text-gray-400" />
              Account Settings
            </Link>

            <Link
              href="/account/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <User className="h-4 w-4 mr-3 text-gray-400" />
              Profile
            </Link>
          </div>

          {/* Subscription Actions */}
          {user?.subscription === 'free' && (
            <div className="border-t border-gray-100 py-2">
              <Link
                href="/pricing"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <Crown className="h-4 w-4 mr-3" />
                Upgrade to Pro
              </Link>
            </div>
          )}

          {/* Logout */}
          <div className="border-t border-gray-100 py-2">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}