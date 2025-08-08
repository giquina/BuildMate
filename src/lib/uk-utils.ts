// UK-specific utility functions for BuildMate AI

// UK Postcode validation
export function validateUKPostcode(postcode: string): boolean {
  const ukPostcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i
  return ukPostcodeRegex.test(postcode.trim())
}

// Format UK currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount)
}

// Calculate VAT (UK standard rate 20%)
export function calculateVAT(netAmount: number, rate: number = 0.20): {
  net: number
  vat: number
  gross: number
} {
  const vat = netAmount * rate
  return {
    net: netAmount,
    vat: vat,
    gross: netAmount + vat
  }
}

// Convert square feet to square meters (UK uses both)
export function convertSqFtToSqM(sqft: number): number {
  return parseFloat((sqft * 0.092903).toFixed(2))
}

// Convert square meters to square feet
export function convertSqMToSqFt(sqm: number): number {
  return parseFloat((sqm * 10.764).toFixed(2))
}

// Extract area from UK postcode for regional pricing
export function getPostcodeArea(postcode: string): string | null {
  if (!validateUKPostcode(postcode)) return null
  
  const cleaned = postcode.trim().toUpperCase()
  const areaMatch = cleaned.match(/^([A-Z]{1,2})/)
  return areaMatch ? areaMatch[1] : null
}

// Regional cost multipliers based on 2024 UK construction market data
export const REGIONAL_COST_MULTIPLIERS = {
  // London postcodes (highest cost)
  'E': 1.45,   // East London
  'EC': 1.50,  // City of London
  'N': 1.40,   // North London  
  'NW': 1.45,  // North West London
  'SE': 1.35,  // South East London
  'SW': 1.50,  // South West London (premium)
  'W': 1.48,   // West London
  'WC': 1.52,  // West Central London
  
  // South East England (high cost)
  'BR': 1.35,  // Bromley
  'CR': 1.30,  // Croydon
  'DA': 1.25,  // Dartford
  'GU': 1.32,  // Guildford
  'KT': 1.38,  // Kingston upon Thames
  'RH': 1.30,  // Redhill
  'SM': 1.33,  // Sutton
  'TN': 1.28,  // Tonbridge
  'TW': 1.35,  // Twickenham
  
  // South West England (moderate cost)
  'BA': 1.05,  // Bath
  'BS': 1.08,  // Bristol
  'EX': 0.95,  // Exeter
  'PL': 0.88,  // Plymouth
  'TA': 0.92,  // Taunton
  
  // West Midlands (national average)
  'B': 1.00,   // Birmingham
  'CV': 0.98,  // Coventry
  'DY': 0.95,  // Dudley
  'WS': 0.93,  // Walsall
  'WV': 0.92,  // Wolverhampton
  
  // East Midlands (below national average)
  'DE': 0.90,  // Derby
  'LE': 0.88,  // Leicester  
  'LN': 0.85,  // Lincoln
  'NG': 0.87,  // Nottingham
  'NN': 0.89,  // Northampton
  
  // North West England (below national average)
  'BB': 0.82,  // Blackburn
  'BL': 0.80,  // Bolton
  'FY': 0.78,  // Blackpool
  'L': 0.85,   // Liverpool
  'M': 0.88,   // Manchester
  'OL': 0.83,  // Oldham
  'PR': 0.84,  // Preston
  'WA': 0.86,  // Warrington
  'WN': 0.81,  // Wigan
  
  // North East England (lowest cost)
  'DH': 0.75,  // Durham
  'DL': 0.73,  // Darlington
  'NE': 0.76,  // Newcastle
  'SR': 0.74,  // Sunderland
  'TS': 0.72,  // Teesside
  
  // Yorkshire (below national average)
  'BD': 0.83,  // Bradford
  'DN': 0.79,  // Doncaster
  'HD': 0.84,  // Huddersfield
  'HG': 0.87,  // Harrogate
  'HU': 0.78,  // Hull
  'LS': 0.86,  // Leeds
  'S': 0.82,   // Sheffield
  'WF': 0.81,  // Wakefield
  'YO': 0.89,  // York
  
  // Scotland (below national average)
  'AB': 0.90,  // Aberdeen
  'DD': 0.85,  // Dundee
  'DG': 0.82,  // Dumfries
  'EH': 0.92,  // Edinburgh
  'FK': 0.86,  // Falkirk
  'G': 0.88,   // Glasgow
  'IV': 0.95,  // Inverness (remote premium)
  'KA': 0.84,  // Kilmarnock
  'KY': 0.85,  // Kirkcaldy
  'ML': 0.83,  // Motherwell
  'PA': 0.87,  // Paisley
  'PH': 0.93,  // Perth (remote premium)
  'TD': 0.86,  // Borders
  
  // Wales (below national average)
  'CF': 0.90,  // Cardiff
  'CH': 0.88,  // Chester/Flintshire border
  'LD': 0.92,  // Llandrindod Wells (remote premium)
  'LL': 0.85,  // Llandudno
  'NP': 0.87,  // Newport
  'SA': 0.84,  // Swansea
  'SY': 0.83,  // Shrewsbury/Powys border
  
  // Northern Ireland (lowest cost)
  'BT': 0.82,  // Belfast area
} as const

