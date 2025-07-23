'use client'

import { useState } from 'react'

// Mock data based on CLAUDE.md specifications
const featuredStory = {
  id: 1,
  title: "Birmingham Victorian Extension: £45k Under Budget, 6 Weeks Early",
  client: "The Johnson Family",
  projectType: "Double-story rear extension",
  originalBudget: 85000,
  finalCost: 69000,
  savings: 16000,
  timeline: {
    planned: 22,
    actual: 16,
    saved: 6
  },
  professionals: ["Mitchell Construction", "Elite Electrical"],
  keySuccess: "AI layout optimization saved £12k in structural changes",
  testimonial: "BuildMate AI turned our extension nightmare into a dream project. The AI layouts saved us £15k in architectural fees!",
  location: "Birmingham",
  beforeImage: "/api/placeholder/600/400",
  afterImage: "/api/placeholder/600/400",
  videoThumbnail: "/api/placeholder/600/400"
}

const successStories = [
  {
    id: 2,
    title: "Manchester New Build: First-Time Buyers' Dream Realized",
    client: "Sarah & David Chen",
    projectType: "3-bedroom eco-friendly house",
    budget: 245000,
    savings: 18000,
    timeline: 18,
    category: "First-time buyers",
    testimonial: "As first-time builders, we were terrified. BuildMate's professional network held our hand through everything. Finished 3 weeks early!",
    location: "Manchester",
    beforeImage: "/api/placeholder/400/300",
    afterImage: "/api/placeholder/400/300",
    roi: 28.5
  },
  {
    id: 3,
    title: "London Kitchen Revolution: 40% Material Savings",
    client: "Emma Richardson",
    projectType: "Open-plan kitchen renovation",
    budget: 35000,
    finalCost: 28000,
    savings: 7000,
    timeline: 8,
    category: "Renovations",
    testimonial: "The material savings alone paid for our Pro subscription 10 times over. Incredible platform.",
    location: "London",
    beforeImage: "/api/placeholder/400/300",
    afterImage: "/api/placeholder/400/300",
    roi: 25.0
  },
  {
    id: 4,
    title: "Leeds Commercial Renovation: Professional Network Excellence",
    client: "Yorkshire Property Group",
    projectType: "Office space conversion",
    budget: 120000,
    savings: 22000,
    timeline: 12,
    category: "Commercial",
    testimonial: "BuildMate connects me with serious, prepared clients. My project completion rate increased 40%.",
    location: "Leeds",
    beforeImage: "/api/placeholder/400/300",
    afterImage: "/api/placeholder/400/300",
    roi: 18.3
  },
  {
    id: 5,
    title: "Liverpool Heritage Home Restoration: Respectful Modernization",
    client: "The Williams Estate",
    projectType: "Victorian terrace renovation",
    budget: 75000,
    finalCost: 71000,
    savings: 4000,
    timeline: 20,
    category: "Extensions",
    testimonial: "From planning permission to final inspection, BuildMate guided every step. Couldn't be happier.",
    location: "Liverpool",
    beforeImage: "/api/placeholder/400/300",
    afterImage: "/api/placeholder/400/300",
    roi: 5.3
  }
]

const professionalTestimonials = [
  {
    name: "Mike Stevens",
    company: "Elite Construction",
    testimonial: "BuildMate connects me with serious, prepared clients. My project completion rate increased 40%.",
    rating: 5,
    projects: 47
  },
  {
    name: "Rachel Cooper",
    company: "RC Electrical Services",
    testimonial: "The platform's project management tools help me deliver on time, every time.",
    rating: 5,
    projects: 23
  },
  {
    name: "David Park",
    company: "Park & Associates Architects",
    testimonial: "BuildMate clients come with realistic budgets and clear plans. Makes my job so much easier.",
    rating: 5,
    projects: 31
  }
]

