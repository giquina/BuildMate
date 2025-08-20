'use client'

import React, { useState, useEffect } from 'react'
import { Badge, XPTracking } from '@/types/freemium'
import { cn } from '@/lib/utils'
import { Button } from './Button'
import { Card } from './Card'

interface BadgeSystemProps {
  badges: Badge[]
  userXP: XPTracking
  onBadgeClick?: (badge: Badge) => void
  showProgress?: boolean
  className?: string
}

interface BadgeCardProps {
  badge: Badge
  isUnlocked: boolean
  onClick?: () => void
  showProgress?: boolean
}

const rarityColors = {
  common: 'from-gray-400 to-gray-600',
  rare: 'from-blue-400 to-blue-600', 
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-orange-500'
}

const rarityGlow = {
  common: 'shadow-md',
  rare: 'shadow-lg shadow-blue-500/25',
  epic: 'shadow-xl shadow-purple-500/30',
  legendary: 'shadow-2xl shadow-yellow-500/40 animate-pulse'
}

function BadgeCard({ badge, isUnlocked, onClick, showProgress = true }: BadgeCardProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const progressPercentage = badge.maxProgress ? (badge.progress || 0) / badge.maxProgress * 100 : 100

  useEffect(() => {
    if (isUnlocked && badge.unlockedAt) {
      const timeSinceUnlock = Date.now() - badge.unlockedAt.getTime()
      if (timeSinceUnlock < 5000) { // Show animation for 5 seconds after unlock
        setIsAnimating(true)
        const timer = setTimeout(() => setIsAnimating(false), 3000)
        return () => clearTimeout(timer)
      }
    }
  }, [isUnlocked, badge.unlockedAt])

  return (
    <Card 
      className={cn(
        'relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105',
        'border-2 p-4 min-h-[140px] flex flex-col items-center justify-center',
        isUnlocked ? [
          'border-transparent bg-gradient-to-br',
          rarityColors[badge.rarity],
          rarityGlow[badge.rarity]
        ] : [
          'border-gray-200 bg-gray-50 opacity-60 hover:opacity-80'
        ],
        isAnimating && 'animate-bounce'
      )}
      onClick={onClick}
    >
      {/* Legendary sparkle effect */}
      {isUnlocked && badge.rarity === 'legendary' && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-white rounded-full animate-ping opacity-75" />
          <div className="absolute top-2 right-1 w-2 h-2 bg-yellow-200 rounded-full animate-pulse" />
          <div className="absolute bottom-1 left-2 w-1 h-1 bg-orange-200 rounded-full animate-bounce" />
        </div>
      )}

      {/* Badge Icon */}
      <div className={cn(
        'text-4xl mb-2 transition-transform duration-300',
        isUnlocked ? 'scale-100' : 'scale-75 grayscale',
        isAnimating && 'animate-pulse scale-110'
      )}>
        {badge.icon}
      </div>

      {/* Badge Name */}
      <h3 className={cn(
        'font-semibold text-sm text-center mb-1',
        isUnlocked ? 'text-white' : 'text-gray-500'
      )}>
        {badge.name}
      </h3>

      {/* Rarity Badge */}
      <div className={cn(
        'px-2 py-1 rounded-full text-xs font-medium mb-2',
        isUnlocked ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'
      )}>
        {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
      </div>

      {/* Progress Bar (for badges with progress) */}
      {showProgress && badge.maxProgress && !isUnlocked && (
        <div className="w-full mt-auto">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-blue-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 text-center">
            {badge.progress || 0} / {badge.maxProgress}
          </p>
        </div>
      )}

      {/* XP Reward */}
      {isUnlocked && (
        <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-xs font-medium text-white">+{badge.xpReward} XP</span>
        </div>
      )}

      {/* New Badge Indicator */}
      {isUnlocked && badge.unlockedAt && Date.now() - badge.unlockedAt.getTime() < 24 * 60 * 60 * 1000 && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
          NEW!
        </div>
      )}
    </Card>
  )
}

