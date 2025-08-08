'use client'

interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  variant?: 'text' | 'circular' | 'rectangular'
  animation?: 'pulse' | 'wave'
}

export function Skeleton({ 
  className = '', 
  width, 
  height, 
  variant = 'rectangular',
  animation = 'pulse'
}: SkeletonProps) {
  const baseClasses = `bg-gray-200 ${animation === 'pulse' ? 'animate-pulse' : 'animate-wave'}`
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md'
  }
  
  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  )
}

// Preset skeleton components for common use cases
export function SkeletonText({ lines = 1, className = '' }: { lines?: number, className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          variant="text" 
          className={i === lines - 1 ? 'w-3/4' : 'w-full'}
        />
      ))}
    </div>
  )
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`p-6 space-y-4 ${className}`}>
      <div className="flex items-center space-x-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-1/2" />
          <Skeleton variant="text" className="w-1/4" />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  )
}

export function SkeletonProject({ className = '' }: { className?: string }) {
  return (
    <div className={`border border-gray-200 rounded-lg p-4 space-y-4 ${className}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-3/4 h-5" />
          <Skeleton variant="text" className="w-1/2 h-4" />
        </div>
        <Skeleton variant="rectangular" width={60} height={24} className="rounded-full" />
      </div>
      <Skeleton variant="text" className="w-full h-4" />
      <div className="space-y-2">
        <div className="flex justify-between">
          <Skeleton variant="text" className="w-16 h-4" />
          <Skeleton variant="text" className="w-10 h-4" />
        </div>
        <Skeleton variant="rectangular" height={8} className="w-full rounded-full" />
        <div className="flex justify-between">
          <Skeleton variant="text" className="w-12 h-4" />
          <Skeleton variant="text" className="w-16 h-4" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Skeleton variant="text" className="w-32 h-4" />
              <Skeleton variant="text" className="w-48 h-6" />
              <div className="flex items-center space-x-4">
                <Skeleton variant="text" className="w-24 h-4" />
                <div className="flex items-center space-x-2">
                  <Skeleton variant="circular" width={8} height={8} />
                  <Skeleton variant="text" className="w-32 h-4" />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Skeleton variant="rectangular" width={80} height={36} className="rounded-md" />
              <Skeleton variant="rectangular" width={120} height={36} className="rounded-md" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <SkeletonCard className="bg-white rounded-lg border" />
            <SkeletonCard className="bg-white rounded-lg border" />
            <SkeletonCard className="bg-white rounded-lg border" />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} className="bg-white rounded-lg border" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}