export type PostcodeArea = keyof typeof REGIONAL_COST_MULTIPLIERS

// Get regional cost multiplier for a postcode
export function getRegionalCostMultiplier(postcode: string): number {
  const area = getPostcodeArea(postcode)
  if (!area) return 1.0 // Default to national average if invalid postcode
  
  return REGIONAL_COST_MULTIPLIERS[area as PostcodeArea] || 1.0
}

// Calculate regionally adjusted cost
export function calculateRegionalCost(baseCost: number, postcode: string): {
  baseCost: number
  multiplier: number
  adjustedCost: number
  region: string
} {
  const multiplier = getRegionalCostMultiplier(postcode)
  const area = getPostcodeArea(postcode)
  
  let regionName = 'UK Average'
  if (area) {
    if (['E', 'EC', 'N', 'NW', 'SE', 'SW', 'W', 'WC'].includes(area)) {
      regionName = 'London'
    } else if (['BR', 'CR', 'DA', 'GU', 'KT', 'RH', 'SM', 'TN', 'TW'].includes(area)) {
      regionName = 'South East'
    } else if (area.startsWith('BT')) {
      regionName = 'Northern Ireland'
    } else if (['AB', 'DD', 'DG', 'EH', 'FK', 'G', 'IV', 'KA', 'KY', 'ML', 'PA', 'PH', 'TD'].includes(area)) {
      regionName = 'Scotland'
    } else if (['CF', 'CH', 'LD', 'LL', 'NP', 'SA', 'SY'].includes(area)) {
      regionName = 'Wales'
    } else if (['DH', 'DL', 'NE', 'SR', 'TS'].includes(area)) {
      regionName = 'North East'
    } else if (['BB', 'BL', 'FY', 'L', 'M', 'OL', 'PR', 'WA', 'WN'].includes(area)) {
      regionName = 'North West'
    } else if (['BD', 'DN', 'HD', 'HG', 'HU', 'LS', 'S', 'WF', 'YO'].includes(area)) {
      regionName = 'Yorkshire'
    } else if (['DE', 'LE', 'LN', 'NG', 'NN'].includes(area)) {
      regionName = 'East Midlands'
    } else if (['B', 'CV', 'DY', 'WS', 'WV'].includes(area)) {
      regionName = 'West Midlands'
    } else if (['BA', 'BS', 'EX', 'PL', 'TA'].includes(area)) {
      regionName = 'South West'
    }
  }
  
  return {
    baseCost,
    multiplier,
    adjustedCost: baseCost * multiplier,
    region: regionName
  }
}

