'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { formatCurrency } from '@/lib/uk-utils'
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Plus, 
  Minus,
  Star,
  Truck,
  CheckCircle,
  Building,
  Hammer,
  Lightbulb,
  Droplets
} from 'lucide-react'

interface Material {
  id: string
  name: string
  description: string
  category: string
  price: number
  unit: string
  supplier: {
    name: string
    logo: string
    rating: number
    deliveryDays: number
  }
  imageUrl: string
  inStock: boolean
  discount?: number
}

interface CartItem extends Material {
  quantity: number
}

const mockMaterials: Material[] = [
  {
    id: '1',
    name: 'Softwood Studwork 38x63mm x 2.4m',
    description: 'C16 grade kiln dried timber for internal wall framing',
    category: 'structural',
    price: 4.99,
    unit: 'each',
    supplier: {
      name: 'Travis Perkins',
      logo: '/logos/travis-perkins.png',
      rating: 4.5,
      deliveryDays: 2
    },
    imageUrl: '/materials/timber-stud.jpg',
    inStock: true,
    discount: 10
  },
  {
    id: '2',
    name: 'Facing Brick - Ibstock Red Multi',
    description: 'Traditional red multi facing brick, 65mm',
    category: 'structural',
    price: 0.85,
    unit: 'each',
    supplier: {
      name: 'Wickes',
      logo: '/logos/wickes.png',
      rating: 4.3,
      deliveryDays: 3
    },
    imageUrl: '/materials/red-brick.jpg',
    inStock: true
  },
  {
    id: '3',
    name: 'Knauf Insulation Earthwool 100mm',
    description: 'Glass mineral wool insulation roll, 8.3m²',
    category: 'insulation',
    price: 24.99,
    unit: 'roll',
    supplier: {
      name: 'B&Q',
      logo: '/logos/bq.png',
      rating: 4.2,
      deliveryDays: 1
    },
    imageUrl: '/materials/insulation.jpg',
    inStock: true
  },
  {
    id: '4',
    name: 'LED Downlight 10W Dimmable',
    description: 'Warm white 3000K, IP44 rated bathroom safe',
    category: 'electrical',
    price: 12.99,
    unit: 'each',
    supplier: {
      name: 'Screwfix',
      logo: '/logos/screwfix.png',
      rating: 4.6,
      deliveryDays: 1
    },
    imageUrl: '/materials/led-downlight.jpg',
    inStock: true,
    discount: 15
  },
  {
    id: '5',
    name: 'Bathroom Suite - Modern White',
    description: 'Close coupled toilet, basin & bath set',
    category: 'bathroom',
    price: 299.99,
    unit: 'set',
    supplier: {
      name: 'Wickes',
      logo: '/logos/wickes.png',
      rating: 4.4,
      deliveryDays: 5
    },
    imageUrl: '/materials/bathroom-suite.jpg',
    inStock: true
  },
  {
    id: '6',
    name: 'Kitchen Unit Base 600mm',
    description: 'Shaker style white gloss base unit with soft close',
    category: 'kitchen',
    price: 89.99,
    unit: 'each',
    supplier: {
      name: 'B&Q',
      logo: '/logos/bq.png',
      rating: 4.1,
      deliveryDays: 7
    },
    imageUrl: '/materials/kitchen-unit.jpg',
    inStock: true
  }
]

const categories = [
  { id: 'all', name: 'All Materials', icon: Building },
  { id: 'structural', name: 'Structural', icon: Building },
  { id: 'insulation', name: 'Insulation', icon: Building },
  { id: 'electrical', name: 'Electrical', icon: Lightbulb },
  { id: 'bathroom', name: 'Bathroom', icon: Droplets },
  { id: 'kitchen', name: 'Kitchen', icon: Hammer }
]

export default function MaterialsPage() {
  const router = useRouter()
  const [materials, setMaterials] = useState<Material[]>(mockMaterials)
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>(mockMaterials)
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCart, setShowCart] = useState(false)

  useEffect(() => {
    filterMaterials()
  }, [selectedCategory, searchQuery])

  const filterMaterials = () => {
    let filtered = materials

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(material => material.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(material => 
        material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredMaterials(filtered)
  }

  const addToCart = (material: Material) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === material.id)
      if (existing) {
        return prev.map(item => 
          item.id === material.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...material, quantity: 1 }]
    })
  }

  const updateCartQuantity = (id: string, change: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change)
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity }
        }
        return item
      }).filter(Boolean) as CartItem[]
    })
  }

  const getTotalCost = () => {
    return cart.reduce((total, item) => {
      const price = item.discount ? item.price * (1 - item.discount / 100) : item.price
      return total + (price * item.quantity)
    }, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Materials Marketplace</h1>
              <p className="text-gray-600">Source everything for your build from top UK suppliers</p>
            </div>
            <Button 
              onClick={() => setShowCart(!showCart)}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart ({getTotalItems()})
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Filter Materials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Input
                    placeholder="Search materials..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <category.icon className="h-4 w-4 mr-2" />
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Materials Grid */}
          <div className={`${showCart ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredMaterials.map((material) => (
                <Card key={material.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <Building className="h-12 w-12 text-gray-400" />
                    </div>
                    
                    <h3 className="font-medium text-gray-900 mb-1">{material.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{material.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <img 
                          src={`https://via.placeholder.com/20x20?text=${material.supplier.name[0]}`}
                          alt={material.supplier.name}
                          className="w-4 h-4 rounded mr-1"
                        />
                        {material.supplier.name}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">{material.supplier.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        {material.discount && (
                          <span className="text-sm text-gray-500 line-through mr-2">
                            {formatCurrency(material.price)}
                          </span>
                        )}
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(material.discount ? material.price * (1 - material.discount / 100) : material.price)}
                        </span>
                        <span className="text-sm text-gray-600 ml-1">/{material.unit}</span>
                      </div>
                      {material.discount && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                          {material.discount}% off
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Truck className="h-3 w-3 mr-1" />
                        {material.supplier.deliveryDays} days
                      </div>
                      {material.inStock && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          In stock
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full" 
                      size="sm"
                      onClick={() => addToCart(material)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Shopping Cart Sidebar */}
          {showCart && (
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Shopping Cart</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                  ) : (
                    <>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {cart.map((item) => (
                          <div key={item.id} className="border-b pb-3">
                            <h4 className="font-medium text-sm text-gray-900 mb-1">
                              {item.name}
                            </h4>
                            <p className="text-xs text-gray-600 mb-2">{item.supplier.name}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => updateCartQuantity(item.id, -1)}
                                  className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="text-sm font-medium">{item.quantity}</span>
                                <button
                                  onClick={() => updateCartQuantity(item.id, 1)}
                                  className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              <span className="text-sm font-medium">
                                {formatCurrency((item.discount ? item.price * (1 - item.discount / 100) : item.price) * item.quantity)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center font-semibold text-lg">
                          <span>Total:</span>
                          <span>{formatCurrency(getTotalCost())}</span>
                        </div>
                        <Button className="w-full mt-4" onClick={() => router.push('/cart')}>
                          Proceed to Checkout
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}