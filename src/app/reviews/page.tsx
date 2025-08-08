'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { 
  Star, 
  Search, 
  Filter, 
  Play, 
  MapPin, 
  Calendar, 
  ThumbsUp, 
  MessageSquare, 
  Camera, 
  Video, 
  CheckCircle,
  Heart,
  Share2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  StarHalf,
  Award,
  TrendingUp,
  Users,
  Building,
  Home,
  Hammer,
  Paintbrush2,
  Zap,
  Droplets
} from 'lucide-react'

interface Review {
  id: string
  customerName: string
  customerLocation: string
  projectType: string
  rating: number
  reviewText: string
  date: string
  verified: boolean
  helpful: number
  photos?: string[]
  videoUrl?: string
  projectDetails: {
    budget: number
    timeline: string
    savings?: number
  }
  professionalName?: string
  buildMateResponse?: {
    text: string
    date: string
    responder: string
  }
}

interface VideoTestimonial {
  id: string
  customerName: string
  thumbnail: string
  duration: string
  title: string
  location: string
  projectType: string
}

interface ProfessionalReview {
  id: string
  professionalName: string
  company: string
  customerName: string
  rating: number
  reviewText: string
  date: string
  projectType: string
  location: string
}

const mockReviews: Review[] = [
  {
    id: '1',
    customerName: 'Jennifer Mills',
    customerLocation: 'Birmingham',
    projectType: 'Extension',
    rating: 5,
    reviewText: "BuildMate AI AI turned our extension nightmare into a dream project. The AI layouts saved us £15k in architectural fees! The professional network was incredible - every tradesperson was vetted and professional. We finished 3 weeks early and under budget. Couldn't be happier with the results.",
    date: '2024-01-15',
    verified: true,
    helpful: 47,
    photos: ['extension-before.jpg', 'extension-after.jpg', 'kitchen-view.jpg'],
    projectDetails: {
      budget: 85000,
      timeline: '16 weeks',
      savings: 15000
    },
    professionalName: 'James Mitchell - Mitchell Construction',
    buildMateResponse: {
      text: "Thank you Jennifer! We're thrilled that our AI layout optimization helped save you £15k. Your project is a perfect example of how technology and skilled professionals can work together. Congratulations on your beautiful new extension!",
      date: '2024-01-16',
      responder: 'BuildMate AI Team'
    }
  },
  {
    id: '2',
    customerName: 'Marcus Thompson',
    customerLocation: 'Manchester',
    projectType: 'New Build',
    rating: 5,
    reviewText: "As a first-time builder, I was terrified. BuildMate AI's professional network held my hand through everything. The step-by-step guidance and project management tools were invaluable. Finished 3 weeks early and the quality is exceptional!",
    date: '2024-01-10',
    verified: true,
    helpful: 32,
    projectDetails: {
      budget: 245000,
      timeline: '18 months',
      savings: 18000
    },
    professionalName: 'Sarah Thompson - Elite Construction'
  },
  {
    id: '3',
    customerName: 'Sarah Roberts',
    customerLocation: 'Leeds',
    projectType: 'Kitchen Renovation',
    rating: 5,
    reviewText: "The material savings alone paid for our Pro subscription 10 times over. Incredible platform. The bulk buying options and supplier comparisons saved us thousands. The AI space optimization suggestions were brilliant too.",
    date: '2024-01-08',
    verified: true,
    helpful: 28,
    photos: ['kitchen-before.jpg', 'kitchen-after.jpg'],
    projectDetails: {
      budget: 35000,
      timeline: '8 weeks',
      savings: 7000
    }
  },
  {
    id: '4',
    customerName: 'The Anderson Family',
    customerLocation: 'Glasgow',
    projectType: 'Full Renovation',
    rating: 4,
    reviewText: "From planning permission to final inspection, BuildMate AI guided every step. The professional coordination was seamless. Only minor issue was a delay with materials, but the team handled it professionally.",
    date: '2024-01-05',
    verified: true,
    helpful: 19,
    projectDetails: {
      budget: 120000,
      timeline: '24 weeks'
    }
  },
  {
    id: '5',
    customerName: 'Emma Richardson',
    customerLocation: 'London',
    projectType: 'Kitchen Renovation',
    rating: 5,
    reviewText: "40% material savings through BuildMate AI's supplier network! The AI space optimization suggestions transformed our cramped kitchen into a spacious, functional heart of our home. Outstanding platform.",
    date: '2024-01-03',
    verified: true,
    helpful: 35,
    photos: ['london-kitchen-before.jpg', 'london-kitchen-after.jpg', 'island-detail.jpg'],
    videoUrl: 'kitchen-tour-video.mp4',
    projectDetails: {
      budget: 28000,
      timeline: '6 weeks',
      savings: 11200
    }
  }
]

