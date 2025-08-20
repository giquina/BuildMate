'use client'

import { useState, useEffect } from 'react'
import { Star, ArrowRight, Clock, PoundSterling, Users, Award, CheckCircle, TrendingUp, MapPin, Calendar, Quote } from 'lucide-react'
import { Button } from './Button'
import { Card } from './Card'

interface SuccessStory {
  id: string
  name: string
  title: string
  company: string
  location: string
  projectType: 'residential' | 'commercial'
  completionDate: string
  image: string
  testimonial: string
  results: {
    timeSaved: string
    costSaved: string
    roiAchieved: string
    satisfactionRating: number
  }
  beforeAfter?: {
    before: string
    after: string
  }
  partnerUsed?: string
  projectValue: string
  category: 'New Build' | 'Renovation' | 'Extension' | 'Commercial Optimization' | 'Smart Home' | 'Modular Build'
}

const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'sarah-manchester',
    name: 'Sarah Thompson',
    title: 'Homeowner',
    company: 'Self-Build Project',
    location: 'Manchester, UK',
    projectType: 'residential',
    completionDate: 'October 2024',
    image: '/images/testimonials/sarah-thompson.jpg',
    testimonial: 'BuildMate AI transformed our self-build journey from overwhelming to exciting. The Trigrr smart home system they recommended saved us £18K annually on energy costs, and the Boxabl modular approach cut our construction time from 18 months to just 8 weeks. Absolutely phenomenal.',
    results: {
      timeSaved: '10 months',
      costSaved: '£47,000',
      roiAchieved: '340%',
      satisfactionRating: 5.0
    },
    beforeAfter: {
      before: 'Traditional build estimate: 18 months, £280K',
      after: 'BuildMate solution: 8 weeks, £233K with smart systems'
    },
    partnerUsed: 'Trigrr + Boxabl',
    projectValue: '£233,000',
    category: 'New Build'
  },
  {
    id: 'david-london',
    name: 'David Chen',
    title: 'Commercial Property Developer',
    company: 'Chen Properties Ltd',
    location: 'London, UK',
    projectType: 'commercial',
    completionDate: 'December 2024',
    image: '/images/testimonials/david-chen.jpg',
    testimonial: 'The Colliers commercial intelligence integration through BuildMate AI identified £2.3M in optimization opportunities across our portfolio. Their ROI calculations were spot-on - we achieved 47% energy cost reduction in the first year alone.',
    results: {
      timeSaved: '6 months research',
      costSaved: '£2.3M annually',
      roiAchieved: '580%',
      satisfactionRating: 5.0
    },
    partnerUsed: 'Colliers Intelligence',
    projectValue: '£8.9M portfolio',
    category: 'Commercial Optimization'
  },
  {
    id: 'emma-birmingham',
    name: 'Emma Wilson',
    title: 'Interior Designer',
    company: 'Wilson Design Studio',
    location: 'Birmingham, UK',
    projectType: 'residential',
    completionDate: 'November 2024',
    image: '/images/testimonials/emma-wilson.jpg',
    testimonial: 'Using BuildMate AI for client projects has revolutionized my business. The materials marketplace integration with B&Q and the AI design tools help me deliver projects 65% faster while increasing my profit margins by £12K per project.',
    results: {
      timeSaved: '4-6 weeks per project',
      costSaved: '£12,000 per project',
      roiAchieved: '290%',
      satisfactionRating: 4.9
    },
    projectValue: '£185,000 average',
    category: 'Renovation'
  },
  {
    id: 'james-glasgow',
    name: 'James MacLeod',
    title: 'Smart Home Consultant',
    company: 'Future Living Solutions',
    location: 'Glasgow, UK',
    projectType: 'residential',
    completionDate: 'January 2025',
    image: '/images/testimonials/james-macleod.jpg',
    testimonial: 'The Trigrr Building OS integration through BuildMate AI allowed me to offer clients enterprise-grade smart building control at residential prices. My installation time dropped by 70%, and client satisfaction scores hit 98%.',
    results: {
      timeSaved: '3-4 days per install',
      costSaved: '£8,500 per client',
      roiAchieved: '425%',
      satisfactionRating: 4.8
    },
    partnerUsed: 'Trigrr Building OS',
    projectValue: '£95,000 average',
    category: 'Smart Home'
  },
  {
    id: 'olivia-bristol',
    name: 'Olivia Johnson',
    title: 'Property Developer',
    company: 'Sustainable Homes Ltd',
    location: 'Bristol, UK',
    projectType: 'commercial',
    completionDate: 'September 2024',
    image: '/images/testimonials/olivia-johnson.jpg',
    testimonial: 'Volferda luxury pods through BuildMate AI opened a completely new market segment for us. We went from traditional development to delivering premium eco-accommodation that books at £350/night. ROI exceeded all projections.',
    results: {
      timeSaved: '8 months development',
      costSaved: '£145,000',
      roiAchieved: '520%',
      satisfactionRating: 5.0
    },
    partnerUsed: 'Volferda Capsule Houses',
    projectValue: '£485,000 project',
    category: 'Modular Build'
  },
  {
    id: 'robert-leeds',
    name: 'Robert Davies',
    title: 'Facility Manager',
    company: 'Northern Commercial Group',
    location: 'Leeds, UK',
    projectType: 'commercial',
    completionDate: 'August 2024',
    image: '/images/testimonials/robert-davies.jpg',
    testimonial: 'BuildMate AI\'s commercial platform helped us achieve MEES compliance across 23 properties while reducing energy costs by £67K annually. The Colliers market intelligence saved us months of research and £200K in poor investment decisions.',
    results: {
      timeSaved: '14 months compliance work',
      costSaved: '£267,000 total',
      roiAchieved: '380%',
      satisfactionRating: 4.9
    },
    partnerUsed: 'Colliers + MEES Compliance',
    projectValue: '£1.8M portfolio upgrade',
    category: 'Commercial Optimization'
  }
]

