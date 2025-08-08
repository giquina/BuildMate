import { NextResponse } from 'next/server'
import { CommercialPropertyType, EPCRating } from '@/types'
import { 
  calculateEnergyUpgradeROI, 
  calculatePropertyValueImpact,
  EFFICIENCY_IMPROVEMENTS,
  getRegionalCostMultiplier,
  calculateCommercialEnergyCost,
  ENERGY_BENCHMARKS
} from '@/lib/uk-utils'

// ROI Calculation Request Interface
interface ROICalculationRequest {
  propertyType: CommercialPropertyType
  specifications: {
    totalFloorArea: number // m²
    yearBuilt: number
    currentEPCRating: EPCRating
    estimatedPropertyValue: number // £
  }
  currentEnergyData: {
    annualEnergyCost: number // £
    annualEnergyConsumption: number // kWh
  }
  proposedUpgrades: {
    upgrades: (keyof typeof EFFICIENCY_IMPROVEMENTS)[]
    customCosts?: {
      [key: string]: {
        min: number
        max: number
      }
    }
  }
  location: {
    postcode: string
    region: string
  }
  businessContext: {
    budgetRange: string
    financingOptions: string[]
    priorities: string[]
    targetPayback: number // years
  }
  assumptions?: {
    energyPriceInflation?: number // % per year
    discountRate?: number // %
    analysisHorizon?: number // years
  }
}

