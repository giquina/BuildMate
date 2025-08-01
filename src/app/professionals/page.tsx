'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { VerificationBadgeComponent, CertificationBadge, VerificationScoreBadge } from '@/components/ui/Badge'
import { 
  MessageCircle, 
  Phone, 
  Video, 
  Star, 
  MapPin, 
  Mail, 
  CheckCircle, 
  Shield,
  Users,
  Calendar,
  Award,
  Clock,
  TrendingUp,
  Camera,
  FileText,
  Settings,
  AlertCircle,
  ChevronRight,
  Circle,
  Building,
  Zap,
  Wrench,
  Paintbrush2,
  ThumbsUp,
  MessageSquare,
  CalendarDays,
  BarChart3,
  Heart,
  Quote,
  Play,
  ImageIcon,
  ExternalLink,
  Sparkles,
  Trophy,
  UserCheck,
  Repeat,
  Target,
  Eye,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Search,
  Filter,
  SlidersHorizontal,
  BookOpen,
  Globe
} from 'lucide-react'
import { Professional, ProfessionalType, UKCertification, VerificationBadge } from '@/types'
import { calculateVerificationScore, formatCurrency, calculateDistance } from '@/lib/uk-utils'

interface Review {
  id: string
  clientName: string
  clientInitials: string
  rating: number
  date: string
  project: string
  excerpt: string
  fullReview: string
  projectPhotos: string[]
  breakdown: {
    communication: number
    quality: number
    timeliness: number
    value: number
  }
  isRepeatClient: boolean
  professionalResponse?: string
  responseDate?: string
  isVideoTestimonial?: boolean
  videoUrl?: string
}

interface ProjectGallery {
  id: string
  title: string
  category: string
  beforePhoto: string
  afterPhoto: string
  description: string
  clientTestimonial: string
  completionDate: string
  projectValue: string
}

interface Award {
  id: string
  title: string
  organization: string
  year: number
  description: string
  testimonial?: string
}

interface TeamMember {
  id: string
  name: string
  role: string
  company: string
  specialties: string[]
  rating: number
  reviewCount: number
  verified: boolean
  insurance: boolean
  profileImage: string
  description: string
  contactInfo: {
    phone: string
    email: string
    website?: string
  }
  certifications: string[]
  yearsExperience: number
  projectsCompleted: number
  currentTaskProgress: number
  availability: 'online' | 'busy' | 'offline'
  lastSeen: string
  responsibilities: string[]
  portfolio: string[]
  upcomingTasks: string[]
  completedTasks: number
  onTimeDelivery: number
  clientSatisfaction: number
  reviews: Review[]
  projectGallery: ProjectGallery[]
  awards: Award[]
  referralRate: number
  repeatClientRate: number
  successStories: string[]
  peerRecommendations: string[]
  recentFeedback: Review[]
  industryRecognition: string[]
}