// Planning permission timeline estimates by region (weeks)
export const REGIONAL_PLANNING_TIMES = {
  'London': { min: 10, max: 16, factors: ['Conservation areas', 'High density', 'Complex approvals'] },
  'South East': { min: 8, max: 14, factors: ['High demand', 'Planning restrictions', 'AONB considerations'] },
  'Scotland': { min: 6, max: 12, factors: ['Building Standards system', 'Highland/Island variations'] },
  'Wales': { min: 8, max: 12, factors: ['Welsh regulations', 'Language requirements', 'National park areas'] },
  'Northern Ireland': { min: 8, max: 14, factors: ['Technical Booklet system', 'Peace walls', 'Flood risk'] },
  'North East': { min: 6, max: 10, factors: ['Lower demand', 'Brownfield regeneration'] },
  'North West': { min: 7, max: 11, factors: ['Urban regeneration', 'Flood risk areas'] },
  'Yorkshire': { min: 6, max: 10, factors: ['National park areas', 'Green belt', 'Heritage considerations'] },
  'East Midlands': { min: 6, max: 10, factors: ['Rural planning', 'Mineral extraction areas'] },
  'West Midlands': { min: 7, max: 11, factors: ['Urban infill', 'Conservation areas'] },
  'South West': { min: 7, max: 12, factors: ['AONB', 'Coastal restrictions', 'Tourism impact'] },
  'UK Average': { min: 8, max: 13, factors: ['Standard processing', 'Neighbour consultation'] }
} as const

// Get planning timeline for region
export function getPlanningTimeline(postcode: string): typeof REGIONAL_PLANNING_TIMES[keyof typeof REGIONAL_PLANNING_TIMES] {
  const { region } = calculateRegionalCost(1, postcode)
  return REGIONAL_PLANNING_TIMES[region as keyof typeof REGIONAL_PLANNING_TIMES] || REGIONAL_PLANNING_TIMES['UK Average']
}

