'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { useUser, useFreemium } from '@/contexts/UserContext'
import { formatCurrency } from '@/lib/uk-utils'
import { 
  Plus, 
  TrendingUp, 
  Package, 
  Star, 
  Clock, 
  Truck, 
  CheckCircle, 
  ArrowRight,
  Zap,
  Target,
  Gift,
  Percent,
  ShoppingBag
} from 'lucide-react'

interface CartItem {
  id: string
  materialId: string
  name: string
  description: string
  category: string
  price: number
  quantity: number
  unit: string
  supplier: string
  image?: string
}

interface RecommendedItem {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  category: string
  supplier: string
  image?: string
  reasonForRecommendation: string
  urgency?: string
  stockLevel?: 'high' | 'medium' | 'low'
  popularityScore: number
  compatibility: string[]
}

interface Bundle {
  id: string
  name: string
  description: string
  items: Array<{
    id: string
    name: string
    quantity: number
    price: number
  }>
  totalPrice: number
  originalPrice: number
  savings: number
  savingsPercent: number
  category: string
  popularity: number
}

interface ProjectCompletion {
  category: string
  itemsHave: number
  itemsNeeded: number
  completionPercentage: number
  missingItems: string[]
  estimatedCost: number
}

interface CartValueOptimizerProps {
  cartItems: CartItem[]
  cartTotal: number
  onAddItem: (item: RecommendedItem, quantity: number) => void
  onAddBundle: (bundle: Bundle) => void
  onUpgradeToPro: () => void
  className?: string
}

