import * as React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'tesla' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
  dot?: boolean
  dismissible?: boolean
  onDismiss?: () => void
  icon?: React.ReactNode
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  rounded = false,
  dot = false,
  dismissible = false,
  onDismiss,
  icon,
  children,
  ...props
}: BadgeProps) {
  const baseStyles = cn(
    'inline-flex items-center font-medium transition-all duration-200',
    rounded ? 'rounded-full' : 'rounded-lg',
    dismissible && 'pr-1'
  )

  const variants = {
    default: 'bg-slate-100 text-slate-800 hover:bg-slate-200',
    secondary: 'bg-slate-800 text-white hover:bg-slate-700',
    outline: 'border border-slate-300 text-slate-700 bg-white hover:bg-slate-50',
    tesla: 'bg-tesla-100 text-tesla-800 hover:bg-tesla-200 border border-tesla-200',
    success: 'bg-success-100 text-success-800 hover:bg-success-200 border border-success-200',
    warning: 'bg-warning-100 text-warning-800 hover:bg-warning-200 border border-warning-200',
    error: 'bg-error-100 text-error-800 hover:bg-error-200 border border-error-200',
    info: 'bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-200'
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-sm gap-1.5',
    lg: 'px-3 py-1.5 text-base gap-2'
  }

  const dotColors = {
    default: 'bg-slate-500',
    secondary: 'bg-white',
    outline: 'bg-slate-500',
    tesla: 'bg-tesla-600',
    success: 'bg-success-600',
    warning: 'bg-warning-600',
    error: 'bg-error-600',
    info: 'bg-blue-600'
  }

  return (
    <div
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {dot && (
        <div
          className={cn(
            'rounded-full',
            size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : 'w-2.5 h-2.5',
            dotColors[variant]
          )}
        />
      )}
      
      {icon && (
        <span className={cn(
          'flex-shrink-0',
          size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'
        )}>
          {icon}
        </span>
      )}
      
      {children}
      
      {dismissible && (
        <button
          onClick={onDismiss}
          className={cn(
            'ml-1 rounded-full hover:bg-black/10 transition-colors',
            size === 'sm' ? 'p-0.5' : 'p-1'
          )}
        >
          <svg
            className={cn(
              'fill-current',
              size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
            )}
            viewBox="0 0 20 20"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      )}
    </div>
  )
}

// Status Badge with predefined states
interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: 'active' | 'inactive' | 'pending' | 'approved' | 'rejected' | 'draft' | 'published' | 'archived'
}

export function StatusBadge({ status, ...props }: StatusBadgeProps) {
  const statusConfig = {
    active: { variant: 'success' as const, text: 'Active', icon: '●' },
    inactive: { variant: 'default' as const, text: 'Inactive', icon: '○' },
    pending: { variant: 'warning' as const, text: 'Pending', icon: '◐' },
    approved: { variant: 'success' as const, text: 'Approved', icon: '✓' },
    rejected: { variant: 'error' as const, text: 'Rejected', icon: '✕' },
    draft: { variant: 'default' as const, text: 'Draft', icon: '◯' },
    published: { variant: 'tesla' as const, text: 'Published', icon: '●' },
    archived: { variant: 'secondary' as const, text: 'Archived', icon: '◐' }
  }

  const config = statusConfig[status]

  return (
    <Badge variant={config.variant} dot {...props}>
      {config.text}
    </Badge>
  )
}

// Priority Badge
interface PriorityBadgeProps extends Omit<BadgeProps, 'variant'> {
  priority: 'low' | 'medium' | 'high' | 'urgent'
}

export function PriorityBadge({ priority, ...props }: PriorityBadgeProps) {
  const priorityConfig = {
    low: { variant: 'default' as const, text: 'Low' },
    medium: { variant: 'info' as const, text: 'Medium' },
    high: { variant: 'warning' as const, text: 'High' },
    urgent: { variant: 'error' as const, text: 'Urgent' }
  }

  const config = priorityConfig[priority]

  return (
    <Badge variant={config.variant} {...props}>
      {config.text}
    </Badge>
  )
}

// Tesla-style Notification Badge
interface NotificationBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number
  max?: number
  variant?: 'tesla' | 'error' | 'warning' | 'success'
  size?: 'sm' | 'md'
  showZero?: boolean
}