// UK Professional Certifications and Standards
export const UK_CERTIFICATIONS = {
  // Gas Safety
  GAS_SAFE: {
    name: 'Gas Safe Registered',
    issuer: 'Gas Safe Register',
    description: 'Legal requirement for all gas work in Great Britain',
    verificationUrl: 'https://www.gassaferegister.co.uk/find-an-engineer/',
    renewalPeriod: 12, // months
    mandatory: true,
    categories: ['gas_safety', 'trade_qualification']
  },
  
  // Electrical Qualifications
  NICEIC: {
    name: 'NICEIC Approved Contractor',
    issuer: 'NICEIC',
    description: 'Electrical safety and quality assurance',
    verificationUrl: 'https://www.niceic.com/find-a-contractor',
    renewalPeriod: 12,
    mandatory: false,
    categories: ['electrical_qualification', 'safety_certification']
  },
  
  NAPIT: {
    name: 'NAPIT Registered',
    issuer: 'NAPIT',
    description: 'Building compliance and electrical safety',
    verificationUrl: 'https://www.napit.org.uk/find-an-installer',
    renewalPeriod: 12,
    mandatory: false,
    categories: ['electrical_qualification', 'building_control']
  },
  
  PART_P: {
    name: 'Part P Certified',
    issuer: 'Various Competent Person Schemes',
    description: 'Building Regulations Part P electrical work',
    verificationUrl: null,
    renewalPeriod: 60, // 5 years
    mandatory: true,
    categories: ['electrical_qualification', 'building_control']
  },
  
  // Construction Skills Certification
  CSCS: {
    name: 'CSCS Card',
    issuer: 'Construction Skills Certification Scheme',
    description: 'Construction site safety and skills verification',
    verificationUrl: 'https://www.cscs.uk.com/checking-a-cscs-card/',
    renewalPeriod: 60, // 5 years
    mandatory: true,
    categories: ['safety_certification', 'trade_qualification']
  },
  
  // Professional Memberships
  RIBA: {
    name: 'RIBA Chartered Architect',
    issuer: 'Royal Institute of British Architects',
    description: 'Professional architectural qualification',
    verificationUrl: 'https://www.architecture.com/architect-search',
    renewalPeriod: 12,
    mandatory: false,
    categories: ['professional_membership', 'trade_qualification']
  },
  
  FMB: {
    name: 'FMB Member',
    issuer: 'Federation of Master Builders',
    description: 'Quality building and construction work',
    verificationUrl: 'https://www.fmb.org.uk/find-a-builder/',
    renewalPeriod: 12,
    mandatory: false,
    categories: ['professional_membership', 'trade_qualification']
  },
  
  NHBC: {
    name: 'NHBC Registered',
    issuer: 'National House Building Council',
    description: 'New home warranty and standards',
    verificationUrl: 'https://www.nhbc.co.uk/builders/findabuilder/',
    renewalPeriod: 12,
    mandatory: false,
    categories: ['professional_membership', 'trade_qualification']
  },
  
  // Plumbing and Heating
  CIPHE: {
    name: 'CIPHE Member',
    issuer: 'Chartered Institute of Plumbing and Heating Engineering',
    description: 'Professional plumbing and heating qualification',
    verificationUrl: 'https://www.ciphe.org.uk/find-a-professional',
    renewalPeriod: 12,
    mandatory: false,
    categories: ['professional_membership', 'trade_qualification']
  },
  
  OFTEC: {
    name: 'OFTEC Registered',
    issuer: 'Oil Firing Technical Association',
    description: 'Oil heating systems installation and maintenance',
    verificationUrl: 'https://www.oftec.org/find-a-technician',
    renewalPeriod: 12,
    mandatory: false,
    categories: ['trade_qualification', 'safety_certification']
  },
  
  // Roofing
  NFRC: {
    name: 'NFRC Member',
    issuer: 'National Federation of Roofing Contractors',
    description: 'Professional roofing standards',
    verificationUrl: 'https://www.nfrc.co.uk/find-contractor/',
    renewalPeriod: 12,
    mandatory: false,
    categories: ['professional_membership', 'trade_qualification']
  },
  
  // Health and Safety
  IOSH: {
    name: 'IOSH Certified',
    issuer: 'Institution of Occupational Safety and Health',
    description: 'Health and safety management',
    verificationUrl: null,
    renewalPeriod: 36,
    mandatory: false,
    categories: ['health_safety', 'professional_membership']
  },
  
  SMSTS: {
    name: 'SMSTS Certificate',
    issuer: 'CITB',
    description: 'Site Management Safety Training Scheme',
    verificationUrl: null,
    renewalPeriod: 60, // 5 years
    mandatory: false,
    categories: ['health_safety', 'safety_certification']
  }
} as const

// Insurance requirements by trade type
export const INSURANCE_REQUIREMENTS = {
  architect: {
    publicLiability: 2000000, // £2M minimum
    professionalIndemnity: 1000000, // £1M minimum
    employersLiability: 10000000 // £10M minimum
  },
  builder: {
    publicLiability: 2000000,
    professionalIndemnity: 500000,
    employersLiability: 10000000
  },
  electrician: {
    publicLiability: 2000000,
    professionalIndemnity: 500000,
    employersLiability: 10000000
  },
  plumber: {
    publicLiability: 2000000,
    professionalIndemnity: 250000,
    employersLiability: 10000000
  },
  heating_engineer: {
    publicLiability: 2000000,
    professionalIndemnity: 500000,
    employersLiability: 10000000
  },
  roofer: {
    publicLiability: 2000000,
    professionalIndemnity: 250000,
    employersLiability: 10000000
  }
} as const

// Validate UK professional certification
export function validateCertification(certificationId: string, registrationNumber: string): boolean {
  // This would integrate with actual verification APIs in production
  // For now, return basic validation
  return certificationId.length > 0 && registrationNumber.length >= 6
}

// Get required certifications for a professional type
export function getRequiredCertifications(professionalType: string): string[] {
  const requirements: Record<string, string[]> = {
    electrician: ['NICEIC', 'PART_P', 'CSCS'],
    plumber: ['GAS_SAFE', 'CSCS'],
    heating_engineer: ['GAS_SAFE', 'OFTEC', 'CSCS'],
    builder: ['CSCS', 'FMB'],
    architect: ['RIBA'],
    gas_engineer: ['GAS_SAFE', 'CSCS'],
    roofer: ['CSCS', 'NFRC']
  }
  
  return requirements[professionalType] || ['CSCS']
}