function BadgeModal({ badge, isOpen, onClose }: { badge: Badge; isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        {/* Badge Display */}
        <div className="text-center mb-6">
          <div className={cn(
            'inline-flex items-center justify-center w-20 h-20 rounded-full mb-4',
            'bg-gradient-to-br', rarityColors[badge.rarity], rarityGlow[badge.rarity]
          )}>
            <span className="text-4xl">{badge.icon}</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{badge.name}</h2>
          
          <div className={cn(
            'inline-block px-3 py-1 rounded-full text-sm font-medium mb-3',
            badge.rarity === 'legendary' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
            badge.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
            badge.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          )}>
            {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)} Badge
          </div>
        </div>

        {/* Badge Description */}
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-4">{badge.description}</p>
          
          {badge.unlockedAt && (
            <p className="text-sm text-gray-500">
              Unlocked on {badge.unlockedAt.toLocaleDateString()}
            </p>
          )}
          
          <div className="flex items-center justify-center space-x-4 mt-4 text-sm">
            <div className="flex items-center space-x-1">
              <span className="text-blue-600 font-medium">+{badge.xpReward} XP</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full" />
            <div className="text-gray-500">
              {badge.category.charAt(0).toUpperCase() + badge.category.slice(1)}
            </div>
          </div>
        </div>

        {/* Close Button */}
        <Button 
          onClick={onClose}
          className="w-full"
          variant="outline"
        >
          Close
        </Button>
      </div>
    </div>
  )
}

export function BadgeSystem({ 
  badges, 
  userXP, 
  onBadgeClick, 
  showProgress = true, 
  className 
}: BadgeSystemProps) {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all')
  const [sortBy, setSortBy] = useState<'rarity' | 'recent' | 'progress'>('rarity')

  const unlockedBadges = badges.filter(badge => badge.unlockedAt)
  const lockedBadges = badges.filter(badge => !badge.unlockedAt)
  const recentBadges = unlockedBadges
    .sort((a, b) => (b.unlockedAt?.getTime() || 0) - (a.unlockedAt?.getTime() || 0))
    .slice(0, 3)

  const filteredBadges = badges.filter(badge => {
    if (filter === 'unlocked') return badge.unlockedAt
    if (filter === 'locked') return !badge.unlockedAt
    return true
  })

  const sortedBadges = [...filteredBadges].sort((a, b) => {
    if (sortBy === 'rarity') {
      const rarityOrder = { common: 1, rare: 2, epic: 3, legendary: 4 }
      return rarityOrder[b.rarity] - rarityOrder[a.rarity]
    }
    if (sortBy === 'recent') {
      return (b.unlockedAt?.getTime() || 0) - (a.unlockedAt?.getTime() || 0)
    }
    if (sortBy === 'progress' && a.maxProgress && b.maxProgress) {
      const aProgress = (a.progress || 0) / a.maxProgress
      const bProgress = (b.progress || 0) / b.maxProgress
      return bProgress - aProgress
    }
    return 0
  })

  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge)
    onBadgeClick?.(badge)
  }

  const nextBadgeToUnlock = lockedBadges
    .filter(badge => badge.maxProgress)
    .sort((a, b) => {
      const aProgress = (a.progress || 0) / (a.maxProgress || 1)
      const bProgress = (b.progress || 0) / (b.maxProgress || 1)
      return bProgress - aProgress
    })[0]

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{unlockedBadges.length}</div>
            <div className="text-sm text-gray-600">Badges Earned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {unlockedBadges.filter(b => b.rarity === 'legendary').length}
            </div>
            <div className="text-sm text-gray-600">Legendary</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.round((unlockedBadges.length / badges.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Collection</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {unlockedBadges.reduce((total, badge) => total + badge.xpReward, 0)}
            </div>
            <div className="text-sm text-gray-600">XP from Badges</div>
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      {recentBadges.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🏆</span>
            Recent Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentBadges.map(badge => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                isUnlocked={true}
                onClick={() => handleBadgeClick(badge)}
                showProgress={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* Next Badge Progress */}
      {nextBadgeToUnlock && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🎯</span>
            Next Badge to Unlock
          </h3>
          <div className="flex items-center space-x-4">
            <div className="text-3xl">{nextBadgeToUnlock.icon}</div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{nextBadgeToUnlock.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{nextBadgeToUnlock.description}</p>
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-yellow-500 h-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min(
                      ((nextBadgeToUnlock.progress || 0) / (nextBadgeToUnlock.maxProgress || 1)) * 100, 
                      100
                    )}%` 
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {nextBadgeToUnlock.progress || 0} / {nextBadgeToUnlock.maxProgress}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Sort Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Filter:</span>
          <div className="flex space-x-1">
            {(['all', 'unlocked', 'locked'] as const).map(option => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={cn(
                  'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                  filter === option 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Sort:</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
          >
            <option value="rarity">Rarity</option>
            <option value="recent">Recently Earned</option>
            <option value="progress">Progress</option>
          </select>
        </div>
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {sortedBadges.map(badge => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            isUnlocked={!!badge.unlockedAt}
            onClick={() => handleBadgeClick(badge)}
            showProgress={showProgress}
          />
        ))}
      </div>

      {/* Badge Detail Modal */}
      <BadgeModal 
        badge={selectedBadge!}
        isOpen={!!selectedBadge}
        onClose={() => setSelectedBadge(null)}
      />
    </div>
  )
}