const timelineSteps = [
  { phase: "Planning & Design", duration: "2-4 weeks", description: "AI-powered layout optimization and permit planning" },
  { phase: "Professional Selection", duration: "1 week", description: "Matched with verified professionals in our network" },
  { phase: "Material Sourcing", duration: "1-2 weeks", description: "Bulk purchasing and delivery coordination" },
  { phase: "Construction Phase", duration: "8-20 weeks", description: "Project execution with real-time monitoring" },
  { phase: "Final Inspection", duration: "1 week", description: "Quality assurance and handover" }
]

export default function SuccessStoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeStory, setActiveStory] = useState<number | null>(null)
  const [showSubmissionForm, setShowSubmissionForm] = useState(false)
  const [beforeAfterMode, setBeforeAfterMode] = useState<{ [key: number]: 'before' | 'after' }>({})

  const categories = ['All', 'First-time buyers', 'Extensions', 'Renovations', 'Commercial']

  const filteredStories = selectedCategory === 'All' 
    ? successStories 
    : successStories.filter(story => story.category === selectedCategory)

  const toggleBeforeAfter = (storyId: number) => {
    setBeforeAfterMode(prev => ({
      ...prev,
      [storyId]: prev[storyId] === 'before' ? 'after' : 'before'
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              From Dream to Reality
            </h1>
            <p className="text-2xl md:text-3xl font-light mb-8 text-blue-100">
              UK Builders' Success Stories
            </p>
            <p className="text-xl max-w-3xl mx-auto text-blue-200 leading-relaxed">
              Discover how BuildMate AI has transformed construction projects across the UK, 
              delivering exceptional savings, quality, and peace of mind.
            </p>
          </div>

          {/* Success Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in">
            {[
              { label: "Total Savings", value: "£2.3M+", icon: "💰" },
              { label: "Projects Completed", value: "15,847", icon: "🏗️" },
              { label: "Average Savings", value: "23%", icon: "📊" },
              { label: "Satisfaction Rate", value: "4.8/5", icon: "⭐" }
            ].map((metric, index) => (
              <div key={index} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-3xl mb-2">{metric.icon}</div>
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <div className="text-blue-200 text-sm">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Story of the Month */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Success Story</h2>
          <p className="text-lg text-gray-600">This month's spotlight project showcasing exceptional results</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Video/Image Section */}
            <div className="relative">
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                <img 
                  src={featuredStory.videoThumbnail} 
                  alt="Featured project video"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <button className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors animate-scale-hover">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Before/After Gallery */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="relative">
                  <img src={featuredStory.beforeImage} alt="Before" className="w-full h-32 object-cover rounded-lg" />
                  <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">Before</span>
                </div>
                <div className="relative">
                  <img src={featuredStory.afterImage} alt="After" className="w-full h-32 object-cover rounded-lg" />
                  <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">After</span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Featured Story</span>
                <span className="text-gray-500">{featuredStory.location}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredStory.title}</h3>
              <p className="text-lg text-gray-600 mb-6 italic">"{featuredStory.testimonial}"</p>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">£{featuredStory.savings.toLocaleString()}</div>
                  <div className="text-sm text-green-700">Total Savings</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{featuredStory.timeline.saved} weeks</div>
                  <div className="text-sm text-blue-700">Ahead of Schedule</div>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Client:</span>
                  <span className="font-medium">{featuredStory.client}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Project Type:</span>
                  <span className="font-medium">{featuredStory.projectType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Budget:</span>
                  <span className="font-medium">£{featuredStory.originalBudget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Final Cost:</span>
                  <span className="font-medium text-green-600">£{featuredStory.finalCost.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-yellow-800 mb-2">Key Success Factor</h4>
                <p className="text-yellow-700">{featuredStory.keySuccess}</p>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Read Complete Case Study
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Story Categories Filter */}
      <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Project Progression Timeline</h2>
          <p className="text-lg text-gray-600">See how our process delivers consistent results</p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
          
          {timelineSteps.map((step, index) => (
            <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                <div className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.phase}</h3>
                  <p className="text-blue-600 font-medium mb-2">{step.duration}</p>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {index + 1}
                </div>
              </div>
              
              <div className="w-1/2"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">More Success Stories</h2>
          <p className="text-lg text-gray-600">Real projects, real savings, real results across the UK</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <div key={story.id} className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition-all duration-300 card-hover-lift">
              {/* Before/After Image Toggle */}
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={beforeAfterMode[story.id] === 'after' ? story.afterImage : story.beforeImage}
                  alt={beforeAfterMode[story.id] === 'after' ? 'After renovation' : 'Before renovation'}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                <button
                  onClick={() => toggleBeforeAfter(story.id)}
                  className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm hover:bg-black/80 transition-colors"
                >
                  {beforeAfterMode[story.id] === 'after' ? 'Show Before' : 'Show After'}
                </button>
                <span className={`absolute top-4 left-4 px-2 py-1 text-xs rounded text-white ${
                  beforeAfterMode[story.id] === 'after' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {beforeAfterMode[story.id] === 'after' ? 'After' : 'Before'}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {story.category}
                  </span>
                  <span className="text-gray-500 text-sm">{story.location}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{story.title}</h3>
                <p className="text-gray-600 text-sm mb-4 italic">"{story.testimonial}"</p>

                {/* Budget Breakdown */}
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 text-sm">Budget:</span>
                    <span className="font-medium">£{story.budget.toLocaleString()}</span>
                  </div>
                  {story.finalCost && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600 text-sm">Final Cost:</span>
                      <span className="font-medium text-green-600">£{story.finalCost.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Savings:</span>
                    <span className="font-bold text-green-600">£{story.savings.toLocaleString()}</span>
                  </div>
                </div>

                {/* ROI Visualization */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">ROI</span>
                    <span className="text-sm font-bold text-green-600">{story.roi}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(story.roi, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-sm text-gray-500 mb-4">
                  Timeline: {story.timeline} weeks • Client: {story.client}
                </div>

                <button 
                  onClick={() => setActiveStory(activeStory === story.id ? null : story.id)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  {activeStory === story.id ? 'Hide Details' : 'View Full Story'}
                </button>

                {/* Expandable Details */}
                {activeStory === story.id && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg animate-slide-up">
                    <h4 className="font-semibold text-blue-900 mb-2">Project Details</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Type:</strong> {story.projectType}</div>
                      <div><strong>Timeline:</strong> {story.timeline} weeks</div>
                      <div><strong>Location:</strong> {story.location}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Professional Network Testimonials */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Network Testimonials</h2>
            <p className="text-lg text-gray-600">What construction professionals say about working with BuildMate</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {professionalTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.company}</p>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-700 mb-4 italic">"{testimonial.testimonial}"</p>
                
                <div className="text-sm text-gray-500">
                  {testimonial.projects} projects completed via BuildMate
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Story Form */}
      <section className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Share Your Success Story</h2>
          <p className="text-lg text-gray-600">Help inspire other builders by sharing your BuildMate experience</p>
        </div>

        {!showSubmissionForm ? (
          <div className="text-center">
            <button 
              onClick={() => setShowSubmissionForm(true)}
              className="bg-blue-600 text-white py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg animate-scale-hover"
            >
              Share Your Story
            </button>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-lg border animate-slide-up">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Location</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Select project type...</option>
                  <option>New Build</option>
                  <option>Extension</option>
                  <option>Renovation</option>
                  <option>Commercial</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget (£)</label>
                  <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Savings (£)</label>
                  <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timeline (weeks)</label>
                  <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Success Story</label>
                <textarea 
                  rows={6} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about your experience with BuildMate AI..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photos (Before/After)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Submit Story
                </button>
                <button 
                  type="button"
                  onClick={() => setShowSubmissionForm(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Own Success Story?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of UK builders who have transformed their projects with BuildMate AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Start Your Project
            </button>
            <button className="border-2 border-white text-white py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium">
              Book Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}