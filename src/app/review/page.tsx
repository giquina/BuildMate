'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Check, Users, Package, Calendar, DollarSign, MapPin, Home, Star, Clock, Truck, Phone, MessageCircle, Download, Share2, CreditCard, Save, Sparkles } from 'lucide-react'

export default function ReviewPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const loadingSteps = [
    { text: 'Analyzing your requirements', icon: '🔍', duration: 2000 },
    { text: 'Finding the best team for your project', icon: '👥', duration: 2500 },
    { text: 'Sourcing all materials', icon: '📦', duration: 2000 },
    { text: 'Calculating optimal timeline', icon: '📅', duration: 1500 },
    { text: 'Securing best prices', icon: '💰', duration: 1500 }
  ]

  useEffect(() => {
    const runLoadingSequence = async () => {
      for (let i = 0; i < loadingSteps.length; i++) {
        setCurrentStep(i)
        await new Promise(resolve => setTimeout(resolve, loadingSteps[i].duration))
      }
      setIsLoading(false)
      setShowResults(true)
    }

    runLoadingSequence()
  }, [])

  const projectData = {
    house: {
      title: 'Your 3-Bedroom Modern Home',
      location: 'Birmingham, UK',
      bedrooms: 3,
      bathrooms: 2,
      style: 'Modern Contemporary',
      features: ['Home Office', 'Garage', 'Smart Home Integration']
    },
    team: [
      {
        name: 'James Mitchell',
        role: 'Lead Builder',
        rating: 4.9,
        reviews: 127,
        image: '👷‍♂️',
        specialty: 'New Build Construction',
        experience: '12 years',
        message: 'Excited to build your dream home!'
      },
      {
        name: 'Sarah Cooper',
        role: 'Project Manager',
        rating: 5.0,
        reviews: 89,
        image: '👩‍💼',
        specialty: 'Project Coordination',
        experience: '8 years',
        message: 'I\'ll handle all permits and coordination'
      },
      {
        name: 'David Park',
        role: 'Architect',
        rating: 4.8,
        reviews: 156,
        image: '👨‍💼',
        specialty: 'Modern Design',
        experience: '15 years',
        message: 'Your design is exceptional!'
      }
    ],
    materials: {
      totalItems: 847,
      suppliers: 6,
      categories: [
        { name: 'Foundation & Structure', items: 156, cost: 42750 },
        { name: 'Roofing & Exterior', items: 89, cost: 28900 },
        { name: 'Electrical & Plumbing', items: 234, cost: 31200 },
        { name: 'Interior & Finishes', items: 298, cost: 38650 },
        { name: 'Kitchen & Bathrooms', items: 70, cost: 24500 }
      ],
      totalCost: 166000,
      savings: 12550
    },
    timeline: {
      totalWeeks: 78,
      moveInDate: 'March 15, 2026',
      phases: [
        { name: 'Planning & Permits', weeks: 8, status: 'upcoming' },
        { name: 'Foundation', weeks: 12, status: 'upcoming' },
        { name: 'Structure & Roofing', weeks: 16, status: 'upcoming' },
        { name: 'Electrical & Plumbing', weeks: 14, status: 'upcoming' },
        { name: 'Interior & Finishes', weeks: 20, status: 'upcoming' },
        { name: 'Final Inspection', weeks: 8, status: 'upcoming' }
      ]
    },
    investment: {
      totalCost: 187450,
      originalBudget: 200000,
      savings: 12550,
      breakdown: [
        { item: 'Materials', cost: 166000 },
        { item: 'Labour', cost: 15450 },
        { item: 'Permits & Fees', cost: 4200 },
        { item: 'Project Management', cost: 1800 }
      ]
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="mb-8">
            <div className="text-6xl mb-4 animate-bounce">🤖</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Assembling Your Perfect Project</h1>
            <p className="text-gray-600 mb-8">This usually takes 30 seconds</p>
          </div>

          <div className="space-y-4">
            {loadingSteps.map((step, index) => (
              <div key={index} className={`flex items-center p-4 rounded-xl transition-all duration-500 ${
                index <= currentStep 
                  ? 'bg-white shadow-lg border-l-4 border-green-500' 
                  : 'bg-gray-50'
              }`}>
                <div className="text-2xl mr-4">
                  {index <= currentStep ? '✅' : step.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className={`font-medium ${
                    index <= currentStep ? 'text-green-800' : 'text-gray-500'
                  }`}>
                    {step.text}
                  </div>
                </div>
                {index === currentStep && index < loadingSteps.length && (
                  <div className="ml-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="text-blue-800 font-medium">Almost ready...</div>
            <div className="text-blue-600 text-sm">Finalizing your project details</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/configure" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Modify Project
            </Link>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Your Project Assembly</h1>
              <p className="text-green-600 font-medium">✅ Everything Ready to Build</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-gray-700">
                <Save className="h-5 w-5 mr-2" />
                Save for Later
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-700">
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        
        {/* Success Banner */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 text-center animate-fade-in">
          <div className="text-4xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold mb-2">Project Assembly Complete!</h2>
          <p className="text-green-100 text-lg">
            Your dream home is ready to build. Review everything below and start with one click.
          </p>
        </div>

        {/* 1. Your Dream Home */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-slide-up">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <div className="flex items-center">
              <Home className="h-8 w-8 mr-3" />
              <div>
                <h3 className="text-2xl font-bold">Your Dream Home</h3>
                <p className="text-blue-100">Birmingham, UK • Modern Contemporary</p>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* 3D Visualization */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">3D Visualization</h4>
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center relative overflow-hidden group">
                  <div className="text-center">
                    <div className="text-6xl mb-4 animate-float">🏢</div>
                    <button className="bg-white/90 hover:bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full mr-3 animate-pulse"></div>
                        Walk Through Your Home
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Specifications */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Specifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-600">Bedrooms</span>
                    <span className="font-semibold text-gray-900">{projectData.house.bedrooms}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-600">Bathrooms</span>
                    <span className="font-semibold text-gray-900">{projectData.house.bathrooms}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-600">Style</span>
                    <span className="font-semibold text-gray-900">{projectData.house.style}</span>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <div className="text-sm text-gray-600 mb-2">Special Features:</div>
                    <div className="flex flex-wrap gap-2">
                      {projectData.house.features.map((feature, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Your Team (Uber-style) */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-slide-up" style={{animationDelay: '0.1s'}}>
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 mr-3" />
              <div>
                <h3 className="text-2xl font-bold">Your Team</h3>
                <p className="text-purple-100">Available to start in 2 weeks</p>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-6">
              {projectData.team.map((member, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  {/* Team Member Card - Uber Style */}
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                      {member.image}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">{member.name}</h4>
                    <p className="text-blue-600 font-medium">{member.role}</p>
                  </div>
                  
                  {/* Rating like ride-sharing */}
                  <div className="flex items-center justify-center mb-3">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold">{member.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({member.reviews} reviews)</span>
                  </div>
                  
                  <div className="text-center space-y-2 mb-4">
                    <div className="text-sm text-gray-600">{member.specialty}</div>
                    <div className="text-sm text-gray-600">{member.experience} experience</div>
                  </div>
                  
                  {/* Message from team member */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
                    <div className="text-blue-800 text-sm italic">"{member.message}"</div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Chat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Your Materials */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 mr-3" />
                <div>
                  <h3 className="text-2xl font-bold">Your Materials</h3>
                  <p className="text-green-100">All deliveries coordinated</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900">{projectData.materials.totalItems}</div>
                  <div className="text-sm text-gray-600">Items Sourced</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900">{projectData.materials.suppliers}</div>
                  <div className="text-sm text-gray-600">Suppliers</div>
                </div>
              </div>
              
              <div className="space-y-3">
                {projectData.materials.categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{category.name}</div>
                      <div className="text-sm text-gray-600">{category.items} items</div>
                    </div>
                    <div className="text-gray-900 font-semibold">
                      £{category.cost.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-green-800 font-medium">Total Materials Cost</span>
                  <span className="text-2xl font-bold text-green-600">
                    £{projectData.materials.totalCost.toLocaleString()}
                  </span>
                </div>
                <div className="text-green-600 text-sm mt-1">
                  £{projectData.materials.savings.toLocaleString()} saved through bulk purchasing
                </div>
              </div>
            </div>
          </div>

          {/* 4. Your Timeline */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 mr-3" />
                <div>
                  <h3 className="text-2xl font-bold">Your Timeline</h3>
                  <p className="text-orange-100">Move-in: {projectData.timeline.moveInDate}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-xl text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {projectData.timeline.totalWeeks} weeks
                </div>
                <div className="text-orange-800">Total Project Duration</div>
              </div>
              
              <div className="space-y-4">
                {projectData.timeline.phases.map((phase, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm mr-4">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{phase.name}</div>
                      <div className="text-sm text-gray-600">{phase.weeks} weeks</div>
                    </div>
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="text-blue-800 font-medium text-sm">Weather Considerations</div>
                <div className="text-blue-600 text-sm">Optimal building season scheduled</div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Your Investment */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-slide-up" style={{animationDelay: '0.4s'}}>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 mr-3" />
                <div>
                  <h3 className="text-2xl font-bold">Your Investment</h3>
                  <p className="text-indigo-100">Clear cost breakdown</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">£{projectData.investment.totalCost.toLocaleString()}</div>
                <div className="text-green-200 font-medium">Under budget!</div>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h4>
                <div className="space-y-3">
                  {projectData.investment.breakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="text-gray-600">{item.item}</span>
                      <span className="font-semibold text-gray-900">£{item.cost.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="border-t pt-3">
                    <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl">
                      <span className="font-semibold text-indigo-900">Total Project Cost</span>
                      <span className="text-2xl font-bold text-indigo-600">
                        £{projectData.investment.totalCost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Budget Analysis</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Original Budget</span>
                      <span className="font-semibold">£{projectData.investment.originalBudget.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Final Cost</span>
                      <span className="font-semibold">£{projectData.investment.totalCost.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        £{projectData.investment.savings.toLocaleString()}
                      </div>
                      <div className="text-green-800 font-medium">Total Savings</div>
                      <div className="text-green-600 text-sm mt-1">
                        You're under budget! 🎉
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Plan Options
                    </button>
                    <button className="w-full flex items-center justify-center p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                      <Download className="h-5 w-5 mr-2" />
                      Download Estimate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* One-Click Execution */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 text-center animate-slide-up" style={{animationDelay: '0.5s'}}>
          <div className="max-w-2xl mx-auto">
            <div className="text-5xl mb-6">🚀</div>
            <h2 className="text-4xl font-bold mb-4">Ready to Build?</h2>
            <p className="text-blue-100 text-xl mb-8">
              Everything is assembled and ready. Start your dream home project with one click.
            </p>
            
            <div className="space-y-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center bg-white text-blue-600 font-bold text-xl px-12 py-6 rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
              >
                <Sparkles className="mr-3 h-6 w-6" />
                START BUILDING MY DREAM HOME
              </Link>
              
              <div className="text-blue-100 text-lg">
                £{projectData.investment.totalCost.toLocaleString()} • Ready in {projectData.timeline.totalWeeks} weeks
              </div>
              
              <div className="flex items-center justify-center space-x-6 text-blue-200 text-sm">
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2" />
                  No hidden fees
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2" />
                  Cancel anytime
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 mr-2" />
                  Fixed price guarantee
                </div>
              </div>
            </div>
            
            {/* Secondary Actions */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                href="/configure"
                className="flex items-center bg-transparent text-white border-2 border-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Modify Project
              </Link>
              <button className="flex items-center bg-transparent text-white border-2 border-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300">
                <Save className="mr-2 h-5 w-5" />
                Save for Later
              </button>
              <button className="flex items-center bg-transparent text-white border-2 border-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300">
                <CreditCard className="mr-2 h-5 w-5" />
                Get Financing
              </button>
              <button className="flex items-center bg-transparent text-white border-2 border-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300">
                <Share2 className="mr-2 h-5 w-5" />
                Share with Family
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}