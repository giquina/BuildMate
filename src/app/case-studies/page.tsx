'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import { 
  Search,
  Filter,
  MapPin,
  Calendar,
  TrendingUp,
  Users,
  Award,
  Clock,
  PoundSterling,
  ChevronRight,
  ChevronLeft,
  Share2,
  ExternalLink,
  Star,
  Play,
  CheckCircle,
  Home,
  Hammer,
  Building,
  ArrowRight,
  Quote,
  Download,
  Eye
} from 'lucide-react'

// Types
interface CaseStudy {
  id: string
  title: string
  subtitle: string
  client: string
  projectType: 'new_build' | 'extension' | 'renovation' | 'commercial'
  location: string
  originalBudget: number
  finalCost: number
  timeline: {
    planned: number
    actual: number
    unit: 'weeks' | 'months'
  }
  savings: number
  professionals: string[]
  keySuccess: string
  description: string
  quote: string
  featured: boolean
  beforeImage: string
  afterImage: string
  completionDate: string
  challenges: string[]
  solutions: string[]
  results: string[]
  roi: number
  clientSatisfaction: number
}

// Mock data based on CLAUDE.md specifications
const mockCaseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Birmingham Victorian Extension',
    subtitle: '£45k Under Budget, 6 Weeks Early',
    client: 'The Johnson Family',
    projectType: 'extension',
    location: 'Birmingham, West Midlands',
    originalBudget: 85000,
    finalCost: 69000,
    timeline: { planned: 22, actual: 16, unit: 'weeks' },
    savings: 16000,
    professionals: ['Mitchell Construction', 'Elite Electrical'],
    keySuccess: 'AI layout optimization saved £12k in structural changes',
    description: 'Double-story rear extension with modern open-plan design',
    quote: 'BuildMate AI AI turned our extension nightmare into a dream project. The AI layouts saved us £15k in architectural fees!',
    featured: true,
    beforeImage: '/api/placeholder/600/400',
    afterImage: '/api/placeholder/600/400',
    completionDate: '2024-03-15',
    challenges: ['Complex structural requirements', 'Planning permission delays', 'Victorian building constraints'],
    solutions: ['AI-optimized structural design', 'Expert heritage compliance team', 'Pre-approved material selections'],
    results: ['27% cost savings', '6 weeks ahead of schedule', '100% client satisfaction'],
    roi: 145,
    clientSatisfaction: 5.0
  },
  {
    id: '2',
    title: 'Manchester New Build',
    subtitle: 'First-Time Buyers\' Dream Realized',
    client: 'Sarah & David Chen',
    projectType: 'new_build',
    location: 'Manchester, Greater Manchester',
    originalBudget: 245000,
    finalCost: 227000,
    timeline: { planned: 18, actual: 18, unit: 'months' },
    savings: 18000,
    professionals: ['Green Build Solutions', 'EcoTech Systems'],
    keySuccess: 'Professional network efficiency, material bulk buying',
    description: '3-bedroom eco-friendly house with sustainable features',
    quote: 'As first-time builders, we were terrified. BuildMate AI\'s professional network held our hand through everything. Finished on time!',
    featured: false,
    beforeImage: '/api/placeholder/600/400',
    afterImage: '/api/placeholder/600/400',
    completionDate: '2024-02-28',
    challenges: ['First-time builders inexperience', 'Eco-certification requirements', 'Budget constraints'],
    solutions: ['Dedicated project mentor', 'Pre-certified eco materials', 'Phased payment structure'],
    results: ['7% cost savings', 'On-time completion', 'A+ energy rating achieved'],
    roi: 112,
    clientSatisfaction: 4.9
  },
  {
    id: '3',
    title: 'London Kitchen Revolution',
    subtitle: '40% Material Savings',
    client: 'Emma Richardson',
    projectType: 'renovation',
    location: 'London, Greater London',
    originalBudget: 35000,
    finalCost: 28000,
    timeline: { planned: 8, actual: 8, unit: 'weeks' },
    savings: 7000,
    professionals: ['London Kitchen Experts', 'Premier Plumbing'],
    keySuccess: 'AI space optimization, supplier comparison tools',
    description: 'Open-plan kitchen renovation with smart storage solutions',
    quote: 'The material savings alone paid for our Pro subscription 10 times over. Incredible platform.',
    featured: false,
    beforeImage: '/api/placeholder/600/400',
    afterImage: '/api/placeholder/600/400',
    completionDate: '2024-01-20',
    challenges: ['Small space constraints', 'Plumbing relocation', 'Noise restrictions'],
    solutions: ['AI space optimization', 'Silent drilling techniques', 'Modular installation approach'],
    results: ['20% cost savings', 'Maximum space utilization', 'Zero neighbor complaints'],
    roi: 125,
    clientSatisfaction: 4.8
  },
  {
    id: '4',
    title: 'Leeds Commercial Renovation',
    subtitle: 'Professional Network Excellence',
    client: 'Yorkshire Property Group',
    projectType: 'commercial',
    location: 'Leeds, West Yorkshire',
    originalBudget: 120000,
    finalCost: 98000,
    timeline: { planned: 12, actual: 12, unit: 'weeks' },
    savings: 22000,
    professionals: ['Leeds Commercial Build', 'Northern Electrical'],
    keySuccess: 'Coordinated professional scheduling',
    description: 'Office space conversion with modern amenities',
    quote: 'BuildMate AI connects me with serious, prepared clients. My project completion rate increased 40%.',
    featured: false,
    beforeImage: '/api/placeholder/600/400',
    afterImage: '/api/placeholder/600/400',
    completionDate: '2024-04-10',
    challenges: ['Tenant coordination', 'Building regulations', 'Minimal downtime requirement'],
    solutions: ['Phased construction approach', 'Expert compliance team', 'Weekend work scheduling'],
    results: ['18% cost savings', 'Zero business disruption', 'Tenant satisfaction 100%'],
    roi: 135,
    clientSatisfaction: 4.7
  },
  {
    id: '5',
    title: 'Liverpool Heritage Home Restoration',
    subtitle: 'Respectful Modernization',
    client: 'The Williams Estate',
    projectType: 'renovation',
    location: 'Liverpool, Merseyside',
    originalBudget: 75000,
    finalCost: 71000,
    timeline: { planned: 20, actual: 20, unit: 'weeks' },
    savings: 4000,
    professionals: ['Heritage Restore Ltd', 'Classic Crafts'],
    keySuccess: 'Specialist professional network, heritage compliance',
    description: 'Victorian terrace renovation maintaining historical character',
    quote: 'From planning permission to final inspection, BuildMate AI guided every step. Couldn\'t be happier.',
    featured: false,
    beforeImage: '/api/placeholder/600/400',
    afterImage: '/api/placeholder/600/400',
    completionDate: '2024-03-30',
    challenges: ['Heritage restrictions', 'Listed building constraints', 'Specialist material sourcing'],
    solutions: ['Heritage specialist team', 'Pre-approved period materials', 'Conservation expertise'],
    results: ['5% cost savings', 'Heritage compliance achieved', 'Property value increased 25%'],
    roi: 108,
    clientSatisfaction: 4.9
  }
]

