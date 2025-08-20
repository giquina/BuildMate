'use client'

import React, { useState, useCallback } from 'react'
import { useUser, useFreemium } from '@/contexts/UserContext'
import { formatCurrency } from '@/lib/uk-utils'
import { 
  ShoppingCart, 
  X, 
  Clock, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Gift,
  Sparkles,
  User,
  TrendingUp,
  Zap,
  Heart,
  Target,
  Award
} from 'lucide-react'

interface AbandonedCartData {
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
  totalValue: number
  abandonedDate: Date
}

interface ReturnUserWelcomeProps {
  isVisible: boolean
  onClose: () => void
  abandonedCart?: AbandonedCartData
  onRecoverCart?: () => void
  className?: string
}

export function ReturnUserWelcome({
  isVisible,
  onClose,
  abandonedCart,
  onRecoverCart,
  className = ''
}: ReturnUserWelcomeProps) {
  const { user, isAuthenticated } = useUser()
  const { subscription, awardXP } = useFreemium()
  const [selectedSection, setSelectedSection] = useState<'cart' | 'features'>('cart')
  const [hasClaimedWelcomeBonus, setHasClaimedWelcomeBonus] = useState(false)

  const handleClaimWelcomeBonus = useCallback(() => {
    setHasClaimedWelcomeBonus(true)
    awardXP(50, 'Welcome back bonus!')
    console.log('Return User Analytics:', { event: 'welcome_bonus_claimed' })
  }, [awardXP])

  const handleRecoverCart = useCallback(() => {
    onRecoverCart?.()
    console.log('Cart Recovery Analytics:', { event: 'return_user_cart_recovered' })
    onClose()
  }, [onRecoverCart, onClose])

  if (!isVisible || !isAuthenticated) return null

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${className}`}>
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-8 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-full">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">
                Welcome back, {user?.name || 'Builder'}!
              </h2>
              <p className="text-blue-100">Great to see you again</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">2</div>
              <div className="text-sm text-blue-100">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{abandonedCart?.items.length || 0}</div>
              <div className="text-sm text-blue-100">Items in Cart</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-blue-100">New Features</div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-100">
          <div className="flex space-x-8 px-6">
            {[
              { key: 'cart', label: 'Your Cart', icon: ShoppingCart },
              { key: 'features', label: 'What\'s New', icon: Sparkles }
            ].map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.key}
                  onClick={() => setSelectedSection(tab.key as any)}
                  className={`py-4 flex items-center space-x-2 border-b-2 font-medium text-sm transition-colors ${
                    selectedSection === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="p-6">
          {selectedSection === 'cart' && abandonedCart && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Your Abandoned Cart
                </h3>
                <div className="text-sm text-gray-600">
                  {formatCurrency(abandonedCart.totalValue)} total
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium text-yellow-900">Still available!</span>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  Your materials are still in stock and ready to order.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {abandonedCart.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-600">Quantity: {item.quantity}</div>
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleRecoverCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Continue Shopping</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {selectedSection === 'features' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">What's New</h3>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">Bulk Pricing Calculator</h4>
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                          NEW
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Compare prices across quantities and save up to 25% on large orders
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">AI Material Recommendations</h4>
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                          NEW
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Get smart suggestions based on your project type and previous purchases
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {!hasClaimedWelcomeBonus && (
          <div className="border-t border-gray-100 p-6 bg-gradient-to-r from-green-50 to-blue-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Welcome Back Bonus!</h4>
                  <p className="text-sm text-gray-600">
                    Claim 50 XP for returning to BuildMate AI
                  </p>
                </div>
              </div>
              <button
                onClick={handleClaimWelcomeBonus}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
              >
                <Heart className="h-4 w-4" />
                <span>Claim Bonus</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReturnUserWelcome