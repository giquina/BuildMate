// src/app/api/materials/bq-affiliate/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { 
  Material, 
  BQAffiliateResponse, 
  MaterialCategory,
  StockLevel,
  BulkPricingTier,
  RegionalPricing,
  DeliveryOption,
  VATInfo,
  BranchStock
} from '../../../../types'
import { getRegionalCostMultiplier, calculateVAT, formatCurrency } from '../../../../lib/uk-utils'

// Rate limiting storage (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// B&Q affiliate configuration
const BQ_AFFILIATE_CONFIG = {
  baseApiUrl: 'https://api.diy.com/v1', // Mock B&Q API
  affiliateId: 'BM_UK_2024', // BuildMate affiliate ID
  commissionRate: 2.8, // 2.8% commission rate
  trackingDomain: 'bq.prf.hn',
  rateLimitPerHour: 1000,
  cacheDurationMinutes: 15
}

// Mock B&Q product database with realistic UK construction materials
const mockBQProducts: Record<string, any> = {
  'BQ_BRICK_001': {
    id: 'BQ_BRICK_001',
    name: 'Ibstock Facing Brick Red Multi 65mm',
    description: 'Traditional red facing brick perfect for residential and commercial construction. Frost resistant and durable.',
    category: 'structural' as MaterialCategory,
    subcategory: 'Bricks & Blocks',
    basePrice: 0.52,
    unit: 'each',
    vat: { rate: 0.20, included: false, category: 'standard' as const },
    specifications: {
      dimensions: '215 x 102.5 x 65mm',
      weight: '2.8kg',
      compressiveStrength: '40N/mm²',
      waterAbsorption: '<15%',
      frostResistant: true,
      sustainability: 'A+ rated'
    },
    stockLevel: 125000,
    minOrderQuantity: 100,
    packSize: 500,
    leadTime: 3,
    popularity: 95
  },
  'BQ_TIMBER_002': {
    id: 'BQ_TIMBER_002',
    name: 'C24 Kiln Dried Treated Timber 47 x 200mm',
    description: 'High-grade structural timber, kiln dried and pressure treated for enhanced durability.',
    category: 'structural' as MaterialCategory,
    subcategory: 'Timber & Joinery',
    basePrice: 12.50,
    unit: 'linear metre',
    vat: { rate: 0.20, included: false, category: 'standard' as const },
    specifications: {
      grade: 'C24',
      treatment: 'Pressure treated',
      moisture: '<18%',
      dimensions: '47 x 200mm',
      strength: '24N/mm²',
      durabilityClass: 'Class 3'
    },
    stockLevel: 85000,
    minOrderQuantity: 10,
    packSize: 100,
    leadTime: 2,
    popularity: 88
  },
  'BQ_CEMENT_003': {
    id: 'BQ_CEMENT_003',
    name: 'Blue Circle Portland Cement CEM I 52.5N',
    description: 'High-quality Portland cement ideal for concrete, mortar, and render applications.',
    category: 'structural' as MaterialCategory,
    subcategory: 'Cement & Aggregates',
    basePrice: 4.80,
    unit: '25kg bag',
    vat: { rate: 0.20, included: false, category: 'standard' as const },
    specifications: {
      type: 'CEM I 52.5N',
      compressiveStrength: '52.5N/mm²',
      settingTime: '45 minutes',
      fineness: '350 m²/kg',
      chloride: '<0.10%',
      bagWeight: '25kg'
    },
    stockLevel: 45000,
    minOrderQuantity: 5,
    packSize: 40,
    leadTime: 1,
    popularity: 92
  },
  'BQ_INSULATION_004': {
    id: 'BQ_INSULATION_004',
    name: 'Kingspan Kooltherm K103 Fenestration Board 50mm',
    description: 'High-performance phenolic insulation board for window and door reveals.',
    category: 'insulation' as MaterialCategory,
    subcategory: 'Cavity Wall Insulation',
    basePrice: 28.50,
    unit: 'm²',
    vat: { rate: 0.05, included: false, category: 'reduced' as const },
    specifications: {
      thickness: '50mm',
      thermalConductivity: '0.021 W/mK',
      compressiveStrength: '150 kPa',
      dimensions: '1200 x 450mm',
      fireRating: 'Class 0',
      ozoneFriendly: true
    },
    stockLevel: 12500,
    minOrderQuantity: 5,
    packSize: 50,
    leadTime: 5,
    popularity: 75
  },
  'BQ_PLASTERBOARD_005': {
    id: 'BQ_PLASTERBOARD_005',
    name: 'British Gypsum Gyproc Wallboard 12.5mm',
    description: 'Standard plasterboard for dry lining and partition walls.',
    category: 'walls_ceilings' as MaterialCategory,
    subcategory: 'Plasterboard & Accessories',
    basePrice: 8.95,
    unit: 'm²',
    vat: { rate: 0.20, included: false, category: 'standard' as const },
    specifications: {
      thickness: '12.5mm',
      dimensions: '2400 x 1200mm',
      edgeType: 'Tapered',
      fireResistance: '30 minutes',
      weight: '10kg/m²',
      thermalResistance: '0.06 m²K/W'
    },
    stockLevel: 35000,
    minOrderQuantity: 10,
    packSize: 50,
    leadTime: 2,
    popularity: 90
  }
}