// Mock Professional Data with Full UK Professional Structure
const mockProfessionals: Professional[] = [
  {
    id: '1',
    name: 'James Mitchell',
    company: 'Mitchell Construction Ltd',
    specialties: ['builder', 'structural_engineer'],
    location: 'Birmingham, West Midlands',
    postcode: 'B15 2TT',
    radius: 25,
    rating: 4.8,
    reviewCount: 127,
    verified: true,
    insurance: true,
    contactInfo: {
      phone: '0121 555 0123',
      email: 'james@mitchellconstruction.co.uk',
      website: 'www.mitchellconstruction.co.uk'
    },
    certifications: [
      {
        id: '1',
        name: 'CSCS Gold Card',
        issuer: 'CITB',
        category: 'safety_certification',
        registrationNumber: 'CSCS123456789',
        issuedDate: '2020-01-15',
        expiryDate: '2025-01-15',
        isActive: true,
        description: 'Construction Skills Certification Scheme Gold Card'
      },
      {
        id: '2', 
        name: 'FMB Member',
        issuer: 'Federation of Master Builders',
        category: 'professional_membership',
        registrationNumber: 'FMB987654321',
        issuedDate: '2018-03-01',
        isActive: true,
        description: 'Full member of Federation of Master Builders'
      }
    ],
    verification: {
      status: 'verified',
      verifiedAt: '2023-12-01T10:00:00Z',
      documents: [],
      verificationBadges: [
        {
          id: '1',
          type: 'verified_professional',
          name: 'Verified Professional',
          description: 'Fully verified professional with current certifications',
          iconUrl: '',
          earnedAt: '2023-12-01T10:00:00Z',
          level: 'gold'
        }
      ]
    },
    profile: {
      bio: 'Leading construction professional with 15+ years experience in residential projects.',
      yearsExperience: 15,
      projectsCompleted: 89,
      profileImage: '/api/placeholder/200/200',
      portfolio: [],
      awards: [],
      qualifications: ['NVQ Level 3 Construction', 'NEBOSH General Certificate']
    },
    business: {
      registrationNumber: 'CB123456789',
      insuranceDetails: {
        provider: 'Zurich Insurance',
        policyNumber: 'ZUR123456789',
        expiryDate: '2024-12-31',
        coverageAmount: 2000000,
        documentUrl: '',
        verified: true
      },
      publicLiabilityInsurance: 2000000,
      employersLiabilityInsurance: 10000000
    },
    availability: {
      workingHours: {
        monday: { isAvailable: true, startTime: '08:00', endTime: '17:00', breaks: [] },
        tuesday: { isAvailable: true, startTime: '08:00', endTime: '17:00', breaks: [] },
        wednesday: { isAvailable: true, startTime: '08:00', endTime: '17:00', breaks: [] },
        thursday: { isAvailable: true, startTime: '08:00', endTime: '17:00', breaks: [] },
        friday: { isAvailable: true, startTime: '08:00', endTime: '17:00', breaks: [] },
        saturday: { isAvailable: true, startTime: '09:00', endTime: '13:00', breaks: [] },
        sunday: { isAvailable: false, breaks: [] }
      },
      bookingSettings: {
        minimumNotice: 48,
        maximumAdvanceBooking: 90,
        allowWeekendBookings: true,
        allowEveningBookings: false,
        bookingTypes: ['consultation', 'site_visit', 'quotation'],
        requiresApproval: true,
        cancellationPolicy: '48 hours notice required'
      },
      calendar: [],
      responseTime: 4,
      nextAvailable: '2024-02-15'
    },
    performance: {
      onTimeCompletion: 95,
      budgetAdherence: 92,
      clientSatisfaction: 98,
      repeatClientRate: 78,
      recommendationRate: 85
    },
    communication: {
      preferredMethods: ['phone', 'email', 'whatsapp'],
      languages: ['English'],
      responseTime: 'same-day'
    },
    serviceAreas: [
      { postcode: 'B', town: 'Birmingham', radius: 15, travelTime: 30 },
      { postcode: 'CV', town: 'Coventry', radius: 20, travelTime: 45 }
    ],
    travelRadius: 25,
    subscriptionTier: 'premium',
    status: 'active',
    joinedAt: '2020-01-15T09:00:00Z',
    lastActive: '2024-01-15T14:30:00Z'
  },
  {
    id: '2',
    name: 'Sarah Thompson',
    company: 'Elite Electrical Services',
    specialties: ['electrician'],
    location: 'Birmingham, West Midlands',
    postcode: 'B20 3HH',
    radius: 30,
    rating: 4.9,
    reviewCount: 203,
    verified: true,
    insurance: true,
    contactInfo: {
      phone: '0121 555 0456',
      email: 'sarah@eliteelectrical.co.uk'
    },
    certifications: [
      {
        id: '3',
        name: 'NICEIC Approved',
        issuer: 'NICEIC',
        category: 'electrical_qualification',
        registrationNumber: 'NIC123456',
        issuedDate: '2019-06-01',
        expiryDate: '2024-06-01',
        isActive: true,
        description: 'NICEIC Approved Contractor'
      },
      {
        id: '4',
        name: '18th Edition',
        issuer: 'City & Guilds',
        category: 'electrical_qualification', 
        registrationNumber: 'CG987654',
        issuedDate: '2018-09-15',
        isActive: true,
        description: '18th Edition Wiring Regulations'
      }
    ],
    verification: {
      status: 'verified',
      verifiedAt: '2023-11-15T09:00:00Z',
      documents: [],
      verificationBadges: [
        {
          id: '2',
          type: 'safety_certified',
          name: 'Safety Certified',
          description: 'Certified for electrical safety standards',
          iconUrl: '',
          earnedAt: '2023-11-15T09:00:00Z',
          level: 'gold'
        }
      ]
    },
    profile: {
      bio: 'NICEIC approved electrician specializing in domestic and commercial installations.',
      yearsExperience: 12,
      projectsCompleted: 156,
      profileImage: '/api/placeholder/200/200',
      portfolio: [],
      awards: [],
      qualifications: ['18th Edition', 'Level 3 Electrical Installation']
    },
    business: {
      insuranceDetails: {
        provider: 'AXA Insurance',
        policyNumber: 'AXA987654321',
        expiryDate: '2024-11-30',
        coverageAmount: 2000000,
        documentUrl: '',
        verified: true
      },
      publicLiabilityInsurance: 2000000,
      employersLiabilityInsurance: 10000000
    },
    availability: {
      workingHours: {
        monday: { isAvailable: true, startTime: '07:30', endTime: '17:30', breaks: [] },
        tuesday: { isAvailable: true, startTime: '07:30', endTime: '17:30', breaks: [] },
        wednesday: { isAvailable: true, startTime: '07:30', endTime: '17:30', breaks: [] },
        thursday: { isAvailable: true, startTime: '07:30', endTime: '17:30', breaks: [] },
        friday: { isAvailable: true, startTime: '07:30', endTime: '17:30', breaks: [] },
        saturday: { isAvailable: false, breaks: [] },
        sunday: { isAvailable: false, breaks: [] }
      },
      bookingSettings: {
        minimumNotice: 24,
        maximumAdvanceBooking: 60,
        allowWeekendBookings: false,
        allowEveningBookings: true,
        bookingTypes: ['consultation', 'emergency'],
        requiresApproval: false,
        cancellationPolicy: '24 hours notice required'
      },
      calendar: [],
      responseTime: 2,
      nextAvailable: '2024-02-12'
    },
    performance: {
      onTimeCompletion: 92,
      budgetAdherence: 94,
      clientSatisfaction: 96,
      repeatClientRate: 88,
      recommendationRate: 92
    },
    communication: {
      preferredMethods: ['phone', 'email'],
      languages: ['English'],
      responseTime: 'same-day'
    },
    serviceAreas: [
      { postcode: 'B', town: 'Birmingham', radius: 20, travelTime: 35 }
    ],
    travelRadius: 30,
    subscriptionTier: 'premium',
    status: 'active',
    joinedAt: '2019-03-20T10:00:00Z',
    lastActive: '2024-01-15T16:45:00Z'
  }
];

