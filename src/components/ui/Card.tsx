import * as React from "react"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'outline' | 'tesla' | 'construction' | 'professional' | 'material' | 'project'
  interactive?: boolean
  loading?: boolean
  gradient?: boolean
  trustIndicator?: boolean
}

export function Card({ 
  className, 
  children, 
  variant = 'default',
  interactive = false,
  loading = false,
  gradient = false,
  trustIndicator = false,
  ...props 
}: CardProps) {
  const baseStyles = "relative rounded-xl transition-all duration-300 group overflow-hidden"
  
  const variants = {
    default: "bg-white border border-gray-200 shadow-sm hover:shadow-lg",
    elevated: "bg-white shadow-lg hover:shadow-xl transform hover:-translate-y-2",
    outline: "bg-white border-2 border-blue-200 hover:border-blue-400",
    tesla: "bg-gradient-to-br from-white to-blue-50 border border-blue-200 shadow-lg hover:shadow-xl",
    construction: "bg-gradient-to-br from-white to-orange-50 border-l-4 border-l-orange-500 shadow-lg hover:shadow-xl",
    professional: "bg-gradient-to-br from-white to-green-50 border-l-4 border-l-green-500 shadow-lg hover:shadow-xl",
    material: "bg-white border border-gray-200 shadow-md hover:shadow-lg border-l-4 border-l-blue-500",
    project: "bg-gradient-to-br from-white to-indigo-50 border border-indigo-200 shadow-lg hover:shadow-xl"
  }

  const interactiveStyles = interactive 
    ? "cursor-pointer hover:scale-[1.02] active:scale-[0.99]" 
    : ""

  const gradientOverlay = gradient && (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  )
  
  const trustIndicatorElement = trustIndicator && (
    <div className="absolute top-3 right-3">
      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg" />
    </div>
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
      className={cn(baseStyles, variants[variant], interactiveStyles, "p-4 sm:p-6", className)}
      {...props}
    >
      {gradientOverlay}
      {trustIndicatorElement}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Enhanced shimmer effect on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  )
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  action?: React.ReactNode
}

export function CardHeader({ className, children, action, ...props }: CardHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-start justify-between mb-4 sm:mb-6 gap-3 sm:gap-0", className)} {...props}>
      <div className="flex-1">
        {children}
      </div>
      {action && (
        <div className="sm:ml-4 flex-shrink-0">
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
    sm: "text-base sm:text-lg font-semibold",
    md: "text-lg sm:text-xl font-semibold",
    lg: "text-xl sm:text-2xl font-bold",
    xl: "text-2xl sm:text-3xl font-extrabold"
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
    <div className={cn("mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200", className)} {...props}>
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
    <Card variant="tesla" interactive gradient className={cn("p-4 sm:p-8", className)} {...props}>
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
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  }

  return (
    <Card variant="elevated" className={cn("p-4 sm:p-6", className)} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-600 mb-1 uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={cn("text-sm font-semibold mt-1", trendColors[change.trend])}>
              {change.value}
            </p>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 ml-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
              {icon}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

// Construction-Specific Card Components
interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  type: string
  status: 'planning' | 'design' | 'materials' | 'building' | 'completed'
  progress: number
  budget: string
  timeline: string
  professional?: string
  image?: string
}

export function ProjectCard({ 
  title, 
  type, 
  status, 
  progress, 
  budget, 
  timeline, 
  professional, 
  image,
  className, 
  ...props 
}: ProjectCardProps) {
  const statusConfig = {
    planning: { color: 'bg-blue-100 text-blue-800', label: 'Planning' },
    design: { color: 'bg-purple-100 text-purple-800', label: 'Design' },
    materials: { color: 'bg-orange-100 text-orange-800', label: 'Materials' },
    building: { color: 'bg-yellow-100 text-yellow-800', label: 'Building' },
    completed: { color: 'bg-green-100 text-green-800', label: 'Completed' }
  }

  return (
    <Card variant="project" interactive trustIndicator className={cn("p-4 sm:p-6", className)} {...props}>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
            <p className="text-gray-600 text-sm font-medium">{type}</p>
          </div>
          <span className={cn("px-3 py-1 rounded-full text-xs font-bold", statusConfig[status].color)}>
            {statusConfig[status].label}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 font-medium">Progress</span>
            <span className="text-gray-900 font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {/* Project Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Budget</p>
            <p className="text-lg font-bold text-gray-900">{budget}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Timeline</p>
            <p className="text-lg font-bold text-gray-900">{timeline}</p>
          </div>
        </div>
        
        {professional && (
          <div className="pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Project Manager</p>
            <p className="text-sm font-semibold text-gray-900">{professional}</p>
          </div>
        )}
      </div>
    </Card>
  )
}

interface ProfessionalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  trade: string
  rating: number
  reviews: number
  verified: boolean
  insurance: boolean
  location: string
  hourlyRate: string
  avatar?: string
  certifications?: string[]
}

export function ProfessionalCard({ 
  name, 
  trade, 
  rating, 
  reviews, 
  verified, 
  insurance, 
  location, 
  hourlyRate,
  avatar,
  certifications = [],
  className, 
  ...props 
}: ProfessionalCardProps) {
  return (
    <Card variant="professional" interactive className={cn("p-4 sm:p-6", className)} {...props}>
      <div className="space-y-4">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center text-green-700 font-bold text-lg sm:text-xl">
            {avatar || name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-bold text-gray-900">{name}</h3>
              {verified && (
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            <p className="text-gray-600 font-semibold">{trade}</p>
            <p className="text-gray-500 text-sm">{location}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
            ))}
            <span className="text-sm text-gray-600 font-medium ml-1">({reviews})</span>
          </div>
          <div className="text-lg font-bold text-gray-900">{hourlyRate}/hr</div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {insurance && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-md">
              Insured
            </span>
          )}
          {certifications.map((cert, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-bold rounded-md">
              {cert}
            </span>
          ))}
        </div>
      </div>
    </Card>
  )
}

interface MaterialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  category: string
  price: string
  unit: string
  supplier: string
  inStock: boolean
  delivery: string
  rating: number
  image?: string
  sustainability?: string
}

export function MaterialCard({ 
  name, 
  category, 
  price, 
  unit, 
  supplier, 
  inStock, 
  delivery, 
  rating,
  image,
  sustainability,
  className, 
  ...props 
}: MaterialCardProps) {
  return (
    <Card variant="material" interactive className={cn("p-4 sm:p-6", className)} {...props}>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
            <p className="text-gray-600 text-sm font-medium">{category}</p>
            <p className="text-gray-500 text-sm">by {supplier}</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-gray-900">{price}</div>
            <div className="text-sm text-gray-600">per {unit}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
            ))}
          </div>
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-bold",
            inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          )}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Delivery</span>
            <span className="font-semibold text-gray-900">{delivery}</span>
          </div>
          {sustainability && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Sustainability</span>
              <span className="font-semibold text-green-600">{sustainability}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}