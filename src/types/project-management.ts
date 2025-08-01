// Comprehensive Project Management Types for UK Construction
import { User } from './user'

// Core Project Management Types
export interface ProjectCollaboration {
  id: string
  projectId: string
  teamMembers: TeamMember[]
  permissions: ProjectPermissions
  createdAt: Date
  updatedAt: Date
}

export interface TeamMember {
  id: string
  userId: string
  user: User
  role: TeamRole
  permissions: MemberPermissions
  specialties: string[]
  joinedAt: Date
  status: 'active' | 'invited' | 'suspended'
  contactInfo: {
    email: string
    phone?: string
    emergencyContact?: string
  }
  location?: {
    postcode: string
    address?: string
  }
}

export type TeamRole = 
  | 'project_owner'     // Homeowner/client
  | 'project_manager'   // Main PM/coordinator
  | 'architect'         // Design professional
  | 'main_contractor'   // Principal builder
  | 'subcontractor'     // Specialist trades
  | 'building_inspector'// Council/approved inspector
  | 'consultant'        // Structural engineer, etc.
  | 'supplier'          // Material suppliers
  | 'observer'          // Family member, etc.

export interface MemberPermissions {
  canViewProject: boolean
  canEditProject: boolean
  canManageTeam: boolean
  canUploadFiles: boolean
  canViewFinancials: boolean
  canEditBudget: boolean
  canManageTimeline: boolean
  canMessageTeam: boolean
  canViewDocuments: boolean
  canApproveChanges: boolean
}

export interface ProjectPermissions {
  defaultPermissions: Record<TeamRole, MemberPermissions>
  customPermissions?: Record<string, MemberPermissions>
  requireApprovalFor: string[]
}

// File Management System
export interface ProjectFile {
  id: string
  projectId: string
  uploadedBy: string
  fileName: string
  originalName: string
  fileSize: number
  mimeType: string
  category: FileCategory
  phase: ConstructionPhase
  subCategory?: string
  description?: string
  tags: string[]
  url: string
  thumbnailUrl?: string
  isPublic: boolean
  metadata: FileMetadata
  createdAt: Date
  updatedAt: Date
}

export type FileCategory = 
  | 'planning_documents'     // Planning applications, approvals
  | 'building_control'       // Building regs, completion certificates
  | 'design_documents'       // Architectural drawings, specifications
  | 'progress_photos'        // Site progress images
  | 'certificates'           // Warranties, certifications, compliance
  | 'invoices_receipts'      // Financial documents
  | 'correspondence'         // Letters, emails, official communications
  | 'health_safety'          // Risk assessments, method statements
  | 'specifications'         // Technical specifications, datasheets
  | 'contracts'              // Legal agreements, terms
  | 'other'                  // Miscellaneous documents

export type ConstructionPhase = 
  | 'pre_planning'           // Initial design and feasibility
  | 'planning_permission'    // Planning application process
  | 'building_regulations'   // Building control application
  | 'pre_construction'       // Site preparation, utility connections
  | 'foundations'            // Excavation, concrete, waterproofing
  | 'structure'              // Frame, walls, structural elements
  | 'roof'                   // Roofing, guttering, roof lights
  | 'external_envelope'      // Windows, doors, external insulation
  | 'first_fix'              // Plumbing, electrical, heating rough-in
  | 'insulation_plastering'  // Insulation, boarding, plastering
  | 'second_fix'             // Final electrical, plumbing, heating
  | 'internal_finishes'      // Flooring, decoration, fixtures
  | 'external_works'         // Landscaping, drives, external features
  | 'completion'             // Final inspections, handover
  | 'maintenance'            // Post-completion maintenance

export interface FileMetadata {
  gpsLocation?: {
    latitude: number
    longitude: number
    accuracy?: number
  }
  weather?: {
    condition: string
    temperature: number
    humidity: number
    windSpeed: number
  }
  deviceInfo?: {
    camera: string
    software: string
    timestamp: Date
  }
  approvalStatus?: 'pending' | 'approved' | 'rejected' | 'requires_changes'
  approvedBy?: string
  approvalDate?: Date
  version: number
  isLatestVersion: boolean
}

