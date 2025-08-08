import { NextResponse } from 'next/server'
import { CommercialPropertyType, BusinessIndustry, EPCRating } from '@/types'
import { getEnergyRecommendations, ENERGY_BENCHMARKS, getRegionalCostMultiplier } from '@/lib/uk-utils'

// Commercial Solutions Request Interface
interface CommercialSolutionsRequest {
  propertyType: CommercialPropertyType
  businessInfo: {
    industry: BusinessIndustry
    employeeCount: number
    currentChallenges: string[]
  }
  propertyDetails: {
    floorArea: number // m²
    yearBuilt: number
    currentEPCRating: EPCRating
    location: {
      postcode: string
      region: string
    }
  }
  goals: {
    primaryObjectives: string[]
    budgetRange: string
    targetTimeframe: string
    complianceRequirements: string[]
  }
  currentSystems?: {
    lighting: string
    heating: string
    smartSystems: string[]
    energyMonitoring: boolean
  }
}

// Commercial Solutions Response Interface
interface CommercialSolutionsResponse {
  success: boolean
  data: {
    solutionId: string
    propertyProfile: {
      type: CommercialPropertyType
      sizeCategory: 'Small' | 'Medium' | 'Large' | 'Enterprise'
      industryFocus: BusinessIndustry
      efficiencyPotential: 'Low' | 'Medium' | 'High' | 'Very High'
    }
    solutionCategories: {
      energyEfficiency: {
        priority: number
        solutions: Solution[]
        potentialSavings: {
          annual: number
          percentage: number
        }
        implementationComplexity: 'Simple' | 'Moderate' | 'Complex'
      }
      smartBuilding: {
        priority: number
        solutions: Solution[]
        potentialSavings: {
          annual: number
          percentage: number
        }
        implementationComplexity: 'Simple' | 'Moderate' | 'Complex'
      }
      compliance: {
        priority: number
        solutions: Solution[]
        urgency: 'Low' | 'Medium' | 'High' | 'Critical'
        complianceDeadlines: string[]
      }
      productivity: {
        priority: number
        solutions: Solution[]
        expectedImprovements: {
          employeeSatisfaction: number // % improvement
          operationalEfficiency: number // % improvement
          spaceUtilization: number // % improvement
        }
        implementationComplexity: 'Simple' | 'Moderate' | 'Complex'
      }
      sustainability: {
        priority: number
        solutions: Solution[]
        carbonImpact: {
          currentFootprint: number // tonnes CO2/year
          projectedReduction: number // tonnes CO2/year
          percentageReduction: number
        }
        implementationComplexity: 'Simple' | 'Moderate' | 'Complex'
      }
    }
    implementationRoadmap: {
      phase: number
      title: string
      duration: string
      solutions: string[]
      estimatedCost: {
        min: number
        max: number
      }
      expectedROI: number // % annual return
      prerequisites: string[]
    }[]
    nextSteps: {
      immediate: string[]
      shortTerm: string[] // 1-6 months
      mediumTerm: string[] // 6-18 months
      longTerm: string[] // 18+ months
    }
  }
  metadata: {
    generatedAt: string
    validUntil: string
    customizedFor: {
      propertyType: string
      industry: string
      region: string
    }
    marketContext: {
      energyPrices: {
        trend: 'Increasing' | 'Stable' | 'Decreasing'
        projection: string
      }
      regulations: {
        upcoming: string[]
        deadlines: string[]
      }
      incentives: {
        available: string[]
        expiringSoon: string[]
      }
    }
  }
}

