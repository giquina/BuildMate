import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'tesla'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  ripple?: boolean
}

export function Button({ 
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
        
        setTimeout(() => setShowRipple(false), 600)
      }
    }
    
    if (onClick && !disabled && !loading) {
      onClick(e)
    }
  }

  const baseStyles = "relative inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-tesla-600 hover:bg-tesla-700 text-white focus:ring-tesla-500 shadow-tesla hover:shadow-tesla-lg transform hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700 focus:ring-slate-500 shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]",
    outline: "border-2 border-tesla-600 hover:bg-tesla-600 text-tesla-600 hover:text-white focus:ring-tesla-500 transform hover:scale-[1.02] active:scale-[0.98]",
    ghost: "hover:bg-tesla-50 text-tesla-600 focus:ring-tesla-500 transform hover:scale-[1.02] active:scale-[0.98]",
    tesla: "bg-gradient-to-r from-tesla-600 to-tesla-700 hover:from-tesla-700 hover:to-tesla-800 text-white focus:ring-tesla-500 shadow-tesla-lg hover:shadow-tesla-xl transform hover:scale-[1.02] active:scale-[0.98]"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm min-h-[32px] gap-1.5",
    md: "px-4 py-2 text-base min-h-[40px] gap-2",
    lg: "px-6 py-3 text-lg min-h-[48px] gap-2.5",
    xl: "px-8 py-4 text-xl min-h-[56px] gap-3"
  }

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-7 h-7"
  }

  return (
    <button
      ref={buttonRef}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-label={loading ? "Loading..." : undefined}
      {...props}
    >
      {/* Ripple Effect */}
      {showRipple && ripple && (
        <span
          className="absolute rounded-full bg-white opacity-30 animate-ripple pointer-events-none"
          style={rippleStyle}
        />
      )}
      
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Content */}
      <div className={cn("flex items-center gap-2", loading && "opacity-0")}>
        {leftIcon && (
          <span className={cn("flex-shrink-0", iconSizes[size])}>
            {leftIcon}
          </span>
        )}
        <span className="font-medium">{children}</span>
        {rightIcon && (
          <span className={cn("flex-shrink-0", iconSizes[size])}>
            {rightIcon}
          </span>
        )}
      </div>
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg" />
    </button>
  )
}

// Loading Spinner Component
export function ButtonSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin", className)} />
  )
}