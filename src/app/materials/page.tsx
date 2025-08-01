'use client'

import { useState, useEffect, memo, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatCurrency, calculateRegionalCost, CONSTRUCTION_DISCLAIMER } from '@/lib/uk-utils'
// import { usePerformanceMonitoring } from '@/lib/performance'
import { 
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Clock,
  Truck,
  Star,
  Shield,
  Leaf,
  Package,
  MapPin,
  Calendar,
  PoundSterling,
  Award,
  Users,
  Settings,
  ArrowRight,
  TrendingUp,
  ThumbsUp,
  Heart,
  MessageCircle,
  Camera,
  Filter,
  BarChart3,
  Verified,
  Quote,
  Image,
  Eye,
  BadgeCheck,
  StarHalf,
  AlertCircle
} from 'lucide-react'

interface CustomerReview {
  id: string
  customerName: string
  rating: number
  title: string
  comment: string
  date: string
  verified: boolean
  projectType: string
  helpful: number
  photos?: string[]
  location: string
}

interface ProfessionalEndorsement {
  id: string
  professionalName: string
  company: string
  title: string
  quote: string
  verified: boolean
  yearsExperience: number
  projectsCompleted: number
}

interface ProjectShowcase {
  id: string
  title: string
  beforePhoto: string
  afterPhoto: string
  description: string
  projectType: string
  completionDate: string
  customerName: string
  location: string
}

interface RatingBreakdown {
  quality: number
  value: number
  durability: number
  appearance: number
  easeOfInstall: number
}

interface ProjectMaterial {
  id: string
  name: string
  description: string
  room: string
  phase: string
  quantity: number
  unitPrice: number
  totalPrice: number
  unit: string
  supplier: {
    name: string
    logo: string
    rating: number
    status: 'confirmed' | 'pending' | 'coordinating'
  }
  delivery: {
    scheduledDate: string
    window: string
    status: 'scheduled' | 'in-transit' | 'delivered'
    trackingNumber?: string
  }
  quality: {
    certification: string
    sustainabilityRating: 'A+' | 'A' | 'B' | 'C'
    warranty: string
  }
  imageUrl: string
  alternatives?: number
  upgradePrice?: number
  savings?: number
  usedInProjects?: number
  // New review and social proof fields
  customerSatisfaction: number
  successRate: number
  averageRating: number
  totalReviews: number
  ratingBreakdown: RatingBreakdown
  customerReviews: CustomerReview[]
  professionalEndorsements: ProfessionalEndorsement[]
  projectShowcases: ProjectShowcase[]
  recommendedWith: string[]
}

interface DeliveryPhase {
  id: string
  name: string
  date: string
  status: 'completed' | 'upcoming' | 'current'
  materials: string[]
}

