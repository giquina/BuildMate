// Core BuildMate AI Types
export interface User {
  id: string
  email: string
  fullName: string
  postcode?: string
  subscriptionTier: 'free' | 'pro' | 'enterprise' | 'business_starter' | 'business_professional' | 'business_enterprise'
  userType?: 'residential' | 'commercial'
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  userId: string
  name: string
  type: 'new_build' | 'renovation' | 'extension' | 'commercial_retrofit' | 'energy_upgrade' | 'smart_building'
  status: 'planning' | 'design' | 'materials' | 'professionals' | 'building' | 'completed'
  budget: number
  location: string
  postcode: string
  createdAt: string
  updatedAt: string
}

export interface Floorplan {
  id: string
  projectId: string
  name: string
  svgData: string
  specifications: {
    totalArea: number
    roomCount: number
    bedrooms: number
    bathrooms: number
    floors: number
  }
  aiGenerated: boolean
  createdAt: string
}

export interface Material {
  id: string
  name: string
  description: string
  category: MaterialCategory
  subcategory: string
  price: number
  unit: string
  supplier: Supplier
  imageUrl?: string
  specifications: Record<string, any>
  inStock: boolean
  deliveryDays: number
}

export interface Supplier {
  id: string
  name: string
  logo: string
  website: string
  apiEndpoint?: string
  deliveryAreas: string[]
  minimumOrder?: number
}

export interface CartItem {
  id: string
  materialId: string
  material: Material
  quantity: number
  priceAtTime: number
  projectId: string
  addedAt: string
}

export interface Professional {
  id: string
  name: string
  company: string
  specialties: ProfessionalType[]
  location: string
  postcode: string
  radius: number
  rating: number
  reviewCount: number
  verified: boolean
  insurance: boolean
  contactInfo: {
    phone: string
    email: string
    website?: string
  }
  certifications: UKCertification[]
  // Enhanced verification fields
  verification: {
    status: 'pending' | 'verified' | 'rejected' | 'expired'
    verifiedAt?: string
    expiresAt?: string
    documents: VerificationDocument[]
    verificationBadges: VerificationBadge[]
  }
  // Professional profile details
  profile: {
    bio: string
    yearsExperience: number
    projectsCompleted: number
    profileImage?: string
    coverImage?: string
    portfolio: PortfolioItem[]
    awards: Award[]
    qualifications: string[]
  }
  // Business information
  business: {
    registrationNumber?: string
    vatNumber?: string
    insuranceDetails: InsuranceDetails
    publicLiabilityInsurance: number
    employersLiabilityInsurance: number
    professionalIndemnityInsurance?: number
  }
  // Availability and scheduling
  availability: {
    workingHours: WorkingHours
    bookingSettings: BookingSettings
    calendar: AvailabilitySlot[]
    responseTime: number // average response time in hours
    nextAvailable: string
  }
  // Performance metrics
  performance: {
    onTimeCompletion: number
    budgetAdherence: number
    clientSatisfaction: number
    repeatClientRate: number
    recommendationRate: number
  }
  // Communication preferences
  communication: {
    preferredMethods: CommunicationMethod[]
    languages: string[]
    responseTime: 'same-day' | 'next-day' | '48-hours' | 'weekly'
  }
  // Location and service areas
  serviceAreas: ServiceArea[]
  travelRadius: number
  // Subscription and status
  subscriptionTier: 'basic' | 'premium' | 'enterprise'
  status: 'active' | 'inactive' | 'suspended'
  joinedAt: string
  lastActive: string
}

export interface Quote {
  id: string
  projectId: string
  professionalId: string
  professional: Professional
  amount: number
  description: string
  timeline: string
  status: 'pending' | 'accepted' | 'rejected' | 'expired'
  createdAt: string
  validUntil: string
}

// Enums
export type MaterialCategory = 
  | 'structural'
  | 'roofing'
  | 'windows_doors'
  | 'insulation'
  | 'electrical'
  | 'plumbing'
  | 'heating'
  | 'flooring'
  | 'walls_ceilings'
  | 'kitchen'
  | 'bathroom'
  | 'exterior'
  | 'tools'
  | 'hardware'

