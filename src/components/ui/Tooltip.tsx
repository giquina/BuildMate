import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  variant?: 'default' | 'tesla' | 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
  delay?: number
  disabled?: boolean
  arrow?: boolean
  className?: string
  contentClassName?: string
}

export function Tooltip({
  children,
  content,
  side = 'top',
  align = 'center',
  variant = 'default',
  size = 'md',
  delay = 300,
  disabled = false,
  arrow = true,
  className,
  contentClassName,
}: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [shouldShow, setShouldShow] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout>()
  const tooltipRef = React.useRef<HTMLDivElement>(null)

  const showTooltip = React.useCallback(() => {
    if (disabled) return
    
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setShouldShow(true)
      setTimeout(() => setIsVisible(true), 10)
    }, delay)
  }, [delay, disabled])

  const hideTooltip = React.useCallback(() => {
    clearTimeout(timeoutRef.current)
    setIsVisible(false)
    setTimeout(() => setShouldShow(false), 200)
  }, [])

  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const variants = {
    default: 'bg-slate-800 text-white border border-slate-700',
    tesla: 'bg-tesla-600 text-white border-tesla-700 shadow-tesla',
    dark: 'bg-slate-900 text-white border border-slate-800',
    light: 'bg-white text-slate-900 border border-slate-200 shadow-lg'
  }

  const sizes = {
    sm: 'px-2 py-1 text-xs max-w-xs',
    md: 'px-3 py-2 text-sm max-w-sm',
    lg: 'px-4 py-3 text-base max-w-md'
  }

  const sideClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2'
  }

  const alignClasses = {
    start: {
      top: 'left-0 -translate-x-0',
      bottom: 'left-0 -translate-x-0',
      right: 'top-0 -translate-y-0',
      left: 'top-0 -translate-y-0'
    },
    center: {
      top: '',
      bottom: '',
      right: '',
      left: ''
    },
    end: {
      top: 'right-0 translate-x-0',
      bottom: 'right-0 translate-x-0',
      right: 'bottom-0 translate-y-0',
      left: 'bottom-0 translate-y-0'
    }
  }

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent'
  }

  const arrowColors = {
    default: 'border-slate-800',
    tesla: 'border-tesla-600',
    dark: 'border-slate-900',
    light: 'border-white'
  }

  if (!content) {
    return <>{children}</>
  }

  return (
    <div
      className={cn('relative inline-block', className)}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      
      {shouldShow && (
        <div
          ref={tooltipRef}
          className={cn(
            'absolute z-50 rounded-lg font-medium transition-all duration-200 ease-out',
            'pointer-events-none select-none whitespace-nowrap',
            variants[variant],
            sizes[size],
            sideClasses[side],
            align !== 'center' && alignClasses[align][side],
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
            contentClassName
          )}
          role="tooltip"
        >
          {content}
          
          {arrow && (
            <div
              className={cn(
                'absolute w-0 h-0 border-4',
                arrowClasses[side],
                arrowColors[variant]
              )}
            />
          )}
        </div>
      )}
    </div>
  )
}

