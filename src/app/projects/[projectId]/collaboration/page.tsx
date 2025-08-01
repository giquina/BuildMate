'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { AnimatedProgressBar } from '@/components/ui/AnimatedProgressBar'
import { formatCurrency } from '@/lib/uk-utils'
import { useUser } from '@/contexts/UserContext'
import { 
  Users, 
  MessageCircle, 
  FileText, 
  Calendar, 
  Camera, 
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  Upload,
  Download,
  Bell,
  Settings,
  Shield,
  Eye,
  Edit3,
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  Activity,
  Target,
  Zap,
  CloudRain,
  Truck,
  MapPin,
  Phone,
  Video,
  Mail,
  Star,
  Award,
  Bookmark,
  Share2,
  Archive,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  Info,
  ExternalLink,
  Image as ImageIcon,
  Paperclip,
  Send,
  Trash2,
  RefreshCw,
  BarChart3,
  PieChart,
  Gauge,
  Building,
  Hammer,
  HardHat,
  ShieldCheck
} from 'lucide-react'
import type { 
  ProjectCollaboration, 
  TeamMember, 
  ProjectFile, 
  ProjectTimeline, 
  ProjectMessage,
  PhaseProgress,
  ProjectBudget,
  WeatherImpact,
  ComplianceChecklist,
  ProjectIssue,
  Activity as ActivityType,
  TeamRole,
  ConstructionPhase,
  FileCategory
} from '@/types/project-management'

// Mock data for the collaboration dashboard
const mockProjectCollaboration: ProjectCollaboration = {
  id: 'collab_1',
  projectId: 'proj_1',
  teamMembers: [
    {
      id: 'tm_1',
      userId: 'user_owner',
      user: {
        id: 'user_owner',
        name: 'Sarah Johnson',
        email: 'sarah@email.com',
        avatar: '/avatars/sarah.jpg',
        subscription: 'pro',
        preferences: {} as any,
        createdAt: new Date(),
        lastLoginAt: new Date()
      },
      role: 'project_owner',
      permissions: {
        canViewProject: true,
        canEditProject: true,
        canManageTeam: true,
        canUploadFiles: true,
        canViewFinancials: true,
        canEditBudget: true,
        canManageTimeline: true,
        canMessageTeam: true,
        canViewDocuments: true,
        canApproveChanges: true
      },
      specialties: ['Project Management'],
      joinedAt: new Date('2024-01-15'),
      status: 'active',
      contactInfo: {
        email: 'sarah@email.com',
        phone: '+44 7700 900123'
      }
    },
    {
      id: 'tm_2',
      userId: 'user_builder',
      user: {
        id: 'user_builder',
        name: 'James Mitchell',
        email: 'james@buildpro.co.uk',
        avatar: '/avatars/james.jpg',
        subscription: 'pro',
        preferences: {} as any,
        createdAt: new Date(),
        lastLoginAt: new Date()
      },
      role: 'main_contractor',
      permissions: {
        canViewProject: true,
        canEditProject: false,
        canManageTeam: false,
        canUploadFiles: true,
        canViewFinancials: true,
        canEditBudget: false,
        canManageTimeline: true,
        canMessageTeam: true,
        canViewDocuments: true,
        canApproveChanges: false
      },
      specialties: ['General Building', 'Project Management'],  
      joinedAt: new Date('2024-01-20'),
      status: 'active',
      contactInfo: {
        email: 'james@buildpro.co.uk',
        phone: '+44 7700 900456',
        emergencyContact: '+44 1234 567890'
      },
      location: {
        postcode: 'KT21 2AB',
        address: 'BuildPro Construction Ltd, Surrey'
      }
    },
    {
      id: 'tm_3',
      userId: 'user_architect',
      user: {
        id: 'user_architect',
        name: 'Emma Williams',
        email: 'emma@architectsltd.co.uk',
        avatar: '/avatars/emma.jpg',
        subscription: 'enterprise',
        preferences: {} as any,
        createdAt: new Date(),
        lastLoginAt: new Date()
      },
      role: 'architect',
      permissions: {
        canViewProject: true,
        canEditProject: true,
        canManageTeam: false,
        canUploadFiles: true,
        canViewFinancials: false,
        canEditBudget: false,
        canManageTimeline: true,
        canMessageTeam: true,
        canViewDocuments: true,
        canApproveChanges: true
      },
      specialties: ['Residential Design', 'Planning Applications'],
      joinedAt: new Date('2024-01-18'),
      status: 'active',
      contactInfo: {
        email: 'emma@architectsltd.co.uk',  
        phone: '+44 7700 900789'
      }
    },
    {
      id: 'tm_4',
      userId: 'user_inspector',
      user: {
        id: 'user_inspector',
        name: 'David Thompson',
        email: 'david@surreybuildingcontrol.gov.uk',
        avatar: '/avatars/david.jpg',
        subscription: 'free',
        preferences: {} as any,
        createdAt: new Date(),
        lastLoginAt: new Date()
      },
      role: 'building_inspector',
      permissions: {
        canViewProject: true,
        canEditProject: false,
        canManageTeam: false,
        canUploadFiles: true,
        canViewFinancials: false,
        canEditBudget: false,
        canManageTimeline: false,
        canMessageTeam: true,
        canViewDocuments: true,
        canApproveChanges: true
      },
      specialties: ['Building Control', 'Compliance Inspections'],
      joinedAt: new Date('2024-02-01'),
      status: 'active',
      contactInfo: {
        email: 'david@surreybuildingcontrol.gov.uk',
        phone: '+44 1372 474000'
      }
    }
  ],
  permissions: {} as any,
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date()
}