export type ProfessionalType =
  | 'architect'
  | 'builder'
  | 'electrician'
  | 'plumber'
  | 'heating_engineer'
  | 'roofer'
  | 'plasterer'
  | 'decorator'
  | 'flooring_specialist'
  | 'kitchen_fitter'
  | 'bathroom_fitter'
  | 'landscaper'
  | 'structural_engineer'

export type ProjectStage =
  | 'concept'
  | 'planning_permission'
  | 'building_regulations'
  | 'foundation'
  | 'structure'
  | 'roof'
  | 'first_fix'
  | 'insulation'
  | 'plastering'
  | 'second_fix'
  | 'decoration'
  | 'completion'

// Professional Verification System Types
export interface UKCertification {
  id: string
  name: string
  issuer: string
  category: CertificationCategory
  registrationNumber: string
  issuedDate: string
  expiryDate?: string
  isActive: boolean
  verificationUrl?: string
  description: string
}

export type CertificationCategory = 
  | 'trade_qualification'
  | 'safety_certification'
  | 'professional_membership'
  | 'gas_safety'
  | 'electrical_qualification'
  | 'building_control'
  | 'health_safety'
  | 'business_registration'

export interface VerificationDocument {
  id: string
  type: DocumentType
  name: string
  uploadedAt: string
  expiryDate?: string
  status: 'pending' | 'approved' | 'rejected' | 'expired'
  fileUrl: string
  notes?: string
}

export type DocumentType = 
  | 'certification'
  | 'insurance_certificate'
  | 'id_document'
  | 'business_registration'
  | 'tax_document'
  | 'references'
  | 'portfolio_images'
  | 'safety_record'

export interface VerificationBadge {
  id: string
  type: BadgeType
  name: string
  description: string
  iconUrl: string
  earnedAt: string
  level?: 'bronze' | 'silver' | 'gold' | 'platinum'
}

export type BadgeType = 
  | 'verified_professional'
  | 'top_rated'
  | 'safety_certified'
  | 'insurance_verified'
  | 'fast_responder'
  | 'local_expert'
  | 'eco_specialist'
  | 'premium_member'

export interface PortfolioItem {
  id: string
  title: string
  description: string
  category: string
  completedDate: string
  projectValue?: number
  duration: string
  location: string
  images: string[]
  beforeImages?: string[]
  afterImages?: string[]
  clientTestimonial?: string
  projectType: ProfessionalType[]
  featured: boolean
}

export interface Award {
  id: string
  title: string
  organization: string
  year: number
  description: string
  category: string
  imageUrl?: string
}

export interface InsuranceDetails {
  provider: string
  policyNumber: string
  expiryDate: string
  coverageAmount: number
  documentUrl: string
  verified: boolean
}

export interface WorkingHours {
  monday: DaySchedule
  tuesday: DaySchedule
  wednesday: DaySchedule
  thursday: DaySchedule
  friday: DaySchedule
  saturday: DaySchedule
  sunday: DaySchedule
}

export interface DaySchedule {
  isAvailable: boolean
  startTime?: string
  endTime?: string
  breaks: TimeSlot[]
}

export interface TimeSlot {
  startTime: string
  endTime: string
}

export interface BookingSettings {
  minimumNotice: number // hours
  maximumAdvanceBooking: number // days
  allowWeekendBookings: boolean
  allowEveningBookings: boolean
  bookingTypes: BookingType[]
  requiresApproval: boolean
  cancellationPolicy: string
}

export type BookingType = 
  | 'consultation'
  | 'site_visit'
  | 'quotation'
  | 'follow_up'
  | 'emergency'

export interface AvailabilitySlot {
  id: string
  date: string
  startTime: string
  endTime: string
  status: 'available' | 'booked' | 'blocked'
  bookingType?: BookingType
  notes?: string
}

export interface ServiceArea {
  postcode: string
  town: string
  radius: number
  travelTime: number
  additionalFee?: number
}

export type CommunicationMethod = 
  | 'phone'
  | 'email'
  | 'sms'
  | 'whatsapp'
  | 'video_call'
  | 'in_person'

