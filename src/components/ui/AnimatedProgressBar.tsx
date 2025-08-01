'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export interface AnimatedProgressBarProps {
  value: number // 0-100 percentage
  label?: string
  description?: string
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'red'
  size?: 'sm' | 'md' | 'lg'
  showPercentage?: boolean
  animationDuration?: number // in milliseconds
  className?: string
  'aria-label'?: string
}

const colorVariants = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  orange: 'bg-orange-500',
  purple: 'bg-purple-500',
  red: 'bg-red-500'
}

const sizeVariants = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4'
}

export function AnimatedProgressBar({
  value,
  label,
  description,
  color = 'blue',
  size = 'md',
  showPercentage = true,
  animationDuration = 1000,
  className,
  'aria-label': ariaLabel,
  ...props
}: AnimatedProgressBarProps) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // Animate progress bar when component mounts or value changes
  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setAnimatedValue(Math.min(Math.max(value, 0), 100))
    }, 100) // Small delay for better visual effect

    return () => clearTimeout(timer)
  }, [value])

  const progressBarId = `progress-${Math.random().toString(36).substr(2, 9)}`
  const percentage = Math.round(animatedValue)

  return (
    <div className={cn('w-full', className)} {...props}>
      {/* Label and percentage row */}
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <label 
              htmlFor={progressBarId}
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {label}
            </label>
          )}
          {showPercentage && (
            <span 
              className="text-sm font-medium text-gray-600 dark:text-gray-400"
              aria-live="polite"
            >
              {percentage}%
            </span>
          )}
        </div>
      )}

      {/* Progress bar container */}
      <div className="relative">
        <div
          className={cn(
            'w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden',
            sizeVariants[size]
          )}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={ariaLabel || label || `Progress: ${percentage}%`}
          tabIndex={0}
        >
          {/* Animated progress fill */}
          <div
            id={progressBarId}
            className={cn(
              'h-full rounded-full transition-all ease-out',
              colorVariants[color],
              isVisible ? 'opacity-100' : 'opacity-0'
            )}
            style={{
              width: `${animatedValue}%`,
              transitionDuration: `${animationDuration}ms`
            }}
            aria-hidden="true"
          />
        </div>

        {/* Shine effect for visual appeal */}
        <div
          className={cn(
            'absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full transition-transform duration-1000 ease-out',
            sizeVariants[size],
            isVisible ? 'translate-x-full' : '-translate-x-full'
          )}
          style={{
            width: '30%',
            transitionDelay: `${animationDuration * 0.3}ms`
          }}
        />
      </div>

      {/* Description */}
      {description && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  )
}