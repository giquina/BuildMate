'use client'

import { useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, Play, CheckCircle, Shield, Zap, Clock, Smartphone, Home, Settings, Building, Wifi, Award, Star, Users, TrendingUp, Calculator, Phone, Calendar, X, Menu, ChevronRight, HardHat } from 'lucide-react'
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '@/components/ui'

// Trigrr BOS smart device compatibility data
const deviceBrands = [
  { name: 'Nest', category: 'Thermostats & Security', devices: 12000, logo: '🏠' },
  { name: 'Honeywell', category: 'HVAC & Controls', devices: 15000, logo: '🌡️' },
  { name: 'Ring', category: 'Security & Doorbells', devices: 8500, logo: '🔔' },
  { name: 'Philips Hue', category: 'Smart Lighting', devices: 9200, logo: '💡' },
  { name: 'Samsung SmartThings', category: 'IoT Hub & Devices', devices: 11000, logo: '📱' },
  { name: 'Lutron', category: 'Lighting Controls', devices: 6800, logo: '💫' },
  { name: 'Yale', category: 'Smart Locks', devices: 4500, logo: '🔐' },
  { name: 'Bosch', category: 'Security Systems', devices: 7300, logo: '🛡️' }
]

const pricingTiers = [
  {
    id: 'starter',
    name: 'Smart Starter',
    price: '£2,499',
    originalPrice: '£3,200',
    savings: '£701',
    description: 'Essential smart home automation for small properties',
    features: [
      'Up to 25 connected devices',
      'Basic HVAC & lighting control',
      'Mobile app access',
      '2-year warranty',
      'Phone & email support',
      'Standard installation (2 days)'
    ],
    devices: ['Nest Thermostat', 'Philips Hue Starter Kit', 'Ring Video Doorbell'],
    ideal: 'Flats & Small Homes (1-2 bed)',
    popular: false
  },
  {
    id: 'professional',
    name: 'Smart Professional',
    price: '£4,999',
    originalPrice: '£6,500',
    savings: '£1,501',
    description: 'Complete smart building system for modern homes',
    features: [
      'Up to 75 connected devices',
      'Advanced HVAC optimization',
      'Security system integration',
      'Voice control (Alexa/Google)',
      'Energy monitoring & analytics',
      '5-year warranty',
      'Priority 24/7 support',
      'Professional installation (3-4 days)'
    ],
    devices: ['Honeywell HVAC System', 'Comprehensive Lighting', 'Security Package', 'Smart Locks'],
    ideal: 'Family Homes (3-4 bed)',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Smart Enterprise',
    price: '£9,999',
    originalPrice: '£13,000',
    savings: '£3,001',
    description: 'Enterprise-grade building automation for luxury properties',
    features: [
      'Unlimited connected devices',
      'AI-powered optimization',
      'Custom automation rules',
      'Multi-property management',
      'Advanced analytics dashboard',
      'Predictive maintenance',
      '10-year warranty',
      'Dedicated account manager',
      'White-glove installation (5-7 days)'
    ],
    devices: ['Complete Ecosystem', 'Commercial-Grade Systems', 'Custom Integration'],
    ideal: 'Luxury Homes & Commercial',
    popular: false
  }
]

