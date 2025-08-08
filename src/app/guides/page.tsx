'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Search, 
  BookOpen, 
  Play, 
  Download, 
  CheckCircle, 
  Clock, 
  Star,
  Home,
  Hammer,
  Palette,
  Cpu,
  Users,
  ShoppingCart,
  Settings,
  Eye,
  ChevronRight,
  Filter,
  Grid,
  List,
  HelpCircle,
  MessageCircle,
  Bookmark,
  Share2,
  ArrowRight,
  FileText,
  Video,
  Image as ImageIcon,
  Zap,
  Award,
  Target,
  Lightbulb,
  Wrench,
  PaintBucket,
  Calculator,
  Map,
  FileCheck,
  TrendingUp,
  Shield,
  Heart,
  Globe,
  Coffee
} from 'lucide-react'

// Types
interface Guide {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  type: 'article' | 'video' | 'interactive' | 'checklist'
  featured: boolean
  rating: number
  completions: number
  thumbnail: string
  tags: string[]
  steps?: number
  downloadUrl?: string
}

interface GuideCategory {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  guides: Guide[]
}

interface Tutorial {
  id: string
  title: string
  description: string
  videoUrl: string
  duration: string
  thumbnail: string
  category: string
  views: number
}

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  helpful: number
}

export default function GuidesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [completedGuides, setCompletedGuides] = useState<string[]>([])
  const [bookmarkedGuides, setBookmarkedGuides] = useState<string[]>([])

  // Mock data
  const guideCategories: GuideCategory[] = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      description: 'Essential guides for your first BuildMate AI project',
      icon: <Home className="h-6 w-6" />,
      color: 'blue',
      guides: [
        {
          id: 'first-project-setup',
          title: 'First Project Setup Guide',
          description: 'Complete walkthrough of setting up your very first building project on BuildMate AI',
          category: 'getting-started',
          difficulty: 'beginner',
          duration: '15 min',
          type: 'interactive',
          featured: true,
          rating: 4.9,
          completions: 2847,
          thumbnail: '/api/placeholder/400/300',
          tags: ['setup', 'beginner', 'project-creation'],
          steps: 8
        },
        {
          id: 'platform-overview',
          title: 'BuildMate AI Platform Overview',
          description: 'Understanding all features and capabilities of the Tesla-Uber building experience',
          category: 'getting-started',
          difficulty: 'beginner',
          duration: '10 min',
          type: 'video',
          featured: true,
          rating: 4.8,
          completions: 3102,
          thumbnail: '/api/placeholder/400/300',
          tags: ['overview', 'features', 'introduction']
        }
      ]
    },
    {
      id: 'project-types',
      name: 'Project Types',
      description: 'Specialized guides for different building projects',
      icon: <Hammer className="h-6 w-6" />,
      color: 'orange',
      guides: [
        {
          id: 'extension-planning',
          title: 'Extension Planning',
          description: 'Complete guide to planning and executing home extensions with BuildMate AI AI',
          category: 'project-types',
          difficulty: 'intermediate',
          duration: '25 min',
          type: 'article',
          featured: true,
          rating: 4.7,
          completions: 1893,
          thumbnail: '/api/placeholder/400/300',
          tags: ['extension', 'planning', 'permits'],
          steps: 12
        },
        {
          id: 'new-build-process',
          title: 'New Build Process',
          description: 'Step-by-step guide for managing new construction projects from ground up',
          category: 'project-types',
          difficulty: 'advanced',
          duration: '45 min',
          type: 'interactive',
          featured: true,
          rating: 4.9,
          completions: 967,
          thumbnail: '/api/placeholder/400/300',
          tags: ['new-build', 'construction', 'management'],
          steps: 18
        },
        {
          id: 'renovation-tips',
          title: 'Renovation Tips',
          description: 'Expert tips and best practices for successful home renovations',
          category: 'project-types',
          difficulty: 'intermediate',
          duration: '20 min',
          type: 'article',
          featured: false,
          rating: 4.6,
          completions: 2156,
          thumbnail: '/api/placeholder/400/300',
          tags: ['renovation', 'tips', 'best-practices'],
          steps: 10
        }
      ]
    },
    {
      id: 'feature-tutorials',
      name: 'Feature Tutorials',
      description: 'Learn to use specific BuildMate AI features effectively',
      icon: <Cpu className="h-6 w-6" />,
      color: 'purple',
      guides: [
        {
          id: 'using-ai-generator',
          title: 'Using the AI Generator',
          description: 'Master the AI-powered design and planning tools for optimal results',
          category: 'feature-tutorials',
          difficulty: 'intermediate',
          duration: '18 min',
          type: 'interactive',
          featured: true,
          rating: 4.8,
          completions: 2234,
          thumbnail: '/api/placeholder/400/300',
          tags: ['ai', 'generator', 'design'],
          steps: 9
        },
        {
          id: 'finding-professionals',
          title: 'Finding Professionals',
          description: 'How to find, vet, and hire the right professionals for your project',
          category: 'feature-tutorials',
          difficulty: 'beginner',
          duration: '12 min',
          type: 'video',
          featured: true,
          rating: 4.7,
          completions: 1876,
          thumbnail: '/api/placeholder/400/300',
          tags: ['professionals', 'hiring', 'vetting']
        },
        {
          id: 'materials-shopping',
          title: 'Materials Shopping',
          description: 'Complete guide to sourcing and purchasing materials through BuildMate AI',
          category: 'feature-tutorials',
          difficulty: 'beginner',
          duration: '15 min',
          type: 'article',
          featured: false,
          rating: 4.5,
          completions: 2987,
          thumbnail: '/api/placeholder/400/300',
          tags: ['materials', 'shopping', 'sourcing'],
          steps: 7
        }
      ]
    },
    {
      id: 'tesla-uber-specific',
      name: 'Tesla-Uber Experience',
      description: 'Guides specific to the Tesla-Uber building methodology',
      icon: <Zap className="h-6 w-6" />,
      color: 'green',
      guides: [
        {
          id: 'configure-your-home',
          title: 'How to Configure Your Home',
          description: 'Complete guide to using our Tesla-inspired configuration system',
          category: 'tesla-uber-specific',
          difficulty: 'intermediate',
          duration: '22 min',
          type: 'interactive',
          featured: true,
          rating: 4.9,
          completions: 1654,
          thumbnail: '/api/placeholder/400/300',
          tags: ['configuration', 'tesla-style', 'customization'],
          steps: 11
        },
        {
          id: 'project-review-understanding',
          title: 'Understanding Your Project Review',
          description: 'How to interpret and act on your comprehensive project reviews',
          category: 'tesla-uber-specific',
          difficulty: 'beginner',
          duration: '16 min',
          type: 'video',
          featured: true,
          rating: 4.8,
          completions: 2103,
          thumbnail: '/api/placeholder/400/300',
          tags: ['review', 'feedback', 'optimization']
        }
      ]
    }
  ]

  const videoTutorials: Tutorial[] = [
    {
      id: 'quick-start',
      title: 'BuildMate AI Quick Start (5 minutes)',
      description: 'Get up and running with your first project in under 5 minutes',
      videoUrl: '/api/placeholder/video/quick-start',
      duration: '4:32',
      thumbnail: '/api/placeholder/600/400',
      category: 'getting-started',
      views: 15234
    },
    {
      id: 'ai-design-mastery',
      title: 'AI Design Mastery',
      description: 'Advanced techniques for getting the best results from our AI generator',
      videoUrl: '/api/placeholder/video/ai-mastery',
      duration: '12:18',
      thumbnail: '/api/placeholder/600/400',
      category: 'feature-tutorials',
      views: 8943
    },
    {
      id: 'professional-workflow',
      title: 'Professional Workflow Setup',
      description: 'How professionals use BuildMate AI for multiple client projects',
      videoUrl: '/api/placeholder/video/pro-workflow',
      duration: '18:45',
      thumbnail: '/api/placeholder/600/400',
      category: 'tesla-uber-specific',
      views: 6721
    },
    {
      id: 'cost-optimization',
      title: 'Cost Optimization Strategies',
      description: 'Proven methods to reduce project costs without compromising quality',
      videoUrl: '/api/placeholder/video/cost-optimization',
      duration: '15:33',
      thumbnail: '/api/placeholder/600/400',
      category: 'project-types',
      views: 9876
    }
  ]

  const downloadableGuides = [
    {
      id: 'pre-build-checklist',
      title: 'Pre-Build Checklist',
      description: 'Complete checklist covering everything needed before starting construction',
      type: 'PDF Checklist',
      pages: 8,
      downloads: 12456,
      downloadUrl: '/downloads/pre-build-checklist.pdf'
    },
    {
      id: 'materials-calculator',
      title: 'Materials Calculator Template',
      description: 'Excel template for calculating material quantities and costs',
      type: 'Excel Template',
      pages: 12,
      downloads: 8934,
      downloadUrl: '/downloads/materials-calculator.xlsx'
    },
    {
      id: 'planning-permission-guide',
      title: 'Planning Permission Guide',
      description: 'UK-specific guide to planning permission requirements and applications',
      type: 'PDF Guide',
      pages: 24,
      downloads: 15672,
      downloadUrl: '/downloads/planning-permission-guide.pdf'
    },
    {
      id: 'contractor-interview-template',
      title: 'Contractor Interview Template',
      description: 'Template for interviewing and evaluating potential contractors',
      type: 'Word Document',
      pages: 6,
      downloads: 7823,
      downloadUrl: '/downloads/contractor-interview.docx'
    }
  ]

  const faqs: FAQ[] = [
    {
      id: 'faq-1',
      question: 'How do I start my first project on BuildMate AI?',
      answer: 'Starting your first project is simple! Click "Start Building" from the main navigation, choose your project type (new build, extension, or renovation), and follow our step-by-step setup wizard. The AI will guide you through each decision point.',
      category: 'getting-started',
      helpful: 234
    },
    {
      id: 'faq-2',
      question: 'What makes the Tesla-Uber experience different?',
      answer: 'Our Tesla-Uber experience combines the simplicity of Tesla\'s configuration approach with Uber\'s service reliability. You configure your ideal home like a Tesla, and we handle the complex logistics like Uber handles transportation.',
      category: 'tesla-uber-specific',
      helpful: 189
    },
    {
      id: 'faq-3',
      question: 'How accurate are the AI-generated designs?',
      answer: 'Our AI designs are highly accurate and follow UK building regulations. Each design is reviewed by qualified professionals and includes detailed specifications. However, we always recommend final review by a local architect or structural engineer.',
      category: 'feature-tutorials',
      helpful: 156
    },
    {
      id: 'faq-4',
      question: 'Can I modify projects after they\'ve been started?',
      answer: 'Yes! Projects can be modified at any stage, though changes become more complex and costly once construction begins. Our system will show you the impact of any changes on timeline and budget.',
      category: 'project-types',
      helpful: 203
    }
  ]

  const communityTips = [
    {
      id: 'tip-1',
      user: 'Sarah M.',
      avatar: '/api/placeholder/40/40',
      tip: 'Always add 10-15% buffer to your material estimates. I learned this the hard way on my extension project!',
      likes: 127,
      category: 'Materials'
    },
    {
      id: 'tip-2',
      user: 'James R.',
      avatar: '/api/placeholder/40/40',
      tip: 'Use the AI generator multiple times with slight variations. I got much better results on my third attempt.',
      likes: 89,
      category: 'AI Tools'
    },
    {
      id: 'tip-3',
      user: 'Emma K.',
      avatar: '/api/placeholder/40/40',
      tip: 'Interview at least 3 contractors before making a decision. The platform makes it easy to compare quotes.',
      likes: 156,
      category: 'Professionals'
    },
    {
      id: 'tip-4',
      user: 'Mike T.',
      avatar: '/api/placeholder/40/40',
      tip: 'Start the planning permission process early - it takes longer than you think, even with BuildMate AI\'s help.',
      likes: 94,
      category: 'Planning'
    }
  ]

  // Get all guides for filtering
  const allGuides = guideCategories.flatMap(category => category.guides)

  // Filter guides based on search and filters
  const filteredGuides = allGuides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || guide.difficulty === selectedDifficulty
    const matchesType = selectedType === 'all' || guide.type === selectedType

    return matchesSearch && matchesCategory && matchesDifficulty && matchesType
  })

  // Get featured guides
  const featuredGuides = allGuides.filter(guide => guide.featured).slice(0, 6)

  const toggleBookmark = (guideId: string) => {
    setBookmarkedGuides(prev => 
      prev.includes(guideId) 
        ? prev.filter(id => id !== guideId)
        : [...prev, guideId]
    )
  }

  const markAsCompleted = (guideId: string) => {
    setCompletedGuides(prev => 
      prev.includes(guideId) ? prev : [...prev, guideId]
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />
      case 'interactive': return <Cpu className="h-4 w-4" />
      case 'checklist': return <FileCheck className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
              <BookOpen className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              BuildMate AI Knowledge Hub
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Master the Tesla-Uber building experience with comprehensive guides, tutorials, and expert insights
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search guides, tutorials, and resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              All Categories
            </button>
            {guideCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="article">Articles</option>
              <option value="video">Videos</option>
              <option value="interactive">Interactive</option>
              <option value="checklist">Checklists</option>
            </select>

            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Guides Carousel */}
        {selectedCategory === 'all' && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGuides.map((guide) => (
                <div
                  key={guide.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 card-hover-lift"
                >
                  <div className="relative">
                    <img
                      src={guide.thumbnail}
                      alt={guide.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() => toggleBookmark(guide.id)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                          bookmarkedGuides.includes(guide.id)
                            ? 'bg-blue-600 text-white'
                            : 'bg-white/80 text-gray-700 hover:bg-white'
                        }`}
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        {getTypeIcon(guide.type)}
                        <span className="text-xs font-medium capitalize">{guide.type}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs font-medium">{guide.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(guide.difficulty)}`}>
                        {guide.difficulty}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Star className="h-4 w-4 fill-current text-yellow-400" />
                        <span>{guide.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{guide.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{guide.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{guide.completions} completed</span>
                      <button
                        onClick={() => router.push(`/guides/${guide.id}`)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Start Guide
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Guide Results */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {searchQuery ? `Search Results (${filteredGuides.length})` : 'All Guides'}
            </h2>
            <span className="text-sm text-gray-500">
              {filteredGuides.length} guide{filteredGuides.length !== 1 ? 's' : ''} found
            </span>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => (
                <div
                  key={guide.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 card-hover-lift"
                >
                  <div className="relative">
                    <img
                      src={guide.thumbnail}
                      alt={guide.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() => toggleBookmark(guide.id)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                          bookmarkedGuides.includes(guide.id)
                            ? 'bg-blue-600 text-white'
                            : 'bg-white/80 text-gray-700 hover:bg-white'
                        }`}
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        {getTypeIcon(guide.type)}
                        <span className="text-xs font-medium capitalize">{guide.type}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs font-medium">{guide.duration}</span>
                      </div>
                    </div>
                    {completedGuides.includes(guide.id) && (
                      <div className="absolute top-4 left-4">
                        <div className="bg-green-600 text-white p-2 rounded-full">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(guide.difficulty)}`}>
                        {guide.difficulty}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Star className="h-4 w-4 fill-current text-yellow-400" />
                        <span>{guide.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{guide.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{guide.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {guide.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{guide.completions} completed</span>
                      <button
                        onClick={() => router.push(`/guides/${guide.id}`)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        {completedGuides.includes(guide.id) ? 'Review' : 'Start Guide'}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredGuides.map((guide) => (
                <div
                  key={guide.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start gap-6">
                    <img
                      src={guide.thumbnail}
                      alt={guide.title}
                      className="w-32 h-24 object-cover rounded-xl flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(guide.difficulty)}`}>
                          {guide.difficulty}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          {getTypeIcon(guide.type)}
                          <span className="capitalize">{guide.type}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{guide.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Star className="h-4 w-4 fill-current text-yellow-400" />
                          <span>{guide.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{guide.title}</h3>
                      <p className="text-gray-600 mb-3">{guide.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {guide.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{guide.completions} completed</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleBookmark(guide.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              bookmarkedGuides.includes(guide.id)
                                ? 'bg-blue-100 text-blue-600'
                                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            <Bookmark className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => router.push(`/guides/${guide.id}`)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            {completedGuides.includes(guide.id) ? 'Review' : 'Start Guide'}
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Video Tutorial Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Video Tutorials</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-2">
              View All
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoTutorials.map((tutorial) => (
              <div
                key={tutorial.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-200 card-hover-lift cursor-pointer"
                onClick={() => {/* Handle video play */}}
              >
                <div className="relative">
                  <img
                    src={tutorial.thumbnail}
                    alt={tutorial.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Play className="h-6 w-6 text-gray-900 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {tutorial.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{tutorial.title}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{tutorial.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{tutorial.views.toLocaleString()} views</span>
                    <span className="capitalize">{tutorial.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download Center */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Download Center</h2>
            <span className="text-sm text-gray-500">PDF guides and templates</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {downloadableGuides.map((guide) => (
              <div
                key={guide.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Download className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{guide.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{guide.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span>{guide.type}</span>
                      <span>•</span>
                      <span>{guide.pages} pages</span>
                      <span>•</span>
                      <span>{guide.downloads.toLocaleString()} downloads</span>
                    </div>
                    <button
                      onClick={() => window.open(guide.downloadUrl, '_blank')}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-600">Quick answers to common questions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4 pl-11">{faq.answer}</p>
                <div className="flex items-center justify-between pl-11">
                  <span className="text-xs text-gray-500 capitalize">{faq.category}</span>
                  <div className="flex items-center gap-2">
                    <button className="text-gray-400 hover:text-green-600 transition-colors">
                      <Heart className="h-4 w-4" />
                    </button>
                    <span className="text-xs text-gray-500">{faq.helpful} helpful</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Tips */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Community Tips</h2>
            <p className="text-gray-600">Real advice from BuildMate AI users</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityTips.map((tip) => (
              <div key={tip.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={tip.avatar}
                    alt={tip.user}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-gray-900">{tip.user}</span>
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        {tip.category}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">"{tip.tip}"</p>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{tip.likes}</span>
                      </button>
                      <button className="text-gray-500 hover:text-blue-500 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                      </button>
                      <button className="text-gray-500 hover:text-blue-500 transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Ready to Start Building?</h2>
            <p className="text-blue-100 mb-6">
              Apply what you've learned with our step-by-step project creation process
            </p>
            <button
              onClick={() => router.push('/start')}
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
            >
              Start Your Project
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}