// Interactive Timeline System
export interface ProjectTimeline {
  id: string
  projectId: string
  phases: TimelinePhase[]
  milestones: Milestone[]
  criticalPath: string[]
  startDate: Date
  plannedEndDate: Date
  actualEndDate?: Date
  weatherDelays: WeatherDelay[]
  createdAt: Date
  updatedAt: Date
}

export interface TimelinePhase {
  id: string
  phase: ConstructionPhase
  title: string
  description: string
  plannedStartDate: Date
  plannedEndDate: Date
  actualStartDate?: Date
  actualEndDate?: Date
  duration: number // in days
  dependencies: string[] // phase IDs
  status: PhaseStatus
  progress: number // 0-100
  tasks: Task[]
  assignedTeam: string[] // team member IDs
  weatherDependent: boolean
  inspectionRequired: boolean
  inspectionDate?: Date
  inspectionStatus?: 'pending' | 'passed' | 'failed' | 'rescheduled'
}

export type PhaseStatus = 
  | 'not_started'
  | 'in_progress'
  | 'on_hold'
  | 'completed'
  | 'delayed'
  | 'cancelled'

export interface Task {
  id: string
  title: string
  description?: string
  assignedTo: string[] // team member IDs
  status: 'pending' | 'in_progress' | 'completed' | 'blocked'
  priority: 'low' | 'medium' | 'high' | 'critical'
  estimatedHours: number
  actualHours?: number
  dependencies: string[] // task IDs
  dueDate: Date
  completedDate?: Date
}

export interface Milestone {
  id: string
  title: string
  description: string
  phase: ConstructionPhase
  type: MilestoneType
  plannedDate: Date
  actualDate?: Date
  status: 'pending' | 'achieved' | 'missed' | 'moved'
  importance: 'low' | 'medium' | 'high' | 'critical'
  dependencies: string[]
  inspectionRequired: boolean
  celebrationMessage?: string
}

export type MilestoneType = 
  | 'planning_approval'
  | 'building_control_approval'
  | 'construction_start'
  | 'foundation_complete'
  | 'frame_complete'
  | 'watertight'
  | 'first_fix_complete'
  | 'plastering_complete'
  | 'second_fix_complete'
  | 'practical_completion'
  | 'final_inspection'
  | 'handover'

// Team Communication System
export interface ProjectMessage {
  id: string
  projectId: string
  senderId: string
  sender: TeamMember
  recipientIds: string[]
  messageType: MessageType
  subject?: string
  content: string
  attachments: MessageAttachment[]
  relatedTaskId?: string
  relatedPhaseId?: string
  relatedFileId?: string
  priority: 'low' | 'normal' | 'high' | 'urgent'
  status: 'sent' | 'delivered' | 'read' | 'archived'
  readBy: MessageRead[]
  createdAt: Date
  updatedAt: Date
}

export type MessageType = 
  | 'general'           // General communication
  | 'task_update'       // Task progress updates
  | 'phase_update'      // Phase progress updates
  | 'issue_report'      // Problems or issues
  | 'approval_request'  // Requesting approvals
  | 'inspection_notice' // Inspection scheduling
  | 'safety_alert'      // Health and safety concerns
  | 'delivery_notice'   // Material delivery updates
  | 'weather_alert'     // Weather-related updates
  | 'emergency'         // Emergency communications

export interface MessageAttachment {
  id: string
  fileName: string
  fileUrl: string
  fileSize: number
  mimeType: string
}

export interface MessageRead {
  userId: string
  readAt: Date
}

// Progress Tracking System
export interface PhaseProgress {
  id: string
  projectId: string
  phase: ConstructionPhase
  overallProgress: number // 0-100
  taskProgress: TaskProgress[]
  qualityChecks: QualityCheck[]
  progressPhotos: ProgressPhoto[]
  weeklyReports: WeeklyReport[]
  issues: ProjectIssue[]
  achievements: PhaseAchievement[]
  updatedAt: Date
}

export interface TaskProgress {
  taskId: string
  taskName: string
  progress: number // 0-100
  status: 'not_started' | 'in_progress' | 'completed' | 'blocked'
  lastUpdated: Date
  notes?: string
}

export interface QualityCheck {
  id: string
  checkType: string
  description: string
  performedBy: string
  performedAt: Date
  status: 'pass' | 'fail' | 'requires_attention'
  notes?: string
  photos: string[]
  followUpRequired: boolean
}

