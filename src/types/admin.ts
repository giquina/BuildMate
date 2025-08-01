// Admin Dashboard Types for BuildMate Platform
import { User, Project, Professional, Material, Quote } from './index'

// Admin User Management
export interface AdminUser extends User {
  role: 'super_admin' | 'admin' | 'moderator' | 'support'
  permissions: AdminPermission[]
  lastLogin: string
  loginCount: number
  isActive: boolean
}

export interface AdminPermission {
  id: string
  name: string
  module: AdminModule
  actions: ('create' | 'read' | 'update' | 'delete' | 'approve' | 'verify')[]
}

export type AdminModule = 
  | 'users'
  | 'professionals' 
  | 'content'
  | 'analytics'
  | 'financial'
  | 'support'
  | 'system'
  | 'security'

// Analytics & Metrics
export interface UserAnalytics {
  totalUsers: number
  activeUsers: number
  newRegistrations: AnalyticsTimeSeries
  userEngagement: EngagementMetrics
  retention: RetentionMetrics
  geographicDistribution: GeographicData[]
  deviceAnalytics: DeviceUsageData
  conversionFunnels: ConversionFunnel[]
}

export interface AnalyticsTimeSeries {
  period: 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year'
  data: TimeSeriesPoint[]
}

export interface TimeSeriesPoint {
  timestamp: string
  value: number
  metadata?: Record<string, any>
}

export interface EngagementMetrics {
  averageSessionDuration: number
  pagesPerSession: number
  bounceRate: number
  returnVisitorRate: number
  featureUsage: FeatureUsageData[]
}

export interface FeatureUsageData {
  featureName: string
  usageCount: number
  uniqueUsers: number
  conversionRate: number
  lastUsed: string
}

export interface RetentionMetrics {
  day1: number
  day7: number
  day30: number
  day90: number
  cohortAnalysis: CohortData[]
}

export interface CohortData {
  cohortDate: string
  userCount: number
  retentionByDay: Record<number, number>
}

export interface GeographicData {
  region: string
  postcode?: string
  userCount: number
  projectCount: number
  revenue: number
  coordinates?: { lat: number; lng: number }
}

export interface DeviceUsageData {
  mobile: number
  desktop: number
  tablet: number
  operatingSystems: Record<string, number>
  browsers: Record<string, number>
}

// Conversion Funnels
export interface ConversionFunnel {
  id: string
  name: string
  steps: FunnelStep[]
  conversionRate: number
  dropoffPoints: DropoffAnalysis[]
}

export interface FunnelStep {
  name: string
  description: string
  users: number
  conversionRate: number
  averageTimeToNext?: number
}

export interface DropoffAnalysis {
  stepName: string
  dropoffRate: number
  commonReasons: string[]
  suggestedImprovements: string[]
}

// Revenue Analytics
export interface RevenueAnalytics {
  totalRevenue: number
  recurringRevenue: number
  oneTimeRevenue: number
  revenueByTier: SubscriptionTierRevenue[]
  revenueGrowth: AnalyticsTimeSeries
  forecasting: RevenueForecasting
  churnAnalysis: ChurnAnalysis
  customerLifetimeValue: CLVAnalysis
}

export interface SubscriptionTierRevenue {
  tier: 'free' | 'pro' | 'enterprise'
  revenue: number
  userCount: number
  averageRevenuePerUser: number
  churnRate: number
}

export interface RevenueForecasting {
  nextMonth: number
  nextQuarter: number
  nextYear: number
  confidence: number
  assumptions: string[]
}

export interface ChurnAnalysis {
  monthlyChurnRate: number
  churnByTier: Record<string, number>
  churnReasons: ChurnReason[]
  preventionOpportunities: string[]
}

export interface ChurnReason {
  reason: string
  percentage: number
  impact: 'low' | 'medium' | 'high'
}

export interface CLVAnalysis {
  averageCLV: number
  clvByTier: Record<string, number>
  paybackPeriod: number
  factors: CLVFactor[]
}

export interface CLVFactor {
  factor: string
  impact: number
  correlation: number
}

// Professional Management
export interface ProfessionalVerification {
  id: string
  professionalId: string
  professional: Professional
  status: 'pending' | 'in_review' | 'approved' | 'rejected' | 'expired'
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  documents: VerificationDocument[]
  verificationChecks: VerificationCheck[]
  notes: VerificationNote[]
}

export interface VerificationDocument {
  id: string
  type: 'insurance' | 'certification' | 'license' | 'portfolio' | 'reference'
  filename: string
  url: string
  uploadedAt: string
  verified: boolean
  expiryDate?: string
}

export interface VerificationCheck {
  id: string
  type: 'insurance_check' | 'certification_validation' | 'reference_call' | 'background_check'
  status: 'pending' | 'completed' | 'failed'
  result?: any
  completedAt?: string
  notes?: string
}

export interface VerificationNote {
  id: string
  adminId: string
  adminName: string
  note: string
  type: 'general' | 'concern' | 'approval' | 'rejection'
  createdAt: string
}

// Content Management
export interface ContentItem {
  id: string
  type: 'guide' | 'material' | 'professional_profile' | 'case_study' | 'faq'
  title: string
  content: string
  status: 'draft' | 'review' | 'published' | 'archived'
  author: string
  publishedAt?: string
  updatedAt: string
  metadata: ContentMetadata
  seoData: SEOData
}

export interface ContentMetadata {
  tags: string[]
  category: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  estimatedReadTime?: number
  featured: boolean
  priority: number
}

export interface SEOData {
  metaTitle: string
  metaDescription: string
  keywords: string[]
  canonicalUrl?: string
}

