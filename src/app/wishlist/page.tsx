'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/uk-utils'
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  Star,
  Eye,
  Plus,
  User,
  Lock
} from 'lucide-react'

interface WishlistItem {
  id: string
  name: string
  description: string
  category: string
  price: number
  unit: string
  supplier: {
    name: string
    deliveryDays: number
  }
  rating: number
  reviewCount: number
  imageUrl?: string
  inStock: boolean
  savedDate: string
}

// Mock wishlist data
const mockWishlistItems: WishlistItem[] = [
  {
    id: '1',
    name: 'Premium Oak Engineered Flooring',
    description: 'Beautiful 18mm engineered oak flooring, 190mm wide planks',
    category: 'Flooring',
    price: 45.99,
    unit: 'per m²',
    supplier: {
      name: 'Wickes',
      deliveryDays: 3
    },
    rating: 4.8,
    reviewCount: 324,
    inStock: true,
    savedDate: '2025-01-25'
  },
  {
    id: '2',
    name: 'Smart Home Security System',
    description: '8-camera wireless system with mobile app control',
    category: 'Security',
    price: 899.99,
    unit: 'complete system',
    supplier: {
      name: 'Screwfix',
      deliveryDays: 2
    },
    rating: 4.6,
    reviewCount: 156,
    inStock: true,
    savedDate: '2025-01-22'
  },
  {
    id: '3',
    name: 'Insulation - Rockwool RW3 100mm',
    description: 'Thermal and acoustic insulation for cavity walls',
    category: 'Insulation',
    price: 24.99,
    unit: 'per pack (5.76m²)',
    supplier: {
      name: 'Travis Perkins',
      deliveryDays: 1
    },
    rating: 4.9,
    reviewCount: 89,
    inStock: false,
    savedDate: '2025-01-20'
  }
]

export default function WishlistPage() {
  const router = useRouter()
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(mockWishlistItems)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Mock login state

  const removeFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id))
  }

  const addToCart = (item: WishlistItem) => {
    // Mock add to cart functionality
    console.log('Added to cart:', item.name)
    // In real app, would update cart state/context
  }

  const addAllToCart = () => {
    // Mock add all to cart
    console.log('Added all items to cart')
  }

  // Show login prompt if not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <Card className="max-w-md mx-auto">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Lock className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In Required</h2>
                <p className="text-gray-600 mb-6">
                  Create an account or sign in to save your favorite construction materials and access your wishlist.
                </p>
                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    onClick={() => setIsLoggedIn(true)} // Mock login
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In / Create Account
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => router.push('/materials')}
                  >
                    Continue Browsing Materials
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
              <p className="text-gray-600">
                {wishlistItems.length} saved items for your construction projects
              </p>
            </div>
            {wishlistItems.length > 0 && (
              <Button onClick={addAllToCart}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add All to Cart
              </Button>
            )}
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          // Empty wishlist state
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">
                Save materials you're interested in for easy access later
              </p>
              <Button onClick={() => router.push('/materials')}>
                Browse Materials
              </Button>
            </CardContent>
          </Card>
        ) : (
          // Wishlist items grid
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  {/* Item header with category and heart */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      {item.category}
                    </span>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Remove from Wishlist"
                    >
                      <Heart className="h-5 w-5 fill-current" />
                    </button>
                  </div>

                  {/* Item details */}
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>

                  {/* Rating and reviews */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(item.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {item.rating} ({item.reviewCount})
                      </span>
                    </div>
                  </div>

                  {/* Supplier and availability */}
                  <div className="text-sm text-gray-600 mb-4">
                    <div className="flex justify-between items-center">
                      <span>{item.supplier.name}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.inStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Saved on {new Date(item.savedDate).toLocaleDateString('en-GB')}
                    </div>
                  </div>

                  {/* Price and actions */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-lg text-gray-900">
                        {formatCurrency(item.price)}
                      </div>
                      <div className="text-sm text-gray-600">{item.unit}</div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/materials/${item.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => addToCart(item)}
                      disabled={!item.inStock}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Related suggestions */}
        {wishlistItems.length > 0 && (
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle>You might also like</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Based on your saved items, BuildMate AI suggests these complementary materials:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Flooring Underlayment</h4>
                    <p className="text-sm text-gray-600">Essential for your oak flooring installation</p>
                    <Button size="sm" variant="outline" className="mt-2">View Options</Button>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Wall Fixings & Plugs</h4>
                    <p className="text-sm text-gray-600">For your security system installation</p>
                    <Button size="sm" variant="outline" className="mt-2">View Options</Button>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Vapor Barrier</h4>
                    <p className="text-sm text-gray-600">Works with your insulation choice</p>
                    <Button size="sm" variant="outline" className="mt-2">View Options</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}