// Calculate professional verification score
export function calculateVerificationScore(certifications: any[], insurance: any, reviews: any[]): number {
  let score = 0
  
  // Base certifications (40 points)
  const requiredCerts = certifications.filter(cert => UK_CERTIFICATIONS[cert.name as keyof typeof UK_CERTIFICATIONS]?.mandatory)
  score += requiredCerts.length * 10
  
  // Additional certifications (20 points)
  const additionalCerts = certifications.filter(cert => !UK_CERTIFICATIONS[cert.name as keyof typeof UK_CERTIFICATIONS]?.mandatory)
  score += Math.min(additionalCerts.length * 5, 20)
  
  // Insurance verification (20 points)
  if (insurance?.verified) score += 20
  
  // Review score (20 points)
  const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  score += Math.round((avgRating / 5) * 20)
  
  return Math.min(score, 100)
}

// Professional search and matching utilities
export function calculateDistance(postcode1: string, postcode2: string): number {
  // Simplified distance calculation - in production would use actual postcode coordinates
  if (getPostcodeArea(postcode1) === getPostcodeArea(postcode2)) return 5
  return Math.random() * 50 + 10 // Mock distance for now
}

export function matchProfessionals(requirements: any, professionals: any[]): any[] {
  return professionals
    .filter(prof => {
      // Check if professional serves the area
      const distance = calculateDistance(requirements.postcode, prof.postcode)
      if (distance > prof.travelRadius) return false
      
      // Check if they have required specialties
      const hasRequiredSpecialty = requirements.workType.some((type: string) => 
        prof.specialties.includes(type)
      )
      if (!hasRequiredSpecialty) return false
      
      // Check availability
      if (prof.status !== 'active') return false
      
      return true
    })
    .sort((a, b) => {
      // Sort by verification score, rating, and distance
      const scoreA = calculateVerificationScore(a.certifications, a.business.insuranceDetails, a.reviews || [])
      const scoreB = calculateVerificationScore(b.certifications, b.business.insuranceDetails, b.reviews || [])
      
      if (scoreA !== scoreB) return scoreB - scoreA
      if (a.rating !== b.rating) return b.rating - a.rating
      
      const distanceA = calculateDistance(requirements.postcode, a.postcode)
      const distanceB = calculateDistance(requirements.postcode, b.postcode)
      return distanceA - distanceB
    })
}

// Construction industry disclaimer for legal protection
export const CONSTRUCTION_DISCLAIMER = `
Cost estimates are indicative and subject to regional variations, market conditions, and project specifics.
Planning permission and building regulations approval times vary by local authority.
Professional availability depends on local demand and seasonal factors.
All building work must comply with current UK Building Regulations.
Seek professional advice for specific project requirements.
Prices shown exclude VAT where applicable.
Material costs subject to market volatility and supplier availability.
All professionals must have valid certifications and insurance coverage.
Gas work must only be carried out by Gas Safe registered engineers.
Electrical work may require Building Control notification under Part P.
`

// ========================================
// COMMERCIAL B2B ENERGY CALCULATIONS
// ========================================

// UK Commercial Energy Costs (2024 data)
export const UK_COMMERCIAL_ENERGY_COSTS = {
  // Electricity costs (pence per kWh) by business size
  electricity: {
    small_business: 28.5, // <100kW
    medium_business: 24.8, // 100-500kW
    large_business: 21.2, // >500kW
  },
  // Gas costs (pence per kWh) by business size
  gas: {
    small_business: 8.4,
    medium_business: 7.8,
    large_business: 6.9,
  },
  // Standing charges per day
  standingCharges: {
    electricity: 45.2, // pence per day
    gas: 28.8, // pence per day
  },
  // Climate Change Levy (CCL) rates
  ccl: {
    electricity: 0.775, // pence per kWh
    gas: 0.212, // pence per kWh
  }
} as const

