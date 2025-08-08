'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from './Button'
import Link from 'next/link'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
    
    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to error reporting service (Sentry, DataDog, etc.)
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Something went wrong
              </h2>
              <p className="text-gray-600 mb-6">
                We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
              </p>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={this.handleRetry}
                className="w-full flex items-center justify-center"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              
              <Link href="/">
                <Button 
                  variant="outline"
                  className="w-full flex items-center justify-center"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </Link>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 mb-2">
                  Technical Details (Development)
                </summary>
                <pre className="text-xs bg-red-50 p-4 rounded border text-red-800 overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export { ErrorBoundary }

// Commercial-specific error boundary
export function CommercialErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        console.error('Commercial platform error:', { error, errorInfo })
        // Track commercial-specific errors
      }}
      fallback={
        <div className="min-h-[400px] flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
          <div className="text-center max-w-md bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-xl">
            <div className="mb-6">
              <AlertTriangle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Commercial Platform Error
              </h2>
              <p className="text-gray-600 mb-6">
                We're having trouble loading your commercial property data. Our team has been notified and we're working on a fix.
              </p>
            </div>
            
            <div className="space-y-3">
              <Button className="w-full" onClick={() => window.location.reload()}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reload Page
              </Button>
              
              <Link href="/commercial">
                <Button variant="outline" className="w-full">
                  Back to Commercial Home
                </Button>
              </Link>
              
              <Link href="/contact">
                <Button variant="outline" className="w-full text-blue-600 border-blue-200">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  )
}

// ROI Calculator specific error boundary
export function ROICalculatorErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <h3 className="font-semibold text-red-900 mb-2">Calculator Error</h3>
            <p className="text-sm text-red-700 mb-4">
              Unable to calculate ROI. Please check your inputs and try again.
            </p>
            <Button size="sm" onClick={() => window.location.reload()}>
              Reset Calculator
            </Button>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  )
}
