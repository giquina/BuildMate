'use client'

import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12'
}

export function LoadingSpinner({ className, size = 'md', text }: LoadingSpinnerProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="flex flex-col items-center space-y-2">
        <Loader2 className={cn('animate-spin text-blue-600', sizeClasses[size])} />
        {text && (
          <p className="text-sm text-gray-600 animate-pulse">{text}</p>
        )}
      </div>
    </div>
  )
}

// Skeleton component for loading states
export function SkeletonBox({ className }: { className?: string }) {
  return (
    <div className={cn(
      'animate-pulse bg-gray-200 rounded-lg',
      className
    )} />
  )
}

// ROI Calculator skeleton
export function ROICalculatorSkeleton() {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-xl border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <SkeletonBox className="h-5 w-5" />
          <SkeletonBox className="h-5 w-32" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <SkeletonBox className="h-4 w-20" />
              <SkeletonBox className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-6 bg-white rounded-xl border border-gray-200">
            <div className="text-center space-y-3">
              <SkeletonBox className="h-10 w-10 mx-auto rounded-full" />
              <SkeletonBox className="h-6 w-32 mx-auto" />
              <SkeletonBox className="h-8 w-24 mx-auto" />
              <div className="grid grid-cols-2 gap-2">
                <SkeletonBox className="h-12" />
                <SkeletonBox className="h-12" />
              </div>
              <SkeletonBox className="h-8" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Property type selector skeleton
export function PropertyTypeSelectorSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="p-4 border-2 border-gray-200 rounded-xl">
          <div className="text-center space-y-2">
            <SkeletonBox className="h-8 w-8 mx-auto rounded" />
            <SkeletonBox className="h-4 w-20 mx-auto" />
            <SkeletonBox className="h-3 w-24 mx-auto" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Solutions grid skeleton
export function SolutionsGridSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="p-8 bg-white rounded-xl border border-gray-200">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <SkeletonBox className="h-12 w-12 rounded" />
              <div className="space-y-2">
                <SkeletonBox className="h-5 w-32" />
                <SkeletonBox className="h-4 w-20" />
              </div>
            </div>
            <SkeletonBox className="h-6 w-16 rounded-full" />
          </div>
          
          <SkeletonBox className="h-4 w-full mb-6" />
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {Array.from({ length: 4 }).map((_, j) => (
              <div key={j} className="p-3 bg-gray-50 rounded-lg">
                <SkeletonBox className="h-3 w-12 mb-2" />
                <SkeletonBox className="h-4 w-16" />
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            <SkeletonBox className="h-4 w-24 mb-3" />
            {Array.from({ length: 4 }).map((_, j) => (
              <div key={j} className="flex items-start">
                <SkeletonBox className="h-5 w-5 rounded-full mr-3 mt-0.5" />
                <SkeletonBox className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