// Energy consumption benchmarks by property type (kWh/m²/year)
export const ENERGY_BENCHMARKS = {
  office_building: {
    electricity: 95, // kWh/m²/year
    gas: 120, // kWh/m²/year
    typical_epc: 'D' as const
  },
  retail_space: {
    electricity: 150,
    gas: 180,
    typical_epc: 'D' as const
  },
  warehouse: {
    electricity: 45,
    gas: 60,
    typical_epc: 'C' as const
  },
  manufacturing: {
    electricity: 180,
    gas: 200,
    typical_epc: 'D' as const
  },
  hospitality: {
    electricity: 200,
    gas: 250,
    typical_epc: 'E' as const
  },
  healthcare: {
    electricity: 250,
    gas: 300,
    typical_epc: 'D' as const
  },
  education: {
    electricity: 80,
    gas: 100,
    typical_epc: 'C' as const
  },
  multi_tenant: {
    electricity: 120,
    gas: 150,
    typical_epc: 'D' as const
  },
  mixed_use: {
    electricity: 130,
    gas: 160,
    typical_epc: 'D' as const
  }
} as const

// Energy efficiency improvement potentials
export const EFFICIENCY_IMPROVEMENTS = {
  led_lighting: {
    energySavings: 0.65, // 65% reduction
    applicableLoad: 0.25, // 25% of total energy
    costPerSqM: 15, // £15/m²
    lifespan: 15, // years
    maintenanceReduction: 0.8 // 80% less maintenance
  },
  hvac_optimization: {
    energySavings: 0.35, // 35% reduction
    applicableLoad: 0.45, // 45% of total energy
    costPerSqM: 45, // £45/m²
    lifespan: 12,
    maintenanceReduction: 0.3
  },
  insulation_upgrade: {
    energySavings: 0.25, // 25% reduction in heating
    applicableLoad: 0.6, // applies to heating/cooling
    costPerSqM: 35, // £35/m²
    lifespan: 25,
    maintenanceReduction: 0
  },
  smart_controls: {
    energySavings: 0.15, // 15% reduction
    applicableLoad: 0.8, // applies to most systems
    costPerSqM: 25, // £25/m²
    lifespan: 10,
    maintenanceReduction: 0.2
  },
  solar_panels: {
    energyGeneration: 950, // kWh/kWp/year (UK average)
    costPerKwp: 1200, // £1,200/kWp installed
    lifespan: 25,
    maintenanceReduction: 0,
    feedInTariff: 0.05 // 5p/kWh export
  },
  heat_pump: {
    energySavings: 0.45, // vs gas boiler
    applicableLoad: 1.0, // heating only
    costPerKw: 1500, // £1,500/kW capacity
    lifespan: 15,
    maintenanceReduction: 0.4,
    ropReduction: 0.6 // Renewable heat incentive
  }
} as const

// Calculate annual energy cost for commercial property
export function calculateCommercialEnergyCost(
  propertyType: keyof typeof ENERGY_BENCHMARKS,
  floorArea: number, // m²
  businessSize: 'small_business' | 'medium_business' | 'large_business' = 'small_business'
): {
  annualElectricity: number
  annualGas: number
  totalAnnualCost: number
  carbonFootprint: number
  costPerSqM: number
} {
  const benchmark = ENERGY_BENCHMARKS[propertyType]
  const electricityRates = UK_COMMERCIAL_ENERGY_COSTS.electricity[businessSize]
  const gasRates = UK_COMMERCIAL_ENERGY_COSTS.gas[businessSize]
  
  const annualElectricity = benchmark.electricity * floorArea
  const annualGas = benchmark.gas * floorArea
  
  const electricityCost = (annualElectricity * (electricityRates + UK_COMMERCIAL_ENERGY_COSTS.ccl.electricity)) / 100
  const gasCost = (annualGas * (gasRates + UK_COMMERCIAL_ENERGY_COSTS.ccl.gas)) / 100
  
  // Add standing charges
  const standingChargesCost = (UK_COMMERCIAL_ENERGY_COSTS.standingCharges.electricity + UK_COMMERCIAL_ENERGY_COSTS.standingCharges.gas) * 365 / 100
  
  const totalAnnualCost = electricityCost + gasCost + standingChargesCost
  
  // Carbon footprint calculation (kg CO2)
  const carbonFootprint = (annualElectricity * 0.193 + annualGas * 0.184) / 1000 // tonnes CO2
  
  return {
    annualElectricity: Math.round(annualElectricity),
    annualGas: Math.round(annualGas),
    totalAnnualCost: Math.round(totalAnnualCost),
    carbonFootprint: Math.round(carbonFootprint * 100) / 100,
    costPerSqM: Math.round((totalAnnualCost / floorArea) * 100) / 100
  }
}

