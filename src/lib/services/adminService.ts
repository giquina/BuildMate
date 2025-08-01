// Admin Service for BuildMate Platform
import { 
  UserAnalytics, 
  RevenueAnalytics, 
  ProfessionalVerification, 
  SupportTicket, 
  SystemHealth,
  ABTest,
  SecurityEvent,
  APIUsage,
  ContentItem,
  AdminUser
} from '../../types/admin'

export class AdminService {
  private static instance: AdminService
  private baseUrl = '/api/admin'

  static getInstance(): AdminService {
    if (!AdminService.instance) {
      AdminService.instance = new AdminService()
    }
    return AdminService.instance
  }

  // User Analytics Methods
  async getUserAnalytics(timeRange: string = '30d'): Promise<UserAnalytics> {
    const response = await fetch(`${this.baseUrl}/analytics/users?timeRange=${timeRange}`)
    if (!response.ok) throw new Error('Failed to fetch user analytics')
    return response.json()
  }

  async getGeographicDistribution(): Promise<any[]> {
    const response = await fetch(`${this.baseUrl}/analytics/geographic`)
    if (!response.ok) throw new Error('Failed to fetch geographic data')
    return response.json()
  }

  async getConversionFunnels(): Promise<any[]> {
    const response = await fetch(`${this.baseUrl}/analytics/funnels`)
    if (!response.ok) throw new Error('Failed to fetch conversion funnels')
    return response.json()
  }

  // Revenue Analytics Methods
  async getRevenueAnalytics(timeRange: string = '30d'): Promise<RevenueAnalytics> {
    const response = await fetch(`${this.baseUrl}/analytics/revenue?timeRange=${timeRange}`)
    if (!response.ok) throw new Error('Failed to fetch revenue analytics')
    return response.json()
  }