const assignedTeam: TeamMember[] = [
  {
    id: '1',
    name: 'James Mitchell',
    role: 'Project Lead & General Contractor',
    company: 'Mitchell Construction Ltd',
    specialties: ['Project Management', 'General Building', 'Extensions'],
    rating: 4.8,
    reviewCount: 127,
    verified: true,
    insurance: true,
    profileImage: '/api/placeholder/80/80',
    description: 'Leading your project with 15+ years of experience in residential construction. Coordinating all trades and ensuring quality delivery.',
    contactInfo: {
      phone: '0121 555 0123',
      email: 'james@mitchellconstruction.co.uk',
      website: 'www.mitchellconstruction.co.uk'
    },
    certifications: ['CITB', 'CSCS Gold Card', 'FMB Member'],
    yearsExperience: 15,
    projectsCompleted: 89,
    currentTaskProgress: 75,
    availability: 'online',
    lastSeen: 'Active now',
    responsibilities: ['Project coordination', 'Quality control', 'Timeline management', 'Client communication'],
    portfolio: ['Kitchen extension - Sutton Coldfield', 'Loft conversion - Solihull', 'Full house renovation - Birmingham'],
    upcomingTasks: ['Foundation inspection', 'Structural beam installation', 'Coordination meeting'],
    completedTasks: 23,
    onTimeDelivery: 95,
    clientSatisfaction: 98,
    reviews: [],
    projectGallery: [],
    awards: [],
    referralRate: 85,
    repeatClientRate: 78,
    successStories: [],
    peerRecommendations: [],
    recentFeedback: [],
    industryRecognition: []
  },
  {
    id: '2',
    name: 'Sarah Thompson',
    role: 'Lead Electrician',
    company: 'Elite Electrical Services',
    specialties: ['Electrical Installation', 'Smart Home', 'Safety Systems'],
    rating: 4.9,
    reviewCount: 203,
    verified: true,
    insurance: true,
    profileImage: '/api/placeholder/80/80',
    description: 'NICEIC approved electrician handling all electrical work for your project. Specialist in modern installations and smart home integration.',
    contactInfo: {
      phone: '0121 555 0456',
      email: 'sarah@eliteelectrical.co.uk'
    },
    certifications: ['NICEIC Approved', '18th Edition', 'Part P Certified'],
    yearsExperience: 12,
    projectsCompleted: 156,
    currentTaskProgress: 60,
    availability: 'busy',
    lastSeen: '2 hours ago',
    responsibilities: ['Electrical planning', 'Wiring installation', 'Smart home setup', 'Safety compliance'],
    portfolio: ['Smart home - Edgbaston', 'Commercial rewiring - Birmingham', 'Solar installation - Solihull'],
    upcomingTasks: ['Kitchen circuit installation', 'Smart lighting setup', 'Final testing'],
    completedTasks: 18,
    onTimeDelivery: 92,
    clientSatisfaction: 96,
    reviews: [],
    projectGallery: [],
    awards: [],
    referralRate: 92,
    repeatClientRate: 88,
    successStories: [],
    peerRecommendations: [],
    recentFeedback: [],
    industryRecognition: []
  },
  {
    id: '3',
    name: 'Michael Chen',
    role: 'Plumbing Specialist',
    company: 'Chen Plumbing Solutions',
    specialties: ['Central Heating', 'Bathroom Installation', 'Emergency Repairs'],
    rating: 4.7,
    reviewCount: 89,
    verified: true,
    insurance: true,
    profileImage: '/api/placeholder/80/80',
    description: 'Gas Safe registered plumber managing all plumbing and heating requirements. Expert in modern heating systems and bathroom installations.',
    contactInfo: {
      phone: '0121 555 0789',
      email: 'michael@chenplumbing.co.uk'
    },
    certifications: ['Gas Safe Registered', 'CIPHE Member', 'Unvented Hot Water'],
    yearsExperience: 10,
    projectsCompleted: 134,
    currentTaskProgress: 40,
    availability: 'online',
    lastSeen: '15 minutes ago',
    responsibilities: ['Heating system design', 'Bathroom plumbing', 'Gas safety', 'System maintenance'],
    portfolio: ['Luxury bathroom - Harborne', 'Boiler replacement - Kings Heath', 'Underfloor heating - Moseley'],
    upcomingTasks: ['Bathroom rough-in', 'Boiler connection', 'System pressure testing'],
    completedTasks: 12,
    onTimeDelivery: 88,
    clientSatisfaction: 94,
    reviews: [],
    projectGallery: [],
    awards: [],
    referralRate: 89,
    repeatClientRate: 82,
    successStories: [],
    peerRecommendations: [],
    recentFeedback: [],
    industryRecognition: []
  },
  {
    id: '4',
    name: 'Emma Rodriguez',
    role: 'Interior Design Consultant',
    company: 'Rodriguez Design Studio',
    specialties: ['Space Planning', 'Color Consultation', 'Material Selection'],
    rating: 4.9,
    reviewCount: 67,
    verified: true,
    insurance: true,
    profileImage: '/api/placeholder/80/80',
    description: 'Interior design specialist ensuring your space is both beautiful and functional. Coordinating finishes and design elements.',
    contactInfo: {
      phone: '0121 555 0345',
      email: 'emma@rodriguezdesign.co.uk'
    },
    certifications: ['BIID Member', 'Interior Design Diploma', 'Feng Shui Certified'],
    yearsExperience: 8,
    projectsCompleted: 78,
    currentTaskProgress: 85,
    availability: 'offline',
    lastSeen: 'Yesterday at 6:30 PM',
    responsibilities: ['Design consultation', 'Material selection', 'Color coordination', 'Final styling'],
    portfolio: ['Modern kitchen - Sutton Coldfield', 'Living room redesign - Solihull', 'Bedroom makeover - Birmingham'],
    upcomingTasks: ['Tile selection meeting', 'Paint color approval', 'Fixture coordination'],
    completedTasks: 19,
    onTimeDelivery: 97,
    clientSatisfaction: 99,
    reviews: [],
    projectGallery: [],
    awards: [],
    referralRate: 96,
    repeatClientRate: 93,
    successStories: [],
    peerRecommendations: [],
    recentFeedback: [],
    industryRecognition: []
  }
]