// Generate realistic stock levels for branches
function generateBranchStock(productId: string, userPostcode?: string): BranchStock[] {
  const branches = [
    { id: 'BQ_001', name: 'B&Q London Tottenham', postcode: 'N17 0XA', distance: 2.3 },
    { id: 'BQ_002', name: 'B&Q Birmingham Fort', postcode: 'B24 9FP', distance: 8.7 },
    { id: 'BQ_003', name: 'B&Q Manchester Eastlands', postcode: 'M11 4BD', distance: 15.2 },
    { id: 'BQ_004', name: 'B&Q Leeds Birstall', postcode: 'WF17 9AD', distance: 22.1 },
    { id: 'BQ_005', name: 'B&Q Glasgow Braehead', postcode: 'PA4 8XB', distance: 35.8 }
  ]

  return branches.map(branch => ({
    branchId: branch.id,
    branchName: branch.name,
    postcode: branch.postcode,
    distance: branch.distance,
    stockLevel: Math.floor(Math.random() * 500) + 50,
    reservationAvailable: true,
    clickAndCollect: true
  }))
}

// Generate bulk pricing tiers based on product
function generateBulkPricing(basePrice: number, minOrder: number): BulkPricingTier[] {
  const tiers: BulkPricingTier[] = []
  
  // Trade tier (5% discount)
  if (minOrder <= 100) {
    tiers.push({
      minQuantity: 100,
      maxQuantity: 499,
      unitPrice: basePrice * 0.95,
      discount: 5,
      savingsPerUnit: basePrice * 0.05,
      totalSavings: basePrice * 0.05 * 100
    })
  }
  
  // Business tier (10% discount)
  tiers.push({
    minQuantity: 500,
    maxQuantity: 999,
    unitPrice: basePrice * 0.90,
    discount: 10,
    savingsPerUnit: basePrice * 0.10,
    totalSavings: basePrice * 0.10 * 500
  })
  
  // Commercial tier (15% discount)
  tiers.push({
    minQuantity: 1000,
    unitPrice: basePrice * 0.85,
    discount: 15,
    savingsPerUnit: basePrice * 0.15,
    totalSavings: basePrice * 0.15 * 1000
  })
  
  return tiers
}

// Generate regional pricing variations
function generateRegionalPricing(basePrice: number): RegionalPricing {
  const regions = ['London', 'South East', 'North West', 'Scotland', 'Wales', 'Northern Ireland']
  const variations: Record<string, any> = {}
  
  regions.forEach(region => {
    const multiplier = getRegionalCostMultiplier(region === 'London' ? 'E1 1AA' : 'B1 1AA')
    variations[region] = {
      price: basePrice * multiplier,
      multiplier,
      deliveryFee: region === 'Scotland' || region === 'Northern Ireland' ? 25.00 : 15.00
    }
  })
  
  return {
    basePrice,
    regionalVariations: variations
  }
}

