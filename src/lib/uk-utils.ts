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

// Construction industry disclaimer for legal protection
export const CONSTRUCTION_DISCLAIMER = `
Cost estimates are indicative and subject to regional variations, market conditions, and project specifics.
Planning permission and building regulations approval times vary by local authority.
Professional availability depends on local demand and seasonal factors.
All building work must comply with current UK Building Regulations.
Seek professional advice for specific project requirements.
Prices shown exclude VAT where applicable.
Material costs subject to market volatility and supplier availability.
`