export default function ProfessionalsPage() {
  const [selectedTab, setSelectedTab] = useState('search')
  const [selectedMember, setSelectedMember] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState<ProfessionalType | 'all'>('all')
  const [postcode, setPostcode] = useState('B15 2TT')
  const [radius, setRadius] = useState(25)
  const [minRating, setMinRating] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'rating' | 'distance' | 'verification' | 'availability'>('rating')
  
  // Filter and search logic
  const filteredProfessionals = mockProfessionals.filter(prof => {
    // Search query filter
    if (searchQuery && !prof.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !prof.company.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    // Specialty filter
    if (selectedSpecialty !== 'all' && !prof.specialties.includes(selectedSpecialty)) {
      return false
    }
    
    // Rating filter
    if (prof.rating < minRating) {
      return false
    }
    
    // Distance filter (simplified)
    const distance = calculateDistance(postcode, prof.postcode)
    if (distance > radius) {
      return false
    }
    
    return true
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating
      case 'distance':
        return calculateDistance(postcode, a.postcode) - calculateDistance(postcode, b.postcode)
      case 'verification':
        const scoreA = calculateVerificationScore(a.certifications, a.business.insuranceDetails, [])
        const scoreB = calculateVerificationScore(b.certifications, b.business.insuranceDetails, [])
        return scoreB - scoreA
      case 'availability':
        return new Date(a.availability.nextAvailable).getTime() - new Date(b.availability.nextAvailable).getTime()
      default:
        return 0
    }
  })

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'online': return 'text-green-500'
      case 'busy': return 'text-yellow-500'
      case 'offline': return 'text-gray-400'
      default: return 'text-gray-400'
    }
  }

  const getAvailabilityDot = (availability: string) => {
    switch (availability) {
      case 'online': return 'bg-green-500'
      case 'busy': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Users className="h-12 w-12 mr-4" />
              <h1 className="text-4xl font-bold">
                Find Verified UK Professionals
              </h1>
            </div>
            <p className="text-xl text-blue-100 mb-6">
              Connect with verified construction professionals in your area
            </p>
            <div className="flex items-center justify-center space-x-8 text-blue-100">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>All Verified & Insured</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                <span>Quality Guaranteed</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                <span>Top Rated Professionals</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'search', label: 'Find Professionals', icon: Search },
              { id: 'team', label: 'Your Team', icon: Users },
              { id: 'calendar', label: 'Schedule', icon: CalendarDays },
              { id: 'messages', label: 'Messages', icon: MessageSquare }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-blue-700 text-blue-700'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Professional Search Tab */}
        {selectedTab === 'search' && (
          <div className="space-y-6">
            {/* Search and Filter Controls */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Main Search Bar */}
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          placeholder="Search professionals by name or company..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center"
                    >
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </div>

                  {/* Location and Specialty Quick Filters */}
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Your Postcode</label>
                      <Input
                        placeholder="B15 2TT"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        className="w-32"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Specialty</label>
                      <select
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value as ProfessionalType | 'all')}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                      >
                        <option value="all">All Specialties</option>
                        <option value="builder">Builder</option>
                        <option value="electrician">Electrician</option>
                        <option value="plumber">Plumber</option>
                        <option value="architect">Architect</option>
                        <option value="heating_engineer">Heating Engineer</option>
                        <option value="roofer">Roofer</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                      >
                        <option value="rating">Highest Rated</option>
                        <option value="distance">Nearest</option>
                        <option value="verification">Most Verified</option>
                        <option value="availability">Earliest Available</option>
                      </select>
                    </div>
                  </div>

                  {/* Advanced Filters (Collapsible) */}
                  {showFilters && (
                    <div className="border-t pt-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Travel Radius: {radius} miles
                          </label>
                          <input
                            type="range"
                            min="5"
                            max="50"
                            value={radius}
                            onChange={(e) => setRadius(Number(e.target.value))}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Minimum Rating: {minRating > 0 ? minRating : 'Any'}
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="5"
                            step="0.5"
                            value={minRating}
                            onChange={(e) => setMinRating(Number(e.target.value))}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Results Summary */}
            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                Found {filteredProfessionals.length} professionals in your area
              </p>
              <div className="text-sm text-gray-500">
                Sorted by {sortBy.replace('_', ' ')}
              </div>
            </div>

            {/* Professional Listings */}
            <div className="space-y-4">
              {filteredProfessionals.map((professional) => {
                const verificationScore = calculateVerificationScore(
                  professional.certifications, 
                  professional.business.insuranceDetails, 
                  []
                )
                const distance = calculateDistance(postcode, professional.postcode)

                return (
                  <Card key={professional.id} className="hover:shadow-lg transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Professional Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start space-x-4">
                              <img 
                                src={professional.profile.profileImage} 
                                alt={professional.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                              />
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-xl font-bold text-gray-900">
                                    {professional.name}
                                  </h3>
                                  {professional.verified && (
                                    <CheckCircle className="h-5 w-5 text-blue-600" />
                                  )}
                                </div>
                                <p className="text-lg font-semibold text-blue-700">{professional.company}</p>
                                <p className="text-gray-600 mb-2">{professional.location}</p>
                                <div className="flex items-center gap-1 mb-2">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="font-semibold">{professional.rating}</span>
                                  <span className="text-gray-500">({professional.reviewCount} reviews)</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-sm text-gray-500 mb-1">
                                {distance.toFixed(1)} miles away
                              </div>
                              <div className="text-sm text-gray-500">
                                Available: {new Date(professional.availability.nextAvailable).toLocaleDateString()}
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4">{professional.profile.bio}</p>

                          {/* Specialties */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {professional.specialties.map((specialty) => (
                              <span key={specialty} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                                {specialty.replace('_', ' ')}
                              </span>
                            ))}
                          </div>

                          {/* Verification Badges */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            <VerificationScoreBadge score={verificationScore} size="sm" />
                            {professional.verification.verificationBadges.map((badge) => (
                              <VerificationBadgeComponent key={badge.id} badge={badge} size="sm" />
                            ))}
                          </div>

                          {/* Certifications */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {professional.certifications.slice(0, 3).map((cert) => (
                              <CertificationBadge key={cert.id} certification={cert} size="sm" />
                            ))}
                            {professional.certifications.length > 3 && (
                              <span className="text-sm text-gray-500 px-2 py-1">
                                +{professional.certifications.length - 3} more
                              </span>
                            )}
                          </div>

                          {/* Performance Metrics */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 rounded-lg p-4">
                            <div className="text-center">
                              <div className="text-lg font-bold text-green-600">
                                {professional.performance.onTimeCompletion}%
                              </div>
                              <div className="text-xs text-gray-600">On-Time</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-600">
                                {professional.profile.projectsCompleted}
                              </div>
                              <div className="text-xs text-gray-600">Projects</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-purple-600">
                                {professional.performance.clientSatisfaction}%
                              </div>
                              <div className="text-xs text-gray-600">Satisfaction</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-orange-600">
                                {professional.availability.responseTime}h
                              </div>
                              <div className="text-xs text-gray-600">Response</div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="lg:w-48 flex lg:flex-col gap-2">
                          <Button className="bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          <Button variant="outline" className="border-blue-700 text-blue-700 hover:bg-blue-50 flex items-center justify-center">
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                          <Button variant="outline" className="border-blue-700 text-blue-700 hover:bg-blue-50 flex items-center justify-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            Book Visit
                          </Button>
                          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                            <Quote className="h-4 w-4 mr-2" />
                            Get Quote
                          </Button>
                          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Professional Requirements Notice */}
            <Card className="bg-amber-50 border border-amber-200">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <AlertCircle className="h-6 w-6 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">UK Professional Standards</h4>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p>• All professionals must have valid certifications and insurance coverage</p>
                      <p>• Gas work must only be carried out by Gas Safe registered engineers</p>
                      <p>• Electrical work may require Building Control notification under Part P</p>
                      <p>• CSCS cards from Northern Ireland expire 31 December 2024</p>
                      <p>• Professional availability varies by region and seasonal demand</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Team Tab Content */}
        {selectedTab === 'team' && (
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 text-center">
                  <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-blue-700 mx-auto mb-2" />
                  <h3 className="text-sm sm:text-base font-semibold text-blue-700">Team Chat</h3>
                  <p className="text-xs sm:text-sm text-blue-600">3 new messages</p>
                </CardContent>
              </Card>
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <CalendarDays className="h-8 w-8 text-green-700 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-700">Schedule Meeting</h3>
                  <p className="text-sm text-green-600">Next: Tomorrow 2PM</p>
                </CardContent>
              </Card>
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4 text-center">
                  <BarChart3 className="h-8 w-8 text-purple-700 mx-auto mb-2" />
                  <h3 className="font-semibold text-purple-700">Progress Report</h3>
                  <p className="text-sm text-purple-600">68% Complete</p>
                </CardContent>
              </Card>
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-4 text-center">
                  <AlertCircle className="h-8 w-8 text-orange-700 mx-auto mb-2" />
                  <h3 className="font-semibold text-orange-700">Need Changes?</h3>
                  <p className="text-sm text-orange-600">Contact support</p>
                </CardContent>
              </Card>
            </div>

            {/* Team Members */}
            <div className="space-y-6">
              {assignedTeam.map((member) => (
                <Card key={member.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-700">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 sm:mb-6 gap-4 sm:gap-0">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className="relative">
                          <img 
                            src={member.profileImage} 
                            alt={member.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-white shadow-lg"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${getAvailabilityDot(member.availability)}`}></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mr-3">
                              {member.name}
                            </h3>
                            {member.verified && (
                              <CheckCircle className="h-6 w-6 text-blue-700" />
                            )}
                          </div>
                          <p className="text-base sm:text-lg font-semibold text-blue-700 mb-1">{member.role}</p>
                          <p className="text-gray-600 mb-2">{member.company}</p>
                          <div className={`flex items-center ${getAvailabilityColor(member.availability)} text-sm font-medium`}>
                            <Circle className="h-4 w-4 mr-1" />
                            <span className="capitalize">{member.availability}</span>
                            <span className="mx-2">•</span>
                            <span>{member.lastSeen}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="flex items-center mb-2">
                          <Star className="h-5 w-5 text-yellow-400 mr-1" />
                          <span className="font-bold text-lg">{member.rating}</span>
                          <span className="text-gray-500 ml-1">({member.reviewCount})</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {member.yearsExperience} years exp
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{member.description}</p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Current Task Progress</span>
                        <span className="text-sm font-bold text-blue-700">{member.currentTaskProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-700 h-3 rounded-full transition-all duration-300" 
                          style={{ width: `${member.currentTaskProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.specialties.map((specialty) => (
                        <span key={specialty} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {specialty}
                        </span>
                      ))}
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 bg-gray-50 rounded-lg p-3 sm:p-4">
                      <div className="text-center">
                        <div className="text-xl sm:text-2xl font-bold text-green-600">{member.onTimeDelivery}%</div>
                        <div className="text-xs sm:text-sm text-gray-600">On-Time Delivery</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl sm:text-2xl font-bold text-blue-600">{member.completedTasks}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Tasks Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl sm:text-2xl font-bold text-purple-600">{member.clientSatisfaction}%</div>
                        <div className="text-xs sm:text-sm text-gray-600">Client Satisfaction</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <Button className="bg-blue-700 hover:bg-blue-800 text-white flex items-center">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Chat Now
                      </Button>
                      <Button variant="outline" className="border-blue-700 text-blue-700 hover:bg-blue-50 flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline" className="border-blue-700 text-blue-700 hover:bg-blue-50 flex items-center">
                        <Video className="h-4 w-4 mr-2" />
                        Video Chat
                      </Button>
                      <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        View Portfolio
                      </Button>
                    </div>

                    {/* Expandable Details */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                        className="flex items-center text-blue-700 hover:text-blue-800 font-medium"
                      >
                        <span>View Details & Responsibilities</span>
                        <ChevronRight className={`h-4 w-4 ml-1 transform transition-transform ${selectedMember === member.id ? 'rotate-90' : ''}`} />
                      </button>
                      
                      {selectedMember === member.id && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Project Responsibilities</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                              {member.responsibilities.map((responsibility, index) => (
                                <li key={index}>{responsibility}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Upcoming Tasks</h4>
                            <ul className="space-y-2">
                              {member.upcomingTasks.map((task, index) => (
                                <li key={index} className="flex items-center text-gray-700">
                                  <Clock className="h-4 w-4 mr-2 text-blue-600" />
                                  {task}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Recent Portfolio Work</h4>
                            <ul className="space-y-2">
                              {member.portfolio.map((work, index) => (
                                <li key={index} className="flex items-center text-gray-700">
                                  <Building className="h-4 w-4 mr-2 text-green-600" />
                                  {work}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Certifications</h4>
                            <div className="flex flex-wrap gap-2">
                              {member.certifications.map((cert) => (
                                <span key={cert} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm border border-green-200">
                                  <Award className="h-3 w-3 inline mr-1" />
                                  {cert}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Professional Availability Notice */}
            <Card className="bg-amber-50 border border-amber-200">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <AlertCircle className="h-6 w-6 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Professional Availability Information</h4>
                    <div className="text-sm text-gray-700 space-y-2">
                      <p>• Quality UK professionals are typically booked 4-8 weeks in advance</p>
                      <p>• All professionals shown have current CSCS cards and valid insurance</p>
                      <p>• CSCS cards from Northern Ireland expire 31 December 2024</p>
                      <p>• Gas Safe registration required for all gas-related work</p>
                      <p>• Building Control notification required for electrical work under Part P</p>
                      <p>• Availability varies by region and seasonal demand</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Need Different Professionals */}
            <Card className="bg-gray-50 border-dashed border-2 border-gray-300">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Need Different Professionals?
                </h3>
                <p className="text-gray-600 mb-4">
                  Not satisfied with your current team? We can help you find better matches for your project needs.
                  Typical response time: 2-3 business days.
                </p>
                <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Other Tab Placeholders */}
        {selectedTab !== 'team' && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-500">
                <Calendar className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {selectedTab === 'calendar' && 'Team Calendar & Scheduling'}
                  {selectedTab === 'performance' && 'Performance Analytics'}
                  {selectedTab === 'communication' && 'Team Communication Hub'}
                </h3>
                <p>This feature is coming soon. Your team coordination tools will be available here.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}