const mockRecentFiles: ProjectFile[] = [
  {
    id: 'file_1',
    projectId: 'proj_1',
    uploadedBy: 'tm_3',
    fileName: 'planning-application-drawings-v2.pdf',
    originalName: 'Planning Application Drawings v2.pdf',
    fileSize: 2547000,
    mimeType: 'application/pdf',
    category: 'planning_documents',
    phase: 'planning_permission',
    description: 'Updated planning application drawings with revisions',
    tags: ['planning', 'drawings', 'revised'],
    url: '/files/planning-application-drawings-v2.pdf',
    isPublic: false,
    metadata: {
      version: 2,
      isLatestVersion: true,
      approvalStatus: 'pending'
    },
    createdAt: new Date('2024-07-22'),
    updatedAt: new Date('2024-07-22')
  },
  {
    id: 'file_2', 
    projectId: 'proj_1',
    uploadedBy: 'tm_2',
    fileName: 'foundation-progress-photos-july.zip',
    originalName: 'Foundation Progress Photos - July.zip',
    fileSize: 15680000,
    mimeType: 'application/zip',
    category: 'progress_photos',
    phase: 'foundations',
    description: 'Weekly progress photos showing foundation work completion',
    tags: ['progress', 'foundation', 'july', 'photos'],
    url: '/files/foundation-progress-photos-july.zip',
    thumbnailUrl: '/thumbnails/foundation-progress-july.jpg',
    isPublic: true,
    metadata: {
      gpsLocation: {
        latitude: 51.2978,
        longitude: -0.3370,
        accuracy: 5
      },
      weather: {
        condition: 'sunny',
        temperature: 22,
        humidity: 65,
        windSpeed: 8
      },
      version: 1,
      isLatestVersion: true
    },
    createdAt: new Date('2024-07-21'),
    updatedAt: new Date('2024-07-21')
  },
  {
    id: 'file_3',
    projectId: 'proj_1', 
    uploadedBy: 'tm_4',
    fileName: 'building-control-inspection-report.pdf',
    originalName: 'Building Control Inspection Report.pdf',
    fileSize: 890000,
    mimeType: 'application/pdf',
    category: 'building_control',
    phase: 'foundations',
    description: 'Foundation inspection report - PASSED',
    tags: ['inspection', 'building-control', 'foundation', 'passed'],
    url: '/files/building-control-inspection-report.pdf',
    isPublic: false,
    metadata: {
      version: 1,
      isLatestVersion: true,
      approvalStatus: 'approved',
      approvedBy: 'tm_4',
      approvalDate: new Date('2024-07-20')
    },
    createdAt: new Date('2024-07-20'),
    updatedAt: new Date('2024-07-20')
  }
]

