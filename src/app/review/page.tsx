'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Check, Users, Package, Calendar, PoundSterling, MapPin, Home, Star, Clock, Truck, Phone, MessageCircle, Download, Share2, CreditCard, Save, Sparkles, FileText, AlertTriangle, Shield, Award, Zap, Scale, Calculator, TrendingUp, BadgeCheck } from 'lucide-react'

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
      postcode: 'B15 2TT',
      bedrooms: 3,
      bathrooms: 2,
      style: 'Modern Contemporary',
      floorArea: 135, // m²
      plotSize: 250, // m²
      features: ['Home Office', 'Garage', 'Smart Home Integration'],
      planning: {
        required: true,
        type: 'Full Application',
        estimatedTime: '8-12 weeks',
        cost: 462 // Planning application fee
      },
      buildingRegs: {
        required: true,
        type: 'Full Plans Application',
        estimatedTime: '5-8 weeks',
        cost: 1200
      }
    },
    team: [
      {
        name: 'James Mitchell',
        role: 'Lead Builder & Project Manager',
        rating: 4.9,
        reviews: 127,
        image: '👷‍♂️',
        specialty: 'New Build Construction',
        experience: '12 years',
        message: 'Excited to build your dream home!',
        certifications: ['CITB Site Management Safety Training', 'CSCS Gold Card', 'FMB Member'],
        insurance: '£2M Public Liability',
        nextAvailable: '2024-03-15',
        phone: '0121 555 0123',
        verified: true
      },
      {
        name: 'Sarah Thompson',
        role: 'NICEIC Approved Electrician',
        rating: 5.0,
        reviews: 203,
        image: '⚡',
        specialty: 'Electrical Installation & Smart Home',
        experience: '10 years',
        message: 'I\'ll handle all electrical work and smart systems',
        certifications: ['NICEIC Approved Contractor', '18th Edition', 'Part P Qualified'],
        insurance: '£2M Public Liability + £10M Employers Liability',
        nextAvailable: '2024-03-20',
        phone: '0121 555 0456',
        verified: true
      },
      {
        name: 'Michael Chen',
        role: 'Gas Safe Heating Engineer',
        rating: 4.8,
        reviews: 156,
        image: '🔥',
        specialty: 'Central Heating & Boiler Installation',
        experience: '8 years',
        message: 'Modern heating system with 10-year warranty!',
        certifications: ['Gas Safe Registered', 'OFTEC Registered', 'Unvented Systems'],
        insurance: '£2M Public Liability',
        nextAvailable: '2024-04-01',
        phone: '0121 555 0789',
        verified: true,
        gaseSafeNumber: '123456'
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
        { 
          name: 'Planning Permission & Building Regs', 
          weeks: 12, 
          status: 'upcoming',
          details: ['Submit planning application', 'Building regulations approval', 'Structural calculations'],
          cost: 1662,
          weatherDependent: false
        },
        { 
          name: 'Site Preparation & Foundation', 
          weeks: 8, 
          status: 'upcoming',
          details: ['Site survey', 'Excavation', 'Concrete foundation', 'DPC installation'],
          cost: 28500,
          weatherDependent: true
        },
        { 
          name: 'Structure & Roofing', 
          weeks: 12, 
          status: 'upcoming',
          details: ['Timber frame', 'First fix roof', 'Wall construction', 'Roof covering'],
          cost: 45200,
          weatherDependent: true
        },
        { 
          name: 'First Fix Services', 
          weeks: 6, 
          status: 'upcoming',
          details: ['Electrical first fix', 'Plumbing first fix', 'Central heating', 'Insulation'],
          cost: 18750,
          weatherDependent: false
        },
        { 
          name: 'Plastering & Dry Lining', 
          weeks: 4, 
          status: 'upcoming',
          details: ['Internal walls', 'Ceiling finish', 'Skim coat', 'Drying time'],
          cost: 8900,
          weatherDependent: false
        },
        { 
          name: 'Second Fix & Finishes', 
          weeks: 10, 
          status: 'upcoming',
          details: ['Kitchen installation', 'Bathroom fit-out', 'Flooring', 'Decorating'],
          cost: 32400,
          weatherDependent: false
        },
        { 
          name: 'Final Fix & Commissioning', 
          weeks: 3, 
          status: 'upcoming',
          details: ['Final electrical tests', 'Boiler commissioning', 'Building control final inspection', 'Snagging'],
          cost: 2500,
          weatherDependent: false
        }
      ]
    },
    investment: {
      totalCost: 283912, // Realistic UK new build cost (135m² × £2,100/m²)
      originalBudget: 300000,
      savings: 16088,
      costPerSqM: 2103, // £/m²
      breakdown: [
        { item: 'Materials & Supplies', cost: 136512, vat: 27302, description: 'Standard VAT rate 20%' },
        { item: 'Labour Costs', cost: 89250, vat: 0, description: 'Zero-rated for new build' },
        { item: 'Professional Services', cost: 15450, vat: 3090, description: 'Architects, engineers, surveys' },
        { item: 'Planning & Building Control', cost: 4200, vat: 0, description: 'Local authority fees' },
        { item: 'Project Management', cost: 8500, vat: 1700, description: 'Site supervision & coordination' },
        { item: 'Contingency Fund', cost: 12000, vat: 0, description: '5% contingency for variations' }
      ],
      vatSummary: {
        zeroRated: 113950, // New build elements
        standardRated: 137862, // Materials and services
        totalVAT: 27572
      },
      regionalAdjustment: {
        location: 'Birmingham',
        multiplier: 0.95, // 5% below national average
        note: 'London typically 30-50% higher, Scotland/Wales 10-20% lower'
      }
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
                  
                  {/* Rating with verification */}
                  <div className="flex items-center justify-center mb-3">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold">{member.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({member.reviews} reviews)</span>
                    {member.verified && (
                      <BadgeCheck className="h-4 w-4 text-blue-600 ml-2" />
                    )}
                  </div>
                  
                  <div className="text-center space-y-2 mb-4">
                    <div className="text-sm text-gray-600">{member.specialty}</div>
                    <div className="text-sm text-gray-600">{member.experience} experience</div>
                    <div className="text-xs text-green-600 font-medium">{member.insurance}</div>
                  </div>

                  {/* UK Certifications */}
                  <div className="space-y-1 mb-4">
                    {member.certifications.map((cert, certIndex) => (
                      <div key={certIndex} className="flex items-center text-xs text-blue-700">
                        <Shield className="h-3 w-3 mr-1" />
                        {cert}
                      </div>
                    ))}
                    {member.gaseSafeNumber && (
                      <div className="flex items-center text-xs text-orange-600 font-medium">
                        <Zap className="h-3 w-3 mr-1" />
                        Gas Safe: {member.gaseSafeNumber}
                      </div>
                    )}
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
                  <div key={index} className={`border rounded-lg p-4 ${phase.weatherDependent ? 'border-orange-200 bg-orange-50' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm mr-4">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{phase.name}</div>
                          <div className="text-sm text-gray-600">{phase.weeks} weeks</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">£{phase.cost.toLocaleString()}</div>
                        {phase.weatherDependent && (
                          <div className="text-xs text-orange-600 flex items-center">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Weather dependent
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Phase details */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      {phase.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                          {detail}
                        </div>
                      ))}
                    </div>
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
                <PoundSterling className="h-8 w-8 mr-3" />
                <div>
                  <h3 className="text-2xl font-bold">Your Investment</h3>
                  <p className="text-indigo-100">Clear cost breakdown</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">£{projectData.investment.totalCost.toLocaleString()}</div>
                <div className="text-green-200 font-medium">£{projectData.investment.costPerSqM}/m² • Under budget!</div>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown with VAT</h4>
                <div className="space-y-3">
                  {projectData.investment.breakdown.map((item, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-900 font-medium">{item.item}</span>
                        <span className="font-semibold text-gray-900">£{item.cost.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{item.description}</span>
                        {item.vat > 0 ? (
                          <span className="text-red-600">+£{item.vat.toLocaleString()} VAT</span>
                        ) : (
                          <span className="text-green-600">VAT exempt</span>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* VAT Summary */}
                  <div className="border-t pt-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-3">
                      <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Scale className="h-4 w-4 mr-2" />
                        UK VAT Summary
                      </h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Zero-rated (new build elements):</span>
                          <span>£{projectData.investment.vatSummary.zeroRated.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Standard-rated (materials & services):</span>
                          <span>£{projectData.investment.vatSummary.standardRated.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-semibold border-t pt-2">
                          <span>Total VAT (20%):</span>
                          <span>£{projectData.investment.vatSummary.totalVAT.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl">
                      <span className="font-semibold text-indigo-900">Total Project Cost (inc. VAT)</span>
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
                  
                  {/* Regional Cost Context */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mb-4">
                    <div className="flex items-center mb-2">
                      <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="font-semibold text-blue-900">Regional Adjustment</span>
                    </div>
                    <div className="text-sm text-blue-800">
                      <div className="flex justify-between mb-1">
                        <span>Location: {projectData.investment.regionalAdjustment.location}</span>
                        <span>{projectData.investment.regionalAdjustment.multiplier === 0.95 ? '-5%' : `${(projectData.investment.regionalAdjustment.multiplier - 1) * 100}%`}</span>
                      </div>
                      <div className="text-xs text-blue-600">
                        {projectData.investment.regionalAdjustment.note}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        £{projectData.investment.savings.toLocaleString()}
                      </div>
                      <div className="text-green-800 font-medium">Total Savings</div>
                      <div className="text-green-600 text-sm mt-1">
                        Under budget by {((projectData.investment.originalBudget - projectData.investment.totalCost) / projectData.investment.originalBudget * 100).toFixed(1)}% 🎉
                      </div>
                      <div className="text-xs text-green-600 mt-2">
                        Cost: £{projectData.investment.costPerSqM}/m² • Floor area: {projectData.house.floorArea}m²
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

        {/* UK Building Regulations & Compliance */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-slide-up" style={{animationDelay: '0.6s'}}>
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 mr-3" />
              <div>
                <h3 className="text-2xl font-bold">Planning & Building Control</h3>
                <p className="text-amber-100">UK compliance requirements</p>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Planning Permission */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Planning Permission
                </h4>
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="font-semibold text-blue-900 mb-2">{projectData.house.planning.type}</div>
                    <div className="text-sm text-blue-800">
                      <div className="flex justify-between mb-1">
                        <span>Application fee:</span>
                        <span>£{projectData.house.planning.cost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Processing time:</span>
                        <span>{projectData.house.planning.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>• New build requires full planning application</div>
                    <div>• Neighbour consultation period: 21 days</div>
                    <div>• Planning committee decision if objections received</div>
                  </div>
                </div>
              </div>

              {/* Building Regulations */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-600" />
                  Building Regulations
                </h4>
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="font-semibold text-green-900 mb-2">{projectData.house.buildingRegs.type}</div>
                    <div className="text-sm text-green-800">
                      <div className="flex justify-between mb-1">
                        <span>Application fee:</span>
                        <span>£{projectData.house.buildingRegs.cost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Approval time:</span>
                        <span>{projectData.house.buildingRegs.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>• Structural calculations required</div>
                    <div>• Site inspections at key stages</div>
                    <div>• Completion certificate issued</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Requirements */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-purple-600" />
                Professional Requirements
              </h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-2">General Construction</div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div>• CSCS card required for all site workers</div>
                    <div>• Site manager with SMSTS qualification</div>
                    <div>• Public liability insurance minimum £2M</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-2">Electrical Work</div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div>• NICEIC or equivalent approved contractor</div>
                    <div>• 18th Edition Wiring Regulations</div>
                    <div>• Part P notification required</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-2">Gas/Heating Work</div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div>• Gas Safe registered engineer only</div>
                    <div>• Annual gas safety check required</div>
                    <div>• Boiler warranty registration</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* UK Construction Market Context */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 mr-2 text-amber-600" />
            UK Construction Market Context
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="bg-white rounded-lg p-4">
              <div className="font-semibold text-gray-900 mb-2">Regional Cost Variations</div>
              <div className="text-gray-600 space-y-1">
                <div>London: +30-50% above national average</div>
                <div>South East: +10-20% above average</div>
                <div>Midlands: National average baseline</div>
                <div>North/Scotland/Wales: -10-20% below</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="font-semibold text-gray-900 mb-2">Current Market Factors</div>
              <div className="text-gray-600 space-y-1">
                <div>Material costs +15% since 2023</div>
                <div>Labor shortage in skilled trades</div>
                <div>Planning delays: 12-16 weeks typical</div>
                <div>Quality professionals booked 6-8 weeks ahead</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="font-semibold text-gray-900 mb-2">Quality Standards</div>
              <div className="text-gray-600 space-y-1">
                <div>NHBC warranty for new builds</div>
                <div>10-year structural guarantee</div>
                <div>Professional indemnity insurance</div>
                <div>Regular quality inspections</div>
              </div>
            </div>
          </div>
          <div className="mt-6 text-xs text-gray-500 max-w-4xl mx-auto leading-relaxed">
            *All costs are estimates based on current UK market conditions and may vary by location, material availability, 
            and project complexity. VAT rates shown are current as of 2024. Professional availability varies by region and season.
            Weather-dependent phases may extend during winter months (November-February).
          </div>
        </div>
      </div>
    </div>
  )
}