export default function SmartHomesPage() {
  const [selectedTier, setSelectedTier] = useState<string>('professional')
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)

  const handleTierSelect = useCallback((tierId: string) => {
    setSelectedTier(tierId)
  }, [])

  const handleShowDemo = useCallback(() => {
    setShowVideoModal(true)
  }, [])

  const handleCloseDemo = useCallback(() => {
    setShowVideoModal(false)
  }, [])

  const handleShowContact = useCallback(() => {
    setShowContactForm(true)
  }, [])

  const handleCloseContact = useCallback(() => {
    setShowContactForm(false)
  }, [])

  const totalCompatibleDevices = useMemo(() => {
    return deviceBrands.reduce((sum, brand) => sum + brand.devices, 0)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23FFFFFF%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          {/* Partnership Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
              <HardHat className="h-4 w-4 mr-2" />
              BuildMate Premium Technology Partner
            </div>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="block">Trigrr Building</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                Operating System
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              One unified system controlling HVAC, lighting, security, and access control. 
              <span className="font-semibold text-white">80,000+ devices</span> from <span className="font-semibold text-white">500+ brands</span> in perfect harmony.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="bg-white text-blue-900 hover:bg-blue-50 shadow-xl transform hover:scale-105 transition-all duration-200"
                onClick={handleShowContact}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                onClick={handleShowDemo}
              >
                <Play className="mr-2 h-4 w-4" />
                See BOS in Action
              </Button>
            </div>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-300">&lt;1 Week</div>
                <div className="text-sm text-blue-200">Installation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-300">80,000+</div>
                <div className="text-sm text-blue-200">Devices</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-300">500+</div>
                <div className="text-sm text-blue-200">Brands</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-300">24/7</div>
                <div className="text-sm text-blue-200">Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOS Technology Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Building Operating System Revolution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlike fragmented smart home solutions, Trigrr BOS unifies everything into one intelligent ecosystem that learns, adapts, and optimizes automatically.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Home className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Unified Control</h3>
                  <p className="text-gray-600">One system manages HVAC, lighting, security, access control, and entertainment. No more juggling multiple apps and incompatible systems.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 flex-shrink-0">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered Optimization</h3>
                  <p className="text-gray-600">Machine learning algorithms continuously optimize energy usage, comfort, and security based on your habits and preferences.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 flex-shrink-0">
                  <Wifi className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Universal Compatibility</h3>
                  <p className="text-gray-600">Works with 80,000+ devices from 500+ brands. If it's smart, Trigrr BOS can control it seamlessly.</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    BOS
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Central Intelligence Hub</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: '🌡️', label: 'HVAC', status: 'Active' },
                    { icon: '💡', label: 'Lighting', status: 'Optimized' },
                    { icon: '🔒', label: 'Security', status: 'Armed' },
                    { icon: '🚪', label: 'Access', status: 'Monitoring' }
                  ].map((system, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-center">
                        <div className="text-2xl mb-1">{system.icon}</div>
                        <div className="text-sm font-medium text-gray-900">{system.label}</div>
                        <div className="text-xs text-green-600 font-medium">{system.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Device Compatibility Showcase */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Works with Everything You Love
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {totalCompatibleDevices.toLocaleString()}+ compatible devices from the brands you trust
            </p>
            
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              <Award className="h-4 w-4 mr-2" />
              Industry's Largest Compatibility Network
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {deviceBrands.map((brand, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-3">{brand.logo}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{brand.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{brand.category}</p>
                <div className="text-blue-600 font-semibold text-sm">
                  {brand.devices.toLocaleString()} devices
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-4">And hundreds more including:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Amazon Alexa', 'Google Assistant', 'Apple HomeKit', 'Z-Wave', 'Zigbee', 'Matter', 'Thread'].map((protocol, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {protocol}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional Installation in Under 1 Week
            </h2>
            <p className="text-xl text-gray-600">
              Our certified technicians handle everything from design to deployment
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Site Assessment',
                description: 'Comprehensive property evaluation and system design',
                time: 'Day 1',
                icon: <Building className="h-6 w-6" />
              },
              {
                step: '2',
                title: 'Custom Configuration',
                description: 'BOS system programmed for your specific needs',
                time: 'Day 2-3',
                icon: <Settings className="h-6 w-6" />
              },
              {
                step: '3',
                title: 'Installation & Integration',
                description: 'Professional installation and device integration',
                time: 'Day 4-5',
                icon: <Zap className="h-6 w-6" />
              },
              {
                step: '4',
                title: 'Training & Handover',
                description: 'Complete system training and 24/7 support activation',
                time: 'Day 6-7',
                icon: <Users className="h-6 w-6" />
              }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  {phase.step}
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 mx-auto">
                  {phase.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{phase.title}</h3>
                <p className="text-gray-600 mb-2">{phase.description}</p>
                <div className="text-blue-600 font-medium text-sm">{phase.time}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Smart Home Packages
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Professional installation, lifetime support, and Trigrr BOS included
            </p>
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              <TrendingUp className="h-4 w-4 mr-2" />
              Limited Time: Up to £3,000 Savings
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <Card 
                key={tier.id}
                className={`relative p-8 ${tier.popular ? 'border-2 border-blue-500 shadow-xl scale-105' : 'hover:shadow-lg'} transition-all duration-300 cursor-pointer`}
                onClick={() => handleTierSelect(tier.id)}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <p className="text-gray-600 mb-4">{tier.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-3xl font-bold text-gray-900">{tier.price}</span>
                      <span className="text-lg text-gray-400 line-through">{tier.originalPrice}</span>
                    </div>
                    <div className="text-green-600 font-semibold">Save {tier.savings}</div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-6">
                    <strong>Ideal for:</strong> {tier.ideal}
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Included Devices:</h4>
                  <div className="flex flex-wrap gap-2">
                    {tier.devices.map((device, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {device}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button 
                  variant={tier.popular ? 'primary' : 'secondary'} 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleShowContact()
                  }}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">All packages include:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'Professional Installation',
                'Trigrr BOS License',
                'Mobile App Access',
                '24/7 Technical Support',
                'Warranty Protection',
                'Future Updates'
              ].map((feature, index) => (
                <div key={index} className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-700 text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BuildMate Integration Benefits */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perfect Integration with BuildMate
            </h2>
            <p className="text-xl text-blue-100">
              Seamlessly connects with your BuildMate project from planning to completion
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-4 mx-auto">
                <HardHat className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Construction Integration</h3>
              <p className="text-blue-100">
                Smart home planning integrated into your BuildMate construction timeline and budget
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-4 mx-auto">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Professionals</h3>
              <p className="text-blue-100">
                Access to BuildMate's network of verified smart home specialists and certified installers
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-4 mx-auto">
                <Calculator className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Unified Project Management</h3>
              <p className="text-blue-100">
                Track smart home installation progress alongside your entire BuildMate construction project
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">BuildMate Users Save Additional 15%</h3>
              <p className="text-blue-100 mb-6">
                Existing BuildMate customers receive exclusive pricing and priority installation scheduling
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/configure">
                  <Button variant="secondary" size="lg">
                    Start BuildMate Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={handleShowContact}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Smart Home Expert
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Home?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands who've upgraded to intelligent living with Trigrr BOS
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl"
              onClick={handleShowContact}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
              onClick={handleShowDemo}
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Demo Video
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-blue-100">
            <div className="flex items-center">
              <Shield className="h-4 w-4 text-green-400 mr-2" />
              <span>10-Year Warranty</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-green-400 mr-2" />
              <span>&lt;1 Week Installation</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-green-400 mr-2" />
              <span>4.9★ Customer Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={handleCloseDemo}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Trigrr BOS Demo</h3>
                <p className="text-gray-600 mt-1">See the Building Operating System in action</p>
              </div>
              <button 
                onClick={handleCloseDemo}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close demo modal"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Play className="h-10 w-10 text-white ml-1" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Interactive Demo Coming Soon</h4>
                  <p className="text-gray-600 mb-6">Experience the Trigrr Building Operating System controlling a real smart home</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/80 rounded-lg p-4">
                      <div className="text-blue-600 font-semibold mb-1">🌡️ HVAC Control</div>
                      <div className="text-gray-700">Intelligent temperature management</div>
                    </div>
                    <div className="bg-white/80 rounded-lg p-4">
                      <div className="text-blue-600 font-semibold mb-1">💡 Lighting System</div>
                      <div className="text-gray-700">Automated lighting optimization</div>
                    </div>
                    <div className="bg-white/80 rounded-lg p-4">
                      <div className="text-blue-600 font-semibold mb-1">🔒 Security Integration</div>
                      <div className="text-gray-700">Complete security management</div>
                    </div>
                    <div className="bg-white/80 rounded-lg p-4">
                      <div className="text-blue-600 font-semibold mb-1">📱 Mobile Control</div>
                      <div className="text-gray-700">Full remote access and control</div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button
                      className="bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => {
                        handleCloseDemo()
                        handleShowContact()
                      }}
                    >
                      Schedule Live Demo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={handleCloseContact}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Free Consultation</h3>
                <p className="text-gray-600 text-sm mt-1">Get expert advice on your smart home project</p>
              </div>
              <button 
                onClick={handleCloseContact}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close contact form"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Flat (1-2 bed)</option>
                    <option>House (3-4 bed)</option>
                    <option>Large Property (5+ bed)</option>
                    <option>Commercial Property</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Package</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Smart Starter (£2,499)</option>
                    <option>Smart Professional (£4,999)</option>
                    <option>Smart Enterprise (£9,999)</option>
                    <option>Custom Solution</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label className="ml-2 text-sm text-gray-600">
                    I'm a BuildMate customer (15% additional discount)
                  </label>
                </div>
                
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Free Consultation
                </Button>
              </form>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center text-blue-800 text-sm">
                  <Shield className="h-4 w-4 mr-2" />
                  <span className="font-medium">No obligation • Free assessment • Expert advice</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}