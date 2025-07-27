'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { formatCurrency, calculateVAT } from '@/lib/uk-utils'
import { 
  CreditCard, 
  Truck, 
  Shield, 
  CheckCircle,
  AlertCircle,
  Plus,
  Lightbulb,
  Zap,
  HardHat,
  Settings,
  Star
} from 'lucide-react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
}

interface AIRecommendation {
  id: string
  name: string
  description: string
  price: number
  category: 'tools' | 'safety' | 'materials' | 'accessories'
  reason: string
  confidence: number
  savings?: number
  imageUrl?: string
  inCart?: boolean
}

// Mock cart data
const mockCartItems: CartItem[] = [
  { id: '1', name: 'Softwood Studwork 38x63mm x 2.4m', price: 4.99, quantity: 25, category: 'Structural' },
  { id: '2', name: 'Facing Brick - Ibstock Red Multi', price: 0.85, quantity: 500, category: 'Structural' },
  { id: '3', name: 'LED Downlight 10W Dimmable', price: 12.99, quantity: 12, category: 'Electrical' }
]

// Mock AI recommendations based on cart items
const mockAIRecommendations: AIRecommendation[] = [
  {
    id: 'ai-1',
    name: 'Professional Stud Finder with LCD Display',
    description: 'Essential for accurate stud placement with your studwork materials',
    price: 34.99,
    category: 'tools',
    reason: 'You\'re buying studwork - this tool ensures perfect placement every time',
    confidence: 95,
    savings: 15.00
  },
  {
    id: 'ai-2', 
    name: 'Safety Glasses & Hard Hat Set',
    description: 'Professional PPE essential for structural work',
    price: 24.99,
    category: 'safety',
    reason: 'Safety equipment is crucial for structural building work',
    confidence: 92
  },
  {
    id: 'ai-3',
    name: 'Mortar Mix for Brickwork - 25kg',
    description: 'High-strength mortar perfect for your facing bricks',
    price: 12.50,
    category: 'materials',
    reason: 'You need mortar for 500 bricks - this covers approximately 100 bricks',
    confidence: 98,
    savings: 8.00
  },
  {
    id: 'ai-4',
    name: 'Electrical Tester & Voltage Detector',
    description: 'Safety testing equipment for LED installation',
    price: 18.99,
    category: 'tools', 
    reason: 'Essential safety tool when working with electrical fixtures',
    confidence: 87
  },
  {
    id: 'ai-5',
    name: 'Wire Nuts & Terminal Block Set',
    description: 'Connection accessories for your LED downlights',
    price: 9.99,
    category: 'accessories',
    reason: 'You\'ll need proper connections for 12 LED lights',
    confidence: 94
  },
  {
    id: 'ai-6',
    name: 'Pointing Trowel & Joint Raker',
    description: 'Precision tools for professional brickwork finishing',
    price: 28.50,
    category: 'tools',
    reason: 'Professional brickwork requires proper pointing tools',
    confidence: 89
  }
]