// ROI Calculation Response Interface
interface ROICalculationResponse {
  success: boolean
  data: {
    calculationId: string
    summary: {
      totalInvestment: number
      totalAnnualSavings: number
      simplePayback: number // years
      netPresentValue: number
      internalRateOfReturn: number // %
      profitabilityIndex: number
      carbonSavings: number // tonnes CO2/year
    }
    energyProjections: {
      baseline: {
        annualCost: number
        annualConsumption: number // kWh
        carbonFootprint: number // tonnes CO2
      }
      optimized: {
        annualCost: number
        annualConsumption: number
        carbonFootprint: number
      }
      savings: {
        annualCostSaving: number
        percentageSaving: number
        energySaving: number // kWh
        carbonReduction: number // tonnes CO2
      }
    }
    propertyValue: {
      currentValue: number
      projectedValueIncrease: number
      percentageIncrease: number
      improvedValue: number
      additionalEquity: number
    }
    cashFlow: {
      year: number
      investment: number
      energySavings: number
      maintenanceCosts: number
      netCashFlow: number
      cumulativeCashFlow: number
    }[]
    upgradeBreakdown: {
      upgrade: string
      cost: {
        min: number
        max: number
        estimated: number
      }
      annualSavings: number
      paybackPeriod: number
      carbonImpact: number
      implementationPriority: 'high' | 'medium' | 'low'
    }[]
    incentives: {
      grants: {
        name: string
        maxAmount: number
        eligibility: string
        applicationDeadline: string
      }[]
      taxIncentives: {
        name: string
        benefit: number
        description: string
      }[]
      financing: {
        lender: string
        interestRate: number
        maxTerm: number
        specialFeatures: string[]
      }[]
    }
    riskAnalysis: {
      factors: {
        type: string
        impact: 'low' | 'medium' | 'high'
        description: string
        mitigation: string
      }[]
      sensitivity: {
        energyPriceChange: {
          percent: number
          npvImpact: number
          paybackImpact: number
        }[]
      }
    }
  }
  metadata: {
    calculationDate: string
    validUntil: string
    region: string
    assumptions: {
      energyPriceInflation: number
      discountRate: number
      analysisHorizon: number
      maintenanceCostFactor: number
    }
    disclaimer: string
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: ROICalculationRequest = await request.json()
    
    // Validate required fields
    if (!body.propertyType || !body.specifications?.totalFloorArea || 
        !body.currentEnergyData?.annualEnergyCost || !body.proposedUpgrades?.upgrades?.length) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MISSING_REQUIRED_FIELDS',
          message: 'Property type, floor area, current energy cost, and proposed upgrades are required',
          details: { 
            requiredFields: [
              'propertyType', 
              'specifications.totalFloorArea', 
              'currentEnergyData.annualEnergyCost',
              'proposedUpgrades.upgrades'
            ] 
          }
        },
        timestamp: new Date().toISOString()
      }, { status: 400 })
    }

    // Generate calculation ID
    const calculationId = `roi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Set default assumptions
    const assumptions = {
      energyPriceInflation: body.assumptions?.energyPriceInflation ?? 3.5, // 3.5% annual increase
      discountRate: body.assumptions?.discountRate ?? 8.0, // 8% discount rate for commercial
      analysisHorizon: body.assumptions?.analysisHorizon ?? 25, // 25 year analysis
      maintenanceCostFactor: 0.015 // 1.5% of investment per year
    }
    
    // Get regional cost multiplier
    const regionalMultiplier = getRegionalCostMultiplier(body.location.postcode)
    const regionName = regionalMultiplier > 1.2 ? 'London/South East' :
                      regionalMultiplier < 0.9 ? 'North England/Scotland' : 'UK Average'
    
    // Calculate baseline energy performance
    const businessSize = body.specifications.totalFloorArea > 1000 ? 
      (body.specifications.totalFloorArea > 5000 ? 'large_business' : 'medium_business') : 
      'small_business'
    
    const baselineEnergy = calculateCommercialEnergyCost(
      body.propertyType,
      body.specifications.totalFloorArea,
      businessSize
    )
    
    // Use actual energy cost if provided, otherwise use calculated benchmark
    const currentAnnualCost = body.currentEnergyData.annualEnergyCost
    const currentConsumption = body.currentEnergyData.annualEnergyConsumption || 
                              (baselineEnergy.annualElectricity + baselineEnergy.annualGas)
    
    // Calculate ROI for proposed upgrades
    const roiAnalysis = calculateEnergyUpgradeROI(
      currentAnnualCost,
      body.specifications.totalFloorArea,
      body.proposedUpgrades.upgrades,
      body.location.postcode
    )
    
    // Calculate property value impact
    const currentPropertyValue = body.specifications.estimatedPropertyValue
    const epcRatingOrder = ['G', 'F', 'E', 'D', 'C', 'B', 'A', 'A+']
    const currentRatingIndex = epcRatingOrder.indexOf(body.specifications.currentEPCRating)
    const projectedRatingIndex = Math.min(currentRatingIndex + 2, 7) // Assume 2 level improvement
    const epcImprovement = projectedRatingIndex - currentRatingIndex
    
    const propertyValueImpact = calculatePropertyValueImpact(
      currentPropertyValue,
      epcImprovement,
      body.proposedUpgrades.upgrades
    )
    
    // Calculate optimized energy consumption and cost
    const totalSavingsPercent = roiAnalysis.annualSavings / currentAnnualCost
    const optimizedAnnualCost = currentAnnualCost - roiAnalysis.annualSavings
    const optimizedConsumption = currentConsumption * (1 - totalSavingsPercent)
    const optimizedCarbon = baselineEnergy.carbonFootprint * (1 - totalSavingsPercent)
    
    // Generate 25-year cash flow projection
    const cashFlow = []
    let cumulativeCashFlow = -roiAnalysis.totalInvestment
    
    for (let year = 0; year <= assumptions.analysisHorizon; year++) {
      let investment = year === 0 ? roiAnalysis.totalInvestment : 0
      let energySavings = year === 0 ? 0 : roiAnalysis.annualSavings * Math.pow(1 + assumptions.energyPriceInflation / 100, year - 1)
      let maintenanceCosts = year === 0 ? 0 : roiAnalysis.totalInvestment * assumptions.maintenanceCostFactor
      let netCashFlow = energySavings - maintenanceCosts - investment
      cumulativeCashFlow += netCashFlow
      
      if (year <= 10) { // Show first 10 years for UI display
        cashFlow.push({
          year,
          investment: Math.round(investment),
          energySavings: Math.round(energySavings),
          maintenanceCosts: Math.round(maintenanceCosts),
          netCashFlow: Math.round(netCashFlow),
          cumulativeCashFlow: Math.round(cumulativeCashFlow)
        })
      }
    }
    
    // Enhanced NPV calculation with proper discounting
    let npv = -roiAnalysis.totalInvestment
    for (let year = 1; year <= assumptions.analysisHorizon; year++) {
      const energySavings = roiAnalysis.annualSavings * Math.pow(1 + assumptions.energyPriceInflation / 100, year - 1)
      const maintenanceCosts = roiAnalysis.totalInvestment * assumptions.maintenanceCostFactor
      const netCashFlow = energySavings - maintenanceCosts
      npv += netCashFlow / Math.pow(1 + assumptions.discountRate / 100, year)
    }
    
    // Calculate Profitability Index
    const profitabilityIndex = npv / roiAnalysis.totalInvestment + 1
    
    // Break down upgrades with individual analysis
    const upgradeBreakdown = body.proposedUpgrades.upgrades.map(upgrade => {
      const config = EFFICIENCY_IMPROVEMENTS[upgrade]
      let cost = { min: 0, max: 0, estimated: 0 }
      let annualSavings = 0
      let carbonImpact = 0
      let priority: 'high' | 'medium' | 'low' = 'medium'
      
      // Custom costs if provided
      if (body.proposedUpgrades.customCosts?.[upgrade]) {
        cost.min = body.proposedUpgrades.customCosts[upgrade].min
        cost.max = body.proposedUpgrades.customCosts[upgrade].max
      }
      
      switch (upgrade) {
        case 'led_lighting':
          if (!cost.min) {
            cost.min = body.specifications.totalFloorArea * 12 * regionalMultiplier
            cost.max = body.specifications.totalFloorArea * 18 * regionalMultiplier
          }
          annualSavings = currentAnnualCost * 0.16
          carbonImpact = baselineEnergy.carbonFootprint * 0.16
          priority = 'high'
          break
        case 'hvac_optimization':
          if (!cost.min) {
            cost.min = body.specifications.totalFloorArea * 35 * regionalMultiplier
            cost.max = body.specifications.totalFloorArea * 55 * regionalMultiplier
          }
          annualSavings = currentAnnualCost * 0.28
          carbonImpact = baselineEnergy.carbonFootprint * 0.28
          priority = 'high'
          break
        case 'smart_controls':
          if (!cost.min) {
            cost.min = body.specifications.totalFloorArea * 20 * regionalMultiplier
            cost.max = body.specifications.totalFloorArea * 30 * regionalMultiplier
          }
          annualSavings = currentAnnualCost * 0.12
          carbonImpact = baselineEnergy.carbonFootprint * 0.12
          priority = 'medium'
          break
        case 'insulation_upgrade':
          if (!cost.min) {
            cost.min = body.specifications.totalFloorArea * 25 * regionalMultiplier
            cost.max = body.specifications.totalFloorArea * 45 * regionalMultiplier
          }
          annualSavings = currentAnnualCost * 0.15
          carbonImpact = baselineEnergy.carbonFootprint * 0.15
          priority = 'medium'
          break
        case 'solar_panels':
          const roofArea = body.specifications.totalFloorArea * 0.6
          const systemSize = roofArea * 0.15
          if (!cost.min) {
            cost.min = systemSize * 1000 * regionalMultiplier
            cost.max = systemSize * 1400 * regionalMultiplier
          }
          annualSavings = systemSize * 950 * 0.285 / 100
          carbonImpact = systemSize * 950 * 0.193 / 1000
          priority = 'low'
          break
        case 'heat_pump':
          if (!cost.min) {
            cost.min = body.specifications.totalFloorArea * 80 * regionalMultiplier
            cost.max = body.specifications.totalFloorArea * 120 * regionalMultiplier
          }
          annualSavings = currentAnnualCost * 0.35
          carbonImpact = baselineEnergy.carbonFootprint * 0.45
          priority = 'low'
          break
      }
      
      cost.estimated = (cost.min + cost.max) / 2
      const paybackPeriod = cost.estimated / annualSavings
      
      return {
        upgrade: upgrade.replace('_', ' ').toUpperCase(),
        cost,
        annualSavings: Math.round(annualSavings),
        paybackPeriod: Math.round(paybackPeriod * 10) / 10,
        carbonImpact: Math.round(carbonImpact * 100) / 100,
        implementationPriority: priority
      }
    })
    
    // UK Commercial Grant and Incentive Information
    const incentives = {
      grants: [
        {
          name: 'Enhanced Capital Allowances (ECAs)',
          maxAmount: Math.round(roiAnalysis.totalInvestment * 0.19), // 19% corporation tax relief
          eligibility: 'Energy-efficient equipment on ETL list',
          applicationDeadline: 'Ongoing - claim with Corporation Tax'
        },
        {
          name: 'Green Business Investment Scheme',
          maxAmount: Math.min(50000, Math.round(roiAnalysis.totalInvestment * 0.4)),
          eligibility: 'SMEs investing in energy efficiency',
          applicationDeadline: '2025-03-31'
        },
        {
          name: 'Net Zero Support Fund',
          maxAmount: Math.min(25000, Math.round(roiAnalysis.totalInvestment * 0.5)),
          eligibility: 'Businesses committing to net zero by 2030',
          applicationDeadline: '2025-06-30'
        }
      ],
      taxIncentives: [
        {
          name: 'Super Deduction (if applicable)',
          benefit: Math.round(roiAnalysis.totalInvestment * 0.31), // 130% deduction at 25% corp tax
          description: 'Enhanced capital allowance for qualifying plant and machinery'
        },
        {
          name: 'Annual Investment Allowance',
          benefit: Math.min(1000000, roiAnalysis.totalInvestment) * 0.25,
          description: '100% first year allowance up to £1M annual limit'
        }
      ],
      financing: [
        {
          lender: 'UK Green Finance Institute',
          interestRate: 4.2,
          maxTerm: 15,
          specialFeatures: ['Green loan certification', 'Flexible repayment terms', 'No early repayment penalties']
        },
        {
          lender: 'Commercial Energy Finance',
          interestRate: 5.8,
          maxTerm: 12,
          specialFeatures: ['Asset-backed financing', 'Performance guarantees', 'Maintenance packages']
        }
      ]
    }
    
    // Risk Analysis
    const riskAnalysis = {
      factors: [
        {
          type: 'Energy Price Volatility',
          impact: 'medium' as const,
          description: 'Energy prices may fluctuate affecting savings projections',
          mitigation: 'Fixed price contracts and hedging strategies available'
        },
        {
          type: 'Technology Performance',
          impact: 'low' as const,
          description: 'Equipment may not perform exactly to specifications',
          mitigation: 'Choose proven technologies with performance warranties'
        },
        {
          type: 'Regulatory Changes',
          impact: 'low' as const,
          description: 'Changes to building regulations or incentives',
          mitigation: 'Monitor policy developments and plan phased implementation'
        },
        {
          type: 'Business Operations Changes',
          impact: 'medium' as const,
          description: 'Changes in business operations affecting energy use patterns',
          mitigation: 'Choose flexible systems that adapt to changing needs'
        }
      ],
      sensitivity: {
        energyPriceChange: [
          { percent: -20, npvImpact: Math.round(npv * 0.15), paybackImpact: 1.2 },
          { percent: -10, npvImpact: Math.round(npv * 0.08), paybackImpact: 0.6 },
          { percent: 0, npvImpact: 0, paybackImpact: 0 },
          { percent: 10, npvImpact: Math.round(npv * -0.08), paybackImpact: -0.5 },
          { percent: 20, npvImpact: Math.round(npv * -0.15), paybackImpact: -1.0 }
        ]
      }
    }
    
    const response: ROICalculationResponse = {
      success: true,
      data: {
        calculationId,
        summary: {
          totalInvestment: roiAnalysis.totalInvestment,
          totalAnnualSavings: roiAnalysis.annualSavings,
          simplePayback: roiAnalysis.simplePayback,
          netPresentValue: Math.round(npv),
          internalRateOfReturn: roiAnalysis.internalRateOfReturn,
          profitabilityIndex: Math.round(profitabilityIndex * 100) / 100,
          carbonSavings: roiAnalysis.carbonSavings
        },
        energyProjections: {
          baseline: {
            annualCost: Math.round(currentAnnualCost),
            annualConsumption: Math.round(currentConsumption),
            carbonFootprint: baselineEnergy.carbonFootprint
          },
          optimized: {
            annualCost: Math.round(optimizedAnnualCost),
            annualConsumption: Math.round(optimizedConsumption),
            carbonFootprint: Math.round(optimizedCarbon * 100) / 100
          },
          savings: {
            annualCostSaving: roiAnalysis.annualSavings,
            percentageSaving: Math.round((roiAnalysis.annualSavings / currentAnnualCost) * 1000) / 10,
            energySaving: Math.round(currentConsumption - optimizedConsumption),
            carbonReduction: roiAnalysis.carbonSavings
          }
        },
        propertyValue: {
          currentValue: currentPropertyValue,
          projectedValueIncrease: propertyValueImpact.valueIncrease,
          percentageIncrease: propertyValueImpact.percentageIncrease,
          improvedValue: propertyValueImpact.improvedValue,
          additionalEquity: propertyValueImpact.valueIncrease
        },
        cashFlow: cashFlow.slice(0, 11), // Show years 0-10
        upgradeBreakdown,
        incentives,
        riskAnalysis
      },
      metadata: {
        calculationDate: new Date().toISOString(),
        validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days
        region: regionName,
        assumptions,
        disclaimer: 'This analysis is based on typical performance data and current energy prices. Actual results may vary depending on specific circumstances, usage patterns, and market conditions. Professional assessment recommended before implementation.'
      }
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Error in ROI calculation:', error)
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred while calculating ROI projections',
        details: process.env.NODE_ENV === 'development' ? { error: String(error) } : undefined
      },
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}