  async getSubscriptionMetrics(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/analytics/subscriptions`)
    if (!response.ok) throw new Error('Failed to fetch subscription metrics')
    return response.json()
  }

  async getChurnAnalysis(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/analytics/churn`)
    if (!response.ok) throw new Error('Failed to fetch churn analysis')
    return response.json()
  }

  // Professional Verification Methods
  async getPendingVerifications(): Promise<ProfessionalVerification[]> {
    const response = await fetch(`${this.baseUrl}/professionals/verifications?status=pending`)
    if (!response.ok) throw new Error('Failed to fetch pending verifications')
    return response.json()
  }

  async approveVerification(verificationId: string, notes?: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/professionals/verifications/${verificationId}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes })
    })
    if (!response.ok) throw new Error('Failed to approve verification')
  }

  async rejectVerification(verificationId: string, reason: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/professionals/verifications/${verificationId}/reject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason })
    })
    if (!response.ok) throw new Error('Failed to reject verification')
  }

  async verifyDocument(documentId: string, verified: boolean): Promise<void> {
    const response = await fetch(`${this.baseUrl}/professionals/documents/${documentId}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ verified })
    })
    if (!response.ok) throw new Error('Failed to verify document')
  }

  // Support Ticket Methods
  async getSupportTickets(filters?: any): Promise<SupportTicket[]> {
    const queryParams = new URLSearchParams(filters).toString()
    const response = await fetch(`${this.baseUrl}/support/tickets?${queryParams}`)
    if (!response.ok) throw new Error('Failed to fetch support tickets')
    return response.json()
  }

  async assignTicket(ticketId: string, adminId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/support/tickets/${ticketId}/assign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId })
    })
    if (!response.ok) throw new Error('Failed to assign ticket')
  }

  async respondToTicket(ticketId: string, content: string, isInternal: boolean = false): Promise<void> {
    const response = await fetch(`${this.baseUrl}/support/tickets/${ticketId}/respond`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, isInternal })
    })
    if (!response.ok) throw new Error('Failed to respond to ticket')
  }

  async updateTicketStatus(ticketId: string, status: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/support/tickets/${ticketId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    if (!response.ok) throw new Error('Failed to update ticket status')
  }

  // Content Management Methods
  async getContentItems(type?: string, status?: string): Promise<ContentItem[]> {
    const params = new URLSearchParams()
    if (type) params.append('type', type)
    if (status) params.append('status', status)
    
    const response = await fetch(`${this.baseUrl}/content?${params.toString()}`)
    if (!response.ok) throw new Error('Failed to fetch content items')
    return response.json()
  }

  async createContentItem(item: Partial<ContentItem>): Promise<ContentItem> {
    const response = await fetch(`${this.baseUrl}/content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
    if (!response.ok) throw new Error('Failed to create content item')
    return response.json()
  }

  async updateContentItem(id: string, updates: Partial<ContentItem>): Promise<ContentItem> {
    const response = await fetch(`${this.baseUrl}/content/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    })
    if (!response.ok) throw new Error('Failed to update content item')
    return response.json()
  }

  async publishContent(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/content/${id}/publish`, {
      method: 'POST'
    })
    if (!response.ok) throw new Error('Failed to publish content')
  }

  // System Health Methods
  async getSystemHealth(): Promise<SystemHealth> {
    const response = await fetch(`${this.baseUrl}/system/health`)
    if (!response.ok) throw new Error('Failed to fetch system health')
    return response.json()
  }

  async getErrorLogs(timeRange: string = '1h'): Promise<any[]> {
    const response = await fetch(`${this.baseUrl}/system/errors?timeRange=${timeRange}`)
    if (!response.ok) throw new Error('Failed to fetch error logs')
    return response.json()
  }

  async getAuditLogs(filters?: any): Promise<any[]> {
    const queryParams = new URLSearchParams(filters).toString()
    const response = await fetch(`${this.baseUrl}/system/audit?${queryParams}`)
    if (!response.ok) throw new Error('Failed to fetch audit logs')
    return response.json()
  }

  // A/B Testing Methods
  async getABTests(): Promise<ABTest[]> {
    const response = await fetch(`${this.baseUrl}/testing/experiments`)
    if (!response.ok) throw new Error('Failed to fetch A/B tests')
    return response.json()
  }

  async createABTest(test: Partial<ABTest>): Promise<ABTest> {
    const response = await fetch(`${this.baseUrl}/testing/experiments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(test)
    })
    if (!response.ok) throw new Error('Failed to create A/B test')
    return response.json()
  }

  async startABTest(testId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/testing/experiments/${testId}/start`, {
      method: 'POST'
    })
    if (!response.ok) throw new Error('Failed to start A/B test')
  }

  async stopABTest(testId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/testing/experiments/${testId}/stop`, {
      method: 'POST'
    })
    if (!response.ok) throw new Error('Failed to stop A/B test')
  }

  async getABTestResults(testId: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/testing/experiments/${testId}/results`)
    if (!response.ok) throw new Error('Failed to fetch A/B test results')
    return response.json()
  }

  // Security & Fraud Methods
  async getSecurityEvents(timeRange: string = '24h'): Promise<SecurityEvent[]> {
    const response = await fetch(`${this.baseUrl}/security/events?timeRange=${timeRange}`)
    if (!response.ok) throw new Error('Failed to fetch security events')
    return response.json()
  }

  async getFraudIndicators(): Promise<any[]> {
    const response = await fetch(`${this.baseUrl}/security/fraud`)
    if (!response.ok) throw new Error('Failed to fetch fraud indicators')
    return response.json()
  }

  async blockIP(ipAddress: string, reason: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/security/block-ip`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ipAddress, reason })
    })
    if (!response.ok) throw new Error('Failed to block IP address')
  }

  async suspendUser(userId: string, reason: string, duration?: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/security/suspend-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, reason, duration })
    })
    if (!response.ok) throw new Error('Failed to suspend user')
  }

  // API Usage Methods
  async getAPIUsage(timeRange: string = '24h'): Promise<APIUsage[]> {
    const response = await fetch(`${this.baseUrl}/api/usage?timeRange=${timeRange}`)
    if (!response.ok) throw new Error('Failed to fetch API usage')
    return response.json()
  }

  async updateRateLimit(endpoint: string, limits: any): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/rate-limits/${encodeURIComponent(endpoint)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(limits)
    })
    if (!response.ok) throw new Error('Failed to update rate limit')
  }

  // User Management Methods
  async getAllUsers(filters?: any): Promise<AdminUser[]> {
    const queryParams = new URLSearchParams(filters).toString()
    const response = await fetch(`${this.baseUrl}/users?${queryParams}`)
    if (!response.ok) throw new Error('Failed to fetch users')
    return response.json()
  }

  async updateUserStatus(userId: string, status: 'active' | 'suspended' | 'banned'): Promise<void> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    if (!response.ok) throw new Error('Failed to update user status')
  }

  async resetUserPassword(userId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/reset-password`, {
      method: 'POST'
    })
    if (!response.ok) throw new Error('Failed to reset user password')
  }

  // Advanced Analytics Methods
  async runCustomQuery(query: string, parameters?: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/analytics/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, parameters })
    })
    if (!response.ok) throw new Error('Failed to run custom query')
    return response.json()
  }

  async exportData(type: string, format: 'csv' | 'json' | 'xlsx', filters?: any): Promise<Blob> {
    const queryParams = new URLSearchParams({ type, format, ...filters }).toString()
    const response = await fetch(`${this.baseUrl}/export?${queryParams}`)
    if (!response.ok) throw new Error('Failed to export data')
    return response.blob()
  }

  // Dashboard Configuration Methods
  async getDashboardLayouts(): Promise<any[]> {
    const response = await fetch(`${this.baseUrl}/dashboard/layouts`)
    if (!response.ok) throw new Error('Failed to fetch dashboard layouts')
    return response.json()
  }

  async saveDashboardLayout(layout: any): Promise<void> {
    const response = await fetch(`${this.baseUrl}/dashboard/layouts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(layout)
    })
    if (!response.ok) throw new Error('Failed to save dashboard layout')
  }
}