// Booking and Scheduling Types
export interface Booking {
  id: string
  professionalId: string
  clientId: string
  projectId?: string
  type: BookingType
  status: BookingStatus
  scheduledDate: string
  scheduledTime: string
  duration: number // minutes
  location: {
    address: string
    postcode: string
    instructions?: string
  }
  description: string
  clientNotes?: string
  professionalNotes?: string
  estimatedCost?: number
  depositRequired?: number
  cancellationDeadline: string
  createdAt: string
  updatedAt: string
  reminder: {
    client: boolean
    professional: boolean
    reminderTime: string
  }
}

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show'
  | 'rescheduled'

// Review and Rating System Types
export interface Review {
  id: string
  professionalId: string
  clientId: string
  projectId?: string
  bookingId?: string
  rating: number
  title: string
  content: string
  categories: ReviewCategory[]
  photos: ReviewPhoto[]
  isVerified: boolean
  isPublic: boolean
  clientResponse?: string
  professionalResponse?: string
  responseDate?: string
  createdAt: string
  updatedAt: string
  helpful: number
  reported: boolean
}

export interface ReviewCategory {
  category: string
  rating: number
}

export interface ReviewPhoto {
  id: string
  url: string
  caption?: string
  beforeAfter?: 'before' | 'after'
  featured: boolean
}

// Messaging and Communication Types
export interface Conversation {
  id: string
  participants: string[]
  type: 'direct' | 'group' | 'support'
  subject?: string
  projectId?: string
  lastMessage?: Message
  isArchived: boolean
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  content: string
  type: MessageType
  attachments: MessageAttachment[]
  isRead: boolean
  isEdited: boolean
  replyToId?: string
  sentAt: string
  readAt: string[]
  reactions: MessageReaction[]
}

export type MessageType = 
  | 'text'
  | 'image'
  | 'file'
  | 'quote'
  | 'booking'
  | 'system'
  | 'video_call'

export interface MessageAttachment {
  id: string
  type: 'image' | 'document' | 'video' | 'audio'
  name: string
  url: string
  size: number
  mimeType: string
}

export interface MessageReaction {
  userId: string
  emoji: string
  timestamp: string
}

// Quote Management Types
export interface QuoteRequest {
  id: string
  clientId: string
  projectId: string
  professionals: string[]
  requirements: {
    workType: ProfessionalType[]
    description: string
    timeline: string
    budget: {
      min?: number
      max?: number
      flexible: boolean
    }
    location: {
      address: string
      postcode: string
      accessNotes?: string
    }
    preferences: {
      startDate?: string
      completionDate?: string
      workingHours?: string
      specialRequirements?: string[]
    }
  }
  status: 'draft' | 'sent' | 'responses_received' | 'completed'
  sentAt?: string
  responseDeadline?: string
  createdAt: string
  updatedAt: string
}

export interface QuoteResponse {
  id: string
  quoteRequestId: string
  professionalId: string
  status: 'draft' | 'submitted' | 'accepted' | 'rejected' | 'expired'
  pricing: {
    totalCost: number
    breakdown: CostBreakdown[]
    vatIncluded: boolean
    depositRequired?: number
    paymentTerms: string
  }
  timeline: {
    startDate: string
    completionDate: string
    phases: ProjectPhase[]
  }
  included: string[]
  excluded: string[]
  assumptions: string[]
  validUntil: string
  terms: string
  attachments: string[]
  submittedAt?: string
  clientNotes?: string
  professionalNotes?: string
  createdAt: string
  updatedAt: string
}

export interface CostBreakdown {
  category: string
  description: string
  quantity: number
  unit: string
  unitPrice: number
  totalPrice: number
}

export interface ProjectPhase {
  name: string
  description: string
  duration: number
  startDate: string
  dependencies: string[]
}

// ========================================
// COMMERCIAL B2B EXPANSION TYPES
// ========================================

// Commercial Property Types
export interface CommercialProperty {
  id: string
  userId: string
  name: string
  propertyType: CommercialPropertyType
  address: {
    street: string
    city: string
    postcode: string
    region: string
  }
  specifications: {
    totalFloorArea: number // m²
    numberOfFloors: number
    yearBuilt: number
    currentEPCRating: EPCRating
    targetEPCRating?: EPCRating
    occupancyType: OccupancyType
    operatingHours: OperatingHours
  }
  currentSystems: {
    heating: HeatingSystemType
    lighting: LightingSystemType
    insulation: InsulationType
    windows: WindowType
    smartSystems: SmartSystemType[]
  }
  energyData: {
    annualEnergyConsumption: number // kWh
    annualEnergyCost: number // £
    gasConsumption?: number // m³
    electricityConsumption?: number // kWh
    carbonFootprint: number // CO2 tonnes
  }
  businessInfo: {
    industry: BusinessIndustry
    employeeCount: number
    annualRevenue?: number
    sustainabilityGoals: string[]
    complianceRequirements: ComplianceRequirement[]
  }
  createdAt: string
  updatedAt: string
}