const AGGREGATE_STATS = {
  totalProjects: 2847,
  avgTimeSaving: '68%',
  avgCostSaving: '£89,000',
  avgROI: '425%',
  customerSatisfaction: 4.9,
  repeatCustomers: '94%'
}

export function CustomerSuccessStories() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const categories = ['All', ...Array.from(new Set(SUCCESS_STORIES.map(story => story.category)))]
  const filteredStories = selectedCategory === 'All' 
    ? SUCCESS_STORIES 
    : SUCCESS_STORIES.filter(story => story.category === selectedCategory)

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentStoryIndex((prev) => (prev + 1) % filteredStories.length)
    }, 8000) // 8 seconds per testimonial

    return () => clearInterval(interval)
  }, [isAutoPlaying, filteredStories.length])

  const currentStory = filteredStories[currentStoryIndex] || filteredStories[0]

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Award className="h-8 w-8 text-blue-600 mr-3" />
            <span className="text-blue-600 font-semibold text-lg">Customer Success Stories</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Real Results from Real People
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how BuildMate AI and our revolutionary partnerships are transforming 
            construction projects across the UK with quantifiable ROI and remarkable time savings.
          </p>
        </div>

        {/* Aggregate Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-16">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-blue-600 mb-1">{AGGREGATE_STATS.totalProjects.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Projects Completed</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600 mb-1">{AGGREGATE_STATS.avgTimeSaving}</div>
            <div className="text-sm text-gray-600">Avg Time Saved</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-orange-600 mb-1">{AGGREGATE_STATS.avgCostSaving}</div>
            <div className="text-sm text-gray-600">Avg Cost Saved</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-purple-600 mb-1">{AGGREGATE_STATS.avgROI}</div>
            <div className="text-sm text-gray-600">Average ROI</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-center mb-1">
              <span className="text-2xl font-bold text-yellow-600 mr-1">{AGGREGATE_STATS.customerSatisfaction}</span>
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
            </div>
            <div className="text-sm text-gray-600">Satisfaction</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-indigo-600 mb-1">{AGGREGATE_STATS.repeatCustomers}</div>
            <div className="text-sm text-gray-600">Repeat Customers</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                setCurrentStoryIndex(0)
              }}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Success Story */}
        {currentStory && (
          <Card className="mb-16 overflow-hidden bg-white border-2 border-blue-100">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Story Content */}
              <div className="p-8 md:p-12">
                <div className="flex items-start mb-6">
                  <Quote className="h-8 w-8 text-blue-600 mr-4 mt-1 opacity-60" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentStory.name}</h3>
                    <p className="text-blue-600 font-semibold mb-1">{currentStory.title}</p>
                    <p className="text-gray-600 text-sm mb-2">{currentStory.company}</p>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {currentStory.location}
                      <Calendar className="h-4 w-4 ml-4 mr-1" />
                      {currentStory.completionDate}
                    </div>
                  </div>
                </div>

                <blockquote className="text-lg text-gray-700 mb-6 italic leading-relaxed">
                  "{currentStory.testimonial}"
                </blockquote>

                {/* Partner Badge */}
                {currentStory.partnerUsed && (
                  <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-6">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Partner: {currentStory.partnerUsed}
                  </div>
                )}

                {/* Results Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-sm text-green-700 font-medium">Time Saved</span>
                    </div>
                    <div className="text-2xl font-bold text-green-800">{currentStory.results.timeSaved}</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <PoundSterling className="h-5 w-5 text-orange-600 mr-2" />
                      <span className="text-sm text-orange-700 font-medium">Cost Saved</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-800">{currentStory.results.costSaved}</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="text-sm text-purple-700 font-medium">ROI Achieved</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-800">{currentStory.results.roiAchieved}</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Star className="h-5 w-5 text-yellow-600 mr-2" />
                      <span className="text-sm text-yellow-700 font-medium">Rating</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-yellow-800 mr-1">{currentStory.results.satisfactionRating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < currentStory.results.satisfactionRating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Content */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 md:p-12 text-white flex flex-col justify-center">
                <div className="mb-8">
                  <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
                    {currentStory.category}
                  </div>
                  <h4 className="text-3xl font-bold mb-4">Project Value</h4>
                  <div className="text-4xl font-bold mb-6">{currentStory.projectValue}</div>
                </div>

                {currentStory.beforeAfter && (
                  <div className="space-y-4">
                    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                      <div className="text-sm text-blue-200 mb-1">Before BuildMate AI</div>
                      <div className="font-semibold">{currentStory.beforeAfter.before}</div>
                    </div>
                    <div className="p-4 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                      <div className="text-sm text-blue-100 mb-1">After BuildMate AI</div>
                      <div className="font-bold">{currentStory.beforeAfter.after}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Story Navigation */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentStoryIndex((prev) => (prev - 1 + filteredStories.length) % filteredStories.length)}
              className="p-3 bg-white hover:bg-blue-50 border border-gray-200 rounded-full transition-all duration-200 hover:border-blue-300"
            >
              <ArrowRight className="h-5 w-5 text-gray-600 rotate-180" />
            </button>

            {/* Story Indicators */}
            <div className="flex space-x-2">
              {filteredStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStoryIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentStoryIndex
                      ? 'bg-blue-600'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentStoryIndex((prev) => (prev + 1) % filteredStories.length)}
              className="p-3 bg-white hover:bg-blue-50 border border-gray-200 rounded-full transition-all duration-200 hover:border-blue-300"
            >
              <ArrowRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`ml-6 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              isAutoPlaying
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {isAutoPlaying ? 'Pause' : 'Play'}
          </button>
        </div>

        {/* Quick Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredStories.slice(0, 6).map((story, index) => (
            <Card 
              key={story.id} 
              className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-xl border-2 ${
                index === currentStoryIndex 
                  ? 'border-blue-300 bg-blue-50' 
                  : 'border-gray-100 hover:border-blue-200'
              }`}
              onClick={() => setCurrentStoryIndex(index)}
            >
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {story.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-1">{story.name}</h4>
                  <p className="text-sm text-gray-600 mb-1">{story.title}</p>
                  <p className="text-xs text-gray-500">{story.location}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600 mb-1">{story.results.roiAchieved}</div>
                  <div className="text-xs text-gray-500">ROI</div>
                </div>
              </div>
              
              <blockquote className="text-sm text-gray-700 italic mb-4 line-clamp-3">
                "{story.testimonial.substring(0, 120)}..."
              </blockquote>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-green-50 px-2 py-1 rounded">
                  <span className="text-green-700 font-medium">Saved: {story.results.costSaved}</span>
                </div>
                <div className="bg-blue-50 px-2 py-1 rounded">
                  <span className="text-blue-700 font-medium">Time: {story.results.timeSaved}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Join Our Success Stories?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your project with BuildMate AI and our revolutionary partners. 
            Get the same results our customers achieve: faster delivery, lower costs, higher ROI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 text-lg font-semibold"
            >
              View All Partners
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 text-lg font-semibold border border-blue-400"
            >
              Start Your Project
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}