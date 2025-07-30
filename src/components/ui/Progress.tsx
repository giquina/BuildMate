import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  variant?: 'default' | 'tesla' | 'gradient' | 'minimal' | 'construction' | 'professional'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showValue?: boolean
  animated?: boolean
  indeterminate?: boolean
  label?: string
  color?: 'tesla' | 'success' | 'warning' | 'error' | 'construction' | 'professional'
  phase?: string
  constructionStage?: 'planning' | 'design' | 'materials' | 'building' | 'completion'
}

export function Progress({ 
  className, 
  value = 0, 
  max = 100, 
  variant = 'default', 
  size = 'md', 
  showValue = false, 
  animated = true, 
  indeterminate = false, 
  label, 
  color = 'tesla',
  phase,
  constructionStage,
  ...props 
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
    xl: 'h-6'
  }

  const colors = {
    tesla: {
      bg: 'bg-blue-100',
      fill: 'bg-blue-600',
      gradient: 'bg-gradient-to-r from-blue-500 to-blue-700'
    },
    success: {
      bg: 'bg-green-100',
      fill: 'bg-green-600',
      gradient: 'bg-gradient-to-r from-green-500 to-green-700'
    },
    warning: {
      bg: 'bg-yellow-100',
      fill: 'bg-yellow-600',
      gradient: 'bg-gradient-to-r from-yellow-500 to-yellow-700'
    },
    error: {
      bg: 'bg-red-100',
      fill: 'bg-red-600',
      gradient: 'bg-gradient-to-r from-red-500 to-red-700'
    },
    construction: {
      bg: 'bg-orange-100',
      fill: 'bg-orange-600',
      gradient: 'bg-gradient-to-r from-orange-500 to-orange-700'
    },
    professional: {
      bg: 'bg-green-100',
      fill: 'bg-green-600',
      gradient: 'bg-gradient-to-r from-green-500 to-green-700'
    }
  }

  const baseStyles = cn(
    'relative w-full overflow-hidden rounded-full',
    sizes[size],
    colors[color].bg
  )

  const fillStyles = cn(
    'h-full rounded-full',
    animated && 'transition-all duration-700 ease-out',
    variant === 'gradient' ? colors[color].gradient : colors[color].fill,
    variant === 'tesla' && 'shadow-sm'
  )

  // Construction-specific progress variant
  if (variant === 'construction') {
    const stageColors = {
      planning: 'from-blue-500 to-blue-600',
      design: 'from-purple-500 to-purple-600', 
      materials: 'from-orange-500 to-orange-600',
      building: 'from-yellow-500 to-yellow-600',
      completion: 'from-green-500 to-green-600'
    }
    
    const stageBgColors = {
      planning: 'bg-blue-100',
      design: 'bg-purple-100',
      materials: 'bg-orange-100', 
      building: 'bg-yellow-100',
      completion: 'bg-green-100'
    }
    
    return (
      <div className="space-y-3">
        {(label || showValue || phase) && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              {label && <span className="font-semibold text-gray-900">{label}</span>}
              {phase && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-md">
                  {phase}
                </span>
              )}
            </div>
            {showValue && (
              <span className="font-bold text-gray-900">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <div
          className={cn(
            baseStyles, 
            constructionStage ? stageBgColors[constructionStage] : 'bg-gray-200',
            'border shadow-sm',
            className
          )}
          {...props}
        >
          {indeterminate ? (
            <div className={cn(
              'h-full w-full rounded-full animate-pulse',
              constructionStage ? `bg-gradient-to-r ${stageColors[constructionStage]}` : 'bg-gradient-to-r from-orange-500 to-orange-600'
            )} />
          ) : (
            <>
              <div
                className={cn(
                  'h-full rounded-full shadow-sm animate-progress-fill',
                  constructionStage ? `bg-gradient-to-r ${stageColors[constructionStage]}` : 'bg-gradient-to-r from-orange-500 to-orange-600',
                  animated && 'transition-all duration-1000 ease-out'
                )}
                style={{ width: `${percentage}%` }}
              />
              {/* Professional shimmer effect */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"
                style={{ 
                  width: `${Math.max(percentage, 30)}%`,
                  opacity: animated && percentage > 0 ? 0.6 : 0
                }}
              />
            </>
          )}
        </div>
      </div>
    )
  }

  if (variant === 'professional') {
    return (
      <div className="space-y-3">
        {(label || showValue) && (
          <div className="flex items-center justify-between text-sm">
            {label && <span className="font-semibold text-gray-900">{label}</span>}
            {showValue && (
              <div className="flex items-center space-x-2">
                <span className="font-bold text-green-600">
                  {Math.round(percentage)}%
                </span>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-professional-pulse" />
              </div>
            )}
          </div>
        )}
        <div
          className={cn(baseStyles, 'bg-green-50 border-2 border-green-200 shadow-lg', className)}
          {...props}
        >
          <div
            className={cn(
              'h-full rounded-full bg-gradient-to-r from-green-500 to-green-600 shadow-md',
              animated && 'transition-all duration-700 ease-out'
            )}
            style={{ width: `${percentage}%` }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
            style={{ 
              width: `${Math.max(percentage, 25)}%`,
              opacity: animated ? 0.8 : 0
            }}
          />
        </div>
      </div>
    )
  }

  if (variant === 'tesla') {
    return (
      <div className="space-y-2">
        {(label || showValue) && (
          <div className="flex items-center justify-between text-sm">
            {label && <span className="font-medium text-slate-900">{label}</span>}
            {showValue && (
              <span className="font-semibold text-blue-600">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <div
          className={cn(baseStyles, 'bg-blue-50 border border-blue-100', className)}
          {...props}
        >
          {indeterminate ? (
            <div className="h-full w-full bg-gradient-to-r from-tesla-600 to-tesla-400 rounded-full animate-pulse" />
          ) : (
            <>
              <div
                className={fillStyles}
                style={{ width: `${percentage}%` }}
              />
              {/* Shimmer effect */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
                style={{ 
                  width: `${Math.max(percentage, 20)}%`,
                  opacity: animated ? 1 : 0
                }}
              />
            </>
          )}
        </div>
      </div>
    )
  }

  if (variant === 'minimal') {
    return (
      <div className="space-y-1">
        {(label || showValue) && (
          <div className="flex items-center justify-between text-xs">
            {label && <span className="text-slate-600">{label}</span>}
            {showValue && (
              <span className="text-slate-900 font-medium">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <div className={cn('relative w-full bg-slate-200 rounded-full', sizes[size], className)} {...props}>
          {indeterminate ? (
            <div className="h-full w-1/3 bg-slate-600 rounded-full animate-pulse" />
          ) : (
            <div
              className={cn('h-full bg-slate-600 rounded-full transition-all duration-300')}
              style={{ width: `${percentage}%` }}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {(label || showValue) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="font-medium text-slate-700">{label}</span>}
          {showValue && (
            <span className="text-slate-900 font-semibold">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={cn(baseStyles, className)} {...props}>
        {indeterminate ? (
          <div className={cn('h-full w-1/3 rounded-full animate-pulse', colors[color].fill)} />
        ) : (
          <div
            className={fillStyles}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  )
}

// Circular Progress Component
interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  size?: number
  strokeWidth?: number
  variant?: 'default' | 'tesla'
  showValue?: boolean
  animated?: boolean
  indeterminate?: boolean
  color?: 'tesla' | 'success' | 'warning' | 'error'
}

export function CircularProgress({ 
  className, 
  value = 0, 
  max = 100, 
  size = 48, 
  strokeWidth = 4, 
  variant = 'default', 
  showValue = false, 
  animated = true, 
  indeterminate = false, 
  color = 'tesla', 
  ...props 
}: CircularProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const colors = {
    tesla: 'stroke-blue-600',
    success: 'stroke-success-600',
    warning: 'stroke-warning-600',
    error: 'stroke-error-600'
  }

  const backgroundColors = {
    tesla: 'stroke-blue-100',
    success: 'stroke-success-100',
    warning: 'stroke-warning-100',
    error: 'stroke-error-100'
  }

  if (variant === 'tesla') {
    return (
      <div className={cn('relative inline-flex items-center justify-center', className)} {...props}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(30, 64, 175, 0.1))' }}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className={backgroundColors[color]}
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className={cn(colors[color], animated && 'transition-all duration-700 ease-out')}
            style={{
              strokeDasharray,
              strokeDashoffset: indeterminate ? 0 : strokeDashoffset,
              animation: indeterminate ? 'spin 2s linear infinite' : undefined
            }}
          />
        </svg>
        
        {showValue && !indeterminate && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-semibold text-blue-600">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} {...props}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="stroke-slate-200"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={cn(colors[color], animated && 'transition-all duration-500 ease-out')}
          style={{
            strokeDasharray,
            strokeDashoffset: indeterminate ? 0 : strokeDashoffset,
            animation: indeterminate ? 'spin 2s linear infinite' : undefined
          }}
        />
      </svg>
      
      {showValue && !indeterminate && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-slate-700">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  )
}

// Step Progress Component
interface StepProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Array<{
    label: string
    description?: string
    completed?: boolean
  }>
  currentStep?: number
  variant?: 'default' | 'tesla'
  orientation?: 'horizontal' | 'vertical'
}

export function StepProgress({ 
  className, 
  steps, 
  currentStep = 0, 
  variant = 'default', 
  orientation = 'horizontal', 
  ...props 
}: StepProgressProps) {
  if (variant === 'tesla') {
    return (
      <div
        className={cn(
          'flex',
          orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col',
          className
        )}
        {...props}
      >
        {steps.map((step, index) => {
          const isCompleted = step.completed || index < currentStep
          const isCurrent = index === currentStep
          const isUpcoming = index > currentStep

          return (
            <React.Fragment key={index}>
              <div
                className={cn(
                  'flex',
                  orientation === 'horizontal' ? 'flex-col items-center' : 'flex-row items-start',
                  orientation === 'horizontal' ? 'text-center' : 'text-left'
                )}
              >
                {/* Step Circle */}
                <div
                  className={cn(
                    'flex items-center justify-center rounded-full border-2 font-semibold transition-all duration-300',
                    orientation === 'horizontal' ? 'w-10 h-10 text-base mb-2' : 'w-8 h-8 text-sm mr-4 mt-0.5',
                    isCompleted && 'bg-blue-600 border-blue-600 text-white shadow-lg',
                    isCurrent && 'bg-blue-50 border-blue-600 text-blue-600 ring-4 ring-blue-100',
                    isUpcoming && 'bg-white border-slate-300 text-slate-400'
                  )}
                >
                  {isCompleted ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Step Content */}
                <div className={orientation === 'vertical' ? 'flex-1 pb-8' : ''}>
                  <div
                    className={cn(
                      'font-semibold text-base',
                      isCompleted && 'text-blue-600',
                      isCurrent && 'text-blue-600',
                      isUpcoming && 'text-slate-500'
                    )}
                  >
                    {step.label}
                  </div>
                  {step.description && (
                    <div
                      className={cn(
                        'text-sm mt-1',
                        isCompleted && 'text-slate-600',
                        isCurrent && 'text-slate-600',
                        isUpcoming && 'text-slate-400'
                      )}
                    >
                      {step.description}
                    </div>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'transition-all duration-300',
                    orientation === 'horizontal'
                      ? 'flex-1 h-1 mx-4 mb-6'
                      : 'w-1 h-8 ml-4 -mt-8',
                    isCompleted ? 'bg-blue-600' : 'bg-slate-200'
                  )}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
    )
  }

  // Default variant
  return (
    <div
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col',
        className
      )}
      {...props}
    >
      {steps.map((step, index) => {
        const isCompleted = step.completed || index < currentStep
        const isCurrent = index === currentStep

        return (
          <React.Fragment key={index}>
            <div className="flex items-center">
              <div
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium',
                  isCompleted && 'bg-slate-900 border-slate-900 text-white',
                  isCurrent && 'bg-white border-slate-900 text-slate-900',
                  !isCompleted && !isCurrent && 'bg-white border-slate-300 text-slate-300'
                )}
              >
                {isCompleted ? '✓' : index + 1}
              </div>
              {orientation === 'horizontal' && (
                <div className="ml-3">
                  <div className="text-sm font-medium text-slate-900">{step.label}</div>
                  {step.description && (
                    <div className="text-xs text-slate-500">{step.description}</div>
                  )}
                </div>
              )}
            </div>

            {index < steps.length - 1 && orientation === 'horizontal' && (
              <div className="flex-1 h-0.5 bg-slate-200 mx-4" />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}