const projectMaterials: ProjectMaterial[] = [
  {
    id: '1',
    name: 'Premium Softwood Frame Kit',
    description: 'Complete structural framing package - C24 grade kiln dried timber',
    room: 'Structural',
    phase: 'Foundation & Frame',
    quantity: 45,
    unitPrice: 6.99,
    totalPrice: 314.55,
    unit: 'pieces',
    supplier: {
      name: 'Travis Perkins',
      logo: '/logos/travis-perkins.png',
      rating: 4.8,
      status: 'confirmed'
    },
    delivery: {
      scheduledDate: '2024-02-15',
      window: '8:00-12:00',
      status: 'scheduled',
      trackingNumber: 'TP2024021501'
    },
    quality: {
      certification: 'FSC Certified',
      sustainabilityRating: 'A+',
      warranty: '10 year structural'
    },
    imageUrl: '/materials/premium-timber.jpg',
    alternatives: 3,
    savings: 85.50,
    usedInProjects: 847,
    customerSatisfaction: 95,
    successRate: 98,
    averageRating: 4.8,
    totalReviews: 245,
    ratingBreakdown: { quality: 4.8, value: 4.7, durability: 4.9, appearance: 4.6, easeOfInstall: 4.8 },
    customerReviews: [],
    professionalEndorsements: [],
    projectShowcases: [],
    recommendedWith: []
  },
  {
    id: '2',
    name: 'Ibstock Heritage Brick Collection',
    description: 'Handmade traditional red multi - selected for character match',
    room: 'Exterior',
    phase: 'Foundation & Frame',
    quantity: 2400,
    unitPrice: 0.92,
    totalPrice: 2208.00,
    unit: 'bricks',
    supplier: {
      name: 'Wickes',
      logo: '/logos/wickes.png',
      rating: 4.6,
      status: 'coordinating'
    },
    delivery: {
      scheduledDate: '2024-02-18',
      window: '7:00-16:00',
      status: 'scheduled'
    },
    quality: {
      certification: 'Made in Britain',
      sustainabilityRating: 'A',
      warranty: '50 year frost resistance'
    },
    imageUrl: '/materials/heritage-brick.jpg',
    alternatives: 5,
    upgradePrice: 145.00,
    usedInProjects: 234,
    customerSatisfaction: 92,
    successRate: 96,
    averageRating: 4.6,
    totalReviews: 187,
    ratingBreakdown: { quality: 4.6, value: 4.5, durability: 4.8, appearance: 4.7, easeOfInstall: 4.4 },
    customerReviews: [],
    professionalEndorsements: [],
    projectShowcases: [],
    recommendedWith: []
  },
  {
    id: '3',
    name: 'Kingspan Premium Insulation System',
    description: 'High-performance rigid foam boards - 120mm thickness',
    room: 'Throughout',
    phase: 'Insulation & Services',
    quantity: 24,
    unitPrice: 32.50,
    totalPrice: 780.00,
    unit: 'boards',
    supplier: {
      name: 'B&Q',
      logo: '/logos/bq.png',
      rating: 4.4,
      status: 'confirmed'
    },
    delivery: {
      scheduledDate: '2024-03-05',
      window: '9:00-13:00',
      status: 'scheduled'
    },
    quality: {
      certification: 'BBA Approved',
      sustainabilityRating: 'A+',
      warranty: '25 year thermal performance'
    },
    imageUrl: '/materials/kingspan-insulation.jpg',
    savings: 120.00,
    usedInProjects: 1205,
    customerSatisfaction: 94,
    successRate: 97,
    averageRating: 4.7,
    totalReviews: 312,
    ratingBreakdown: { quality: 4.7, value: 4.6, durability: 4.9, appearance: 4.5, easeOfInstall: 4.8 },
    customerReviews: [],
    professionalEndorsements: [],
    projectShowcases: [],
    recommendedWith: []
  },
  {
    id: '4',
    name: 'Philips Smart LED Lighting Package',
    description: 'Complete home lighting system - dimmable, colour-changing',
    room: 'Living Areas',
    phase: 'Finishing',
    quantity: 18,
    unitPrice: 24.99,
    totalPrice: 449.82,
    unit: 'fixtures',
    supplier: {
      name: 'Screwfix',
      logo: '/logos/screwfix.png',
      rating: 4.7,
      status: 'pending'
    },
    delivery: {
      scheduledDate: '2024-04-12',
      window: '10:00-14:00',
      status: 'scheduled'
    },
    quality: {
      certification: 'Energy Star',
      sustainabilityRating: 'A+',
      warranty: '5 year manufacturer'
    },
    imageUrl: '/materials/smart-lighting.jpg',
    alternatives: 7,
    upgradePrice: 89.99,
    usedInProjects: 1834,
    customerSatisfaction: 89,
    successRate: 94,
    averageRating: 4.4,
    totalReviews: 523,
    ratingBreakdown: { quality: 4.4, value: 4.3, durability: 4.6, appearance: 4.5, easeOfInstall: 4.2 },
    customerReviews: [],
    professionalEndorsements: [],
    projectShowcases: [],
    recommendedWith: []
  },
  {
    id: '5',
    name: 'Villeroy & Boch Bathroom Suite',
    description: 'Contemporary white ceramic suite - water-saving technology',
    room: 'Master Bathroom',
    phase: 'Finishing',
    quantity: 1,
    unitPrice: 649.99,
    totalPrice: 649.99,
    unit: 'suite',
    supplier: {
      name: 'Wickes',
      logo: '/logos/wickes.png',
      rating: 4.5,
      status: 'confirmed'
    },
    delivery: {
      scheduledDate: '2024-04-20',
      window: '8:00-18:00',
      status: 'scheduled'
    },
    quality: {
      certification: 'WaterSense',
      sustainabilityRating: 'A',
      warranty: '10 year ceramic guarantee'
    },
    imageUrl: '/materials/vb-bathroom.jpg',
    alternatives: 4,
    upgradePrice: 299.99,
    usedInProjects: 456,
    customerSatisfaction: 96,
    successRate: 99,
    averageRating: 4.9,
    totalReviews: 128,
    ratingBreakdown: { quality: 4.9, value: 4.8, durability: 5.0, appearance: 4.9, easeOfInstall: 4.7 },
    customerReviews: [],
    professionalEndorsements: [],
    projectShowcases: [],
    recommendedWith: []
  },
  {
    id: '6',
    name: 'Howdens Greenwich Kitchen Range',
    description: 'Shaker-style painted finish - soft-close doors and drawers',
    room: 'Kitchen',
    phase: 'Finishing',
    quantity: 12,
    unitPrice: 156.99,
    totalPrice: 1883.88,
    unit: 'units',
    supplier: {
      name: 'Howdens',
      logo: '/logos/howdens.png',
      rating: 4.3,
      status: 'coordinating'
    },
    delivery: {
      scheduledDate: '2024-04-25',
      window: 'Full day install',
      status: 'scheduled'
    },
    quality: {
      certification: 'FIRA Gold',
      sustainabilityRating: 'B',
      warranty: '5 year furniture guarantee'
    },
    imageUrl: '/materials/howdens-kitchen.jpg',
    alternatives: 8,
    upgradePrice: 445.00,
    usedInProjects: 678,
    customerSatisfaction: 91,
    successRate: 95,
    averageRating: 4.5,
    totalReviews: 289,
    ratingBreakdown: { quality: 4.5, value: 4.4, durability: 4.7, appearance: 4.6, easeOfInstall: 4.3 },
    customerReviews: [],
    professionalEndorsements: [],
    projectShowcases: [],
    recommendedWith: []
  }
]