const mockRecentMessages: ProjectMessage[] = [
  {
    id: 'msg_1',
    projectId: 'proj_1',
    senderId: 'tm_2',
    sender: mockProjectCollaboration.teamMembers[1],
    recipientIds: ['tm_1', 'tm_3', 'tm_4'],
    messageType: 'phase_update',
    subject: 'Foundation Work Completed Successfully',
    content: 'Happy to report that foundation work is now complete and has passed building control inspection. Ready to begin frame installation next week. Weather forecast looks good!',
    attachments: [
      {
        id: 'att_1',
        fileName: 'foundation-complete.jpg',
        fileUrl: '/attachments/foundation-complete.jpg',
        fileSize: 2100000,
        mimeType: 'image/jpeg'
      }
    ],
    relatedPhaseId: 'phase_foundations',
    priority: 'high',
    status: 'delivered',
    readBy: [
      { userId: 'tm_1', readAt: new Date('2024-07-23T09:15:00Z') },
      { userId: 'tm_3', readAt: new Date('2024-07-23T09:30:00Z') }
    ],
    createdAt: new Date('2024-07-23T08:00:00Z'),
    updatedAt: new Date('2024-07-23T08:00:00Z')
  },
  {
    id: 'msg_2',
    projectId: 'proj_1',
    senderId: 'tm_3',
    sender: mockProjectCollaboration.teamMembers[2],
    recipientIds: ['tm_1', 'tm_2'],
    messageType: 'approval_request',
    subject: 'Window Specification Change Request',
    content: 'Client has requested to upgrade window specifications to triple glazing. This will add £3,500 to the budget but improve energy efficiency significantly. Please review and approve.',
    attachments: [
      {
        id: 'att_2',
        fileName: 'window-upgrade-spec.pdf',
        fileUrl: '/attachments/window-upgrade-spec.pdf',
        fileSize: 1200000,
        mimeType: 'application/pdf'
      }
    ],
    priority: 'normal',
    status: 'delivered',
    readBy: [
      { userId: 'tm_1', readAt: new Date('2024-07-22T16:45:00Z') }
    ],
    createdAt: new Date('2024-07-22T14:30:00Z'),
    updatedAt: new Date('2024-07-22T14:30:00Z')
  }
]

const mockCurrentIssues: ProjectIssue[] = [
  {
    id: 'issue_1',
    projectId: 'proj_1',
    title: 'Neighbor Access Concern',
    description: 'Neighbor has raised concerns about crane access through their property. Need to coordinate alternative solution.',
    category: 'access',
    severity: 'medium',
    status: 'in_progress',
    reportedBy: 'tm_2',
    assignedTo: 'tm_1',
    affectedPhases: ['structure'],
    impactOnTimeline: 2,
    impactOnBudget: 800,
    resolutionPlan: 'Meeting scheduled with neighbor and alternative crane positioning being assessed',
    photos: [],
    createdAt: new Date('2024-07-22'),
    resolvedAt: undefined
  },
  {
    id: 'issue_2',
    projectId: 'proj_1',
    title: 'Material Delivery Delay',
    description: 'Steel frame delivery delayed by 3 days due to supplier production issues.',
    category: 'materials',
    severity: 'low',
    status: 'resolved',
    reportedBy: 'tm_2',
    assignedTo: 'tm_2',
    affectedPhases: ['structure'],
    impactOnTimeline: 3,
    impactOnBudget: 0,
    actualResolution: 'Alternative local supplier found, delivery rescheduled for Friday',
    photos: [],
    createdAt: new Date('2024-07-18'),
    resolvedAt: new Date('2024-07-19')
  }
]