// Tesla-style Interactive Tooltip
interface InteractiveTooltipProps extends Omit<TooltipProps, 'content'> {
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function InteractiveTooltip({
  children,
  title,
  description,
  action,
  variant = 'tesla',
  size = 'lg',
  ...props
}: InteractiveTooltipProps) {
  const content = (
    <div className="space-y-2">
      <div className="font-semibold">{title}</div>
      {description && (
        <div className="text-sm opacity-90 whitespace-pre-wrap max-w-xs">
          {description}
        </div>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="block w-full mt-2 px-2 py-1 text-xs font-medium bg-white/20 hover:bg-white/30 rounded transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  )

  return (
    <Tooltip
      content={content}
      variant={variant}
      size={size}
      {...props}
    >
      {children}
    </Tooltip>
  )
}

// Status Tooltip with colored indicators
interface StatusTooltipProps extends Omit<TooltipProps, 'content' | 'variant'> {
  status: 'success' | 'warning' | 'error' | 'info'
  title: string
  message: string
}

export function StatusTooltip({
  children,
  status,
  title,
  message,
  ...props
}: StatusTooltipProps) {
  const statusConfig = {
    success: {
      variant: 'light' as const,
      color: 'text-success-600',
      bgColor: 'bg-success-100',
      icon: '✓'
    },
    warning: {
      variant: 'light' as const,
      color: 'text-warning-600',
      bgColor: 'bg-warning-100',
      icon: '⚠'
    },
    error: {
      variant: 'light' as const,
      color: 'text-error-600',
      bgColor: 'bg-error-100',
      icon: '✕'
    },
    info: {
      variant: 'light' as const,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      icon: 'ℹ'
    }
  }

  const config = statusConfig[status]

  const content = (
    <div className="flex items-start space-x-2">
      <div className={cn('flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold', config.bgColor, config.color)}>
        {config.icon}
      </div>
      <div>
        <div className={cn('font-semibold', config.color)}>{title}</div>
        <div className="text-sm text-slate-600 mt-1">{message}</div>
      </div>
    </div>
  )

  return (
    <Tooltip
      content={content}
      variant={config.variant}
      size="lg"
      {...props}
    >
      {children}
    </Tooltip>
  )
}

// Keyboard Shortcut Tooltip
interface KeyboardTooltipProps extends Omit<TooltipProps, 'content'> {
  shortcut: string | string[]
  description: string
}

export function KeyboardTooltip({
  children,
  shortcut,
  description,
  ...props
}: KeyboardTooltipProps) {
  const shortcuts = Array.isArray(shortcut) ? shortcut : [shortcut]

  const content = (
    <div className="space-y-2">
      <div className="text-sm">{description}</div>
      <div className="flex items-center gap-1">
        {shortcuts.map((key, index) => (
          <React.Fragment key={key}>
            {index > 0 && <span className="text-xs opacity-60">+</span>}
            <kbd className="px-2 py-1 text-xs font-semibold bg-white/20 rounded border border-white/30">
              {key}
            </kbd>
          </React.Fragment>
        ))}
      </div>
    </div>
  )

  return (
    <Tooltip
      content={content}
      variant="dark"
      size="md"
      {...props}
    >
      {children}
    </Tooltip>
  )
}

// Hover Card (larger tooltip with richer content)
interface HoverCardProps {
  children: React.ReactNode
  content: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  className?: string
  contentClassName?: string
  delay?: number
}

export function HoverCard({
  children,
  content,
  side = 'bottom',
  align = 'center',
  className,
  contentClassName,
  delay = 500,
}: HoverCardProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [shouldShow, setShouldShow] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout>()

  const showCard = React.useCallback(() => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setShouldShow(true)
      setTimeout(() => setIsVisible(true), 10)
    }, delay)
  }, [delay])

  const hideCard = React.useCallback(() => {
    clearTimeout(timeoutRef.current)
    setIsVisible(false)
    setTimeout(() => setShouldShow(false), 200)
  }, [])

  const sideClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2'
  }

  const alignClasses = {
    start: {
      top: 'left-0 -translate-x-0',
      bottom: 'left-0 -translate-x-0',
      right: 'top-0 -translate-y-0',
      left: 'top-0 -translate-y-0'
    },
    center: {
      top: '',
      bottom: '',
      right: '',
      left: ''
    },
    end: {
      top: 'right-0 translate-x-0',
      bottom: 'right-0 translate-x-0',
      right: 'bottom-0 translate-y-0',
      left: 'bottom-0 translate-y-0'
    }
  }

  return (
    <div
      className={cn('relative inline-block', className)}
      onMouseEnter={showCard}
      onMouseLeave={hideCard}
    >
      {children}
      
      {shouldShow && (
        <div
          className={cn(
            'absolute z-50 p-4 bg-white border border-slate-200 rounded-xl shadow-xl',
            'transition-all duration-200 ease-out min-w-[200px] max-w-sm',
            sideClasses[side],
            align !== 'center' && alignClasses[align][side],
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
            contentClassName
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}