const mockVideoTestimonials: VideoTestimonial[] = [
  {
    id: '1',
    customerName: 'Jennifer Mills',
    thumbnail: 'jennifer-thumbnail.jpg',
    duration: '3:45',
    title: 'How BuildMate AI Saved Us £15k on Our Extension',
    location: 'Birmingham',
    projectType: 'Extension'
  },
  {
    id: '2',
    customerName: 'Marcus Thompson',
    thumbnail: 'marcus-thumbnail.jpg',
    duration: '4:12',
    title: 'First-Time Builder Success Story',
    location: 'Manchester',
    projectType: 'New Build'
  },
  {
    id: '3',
    customerName: 'Sarah Roberts',
    thumbnail: 'sarah-thumbnail.jpg',
    duration: '2:38',
    title: 'Kitchen Transformation Journey',
    location: 'Leeds',
    projectType: 'Kitchen Renovation'
  }
]

const mockProfessionalReviews: ProfessionalReview[] = [
  {
    id: '1',
    professionalName: 'Mike Stevens',
    company: 'Elite Construction',
    customerName: 'BuildMate AI Platform',
    rating: 5,
    reviewText: "BuildMate AI connects me with serious, prepared clients. My project completion rate increased 40%. The platform's project management tools help me deliver on time, every time. Highly recommend to fellow professionals.",
    date: '2024-01-12',
    projectType: 'Professional Network',
    location: 'Birmingham'
  },
  {
    id: '2',
    professionalName: 'Rachel Cooper',
    company: 'RC Electrical Services',
    customerName: 'BuildMate AI Platform',
    rating: 5,
    reviewText: "The platform's project management tools help me deliver on time, every time. Clients come with realistic budgets and clear plans. It's transformed how I run my business.",
    date: '2024-01-10',
    projectType: 'Professional Network',
    location: 'Manchester'
  },
  {
    id: '3',
    professionalName: 'David Park',
    company: 'Park & Associates Architects',
    customerName: 'BuildMate AI Platform',
    rating: 4,
    reviewText: "BuildMate AI clients come with realistic budgets and clear plans. Makes my job so much easier. The AI layout suggestions often provide great starting points for my designs.",
    date: '2024-01-08',
    projectType: 'Professional Network',
    location: 'London'
  }
]

const ratingBreakdown = {
  5: 78,
  4: 15,
  3: 4,
  2: 2,
  1: 1
}