export interface ProgressPhoto {
  id: string
  fileId: string
  location: {
    room?: string
    area: string
    coordinates?: { x: number; y: number }
  }
  beforeAfter?: 'before' | 'after'
  comparisonPhotoId?: string
  description?: string
  tags: string[]
  capturedAt: Date
  capturedBy: string
}

export interface WeeklyReport {
  id: string
  weekStarting: Date
  reportedBy: string
  summary: string
  accomplishments: string[]
  nextWeekPlan: string[]
  issues: string[]
  weatherImpact: string
  materialDeliveries: string[]
  teamOnSite: number
  hoursWorked: number
  budgetSpent: number
  photos: string[]
  createdAt: Date
}

// Budget Tracking System
export interface ProjectBudget {
  id: string
  projectId: string
  totalBudget: number
  totalSpent: number
  totalCommitted: number
  remainingBudget: number
  categories: BudgetCategory[]
  transactions: BudgetTransaction[]
  forecasts: BudgetForecast[]
  variances: BudgetVariance[]
  approvals: BudgetApproval[]
  updatedAt: Date
}

export interface BudgetCategory {
  id: string
  name: string
  type: UKConstructionCategory
  allocatedAmount: number
  spentAmount: number
  committedAmount: number
  remainingAmount: number
  contingency: number
  vatRate: number // UK VAT rates
  subCategories: BudgetSubCategory[]
}

export type UKConstructionCategory = 
  | 'professional_fees'      // Architect, structural engineer, etc.
  | 'planning_fees'          // Planning application, building control
  | 'site_preparation'       // Demolition, excavation, access
  | 'foundations'            // Concrete, steel, waterproofing
  | 'structure'              // Frame, walls, structural elements
  | 'roof'                   // Materials, labor, scaffolding
  | 'external_envelope'      // Windows, doors, insulation, cladding
  | 'mechanical_electrical'  // Plumbing, heating, electrical
  | 'internal_finishes'      // Flooring, decorating, kitchens, bathrooms
  | 'external_works'         // Landscaping, drives, boundaries
  | 'fixtures_fittings'      // Light fittings, hardware, furniture
  | 'contingency'            // Unexpected costs buffer
  | 'insurance'              // Site insurance, warranties
  | 'utilities'              // Connection fees, temporary supplies
  | 'waste_disposal'         // Skip hire, waste management
  | 'temporary_works'        // Scaffolding, site facilities

export interface BudgetSubCategory {
  id: string
  name: string
  allocatedAmount: number
  spentAmount: number
  description?: string
}

export interface BudgetTransaction {
  id: string
  categoryId: string
  subCategoryId?: string
  description: string
  amount: number
  vatAmount: number
  totalAmount: number
  type: 'expense' | 'commitment' | 'refund'
  status: 'pending' | 'approved' | 'paid' | 'disputed'
  supplier?: string
  invoiceNumber?: string
  receiptUrl?: string
  approvedBy?: string
  paidDate?: Date
  createdAt: Date
}

export interface BudgetForecast {
  id: string
  categoryId: string
  forecastDate: Date
  projectedSpend: number
  confidence: 'low' | 'medium' | 'high'
  assumptions: string[]
  createdAt: Date
}

export interface BudgetVariance {
  id: string
  categoryId: string
  budgetedAmount: number
  actualAmount: number
  variance: number
  variancePercentage: number
  explanation?: string
  actionRequired: boolean
  createdAt: Date
}

export interface BudgetApproval {
  id: string
  transactionId: string
  requestedBy: string
  approvedBy?: string
  amount: number
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  approvalDate?: Date
  notes?: string
}

// Weather Impact Tracking
export interface WeatherImpact {
  id: string
  projectId: string
  date: Date
  conditions: WeatherCondition
  impact: ImpactLevel
  affectedPhases: ConstructionPhase[]
  description: string
  delayDays: number
  additionalCosts: number
  mitigationActions: string[]
  photosVideoUrls: string[]
  createdBy: string
  createdAt: Date
}

