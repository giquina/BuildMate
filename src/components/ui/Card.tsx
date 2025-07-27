import * as React from "react"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'outline' | 'tesla'
  interactive?: boolean
  loading?: boolean
  gradient?: boolean
}

export function Card({ 
  className, 
  children, 
  variant = 'default',
  interactive = false,
  loading = false,
  gradient = false,
  ...props 
}: CardProps) {
  const baseStyles = "relative rounded-xl transition-all duration-300 group overflow-hidden"
  
  const variants = {
    default: "bg-white border border-slate-200 shadow-sm hover:shadow-md",
    elevated: "bg-white shadow-tesla hover:shadow-tesla-lg transform hover:-translate-y-1",
    outline: "bg-white border-2 border-tesla-200 hover:border-tesla-400",
    tesla: "bg-gradient-to-br from-white to-tesla-50 border border-tesla-200 shadow-tesla hover:shadow-tesla-xl"
  }

  const interactiveStyles = interactive 
    ? "cursor-pointer hover:scale-[1.02] active:scale-[0.99]" 
    : ""

  const gradientOverlay = gradient && (
    <div className="absolute inset-0 bg-gradient-to-br from-tesla-600/5 to-tesla-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  )

  if (loading) {
    return (
      <div className={cn(baseStyles, variants[variant], "p-6", className)}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-slate-200 rounded"></div>
            <div className="h-3 bg-slate-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(baseStyles, variants[variant], interactiveStyles, "p-6", className)}
      {...props}
    >
      {gradientOverlay}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  )
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  action?: React.ReactNode
}

export function CardHeader({ className, children, action, ...props }: CardHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between mb-6", className)} {...props}>
      <div className="flex-1">
        {children}
      </div>
      {action && (
        <div className="ml-4 flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  )
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function CardTitle({ className, children, size = 'lg', ...props }: CardTitleProps) {
  const sizes = {
    sm: "text-lg font-semibold",
    md: "text-xl font-semibold",
    lg: "text-2xl font-semibold",
    xl: "text-3xl font-bold"
  }

  return (
    <h3
      className={cn("text-slate-900 tracking-tight", sizes[size], className)}
      {...props}
    >
      {children}
    </h3>
  )
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export function CardDescription({ className, children, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn("text-slate-600 mt-2 leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  )
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={cn("text-slate-700", className)} {...props}>
      {children}
    </div>
  )
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div className={cn("mt-6 pt-4 border-t border-slate-200", className)} {...props}>
      {children}
    </div>
  )
}

// Premium Feature Card
interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode
  title: string
  description: string
  badge?: string
  action?: React.ReactNode
}

export function FeatureCard({ 
  icon, 
  title, 
  description, 
  badge, 
  action, 
  className, 
  ...props 
}: FeatureCardProps) {
  return (
    <Card variant="tesla" interactive gradient className={cn("p-8", className)} {...props}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-tesla-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            {icon}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <CardTitle size="md">{title}</CardTitle>
            {badge && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-tesla-100 text-tesla-800">
                {badge}
              </span>
            )}
          </div>
          <CardDescription>{description}</CardDescription>
          {action && (
            <div className="mt-4">
              {action}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

// Statistics Card
interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  change?: {
    value: string
    trend: 'up' | 'down' | 'neutral'
  }
  icon?: React.ReactNode
}

export function StatsCard({ title, value, change, icon, className, ...props }: StatsCardProps) {
  const trendColors = {
    up: 'text-success-600',
    down: 'text-error-600',
    neutral: 'text-slate-600'
  }

  return (
    <Card variant="elevated" className={cn("p-6", className)} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
          {change && (
            <p className={cn("text-sm font-medium mt-1", trendColors[change.trend])}>
              {change.value}
            </p>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 ml-4">
            <div className="w-12 h-12 bg-tesla-50 rounded-lg flex items-center justify-center text-tesla-600">
              {icon}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}