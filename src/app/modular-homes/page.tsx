'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface BoxablSpec {
  area: number
  unfoldTime: string
  price: string
  delivery: string
  rooms: string[]
}

const casitaSpecs: BoxablSpec = {
  area: 361,
  unfoldTime: '2 hours',
  price: '£50,000',
  delivery: 'Worldwide',
  rooms: ['Living Area', 'Kitchen', 'Bathroom', 'Storage']
}

const deliveryRegions = [
  { name: 'UK & Ireland', time: '4-6 weeks', cost: 'Included' },
  { name: 'Europe', time: '6-8 weeks', cost: '£2,500' },
  { name: 'North America', time: '8-10 weeks', cost: '£4,500' },
  { name: 'Asia Pacific', time: '10-12 weeks', cost: '£6,500' },
  { name: 'Global', time: '12-16 weeks', cost: 'Quote on request' }
]

const timelineSteps = [
  { step: 1, title: 'Delivery & Positioning', time: '30 mins', description: 'Boxabl unit delivered and positioned on-site' },
  { step: 2, title: 'Initial Unfolding', time: '45 mins', description: 'Automated unfolding sequence begins with precision hydraulics' },
  { step: 3, title: 'Wall & Roof Extension', time: '30 mins', description: 'Walls extend and roof deploys to full 361 sq ft configuration' },
  { step: 4, title: 'Final Assembly & Testing', time: '15 mins', description: 'Final connections, utilities hookup, and systems testing' }
]

const buildMateIntegrations = [
  {
    title: 'Smart Site Preparation',
    description: 'AI-powered foundation planning and utility connections for optimal Boxabl placement',
    icon: '🎯'
  },
  {
    title: 'Professional Installation Network',
    description: 'Certified Boxabl installers and local contractors for seamless deployment',
    icon: '👷'
  },
  {
    title: 'Custom Interior Design',
    description: 'Maximize your 361 sq ft with smart storage solutions and premium finishes',
    icon: '🏠'
  },
  {
    title: 'Permit & Compliance',
    description: 'Navigate UK building regulations and planning permissions with expert guidance',
    icon: '📋'
  }
]

