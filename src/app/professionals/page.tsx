'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
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
  Online,
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
  Minus
} from 'lucide-react'

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
    clientSatisfaction: 98
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
    clientSatisfaction: 96
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
    clientSatisfaction: 94
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
    clientSatisfaction: 99
  }
]

export default function ProfessionalsPage() {
  const [selectedTab, setSelectedTab] = useState('team')
  const [selectedMember, setSelectedMember] = useState<string | null>(null)

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
                Meet Your Dream Team
              </h1>
            </div>
            <p className="text-xl text-blue-100 mb-6">
              Your handpicked professionals are ready to bring your vision to life
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
              { id: 'team', label: 'Your Team', icon: Users },
              { id: 'calendar', label: 'Schedule', icon: CalendarDays },
              { id: 'performance', label: 'Performance', icon: BarChart3 },
              { id: 'communication', label: 'Messages', icon: MessageSquare }
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

        {/* Team Tab Content */}
        {selectedTab === 'team' && (
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 text-center">
                  <MessageCircle className="h-8 w-8 text-blue-700 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-700">Team Chat</h3>
                  <p className="text-sm text-blue-600">3 new messages</p>
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
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <img 
                            src={member.profileImage} 
                            alt={member.name}
                            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${getAvailabilityDot(member.availability)}`}></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-2xl font-bold text-gray-900 mr-3">
                              {member.name}
                            </h3>
                            {member.verified && (
                              <CheckCircle className="h-6 w-6 text-blue-700" />
                            )}
                          </div>
                          <p className="text-lg font-semibold text-blue-700 mb-1">{member.role}</p>
                          <p className="text-gray-600 mb-2">{member.company}</p>
                          <div className={`flex items-center ${getAvailabilityColor(member.availability)} text-sm font-medium`}>
                            <Online className="h-4 w-4 mr-1" />
                            <span className="capitalize">{member.availability}</span>
                            <span className="mx-2">•</span>
                            <span>{member.lastSeen}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
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
                    <div className="grid grid-cols-3 gap-4 mb-4 bg-gray-50 rounded-lg p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{member.onTimeDelivery}%</div>
                        <div className="text-sm text-gray-600">On-Time Delivery</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{member.completedTasks}</div>
                        <div className="text-sm text-gray-600">Tasks Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{member.clientSatisfaction}%</div>
                        <div className="text-sm text-gray-600">Client Satisfaction</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
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

            {/* Need Different Professionals */}
            <Card className="bg-gray-50 border-dashed border-2 border-gray-300">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Need Different Professionals?
                </h3>
                <p className="text-gray-600 mb-4">
                  Not satisfied with your current team? We can help you find better matches for your project needs.
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