// Calculate ROI for energy efficiency improvements
export function calculateEnergyUpgradeROI(
  currentAnnualCost: number,
  floorArea: number,
  improvements: (keyof typeof EFFICIENCY_IMPROVEMENTS)[],
  region: string = 'UK Average'
): {
  totalInvestment: number
  annualSavings: number
  simplePayback: number
  netPresentValue: number
  internalRateOfReturn: number
  carbonSavings: number
} {
  let totalInvestment = 0
  let totalAnnualSavings = 0
  let totalCarbonSavings = 0
  
  const regionalMultiplier = getRegionalCostMultiplier(region === 'UK Average' ? 'B1 1AA' : region)
  
  improvements.forEach(improvement => {
    const config = EFFICIENCY_IMPROVEMENTS[improvement]
    
    if (improvement === 'solar_panels') {
      // Solar calculation based on roof area (assume 60% of floor area available)
      const roofArea = floorArea * 0.6
      const systemSize = roofArea * 0.15 // 150W/m² panel efficiency
      const solarConfig = config as typeof EFFICIENCY_IMPROVEMENTS.solar_panels
      const investment = systemSize * solarConfig.costPerKwp * regionalMultiplier
      const annualGeneration = systemSize * solarConfig.energyGeneration
      const savingsFromGeneration = annualGeneration * UK_COMMERCIAL_ENERGY_COSTS.electricity.small_business / 100
      const exportEarnings = annualGeneration * 0.5 * solarConfig.feedInTariff * 100 // 50% exported
      
      totalInvestment += investment
      totalAnnualSavings += savingsFromGeneration + exportEarnings
      totalCarbonSavings += annualGeneration * 0.193 / 1000
    } else if (improvement === 'heat_pump') {
      // Heat pump calculation
      const heatPumpConfig = config as typeof EFFICIENCY_IMPROVEMENTS.heat_pump
      const investment = floorArea * heatPumpConfig.costPerKw * regionalMultiplier
      const applicableEnergyCost = currentAnnualCost * heatPumpConfig.applicableLoad
      const savings = applicableEnergyCost * heatPumpConfig.energySavings
      
      totalInvestment += investment
      totalAnnualSavings += savings
      totalCarbonSavings += savings / (UK_COMMERCIAL_ENERGY_COSTS.electricity.small_business / 100) * 0.193 / 1000
    } else {
      // Standard efficiency improvements
      const standardConfig = config as typeof EFFICIENCY_IMPROVEMENTS.led_lighting
      const investment = floorArea * standardConfig.costPerSqM * regionalMultiplier
      const applicableEnergyCost = currentAnnualCost * standardConfig.applicableLoad
      const savings = applicableEnergyCost * standardConfig.energySavings
      
      totalInvestment += investment
      totalAnnualSavings += savings
      totalCarbonSavings += savings / (UK_COMMERCIAL_ENERGY_COSTS.electricity.small_business / 100) * 0.193 / 1000
    }
  })
  
  // Financial calculations
  const simplePayback = totalInvestment / totalAnnualSavings
  
  // NPV calculation (10% discount rate, 20 year horizon)
  const discountRate = 0.10
  const horizon = 20
  let npv = -totalInvestment
  
  for (let year = 1; year <= horizon; year++) {
    const annualCashFlow = totalAnnualSavings * Math.pow(1.03, year - 1) // 3% energy inflation
    npv += annualCashFlow / Math.pow(1 + discountRate, year)
  }
  
  // IRR calculation (simplified)
  let irr = 0
  if (npv > 0 && simplePayback < 20) {
    irr = (totalAnnualSavings / totalInvestment) * 100
    if (irr > 50) irr = 50 // Cap unrealistic returns
  }
  
  return {
    totalInvestment: Math.round(totalInvestment),
    annualSavings: Math.round(totalAnnualSavings),
    simplePayback: Math.round(simplePayback * 10) / 10,
    netPresentValue: Math.round(npv),
    internalRateOfReturn: Math.round(irr * 10) / 10,
    carbonSavings: Math.round(totalCarbonSavings * 100) / 100
  }
}

