'use client'

import React, { useState, useEffect } from 'react'
import { DailyChallenge, UserStreak } from '@/types/freemium'
import { cn } from '@/lib/utils'
import { Button } from './Button'
import { Card } from './Card'
import { Progress } from './Progress'

interface DailyChallengesProps {
  challenges: DailyChallenge[]
  streaks: UserStreak[]
  onChallengeComplete?: (challengeId: string) => void
  onClaimReward?: (challengeId: string) => void
  className?: string
}

interface ChallengeCardProps {
  challenge: DailyChallenge
  onComplete?: () => void
  onClaim?: () => void
}

interface StreakDisplayProps {
  streaks: UserStreak[]
}

const categoryIcons = {
  project: '🏗️',
  engagement: '💪',
  learning: '📚',
  social: '🤝'
}

const categoryColors = {
  project: 'from-blue-400 to-blue-600',
  engagement: 'from-green-400 to-green-600',
  learning: 'from-purple-400 to-purple-600',
  social: 'from-orange-400 to-orange-600'
}

const difficultyColors = {
  easy: 'border-green-300 bg-green-50',
  medium: 'border-yellow-300 bg-yellow-50',
  hard: 'border-red-300 bg-red-50'
}

function ChallengeCard({ challenge, onComplete, onClaim }: ChallengeCardProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const progressPercentage = (challenge.progress / challenge.requirement) * 100
  const isComplete = challenge.completed
  const canClaim = isComplete && challenge.badgeReward
  const isExpired = new Date() > challenge.expiresAt
  const timeLeft = challenge.expiresAt.getTime() - Date.now()
  const hoursLeft = Math.ceil(timeLeft / (1000 * 60 * 60))

  useEffect(() => {
    if (isComplete) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [isComplete])

  const getDifficulty = () => {
    if (challenge.xpReward >= 100) return 'hard'
    if (challenge.xpReward >= 50) return 'medium'
    return 'easy'
  }

  const formatTimeLeft = () => {
    if (hoursLeft <= 1) return 'Expires soon!'
    if (hoursLeft <= 24) return `${hoursLeft}h left`
    return 'Today'
  }

  return (
    <Card className={cn(
      'p-4 border-l-4 transition-all duration-300 hover:shadow-lg',
      isComplete ? 'bg-green-50 border-green-500' : difficultyColors[getDifficulty()],
      isAnimating && 'animate-pulse scale-105',
      isExpired && !isComplete && 'opacity-60 grayscale'
    )}>
      {/* Challenge Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center text-white text-xl',
            'bg-gradient-to-br',
            categoryColors[challenge.category]
          )}>
            {categoryIcons[challenge.category]}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 flex items-center">
              {challenge.name}
              {isComplete && (
                <span className="ml-2 text-green-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </h3>
            <p className="text-sm text-gray-600">{challenge.description}</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className={cn(
                'px-2 py-1 rounded-full text-xs font-medium',
                getDifficulty() === 'hard' ? 'bg-red-100 text-red-700' :
                getDifficulty() === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              )}>
                {getDifficulty().toUpperCase()}
              </div>
              <span className="text-xs text-gray-500">
                {challenge.category.charAt(0).toUpperCase() + challenge.category.slice(1)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-lg font-bold text-blue-600">
            +{challenge.xpReward} XP
          </div>
          {!isExpired && (
            <div className="text-xs text-gray-500">
              {formatTimeLeft()}
            </div>
          )}
          {isExpired && !isComplete && (
            <div className="text-xs text-red-500 font-medium">
              Expired
            </div>
          )}
        </div>
      </div>

      {/* Progress Section */}
      {!isComplete && !isExpired && (
        <div className="space-y-2 mb-4">
          <Progress value={Math.min(progressPercentage, 100)} className="h-3" />
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {challenge.progress} / {challenge.requirement}
            </span>
            <span className="font-medium text-gray-900">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
        </div>
      )}

      {/* Completed State */}
      {isComplete && (
        <div className="bg-green-100 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-green-800 font-medium">Challenge Complete!</span>
            </div>
            <div className="text-green-700 text-sm">
              +{challenge.xpReward} XP Earned
            </div>
          </div>
          {challenge.badgeReward && (
            <div className="mt-2 text-sm text-green-700">
              🏆 Badge reward available!
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2">
        {!isComplete && !isExpired && (
          <Button 
            onClick={onComplete}
            variant="primary"
            size="sm"
            className="flex-1"
            disabled={progressPercentage < 100}
          >
            {progressPercentage >= 100 ? 'Complete Challenge' : 'In Progress'}
          </Button>
        )}
        
        {canClaim && (
          <Button 
            onClick={onClaim}
            variant="construction"
            size="sm"
            className="flex-1 animate-pulse"
          >
            Claim Reward
          </Button>
        )}

        {isExpired && !isComplete && (
          <Button 
            variant="ghost"
            size="sm"
            className="flex-1"
            disabled
          >
            Expired
          </Button>
        )}
      </div>

      {/* Special Effects */}
      {isComplete && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
          <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-300 rounded-full opacity-20 animate-ping" />
          <div className="absolute bottom-0 left-0 w-12 h-12 bg-green-300 rounded-full opacity-20 animate-bounce" />
        </div>
      )}
    </Card>
  )
}

function StreakDisplay({ streaks }: StreakDisplayProps) {
  const dailyStreak = streaks.find(s => s.type === 'daily')
  const weeklyStreak = streaks.find(s => s.type === 'weekly')

  const getStreakColor = (current: number) => {
    if (current >= 30) return 'from-purple-400 to-purple-600'
    if (current >= 14) return 'from-orange-400 to-orange-600'
    if (current >= 7) return 'from-blue-400 to-blue-600'
    return 'from-green-400 to-green-600'
  }

  const getStreakEmoji = (current: number) => {
    if (current >= 30) return '🔥'
    if (current >= 14) return '⚡'
    if (current >= 7) return '💪'
    return '🌱'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Daily Streak */}
      {dailyStreak && (
        <Card className="p-4 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl',
                'bg-gradient-to-br',
                getStreakColor(dailyStreak.current)
              )}>
                {getStreakEmoji(dailyStreak.current)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Daily Streak</h3>
                <p className="text-sm text-gray-600">Consecutive days active</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-600">
                {dailyStreak.current}
              </div>
              <div className="text-xs text-gray-500">days</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Best: {dailyStreak.longest} days
            </span>
            <span className="font-medium text-orange-600">
              {dailyStreak.multiplier}x XP multiplier
            </span>
          </div>

          {dailyStreak.current >= 7 && (
            <div className="mt-2 text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-sm font-medium">
                🎉 On fire! Keep it up!
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Weekly Streak */}
      {weeklyStreak && (
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl',
                'bg-gradient-to-br from-blue-400 to-indigo-600'
              )}>
                📅
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Weekly Streak</h3>
                <p className="text-sm text-gray-600">Consecutive weeks active</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {weeklyStreak.current}
              </div>
              <div className="text-xs text-gray-500">weeks</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Best: {weeklyStreak.longest} weeks
            </span>
            <span className="font-medium text-blue-600">
              {weeklyStreak.multiplier}x XP multiplier
            </span>
          </div>
        </Card>
      )}
    </div>
  )
}

function ChallengeStats({ challenges }: { challenges: DailyChallenge[] }) {
  const completedToday = challenges.filter(c => c.completed && c.type === 'daily').length
  const totalXPToday = challenges.reduce((sum, c) => sum + (c.completed ? c.xpReward : 0), 0)
  const completionRate = challenges.length > 0 ? (completedToday / challenges.length) * 100 : 0

  return (
    <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">
            {completedToday}
          </div>
          <div className="text-sm text-gray-600">
            Challenges Completed Today
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">
            {totalXPToday}
          </div>
          <div className="text-sm text-gray-600">
            XP Earned Today
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600">
            {Math.round(completionRate)}%
          </div>
          <div className="text-sm text-gray-600">
            Completion Rate
          </div>
        </div>
      </div>
    </Card>
  )
}

export function DailyChallenges({ 
  challenges, 
  streaks, 
  onChallengeComplete, 
  onClaimReward, 
  className 
}: DailyChallengesProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('active')
  const [showExpired, setShowExpired] = useState(false)

  // Mock data if no challenges provided
  const mockChallenges: DailyChallenge[] = challenges.length ? challenges : [
    {
      id: '1',
      type: 'daily',
      name: 'First Steps',
      description: 'Complete your project setup',
      requirement: 1,
      progress: 0,
      completed: false,
      xpReward: 50,
      expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000), // 20 hours from now
      category: 'project'
    },
    {
      id: '2',
      type: 'daily',
      name: 'AI Assistant',
      description: 'Generate 3 AI suggestions for your project',
      requirement: 3,
      progress: 2,
      completed: false,
      xpReward: 75,
      expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000), // 18 hours from now
      category: 'engagement'
    },
    {
      id: '3',
      type: 'daily',
      name: 'Learning Explorer',
      description: 'Read 2 BuildMate guides',
      requirement: 2,
      progress: 2,
      completed: true,
      xpReward: 40,
      badgeReward: 'knowledge_seeker',
      expiresAt: new Date(Date.now() + 15 * 60 * 60 * 1000),
      category: 'learning'
    },
    {
      id: '4',
      type: 'weekly',
      name: 'Social Builder',
      description: 'Connect with 2 professionals this week',
      requirement: 2,
      progress: 1,
      completed: false,
      xpReward: 200,
      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      category: 'social'
    },
    {
      id: '5',
      type: 'monthly',
      name: 'Master Builder',
      description: 'Complete 5 projects this month',
      requirement: 5,
      progress: 2,
      completed: false,
      xpReward: 500,
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
      category: 'project'
    }
  ]

  const mockStreaks: UserStreak[] = streaks.length ? streaks : [
    {
      type: 'daily',
      current: 7,
      longest: 12,
      lastActivity: new Date(),
      multiplier: 1.5
    },
    {
      type: 'weekly',
      current: 3,
      longest: 8,
      lastActivity: new Date(),
      multiplier: 2.0
    }
  ]

  const filteredChallenges = mockChallenges.filter(challenge => {
    const isExpired = new Date() > challenge.expiresAt
    
    if (!showExpired && isExpired && !challenge.completed) return false
    
    if (filter === 'active') return !challenge.completed && !isExpired
    if (filter === 'completed') return challenge.completed
    return true
  })

  const dailyChallenges = filteredChallenges.filter(c => c.type === 'daily')
  const weeklyChallenges = filteredChallenges.filter(c => c.type === 'weekly')
  const monthlyChallenges = filteredChallenges.filter(c => c.type === 'monthly')

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header Stats */}
      <ChallengeStats challenges={mockChallenges} />

      {/* Streak Display */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">🔥</span>
          Your Streaks
        </h3>
        <StreakDisplay streaks={mockStreaks} />
      </div>

      {/* Filter Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Show:</span>
          <div className="flex space-x-1">
            {(['active', 'completed', 'all'] as const).map(option => (
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
        
        <label className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            checked={showExpired}
            onChange={(e) => setShowExpired(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-gray-600">Show expired challenges</span>
        </label>
      </div>

      {/* Daily Challenges */}
      {dailyChallenges.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🎯</span>
            Today's Challenges
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {dailyChallenges.map(challenge => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                onComplete={() => onChallengeComplete?.(challenge.id)}
                onClaim={() => onClaimReward?.(challenge.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Weekly Challenges */}
      {weeklyChallenges.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📅</span>
            Weekly Challenges
          </h3>
          <div className="space-y-4">
            {weeklyChallenges.map(challenge => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                onComplete={() => onChallengeComplete?.(challenge.id)}
                onClaim={() => onClaimReward?.(challenge.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Monthly Challenges */}
      {monthlyChallenges.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🏆</span>
            Monthly Challenges
          </h3>
          <div className="space-y-4">
            {monthlyChallenges.map(challenge => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                onComplete={() => onChallengeComplete?.(challenge.id)}
                onClaim={() => onClaimReward?.(challenge.id)}
              />
            ))}
          </div>
        </div>
      )}

      {filteredChallenges.length === 0 && (
        <Card className="p-8 text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No challenges available
          </h3>
          <p className="text-gray-600">
            {filter === 'active' ? 'Complete your current challenges or check back later for new ones!' :
             filter === 'completed' ? 'You haven\'t completed any challenges yet.' :
             'Check back later for new challenges!'}
          </p>
        </Card>
      )}
    </div>
  )
}