// src/app/api/materials/bulk-pricing/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { 
  BulkPricingRequest,
  BulkPricingTier,
  BQAffiliateResponse
} from '../../../../types'
import { getRegionalCostMultiplier, calculateVAT } from '../../../../lib/uk-utils'

// Rate limiting for bulk pricing API
const bulkPricingRateLimit = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 500 // requests per hour
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes cache

// Cache for pricing calculations
const pricingCache = new Map<string, { data: any; expiry: number }>()

// Mock product pricing data with realistic UK construction material costs
const PRODUCT_BASE_PRICES = {
  'BQ_BRICK_001': { basePrice: 0.52, category: 'structural', weight: 2.8, bulkable: true },
  'BQ_TIMBER_002': { basePrice: 12.50, category: 'structural', weight: 25.0, bulkable: true },
  'BQ_CEMENT_003': { basePrice: 4.80, category: 'structural', weight: 25.0, bulkable: true },
  'BQ_INSULATION_004': { basePrice: 28.50, category: 'insulation', weight: 8.5, bulkable: false },
  'BQ_PLASTERBOARD_005': { basePrice: 8.95, category: 'walls_ceilings', weight: 12.0, bulkable: true },
  'BQ_AGGREGATE_006': { basePrice: 3.20, category: 'structural', weight: 1000.0, bulkable: true },
  'BQ_REBAR_007': { basePrice: 0.85, category: 'structural', weight: 0.89, bulkable: true },
  'BQ_CONCRETE_008': { basePrice: 95.00, category: 'structural', weight: 2400.0, bulkable: true },
  'BQ_STEEL_BEAM_009': { basePrice: 4.50, category: 'structural', weight: 7.85, bulkable: false },
  'BQ_ROOFING_TILE_010': { basePrice: 1.85, category: 'roofing', weight: 4.2, bulkable: true }
}

// Regional delivery cost multipliers
const REGIONAL_DELIVERY_COSTS = {
  'London': { baseRate: 25.00, multiplier: 1.5 },
  'South East': { baseRate: 20.00, multiplier: 1.3 },
  'North West': { baseRate: 15.00, multiplier: 1.0 },
  'Scotland': { baseRate: 30.00, multiplier: 1.8 },
  'Wales': { baseRate: 22.00, multiplier: 1.4 },
  'Northern Ireland': { baseRate: 35.00, multiplier: 2.0 },
  'UK Average': { baseRate: 18.00, multiplier: 1.2 }
}

// Customer type discount multipliers
const CUSTOMER_DISCOUNTS = {
  'retail': { maxDiscount: 0.10, minQuantity: 100 },
  'trade': { maxDiscount: 0.18, minQuantity: 50 },
  'business': { maxDiscount: 0.25, minQuantity: 200 }
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const resetTime = Math.floor(now / (60 * 60 * 1000)) * (60 * 60 * 1000)
  
  const current = bulkPricingRateLimit.get(ip)
  if (!current || current.resetTime !== resetTime) {
    bulkPricingRateLimit.set(ip, { count: 1, resetTime })
    return true
  }
  
  if (current.count >= RATE_LIMIT) {
    return false
  }
  
  current.count++
  return true
}

function getCachedPricing(cacheKey: string): any | null {
  const cached = pricingCache.get(cacheKey)
  if (cached && cached.expiry > Date.now()) {
    return cached.data
  }
  return null
}

function setCachedPricing(cacheKey: string, data: any): void {
  pricingCache.set(cacheKey, {
    data,
    expiry: Date.now() + CACHE_DURATION
  })
}

function calculateBulkPricingTiers(
  productId: string,
  quantity: number,
  customerType: 'trade' | 'retail' | 'business',
  postcode: string
): BulkPricingTier[] {
  const product = PRODUCT_BASE_PRICES[productId as keyof typeof PRODUCT_BASE_PRICES]
  if (!product) {
    throw new Error(`Product ${productId} not found`)
  }
  
  const basePrice = product.basePrice
  const regional = getRegionalCostMultiplier(postcode)
  const adjustedBasePrice = basePrice * regional
  
  const customerDiscount = CUSTOMER_DISCOUNTS[customerType]
  const tiers: BulkPricingTier[] = []
  
  if (!product.bulkable) {
    // No bulk pricing for non-bulkable items
    return [{
      minQuantity: 1,
      unitPrice: adjustedBasePrice,
      discount: 0,
      savingsPerUnit: 0,
      totalSavings: 0
    }]
  }
  
  // Tier 1: Small bulk (5% discount)
  const tier1Min = Math.max(customerDiscount.minQuantity, 50)
  if (quantity >= tier1Min) {
    const discount = 0.05
    const unitPrice = adjustedBasePrice * (1 - discount)
    tiers.push({
      minQuantity: tier1Min,
      maxQuantity: tier1Min * 4 - 1,
      unitPrice,
      discount: discount * 100,
      savingsPerUnit: adjustedBasePrice - unitPrice,
      totalSavings: (adjustedBasePrice - unitPrice) * Math.min(quantity, tier1Min * 4 - 1)
    })
  }
  
  // Tier 2: Medium bulk (10-12% discount)
  const tier2Min = tier1Min * 4
  if (quantity >= tier2Min) {
    const discount = customerType === 'business' ? 0.12 : 0.10
    const unitPrice = adjustedBasePrice * (1 - discount)
    tiers.push({
      minQuantity: tier2Min,
      maxQuantity: tier2Min * 5 - 1,
      unitPrice,
      discount: discount * 100,
      savingsPerUnit: adjustedBasePrice - unitPrice,
      totalSavings: (adjustedBasePrice - unitPrice) * Math.min(quantity, tier2Min * 5 - 1)
    })
  }
  
  // Tier 3: Large bulk (15-20% discount)
  const tier3Min = tier2Min * 5
  if (quantity >= tier3Min) {
    const discount = Math.min(customerDiscount.maxDiscount, customerType === 'business' ? 0.20 : 0.15)
    const unitPrice = adjustedBasePrice * (1 - discount)
    tiers.push({
      minQuantity: tier3Min,
      maxQuantity: tier3Min * 10 - 1,
      unitPrice,
      discount: discount * 100,
      savingsPerUnit: adjustedBasePrice - unitPrice,
      totalSavings: (adjustedBasePrice - unitPrice) * Math.min(quantity, tier3Min * 10 - 1)
    })
  }
  
  // Tier 4: Commercial bulk (20-25% discount)
  const tier4Min = tier3Min * 10
  if (quantity >= tier4Min && customerType === 'business') {
    const discount = customerDiscount.maxDiscount
    const unitPrice = adjustedBasePrice * (1 - discount)
    tiers.push({
      minQuantity: tier4Min,
      unitPrice,
      discount: discount * 100,
      savingsPerUnit: adjustedBasePrice - unitPrice,
      totalSavings: (adjustedBasePrice - unitPrice) * quantity
    })
  }
  
  // If no tiers apply, return standard pricing
  if (tiers.length === 0) {
    tiers.push({
      minQuantity: 1,
      unitPrice: adjustedBasePrice,
      discount: 0,
      savingsPerUnit: 0,
      totalSavings: 0
    })
  }
  
  return tiers
}

function calculateDeliveryCosts(
  productIds: string[],
  quantities: number[],
  postcode: string
): { totalWeight: number; deliveryFee: number; freeDeliveryThreshold: number } {
  let totalWeight = 0
  let totalValue = 0
  
  productIds.forEach((productId, index) => {
    const product = PRODUCT_BASE_PRICES[productId as keyof typeof PRODUCT_BASE_PRICES]
    if (product) {
      const quantity = quantities[index] || 0
      totalWeight += product.weight * quantity
      totalValue += product.basePrice * quantity
    }
  })
  
  const regional = getRegionalCostMultiplier(postcode)
  const regionName = regional > 1.3 ? 'London' : 
                    regional > 1.1 ? 'South East' :
                    regional < 0.9 ? 'Scotland' : 'UK Average'
  
  const deliveryConfig = REGIONAL_DELIVERY_COSTS[regionName] || REGIONAL_DELIVERY_COSTS['UK Average']
  
  // Calculate delivery fee based on weight and distance
  let baseFee = deliveryConfig.baseRate
  if (totalWeight > 1000) baseFee += (totalWeight - 1000) * 0.01 // £0.01 per kg over 1000kg
  
  const deliveryFee = baseFee * deliveryConfig.multiplier
  const freeDeliveryThreshold = regionName === 'London' ? 100 : 75
  
  return {
    totalWeight: Math.round(totalWeight * 100) / 100,
    deliveryFee: totalValue >= freeDeliveryThreshold ? 0 : Math.round(deliveryFee * 100) / 100,
    freeDeliveryThreshold
  }
}

async function simulateLatency(): Promise<void> {
  const delay = Math.random() * 150 + 25 // 25-175ms for pricing calculations
  return new Promise(resolve => setTimeout(resolve, delay))
}

export async function POST(request: NextRequest) {
  try {
    await simulateLatency()
    
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json({
        success: false,
        error: 'Rate limit exceeded. Maximum 500 requests per hour for bulk pricing.',
        metadata: {
          timestamp: new Date().toISOString(),
          requestId: `bulk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          rateLimit: {
            remaining: 0,
            resetTime: new Date(Math.ceil(Date.now() / (60 * 60 * 1000)) * (60 * 60 * 1000)).toISOString()
          },
          affiliate: {
            commission: 2.8,
            trackingId: 'BM_UK_2024'
          }
        }
      }, { status: 429 })
    }
    
    const body: BulkPricingRequest = await request.json()
    const { productIds, quantities, postcode = 'E1 1AA', customerType = 'retail' } = body
    
    // Validation
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request: productIds array is required and cannot be empty'
      }, { status: 400 })
    }
    
    if (!quantities || !Array.isArray(quantities) || quantities.length !== productIds.length) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request: quantities array must match productIds length'
      }, { status: 400 })
    }
    
    if (quantities.some(q => q <= 0)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request: all quantities must be greater than 0'
      }, { status: 400 })
    }
    
    // Check cache
    const cacheKey = `${productIds.join(',')}:${quantities.join(',')}:${postcode}:${customerType}`
    const cached = getCachedPricing(cacheKey)
    if (cached) {
      return NextResponse.json({
        success: true,
        data: cached,
        metadata: {
          timestamp: new Date().toISOString(),
          requestId: `bulk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          cached: true,
          rateLimit: {
            remaining: RATE_LIMIT - (bulkPricingRateLimit.get(ip)?.count || 0),
            resetTime: new Date(Math.ceil(Date.now() / (60 * 60 * 1000)) * (60 * 60 * 1000)).toISOString()
          },
          affiliate: {
            commission: 2.8,
            trackingId: 'BM_UK_2024'
          }
        }
      })
    }
    
    // Calculate bulk pricing for each product
    const bulkPricingResults = []
    let totalStandardCost = 0
    let totalBulkCost = 0
    let totalSavings = 0
    
    for (let i = 0; i < productIds.length; i++) {
      const productId = productIds[i]
      const quantity = quantities[i]
      
      const product = PRODUCT_BASE_PRICES[productId as keyof typeof PRODUCT_BASE_PRICES]
      if (!product) {
        return NextResponse.json({
          success: false,
          error: `Product not found: ${productId}`
        }, { status: 404 })
      }
      
      const regional = getRegionalCostMultiplier(postcode)
      const standardUnitPrice = product.basePrice * regional
      const standardTotalPrice = standardUnitPrice * quantity
      
      const bulkTiers = calculateBulkPricingTiers(productId, quantity, customerType, postcode)
      
      // Find the applicable tier for the quantity
      const applicableTier = bulkTiers
        .filter(tier => quantity >= tier.minQuantity && (tier.maxQuantity ? quantity <= tier.maxQuantity : true))
        .sort((a, b) => b.minQuantity - a.minQuantity)[0] || bulkTiers[0]
      
      const bulkUnitPrice = applicableTier.unitPrice
      const bulkTotalPrice = bulkUnitPrice * quantity
      const savings = standardTotalPrice - bulkTotalPrice
      
      // Add VAT calculations
      const standardPriceWithVAT = calculateVAT(standardTotalPrice, 0.20)
      const bulkPriceWithVAT = calculateVAT(bulkTotalPrice, 0.20)
      
      totalStandardCost += standardPriceWithVAT.gross
      totalBulkCost += bulkPriceWithVAT.gross
      totalSavings += savings * 1.20 // VAT inclusive savings
      
      bulkPricingResults.push({
        productId,
        productName: `Product ${productId}`,
        quantity,
        standardPricing: {
          unitPrice: standardUnitPrice,
          totalPrice: standardTotalPrice,
          withVAT: standardPriceWithVAT
        },
        bulkPricing: {
          applicableTier,
          unitPrice: bulkUnitPrice,
          totalPrice: bulkTotalPrice,
          withVAT: bulkPriceWithVAT,
          savings: savings * 1.20,
          savingsPercentage: Math.round((savings / standardTotalPrice) * 10000) / 100
        },
        allTiers: bulkTiers,
        specifications: {
          category: product.category,
          weight: product.weight,
          bulkEligible: product.bulkable
        }
      })
    }
    
    // Calculate delivery costs
    const deliveryInfo = calculateDeliveryCosts(productIds, quantities, postcode)
    
    // Prepare response data
    const responseData = {
      summary: {
        totalProducts: productIds.length,
        totalQuantity: quantities.reduce((sum, q) => sum + q, 0),
        totalWeight: deliveryInfo.totalWeight,
        standardTotal: Math.round(totalStandardCost * 100) / 100,
        bulkTotal: Math.round(totalBulkCost * 100) / 100,
        totalSavings: Math.round(totalSavings * 100) / 100,
        savingsPercentage: Math.round((totalSavings / totalStandardCost) * 10000) / 100,
        deliveryFee: deliveryInfo.deliveryFee,
        freeDeliveryThreshold: deliveryInfo.freeDeliveryThreshold,
        grandTotal: Math.round((totalBulkCost + deliveryInfo.deliveryFee) * 100) / 100
      },
      products: bulkPricingResults,
      delivery: {
        totalWeight: deliveryInfo.totalWeight,
        deliveryFee: deliveryInfo.deliveryFee,
        freeDeliveryThreshold: deliveryInfo.freeDeliveryThreshold,
        estimatedDays: deliveryInfo.totalWeight > 5000 ? 7 : deliveryInfo.totalWeight > 1000 ? 5 : 3,
        options: [
          {
            id: 'standard_bulk',
            name: 'Standard Bulk Delivery',
            price: deliveryInfo.deliveryFee,
            estimatedDays: deliveryInfo.totalWeight > 5000 ? 7 : 5,
            description: `Delivery for ${deliveryInfo.totalWeight}kg of materials`
          },
          {
            id: 'express_bulk',
            name: 'Express Bulk Delivery',
            price: deliveryInfo.deliveryFee * 1.8,
            estimatedDays: Math.max(deliveryInfo.totalWeight > 5000 ? 5 : 3, 2),
            description: 'Expedited delivery service'
          }
        ]
      },
      regional: {
        postcode,
        multiplier: getRegionalCostMultiplier(postcode),
        region: getRegionalCostMultiplier(postcode) > 1.3 ? 'London' : 
                getRegionalCostMultiplier(postcode) > 1.1 ? 'South East' :
                getRegionalCostMultiplier(postcode) < 0.9 ? 'Scotland' : 'UK Average'
      },
      customerType,
      discountEligibility: {
        currentDiscount: CUSTOMER_DISCOUNTS[customerType].maxDiscount * 100,
        upgradeAvailable: customerType === 'retail' ? 'trade' : customerType === 'trade' ? 'business' : null,
        upgradeDiscount: customerType === 'retail' ? 18 : customerType === 'trade' ? 25 : null
      },
      validUntil: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours
      terms: [
        'Bulk pricing valid for quantities shown',
        'Prices include VAT where applicable',
        'Delivery costs calculated by weight and distance',
        'Payment required within 30 days',
        'Subject to stock availability',
        'Prices may vary based on market conditions'
      ]
    }
    
    // Cache the results
    setCachedPricing(cacheKey, responseData)
    
    const response: BQAffiliateResponse = {
      success: true,
      data: responseData,
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: `bulk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        rateLimit: {
          remaining: RATE_LIMIT - (bulkPricingRateLimit.get(ip)?.count || 0),
          resetTime: new Date(Math.ceil(Date.now() / (60 * 60 * 1000)) * (60 * 60 * 1000)).toISOString()
        },
        affiliate: {
          commission: 2.8,
          trackingId: 'BM_UK_2024'
        }
      }
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Bulk pricing API error:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error occurred during bulk pricing calculation',
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: `bulk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        rateLimit: {
          remaining: 0,
          resetTime: new Date().toISOString()
        },
        affiliate: {
          commission: 2.8,
          trackingId: 'BM_UK_2024'
        }
      }
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')
    
    if (!productId) {
      return NextResponse.json({
        success: false,
        error: 'productId parameter is required'
      }, { status: 400 })
    }
    
    const product = PRODUCT_BASE_PRICES[productId as keyof typeof PRODUCT_BASE_PRICES]
    if (!product) {
      return NextResponse.json({
        success: false,
        error: `Product ${productId} not found`
      }, { status: 404 })
    }
    
    // Return bulk pricing information for a single product
    const bulkInfo = {
      productId,
      basePrice: product.basePrice,
      bulkEligible: product.bulkable,
      category: product.category,
      weight: product.weight,
      tierStructure: {
        retail: {
          tier1: { minQuantity: 50, discount: 5 },
          tier2: { minQuantity: 200, discount: 10 },
          tier3: { minQuantity: 1000, discount: 15 }
        },
        trade: {
          tier1: { minQuantity: 50, discount: 8 },
          tier2: { minQuantity: 200, discount: 12 },
          tier3: { minQuantity: 1000, discount: 18 }
        },
        business: {
          tier1: { minQuantity: 200, discount: 12 },
          tier2: { minQuantity: 1000, discount: 20 },
          tier3: { minQuantity: 5000, discount: 25 }
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      data: bulkInfo,
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: `bulk_info_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        affiliate: {
          commission: 2.8,
          trackingId: 'BM_UK_2024'
        }
      }
    })
    
  } catch (error) {
    console.error('Bulk pricing info error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}