// Filter options
const projectTypes = [
  { value: 'all', label: 'All Projects' },
  { value: 'new_build', label: 'New Build' },
  { value: 'extension', label: 'Extension' },
  { value: 'renovation', label: 'Renovation' },
  { value: 'commercial', label: 'Commercial' }
]

const budgetRanges = [
  { value: 'all', label: 'All Budgets' },
  { value: '0-50k', label: '£0 - £50k' },
  { value: '50k-100k', label: '£50k - £100k' },
  { value: '100k-200k', label: '£100k - £200k' },
  { value: '200k+', label: '£200k+' }
]

const locations = [
  { value: 'all', label: 'All Locations' },
  { value: 'london', label: 'London' },
  { value: 'manchester', label: 'Manchester' },
  { value: 'birmingham', label: 'Birmingham' },
  { value: 'leeds', label: 'Leeds' },
  { value: 'liverpool', label: 'Liverpool' }
]

const timelines = [
  { value: 'all', label: 'All Timelines' },
  { value: '0-3m', label: '0-3 months' },
  { value: '3-6m', label: '3-6 months' },
  { value: '6-12m', label: '6-12 months' },
  { value: '12m+', label: '12+ months' }
]

// Success metrics for animated counters
const successMetrics = [
  { value: 2300000, label: 'Total Savings Generated', prefix: '£', suffix: '+', color: 'text-green-600' },
  { value: 15847, label: 'Projects Completed', prefix: '', suffix: '', color: 'text-blue-600' },
  { value: 23, label: 'Average Cost Reduction', prefix: '', suffix: '%', color: 'text-purple-600' },
  { value: 4.8, label: 'Customer Satisfaction', prefix: '', suffix: '/5', color: 'text-orange-600' }
]

