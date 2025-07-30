import * as React from "react"
import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'pulse' | 'shimmer' | 'tesla'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  width?: string | number
  height?: string | number
}

export function Skeleton({ 
  className, 
  variant = 'default',
  rounded = 'md',
  width,
  height,
  style,
  ...props 
}: SkeletonProps) {
  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  }

  const variantStyles = {
    default: 'bg-slate-200 animate-pulse',
    pulse: 'bg-slate-200 animate-pulse-slow',
    shimmer: 'bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] animate-shimmer',
    tesla: 'bg-gradient-to-r from-tesla-100 via-tesla-50 to-tesla-100 bg-[length:200%_100%] animate-shimmer'
  }

  const inlineStyles = {
    ...style,
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height })
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        variantStyles[variant],
        roundedStyles[rounded],
        className
      )}
      style={inlineStyles}
      {...props}
    />
  )
}

// Text Skeleton Components
interface TextSkeletonProps {
  lines?: number
  className?: string
  variant?: 'default' | 'pulse' | 'shimmer' | 'tesla'
}

export function TextSkeleton({ lines = 3, className, variant = 'default' }: TextSkeletonProps) {
  return (
    <div className={cn('space-y-2.5', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant={variant}
          className={cn(
            'h-4',
            index === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  )
}

// Avatar Skeleton
interface AvatarSkeletonProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  variant?: 'default' | 'pulse' | 'shimmer' | 'tesla'
}

export function AvatarSkeleton({ size = 'md', className, variant = 'default' }: AvatarSkeletonProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  return (
    <Skeleton
      variant={variant}
      rounded="full"
      className={cn(sizes[size], className)}
    />
  )
}

// Card Skeleton
interface CardSkeletonProps {
  className?: string
  variant?: 'default' | 'pulse' | 'shimmer' | 'tesla'
  includeAvatar?: boolean
  includeImage?: boolean
  lines?: number
}

export function CardSkeleton({ 
  className, 
  variant = 'default',
  includeAvatar = false,
  includeImage = false,
  lines = 3
}: CardSkeletonProps) {
  return (
    <div className={cn('rounded-xl border border-slate-200 bg-white p-6 space-y-4', className)}>
      {includeImage && (
        <Skeleton variant={variant} className="w-full h-48" rounded="lg" />
      )}
      
      <div className="space-y-4">
        {includeAvatar && (
          <div className="flex items-center space-x-4">
            <AvatarSkeleton variant={variant} />
            <div className="space-y-2 flex-1">
              <Skeleton variant={variant} className="h-4 w-24" />
              <Skeleton variant={variant} className="h-3 w-32" />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <Skeleton variant={variant} className="h-6 w-3/4" />
          <TextSkeleton lines={lines} variant={variant} />
        </div>
        
        <div className="flex space-x-4 pt-2">
          <Skeleton variant={variant} className="h-10 w-24" rounded="lg" />
          <Skeleton variant={variant} className="h-10 w-28" rounded="lg" />
        </div>
      </div>
    </div>
  )
}

// Table Skeleton
interface TableSkeletonProps {
  rows?: number
  columns?: number
  className?: string
  variant?: 'default' | 'pulse' | 'shimmer' | 'tesla'
}

export function TableSkeleton({ 
  rows = 5, 
  columns = 4, 
  className,
  variant = 'default' 
}: TableSkeletonProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="flex space-x-4">
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton
            key={`header-${index}`}
            variant={variant}
            className="h-5 flex-1"
          />
        ))}
      </div>
      
      {/* Rows */}
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex space-x-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton
                key={`cell-${rowIndex}-${colIndex}`}
                variant={variant}
                className="h-4 flex-1"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// List Skeleton
interface ListSkeletonProps {
  items?: number
  className?: string
  variant?: 'default' | 'pulse' | 'shimmer' | 'tesla'
  includeAvatar?: boolean
}

export function ListSkeleton({ 
  items = 5, 
  className,
  variant = 'default',
  includeAvatar = false 
}: ListSkeletonProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          {includeAvatar && <AvatarSkeleton variant={variant} size="md" />}
          <div className="flex-1 space-y-2">
            <Skeleton variant={variant} className="h-4 w-full" />
            <Skeleton variant={variant} className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Form Skeleton
interface FormSkeletonProps {
  fields?: number
  className?: string
  variant?: 'default' | 'pulse' | 'shimmer' | 'tesla'
  includeButtons?: boolean
}

export function FormSkeleton({ 
  fields = 4, 
  className,
  variant = 'default',
  includeButtons = true 
}: FormSkeletonProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {Array.from({ length: fields }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton variant={variant} className="h-4 w-24" />
          <Skeleton variant={variant} className="h-12 w-full" rounded="xl" />
        </div>
      ))}
      
      {includeButtons && (
        <div className="flex space-x-4 pt-4">
          <Skeleton variant={variant} className="h-12 w-24" rounded="lg" />
          <Skeleton variant={variant} className="h-12 w-32" rounded="lg" />
        </div>
      )}
    </div>
  )
}

// Dashboard Skeleton
interface DashboardSkeletonProps {
  className?: string
  variant?: 'default' | 'pulse' | 'shimmer' | 'tesla'
}

export function DashboardSkeleton({ className, variant = 'tesla' }: DashboardSkeletonProps) {
  return (
    <div className={cn('space-y-8', className)}>
      {/* Header */}
      <div className="space-y-4">
        <Skeleton variant={variant} className="h-8 w-64" />
        <Skeleton variant={variant} className="h-4 w-96" />
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton variant={variant} className="h-4 w-20" />
              <Skeleton variant={variant} className="h-8 w-8" rounded="lg" />
            </div>
            <Skeleton variant={variant} className="h-8 w-16" />
            <Skeleton variant={variant} className="h-3 w-12" />
          </div>
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
          <Skeleton variant={variant} className="h-6 w-48" />
          <Skeleton variant={variant} className="h-64 w-full" rounded="lg" />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
          <Skeleton variant={variant} className="h-6 w-40" />
          <Skeleton variant={variant} className="h-64 w-full" rounded="lg" />
        </div>
      </div>
      
      {/* Table */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton variant={variant} className="h-6 w-32" />
          <Skeleton variant={variant} className="h-10 w-24" rounded="lg" />
        </div>
        <TableSkeleton variant={variant} rows={8} columns={5} />
      </div>
    </div>
  )
}