// Generate delivery options
function generateDeliveryOptions(): DeliveryOption[] {
  return [
    {
      id: 'standard',
      name: 'Standard Delivery',
      description: 'Free delivery on orders over £50',
      price: 15.00,
      estimatedDays: 5,
      available: true,
      trackingAvailable: true
    },
    {
      id: 'express',
      name: 'Express Delivery',
      description: 'Next working day delivery',
      price: 35.00,
      estimatedDays: 1,
      available: true,
      trackingAvailable: true
    },
    {
      id: 'click_collect',
      name: 'Click & Collect',
      description: 'Collect from your local store',
      price: 0,
      estimatedDays: 1,
      available: true,
      restrictions: ['Available at selected stores only'],
      trackingAvailable: false
    },
    {
      id: 'trade_delivery',
      name: 'Trade Delivery',
      description: 'Bulk delivery service for trade customers',
      price: 45.00,
      estimatedDays: 3,
      available: true,
      restrictions: ['Minimum order £200', 'Weekdays only'],
      trackingAvailable: true
    }
  ]
}

// Rate limiting middleware
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const resetTime = Math.floor(now / (60 * 60 * 1000)) * (60 * 60 * 1000) // Top of the hour
  
  const current = rateLimitStore.get(ip)
  if (!current || current.resetTime !== resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime })
    return true
  }
  
  if (current.count >= BQ_AFFILIATE_CONFIG.rateLimitPerHour) {
    return false
  }
  
  current.count++
  return true
}

// Simulate API latency for realism
function simulateLatency(): Promise<void> {
  const delay = Math.random() * 200 + 50 // 50-250ms
  return new Promise(resolve => setTimeout(resolve, delay))
}