const deliveryPhases: DeliveryPhase[] = [
  {
    id: '1',
    name: 'Foundation & Frame',
    date: 'Feb 15-20',
    status: 'upcoming',
    materials: ['Premium Softwood Frame Kit', 'Heritage Brick Collection']
  },
  {
    id: '2',
    name: 'Insulation & Services',
    date: 'Mar 5-15',
    status: 'upcoming',
    materials: ['Kingspan Insulation System', 'Electrical Rough-in']
  },
  {
    id: '3',
    name: 'Finishing',
    date: 'Apr 12-30',
    status: 'upcoming',
    materials: ['Smart LED Lighting', 'Bathroom Suite', 'Kitchen Range']
  }
]

export default function MaterialsPage() {
  const router = useRouter()
  const [selectedPhase, setSelectedPhase] = useState('all')
  const [showAlternatives, setShowAlternatives] = useState<string | null>(null)
  const [expandedMaterial, setExpandedMaterial] = useState<string | null>(null)
  // const { onMount, measureOperation } = usePerformanceMonitoring('MaterialsPage')

  // Memoized calculations for better performance
  const totalCost = useMemo(() => 
    projectMaterials.reduce((sum, material) => sum + material.totalPrice, 0), 
    [projectMaterials]
  )
  
  const totalSavings = useMemo(() => 
    projectMaterials.reduce((sum, material) => sum + (material.savings || 0), 0), 
    [projectMaterials]
  )

  const filteredMaterials = useMemo(() => 
    selectedPhase === 'all' 
      ? projectMaterials 
      : projectMaterials.filter(material => material.phase === selectedPhase),
    [selectedPhase, projectMaterials]
  )

  // Memoized helper functions
  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'coordinating': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }, [])

  const getSustainabilityColor = useCallback((rating: string) => {
    switch (rating) {
      case 'A+': return 'bg-green-500'
      case 'A': return 'bg-green-400'
      case 'B': return 'bg-yellow-400'
      case 'C': return 'bg-orange-400'
      default: return 'bg-gray-400'
    }
  }, [])

  // Memoized event handlers
  const handlePhaseChange = useCallback((phase: string) => {
    // measureOperation('phaseFilter', () => setSelectedPhase(phase)) // DISABLED
    setSelectedPhase(phase)
  }, [])

  const handleShowAlternatives = useCallback((materialId: string | null) => {
    setShowAlternatives(prev => prev === materialId ? null : materialId)
  }, [])

  const handleRouterPush = useCallback((path: string) => {
    router.push(path)
  }, [router])

  // Performance monitoring on mount
  useEffect(() => {
    // onMount() // DISABLED
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Everything You Need, Already Chosen</h1>
            <p className="text-xl text-blue-100 mb-8">Your project materials are carefully selected and ready for delivery</p>
            
            {/* Project Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-6 text-center">
                  <Package className="h-8 w-8 mx-auto mb-3 text-blue-200" />
                  <div className="text-2xl font-bold">{projectMaterials.length}</div>
                  <div className="text-blue-100">Materials Selected</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-6 text-center">
                  <PoundSterling className="h-8 w-8 mx-auto mb-3 text-blue-200" />
                  <div className="text-2xl font-bold">{formatCurrency(totalCost)}</div>
                  <div className="text-blue-100">Total Investment</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-3 text-blue-200" />
                  <div className="text-2xl font-bold">{formatCurrency(totalSavings)}</div>
                  <div className="text-blue-100">Your Savings</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Timeline */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Timeline</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {deliveryPhases.map((phase, index) => (
              <div key={phase.id} className="relative">
                <Card className={`${phase.status === 'current' ? 'ring-2 ring-blue-500' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        phase.status === 'completed' ? 'bg-green-500' :
                        phase.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
                      }`}>
                        {phase.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-white" />
                        ) : (
                          <span className="text-white font-semibold">{index + 1}</span>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{phase.name}</div>
                        <div className="text-sm text-gray-600">{phase.date}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {phase.materials.map((material, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-300 rounded-full mr-2"></div>
                          {material}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                {index < deliveryPhases.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Materials Selected for Your Project</h2>
          <Button 
            variant="outline" 
            onClick={() => handleRouterPush('/configure')}
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <Settings className="h-4 w-4 mr-2" />
            Modify Project
          </Button>
        </div>

        {/* Phase Filter */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {['all', ...deliveryPhases.map(p => p.name)].map((phase) => (
              <button
                key={phase}
                onClick={() => handlePhaseChange(phase)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
                  selectedPhase === phase
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {phase === 'all' ? 'All Phases' : phase}
              </button>
            ))}
          </div>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredMaterials.map((material) => (
            <Card key={material.id} className="hover:shadow-lg transition-all duration-200">
              <CardContent className="p-4 sm:p-6">
                {/* Material Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-3 sm:gap-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{material.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(material.supplier.status)}`}>
                        {material.supplier.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{material.description}</p>
                    <div className="text-xs text-gray-500">{material.room} • {material.phase}</div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="font-bold text-lg text-gray-900">{formatCurrency(material.totalPrice)}</div>
                    <div className="text-xs text-gray-500">{material.quantity} {material.unit}</div>
                  </div>
                </div>

                {/* Quality & Sustainability Badges */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-xs text-gray-600">{material.quality.certification}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className={`w-3 h-3 rounded-full ${getSustainabilityColor(material.quality.sustainabilityRating)}`}></div>
                    <span className="text-xs text-gray-600">{material.quality.sustainabilityRating} Rated</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-amber-500" />
                    <span className="text-xs text-gray-600">{material.quality.warranty}</span>
                  </div>
                </div>

                {/* Supplier & Delivery Info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <img 
                        src={`https://via.placeholder.com/24x24?text=${material.supplier.name[0]}`}
                        alt={material.supplier.name}
                        className="w-6 h-6 rounded"
                      />
                      <span className="font-medium text-gray-900">{material.supplier.name}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400" />
                        <span className="text-xs text-gray-600">{material.supplier.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(material.delivery.scheduledDate).toLocaleDateString()}</span>
                      <span className="text-xs">({material.delivery.window})</span>
                    </div>
                    {material.delivery.trackingNumber && (
                      <div className="flex items-center gap-1 text-blue-600">
                        <Package className="h-3 w-3" />
                        <span className="text-xs">Track: {material.delivery.trackingNumber}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions & Savings */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    {material.savings && (
                      <div className="text-sm">
                        <span className="text-green-600 font-medium">Saved {formatCurrency(material.savings)}</span>
                      </div>
                    )}
                    {material.usedInProjects && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Users className="h-3 w-3" />
                        <span>Used in {material.usedInProjects.toLocaleString()} projects</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    {material.alternatives && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShowAlternatives(material.id)}
                      >
                        {material.alternatives} Alternatives
                        <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showAlternatives === material.id ? 'rotate-180' : ''}`} />
                      </Button>
                    )}
                    {material.upgradePrice && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      >
                        Upgrade +{formatCurrency(material.upgradePrice)}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Alternatives Section */}
                {showAlternatives === material.id && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Alternative Options</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        View {material.alternatives} similar products that match your project requirements
                      </p>
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleRouterPush(`/materials/${material.id}/alternatives`)}
                      >
                        See All Options
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Project Modification CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Want Different Materials?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our AI has selected these materials based on your project requirements, budget, and timeline. 
            Modify your project preferences to see different options.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => handleRouterPush('/project/configure')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Settings className="h-4 w-4 mr-2" />
              Modify Project
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleRouterPush('/materials/alternatives')}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Browse All Alternatives
            </Button>
          </div>
        </div>

        {/* Pricing Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
            Important Pricing Information
          </h4>
          <div className="text-sm text-gray-700 space-y-2">
            <p>• Prices shown are indicative and subject to regional variations (London +30-50%, Scotland/Wales -10-20%)</p>
            <p>• Material costs subject to market volatility and supplier availability</p>
            <p>• Trade discounts of 5-15% may apply for professional accounts</p>
            <p>• Delivery charges vary by location and order size</p>
            <p>• VAT at standard rate (20%) applies to most materials</p>
            <p>• Actual installation costs not included in material pricing</p>
          </div>
        </div>
      </div>
    </div>
  )
}