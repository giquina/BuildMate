'use client'

import { cn } from '@/lib/utils'
import { 
  Check, 
  Lock,
  Home,
  Users,
  PoundSterling,
  Clock,
  Sparkles,
  Trophy,
  Star,
  FlaskConical
} from 'lucide-react'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: keyof typeof iconMap
  category: 'project' | 'smart' | 'professional' | 'budget' | 'milestone'
  earned: boolean
  earnedDate?: Date
  points?: number
}

export interface AchievementBadgeProps {
  achievement: Achievement
  size?: 'sm' | 'md' | 'lg'
  variant?: 'card' | 'compact' | 'minimal'
  showDescription?: boolean
  showDate?: boolean
  showPoints?: boolean
  className?: string
  onClick?: () => void
}

// Icon mapping for different achievement types
const iconMap = {
  home: { outline: Home, solid: Home },
  users: { outline: Users, solid: Users },
  currency: { outline: PoundSterling, solid: PoundSterling },
  clock: { outline: Clock, solid: Clock },
  sparkles: { outline: Sparkles, solid: Sparkles },
  trophy: { outline: Trophy, solid: Trophy },
  star: { outline: Star, solid: Star },
  beaker: { outline: FlaskConical, solid: FlaskConical },
  check: { outline: Check, solid: Check }
}

const categoryColors = {
  project: 'from-blue-500 to-blue-600',
  smart: 'from-purple-500 to-purple-600',
  professional: 'from-green-500 to-green-600',
  budget: 'from-orange-500 to-orange-600',
  milestone: 'from-pink-500 to-pink-600'
}

const sizeVariants = {
  sm: {
    container: 'p-3',
    icon: 'w-6 h-6',
    title: 'text-sm font-medium',
    description: 'text-xs',
    badge: 'w-16 h-16'
  },
  md: {
    container: 'p-4',
    icon: 'w-8 h-8',
    title: 'text-base font-semibold',
    description: 'text-sm',
    badge: 'w-20 h-20'
  },
  lg: {
    container: 'p-6',
    icon: 'w-10 h-10',
    title: 'text-lg font-bold',
    description: 'text-base',
    badge: 'w-24 h-24'
  }
}

export function AchievementBadge({
  achievement,
  size = 'md',
  variant = 'card',
  showDescription = true,
  showDate = false,
  showPoints = false,
  className,
  onClick,
  ...props
}: AchievementBadgeProps) {
  const { earned, title, description, icon, category, earnedDate, points } = achievement
  const IconComponent = earned 
    ? iconMap[icon]?.solid || iconMap.check.solid
    : iconMap[icon]?.outline || iconMap.check.outline

  const sizes = sizeVariants[size]

  // Compact variant - minimal display
  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200',
          earned 
            ? `bg-gradient-to-r ${categoryColors[category]} text-white shadow-md hover:shadow-lg` 
            : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600',
          onClick && 'cursor-pointer hover:scale-105',
          className
        )}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={(e) => {
          if (onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            onClick()
          }
        }}
        {...props}
      >
        <IconComponent className="w-4 h-4 flex-shrink-0" />
        <span className="text-sm font-medium truncate">{title}</span>
        {showPoints && points && earned && (
          <span className="text-xs opacity-80">+{points}</span>
        )}
      </div>
    )
  }

  // Minimal variant - just the badge
  if (variant === 'minimal') {
    return (
      <div
        className={cn(
          'relative inline-flex items-center justify-center rounded-full transition-all duration-300',
          sizes.badge,
          earned
            ? `bg-gradient-to-br ${categoryColors[category]} text-white shadow-lg hover:shadow-xl transform hover:scale-110`
            : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500',
          onClick && 'cursor-pointer',
          className
        )}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        title={`${title}${earned ? ` - Earned ${earnedDate?.toLocaleDateString()}` : ' - Not earned yet'}`}
        onKeyDown={(e) => {
          if (onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            onClick()
          }
        }}
        {...props}
      >
        <IconComponent className={sizes.icon} />
        
        {/* Lock overlay for unearned achievements */}
        {!earned && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full">
            <Lock className="w-4 h-4 text-gray-500" />
          </div>
        )}
        
        {/* Points badge */}
        {showPoints && points && earned && (
          <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {points}
          </div>
        )}
      </div>
    )
  }

  // Card variant - full display (default)
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border transition-all duration-300',
        sizes.container,
        earned
          ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg'
          : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 opacity-75',
        onClick && 'cursor-pointer hover:scale-105',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick()
        }
      }}
      {...props}
    >
      {/* Gradient background for earned achievements */}
      {earned && (
        <div 
          className={cn(
            'absolute top-0 left-0 w-full h-1 bg-gradient-to-r',
            categoryColors[category]
          )} 
        />
      )}

      <div className="flex items-start gap-3">
        {/* Icon container */}
        <div
          className={cn(
            'flex-shrink-0 rounded-full p-2 transition-all duration-300',
            earned
              ? `bg-gradient-to-br ${categoryColors[category]} text-white shadow-md`
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
          )}
        >
          <IconComponent className={sizes.icon} />
          
          {/* Lock overlay for unearned achievements */}
          {!earned && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Lock className="w-3 h-3 text-gray-500" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className={cn(
              sizes.title,
              earned ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'
            )}>
              {title}
            </h3>
            
            {showPoints && points && earned && (
              <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">{points}</span>
              </div>
            )}
          </div>

          {showDescription && (
            <p className={cn(
              sizes.description,
              'mt-1',
              earned ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'
            )}>
              {description}
            </p>
          )}

          {showDate && earnedDate && earned && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Earned {earnedDate.toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// Predefined achievements for the construction platform
export const defaultAchievements: Achievement[] = [
  {
    id: 'first-project',
    title: 'First Project',
    description: 'Created your first construction project',
    icon: 'home',
    category: 'project',
    earned: false,
    points: 10
  },
  {
    id: 'ai-floorplan',
    title: 'Smart Architect',
    description: 'Generated your first smart floorplan',
    icon: 'sparkles',
    category: 'smart',
    earned: false,
    points: 15
  },
  {
    id: 'verified-professional',
    title: 'Professional Network',
    description: 'Connected with a verified professional',
    icon: 'users',
    category: 'professional',
    earned: false,
    points: 20
  },
  {
    id: 'budget-optimizer',
    title: 'Budget Master',
    description: 'Optimized project budget by 10% or more',
    icon: 'currency',
    category: 'budget',
    earned: false,
    points: 25
  },
  {
    id: 'project-complete',
    title: 'Project Complete',
    description: 'Successfully completed your first project',
    icon: 'trophy',
    category: 'milestone',
    earned: false,
    points: 50
  },
  {
    id: 'early-adopter',
    title: 'Early Adopter',
    description: 'One of the first 100 users on BuildMate AI',
    icon: 'star',
    category: 'milestone',
    earned: false,
    points: 30
  }
]