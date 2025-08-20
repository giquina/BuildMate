'use client'

import { useState, useEffect, useCallback } from 'react'
import { ShoppingCart, Package2, Truck, Calculator, CreditCard, Zap, AlertTriangle, CheckCircle, Clock, Users, TrendingUp, Star, Shield } from 'lucide-react'
import { Button } from './Button'
import { Card } from './Card'
import { formatCurrency } from '@/lib/uk-utils'

interface BulkItem {
  id: string
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
  supplier: string
  bulkDiscount: number
  selected: boolean
}

interface DeliveryOption {
  id: string
  name: string
  price: number
  description: string
  estimatedDays: number
  tracking: boolean
}

interface PaymentMethod {
  id: string
  name: string
  description: string
  processingFee: number
  icon: string
}

const BULK_ITEMS: BulkItem[] = [
  {
    id: '1',
    name: 'Premium Softwood Frame Kit - C24 Grade',
    quantity: 45,
    unitPrice: 8.99,
    totalPrice: 404.55,
    supplier: 'Travis Perkins',
    bulkDiscount: 0.12,
    selected: true
  },
  {
    id: '2', 
    name: 'Ibstock Heritage Brick Collection - Red Multi',
    quantity: 2400,
    unitPrice: 1.25,
    totalPrice: 3000.00,
    supplier: 'B&Q Trade',
    bulkDiscount: 0.08,
    selected: true
  },
  {
    id: '3',
    name: 'Kingspan Premium Insulation System',
    quantity: 24,
    unitPrice: 32.50,
    totalPrice: 780.00,
    supplier: 'B&Q Trade',
    bulkDiscount: 0.15,
    selected: true
  },
  {
    id: '4',
    name: 'Philips Smart LED Lighting Package',
    quantity: 18,
    unitPrice: 24.99,
    totalPrice: 449.82,
    supplier: 'B&Q Trade',
    bulkDiscount: 0.10,
    selected: false
  },
  {
    id: '5',
    name: 'Villeroy & Boch Bathroom Suite',
    quantity: 1,
    unitPrice: 649.99,
    totalPrice: 649.99,
    supplier: 'B&Q Trade',
    bulkDiscount: 0.18,
    selected: false
  },
  {
    id: '6',
    name: 'Howdens Greenwich Kitchen Range',
    quantity: 12,
    unitPrice: 156.99,
    totalPrice: 1883.88,
    supplier: 'B&Q Trade',
    bulkDiscount: 0.22,
    selected: false
  }
]

const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: 'standard',
    name: 'Standard Delivery',
    price: 0,
    description: 'Free delivery on orders over £500',
    estimatedDays: 5,
    tracking: true
  },
  {
    id: 'priority',
    name: 'Priority Delivery',
    price: 49.99,
    description: 'Expedited processing and delivery',
    estimatedDays: 2,
    tracking: true
  },
  {
    id: 'site',
    name: 'Construction Site Delivery',
    price: 125.00,
    description: 'Crane-assisted delivery direct to site',
    estimatedDays: 3,
    tracking: true
  }
]

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, American Express',
    processingFee: 0,
    icon: '💳'
  },
  {
    id: 'trade_account',
    name: 'B&Q Trade Account',
    description: '30-day payment terms, additional 2% discount',
    processingFee: 0,
    icon: '🏢'
  },
  {
    id: 'finance',
    name: 'BuildMate Finance',
    description: '0% APR for 12 months on orders over £2,000',
    processingFee: 0,
    icon: '💰'
  }
]