export default function CheckoutPage() {
  const router = useRouter()
  const [cartItems] = useState<CartItem[]>(mockCartItems)
  const [recommendations] = useState<AIRecommendation[]>(mockAIRecommendations)
  const [selectedRecommendations, setSelectedRecommendations] = useState<string[]>([])
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'klarna'>('card')
  const [billingInfo, setBillingInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postcode: '',
    phone: ''
  })

  const toggleRecommendation = (id: string) => {
    setSelectedRecommendations(prev => 
      prev.includes(id) 
        ? prev.filter(recId => recId !== id)
        : [...prev, id]
    )
  }

  const getCartSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getRecommendationsTotal = () => {
    return recommendations
      .filter(rec => selectedRecommendations.includes(rec.id))
      .reduce((total, rec) => total + rec.price, 0)
  }

  const getOrderTotal = () => {
    const subtotal = getCartSubtotal() + getRecommendationsTotal()
    const { gross } = calculateVAT(subtotal)
    return gross
  }

  const getCategoryIcon = (category: AIRecommendation['category']) => {
    switch (category) {
      case 'tools': return <Settings className="h-5 w-5" />
      case 'safety': return <HardHat className="h-5 w-5" />
      case 'materials': return <Truck className="h-5 w-5" />
      case 'accessories': return <Plus className="h-5 w-5" />
      default: return <Plus className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: AIRecommendation['category']) => {
    switch (category) {
      case 'tools': return 'bg-blue-100 text-blue-800'
      case 'safety': return 'bg-red-100 text-red-800'
      case 'materials': return 'bg-green-100 text-green-800'
      case 'accessories': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your construction materials order</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Billing & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Billing Information */}
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="First Name"
                    value={billingInfo.firstName}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                  <Input
                    placeholder="Last Name"
                    value={billingInfo.lastName}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
                <Input
                  placeholder="Email Address"
                  type="email"
                  value={billingInfo.email}
                  onChange={(e) => setBillingInfo(prev => ({ ...prev, email: e.target.value }))}
                />
                <Input
                  placeholder="Address"
                  value={billingInfo.address}
                  onChange={(e) => setBillingInfo(prev => ({ ...prev, address: e.target.value }))}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="City"
                    value={billingInfo.city}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, city: e.target.value }))}
                  />
                  <Input
                    placeholder="Postcode"
                    value={billingInfo.postcode}
                    onChange={(e) => setBillingInfo(prev => ({ ...prev, postcode: e.target.value }))}
                  />
                </div>
                <Input
                  placeholder="Phone Number"
                  value={billingInfo.phone}
                  onChange={(e) => setBillingInfo(prev => ({ ...prev, phone: e.target.value }))}
                />
              </CardContent>
            </Card>

            {/* AI Recommendations Section */}
            <Card className="border-blue-200 bg-blue-50/50">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-blue-900">BuildMate AI Recommendations</CardTitle>
                    <p className="text-sm text-blue-700 mt-1">
                      Smart suggestions based on your materials and project type
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  {recommendations.map((rec) => (
                    <div 
                      key={rec.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedRecommendations.includes(rec.id)
                          ? 'border-blue-500 bg-blue-50 shadow-sm'
                          : 'border-gray-200 bg-white hover:border-blue-300'
                      }`}
                      onClick={() => toggleRecommendation(rec.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <input
                              type="checkbox"
                              checked={selectedRecommendations.includes(rec.id)}
                              onChange={() => toggleRecommendation(rec.id)}
                              className="text-blue-600 rounded"
                            />
                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getCategoryColor(rec.category)}`}>
                              {getCategoryIcon(rec.category)}
                              <span className="capitalize">{rec.category}</span>
                            </span>
                            <div className="flex items-center">
                              <Zap className="h-3 w-3 text-green-600 mr-1" />
                              <span className="text-xs text-green-600 font-medium">
                                {rec.confidence}% match
                              </span>
                            </div>
                          </div>
                          
                          <h4 className="font-semibold text-gray-900 mb-1">{rec.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                          
                          <div className="bg-blue-100 p-2 rounded text-sm text-blue-800 mb-2">
                            <strong>Why we recommend this:</strong> {rec.reason}
                          </div>
                          
                          {rec.savings && (
                            <div className="text-sm text-green-600 font-medium">
                              💰 Potential project savings: {formatCurrency(rec.savings)}
                            </div>
                          )}
                        </div>
                        
                        <div className="text-right ml-4">
                          <div className="font-semibold text-lg text-gray-900">
                            {formatCurrency(rec.price)}
                          </div>
                          {selectedRecommendations.includes(rec.id) && (
                            <div className="text-sm text-green-600 font-medium">
                              ✓ Added
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedRecommendations.length > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-green-800">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">
                        {selectedRecommendations.length} AI recommendation{selectedRecommendations.length > 1 ? 's' : ''} added
                      </span>
                    </div>
                    <div className="text-sm text-green-700 mt-1">
                      Total additional cost: {formatCurrency(getRecommendationsTotal())}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="text-blue-600"
                    />
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <span>Credit/Debit Card</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="text-blue-600"
                    />
                    <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                    <span>PayPal</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="klarna"
                      checked={paymentMethod === 'klarna'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="text-blue-600"
                    />
                    <div className="w-5 h-5 bg-pink-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">K</span>
                    </div>
                    <span>Klarna Pay Later</span>
                  </label>
                </div>
                
                {paymentMethod === 'card' && (
                  <div className="space-y-3 pt-4 border-t">
                    <Input placeholder="Card Number" />
                    <div className="grid grid-cols-3 gap-3">
                      <Input placeholder="MM/YY" />
                      <Input placeholder="CVC" />
                      <Input placeholder="ZIP" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-gray-600">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* AI Recommendations in cart */}
                {selectedRecommendations.length > 0 && (
                  <div className="border-t pt-3">
                    <div className="font-medium text-blue-800 mb-2 flex items-center">
                      <Lightbulb className="h-4 w-4 mr-1" />
                      AI Recommendations
                    </div>
                    {recommendations
                      .filter(rec => selectedRecommendations.includes(rec.id))
                      .map((rec) => (
                        <div key={rec.id} className="flex justify-between text-sm mb-2">
                          <div className="font-medium text-blue-800">{rec.name}</div>
                          <div className="font-medium text-blue-800">
                            {formatCurrency(rec.price)}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                )}
                
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(getCartSubtotal() + getRecommendationsTotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>VAT (20%)</span>
                    <span>{formatCurrency(calculateVAT(getCartSubtotal() + getRecommendationsTotal()).vat)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{formatCurrency(getOrderTotal())}</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-6" size="lg">
                  <Shield className="h-5 w-5 mr-2" />
                  Complete Secure Order
                </Button>
              </CardContent>
            </Card>

            {/* Security & Trust */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 text-green-800 mb-2">
                  <Shield className="h-5 w-5" />
                  <span className="font-medium">Secure Checkout</span>
                </div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 256-bit SSL encryption</li>
                  <li>• PCI DSS compliant</li>
                  <li>• No card details stored</li>
                  <li>• Trusted by UK builders</li>
                </ul>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 text-gray-800 mb-2">
                  <Truck className="h-5 w-5" />
                  <span className="font-medium">Delivery Information</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Free delivery on orders over £50</li>
                  <li>• Standard delivery: 2-5 working days</li>
                  <li>• SMS tracking updates</li>
                  <li>• Safe drop-off options</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}