export function CartValueOptimizer({
  cartItems,
  cartTotal,
  onAddItem,
  onAddBundle,
  onUpgradeToPro,
  className = ''
}: CartValueOptimizerProps) {
  const { user, isAuthenticated } = useUser()
  const { subscription, checkFeatureAccess } = useFreemium()
  const [selectedTab, setSelectedTab] = useState<'recommendations' | 'bundles' | 'completion'>('recommendations')
  const [showProUpgrade, setShowProUpgrade] = useState(false)

  // Mock recommended items based on cart contents
  const recommendations = useMemo((): RecommendedItem[] => {
    const categories = Array.from(new Set(cartItems.map(item => item.category)))
    const baseRecommendations: RecommendedItem[] = []

    // Add complementary items based on cart categories
    if (categories.includes('Structural')) {
      baseRecommendations.push({
        id: 'rec_1',
        name: 'DPC Membrane 4m x 30m Roll',
        description: 'Essential damp-proof course for structural work',
        price: 45.99,
        originalPrice: 52.99,
        discount: 13,
        category: 'Structural',
        supplier: 'Travis Perkins',
        reasonForRecommendation: 'Often needed with structural materials',
        urgency: 'Limited stock',
        stockLevel: 'low',
        popularityScore: 92,
        compatibility: ['Structural', 'Roofing']
      })
    }

    if (categories.includes('Electrical')) {
      baseRecommendations.push({
        id: 'rec_2',
        name: 'Fire Rated Downlight Bezels (10 pack)',
        description: 'Required for building regulations compliance',
        price: 28.50,
        category: 'Electrical',
        supplier: 'Screwfix',
        reasonForRecommendation: 'Building regs requirement with downlights',
        popularityScore: 88,
        compatibility: ['Electrical']
      })
    }

    // Always suggest popular complementary items
    baseRecommendations.push(
      {
        id: 'rec_3',
        name: 'Gripfill Adhesive 350ml',
        description: 'Multi-purpose construction adhesive',
        price: 8.99,
        originalPrice: 11.99,
        discount: 25,
        category: 'Tools',
        supplier: 'B&Q Trade',
        reasonForRecommendation: 'Essential for most construction projects',
        popularityScore: 95,
        compatibility: ['Structural', 'Electrical', 'Plumbing']
      },
      {
        id: 'rec_4',
        name: 'Dust Sheets Pack of 5',
        description: 'Heavy-duty polythene dust sheets',
        price: 12.99,
        category: 'Tools',
        supplier: 'Wickes',
        reasonForRecommendation: 'Protect surfaces during construction',
        popularityScore: 78,
        compatibility: ['*']
      }
    )

    return baseRecommendations.sort((a, b) => b.popularityScore - a.popularityScore)
  }, [cartItems])

  // Mock bundle suggestions
  const bundles = useMemo((): Bundle[] => {
    return [
      {
        id: 'bundle_1',
        name: 'Electrical Installation Starter Kit',
        description: 'Complete kit for basic electrical installations',
        items: [
          { id: '1', name: 'Twin & Earth Cable 2.5mm�', quantity: 50, price: 89.99 },
          { id: '2', name: 'Socket Outlets (10 pack)', quantity: 1, price: 34.99 },
          { id: '3', name: 'Consumer Unit 10-way', quantity: 1, price: 67.99 }
        ],
        totalPrice: 174.99,
        originalPrice: 192.97,
        savings: 17.98,
        savingsPercent: 9,
        category: 'Electrical',
        popularity: 87
      },
      {
        id: 'bundle_2',
        name: 'Plumbing Basics Bundle',
        description: 'Essential plumbing supplies for residential projects',
        items: [
          { id: '4', name: '15mm Copper Pipe (3m lengths)', quantity: 10, price: 45.99 },
          { id: '5', name: 'Compression Fittings Pack', quantity: 1, price: 23.99 },
          { id: '6', name: 'PTFE Tape & Jointing Compound', quantity: 1, price: 8.99 }
        ],
        totalPrice: 71.99,
        originalPrice: 78.97,
        savings: 6.98,
        savingsPercent: 9,
        category: 'Plumbing',
        popularity: 82
      }
    ]
  }, [])

  // Calculate project completion status
  const projectCompletion = useMemo((): ProjectCompletion[] => {
    const categories = ['Structural', 'Electrical', 'Plumbing', 'Tools']
    
    return categories.map(category => {
      const categoryItems = cartItems.filter(item => item.category === category)
      const estimatedNeeded = category === 'Tools' ? 8 : category === 'Electrical' ? 12 : 15
      const completion = Math.min(100, (categoryItems.length / estimatedNeeded) * 100)
      
      return {
        category,
        itemsHave: categoryItems.length,
        itemsNeeded: estimatedNeeded,
        completionPercentage: completion,
        missingItems: getMissingItems(category, categoryItems),
        estimatedCost: (estimatedNeeded - categoryItems.length) * 25 // rough estimate
      }
    })
  }, [cartItems])

  const getMissingItems = (category: string, currentItems: CartItem[]): string[] => {
    const allItems: { [key: string]: string[] } = {
      'Structural': ['Cement', 'Aggregate', 'Rebar', 'Insulation', 'DPC'],
      'Electrical': ['Cable', 'Sockets', 'Switches', 'Consumer Unit', 'Conduit'],
      'Plumbing': ['Pipes', 'Fittings', 'Valves', 'Radiators', 'Boiler'],
      'Tools': ['Drill', 'Saw', 'Level', 'Measuring Tape', 'Safety Gear']
    }
    
    const current = currentItems.map((item: CartItem) => item.name.split(' ')[0])
    return (allItems[category] || []).filter((item: string) => !current.includes(item))
  }

  // Calculate shipping threshold progress
  const freeShippingThreshold = 500
  const shippingProgress = Math.min(100, (cartTotal / freeShippingThreshold) * 100)
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartTotal)

  // Handle add recommended item
  const handleAddRecommendation = useCallback((item: RecommendedItem) => {
    onAddItem(item, 1)
    
    // Track recommendation conversion
    const analyticsEvent = {
      event: 'recommendation_added',
      item_id: item.id,
      reason: item.reasonForRecommendation,
      cart_value: cartTotal,
      user_tier: subscription.tier
    }
    console.log('Recommendation Analytics:', analyticsEvent)
  }, [onAddItem, cartTotal, subscription.tier])

  // Handle Pro upgrade prompt
  const handleProUpgradePrompt = useCallback(() => {
    if (subscription.tier === 'free') {
      setShowProUpgrade(true)
    } else {
      onUpgradeToPro()
    }
  }, [subscription.tier, onUpgradeToPro])

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Optimize Your Cart
          </h3>
          <div className="text-sm text-gray-600">
            Save more " Complete projects faster
          </div>
        </div>

        {/* Free shipping progress */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900">Free Delivery Progress</span>
            <span className="text-sm text-gray-600">
              {cartTotal >= freeShippingThreshold ? (
                <span className="text-green-600 font-medium flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Qualified!
                </span>
              ) : (
                `${formatCurrency(amountToFreeShipping)} to go`
              )}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                shippingProgress >= 100 ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-100">
        <div className="flex space-x-8 px-6">
          {[
            { key: 'recommendations', label: 'Recommended', icon: Star },
            { key: 'bundles', label: 'Bundles', icon: Package },
            { key: 'completion', label: 'Project Status', icon: Target }
          ].map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key as any)}
                className={`py-4 flex items-center space-x-2 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === tab.key
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

      {/* Content */}
      <div className="p-6">
        {selectedTab === 'recommendations' && (
          <div className="space-y-4">
            {recommendations.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      {item.discount && (
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
                          {item.discount}% OFF
                        </span>
                      )}
                      {item.urgency && (
                        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">
                          {item.urgency}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatCurrency(item.originalPrice)}
                            </span>
                          )}
                          <span className="text-lg font-semibold text-gray-900">
                            {formatCurrency(item.price)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {item.reasonForRecommendation}
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddRecommendation(item)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'bundles' && (
          <div className="space-y-4">
            {bundles.map((bundle) => (
              <div
                key={bundle.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">{bundle.name}</h4>
                    <p className="text-sm text-gray-600">{bundle.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">
                      {formatCurrency(bundle.totalPrice)}
                    </div>
                    <div className="text-sm text-gray-500 line-through">
                      {formatCurrency(bundle.originalPrice)}
                    </div>
                    <div className="text-sm font-medium text-green-600">
                      Save {formatCurrency(bundle.savings)}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1 mb-4">
                  {bundle.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm text-gray-600">
                      <span>{item.quantity}x {item.name}</span>
                      <span>{formatCurrency(item.price)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{bundle.popularity}% of builders bought this</span>
                  </div>
                  <button
                    onClick={() => onAddBundle(bundle)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Add Bundle</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'completion' && (
          <div className="space-y-4">
            {projectCompletion.map((completion) => (
              <div
                key={completion.category}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{completion.category}</h4>
                  <span className="text-sm text-gray-600">
                    {completion.itemsHave}/{completion.itemsNeeded} items
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${completion.completionPercentage}%` }}
                  />
                </div>

                {completion.missingItems.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Still needed:</p>
                    <div className="flex flex-wrap gap-2">
                      {completion.missingItems.slice(0, 3).map((item, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                        >
                          {item}
                        </span>
                      ))}
                      {completion.missingItems.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{completion.missingItems.length - 3} more
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Estimated cost: {formatCurrency(completion.estimatedCost)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pro Upgrade CTA */}
      {subscription.tier === 'free' && cartTotal > 200 && (
        <div className="border-t border-gray-100 p-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Unlock Pro Bulk Pricing</h4>
                <p className="text-sm text-gray-600">
                  Save 15-25% on all materials with professional trade rates
                </p>
              </div>
            </div>
            <button
              onClick={handleProUpgradePrompt}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
            >
              <span>Upgrade Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartValueOptimizer