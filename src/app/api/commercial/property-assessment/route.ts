import { NextResponse } from 'next/server'
import { 
  CommercialPropertyType, 
  EPCRating,
  BusinessIndustry,
  OperatingHours,
  HeatingSystemType,
  LightingSystemType,
  SmartSystemType
} from '@/types'
import { 
  calculateCommercialEnergyCost, 
  getEnergyRecommendations, 
  ENERGY_BENCHMARKS,
  getRegionalCostMultiplier 
} from '@/lib/uk-utils'

// Property Assessment Request Interface
interface PropertyAssessmentRequest {
  propertyType: CommercialPropertyType
  address: {
    postcode: string
    region: string
  }
  specifications: {
    totalFloorArea: number // m²
    yearBuilt: number
    currentEPCRating?: EPCRating
    operatingHours: OperatingHours
  }
  currentSystems: {
    heating: HeatingSystemType
    lighting: LightingSystemType
    smartSystems: SmartSystemType[]
  }
  businessInfo: {
    industry: BusinessIndustry
    employeeCount: number
    sustainabilityGoals: string[]
  }
  primaryGoals: string[]
  budgetRange: string
  currentEnergyData?: {
    annualEnergyCost?: number
    annualEnergyConsumption?: number
  }
}

// Property Assessment Response Interface
interface PropertyAssessmentResponse {
  success: boolean
  data: {
    assessmentId: string
    propertyAnalysis: {
      energyPerformance: {
        currentAnnualCost: number
        energyIntensity: number // kWh/m²
        epcRating: EPCRating
        carbonFootprint: number // tonnes CO2/year
        performanceVsBenchmark: number // percentage
      }
      efficiency: {
        score: number // 0-100
        category: 'Poor' | 'Below Average' | 'Average' | 'Good' | 'Excellent'
        improvementPotential: number // percentage savings possible
      }
      compliance: {
        meesCompliant: boolean // Minimum Energy Efficiency Standards
        currentRating: EPCRating
        targetRating: EPCRating // Required by 2027
        complianceDeadline: string
      }
    }
    recommendations: {
      priority: 'high' | 'medium' | 'low'
      category: string
      title: string
      description: string
      estimatedSavings: {
        annual: number // £
        percentage: number
      }
      estimatedCost: {
        min: number
        max: number
      }
      paybackPeriod: number // years
      carbonReduction: number // tonnes CO2/year
      implementationTime: number // weeks
    }[]
    nextSteps: string[]
  }
  metadata: {
    assessmentDate: string
    validUntil: string
    region: string
    propertyBenchmark: string
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: PropertyAssessmentRequest = await request.json()
    
    // Validate required fields
    if (!body.propertyType || !body.specifications?.totalFloorArea || !body.address?.postcode) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MISSING_REQUIRED_FIELDS',
          message: 'Property type, floor area, and postcode are required',
          details: { requiredFields: ['propertyType', 'specifications.totalFloorArea', 'address.postcode'] }
        },
        timestamp: new Date().toISOString()
      }, { status: 400 })
    }

    // Generate assessment ID
    const assessmentId = `assess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Calculate current energy performance
    const businessSize = body.specifications.totalFloorArea > 1000 ? 
      (body.specifications.totalFloorArea > 5000 ? 'large_business' : 'medium_business') : 
      'small_business'
    
    const energyCost = calculateCommercialEnergyCost(
      body.propertyType,
      body.specifications.totalFloorArea,
      businessSize
    )
    
    // Use provided energy cost if available, otherwise use calculated
    const currentAnnualCost = body.currentEnergyData?.annualEnergyCost || energyCost.totalAnnualCost
    const currentEPCRating = body.specifications.currentEPCRating || ENERGY_BENCHMARKS[body.propertyType].typical_epc
    
    // Calculate efficiency score based on current systems and age
    let efficiencyScore = 50 // Base score
    
    // Adjust for building age
    const buildingAge = new Date().getFullYear() - body.specifications.yearBuilt
    if (buildingAge < 10) efficiencyScore += 20
    else if (buildingAge > 30) efficiencyScore -= 20
    
    // Adjust for current systems
    if (body.currentSystems.lighting === 'smart_led') efficiencyScore += 15
    else if (body.currentSystems.lighting === 'led_retrofit') efficiencyScore += 10
    else if (body.currentSystems.lighting === 'traditional_fluorescent') efficiencyScore -= 15
    
    if (body.currentSystems.heating === 'heat_pump') efficiencyScore += 15
    else if (body.currentSystems.heating === 'gas_boiler') efficiencyScore += 5
    else if (body.currentSystems.heating === 'electric_heating') efficiencyScore -= 10
    
    if (body.currentSystems.smartSystems.length > 2) efficiencyScore += 10
    else if (body.currentSystems.smartSystems.length === 0) efficiencyScore -= 10
    
    // Clamp score between 0-100
    efficiencyScore = Math.max(0, Math.min(100, efficiencyScore))
    
    const efficiencyCategory = efficiencyScore >= 80 ? 'Excellent' :
                              efficiencyScore >= 65 ? 'Good' :
                              efficiencyScore >= 50 ? 'Average' :
                              efficiencyScore >= 35 ? 'Below Average' : 'Poor'
    
    // Calculate performance vs benchmark
    const benchmarkCost = energyCost.totalAnnualCost
    const performanceVsBenchmark = ((benchmarkCost - currentAnnualCost) / benchmarkCost) * 100
    
    // MEES Compliance check
    const epcRatingOrder = ['G', 'F', 'E', 'D', 'C', 'B', 'A', 'A+']
    const currentRatingIndex = epcRatingOrder.indexOf(currentEPCRating)
    const meesCompliant = currentRatingIndex >= 2 // E or better
    const targetRating: EPCRating = 'C' // Required by 2027
    
    // Generate recommendations based on current performance
    const budgetCategory = body.budgetRange === '10k-50k' ? 'low' :
                          body.budgetRange === '50k-200k' ? 'medium' :
                          body.budgetRange === '200k-1M' ? 'high' : 'unlimited'
    
    const priorities: ('cost_savings' | 'carbon_reduction' | 'compliance' | 'comfort')[] = 
                      body.primaryGoals.includes('Reduce energy costs') ? ['cost_savings'] :
                      body.primaryGoals.includes('Improve sustainability') ? ['carbon_reduction'] :
                      body.primaryGoals.includes('Meet compliance') ? ['compliance'] : 
                      ['cost_savings', 'comfort']
    
    const recommendedUpgrades = getEnergyRecommendations(
      body.propertyType,
      currentEPCRating,
      budgetCategory,
      priorities
    )
    
    // Generate detailed recommendations
    const recommendations = recommendedUpgrades.map((upgrade, index) => {
      let cost = { min: 0, max: 0 }
      let savings = 0
      let carbonReduction = 0
      let payback = 0
      let implementationTime = 8
      let priority: 'high' | 'medium' | 'low' = 'medium'
      
      switch (upgrade) {
        case 'led_lighting':
          cost = { min: body.specifications.totalFloorArea * 12, max: body.specifications.totalFloorArea * 18 }
          savings = currentAnnualCost * 0.16 // 16% average lighting savings
          carbonReduction = energyCost.carbonFootprint * 0.16
          payback = (cost.min + cost.max) / 2 / savings
          implementationTime = 4
          priority = 'high'
          break
        case 'hvac_optimization':
          cost = { min: body.specifications.totalFloorArea * 35, max: body.specifications.totalFloorArea * 55 }
          savings = currentAnnualCost * 0.28 // 28% HVAC savings
          carbonReduction = energyCost.carbonFootprint * 0.28
          payback = (cost.min + cost.max) / 2 / savings
          implementationTime = 6
          priority = 'high'
          break
        case 'smart_controls':
          cost = { min: body.specifications.totalFloorArea * 20, max: body.specifications.totalFloorArea * 30 }
          savings = currentAnnualCost * 0.12 // 12% smart controls savings
          carbonReduction = energyCost.carbonFootprint * 0.12
          payback = (cost.min + cost.max) / 2 / savings
          implementationTime = 3
          priority = 'medium'
          break
        case 'insulation_upgrade':
          cost = { min: body.specifications.totalFloorArea * 25, max: body.specifications.totalFloorArea * 45 }
          savings = currentAnnualCost * 0.15 // 15% insulation savings
          carbonReduction = energyCost.carbonFootprint * 0.15
          payback = (cost.min + cost.max) / 2 / savings
          implementationTime = 12
          priority = 'medium'
          break
        case 'solar_panels':
          const roofArea = body.specifications.totalFloorArea * 0.6
          const systemSize = roofArea * 0.15
          cost = { min: systemSize * 1000, max: systemSize * 1400 }
          savings = systemSize * 950 * 0.285 / 100 // Annual generation * electricity price
          carbonReduction = systemSize * 950 * 0.193 / 1000
          payback = (cost.min + cost.max) / 2 / savings
          implementationTime = 8
          priority = 'low'
          break
        case 'heat_pump':
          cost = { min: body.specifications.totalFloorArea * 80, max: body.specifications.totalFloorArea * 120 }
          savings = currentAnnualCost * 0.35 // 35% heating savings
          carbonReduction = energyCost.carbonFootprint * 0.45 // Higher carbon reduction
          payback = (cost.min + cost.max) / 2 / savings
          implementationTime = 10
          priority = 'low'
          break
      }
      
      return {
        priority,
        category: upgrade.replace('_', ' ').toUpperCase(),
        title: getUpgradeTitle(upgrade),
        description: getUpgradeDescription(upgrade, body.propertyType),
        estimatedSavings: {
          annual: Math.round(savings),
          percentage: Math.round((savings / currentAnnualCost) * 1000) / 10
        },
        estimatedCost: cost,
        paybackPeriod: Math.round(payback * 10) / 10,
        carbonReduction: Math.round(carbonReduction * 100) / 100,
        implementationTime
      }
    }).sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
    
    // Calculate total potential savings
    const totalPotentialSavings = recommendations.reduce((sum, rec) => sum + rec.estimatedSavings.annual, 0)
    const improvementPotential = Math.round((totalPotentialSavings / currentAnnualCost) * 100)
    
    // Generate next steps
    const nextSteps = [
      'Schedule a detailed energy audit with certified assessor',
      'Obtain quotes from recommended specialist contractors',
      'Apply for available grants and financing options',
      'Plan implementation timeline to minimize business disruption',
      'Set up energy monitoring to track improvements'
    ]
    
    const regionalMultiplier = getRegionalCostMultiplier(body.address.postcode)
    const regionName = regionalMultiplier > 1.2 ? 'London/South East' :
                      regionalMultiplier < 0.9 ? 'North England/Scotland' : 'UK Average'
    
    const response: PropertyAssessmentResponse = {
      success: true,
      data: {
        assessmentId,
        propertyAnalysis: {
          energyPerformance: {
            currentAnnualCost: Math.round(currentAnnualCost),
            energyIntensity: Math.round((energyCost.annualElectricity + energyCost.annualGas) / body.specifications.totalFloorArea),
            epcRating: currentEPCRating,
            carbonFootprint: energyCost.carbonFootprint,
            performanceVsBenchmark: Math.round(performanceVsBenchmark)
          },
          efficiency: {
            score: efficiencyScore,
            category: efficiencyCategory,
            improvementPotential: Math.min(improvementPotential, 60) // Cap at 60% for realism
          },
          compliance: {
            meesCompliant,
            currentRating: currentEPCRating,
            targetRating,
            complianceDeadline: '2027-04-01'
          }
        },
        recommendations: recommendations.slice(0, 5), // Top 5 recommendations
        nextSteps
      },
      metadata: {
        assessmentDate: new Date().toISOString(),
        validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days
        region: regionName,
        propertyBenchmark: `${body.propertyType} - ${body.specifications.totalFloorArea}m²`
      }
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Error in property assessment:', error)
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred while processing the property assessment',
        details: process.env.NODE_ENV === 'development' ? { error: String(error) } : undefined
      },
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

// Helper functions for upgrade descriptions
function getUpgradeTitle(upgrade: string): string {
  const titles: Record<string, string> = {
    led_lighting: 'LED Lighting Retrofit',
    hvac_optimization: 'HVAC System Optimization',
    smart_controls: 'Smart Building Controls',
    insulation_upgrade: 'Insulation Enhancement',
    solar_panels: 'Solar Panel Installation',
    heat_pump: 'Heat Pump Upgrade'
  }
  return titles[upgrade] || upgrade
}

function getUpgradeDescription(upgrade: string, propertyType: CommercialPropertyType): string {
  const descriptions: Record<string, string> = {
    led_lighting: `Replace existing lighting with energy-efficient LED systems. Ideal for ${propertyType} properties with high operating hours. Includes smart sensors and daylight dimming.`,
    hvac_optimization: `Optimize heating, ventilation, and air conditioning systems for maximum efficiency. Critical for ${propertyType} buildings to maintain comfort while reducing energy costs.`,
    smart_controls: `Install intelligent building management system to automatically optimize energy usage. Perfect for ${propertyType} operations requiring precise environmental control.`,
    insulation_upgrade: `Enhance building envelope insulation to reduce heating and cooling loads. Particularly beneficial for older ${propertyType} buildings built before 2006.`,
    solar_panels: `Install rooftop solar photovoltaic system to generate renewable electricity on-site. Excellent for ${propertyType} buildings with suitable roof space and high daytime energy use.`,
    heat_pump: `Replace gas boiler with high-efficiency heat pump system. Ideal for ${propertyType} buildings committed to carbon reduction and future-proofing against gas price volatility.`
  }
  return descriptions[upgrade] || `Energy efficiency improvement for ${propertyType} properties.`
}