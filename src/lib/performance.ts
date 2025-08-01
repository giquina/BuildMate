// Performance monitoring and optimization utilities for BuildMate
import { useCallback, useRef } from 'react'

// Simplified performance metrics interface
interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
}

// Web Vitals reporting for construction industry performance monitoring
export const reportWebVitals = (metric: PerformanceMetric) => {
  // In production, send to analytics service
  if (process.env.NODE_ENV === 'production') {
    console.log(metric)
    // TODO: Send to analytics service (Google Analytics, DataDog, etc.)
  }
  
  // Development logging with construction context
  if (process.env.NODE_ENV === 'development') {
    console.log(`🏗️ BuildMate Performance: ${metric.name}`, {
      value: metric.value,
      timestamp: metric.timestamp,
    })
  }
}

// Simplified performance monitoring initialization
export const initPerformanceMonitoring = () => {
  if (typeof window !== 'undefined') {
    // Basic performance monitoring without external dependencies
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation' || entry.entryType === 'paint') {
          reportWebVitals({
            name: entry.name || entry.entryType,
            value: entry.duration || entry.startTime,
            timestamp: Date.now()
          })
        }
      })
    })
    
    try {
      observer.observe({ entryTypes: ['navigation', 'paint'] })
      console.log('🏗️ BuildMate Performance: Basic monitoring initialized')
    } catch (error) {
      console.warn('🏗️ BuildMate Performance: Observer not supported')
    }
  }
}

// Performance measurement utilities
export const performanceUtils = {
  // Measure component render time
  measureRender: (name: string, fn: () => void) => {
    const start = performance.now()
    fn()
    const end = performance.now()
    console.log(`🏗️ Render time for ${name}: ${end - start}ms`)
  },

  // Measure async operations (e.g., API calls, image loading)
  measureAsync: async <T>(name: string, promise: Promise<T>): Promise<T> => {
    const start = performance.now()
    try {
      const result = await promise
      const end = performance.now()
      console.log(`🏗️ Async operation ${name}: ${end - start}ms`)
      return result
    } catch (error) {
      const end = performance.now()
      console.error(`🏗️ Failed async operation ${name}: ${end - start}ms`, error)
      throw error
    }
  },

  // Memory usage monitoring for long construction sessions
  measureMemory: () => {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      return {
        used: Math.round(memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(memory.totalJSHeapSize / 1048576), // MB
        limit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
      }
    }
    return null
  },

  // Network connection quality detection for construction sites
  getConnectionInfo: () => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      return {
        effectiveType: connection.effectiveType, // 'slow-2g', '2g', '3g', '4g'
        downlink: connection.downlink, // Mbps
        rtt: connection.rtt, // ms
        saveData: connection.saveData, // boolean
      }
    }
    return null
  },

  // Detect if user is on a mobile device (construction professionals)
  isMobileDevice: () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  },

  // Detect if user prefers reduced motion (accessibility)
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },
}

// Construction-specific performance optimizations
export const constructionOptimizations = {
  // Lazy load materials catalog based on viewport
  shouldLoadMaterials: (element: Element) => {
    const rect = element.getBoundingClientRect()
    const threshold = window.innerHeight * 0.5 // Load when 50% in viewport
    return rect.top < threshold
  },

  // Prioritize loading based on construction project phase
  getLoadPriority: (contentType: 'materials' | 'professionals' | 'images' | 'ai-content') => {
    const priorities = {
      'ai-content': 1, // Highest priority - AI-generated content
      'materials': 2,  // High priority - material selection is critical
      'professionals': 3, // Medium priority - professional matching
      'images': 4,     // Lower priority - visual content
    }
    return priorities[contentType]
  },

  // Optimize for construction site network conditions
  adaptToConnection: () => {
    const connection = performanceUtils.getConnectionInfo()
    if (!connection) return 'standard'

    // Adapt UI based on connection quality
    switch (connection.effectiveType) {
      case 'slow-2g':
      case '2g':
        return 'minimal' // Text-only, no images, basic functionality
      case '3g':
        return 'reduced' // Compressed images, essential features only
      case '4g':
      default:
        return 'standard' // Full functionality
    }
  },
}

// Performance budgets for construction app
export const performanceBudgets = {
  // Bundle size limits
  bundles: {
    initial: 200 * 1024, // 200KB
    vendor: 150 * 1024,  // 150KB
    route: 50 * 1024,    // 50KB per route
  },

  // Timing budgets
  timing: {
    lcp: 2500, // Largest Contentful Paint < 2.5s
    fid: 100,  // First Input Delay < 100ms
    cls: 0.1,  // Cumulative Layout Shift < 0.1
    fcp: 1500, // First Contentful Paint < 1.5s
    ttfb: 600, // Time to First Byte < 600ms
  },

  // Resource budgets for construction images and data
  resources: {
    images: 500 * 1024,      // 500KB per image max
    materialData: 1024 * 1024, // 1MB for materials catalog
    professionalData: 512 * 1024, // 512KB for professional directory
  },
}

// Performance monitoring hook for React components
export const usePerformanceMonitoring = (componentName: string) => {
  const mountTimeRef = useRef<number>()
  
  const onMount = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      // Initialize mount time if not set
      if (!mountTimeRef.current && typeof window !== 'undefined') {
        mountTimeRef.current = performance.now()
      }
      
      if (mountTimeRef.current) {
        console.log(`🏗️ ${componentName} mounted in ${performance.now() - mountTimeRef.current}ms`)
      }
    }
  }, [componentName])
  
  const measureOperation = useCallback((operationName: string, operation: () => void) => {
    if (process.env.NODE_ENV === 'development') {
      performanceUtils.measureRender(`${componentName}.${operationName}`, operation)
    } else {
      operation()
    }
  }, [componentName])
  
  return {
    onMount,
    measureOperation,
  }
}