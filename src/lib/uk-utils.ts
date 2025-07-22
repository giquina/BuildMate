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