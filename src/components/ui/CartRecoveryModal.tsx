'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useUser, useFreemium } from '@/contexts/UserContext'
import { formatCurrency } from '@/lib/uk-utils'
import { 
  ShoppingCart, 
  X, 
  Clock, 
  Truck, 
  Star, 
  Users, 
  AlertCircle,
  ArrowRight,
  Gift,
  Zap,
  TrendingUp
} from 'lucide-react'

interface CartRecoveryModalProps {
  isOpen: boolean
  onClose: () => void
  cartItems: Array<{
    id: string
    name: string
    price: number
    quantity: number
    image?: string
    supplier?: string
  }>
  cartValue: number
  onReturnToCart: () => void
  onStartCheckout: () => void
  triggerType: 'exit_intent' | 'time_based' | 'return_user'
}

export function CartRecoveryModal({
  isOpen,
  onClose,
  cartItems,
  cartValue,
  onReturnToCart,
  onStartCheckout,
  triggerType
}: CartRecoveryModalProps) {
  const { user, isAuthenticated } = useUser()
  const { subscription } = useFreemium()
  const [selectedIncentive, setSelectedIncentive] = useState<string | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(900) // 15 minutes
  
  const modalRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Handle incentive selection
  const handleIncentiveSelect = (incentiveId: string) => {
    setSelectedIncentive(incentiveId)
    console.log('Cart Recovery Analytics:', { incentive_id: incentiveId, cart_value: cartValue })
  }

  // Handle return to cart with incentive
  const handleReturnWithIncentive = () => {
    if (selectedIncentive) {
      console.log('Cart Recovery Conversion:', { incentive_used: selectedIncentive, recovery_method: 'return_to_cart' })
    }
    onReturnToCart()
    onClose()
  }

  // Handle direct checkout
  const handleDirectCheckout = () => {
    console.log('Cart Recovery Conversion:', { incentive_used: selectedIncentive, recovery_method: 'direct_checkout' })
    onStartCheckout()
    onClose()
  }

  useEffect(() => {
    if (isOpen) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => Math.max(0, prev - 1))
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isOpen])

  const formatTimeRemaining = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div 
        ref={modalRef}
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Complete Your Order
                </h2>
                <p className="text-sm text-gray-600">
                  {cartItems.length} items " {formatCurrency(cartValue)} total
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          <div className="mt-4 p-3 rounded-lg flex items-center space-x-3 bg-blue-50 border border-blue-200">
            <Clock className="h-5 w-5 text-blue-600" />
            <div className="flex-1">
              <div className="font-medium text-blue-900">
                Special pricing available
              </div>
              <div className="text-sm text-blue-700">
                Time remaining: {formatTimeRemaining(timeRemaining)}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Your Cart Summary</h3>
            <div className="space-y-2">
              {cartItems.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{item.name}</span>
                  <span className="font-medium">
                    {item.quantity}x {formatCurrency(item.price)}
                  </span>
                </div>
              ))}
              {cartItems.length > 3 && (
                <div className="text-sm text-gray-500">
                  +{cartItems.length - 3} more items
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total:</span>
                <span>{formatCurrency(cartValue)}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-600" />
              What Other Builders Are Doing
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                <span className="text-gray-700">Someone in London just bought these materials</span>
                <span className="text-gray-500">" 5 minutes ago</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                <span className="text-gray-700">847 builders bought these materials this week</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Truck className="h-4 w-4" />
              <span>Fast UK Delivery</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-1">
              <AlertCircle className="h-4 w-4" />
              <span>Price Match Guarantee</span>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 rounded-b-2xl">
          <div className="flex space-x-3">
            <button
              onClick={handleReturnWithIncentive}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Return to Cart</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={handleDirectCheckout}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <Zap className="h-5 w-5" />
              <span>Checkout Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 text-center">
            <button
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartRecoveryModal