'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, ExternalLink, TrendingUp, Users, Building, Zap, ArrowRight } from 'lucide-react'

export interface Partner {
  id: string
  name: string
  logo: string
  description: string
  status: 'Live Integration' | 'Partnership Active' | 'Pilot Phase'
  statusColor: 'green' | 'blue' | 'orange'
  integrationType: 'API Connected' | 'Direct Partnership' | 'Strategic Alliance'
  projects: string
  revenue?: string
  category: string
  href: string
}

const PARTNERSHIPS: Partner[] = [
  {
    id: 'trigrr',
    name: 'Trigrr Building OS',
    logo: '🤖',
    description: 'Building Operating System unifying HVAC, lighting, security & access control into one responsive system',
    status: 'Live Integration',
    statusColor: 'green',
    integrationType: 'API Connected',
    projects: '1,200+ smart buildings',
    revenue: '£78K monthly',
    category: 'Smart Technology',
    href: '/smart-homes'
  },
  {
    id: 'boxabl',
    name: 'Boxabl Foldable Homes',
    logo: '📦',
    description: 'Revolutionary foldable homes: Casita (361 sq ft) unfolds in 2 hours, global delivery',
    status: 'Live Integration',
    statusColor: 'green',
    integrationType: 'Direct Partnership',
    projects: '89+ foldable units',
    revenue: '£94K monthly',
    category: 'Revolutionary Housing',
    href: '/modular-homes'
  },
  {
    id: 'volferda',
    name: 'Volferda Capsule Houses',
    logo: '🚀',
    description: 'Luxury capsule houses and space pod accommodation for unique tourism/residential solutions',
    status: 'Partnership Active',
    statusColor: 'blue',
    integrationType: 'Strategic Alliance',
    projects: '34+ luxury pods',
    revenue: '£45K monthly',
    category: 'Luxury Pods',
    href: '/luxury-pods'
  },
  {
    id: 'colliers',
    name: 'Colliers International',
    logo: '🏢',
    description: 'Commercial property intelligence, deal flow, and ROI enhancement services',
    status: 'Partnership Active',
    statusColor: 'blue',
    integrationType: 'Strategic Alliance',
    projects: '156+ commercial deals',
    revenue: '£67K monthly',
    category: 'Commercial Intelligence',
    href: '/commercial-real-estate'
  },
  {
    id: 'bq',
    name: 'B&Q Materials Hub',
    logo: '🔨',
    description: 'UK\'s largest DIY retailer with live affiliate program and bulk ordering',
    status: 'Live Integration',
    statusColor: 'green',
    integrationType: 'API Connected',
    projects: '3,400+ orders',
    revenue: '£124K monthly',
    category: 'Materials',
    href: '/materials'
  },
  {
    id: 'buildstore',
    name: 'BuildStore Finance',
    logo: '🏦',
    description: 'Self-build mortgage specialists with live referral system',
    status: 'Live Integration',
    statusColor: 'green',
    integrationType: 'API Connected',
    projects: '567+ financing deals',
    revenue: '£89K monthly',
    category: 'Finance',
    href: '/finance'
  }
]

export function PartnershipShowcase() {
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null)

  const getStatusStyles = (color: Partner['statusColor']) => {
    switch (color) {
      case 'green':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          dot: 'bg-green-500',
          border: 'border-green-200'
        }
      case 'blue':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          dot: 'bg-blue-500',
          border: 'border-blue-200'
        }
      case 'orange':
        return {
          bg: 'bg-orange-100',
          text: 'text-orange-800',
          dot: 'bg-orange-500',
          border: 'border-orange-200'
        }
    }
  }

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Building className="h-4 w-4 mr-2" />
            Live Partner Ecosystem
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Powered by Industry Leaders
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6">
            Revolutionary property ecosystem delivering £497K monthly platform revenue
          </p>
          
          {/* Partnership Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600">6</div>
              <div className="text-sm text-gray-600">Revolutionary Partners</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-green-600">£497K</div>
              <div className="text-sm text-gray-600">Monthly Revenue</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-purple-600">5,846</div>
              <div className="text-sm text-gray-600">Projects Delivered</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-orange-600">99.2%</div>
              <div className="text-sm text-gray-600">Integration Uptime</div>
            </div>
          </div>
        </div>

        {/* Partnership Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
          {PARTNERSHIPS.map((partner) => {
            const statusStyles = getStatusStyles(partner.statusColor)
            const isHovered = hoveredPartner === partner.id
            
            return (
              <Link
                key={partner.id}
                href={partner.href}
                className={`group block bg-white rounded-xl shadow-lg border-2 transition-all duration-300 ${
                  isHovered 
                    ? `${statusStyles.border} shadow-xl scale-105` 
                    : 'border-gray-100 hover:border-gray-200 hover:shadow-xl hover:scale-102'
                }`}
                onMouseEnter={() => setHoveredPartner(partner.id)}
                onMouseLeave={() => setHoveredPartner(null)}
              >
                <div className="p-6">
                  {/* Partner Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{partner.logo}</div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                          {partner.name}
                        </h3>
                        <p className="text-xs text-gray-500">{partner.category}</p>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>

                  {/* Status Badge */}
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3 ${statusStyles.bg} ${statusStyles.text} border ${statusStyles.border}`}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${statusStyles.dot} ${partner.statusColor === 'green' ? 'animate-pulse' : ''}`}></div>
                    {partner.status}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {partner.description}
                  </p>

                  {/* Metrics */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Projects:</span>
                      <span className="font-semibold text-gray-900">{partner.projects}</span>
                    </div>
                    {partner.revenue && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Revenue:</span>
                        <span className="font-semibold text-green-600">{partner.revenue}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Integration:</span>
                      <span className="font-medium text-blue-600">{partner.integrationType}</span>
                    </div>
                  </div>

                  {/* Action Indicator */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">View Integration</span>
                    <ArrowRight className="h-3 w-3 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Partnership Benefits */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Complete Ecosystem Benefits</h3>
            <p className="text-gray-600">Integrated solutions delivering measurable value</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Cost Savings</h4>
              <p className="text-sm text-gray-600">Average 32% project cost reduction</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Quality Assurance</h4>
              <p className="text-sm text-gray-600">All partners verified and insured</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Speed</h4>
              <p className="text-sm text-gray-600">85% faster project delivery</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Support</h4>
              <p className="text-sm text-gray-600">Dedicated account management</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PartnershipShowcase