export type CommercialPropertyType = 
  | 'office_building'
  | 'retail_space'
  | 'warehouse'
  | 'manufacturing'
  | 'hospitality'
  | 'healthcare'
  | 'education'
  | 'multi_tenant'
  | 'mixed_use'

export type EPCRating = 'A+' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'

export type OccupancyType = 
  | 'owner_occupied'
  | 'single_tenant'
  | 'multi_tenant'
  | 'mixed_use'
  | 'vacant'

export type OperatingHours = 
  | 'standard_business' // 9-5, Mon-Fri
  | 'extended_hours' // 7am-9pm, Mon-Sat
  | 'twenty_four_seven' // 24/7
  | 'seasonal' // Variable
  | 'weekend_only'

export type HeatingSystemType = 
  | 'gas_boiler'
  | 'electric_heating'
  | 'heat_pump'
  | 'district_heating'
  | 'biomass'
  | 'solar_thermal'
  | 'combined_heat_power'

export type LightingSystemType = 
  | 'traditional_fluorescent'
  | 'led_retrofit'
  | 'smart_led'
  | 'natural_light_optimized'
  | 'motion_sensor'
  | 'daylight_dimming'

export type InsulationType = 
  | 'basic'
  | 'standard'
  | 'enhanced'
  | 'passive_house_standard'
  | 'zero_carbon_ready'

export type WindowType = 
  | 'single_glazed'
  | 'double_glazed'
  | 'triple_glazed'
  | 'smart_glass'
  | 'solar_control'
  | 'low_e_coating'

export type SmartSystemType = 
  | 'smart_meters'
  | 'bms_system' // Building Management System
  | 'hvac_controls'
  | 'lighting_controls'
  | 'occupancy_sensors'
  | 'energy_monitoring'
  | 'predictive_maintenance'
  | 'iot_integration'

export type BusinessIndustry = 
  | 'technology'
  | 'finance'
  | 'healthcare'
  | 'retail'
  | 'manufacturing'
  | 'education'
  | 'hospitality'
  | 'logistics'
  | 'professional_services'
  | 'public_sector'
  | 'non_profit'

export type ComplianceRequirement = 
  | 'building_regulations'
  | 'fire_safety'
  | 'accessibility'
  | 'environmental'
  | 'health_safety'
  | 'data_protection'
  | 'industry_specific'

// Energy Assessment and ROI Types
export interface EnergyAssessment {
  id: string
  propertyId: string
  assessmentDate: string
  assessor: {
    name: string
    certification: string
    company: string
  }
  currentPerformance: {
    epcRating: EPCRating
    energyEfficiencyScore: number
    carbonEmissions: number
    annualEnergyCost: number
    primaryEnergyUse: number
  }
  recommendations: EnergyRecommendation[]
  improvementPotential: {
    potentialEPCRating: EPCRating
    energySavings: number // %
    costSavings: number // £/year
    carbonReduction: number // tonnes CO2/year
    paybackPeriod: number // years
  }
  validUntil: string
  createdAt: string
}

export interface EnergyRecommendation {
  id: string
  category: EnergyUpgradeCategory
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'essential'
  estimatedCost: {
    min: number
    max: number
    currency: 'GBP'
  }
  estimatedSavings: {
    annualEnergyReduction: number // kWh
    annualCostSaving: number // £
    carbonReduction: number // tonnes CO2
  }
  paybackPeriod: {
    min: number // years
    max: number
  }
  implementationTime: number // weeks
  disruptionLevel: 'minimal' | 'moderate' | 'significant'
  grantEligible: boolean
  requiredCertifications: string[]
}

export type EnergyUpgradeCategory = 
  | 'insulation'
  | 'heating_cooling'
  | 'lighting'
  | 'windows_doors'
  | 'renewable_energy'
  | 'smart_systems'
  | 'ventilation'
  | 'hot_water'