export default function ReviewsPage() {
  const [reviews] = useState<Review[]>(mockReviews)
  const [videoTestimonials] = useState<VideoTestimonial[]>(mockVideoTestimonials)
  const [professionalReviews] = useState<ProfessionalReview[]>(mockProfessionalReviews)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [selectedProjectType, setSelectedProjectType] = useState<string>('')
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [showSubmissionForm, setShowSubmissionForm] = useState(false)
  const [featuredReviewIndex, setFeaturedReviewIndex] = useState(0)

  // Auto-rotate featured reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedReviewIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [reviews.length])

  const totalReviews = reviews.length
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.reviewText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.projectType.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRating = selectedRating ? review.rating === selectedRating : true
    const matchesProjectType = selectedProjectType ? review.projectType === selectedProjectType : true
    const matchesLocation = selectedLocation ? review.customerLocation === selectedLocation : true
    
    return matchesSearch && matchesRating && matchesProjectType && matchesLocation
  })

  const renderStars = (rating: number, size = 'sm') => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const renderProgressBar = (percentage: number, animated = true) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-1000 ${
          animated ? 'animate-pulse' : ''
        }`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Customer Reviews & Testimonials
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See what thousands of UK homeowners and professionals are saying about their BuildMate AI experience
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overall Rating Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Overall Rating */}
            <div className="text-center lg:border-r border-gray-200 pr-8">
              <div className="text-5xl font-bold text-gray-900 mb-2">{averageRating.toFixed(1)}</div>
              {renderStars(averageRating, 'lg')}
              <div className="text-gray-600 mt-2">Based on {totalReviews} reviews</div>
              <div className="flex items-center justify-center mt-4">
                <Award className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Excellent Rating</span>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="lg:px-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Breakdown</h3>
              <div className="space-y-3">
                {Object.entries(ratingBreakdown).reverse().map(([rating, percentage]) => (
                  <div key={rating} className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 w-8">{rating}★</span>
                    <div className="flex-1 mx-3">
                      {renderProgressBar(percentage)}
                    </div>
                    <span className="text-sm text-gray-600 w-10">{percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Stats */}
            <div className="lg:pl-8 lg:border-l border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Success Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Savings Generated</span>
                  <span className="font-semibold text-green-600">£2.3M+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Projects Completed</span>
                  <span className="font-semibold text-blue-600">15,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Average Cost Reduction</span>
                  <span className="font-semibold text-green-600">23%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Return Users</span>
                  <span className="font-semibold text-purple-600">89%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Reviews Carousel */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Success Stories</h2>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFeaturedReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFeaturedReviewIndex((prev) => (prev + 1) % reviews.length)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  {renderStars(reviews[featuredReviewIndex].rating, 'lg')}
                  <span className="ml-3 text-sm font-medium text-gray-600">
                    {reviews[featuredReviewIndex].date}
                  </span>
                </div>
                
                <blockquote className="text-xl text-gray-800 mb-6 leading-relaxed">
                  "{reviews[featuredReviewIndex].reviewText}"
                </blockquote>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">
                      {reviews[featuredReviewIndex].customerName}
                    </div>
                    <div className="text-gray-600 text-sm flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {reviews[featuredReviewIndex].customerLocation} • {reviews[featuredReviewIndex].projectType}
                    </div>
                  </div>
                  {reviews[featuredReviewIndex].verified && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-5 w-5 mr-1" />
                      <span className="text-sm font-medium">Verified Customer</span>
                    </div>
                  )}
                </div>

                {reviews[featuredReviewIndex].projectDetails.savings && (
                  <div className="mt-4 p-4 bg-white rounded-xl border border-green-200">
                    <div className="flex items-center text-green-700">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      <span className="font-semibold">
                        Saved £{reviews[featuredReviewIndex].projectDetails.savings?.toLocaleString()} through BuildMate AI
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center">
                  <Camera className="h-8 w-8 text-gray-400" />
                  <span className="ml-2 text-gray-500">Before Photo</span>
                </div>
                <div className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center">
                  <Camera className="h-8 w-8 text-gray-400" />
                  <span className="ml-2 text-gray-500">After Photo</span>
                </div>
                <div className="col-span-2 aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
                  <Video className="h-8 w-8 text-gray-400" />
                  <span className="ml-2 text-gray-500">Customer Video Testimonial</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <select
              value={selectedRating || ''}
              onChange={(e) => setSelectedRating(e.target.value ? Number(e.target.value) : null)}
              className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>

            <select
              value={selectedProjectType}
              onChange={(e) => setSelectedProjectType(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Project Types</option>
              <option value="Extension">Extension</option>
              <option value="New Build">New Build</option>
              <option value="Kitchen Renovation">Kitchen Renovation</option>
              <option value="Full Renovation">Full Renovation</option>
              <option value="Loft Conversion">Loft Conversion</option>
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Locations</option>
              <option value="Birmingham">Birmingham</option>
              <option value="Manchester">Manchester</option>
              <option value="London">London</option>
              <option value="Leeds">Leeds</option>
              <option value="Glasgow">Glasgow</option>
            </select>
          </div>
        </div>

        {/* Video Testimonials Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Video Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoTestimonials.map((video) => (
              <div key={video.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden card-hover-lift">
                <div className="relative aspect-video bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-4">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
                  <div className="text-sm text-gray-600 mb-2">{video.customerName}</div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {video.location} • {video.projectType}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Helpful Reviews */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Most Helpful Reviews</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reviews
              .sort((a, b) => b.helpful - a.helpful)
              .slice(0, 4)
              .map((review) => (
                <Card key={review.id} className="card-hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                        {review.verified && (
                          <CheckCircle className="h-4 w-4 text-green-600 ml-2" />
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {review.date}
                      </div>
                    </div>

                    <p className="text-gray-800 mb-4 leading-relaxed">{review.reviewText}</p>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div>
                        <div className="font-medium text-gray-900">{review.customerName}</div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {review.customerLocation} • {review.projectType}
                        </div>
                      </div>
                      
                      {review.projectDetails.savings && (
                        <div className="text-right">
                          <div className="text-green-600 font-semibold">
                            Saved £{review.projectDetails.savings.toLocaleString()}
                          </div>
                          <div className="text-gray-500">through BuildMate AI</div>
                        </div>
                      )}
                    </div>

                    {review.photos && (
                      <div className="flex space-x-2 mb-4">
                        {review.photos.slice(0, 3).map((photo, index) => (
                          <div key={index} className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Camera className="h-6 w-6 text-gray-400" />
                          </div>
                        ))}
                        {review.photos.length > 3 && (
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-600">
                            +{review.photos.length - 3}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          <span className="text-sm">Helpful ({review.helpful})</span>
                        </button>
                        <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                          <Share2 className="h-4 w-4 mr-1" />
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>

                    {review.buildMateResponse && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <Building className="h-4 w-4 text-white" />
                          </div>
                          <div className="ml-3">
                            <div className="font-medium text-blue-900">{review.buildMateResponse.responder}</div>
                            <div className="text-sm text-blue-700">{review.buildMateResponse.date}</div>
                          </div>
                        </div>
                        <p className="text-blue-800">{review.buildMateResponse.text}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* Professional Reviews Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Professionals Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {professionalReviews.map((review) => (
              <Card key={review.id} className="card-hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {renderStars(review.rating)}
                    <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                  </div>
                  
                  <p className="text-gray-800 mb-4 leading-relaxed">{review.reviewText}</p>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <div className="font-semibold text-gray-900">{review.professionalName}</div>
                    <div className="text-gray-600 text-sm">{review.company}</div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {review.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Reviews */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              All Reviews ({filteredReviews.length})
            </h2>
            <Button onClick={() => setShowSubmissionForm(true)}>
              Write a Review
            </Button>
          </div>

          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <Card key={review.id} className="card-hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                      {review.verified && (
                        <CheckCircle className="h-4 w-4 text-green-600 ml-2" />
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {review.date}
                    </div>
                  </div>

                  <p className="text-gray-800 mb-4 leading-relaxed">{review.reviewText}</p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="font-medium text-gray-900 mb-1">{review.customerName}</div>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="h-3 w-3 mr-1" />
                        {review.customerLocation} • {review.projectType}
                      </div>
                      {review.professionalName && (
                        <div className="text-sm text-gray-600">
                          Professional: {review.professionalName}
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <div className="text-gray-500">Budget</div>
                        <div className="font-medium">£{review.projectDetails.budget.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Timeline</div>
                        <div className="font-medium">{review.projectDetails.timeline}</div>
                      </div>
                      {review.projectDetails.savings && (
                        <div>
                          <div className="text-gray-500">Saved</div>
                          <div className="font-medium text-green-600">
                            £{review.projectDetails.savings.toLocaleString()}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {review.photos && (
                    <div className="flex space-x-2 mb-4">
                      {review.photos.slice(0, 4).map((photo, index) => (
                        <div key={index} className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Camera className="h-6 w-6 text-gray-400" />
                        </div>
                      ))}
                      {review.photos.length > 4 && (
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-600">
                          +{review.photos.length - 4}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span className="text-sm">Helpful ({review.helpful})</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span className="text-sm">Reply</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                        <Share2 className="h-4 w-4 mr-1" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>

                  {review.buildMateResponse && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <Building className="h-4 w-4 text-white" />
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-blue-900">{review.buildMateResponse.responder}</div>
                          <div className="text-sm text-blue-700">{review.buildMateResponse.date}</div>
                        </div>
                      </div>
                      <p className="text-blue-800">{review.buildMateResponse.text}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Review Submission Form Modal */}
        {showSubmissionForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Write a Review</h3>
                <button
                  onClick={() => setShowSubmissionForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Overall Rating
                  </label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="text-gray-300 hover:text-yellow-400"
                      >
                        <Star className="h-8 w-8" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <Input placeholder="Enter your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <Input placeholder="City, UK" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select project type</option>
                    <option>Extension</option>
                    <option>New Build</option>
                    <option>Kitchen Renovation</option>
                    <option>Bathroom Renovation</option>
                    <option>Full Renovation</option>
                    <option>Loft Conversion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review Title
                  </label>
                  <Input placeholder="Summarize your experience" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about your BuildMate AI experience..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Budget
                    </label>
                    <Input placeholder="£50,000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount Saved (Optional)
                    </label>
                    <Input placeholder="£5,000" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Photos (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Click to upload photos of your project</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <label className="ml-2 text-sm text-gray-600">
                    I verify that this review is based on my own experience with BuildMate AI
                  </label>
                </div>

                <div className="flex space-x-4">
                  <Button type="submit" className="flex-1">
                    Submit Review
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowSubmissionForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Thousands of Satisfied Customers
          </h2>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
            Start your own success story with BuildMate AI AI. Get AI-powered layouts, find verified professionals, and save thousands on your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Your Project
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              View Success Stories
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}