interface Solution {
  id: string
  title: string
  description: string
  category: string
  benefits: string[]
  implementation: {
    duration: string
    complexity: 'Low' | 'Medium' | 'High'
    disruption: 'Minimal' | 'Moderate' | 'Significant'
    prerequisites: string[]
  }
  costEstimate: {
    range: {
      min: number
      max: number
    }
    paybackPeriod: {
      min: number // years
      max: number
    }
    ongoingCosts: number // £/year
  }
  performance: {
    energySavings: number // % reduction
    carbonReduction: number // tonnes CO2/year
    operationalImpact: string
    maintenanceReduction?: number // %
  }
  compatibility: {
    propertyTypes: CommercialPropertyType[]
    industries: BusinessIndustry[]
    minimumSize: number // m²
    idealConditions: string[]
  }
  certifications: string[]
  warranty: {
    equipment: string
    performance: string
  }
  caseStudy?: {
    clientType: string
    results: string
    testimonial: string
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: CommercialSolutionsRequest = await request.json()
    
    // Validate required fields
    if (!body.propertyType || !body.propertyDetails?.floorArea || 
        !body.goals?.primaryObjectives?.length) {
      return NextResponse.json({
        success: false,
        error: {
          code: 'MISSING_REQUIRED_FIELDS',
          message: 'Property type, floor area, and primary objectives are required',
          details: { 
            requiredFields: [
              'propertyType', 
              'propertyDetails.floorArea', 
              'goals.primaryObjectives'
            ] 
          }
        },
        timestamp: new Date().toISOString()
      }, { status: 400 })
    }

    // Generate solution ID
    const solutionId = `sol_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Determine property size category
    const floorArea = body.propertyDetails.floorArea
    const sizeCategory = floorArea < 500 ? 'Small' :
                        floorArea < 2000 ? 'Medium' :
                        floorArea < 10000 ? 'Large' : 'Enterprise'
    
    // Calculate efficiency potential based on building age and current systems
    const buildingAge = new Date().getFullYear() - body.propertyDetails.yearBuilt
    const currentEPC = body.propertyDetails.currentEPCRating
    
    let efficiencyScore = 0
    if (buildingAge > 20) efficiencyScore += 30
    else if (buildingAge > 10) efficiencyScore += 15
    
    if (['F', 'G'].includes(currentEPC)) efficiencyScore += 40
    else if (['D', 'E'].includes(currentEPC)) efficiencyScore += 25
    else if (currentEPC === 'C') efficiencyScore += 10
    
    if (!body.currentSystems?.energyMonitoring) efficiencyScore += 15
    if (body.currentSystems?.lighting === 'traditional_fluorescent') efficiencyScore += 20
    
    const efficiencyPotential = efficiencyScore > 60 ? 'Very High' :
                               efficiencyScore > 40 ? 'High' :
                               efficiencyScore > 20 ? 'Medium' : 'Low'
    
    // Get regional multiplier for cost calculations
    const regionalMultiplier = getRegionalCostMultiplier(body.propertyDetails.location.postcode)
    
    // Generate Energy Efficiency Solutions
    const energyEfficiencySolutions: Solution[] = []
    
    // LED Lighting Solution
    if (!body.currentSystems?.lighting?.includes('led') || body.currentSystems?.lighting === 'traditional_fluorescent') {
      energyEfficiencySolutions.push({
        id: 'led_retrofit',
        title: 'LED Lighting Retrofit with Smart Controls',
        description: `Complete LED lighting upgrade for ${body.propertyType} with intelligent controls, daylight sensors, and occupancy detection. Typically achieves 60-80% lighting energy reduction.`,
        category: 'Lighting Efficiency',
        benefits: [
          '65% average energy reduction for lighting',
          '15-year LED lifespan vs 2-year fluorescent',
          'Improved light quality and employee comfort',
          'Reduced maintenance costs',
          'Instant controllability and dimming'
        ],
        implementation: {
          duration: '2-4 weeks',
          complexity: 'Low',
          disruption: 'Minimal',
          prerequisites: ['Electrical survey', 'Lighting audit', 'Staff coordination']
        },
        costEstimate: {
          range: {
            min: Math.round(floorArea * 12 * regionalMultiplier),
            max: Math.round(floorArea * 25 * regionalMultiplier)
          },
          paybackPeriod: { min: 1.8, max: 3.2 },
          ongoingCosts: Math.round(floorArea * 0.5) // Maintenance
        },
        performance: {
          energySavings: 16, // % of total energy
          carbonReduction: Math.round(floorArea * 0.08), // Approx carbon savings
          operationalImpact: 'Improved employee productivity and comfort',
          maintenanceReduction: 80
        },
        compatibility: {
          propertyTypes: ['office_building', 'retail_space', 'warehouse', 'manufacturing', 'education'],
          industries: ['technology', 'finance', 'retail', 'manufacturing', 'education'],
          minimumSize: 100,
          idealConditions: ['High operating hours', 'Old fluorescent systems', 'Manual controls']
        },
        certifications: ['Energy Technology List (ETL)', 'BREEAM Credits', 'LEED Points'],
        warranty: {
          equipment: '5-7 years manufacturer warranty',
          performance: '25-year performance guarantee'
        },
        caseStudy: {
          clientType: `${body.propertyType} in ${body.businessInfo.industry}`,
          results: '68% lighting energy reduction, £8,400 annual savings',
          testimonial: 'The LED retrofit exceeded expectations. Staff love the improved lighting quality and we\'re saving thousands annually.'
        }
      })
    }
    
    // HVAC Optimization Solution
    if (['office_building', 'retail_space', 'hospitality', 'healthcare'].includes(body.propertyType)) {
      energyEfficiencySolutions.push({
        id: 'hvac_optimization',
        title: 'HVAC System Optimization & Controls Upgrade',
        description: `Advanced HVAC controls, variable speed drives, and system optimization for ${body.propertyType}. Includes zone control, demand-based ventilation, and predictive maintenance.`,
        category: 'HVAC Efficiency',
        benefits: [
          '25-35% heating and cooling energy reduction',
          'Improved indoor air quality and comfort',
          'Predictive maintenance reduces breakdowns',
          'Zone-based control for occupied areas only',
          'Integration with building management system'
        ],
        implementation: {
          duration: '4-8 weeks',
          complexity: 'Medium',
          disruption: 'Moderate',
          prerequisites: ['HVAC system audit', 'Controls compatibility check', 'Staff training plan']
        },
        costEstimate: {
          range: {
            min: Math.round(floorArea * 35 * regionalMultiplier),
            max: Math.round(floorArea * 65 * regionalMultiplier)
          },
          paybackPeriod: { min: 2.5, max: 4.8 },
          ongoingCosts: Math.round(floorArea * 1.2)
        },
        performance: {
          energySavings: 28,
          carbonReduction: Math.round(floorArea * 0.15),
          operationalImpact: 'Enhanced comfort control and system reliability',
          maintenanceReduction: 30
        },
        compatibility: {
          propertyTypes: ['office_building', 'retail_space', 'hospitality', 'healthcare', 'education'],
          industries: ['technology', 'finance', 'healthcare', 'hospitality', 'education'],
          minimumSize: 500,
          idealConditions: ['Existing HVAC system', 'Variable occupancy', 'Manual controls']
        },
        certifications: ['BSRIA approved', 'CIBSE compliance', 'BREEAM/LEED credits'],
        warranty: {
          equipment: '3-5 years system warranty',
          performance: '2-year energy savings guarantee'
        }
      })
    }
    
    // Smart Building Solutions
    const smartBuildingSolutions: Solution[] = []
    
    if (!body.currentSystems?.energyMonitoring) {
      smartBuildingSolutions.push({
        id: 'energy_monitoring',
        title: 'Smart Energy Monitoring & Analytics Platform',
        description: 'Real-time energy monitoring system with AI-powered analytics, anomaly detection, and automated optimization recommendations.',
        category: 'Energy Management',
        benefits: [
          'Real-time energy usage visibility',
          'Automatic anomaly detection and alerts',
          'Benchmark performance against industry standards',
          'Identify energy waste and optimization opportunities',
          'Regulatory compliance reporting automation'
        ],
        implementation: {
          duration: '3-6 weeks',
          complexity: 'Medium',
          disruption: 'Minimal',
          prerequisites: ['Meter installation', 'Network connectivity', 'Staff training']
        },
        costEstimate: {
          range: {
            min: Math.round(15000 + (floorArea * 2) * regionalMultiplier),
            max: Math.round(35000 + (floorArea * 5) * regionalMultiplier)
          },
          paybackPeriod: { min: 1.2, max: 2.8 },
          ongoingCosts: Math.round(floorArea * 0.8)
        },
        performance: {
          energySavings: 8, // Through optimization insights
          carbonReduction: Math.round(floorArea * 0.04),
          operationalImpact: 'Data-driven energy management and cost control'
        },
        compatibility: {
          propertyTypes: ['office_building', 'retail_space', 'warehouse', 'manufacturing', 'hospitality', 'healthcare'],
          industries: ['technology', 'finance', 'retail', 'manufacturing', 'hospitality', 'healthcare'],
          minimumSize: 200,
          idealConditions: ['Multiple meters', 'Network infrastructure', 'Management commitment']
        },
        certifications: ['ISO 50001 support', 'BREEAM/LEED credits'],
        warranty: {
          equipment: '3-year hardware warranty',
          performance: 'SLA-backed service availability'
        }
      })
    }
    
    // Compliance Solutions
    const complianceSolutions: Solution[] = []
    const epcRatingOrder = ['G', 'F', 'E', 'D', 'C', 'B', 'A', 'A+']
    const currentRatingIndex = epcRatingOrder.indexOf(currentEPC)
    const meesCompliant = currentRatingIndex >= 2 // E or better
    
    if (!meesCompliant) {
      complianceSolutions.push({
        id: 'mees_compliance',
        title: 'MEES Compliance Upgrade Package',
        description: 'Comprehensive efficiency improvements to achieve minimum EPC rating E for commercial lettings compliance by April 2023, with pathway to C rating by 2027.',
        category: 'Regulatory Compliance',
        benefits: [
          'Avoid £5,000-£150,000 MEES penalties',
          'Maintain rental income and property value',
          'Future-proof against 2027 EPC C requirement',
          'Improved tenant attraction and retention',
          'Enhanced property marketability'
        ],
        implementation: {
          duration: '6-16 weeks',
          complexity: 'High',
          disruption: 'Moderate',
          prerequisites: ['EPC assessment', 'Cost-benefit analysis', 'Tenant coordination']
        },
        costEstimate: {
          range: {
            min: Math.round(floorArea * 25 * regionalMultiplier),
            max: Math.round(floorArea * 85 * regionalMultiplier)
          },
          paybackPeriod: { min: 3.5, max: 8.5 },
          ongoingCosts: Math.round(floorArea * 0.8)
        },
        performance: {
          energySavings: 25,
          carbonReduction: Math.round(floorArea * 0.12),
          operationalImpact: 'Full regulatory compliance and risk mitigation'
        },
        compatibility: {
          propertyTypes: ['office_building', 'retail_space', 'warehouse', 'manufacturing', 'hospitality'],
          industries: ['technology', 'finance', 'retail', 'manufacturing', 'hospitality'],
          minimumSize: 100,
          idealConditions: ['Rental properties', 'EPC rating F or G', 'Committed ownership']
        },
        certifications: ['Accredited EPC Assessor', 'Building Regulations compliance'],
        warranty: {
          equipment: 'Varies by component (2-25 years)',
          performance: 'EPC rating improvement guarantee'
        }
      })
    }
    
    // Productivity Solutions
    const productivitySolutions: Solution[] = []
    
    if (['office_building', 'education', 'healthcare'].includes(body.propertyType)) {
      productivitySolutions.push({
        id: 'indoor_environment',
        title: 'Indoor Environmental Quality Optimization',
        description: 'Comprehensive air quality, lighting, and thermal comfort optimization to enhance occupant productivity, health, and wellbeing.',
        category: 'Occupant Wellness',
        benefits: [
          '15-25% improvement in employee productivity',
          'Reduced sick leave and absenteeism',
          'Enhanced talent attraction and retention',
          'Improved cognitive performance and focus',
          'Better sleep quality and stress reduction'
        ],
        implementation: {
          duration: '4-12 weeks',
          complexity: 'Medium',
          disruption: 'Moderate',
          prerequisites: ['Indoor air quality assessment', 'Occupant surveys', 'System integration planning']
        },
        costEstimate: {
          range: {
            min: Math.round(floorArea * 20 * regionalMultiplier),
            max: Math.round(floorArea * 45 * regionalMultiplier)
          },
          paybackPeriod: { min: 1.8, max: 4.2 },
          ongoingCosts: Math.round(floorArea * 1.5)
        },
        performance: {
          energySavings: 12,
          carbonReduction: Math.round(floorArea * 0.06),
          operationalImpact: 'Significant productivity gains and employee satisfaction'
        },
        compatibility: {
          propertyTypes: ['office_building', 'education', 'healthcare'],
          industries: ['technology', 'finance', 'healthcare', 'education', 'professional_services'],
          minimumSize: 300,
          idealConditions: ['Knowledge work environment', 'High occupant density', 'Management support']
        },
        certifications: ['WELL Building Standard', 'BREEAM Health & Wellbeing', 'Fitwel certification'],
        warranty: {
          equipment: '3-5 years equipment warranty',
          performance: 'Occupant satisfaction guarantee'
        }
      })
    }
    
    // Sustainability Solutions
    const sustainabilitySolutions: Solution[] = []
    
    if (['retail_space', 'manufacturing', 'warehouse', 'office_building'].includes(body.propertyType) && floorArea > 1000) {
      const roofArea = floorArea * 0.6
      const systemSize = roofArea * 0.15
      
      sustainabilitySolutions.push({
        id: 'solar_installation',
        title: 'Rooftop Solar PV System with Battery Storage',
        description: `Commercial solar installation optimized for ${body.propertyType} with smart inverters, battery storage, and grid-tie capabilities. Includes 25-year performance monitoring.`,
        category: 'Renewable Energy',
        benefits: [
          'Generate 20-40% of annual electricity needs',
          'Hedge against rising energy costs',
          'Enhanced corporate sustainability credentials',
          'Potential export income from surplus generation',
          'Increased property value and marketability'
        ],
        implementation: {
          duration: '8-16 weeks',
          complexity: 'High',
          disruption: 'Minimal',
          prerequisites: ['Roof structural survey', 'Grid connection approval', 'Planning permission (if required)']
        },
        costEstimate: {
          range: {
            min: Math.round(systemSize * 1000 * regionalMultiplier),
            max: Math.round(systemSize * 1500 * regionalMultiplier)
          },
          paybackPeriod: { min: 6.5, max: 12.0 },
          ongoingCosts: Math.round(systemSize * 15) // Annual maintenance
        },
        performance: {
          energySavings: Math.round((systemSize * 950 / (floorArea * 200)) * 100), // % of building consumption
          carbonReduction: Math.round(systemSize * 950 * 0.193 / 1000),
          operationalImpact: 'Long-term energy cost stability and sustainability leadership'
        },
        compatibility: {
          propertyTypes: ['office_building', 'retail_space', 'warehouse', 'manufacturing'],
          industries: ['technology', 'retail', 'manufacturing', 'logistics'],
          minimumSize: 500,
          idealConditions: ['South-facing roof', 'Minimal shading', 'Structural capacity', 'High daytime usage']
        },
        certifications: ['MCS certified installer', 'IEC 61215 panels', '25-year performance warranty'],
        warranty: {
          equipment: '12-25 years equipment warranty',
          performance: '25-year linear performance guarantee'
        },
        caseStudy: {
          clientType: 'Manufacturing facility',
          results: '180kWp system, 35% energy independence, £25,000 annual savings',
          testimonial: 'Solar has transformed our energy costs and sustainability profile. The system performs better than projected.'
        }
      })
    }
    
    // Calculate potential savings for each category
    const calculateCategorySavings = (solutions: Solution[]) => {
      const totalSavings = solutions.reduce((sum, solution) => {
        const avgCost = (solution.costEstimate.range.min + solution.costEstimate.range.max) / 2
        const avgPayback = (solution.costEstimate.paybackPeriod.min + solution.costEstimate.paybackPeriod.max) / 2
        return sum + (avgCost / avgPayback)
      }, 0)
      
      // Estimate current energy cost based on property type and size
      const benchmark = ENERGY_BENCHMARKS[body.propertyType]
      const estimatedAnnualCost = (benchmark.electricity + benchmark.gas) * floorArea * 0.3 / 100 // Rough estimate
      
      return {
        annual: Math.round(totalSavings),
        percentage: Math.round((totalSavings / estimatedAnnualCost) * 100)
      }
    }
    
    // Generate implementation roadmap
    const implementationRoadmap = [
      {
        phase: 1,
        title: 'Quick Wins & Assessment',
        duration: '1-3 months',
        solutions: ['Energy audit', 'LED retrofit', 'Energy monitoring'],
        estimatedCost: {
          min: Math.round(floorArea * 15 * regionalMultiplier),
          max: Math.round(floorArea * 30 * regionalMultiplier)
        },
        expectedROI: 35,
        prerequisites: ['Management commitment', 'Budget approval', 'Contractor selection']
      },
      {
        phase: 2,
        title: 'System Optimization',
        duration: '3-8 months',
        solutions: ['HVAC optimization', 'Smart controls', 'Insulation upgrades'],
        estimatedCost: {
          min: Math.round(floorArea * 40 * regionalMultiplier),
          max: Math.round(floorArea * 80 * regionalMultiplier)
        },
        expectedROI: 18,
        prerequisites: ['Phase 1 completion', 'System compatibility confirmed', 'Operational planning']
      }
    ]
    
    if (floorArea > 1000) {
      implementationRoadmap.push({
        phase: 3,
        title: 'Strategic Investments',
        duration: '6-18 months',
        solutions: ['Solar installation', 'Heat pump upgrade', 'Advanced automation'],
        estimatedCost: {
          min: Math.round(floorArea * 60 * regionalMultiplier),
          max: Math.round(floorArea * 120 * regionalMultiplier)
        },
        expectedROI: 12,
        prerequisites: ['Phases 1-2 complete', 'Long-term planning', 'Financing arranged']
      })
    }
    
    // Priority scoring based on goals
    const goalPriorities = {
      energyEfficiency: body.goals.primaryObjectives.includes('Reduce energy costs') ? 5 :
                       body.goals.primaryObjectives.includes('Improve efficiency') ? 4 : 2,
      smartBuilding: body.goals.primaryObjectives.includes('Modernize technology') ? 5 :
                    body.goals.primaryObjectives.includes('Improve operations') ? 4 : 2,
      compliance: body.goals.primaryObjectives.includes('Meet regulations') ? 5 :
                 !meesCompliant ? 5 : 2,
      productivity: body.goals.primaryObjectives.includes('Enhance productivity') ? 5 :
                   ['office_building', 'education', 'healthcare'].includes(body.propertyType) ? 3 : 1,
      sustainability: body.goals.primaryObjectives.includes('Improve sustainability') ? 5 :
                     body.goals.primaryObjectives.includes('Carbon reduction') ? 4 : 2
    }
    
    const response: CommercialSolutionsResponse = {
      success: true,
      data: {
        solutionId,
        propertyProfile: {
          type: body.propertyType,
          sizeCategory,
          industryFocus: body.businessInfo.industry,
          efficiencyPotential
        },
        solutionCategories: {
          energyEfficiency: {
            priority: goalPriorities.energyEfficiency,
            solutions: energyEfficiencySolutions,
            potentialSavings: calculateCategorySavings(energyEfficiencySolutions),
            implementationComplexity: energyEfficiencySolutions.length > 2 ? 'Moderate' : 'Simple'
          },
          smartBuilding: {
            priority: goalPriorities.smartBuilding,
            solutions: smartBuildingSolutions,
            potentialSavings: calculateCategorySavings(smartBuildingSolutions),
            implementationComplexity: 'Moderate'
          },
          compliance: {
            priority: goalPriorities.compliance,
            solutions: complianceSolutions,
            urgency: !meesCompliant ? 'Critical' : 'Low',
            complianceDeadlines: !meesCompliant ? ['MEES EPC E: Immediate', 'MEES EPC C: April 2027'] : []
          },
          productivity: {
            priority: goalPriorities.productivity,
            solutions: productivitySolutions,
            expectedImprovements: {
              employeeSatisfaction: 25,
              operationalEfficiency: 15,
              spaceUtilization: 12
            },
            implementationComplexity: 'Moderate'
          },
          sustainability: {
            priority: goalPriorities.sustainability,
            solutions: sustainabilitySolutions,
            carbonImpact: {
              currentFootprint: Math.round(floorArea * 0.25), // Estimated
              projectedReduction: sustainabilitySolutions.reduce((sum, sol) => sum + sol.performance.carbonReduction, 0),
              percentageReduction: 35
            },
            implementationComplexity: 'Complex'
          }
        },
        implementationRoadmap,
        nextSteps: {
          immediate: [
            'Schedule comprehensive energy audit',
            'Obtain quotes from certified contractors',
            'Review available grants and financing options'
          ],
          shortTerm: [
            'Implement quick-win LED lighting upgrades',
            'Install energy monitoring system',
            'Develop staff engagement program'
          ],
          mediumTerm: [
            'Execute HVAC optimization project',
            'Integrate smart building controls',
            'Begin compliance upgrade planning'
          ],
          longTerm: [
            'Install renewable energy systems',
            'Implement advanced automation',
            'Achieve net-zero operational carbon'
          ]
        }
      },
      metadata: {
        generatedAt: new Date().toISOString(),
        validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        customizedFor: {
          propertyType: body.propertyType,
          industry: body.businessInfo.industry,
          region: body.propertyDetails.location.region
        },
        marketContext: {
          energyPrices: {
            trend: 'Increasing',
            projection: '3-5% annual increases expected through 2025'
          },
          regulations: {
            upcoming: ['Building Safety Act Phase 2', 'MEES EPC C requirement'],
            deadlines: ['MEES EPC C: April 2027', 'Net Zero Strategy: 2050']
          },
          incentives: {
            available: ['Enhanced Capital Allowances', 'Green Business Investment Scheme'],
            expiringSoon: ['Super Deduction (if extended)', 'Green Finance discounts']
          }
        }
      }
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Error generating commercial solutions:', error)
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred while generating commercial solutions',
        details: process.env.NODE_ENV === 'development' ? { error: String(error) } : undefined
      },
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}