// Support System
export interface SupportTicket {
  id: string
  userId: string
  user: User
  subject: string
  description: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: 'technical' | 'billing' | 'account' | 'professional' | 'general'
  assignedTo?: string
  assignedAdmin?: AdminUser
  createdAt: string
  updatedAt: string
  responses: TicketResponse[]
  tags: string[]
  satisfaction?: number
}

export interface TicketResponse {
  id: string
  ticketId: string
  authorId: string
  author: User | AdminUser
  content: string
  isInternal: boolean
  attachments: TicketAttachment[]
  createdAt: string
}

export interface TicketAttachment {
  id: string
  filename: string
  url: string
  size: number
  mimeType: string
}

// System Health & Monitoring
export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical'
  uptime: number
  lastChecked: string
  services: ServiceHealth[]
  metrics: SystemMetrics
  alerts: SystemAlert[]
}

export interface ServiceHealth {
  name: string
  status: 'up' | 'down' | 'degraded'
  responseTime: number
  lastChecked: string
  uptime: number
}

export interface SystemMetrics {
  apiRequests: AnalyticsTimeSeries
  errorRates: AnalyticsTimeSeries
  responseTimes: AnalyticsTimeSeries
  databasePerformance: DatabaseMetrics
  cdn: CDNMetrics
}

export interface DatabaseMetrics {
  connectionPoolSize: number
  activeConnections: number
  queryPerformance: QueryPerformanceData[]
  slowQueries: SlowQuery[]
}

export interface QueryPerformanceData {
  query: string
  averageExecutionTime: number
  executionCount: number
  lastExecuted: string
}

export interface SlowQuery {
  query: string
  executionTime: number
  timestamp: string
  database: string
}

export interface CDNMetrics {
  hitRate: number
  bandwidth: number
  requestCount: number
  topPages: PageMetric[]
}

export interface PageMetric {
  page: string
  requests: number
  bandwidth: number
  averageLoadTime: number
}

export interface SystemAlert {
  id: string
  severity: 'info' | 'warning' | 'error' | 'critical'
  title: string
  description: string
  component: string
  timestamp: string
  resolved: boolean
  resolvedAt?: string
  actions: AlertAction[]
}

export interface AlertAction {
  name: string
  url?: string
  type: 'link' | 'button' | 'api_call'
}

// A/B Testing Framework
export interface ABTest {
  id: string
  name: string
  description: string
  status: 'draft' | 'running' | 'paused' | 'completed' | 'archived'
  startDate: string
  endDate?: string
  targetAudience: AudienceFilter
  variants: TestVariant[]
  metrics: TestMetric[]
  results?: TestResults
  statisticalSignificance?: number
  winner?: string
}

export interface AudienceFilter {
  userSegments: string[]
  geographicRegions: string[]
  subscriptionTiers: string[]
  deviceTypes: string[]
  percentage: number
}

export interface TestVariant {
  id: string
  name: string
  description: string
  trafficPercentage: number
  configuration: Record<string, any>
}

export interface TestMetric {
  name: string
  type: 'conversion' | 'engagement' | 'revenue' | 'retention'
  primary: boolean
  target?: number
}

export interface TestResults {
  variant: string
  metrics: MetricResult[]
  userCount: number
  conversionRate: number
  confidence: number
}

export interface MetricResult {
  metricName: string
  value: number
  improvement: number
  significance: number
}

// Security & Fraud Detection
export interface SecurityEvent {
  id: string
  type: 'login_attempt' | 'failed_login' | 'suspicious_activity' | 'data_access' | 'permission_change'
  severity: 'low' | 'medium' | 'high' | 'critical'
  userId?: string
  ipAddress: string
  userAgent: string
  location?: string
  description: string
  timestamp: string
  resolved: boolean
  actions: SecurityAction[]
}

export interface SecurityAction {
  action: 'block_ip' | 'suspend_user' | 'require_2fa' | 'notify_admin' | 'log_only'
  timestamp: string
  adminId?: string
  notes?: string
}

export interface FraudIndicator {
  id: string
  type: 'unusual_login' | 'multiple_accounts' | 'payment_fraud' | 'content_abuse'
  userId: string
  confidence: number
  indicators: string[]
  recommendation: 'monitor' | 'investigate' | 'suspend' | 'ban'
  createdAt: string
}

// API Usage & Rate Limiting
export interface APIUsage {
  endpoint: string
  requestCount: number
  uniqueUsers: number
  averageResponseTime: number
  errorRate: number
  rateLimitHits: number
  lastAccessed: string
}

export interface RateLimitConfig {
  endpoint: string
  requestsPerMinute: number
  requestsPerHour: number
  requestsPerDay: number
  userTierLimits: Record<string, number>
  burstAllowance: number
}

// Dashboard Configuration
export interface DashboardWidget {
  id: string
  type: 'chart' | 'metric' | 'table' | 'alert' | 'custom'
  title: string
  position: { x: number; y: number; w: number; h: number }
  configuration: Record<string, any>
  refreshInterval?: number
  permissions: string[]
}

export interface DashboardLayout {
  id: string
  name: string
  widgets: DashboardWidget[]
  isDefault: boolean
  adminId: string
  shared: boolean
}

// Advanced Analytics Queries
export interface AnalyticsQuery {
  id: string
  name: string
  description: string
  query: string
  parameters: QueryParameter[]
  schedule?: QuerySchedule
  results?: QueryResult[]
  lastRun?: string
}

export interface QueryParameter {
  name: string
  type: 'string' | 'number' | 'date' | 'boolean'
  required: boolean
  defaultValue?: any
}

export interface QuerySchedule {
  frequency: 'hourly' | 'daily' | 'weekly' | 'monthly'
  time?: string
  daysOfWeek?: number[]
  enabled: boolean
}

export interface QueryResult {
  timestamp: string
  data: Record<string, any>[]
  executionTime: number
  success: boolean
  error?: string
}