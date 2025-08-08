'use client'

import Link from 'next/link'
import { ArrowLeft, Star, Home, Users, Clock, CheckCircle, Award, Quote, MapPin, Calendar, Hammer } from 'lucide-react'
import { useState } from 'react'

export default function TestimonialsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      role: 'Homeowner',
      location: 'Surrey Hills, KT21',
      projectType: 'New Build',
      image: '/testimonials/sarah-mitchell.jpg',
      rating: 5,
      date: '2024-07-15',
      category: 'homeowner',
      quote: 'BuildMate AI AI transformed our home building journey from overwhelming to exciting. The AI floorplan generator created exactly what we envisioned, and connecting with verified professionals was seamless.',
      story: 'After months of struggling with traditional architects, Sarah discovered BuildMate AI AI. Within 2 weeks, she had AI-generated floorplans, material quotes from 3 suppliers, and was connected with James Mitchell, a verified builder. Her £450,000 new build was completed 3 weeks ahead of schedule.',
      results: {
        timeSaved: '6 weeks',
        moneySaved: '£15,000',
        satisfaction: '10/10'
      },
      tags: ['AI Floorplans', 'Professional Network', 'Budget Optimizer']
    },
    {
      id: 2,
      name: 'James Mitchell',
      role: 'Verified Builder',
      location: 'Greater London',
      projectType: 'Professional Services',
      image: '/testimonials/james-mitchell.jpg',
      rating: 5,
      date: '2024-07-20',
      category: 'professional',
      quote: 'As a builder, BuildMate AI AI has revolutionized how I connect with serious clients. The platform pre-qualifies homeowners and provides detailed project specs, making every conversation productive.',
      story: 'James joined BuildMate AI AI after 15 years of traditional lead generation. In 6 months, his project completion rate improved by 40%, client satisfaction scores reached 4.9/5, and he reduced project delays by 60% through better upfront planning.',
      results: {
        projectIncrease: '40%',
        clientSatisfaction: '4.9/5',
        delayReduction: '60%'
      },
      tags: ['Lead Quality', 'Project Management', 'Client Communication']
    },
    {
      id: 3,
      name: 'David & Emma Thompson',
      role: 'Property Developers',
      location: 'Manchester, M1',
      projectType: 'Multi-unit Development',
      image: '/testimonials/thompson-developers.jpg',
      rating: 5,
      date: '2024-06-28',
      category: 'developer',
      quote: 'For our 12-unit development project, BuildMate AI AI was invaluable. The bulk materials sourcing saved us £89,000, and the AI-generated layouts optimized space utilization by 15%.',
      story: 'The Thompsons were developing their first multi-unit project in Manchester. BuildMate AI AI\'s bulk purchasing power, combined with AI-optimized layouts and verified subcontractor network, helped them complete the £2.4M project under budget and ahead of schedule.',
      results: {
        moneySaved: '£89,000',
        spaceOptimization: '15%',
        completionTime: '2 weeks early'
      },
      tags: ['Bulk Materials', 'Space Optimization', 'Subcontractor Network']
    },
    {
      id: 4,
      name: 'Rachel Green',
      role: 'Renovation Specialist',
      location: 'Edinburgh, EH1',
      projectType: 'Victorian Conversion',
      image: '/testimonials/rachel-green.jpg',
      rating: 5,
      date: '2024-07-10',
      category: 'professional',
      quote: 'The heritage building regulations compliance features in BuildMate AI AI saved me countless hours. For Victorian conversions, having UK building regs built into the platform is a game-changer.',
      story: 'Rachel specializes in Victorian property conversions in Edinburgh. BuildMate AI AI\'s compliance checking, heritage building materials sourcing, and conservation-approved professional network helped her complete 8 conversion projects with zero compliance issues.',
      results: {
        complianceIssues: '0',
        projectsCompleted: '8',
        regulatoryApproval: '100%'
      },
      tags: ['Heritage Buildings', 'Compliance', 'Specialized Materials']
    }
  ]

  const categories = [
    { id: 'all', label: 'All Stories', count: testimonials.length },
    { id: 'homeowner', label: 'Homeowners', count: testimonials.filter(t => t.category === 'homeowner').length },
    { id: 'professional', label: 'Professionals', count: testimonials.filter(t => t.category === 'professional').length },
    { id: 'developer', label: 'Developers', count: testimonials.filter(t => t.category === 'developer').length }
  ]

  const filteredTestimonials = selectedCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Customer Success Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from UK homeowners, builders, and developers using BuildMate AI AI to transform their construction projects
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg shadow-sm p-2 flex space-x-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {filteredTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-gray-600">{testimonial.role}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {testimonial.location}
                        <Calendar className="h-3 w-3 ml-3 mr-1" />
                        {new Date(testimonial.date).toLocaleDateString('en-GB')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">
                  <Hammer className="h-3 w-3 mr-1" />
                  {testimonial.projectType}
                </div>
              </div>

              {/* Quote */}
              <div className="p-6">
                <div className="relative">
                  <Quote className="h-8 w-8 text-blue-200 absolute -top-2 -left-2" />
                  <blockquote className="text-gray-700 text-lg leading-relaxed pl-6">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              </div>

              {/* Story */}
              <div className="px-6 pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Success Story</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {testimonial.story}
                </p>
              </div>

              {/* Results */}
              <div className="px-6 pb-4">
                <h4 className="font-semibold text-gray-900 mb-3">Results Achieved</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {Object.entries(testimonial.results).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-green-600">{value}</div>
                      <div className="text-xs text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="px-6 pb-6">
                <div className="flex flex-wrap gap-2">
                  {testimonial.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white text-center mb-16">
          <h2 className="text-2xl font-bold mb-6">Platform Success Metrics</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold">247</div>
              <div className="text-blue-100">Homes Designed</div>
            </div>
            <div>
              <div className="text-3xl font-bold">£2.4M</div>
              <div className="text-blue-100">Total Savings</div>
            </div>
            <div>
              <div className="text-3xl font-bold">94%</div>
              <div className="text-blue-100">On-Time Completion</div>
            </div>
            <div>
              <div className="text-3xl font-bold">4.8/5</div>
              <div className="text-blue-100">Average Rating</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of UK homeowners and professionals who are transforming their construction projects with BuildMate AI AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/configure"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Start Your Project
              <Home className="h-4 w-4 ml-2" />
            </Link>
            <Link 
              href="/professionals"
              className="inline-flex items-center border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              Join as Professional
              <Users className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}