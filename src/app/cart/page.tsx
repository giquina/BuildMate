'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { formatCurrency, calculateVAT } from '@/lib/uk-utils'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Truck, 
  Calendar,
  CreditCard,
  FileText,
  Download,
  Share
} from 'lucide-react'

interface CartItem {
  id: string
  name: string
  description: string
  category: string
  price: number
  quantity: number
  unit: string
  supplier: {
    name: string
    deliveryDays: number
  }
  discount?: number
}

// Mock cart data (in real app, this would come from state management)
const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Softwood Studwork 38x63mm x 2.4m',
    description: 'C16 grade kiln dried timber for internal wall framing',
    category: 'Structural',
    price: 4.99,
    quantity: 25,
    unit: 'each',
    supplier: {
      name: 'Travis Perkins',
      deliveryDays: 2
    },
    discount: 10
  },
  {
    id: '2',
    name: 'Facing Brick - Ibstock Red Multi',
    description: 'Traditional red multi facing brick, 65mm',
    category: 'Structural',
    price: 0.85,
    quantity: 500,
    unit: 'each',
    supplier: {
      name: 'Wickes',
      deliveryDays: 3
    }
  },
  {
    id: '3',
    name: 'LED Downlight 10W Dimmable',
    description: 'Warm white 3000K, IP44 rated bathroom safe',
    category: 'Electrical',
    price: 12.99,
    quantity: 12,
    unit: 'each',
    supplier: {
      name: 'Screwfix',
      deliveryDays: 1
    },
    discount: 15
  },
  {
    id: '4',
    name: 'Bathroom Suite - Modern White',
    description: 'Close coupled toilet, basin & bath set',
    category: 'Bathroom',
    price: 299.99,
    quantity: 1,
    unit: 'set',
    supplier: {
      name: 'Wickes',
      deliveryDays: 5
    }
  }
]

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems)
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express' | 'collection'>('standard')
  const [promoCode, setPromoCode] = useState('')

  const updateQuantity = (id: string, change: number) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change)
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity }
        }
        return item
      }).filter(Boolean) as CartItem[]
    )
  }

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const getItemPrice = (item: CartItem) => {
    return item.discount ? item.price * (1 - item.discount / 100) : item.price
  }

  const getItemTotal = (item: CartItem) => {
    return getItemPrice(item) * item.quantity
  }

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + getItemTotal(item), 0)
  }

  const getDeliveryFee = () => {
    switch (deliveryOption) {
      case 'express': return 25.00
      case 'standard': return getSubtotal() > 500 ? 0 : 15.00
      case 'collection': return 0
      default: return 0
    }
  }

  const getOrderTotal = () => {
    const subtotal = getSubtotal()
    const delivery = getDeliveryFee()
    const { gross } = calculateVAT(subtotal + delivery)
    return gross
  }

  const getDeliveryDate = () => {
    const maxDeliveryDays = Math.max(...cartItems.map(item => item.supplier.deliveryDays))
    const deliveryDate = new Date()
    
    if (deliveryOption === 'express') {
      deliveryDate.setDate(deliveryDate.getDate() + 1)
    } else if (deliveryOption === 'standard') {
      deliveryDate.setDate(deliveryDate.getDate() + maxDeliveryDays)
    }
    
    return deliveryDate.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">Review your materials and proceed to checkout</p>
        </div>

        {cartItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add materials to your cart to continue building</p>
              <Button onClick={() => router.push('/materials')}>
                Browse Materials
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <span className="bg-gray-100 px-2 py-1 rounded mr-3">{item.category}</span>
                          <span>{item.supplier.name}</span>
                          <span className="mx-2">•</span>
                          <Truck className="h-3 w-3 mr-1" />
                          <span>{item.supplier.deliveryDays} days</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center border rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-2 hover:bg-gray-50 rounded-l-lg"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4 py-2 border-x">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-2 hover:bg-gray-50 rounded-r-lg"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <span className="text-sm text-gray-600">{item.unit}</span>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700 p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-right ml-6">
                        {item.discount && (
                          <div className="text-sm text-gray-500 line-through">
                            {formatCurrency(item.price * item.quantity)}
                          </div>
                        )}
                        <div className="font-semibold text-lg">
                          {formatCurrency(getItemTotal(item))}
                        </div>
                        {item.discount && (
                          <div className="text-sm text-green-600">
                            Save {formatCurrency((item.price * item.discount / 100) * item.quantity)}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Delivery Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="delivery"
                      value="standard"
                      checked={deliveryOption === 'standard'}
                      onChange={(e) => setDeliveryOption(e.target.value as any)}
                      className="text-blue-600"
                    />
                    <div className="flex-1">
                      <div className="font-medium">Standard Delivery</div>
                      <div className="text-sm text-gray-600">
                        {getSubtotal() > 500 ? 'Free' : '£15.00'} • {getDeliveryDate()}
                      </div>
                    </div>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="delivery"
                      value="express"
                      checked={deliveryOption === 'express'}
                      onChange={(e) => setDeliveryOption(e.target.value as any)}
                      className="text-blue-600"
                    />
                    <div className="flex-1">
                      <div className="font-medium">Express Delivery</div>
                      <div className="text-sm text-gray-600">£25.00 • Next working day</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="delivery"
                      value="collection"
                      checked={deliveryOption === 'collection'}
                      onChange={(e) => setDeliveryOption(e.target.value as any)}
                      className="text-blue-600"
                    />
                    <div className="flex-1">
                      <div className="font-medium">Click & Collect</div>
                      <div className="text-sm text-gray-600">Free • Ready in 2-3 days</div>
                    </div>
                  </label>
                </CardContent>
              </Card>

              {/* Promo Code */}
              <Card>
                <CardHeader>
                  <CardTitle>Promo Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline">Apply</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>{formatCurrency(getSubtotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>{getDeliveryFee() === 0 ? 'Free' : formatCurrency(getDeliveryFee())}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>VAT (20%)</span>
                    <span>{formatCurrency(calculateVAT(getSubtotal() + getDeliveryFee()).vat)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{formatCurrency(getOrderTotal())}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6" size="lg">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Proceed to Checkout
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      Save Quote
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="h-4 w-4 mr-1" />
                      Share Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Estimated Delivery */}
              {deliveryOption !== 'collection' && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center text-blue-800">
                      <Calendar className="h-5 w-5 mr-2" />
                      <div>
                        <div className="font-medium">Estimated Delivery</div>
                        <div className="text-sm">{getDeliveryDate()}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}