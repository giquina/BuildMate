'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <Link 
        href="/" 
        className="text-gray-500 hover:text-gray-700 transition-colors flex items-center"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
          {item.href && !item.current ? (
            <Link 
              href={item.href}
              className="text-gray-500 hover:text-gray-700 transition-colors truncate"
            >
              {item.label}
            </Link>
          ) : (
            <span 
              className={`truncate ${
                item.current 
                  ? 'text-gray-900 font-medium' 
                  : 'text-gray-500'
              }`}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}

// Hook to generate breadcrumbs from pathname
export function useBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  
  const breadcrumbs: BreadcrumbItem[] = segments.map((segment, index) => {
    const isLast = index === segments.length - 1
    const href = '/' + segments.slice(0, index + 1).join('/')
    
    // Convert segment to readable label
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    return {
      label: formatBreadcrumbLabel(segment, label),
      href: isLast ? undefined : href,
      current: isLast
    }
  })
  
  return breadcrumbs
}

function formatBreadcrumbLabel(segment: string, defaultLabel: string): string {
  const labelMap: Record<string, string> = {
    'configure': 'Configure Project',
    'materials': 'Materials',
    'professionals': 'Find Professionals',
    'dashboard': 'Dashboard',
    'account': 'Account',
    'settings': 'Settings',
    'profile': 'Profile',
    'pricing': 'Pricing',
    'wishlist': 'Wishlist',
    'review': 'Review Project',
    'commercial': 'Commercial'
  }
  
  return labelMap[segment] || defaultLabel
}