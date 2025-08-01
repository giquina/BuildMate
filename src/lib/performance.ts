// Performance monitoring and optimization utilities for BuildMate AI

// Dynamic import of web-vitals to handle build issues
type Metric = {
  name: string;
  value: number;
  delta: number;
  id: string;
  rating: 'good' | 'needs-improvement' | 'poor';
}

// Mock web-vitals functions for development
const mockWebVitals = {
  getCLS: (callback: (metric: Metric) => void) => {
    callback({ name: 'CLS', value: 0, delta: 0, id: 'mock', rating: 'good' })
  },
  getFID: (callback: (metric: Metric) => void) => {
    callback({ name: 'FID', value: 0, delta: 0, id: 'mock', rating: 'good' })
  },
  getFCP: (callback: (metric: Metric) => void) => {
    callback({ name: 'FCP', value: 0, delta: 0, id: 'mock', rating: 'good' })
  },
  getLCP: (callback: (metric: Metric) => void) => {
    callback({ name: 'LCP', value: 0, delta: 0, id: 'mock', rating: 'good' })
  },
  getTTFB: (callback: (metric: Metric) => void) => {
    callback({ name: 'TTFB', value: 0, delta: 0, id: 'mock', rating: 'good' })
  }
}

// Lazy loading web-vitals with fallback
const getWebVitals = async () => {
  if (typeof window === 'undefined') {
    return mockWebVitals
  }

  try {
    // Use eval to prevent TypeScript from checking the import at compile time
    const webVitalsModule = await eval('import("web-vitals")')
    return webVitalsModule
  } catch (error) {
    console.warn('🏗️ BuildMate Performance: web-vitals not available, using fallback')
    return mockWebVitals
  }
}

// Web Vitals reporting for construction industry performance monitoring
export const reportWebVitals = (metric: any) => {
  // In production, send to analytics service
  if (process.env.NODE_ENV === 'production') {
    console.log(metric)
    // TODO: Send to analytics service (Google Analytics, DataDog, etc.)
  }
  
  // Development logging with construction context
  if (process.env.NODE_ENV === 'development') {
    console.log(`🏗️ BuildMate Performance: ${metric.name}`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    })
  }
}

// Initialize Web Vitals monitoring
export const initPerformanceMonitoring = async () => {
  if (typeof window !== 'undefined') {
    const webVitals = await getWebVitals()
    if (webVitals) {
      webVitals.getCLS(reportWebVitals)
      webVitals.getFID(reportWebVitals)
      webVitals.getFCP(reportWebVitals)
      webVitals.getLCP(reportWebVitals)
      webVitals.getTTFB(reportWebVitals)
      console.log('🏗️ BuildMate Performance: Web Vitals monitoring initialized')
    } else {
      console.log('🏗️ BuildMate Performance: Fallback monitoring active')
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
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    const mountTime = performance.now()
    
    return {
      onMount: () => {
        console.log(`🏗️ ${componentName} mounted in ${performance.now() - mountTime}ms`)
      },
      measureOperation: (operationName: string, operation: () => void) => {
        performanceUtils.measureRender(`${componentName}.${operationName}`, operation)
      },
    }
  }
  
  return {
    onMount: () => {},
    measureOperation: (_: string, operation: () => void) => operation(),
  }
}