export function NotificationBadge({
  className,
  count,
  max = 99,
  variant = 'tesla',
  size = 'md',
  showZero = false,
  ...props
}: NotificationBadgeProps) {
  if (count === 0 && !showZero) return null

  const displayCount = count > max ? `${max}+` : count.toString()

  const variants = {
    tesla: 'bg-tesla-600 text-white',
    error: 'bg-error-600 text-white',
    warning: 'bg-warning-600 text-white',
    success: 'bg-success-600 text-white'
  }

  const sizes = {
    sm: 'min-w-[16px] h-4 text-xs px-1',
    md: 'min-w-[20px] h-5 text-sm px-1.5'
  }

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full font-semibold',
        'animate-scale-in shadow-sm',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {displayCount}
    </div>
  )
}

// Tesla-style Feature Badge
interface FeatureBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  description?: string
  new?: boolean
  beta?: boolean
  pro?: boolean
}

export function FeatureBadge({
  className,
  label,
  description,
  new: isNew = false,
  beta = false,
  pro = false,
  ...props
}: FeatureBadgeProps) {
  return (
    <div
      className={cn(
        'relative inline-flex items-center gap-2 bg-gradient-to-r from-tesla-50 to-tesla-100',
        'border border-tesla-200 rounded-xl px-4 py-2 shadow-sm',
        'hover:from-tesla-100 hover:to-tesla-150 transition-all duration-300',
        'group cursor-pointer',
        className
      )}
      {...props}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-tesla-900">{label}</span>
          
          {isNew && (
            <Badge size="sm" variant="success" rounded>
              New
            </Badge>
          )}
          
          {beta && (
            <Badge size="sm" variant="warning" rounded>
              Beta
            </Badge>
          )}
          
          {pro && (
            <Badge size="sm" variant="tesla" rounded>
              Pro
            </Badge>
          )}
        </div>
        
        {description && (
          <p className="text-sm text-tesla-700 mt-1">{description}</p>
        )}
      </div>
      
      {/* Arrow indicator */}
      <div className="text-tesla-400 group-hover:text-tesla-600 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  )
}

// Animated Pulse Badge
interface PulseBadgeProps extends BadgeProps {
  pulse?: boolean
}

export function PulseBadge({ pulse = true, className, ...props }: PulseBadgeProps) {
  return (
    <Badge
      className={cn(
        pulse && 'animate-pulse-slow',
        className
      )}
      {...props}
    />
  )
}

// Interactive Badge with hover effects
interface InteractiveBadgeProps extends BadgeProps {
  onClick?: () => void
  active?: boolean
}

export function InteractiveBadge({
  className,
  onClick,
  active = false,
  variant = 'default',
  ...props
}: InteractiveBadgeProps) {
  const interactiveVariants = {
    default: cn(
      'cursor-pointer hover:scale-105 active:scale-95',
      active ? 'bg-tesla-600 text-white' : 'hover:bg-slate-200'
    ),
    tesla: cn(
      'cursor-pointer hover:scale-105 active:scale-95',
      active ? 'bg-tesla-700 text-white' : 'hover:bg-tesla-200'
    ),
    success: cn(
      'cursor-pointer hover:scale-105 active:scale-95',
      active ? 'bg-success-700 text-white' : 'hover:bg-success-200'
    ),
    warning: cn(
      'cursor-pointer hover:scale-105 active:scale-95',
      active ? 'bg-warning-700 text-white' : 'hover:bg-warning-200'
    ),
    error: cn(
      'cursor-pointer hover:scale-105 active:scale-95',
      active ? 'bg-error-700 text-white' : 'hover:bg-error-200'
    ),
    info: cn(
      'cursor-pointer hover:scale-105 active:scale-95',
      active ? 'bg-blue-700 text-white' : 'hover:bg-blue-200'
    ),
    secondary: cn(
      'cursor-pointer hover:scale-105 active:scale-95',
      active ? 'bg-slate-900 text-white' : 'hover:bg-slate-700'
    ),
    outline: cn(
      'cursor-pointer hover:scale-105 active:scale-95',
      active ? 'bg-tesla-600 text-white border-tesla-600' : 'hover:bg-slate-100'
    )
  }

  return (
    <Badge
      className={cn(interactiveVariants[variant], className)}
      onClick={onClick}
      variant={variant}
      {...props}
    />
  )
}