// ROI Calculation Types
export interface ROICalculation {
  id: string
  propertyId: string
  upgradePackage: EnergyUpgradePackage
  financialProjections: {
    initialInvestment: number
    annualSavings: number
    netPresentValue: number
    simplePayback: number // years
    discountedPayback: number // years
    internalRateOfReturn: number // %
    profitabilityIndex: number
  }
  assumptions: {
    energyPriceInflation: number // % per year
    discountRate: number // %
    analysisHorizon: number // years
    maintenanceCosts: number // % of initial investment
    degradationFactor: number // % per year
  }
  riskFactors: RiskFactor[]
  incentives: {
    grants: Grant[]
    taxIncentives: TaxIncentive[]
    utilityRebates: UtilityRebate[]
    greenFinancing: GreenFinancingOption[]
  }
  calculatedAt: string
  validUntil: string
}

export interface EnergyUpgradePackage {
  id: string
  name: string
  description: string
  recommendations: string[] // EnergyRecommendation IDs
  totalCost: number
  totalAnnualSavings: number
  overallPayback: number
  epcRatingImprovement: {
    from: EPCRating
    to: EPCRating
  }
  carbonImpact: number // tonnes CO2 saved per year
}

export interface RiskFactor {
  type: RiskType
  description: string
  impact: 'low' | 'medium' | 'high'
  mitigation: string
}

export type RiskType = 
  | 'technology_obsolescence'
  | 'energy_price_volatility'
  | 'regulatory_changes'
  | 'property_usage_changes'
  | 'maintenance_costs'
  | 'performance_degradation'

export interface Grant {
  name: string
  provider: string
  maxAmount: number
  coveragePercentage: number
  eligibilityCriteria: string[]
  applicationDeadline?: string
  processingTime: number // weeks
}

export interface TaxIncentive {
  name: string
  type: 'deduction' | 'credit' | 'allowance'
  benefit: number // £ or %
  eligibilityCriteria: string[]
  claimDeadline?: string
}

export interface UtilityRebate {
  utility: string
  programName: string
  rebateAmount: number
  eligibleUpgrades: string[]
  applicationProcess: string
}

export interface GreenFinancingOption {
  lender: string
  productName: string
  interestRate: number // %
  loanTerm: number // years
  maxLoanAmount: number
  eligibilityCriteria: string[]
}

// Commercial Professional Types Extensions
export interface CommercialSpecialist extends Professional {
  commercialExperience: {
    yearsInCommercial: number
    typicalProjectSize: ProjectSizeCategory
    industrySpecializations: BusinessIndustry[]
    certifiedSystems: string[]
    portfolioValue: number // £
  }
  serviceOfferings: {
    energyAudits: boolean
    designServices: boolean
    projectManagement: boolean
    commissioning: boolean
    maintenance: boolean
    consultancy: boolean
  }
  commercialRates: {
    consultationRate: number // £/hour
    dayRate: number // £/day
    projectFeeStructure: 'fixed' | 'hourly' | 'percentage' | 'value_based'
    minimumProjectValue: number
    paymentTerms: string
  }
}

export type ProjectSizeCategory = 
  | 'small' // £10k-£50k
  | 'medium' // £50k-£250k  
  | 'large' // £250k-£1M
  | 'major' // £1M+

// Business Subscription Tiers
export interface BusinessSubscription {
  tierId: string
  name: 'Business Starter' | 'Business Professional' | 'Business Enterprise'
  monthlyPrice: number
  annualPrice: number
  features: BusinessFeature[]
  limits: BusinessLimits
  support: SupportLevel
  addOns: BusinessAddOn[]
}

export interface BusinessFeature {
  id: string
  name: string
  description: string
  included: boolean
  limitValue?: number
  limitUnit?: string
}

export interface BusinessLimits {
  properties: number
  assessments: number
  recommendations: number
  roiCalculations: number
  professionalContacts: number
  teamMembers: number
  apiCalls?: number
}

export type SupportLevel = 
  | 'email_only'
  | 'email_phone'
  | 'priority_support'
  | 'dedicated_manager'

export interface BusinessAddOn {
  id: string
  name: string
  description: string
  monthlyPrice: number
  unit?: string
  category: 'analysis' | 'support' | 'integration' | 'reporting'
}