export function BulkOrderingSystem() {
  const [items, setItems] = useState(BULK_ITEMS)
  const [selectedDelivery, setSelectedDelivery] = useState('standard')
  const [selectedPayment, setSelectedPayment] = useState('card')
  const [showOrderSummary, setShowOrderSummary] = useState(false)
  const [processingOrder, setProcessingOrder] = useState(false)

  // Calculate totals
  const selectedItems = items.filter(item => item.selected)
  const subtotal = selectedItems.reduce((sum, item) => sum + item.totalPrice, 0)
  const bulkDiscountAmount = selectedItems.reduce((sum, item) => sum + (item.totalPrice * item.bulkDiscount), 0)
  const deliveryOption = DELIVERY_OPTIONS.find(d => d.id === selectedDelivery)
  const deliveryCost = subtotal >= 500 && selectedDelivery === 'standard' ? 0 : (deliveryOption?.price || 0)
  const vatAmount = (subtotal - bulkDiscountAmount + deliveryCost) * 0.20
  const grandTotal = subtotal - bulkDiscountAmount + deliveryCost + vatAmount

  const handleItemToggle = useCallback((itemId: string) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, selected: !item.selected } : item
    ))
  }, [])

  const handleQuantityChange = useCallback((itemId: string, newQuantity: number) => {
    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, quantity: newQuantity, totalPrice: item.unitPrice * newQuantity }
        : item
    ))
  }, [])

  const handleProcessOrder = useCallback(async () => {
    setProcessingOrder(true)
    // Simulate API call to B&Q Trade affiliate system
    await new Promise(resolve => setTimeout(resolve, 2000))
    setProcessingOrder(false)
    setShowOrderSummary(true)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bulk Material Ordering System
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Live affiliate integration with B&Q Trade, Travis Perkins, and more
        </p>
        <div className="flex justify-center items-center space-x-8 text-sm">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <span>Live pricing updates</span>
          </div>
          <div className="flex items-center">
            <Truck className="h-5 w-5 text-blue-600 mr-2" />
            <span>Same-day delivery available</span>
          </div>
          <div className="flex items-center">
            <Calculator className="h-5 w-5 text-purple-600 mr-2" />
            <span>Bulk discount pricing</span>
          </div>
        </div>
      </div>

      {/* Live B&Q Integration Status */}
      <Card className="mb-8 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white font-bold text-xl">B&Q</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Live B&Q Trade Integration</h3>
                <p className="text-gray-600">Real-time pricing, stock levels, and affiliate commissions</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-green-600 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Connected</span>
              </div>
              <div className="text-xs text-gray-500">Last sync: 2 mins ago</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">2.8%</div>
              <div className="text-sm text-gray-600">Affiliate Commission</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">£127.50</div>
              <div className="text-sm text-gray-600">Monthly Earnings</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">94%</div>
              <div className="text-sm text-gray-600">Items In Stock</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">12-15%</div>
              <div className="text-sm text-gray-600">Bulk Discounts</div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items Selection */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Materials for Bulk Order</h2>
          
          {items.map((item) => (
            <Card key={item.id} className={`transition-all duration-200 ${item.selected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'}`}>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => handleItemToggle(item.id)}
                      className="mt-1 mr-4 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <div className="w-3 h-3 bg-orange-500 rounded-full mr-1"></div>
                          {item.supplier}
                        </span>
                        <span className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          4.8 rating
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center">
                          <label className="text-sm text-gray-600 mr-2">Quantity:</label>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                            disabled={!item.selected}
                          />
                        </div>
                        <div className="text-sm text-gray-600">
                          @ {formatCurrency(item.unitPrice)} each
                        </div>
                      </div>
                      
                      {item.bulkDiscount > 0 && (
                        <div className="flex items-center text-sm">
                          <div className="bg-green-100 text-green-800 px-2 py-1 rounded mr-2">
                            -{(item.bulkDiscount * 100).toFixed(0)}% bulk discount
                          </div>
                          <div className="text-green-600 font-medium">
                            Save {formatCurrency(item.totalPrice * item.bulkDiscount)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {formatCurrency(item.totalPrice)}
                    </div>
                    {item.bulkDiscount > 0 && (
                      <div className="text-sm text-green-600 font-medium">
                        After discount: {formatCurrency(item.totalPrice * (1 - item.bulkDiscount))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card className="sticky top-4">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({selectedItems.length} items)</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Bulk discounts</span>
                  <span>-{formatCurrency(bulkDiscountAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery</span>
                  <span>{deliveryCost > 0 ? formatCurrency(deliveryCost) : 'FREE'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>VAT (20%)</span>
                  <span>{formatCurrency(vatAmount)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Options */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Delivery Options</h4>
                <div className="space-y-2">
                  {DELIVERY_OPTIONS.map((option) => (
                    <label key={option.id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="delivery"
                        value={option.id}
                        checked={selectedDelivery === option.id}
                        onChange={(e) => setSelectedDelivery(e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{option.name}</div>
                            <div className="text-sm text-gray-600">{option.description}</div>
                            <div className="text-xs text-gray-500">{option.estimatedDays} working days</div>
                          </div>
                          <div className="font-medium">
                            {option.price > 0 ? formatCurrency(option.price) : 'FREE'}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Payment Method</h4>
                <div className="space-y-2">
                  {PAYMENT_METHODS.map((method) => (
                    <label key={method.id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{method.icon}</span>
                          <div>
                            <div className="font-medium">{method.name}</div>
                            <div className="text-sm text-gray-600">{method.description}</div>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <Button
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3"
                onClick={handleProcessOrder}
                disabled={selectedItems.length === 0 || processingOrder}
              >
                {processingOrder ? (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Processing Order...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Place Bulk Order • {formatCurrency(grandTotal)}
                  </div>
                )}
              </Button>

              {/* Trust Signals */}
              <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-2 gap-4 text-center text-xs text-gray-600">
                  <div>
                    <Shield className="h-4 w-4 mx-auto mb-1" />
                    <div>Secure Payment</div>
                  </div>
                  <div>
                    <Truck className="h-4 w-4 mx-auto mb-1" />
                    <div>Tracked Delivery</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Affiliate Benefits */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="p-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                BuildMate Affiliate Benefits
              </h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span>Earn 2.8% commission on every order</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span>Live pricing from 15+ suppliers</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span>Automatic bulk discount calculation</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span>Professional trade account access</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      {showOrderSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Your bulk order has been submitted to our supplier partners. You'll receive confirmation emails shortly.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="text-sm text-gray-600 mb-1">Order Total</div>
                <div className="text-2xl font-bold text-gray-900">{formatCurrency(grandTotal)}</div>
                <div className="text-sm text-green-600 mt-1">You saved {formatCurrency(bulkDiscountAmount)}</div>
              </div>

              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowOrderSummary(false)}
                >
                  Close
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Track Order
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}