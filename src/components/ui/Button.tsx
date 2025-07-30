import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'tesla' | 'construction' | 'professional' | 'warning'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  ripple?: boolean
  constructionOptimized?: boolean
}

export const Button = React.memo(function Button({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  loading = false,
  leftIcon,
  rightIcon,
  ripple = true,
  disabled,
  onClick,
  ...props 
}: ButtonProps) {
  const [rippleStyle, setRippleStyle] = React.useState<React.CSSProperties>({})
  const [showRipple, setShowRipple] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const timeoutRef = React.useRef<NodeJS.Timeout>()

  // Memoize the click handler to prevent unnecessary re-renders
  const handleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple && !disabled && !loading) {
      const button = buttonRef.current
      if (button) {
        const rect = button.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2
        
        setRippleStyle({
          width: size,
          height: size,
          left: x,
          top: y,
        })
        setShowRipple(true)
        
        // Clear previous timeout to prevent memory leaks
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        
        timeoutRef.current = setTimeout(() => setShowRipple(false), 600)
      }
    }
    
    if (onClick && !disabled && !loading) {
      onClick(e)
    }
  }, [ripple, disabled, loading, onClick])

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Memoized style calculations for better performance
  const buttonClasses = React.useMemo(() => {
    const baseStyles = "relative inline-flex items-center justify-center rounded-lg font-semibold will-change-transform focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
    
    const variants = {
      primary: "bg-blue-700 hover:bg-blue-800 text-white focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transition-all duration-200 ease-out transform hover:scale-[1.02] active:scale-[0.98]",
      secondary: "bg-white hover:bg-gray-50 text-gray-700 focus:ring-gray-500 focus:ring-offset-2 shadow-md hover:shadow-lg border border-gray-300 transition-all duration-200 ease-out transform hover:scale-[1.02] active:scale-[0.98]",
      outline: "border-2 border-blue-700 hover:bg-blue-700 text-blue-700 hover:text-white focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-out transform hover:scale-[1.02] active:scale-[0.98]",
      ghost: "hover:bg-blue-50 text-blue-700 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-out transform hover:scale-[1.02] active:scale-[0.98]",
      tesla: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transition-all duration-200 ease-out transform hover:scale-[1.02] active:scale-[0.98]",
      construction: "bg-orange-600 hover:bg-orange-700 text-white focus:ring-orange-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transition-all duration-200 ease-out transform hover:scale-[1.02] active:scale-[0.98]",
      professional: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transition-all duration-200 ease-out transform hover:scale-[1.02] active:scale-[0.98]",
      warning: "bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transition-all duration-200 ease-out transform hover:scale-[1.02] active:scale-[0.98]"
    }
    
    const sizes = {
      sm: "px-4 py-2.5 text-sm min-h-[44px] gap-2",
      md: "px-6 py-3 text-base min-h-[48px] gap-2.5",
      lg: "px-8 py-4 text-lg min-h-[56px] gap-3",
      xl: "px-10 py-5 text-xl min-h-[64px] gap-3.5"
    }

    return cn(baseStyles, variants[variant], sizes[size], className)
  }, [variant, size, className])

  const iconSize = React.useMemo(() => {
    const iconSizes = {
      sm: "w-5 h-5",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-7 h-7"
    }
    return iconSizes[size]
  }, [size])

  return (
    <button
      ref={buttonRef}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-label={loading ? "Loading..." : undefined}
      {...props}
    >
      {/* Ripple Effect - Only render when needed */}
      {showRipple && ripple && (
        <span
          className="absolute rounded-full bg-white opacity-30 pointer-events-none"
          style={{
            ...rippleStyle,
            animation: 'ripple 0.6s linear',
          }}
        />
      )}
      
      {/* Loading Spinner - Memoized */}
      {loading && <LoadingSpinner />}
      
      {/* Content */}
      <div className={cn("flex items-center gap-2 transition-opacity duration-200", loading && "opacity-0")}>
        {leftIcon && (
          <span className={cn("flex-shrink-0", iconSize)}>
            {leftIcon}
          </span>
        )}
        <span className="font-medium">{children}</span>
        {rightIcon && (
          <span className={cn("flex-shrink-0", iconSize)}>
            {rightIcon}
          </span>
        )}
      </div>
      
      {/* Hover Overlay - Hardware accelerated */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-lg will-change-opacity" />
    </button>
  )
})

// Memoized Loading Spinner for better performance
const LoadingSpinner = React.memo(function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
    </div>
  )
})

// Reusable Loading Spinner Component
export const ButtonSpinner = React.memo(function ButtonSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin", className)} />
  )
})

// Performance display name for React DevTools
Button.displayName = 'Button'
ButtonSpinner.displayName = 'ButtonSpinner'