export default function ModularHomesPage() {
  const [activeTimelineStep, setActiveTimelineStep] = useState(1)
  const [selectedRegion, setSelectedRegion] = useState(deliveryRegions[0])
  const [isUnfolding, setIsUnfolding] = useState(false)
  const [reservationForm, setReservationForm] = useState({
    name: '',
    email: '',
    location: '',
    timeline: ''
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimelineStep(prev => prev === 4 ? 1 : prev + 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleUnfoldAnimation = () => {
    setIsUnfolding(true)
    setTimeout(() => setIsUnfolding(false), 8000)
  }

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle reservation submission
    console.log('Reservation submitted:', reservationForm)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.1)_50%,transparent_75%)] animate-pulse" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float animation-delay-2000" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-3" />
              Revolutionary Housing Technology Available Now
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent">
                Boxabl
              </span>
              <br />
              <span className="text-white">Foldable Homes</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Experience the future of housing with revolutionary foldable homes that unfold in just 2 hours. 
              From compact shipping to full 361 sq ft living space - this is housing reimagined.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Button 
                variant="tesla" 
                size="xl" 
                onClick={handleUnfoldAnimation}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-12 py-6"
              >
                Watch Unfolding Demo
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900 text-lg px-12 py-6"
              >
                Reserve Your Boxabl
              </Button>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">361</div>
                <div className="text-blue-100">Square Feet</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">2hrs</div>
                <div className="text-purple-100">Assembly Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">£50K</div>
                <div className="text-green-100">Starting Price</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">Global</div>
                <div className="text-yellow-100">Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Casita Unfolding Animation */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-slate-800/50 to-blue-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Casita Unfolds
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Watch as a compact shipping container transforms into a fully functional 361 sq ft home in just 2 hours
            </p>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-400/20 rounded-3xl p-8 md:p-12">
            <div className="relative h-96 mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700 to-slate-600">
              {/* Animated Boxabl Visualization */}
              <div className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-8000 ease-in-out",
                isUnfolding ? "transform scale-150" : ""
              )}>
                <div className={cn(
                  "relative bg-blue-600 transition-all duration-4000 ease-in-out flex items-center justify-center text-white font-bold text-lg",
                  isUnfolding 
                    ? "w-80 h-48 rounded-xl" 
                    : "w-32 h-24 rounded-lg"
                )}>
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg transition-all duration-4000 ease-in-out",
                    isUnfolding ? "opacity-100" : "opacity-80"
                  )} />
                  
                  <div className="relative z-10">
                    {isUnfolding ? (
                      <div className="text-center space-y-2">
                        <div className="text-2xl font-bold">361 sq ft</div>
                        <div className="text-sm opacity-80">Fully Deployed Casita</div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-sm font-bold">Boxabl</div>
                        <div className="text-xs opacity-80">Folded</div>
                      </div>
                    )}
                  </div>
                  
                  {/* Unfolding Animation Elements */}
                  {isUnfolding && (
                    <>
                      <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 w-16 h-32 bg-blue-500 rounded-lg opacity-90 animate-slide-right" />
                      <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 w-16 h-32 bg-blue-500 rounded-lg opacity-90 animate-slide-left" />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </>
                  )}
                </div>
              </div>
              
              {/* Status Indicator */}
              <div className="absolute top-4 right-4 px-4 py-2 bg-slate-900/80 backdrop-blur-sm rounded-lg border border-blue-400/30">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">
                    {isUnfolding ? 'Unfolding...' : 'Ready to Deploy'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {casitaSpecs.rooms.map((room, index) => (
                <div key={room} className="bg-slate-700/30 backdrop-blur-sm border border-blue-400/20 rounded-xl p-4 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-white mb-2">{room}</h3>
                  <p className="text-blue-100 text-sm">Fully equipped & functional</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Assembly Timeline */}
      <section className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                2-Hour Assembly
              </span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Revolutionary precision engineering enables rapid deployment from shipping container to move-in ready home
            </p>
          </div>

          <div className="space-y-6">
            {timelineSteps.map((step, index) => (
              <div key={step.step} className={cn(
                "flex items-center p-6 rounded-2xl border transition-all duration-500",
                activeTimelineStep === step.step
                  ? "bg-blue-600/20 border-blue-400/50 backdrop-blur-sm scale-105"
                  : "bg-slate-800/30 border-slate-600/30 backdrop-blur-sm hover:bg-slate-700/30"
              )}>
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mr-6 transition-all duration-300",
                  activeTimelineStep === step.step
                    ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white scale-110"
                    : "bg-slate-700 text-blue-400"
                )}>
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    <div className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      activeTimelineStep === step.step
                        ? "bg-green-500/20 text-green-400 border border-green-400/30"
                        : "bg-slate-700/50 text-blue-400"
                    )}>
                      {step.time}
                    </div>
                  </div>
                  <p className="text-blue-100">{step.description}</p>
                </div>
                {activeTimelineStep === step.step && (
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse ml-4" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm border border-green-400/30 rounded-full">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-3" />
              <span className="text-green-400 font-bold">Total Assembly Time: 2 Hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* Configurator Section */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Configure Your Casita
              </span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Customize your 361 sq ft space with premium finishes, smart technology, and sustainable features
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 3D Layout Visualization */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold mr-3">3D</span>
                Layout Preview
              </h3>
              
              <div className="relative h-80 bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl overflow-hidden mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 w-64 h-48">
                    {/* Living Area */}
                    <div className="bg-blue-500/30 border border-blue-400/50 rounded-lg p-3 flex flex-col justify-center items-center">
                      <div className="text-white font-bold text-sm mb-1">Living</div>
                      <div className="text-blue-300 text-xs">180 sq ft</div>
                    </div>
                    
                    {/* Kitchen */}
                    <div className="bg-green-500/30 border border-green-400/50 rounded-lg p-3 flex flex-col justify-center items-center">
                      <div className="text-white font-bold text-sm mb-1">Kitchen</div>
                      <div className="text-green-300 text-xs">80 sq ft</div>
                    </div>
                    
                    {/* Bathroom */}
                    <div className="bg-purple-500/30 border border-purple-400/50 rounded-lg p-3 flex flex-col justify-center items-center">
                      <div className="text-white font-bold text-sm mb-1">Bathroom</div>
                      <div className="text-purple-300 text-xs">45 sq ft</div>
                    </div>
                    
                    {/* Storage */}
                    <div className="bg-orange-500/30 border border-orange-400/50 rounded-lg p-3 flex flex-col justify-center items-center">
                      <div className="text-white font-bold text-sm mb-1">Storage</div>
                      <div className="text-orange-300 text-xs">56 sq ft</div>
                    </div>
                  </div>
                </div>
                
                {/* Room Labels */}
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-purple-400/30">
                  <div className="text-purple-400 text-sm font-bold">361 sq ft Total</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-white font-medium">Smart Home Integration</span>
                  <span className="text-green-400 font-bold">+£5,000</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-white font-medium">Premium Finishes</span>
                  <span className="text-blue-400 font-bold">+£8,000</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-white font-medium">Solar Panel System</span>
                  <span className="text-purple-400 font-bold">+£12,000</span>
                </div>
              </div>
            </div>

            {/* Specs & Pricing */}
            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-purple-400/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold mr-3">📊</span>
                    Technical Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-purple-400 text-sm font-medium">Floor Area</div>
                      <div className="text-white font-bold text-lg">361 sq ft</div>
                    </div>
                    <div>
                      <div className="text-purple-400 text-sm font-medium">Assembly Time</div>
                      <div className="text-white font-bold text-lg">2 hours</div>
                    </div>
                    <div>
                      <div className="text-purple-400 text-sm font-medium">Weight</div>
                      <div className="text-white font-bold text-lg">74,000 lbs</div>
                    </div>
                    <div>
                      <div className="text-purple-400 text-sm font-medium">Shipping Dimensions</div>
                      <div className="text-white font-bold text-lg">8.5' × 8.5' × 40'</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-400/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold mr-3">💰</span>
                    Pricing Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-purple-400/20">
                      <span className="text-purple-100">Base Casita Unit</span>
                      <span className="text-white font-bold text-xl">£50,000</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-purple-400/20">
                      <span className="text-purple-100">Site Preparation & Installation</span>
                      <span className="text-white font-bold">£8,500</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-purple-400/20">
                      <span className="text-purple-100">Delivery (UK)</span>
                      <span className="text-green-400 font-bold">Included</span>
                    </div>
                    <div className="flex justify-between items-center py-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg px-4">
                      <span className="text-white font-bold text-lg">Total Starting Price</span>
                      <span className="text-green-400 font-bold text-2xl">£58,500</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-green-500/10 border border-green-400/30 rounded-lg">
                    <div className="flex items-center text-green-400 font-medium mb-2">
                      <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-2">✓</span>
                      Revolutionary Value
                    </div>
                    <p className="text-green-100 text-sm">
                      Compare to traditional build costs of £150-200K+ for equivalent space. Move-in ready in 2 hours vs 6-12 months.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Global Delivery */}
      <section className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Global Delivery Network
              </span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Revolutionary shipping technology enables worldwide deployment of Boxabl homes
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-400/20 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {deliveryRegions.slice(0, 3).map((region) => (
                <div 
                  key={region.name}
                  onClick={() => setSelectedRegion(region)}
                  className={cn(
                    "p-6 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-105",
                    selectedRegion.name === region.name
                      ? "bg-blue-600/20 border-blue-400/50 backdrop-blur-sm"
                      : "bg-slate-700/30 border-slate-600/30 hover:bg-slate-700/50"
                  )}
                >
                  <h3 className="text-white font-bold text-lg mb-3">{region.name}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-blue-200">Delivery Time</span>
                      <span className="text-white font-medium">{region.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Shipping Cost</span>
                      <span className={cn(
                        "font-medium",
                        region.cost === 'Included' ? 'text-green-400' : 'text-white'
                      )}>
                        {region.cost}
                      </span>
                    </div>
                  </div>
                  {selectedRegion.name === region.name && (
                    <div className="mt-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {deliveryRegions.slice(3).map((region) => (
                <div 
                  key={region.name}
                  onClick={() => setSelectedRegion(region)}
                  className={cn(
                    "p-6 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-105",
                    selectedRegion.name === region.name
                      ? "bg-blue-600/20 border-blue-400/50 backdrop-blur-sm"
                      : "bg-slate-700/30 border-slate-600/30 hover:bg-slate-700/50"
                  )}
                >
                  <h3 className="text-white font-bold text-lg mb-3">{region.name}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-blue-200">Delivery Time</span>
                      <span className="text-white font-medium">{region.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Shipping Cost</span>
                      <span className="text-white font-medium">{region.cost}</span>
                    </div>
                  </div>
                  {selectedRegion.name === region.name && (
                    <div className="mt-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-400/30 rounded-xl">
              <h4 className="text-white font-bold text-lg mb-3 flex items-center">
                <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-3">🚛</span>
                Selected Region: {selectedRegion.name}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-blue-300 text-sm">Estimated Delivery</div>
                  <div className="text-white font-bold">{selectedRegion.time}</div>
                </div>
                <div>
                  <div className="text-blue-300 text-sm">Shipping Cost</div>
                  <div className={cn(
                    "font-bold",
                    selectedRegion.cost === 'Included' ? 'text-green-400' : 'text-white'
                  )}>
                    {selectedRegion.cost}
                  </div>
                </div>
                <div>
                  <div className="text-blue-300 text-sm">Installation</div>
                  <div className="text-white font-bold">2 hours on-site</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BuildMate Integration */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-green-900/30 to-blue-900/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                BuildMate AI Integration
              </span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Maximize your Boxabl experience with BuildMate's comprehensive support ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {buildMateIntegrations.map((integration, index) => (
              <Card key={integration.title} className="bg-slate-800/50 border-green-400/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{integration.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-xl mb-3">{integration.title}</h3>
                      <p className="text-blue-100 leading-relaxed">{integration.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-8 bg-gradient-to-r from-green-600/10 to-blue-600/10 border border-green-400/30 rounded-2xl backdrop-blur-sm">
            <div className="text-center">
              <h3 className="text-white font-bold text-2xl mb-4">Complete Boxabl Solution</h3>
              <p className="text-blue-100 text-lg mb-6 max-w-3xl mx-auto">
                From site analysis and permit assistance to professional installation and interior design - 
                BuildMate ensures your Boxabl deployment is seamless and successful.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="tesla" size="lg" className="bg-gradient-to-r from-green-600 to-blue-600">
                  Explore BuildMate Services
                </Button>
                <Button variant="outline" size="lg" className="border-green-400 text-green-400 hover:bg-green-400 hover:text-slate-900">
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Reserve Your Boxabl
              </span>
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join the housing revolution. Be among the first to own a revolutionary foldable home.
            </p>
          </div>

          <Card className="bg-slate-800/50 border-yellow-400/20 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <form onSubmit={handleReservation} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Full Name</label>
                    <input 
                      type="text"
                      value={reservationForm.name}
                      onChange={(e) => setReservationForm({...reservationForm, name: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-white placeholder-slate-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Email Address</label>
                    <input 
                      type="email"
                      value={reservationForm.email}
                      onChange={(e) => setReservationForm({...reservationForm, email: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-white placeholder-slate-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Location</label>
                    <input 
                      type="text"
                      value={reservationForm.location}
                      onChange={(e) => setReservationForm({...reservationForm, location: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-white placeholder-slate-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                      placeholder="City, Country"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Target Timeline</label>
                    <select 
                      value={reservationForm.timeline}
                      onChange={(e) => setReservationForm({...reservationForm, timeline: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-yellow-400/30 rounded-lg text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                    >
                      <option value="">Select timeline</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6-12 months">6-12 months</option>
                      <option value="12+ months">12+ months</option>
                      <option value="Exploring options">Exploring options</option>
                    </select>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-600/10 to-orange-600/10 border border-yellow-400/30 rounded-xl p-6">
                  <h4 className="text-white font-bold text-lg mb-3 flex items-center">
                    <span className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-slate-900 text-sm font-bold mr-3">!</span>
                    Reservation Benefits
                  </h4>
                  <ul className="space-y-2 text-yellow-100">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                      Priority delivery scheduling
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                      Early access to customization options
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                      Dedicated BuildMate support specialist
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3" />
                      Lock in current pricing
                    </li>
                  </ul>
                </div>

                <Button 
                  type="submit"
                  size="xl" 
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-slate-900 font-bold text-lg py-6"
                >
                  Reserve Your Boxabl Now
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative z-10 py-16 bg-gradient-to-r from-slate-900 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The Future of Housing is Here
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Revolutionary technology. Uncompromising quality. Global delivery. 2-hour assembly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="tesla" size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
              Start Your Boxabl Journey
            </Button>
            <Button variant="outline" size="lg" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900">
              Download Brochure
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}