const mockComplianceStatus = {
  building_regulations: 85,
  planning_conditions: 100,
  health_safety: 92,
  energy_efficiency: 78
}

export default function ProjectCollaborationPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isAuthenticated } = useUser()
  const [activeTab, setActiveTab] = useState<'overview' | 'team' | 'files' | 'timeline' | 'messages' | 'progress' | 'budget' | 'compliance'>('overview')
  const [showNewMessageModal, setShowNewMessageModal] = useState(false)
  const [showFileUploadModal, setShowFileUploadModal] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadCategory, setUploadCategory] = useState<FileCategory>('progress_photos')
  const [uploadPhase, setUploadPhase] = useState<ConstructionPhase>('foundations')

  // Get current user's team member info
  const currentUserTeamMember = mockProjectCollaboration.teamMembers.find(
    tm => tm.userId === user?.id
  ) || mockProjectCollaboration.teamMembers[0] // Fallback to project owner

  const projectId = params.projectId as string

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">Please log in to access project collaboration.</p>
          <Button onClick={() => router.push('/')}>Go to Home</Button>
        </div>
      </div>
    )
  }

  const handleFileUpload = useCallback((files: File[]) => {
    setSelectedFiles(files)
    // In a real implementation, this would upload to cloud storage
    console.log('Uploading files:', files)
    setShowFileUploadModal(false)
    setSelectedFiles([])
  }, [])

  const getTeamMemberStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'invited': return 'bg-yellow-100 text-yellow-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleIcon = (role: TeamRole) => {
    switch (role) {
      case 'project_owner': return Users
      case 'project_manager': return Target
      case 'architect': return Building
      case 'main_contractor': return Hammer
      case 'subcontractor': return HardHat
      case 'building_inspector': return ShieldCheck
      case 'consultant': return Award
      case 'supplier': return Truck
      case 'observer': return Eye
      default: return Users
    }
  }

  const getFileIcon = (category: FileCategory) => {
    switch (category) {
      case 'progress_photos': return Camera
      case 'planning_documents': return FileText
      case 'building_control': return ShieldCheck
      case 'certificates': return Award
      case 'invoices_receipts': return FileText
      default: return FileText
    }
  }

  const getIssueIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return AlertTriangle
      case 'high': return AlertCircle
      case 'medium': return Info
      case 'low': return CheckCircle
      default: return Info
    }
  }

  const getIssueColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200'
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Project Collaboration</h1>
              <p className="text-gray-600">Kitchen Extension • Surrey Hills, KT21</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button 
                onClick={() => setShowNewMessageModal(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                New Message
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowFileUploadModal(true)}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'team', label: 'Team', icon: Users },
              { id: 'files', label: 'Files', icon: FileText },
              { id: 'timeline', label: 'Timeline', icon: Calendar },
              { id: 'messages', label: 'Messages', icon: MessageCircle },
              { id: 'progress', label: 'Progress', icon: TrendingUp },
              { id: 'budget', label: 'Budget', icon: BarChart3 },
              { id: 'compliance', label: 'Compliance', icon: ShieldCheck }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Overview */}
            <div className="lg:col-span-2 space-y-6">
              {/* Project Health Dashboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Gauge className="h-5 w-5" />
                    <span>Project Health Dashboard</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">87%</div>
                      <div className="text-sm text-green-700">Overall Health</div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">15%</div>
                      <div className="text-sm text-blue-700">Complete</div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600">2</div>
                      <div className="text-sm text-yellow-700">Active Issues</div>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">4</div>
                      <div className="text-sm text-purple-700">Team Members</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Foundation Phase</span>
                        <span>100%</span>
                      </div>
                      <AnimatedProgressBar value={100} color="green" size="sm" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Structure Phase</span>
                        <span>25%</span>
                      </div>
                      <AnimatedProgressBar value={25} color="blue" size="sm" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Budget Utilization</span>
                        <span>15%</span>
                      </div>
                      <AnimatedProgressBar value={15} color="orange" size="sm" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Foundation inspection passed</p>
                      <p className="text-xs text-gray-500">Building Control approved foundation work • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Upload className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Progress photos uploaded</p>
                      <p className="text-xs text-gray-500">James Mitchell uploaded 12 photos • 4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Planning drawings updated</p>
                      <p className="text-xs text-gray-500">Emma Williams shared revised plans • 1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Current Issues */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Current Issues</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Report Issue
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockCurrentIssues.map((issue) => {
                    const IssueIcon = getIssueIcon(issue.severity)
                    return (
                      <div 
                        key={issue.id} 
                        className={`p-3 rounded-lg border ${getIssueColor(issue.severity)}`}
                      >
                        <div className="flex items-start space-x-3">
                          <IssueIcon className="h-5 w-5 mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium">{issue.title}</h4>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-60">
                                  {issue.severity}
                                </span>
                                <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-60">
                                  {issue.status.replace('_', ' ')}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm mb-2">{issue.description}</p>
                            {issue.resolutionPlan && (
                              <p className="text-xs"><strong>Plan:</strong> {issue.resolutionPlan}</p>
                            )}
                            <div className="flex items-center justify-between mt-2 text-xs">
                              <span>Impact: +{issue.impactOnTimeline} days, +{formatCurrency(issue.impactOnBudget)}</span>
                              <span>Reported {issue.createdAt.toLocaleDateString('en-GB')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Team Members Online</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">3 of 4</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Files Uploaded Today</span>
                    <span className="text-sm font-medium">7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Messages Today</span>
                    <span className="text-sm font-medium">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tasks Completed</span>
                    <span className="text-sm font-medium text-green-600">8/15</span>
                  </div>
                </CardContent>
              </Card>

              {/* Compliance Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ShieldCheck className="h-5 w-5" />
                    <span>Compliance Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Building Regulations</span>
                      <span>{mockComplianceStatus.building_regulations}%</span>
                    </div>
                    <AnimatedProgressBar 
                      value={mockComplianceStatus.building_regulations} 
                      color="green" 
                      size="sm" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Planning Conditions</span>
                      <span>{mockComplianceStatus.planning_conditions}%</span>
                    </div>
                    <AnimatedProgressBar 
                      value={mockComplianceStatus.planning_conditions} 
                      color="green" 
                      size="sm" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Health & Safety</span>
                      <span>{mockComplianceStatus.health_safety}%</span>
                    </div>
                    <AnimatedProgressBar 
                      value={mockComplianceStatus.health_safety} 
                      color="yellow" 
                      size="sm" 
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Energy Efficiency</span>
                      <span>{mockComplianceStatus.energy_efficiency}%</span>
                    </div>
                    <AnimatedProgressBar 
                      value={mockComplianceStatus.energy_efficiency} 
                      color="orange" 
                      size="sm" 
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Recent Files */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Recent Files</span>
                    </div>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockRecentFiles.slice(0, 3).map((file) => {
                    const FileIcon = getFileIcon(file.category)
                    return (
                      <div key={file.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                          <FileIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {file.originalName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(file.fileSize / 1024 / 1024).toFixed(1)} MB • {file.createdAt.toLocaleDateString('en-GB')}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Weather Impact */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CloudRain className="h-5 w-5" />
                    <span>Weather Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Current Conditions</span>
                    <span className="text-sm font-medium text-green-600">Favorable</span>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="text-lg">☀️</div>
                      <div>
                        <p className="text-sm font-medium">Sunny, 22°C</p>
                        <p className="text-xs text-gray-600">Perfect for concrete work</p>
                      </div>
                    </div>
                    <p className="text-xs text-green-700">
                      Next 5 days: Ideal construction weather
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Team Members</span>
                    </CardTitle>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Invite Member
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {mockProjectCollaboration.teamMembers.map((member) => {
                      const RoleIcon = getRoleIcon(member.role)
                      return (
                        <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <RoleIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-medium text-gray-900">{member.user.name}</h3>
                                <span className={`px-2 py-1 text-xs rounded-full ${getTeamMemberStatusColor(member.status)}`}>
                                  {member.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 capitalize">
                                {member.role.replace('_', ' ')}
                              </p>
                              <p className="text-xs text-gray-500">{member.contactInfo.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Message
                            </Button>
                            <Button variant="outline" size="sm">
                              <Phone className="h-4 w-4 mr-2" />
                              Call
                            </Button>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              {/* Team Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Members</span>
                    <span className="text-sm font-medium">{mockProjectCollaboration.teamMembers.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Members</span>
                    <span className="text-sm font-medium text-green-600">
                      {mockProjectCollaboration.teamMembers.filter(m => m.status === 'active').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center"> 
                    <span className="text-sm text-gray-600">Response Rate</span>
                    <span className="text-sm font-medium">94%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg. Response Time</span>
                    <span className="text-sm font-medium">2.3 hours</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* File Upload Modal */}
        {showFileUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Upload Files</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowFileUploadModal(false)}
                >
                  ✕
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select 
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as FileCategory)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="progress_photos">Progress Photos</option>
                    <option value="planning_documents">Planning Documents</option>
                    <option value="building_control">Building Control</option>
                    <option value="certificates">Certificates</option>
                    <option value="invoices_receipts">Invoices & Receipts</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Construction Phase
                  </label>
                  <select 
                    value={uploadPhase}
                    onChange={(e) => setUploadPhase(e.target.value as ConstructionPhase)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="foundations">Foundations</option>
                    <option value="structure">Structure</option>
                    <option value="roof">Roof</option>
                    <option value="first_fix">First Fix</option>
                    <option value="second_fix">Second Fix</option>
                  </select>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Drag and drop files here, or click to select
                  </p>
                  <input 
                    type="file" 
                    multiple 
                    className="hidden" 
                    onChange={(e) => {
                      if (e.target.files) {
                        setSelectedFiles(Array.from(e.target.files))
                      }
                    }}
                  />
                </div>

                {selectedFiles.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Selected Files ({selectedFiles.length})
                    </p>
                    <div className="space-y-1">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="text-xs text-gray-600 flex justify-between">
                          <span>{file.name}</span>
                          <span>{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowFileUploadModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleFileUpload(selectedFiles)}
                    disabled={selectedFiles.length === 0}
                  >
                    Upload
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Message Modal */}
        {showNewMessageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">New Message</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowNewMessageModal(false)}
                >
                  ✕
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipients
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {mockProjectCollaboration.teamMembers
                      .filter(member => member.userId !== currentUserTeamMember.userId)
                      .map((member) => (
                      <div key={member.id} className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                        <span className="text-sm">{member.user.name}</span>
                        <button className="text-blue-600 hover:text-blue-800">
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message Type
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="general">General Message</option>
                    <option value="task_update">Task Update</option>
                    <option value="phase_update">Phase Update</option>
                    <option value="issue_report">Issue Report</option>
                    <option value="approval_request">Approval Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter message subject..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea 
                    className="w-full p-2 border border-gray-300 rounded-md h-32"
                    placeholder="Type your message here..."
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Attach Files
                  </Button>
                  <select className="p-2 border border-gray-300 rounded-md text-sm">
                    <option value="normal">Normal Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowNewMessageModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      console.log('Sending message...')
                      setShowNewMessageModal(false)
                    }}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}