export default function CaseStudiesPage() {
  const [caseStudies] = useState<CaseStudy[]>(mockCaseStudies)
  const [filteredStudies, setFilteredStudies] = useState<CaseStudy[]>(caseStudies)
  const [selectedProjectType, setSelectedProjectType] = useState('all')
  const [selectedBudgetRange, setSelectedBudgetRange] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedTimeline, setSelectedTimeline] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: string]: number}>({})
  const [animatedMetrics, setAnimatedMetrics] = useState<{[key: number]: number}>({})

  // Animate success metrics counters
  useEffect(() => {
    successMetrics.forEach((metric, index) => {
      const duration = 2000 // 2 seconds
      const steps = 60
      const stepValue = metric.value / steps
      let currentStep = 0
      
      const timer = setInterval(() => {
        currentStep++
        if (currentStep <= steps) {
          setAnimatedMetrics(prev => ({
            ...prev,
            [index]: Math.floor(stepValue * currentStep)
          }))
        } else {
          setAnimatedMetrics(prev => ({
            ...prev,
            [index]: metric.value
          }))
          clearInterval(timer)
        }
      }, duration / steps)

      return () => clearInterval(timer)
    })
  }, [])

  // Filter logic
  useEffect(() => {
    let filtered = caseStudies

    // Project type filter
    if (selectedProjectType !== 'all') {
      filtered = filtered.filter(study => study.projectType === selectedProjectType)
    }

    // Budget range filter
    if (selectedBudgetRange !== 'all') {
      filtered = filtered.filter(study => {
        const budget = study.originalBudget
        switch (selectedBudgetRange) {
          case '0-50k': return budget <= 50000
          case '50k-100k': return budget > 50000 && budget <= 100000
          case '100k-200k': return budget > 100000 && budget <= 200000
          case '200k+': return budget > 200000
          default: return true
        }
      })
    }

    // Location filter
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(study => 
        study.location.toLowerCase().includes(selectedLocation.toLowerCase())
      )
    }

    // Timeline filter
    if (selectedTimeline !== 'all') {
      filtered = filtered.filter(study => {
        const timelineMonths = study.timeline.unit === 'weeks' 
          ? study.timeline.actual / 4 
          : study.timeline.actual
        switch (selectedTimeline) {
          case '0-3m': return timelineMonths <= 3
          case '3-6m': return timelineMonths > 3 && timelineMonths <= 6
          case '6-12m': return timelineMonths > 6 && timelineMonths <= 12
          case '12m+': return timelineMonths > 12
          default: return true
        }
      })
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(study =>
        study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredStudies(filtered)
  }, [selectedProjectType, selectedBudgetRange, selectedLocation, selectedTimeline, searchQuery, caseStudies])

  const featuredStudy = caseStudies.find(study => study.featured)

  const toggleImage = (studyId: string) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [studyId]: prev[studyId] === 1 ? 0 : 1
    }))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatMetric = (value: number, metric: typeof successMetrics[0]) => {
    if (metric.suffix === '/5') {
      return value.toFixed(1)
    }
    if (value > 1000000) {
      return (value / 1000000).toFixed(1) + 'M'
    }
    if (value > 1000) {
      return (value / 1000).toFixed(0) + 'k'
    }
    return value.toString()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Real Projects, Real Savings,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">
                Real Results
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover how BuildMate AI AI has helped UK homeowners and developers save millions 
              while delivering exceptional construction projects across the country.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 text-lg">
                <Download className="h-5 w-5 mr-2" />
                Download Case Studies
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                <Play className="h-5 w-5 mr-2" />
                Watch Success Stories
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Metrics Banner */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl md:text-5xl font-bold mb-2 ${metric.color}`}>
                  {metric.prefix}
                  {formatMetric(animatedMetrics[index] || 0, metric)}
                  {metric.suffix}
                </div>
                <div className="text-gray-600 font-medium">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Case Study Spotlight */}
      {featuredStudy && (
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Success Story
              </h2>
              <p className="text-xl text-gray-600">
                This month's outstanding project achievement
              </p>
            </div>
            
            <Card className="overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-8 p-8">
                {/* Image Section with Before/After Slider */}
                <div className="relative">
                  <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden">
                    <img
                      src={currentImageIndex[featuredStudy.id] === 1 ? featuredStudy.afterImage : featuredStudy.beforeImage}
                      alt={currentImageIndex[featuredStudy.id] === 1 ? 'After' : 'Before'}
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {currentImageIndex[featuredStudy.id] === 1 ? 'After' : 'Before'}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleImage(featuredStudy.id)}
                      className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-lg font-medium transition-all"
                    >
                      View {currentImageIndex[featuredStudy.id] === 1 ? 'Before' : 'After'}
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {featuredStudy.title}
                    </h3>
                    <p className="text-xl text-blue-600 font-semibold mb-4">
                      {featuredStudy.subtitle}
                    </p>
                    <p className="text-gray-600 text-lg">
                      {featuredStudy.description}
                    </p>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(featuredStudy.savings)}
                      </div>
                      <div className="text-sm text-green-700">Total Savings</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {featuredStudy.timeline.planned - featuredStudy.timeline.actual} {featuredStudy.timeline.unit}
                      </div>
                      <div className="text-sm text-blue-700">Ahead of Schedule</div>
                    </div>
                  </div>

                  {/* Client Quote */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <Quote className="h-8 w-8 text-blue-600 mb-3" />
                    <p className="text-gray-700 italic mb-3">"{featuredStudy.quote}"</p>
                    <p className="text-sm font-medium text-gray-900">
                      — {featuredStudy.client}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button>
                      <Eye className="h-4 w-4 mr-2" />
                      Read Full Story
                    </Button>
                    <Button variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search case studies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex gap-4">
              <select
                value={selectedProjectType}
                onChange={(e) => setSelectedProjectType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {projectTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedBudgetRange}
                onChange={(e) => setSelectedBudgetRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {budgetRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {locations.map(location => (
                  <option key={location.value} value={location.value}>
                    {location.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedTimeline}
                onChange={(e) => setSelectedTimeline(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {timelines.map(timeline => (
                  <option key={timeline.value} value={timeline.value}>
                    {timeline.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-4 grid grid-cols-2 gap-3">
              <select
                value={selectedProjectType}
                onChange={(e) => setSelectedProjectType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {projectTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedBudgetRange}
                onChange={(e) => setSelectedBudgetRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {budgetRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {locations.map(location => (
                  <option key={location.value} value={location.value}>
                    {location.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedTimeline}
                onChange={(e) => setSelectedTimeline(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {timelines.map(timeline => (
                  <option key={timeline.value} value={timeline.value}>
                    {timeline.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            All Case Studies ({filteredStudies.length})
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudies.map((study) => (
            <Card 
              key={study.id} 
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Image with Before/After Slider */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={currentImageIndex[study.id] === 1 ? study.afterImage : study.beforeImage}
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                    {currentImageIndex[study.id] === 1 ? 'After' : 'Before'}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleImage(study.id)
                  }}
                  className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-gray-900 px-2 py-1 rounded text-xs font-medium transition-all"
                >
                  {currentImageIndex[study.id] === 1 ? 'Before' : 'After'}
                </button>
                
                {/* Project Type Badge */}
                <div className="absolute top-3 right-3">
                  <span className={cn(
                    "px-2 py-1 rounded text-xs font-medium",
                    study.projectType === 'new_build' && "bg-blue-100 text-blue-700",
                    study.projectType === 'extension' && "bg-green-100 text-green-700",
                    study.projectType === 'renovation' && "bg-purple-100 text-purple-700",
                    study.projectType === 'commercial' && "bg-orange-100 text-orange-700"
                  )}>
                    {study.projectType.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-blue-600 font-semibold text-sm mb-2">
                    {study.subtitle}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {study.description}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-lg font-bold text-green-600">
                      {formatCurrency(study.savings)}
                    </div>
                    <div className="text-xs text-green-700">Saved</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">
                      {study.timeline.actual} {study.timeline.unit}
                    </div>
                    <div className="text-xs text-blue-700">Timeline</div>
                  </div>
                </div>

                {/* Location and Client */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {study.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {study.client}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Completed {new Date(study.completionDate).toLocaleDateString('en-GB')}
                  </div>
                </div>

                {/* Client Quote */}
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-gray-700 italic">
                    "{study.quote.substring(0, 100)}..."
                  </p>
                </div>

                {/* Success Highlights */}
                <div className="space-y-2 mb-4">
                  {study.results.slice(0, 2).map((result, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{result}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Read More
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {filteredStudies.length >= 6 && (
          <div className="text-center mt-12">
            <Button variant="outline" className="px-8 py-3">
              Load More Case Studies
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your Own Success Story
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of UK homeowners and developers who have transformed 
              their construction projects with BuildMate AI AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg">
                <Home className="h-5 w-5 mr-2" />
                Start Your Project
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                <Users className="h-5 w-5 mr-2" />
                Talk to an Expert
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Get Case Study Updates
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to read about new success stories and construction insights from the BuildMate AI community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button className="px-6 py-3">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}