export async function GET(request: NextRequest) {
  try {
    await simulateLatency()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const postcode = searchParams.get('postcode') || 'E1 1AA'
    const customerType = searchParams.get('customerType') || 'retail'
    
    // Get client IP for rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json({
        success: false,
        error: 'Rate limit exceeded. Maximum 1000 requests per hour.',
        metadata: {
          timestamp: new Date().toISOString(),
          requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          rateLimit: {
            remaining: 0,
            resetTime: new Date(Math.ceil(Date.now() / (60 * 60 * 1000)) * (60 * 60 * 1000)).toISOString()
          },
          affiliate: {
            commission: BQ_AFFILIATE_CONFIG.commissionRate,
            trackingId: BQ_AFFILIATE_CONFIG.affiliateId
          }
        }
      }, { status: 429 })
    }
    
    // Filter products based on search criteria
    let filteredProducts = Object.values(mockBQProducts)
    
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category)
    }
    
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.subcategory.toLowerCase().includes(searchLower)
      )
    }
    
    // Sort by popularity and apply pagination
    filteredProducts.sort((a, b) => b.popularity - a.popularity)
    const paginatedProducts = filteredProducts.slice(offset, offset + limit)
    
    // Transform to Material format with affiliate data
    const materials: Material[] = paginatedProducts.map(product => {
      const vatInfo = calculateVAT(product.basePrice, product.vat.rate)
      const regionalPricing = generateRegionalPricing(product.basePrice)
      const bulkPricing = generateBulkPricing(product.basePrice, product.minOrderQuantity)
      const branchStock = generateBranchStock(product.id, postcode)
      
      const stockLevel: StockLevel = {
        level: product.stockLevel > 1000 ? 'in_stock' : 
               product.stockLevel > 100 ? 'low_stock' : 'out_of_stock',
        quantity: product.stockLevel,
        lastChecked: new Date().toISOString(),
        nextRestock: product.stockLevel < 100 ? 
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() : undefined,
        branchAvailability: branchStock
      }
      
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        subcategory: product.subcategory,
        price: vatInfo.gross,
        unit: product.unit,
        supplier: {
          id: 'BQ_UK',
          name: 'B&Q',
          logo: '/images/suppliers/bq-logo.png',
          website: 'https://www.diy.com',
          apiEndpoint: BQ_AFFILIATE_CONFIG.baseApiUrl,
          deliveryAreas: ['UK Wide'],
          minimumOrder: 25
        },
        imageUrl: `/images/materials/${product.id.toLowerCase()}.jpg`,
        specifications: product.specifications,
        inStock: stockLevel.level !== 'out_of_stock',
        deliveryDays: product.leadTime,
        affiliateData: {
          productCode: product.id,
          affiliateUrl: `https://${BQ_AFFILIATE_CONFIG.trackingDomain}/${BQ_AFFILIATE_CONFIG.affiliateId}/${product.id}`,
          commission: BQ_AFFILIATE_CONFIG.commissionRate,
          lastUpdated: new Date().toISOString(),
          stockLevel,
          bulkPricing,
          regionalPricing,
          deliveryOptions: generateDeliveryOptions(),
          vatInfo: {
            rate: product.vat.rate,
            included: product.vat.included,
            exemptions: [],
            category: product.vat.category
          }
        }
      }
    })
    
    const response: BQAffiliateResponse = {
      success: true,
      data: {
        materials,
        pagination: {
          total: filteredProducts.length,
          limit,
          offset,
          hasMore: offset + limit < filteredProducts.length
        },
        filters: {
          categories: [...new Set(Object.values(mockBQProducts).map(p => p.category))],
          priceRange: {
            min: Math.min(...Object.values(mockBQProducts).map(p => p.basePrice)),
            max: Math.max(...Object.values(mockBQProducts).map(p => p.basePrice))
          }
        }
      },
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        rateLimit: {
          remaining: BQ_AFFILIATE_CONFIG.rateLimitPerHour - (rateLimitStore.get(ip)?.count || 0),
          resetTime: new Date(Math.ceil(Date.now() / (60 * 60 * 1000)) * (60 * 60 * 1000)).toISOString()
        },
        affiliate: {
          commission: BQ_AFFILIATE_CONFIG.commissionRate,
          trackingId: BQ_AFFILIATE_CONFIG.affiliateId
        }
      }
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('B&Q Affiliate API error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error occurred while fetching B&Q products',
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        rateLimit: {
          remaining: 0,
          resetTime: new Date().toISOString()
        },
        affiliate: {
          commission: BQ_AFFILIATE_CONFIG.commissionRate,
          trackingId: BQ_AFFILIATE_CONFIG.affiliateId
        }
      }
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await simulateLatency()
    
    const body = await request.json()
    const { productIds, action, data } = body
    
    if (!productIds || !Array.isArray(productIds)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request: productIds array is required'
      }, { status: 400 })
    }
    
    // Handle different POST actions
    switch (action) {
      case 'track_affiliate_click':
        // Track affiliate click for commission
        const trackingData = {
          productIds,
          timestamp: new Date().toISOString(),
          affiliateId: BQ_AFFILIATE_CONFIG.affiliateId,
          sessionId: data?.sessionId,
          userId: data?.userId,
          source: 'buildmate_materials_page'
        }
        
        return NextResponse.json({
          success: true,
          data: {
            trackingId: `track_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            affiliateUrls: productIds.map((id: string) => ({
              productId: id,
              url: `https://${BQ_AFFILIATE_CONFIG.trackingDomain}/${BQ_AFFILIATE_CONFIG.affiliateId}/${id}`
            }))
          },
          metadata: {
            timestamp: new Date().toISOString(),
            requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            rateLimit: { remaining: 999, resetTime: new Date().toISOString() },
            affiliate: {
              commission: BQ_AFFILIATE_CONFIG.commissionRate,
              trackingId: BQ_AFFILIATE_CONFIG.affiliateId
            }
          }
        })
        
      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action specified'
        }, { status: 400 })
    }
    
  } catch (error) {
    console.error('B&Q Affiliate POST API error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}