export interface WeatherCondition {
  temperature: number
  humidity: number
  windSpeed: number
  precipitation: number
  condition: string // 'sunny', 'rainy', 'snowy', 'stormy', etc.
  visibility: number
  uvIndex: number
}

export type ImpactLevel = 'none' | 'minor' | 'moderate' | 'major' | 'severe'

export interface WeatherDelay {
  id: string
  startDate: Date
  endDate: Date
  reason: string
  affectedPhases: ConstructionPhase[]
  delayDays: number
  additionalCosts: number
  resolved: boolean
}

// UK Compliance System
export interface ComplianceChecklist {
  id: string
  projectId: string
  phase: ConstructionPhase
  checklistType: ComplianceType
  items: ComplianceItem[]
  overallStatus: 'pending' | 'in_progress' | 'completed' | 'non_compliant'
  completionPercentage: number
  lastUpdated: Date
  assignedInspector?: string
  scheduledInspectionDate?: Date
  actualInspectionDate?: Date
}

export type ComplianceType = 
  | 'building_regulations'   // Part A-P compliance
  | 'planning_conditions'    // Planning permission conditions
  | 'health_safety'          // CDM regulations, safety requirements
  | 'environmental'          // Environmental impact, waste disposal
  | 'energy_efficiency'      // Part L, SAP ratings, EPC
  | 'accessibility'          // Part M compliance
  | 'fire_safety'            // Part B compliance
  | 'structural'             // Structural calculations, inspections
  | 'warranty'               // NHBC, Premier Guarantee requirements

export interface ComplianceItem {
  id: string
  title: string
  description: string
  regulation: string // e.g., "Building Regulations Part L"
  requirement: string
  status: 'pending' | 'in_progress' | 'compliant' | 'non_compliant' | 'not_applicable'
  priority: 'low' | 'medium' | 'high' | 'critical'
  dueDate?: Date
  completedDate?: Date
  evidenceRequired: string[]
  evidenceProvided: string[] // file IDs
  notes?: string
  assignedTo?: string
  inspectionRequired: boolean
  certificationRequired: boolean
}

// Project Issues and Risk Management
export interface ProjectIssue {
  id: string
  projectId: string
  title: string
  description: string
  category: IssueCategory
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  reportedBy: string
  assignedTo?: string
  affectedPhases: ConstructionPhase[]
  impactOnTimeline: number // days
  impactOnBudget: number // pounds
  resolutionPlan?: string
  actualResolution?: string
  preventiveMeasures?: string[]
  photos: string[]
  createdAt: Date
  resolvedAt?: Date
}

export type IssueCategory = 
  | 'safety'
  | 'quality'
  | 'schedule'
  | 'budget'
  | 'design'
  | 'materials'
  | 'weather'
  | 'regulatory'
  | 'communication'
  | 'access'
  | 'utilities'
  | 'environmental'

export interface PhaseAchievement {
  id: string
  phaseId: string
  title: string
  description: string
  achievedDate: Date
  celebrationMessage: string
  photos: string[]
  teamMembers: string[]
  impactOnTimeline: string
  impactOnBudget: string
}

// Real-time Collaboration Features
export interface LiveUpdate {
  id: string
  projectId: string
  updateType: LiveUpdateType
  userId: string
  data: any
  timestamp: Date
}

export type LiveUpdateType = 
  | 'team_member_online'
  | 'team_member_offline'
  | 'file_uploaded'
  | 'message_sent'
  | 'task_updated'
  | 'phase_progress'
  | 'budget_updated'
  | 'timeline_changed'
  | 'issue_reported'
  | 'milestone_achieved'

export interface ActivityFeed {
  id: string
  projectId: string
  activities: Activity[]
  lastUpdated: Date
}

export interface Activity {
  id: string
  type: ActivityType
  userId: string
  user: User
  description: string
  metadata: any
  timestamp: Date
  isImportant: boolean
  relatedItems: string[]
}

export type ActivityType = 
  | 'project_created'
  | 'team_member_added'
  | 'file_uploaded' 
  | 'phase_started'
  | 'phase_completed'
  | 'milestone_achieved'
  | 'issue_reported'
  | 'issue_resolved'
  | 'budget_updated'
  | 'inspection_passed'
  | 'inspection_failed'
  | 'weather_delay'
  | 'delivery_received'
  | 'compliance_achieved'