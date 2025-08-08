'use client'

import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { Button } from './Button'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  type: ToastType
  title: string
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  toasts: Toast[]
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { ...toast, id }
    
    setToasts(prev => [...prev, newToast])
    
    // Auto remove after duration (default 5 seconds)
    setTimeout(() => {
      removeToast(id)
    }, toast.duration || 5000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  
  return {
    toast: context.addToast,
    success: (title: string, description?: string, options?: Partial<Toast>) => 
      context.addToast({ type: 'success', title, description, ...options }),
    error: (title: string, description?: string, options?: Partial<Toast>) => 
      context.addToast({ type: 'error', title, description, ...options }),
    info: (title: string, description?: string, options?: Partial<Toast>) => 
      context.addToast({ type: 'info', title, description, ...options }),
    warning: (title: string, description?: string, options?: Partial<Toast>) => 
      context.addToast({ type: 'warning', title, description, ...options })
  }
}

function ToastContainer() {
  const { toasts, removeToast } = useContext(ToastContext)!
  
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <ToastItem 
          key={toast.id} 
          toast={toast} 
          onRemove={() => removeToast(toast.id)} 
        />
      ))}
    </div>
  )
}

function ToastItem({ toast, onRemove }: { toast: Toast, onRemove: () => void }) {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 10)
  }, [])
  
  const handleRemove = () => {
    setIsVisible(false)
    setTimeout(onRemove, 200) // Wait for exit animation
  }
  
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle
  }
  
  const colors = {
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-800',
      icon: 'text-green-600'
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-800',
      icon: 'text-red-600'
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      icon: 'text-blue-600'
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      text: 'text-yellow-800',
      icon: 'text-yellow-600'
    }
  }
  
  const Icon = icons[toast.type]
  const colorClasses = colors[toast.type]
  
  return (
    <div 
      className={`min-w-80 max-w-md p-4 border rounded-lg shadow-lg transition-all duration-200 ${
        isVisible 
          ? 'translate-x-0 opacity-100' 
          : 'translate-x-full opacity-0'
      } ${colorClasses.bg}`}
    >
      <div className="flex items-start space-x-3">
        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${colorClasses.icon}`} />
        
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium ${colorClasses.text}`}>
            {toast.title}
          </h4>
          {toast.description && (
            <p className={`text-sm mt-1 ${colorClasses.text} opacity-90`}>
              {toast.description}
            </p>
          )}
          
          {toast.action && (
            <div className="mt-3">
              <Button
                size="sm"
                variant="outline"
                onClick={toast.action.onClick}
                className="text-xs"
              >
                {toast.action.label}
              </Button>
            </div>
          )}
        </div>
        
        <button
          onClick={handleRemove}
          className={`p-1 rounded-full hover:bg-black/5 transition-colors ${colorClasses.text}`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}