// Get energy efficiency recommendations based on property type and current performance
export function getEnergyRecommendations(
  propertyType: keyof typeof ENERGY_BENCHMARKS,
  currentEPCRating: 'A+' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G',
  budget: 'low' | 'medium' | 'high' | 'unlimited',
  priorities: ('cost_savings' | 'carbon_reduction' | 'comfort' | 'compliance')[]
): (keyof typeof EFFICIENCY_IMPROVEMENTS)[] {
  const recommendations: (keyof typeof EFFICIENCY_IMPROVEMENTS)[] = []
  
  // Always recommend LED lighting for poor EPC ratings
  if (['D', 'E', 'F', 'G'].includes(currentEPCRating)) {
    recommendations.push('led_lighting')
  }
  
  // HVAC optimization for most commercial properties
  if (['office_building', 'retail_space', 'hospitality', 'healthcare'].includes(propertyType)) {
    recommendations.push('hvac_optimization')
  }
  
  // Smart controls for cost savings priority
  if (priorities.includes('cost_savings')) {
    recommendations.push('smart_controls')
  }
  
  // Insulation for older buildings (poor EPC)
  if (['E', 'F', 'G'].includes(currentEPCRating) && budget !== 'low') {
    recommendations.push('insulation_upgrade')
  }
  
  // Solar panels for high energy users and unlimited budget
  if (['retail_space', 'manufacturing', 'hospitality'].includes(propertyType) && 
      (budget === 'high' || budget === 'unlimited')) {
    recommendations.push('solar_panels')
  }
  
  // Heat pump for carbon reduction priority
  if (priorities.includes('carbon_reduction') && 
      (budget === 'high' || budget === 'unlimited')) {
    recommendations.push('heat_pump')
  }
  
  return recommendations
}

// Commercial property value impact from efficiency improvements
export function calculatePropertyValueImpact(
  currentPropertyValue: number,
  epcImprovement: number, // rating levels improved (e.g., D to B = 2)
  improvements: (keyof typeof EFFICIENCY_IMPROVEMENTS)[]
): {
  valueIncrease: number
  percentageIncrease: number
  improvedValue: number
} {
  // Base value increase from EPC improvement (2-4% per rating level)
  let valueIncrease = currentPropertyValue * (epcImprovement * 0.03)
  
  // Additional value from specific improvements
  if (improvements.includes('solar_panels')) {
    valueIncrease += currentPropertyValue * 0.05 // 5% for renewable energy
  }
  
  if (improvements.includes('smart_controls')) {
    valueIncrease += currentPropertyValue * 0.02 // 2% for smart building tech
  }
  
  if (improvements.includes('hvac_optimization')) {
    valueIncrease += currentPropertyValue * 0.03 // 3% for modern HVAC
  }
  
  // Cap maximum increase at 15%
  const maxIncrease = currentPropertyValue * 0.15
  valueIncrease = Math.min(valueIncrease, maxIncrease)
  
  return {
    valueIncrease: Math.round(valueIncrease),
    percentageIncrease: Math.round((valueIncrease / currentPropertyValue) * 1000) / 10,
    improvedValue: Math.round(currentPropertyValue + valueIncrease)
  }
}