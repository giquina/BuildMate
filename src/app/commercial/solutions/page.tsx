'use client'

import Link from 'next/link'
import { ArrowRight, ArrowLeft, TrendingUp, Zap, Shield, Award, CheckCircle, Building2, DollarSign, Clock, Target, Lightbulb, BarChart3, Users, Globe, Star, Download, Phone, Mail } from 'lucide-react'
import { useState, useMemo } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ROICalculator } from '@/components/ui/ROICalculator'
import { calculateCommercialEnergyCost, getEnergyRecommendations, calculateEnergyUpgradeROI } from '@/lib/uk-utils'

export default function CommercialSolutionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Mock property data - in real app this would come from the questionnaire
  const propertyData = useMemo(() => ({
    type: 'office_building' as const,
    floorArea: 5000,
    currentEPC: 'D' as const,
    budget: 'medium' as const,
    goals: ['cost_savings', 'carbon_reduction', 'compliance']
  }), [])

  // Calculate current costs and get recommendations
  const analysis = useMemo(() => {
    const currentCosts = calculateCommercialEnergyCost(propertyData.type, propertyData.floorArea)
    const recommendations = getEnergyRecommendations(
      propertyData.type,
      propertyData.currentEPC,
      propertyData.budget,
      propertyData.goals as any
    )
    const roiAnalysis = calculateEnergyUpgradeROI(
      currentCosts.totalAnnualCost,
      propertyData.floorArea,
      recommendations
    )
    
    return { currentCosts, recommendations, roiAnalysis }
  }, [propertyData])

  // Solution categories with detailed information
  const solutionCategories = useMemo(() => [
    {
      id: 'energy_efficiency',
      name: 'Energy Efficiency',
      icon: '⚡',
      description: 'Reduce energy consumption and costs',
      color: 'green',
      solutions: [
        {
          id: 'led_lighting',
          name: 'LED Lighting Retrofit',
          description: 'Replace traditional lighting with energy-efficient LED systems',
          savings: '60-80% lighting energy reduction',
          cost: '£15-25/sq ft',
          payback: '12-18 months',
          implementation: '2-4 weeks',
          benefits: [
            '65% reduction in lighting energy costs',
            '80% reduction in maintenance costs',
            'Improved light quality and productivity',
            'Compatible with smart controls'
          ],
          icon: '💡',
          priority: 'high'
        },
        {
          id: 'hvac_optimization',
          name: 'HVAC System Optimization',
          description: 'Upgrade heating, ventilation, and air conditioning systems',
          savings: '25-40% HVAC energy reduction',
          cost: '£40-80/sq ft',
          payback: '2-4 years',
          implementation: '4-8 weeks',
          benefits: [
            '35% reduction in heating/cooling costs',
            'Improved indoor air quality',
            'Better temperature control',
            'Reduced maintenance requirements'
          ],
          icon: '❄️',
          priority: 'high'
        },
        {
          id: 'insulation_upgrade',
          name: 'Building Insulation Upgrade',
          description: 'Improve thermal performance of walls, roof, and windows',
          savings: '20-35% heating energy reduction',
          cost: '£30-60/sq ft',
          payback: '3-6 years',
          implementation: '6-12 weeks',
          benefits: [
            '25% reduction in heating costs',
            'Improved thermal comfort',
            'Reduced temperature fluctuations',
            'Better EPC rating'
          ],
          icon: '🏠',
          priority: 'medium'
        }
      ]
    },
    {
      id: 'smart_systems',
      name: 'Smart Building Technology',
      icon: '🤖',
      description: 'Intelligent automation and monitoring',
      color: 'blue',
      solutions: [
        {
          id: 'smart_controls',
          name: 'Smart Building Controls',
          description: 'Automated lighting, HVAC, and energy management systems',
          savings: '15-25% total energy reduction',
          cost: '£20-35/sq ft',
          payback: '18-30 months',
          implementation: '3-6 weeks',
          benefits: [
            'Automated energy optimization',
            'Remote monitoring and control',
            'Predictive maintenance alerts',
            'Usage analytics and reporting'
          ],
          icon: '🎛️',
          priority: 'high'
        },
        {
          id: 'energy_monitoring',
          name: 'Energy Monitoring System',
          description: 'Real-time energy usage tracking and analytics',
          savings: '5-15% through behavior change',
          cost: '£5-15/sq ft',
          payback: '6-18 months',
          implementation: '1-2 weeks',
          benefits: [
            'Real-time energy consumption data',
            'Identify energy waste quickly',
            'Benchmarking against similar buildings',
            'Automated reporting for compliance'
          ],
          icon: '📊',
          priority: 'medium'
        },
        {
          id: 'occupancy_sensors',
          name: 'Smart Occupancy Sensors',
          description: 'Automatic lighting and HVAC control based on occupancy',
          savings: '10-20% lighting/HVAC reduction',
          cost: '£8-18/sq ft',
          payback: '12-24 months',
          implementation: '2-4 weeks',
          benefits: [
            'Automatic on/off control',
            'Optimized space utilization',
            'Improved security monitoring',
            'Data for space planning'
          ],
          icon: '👥',
          priority: 'medium'
        }
      ]
    },
    {
      id: 'renewable_energy',
      name: 'Renewable Energy',
      icon: '🌞',
      description: 'Generate clean energy on-site',
      color: 'orange',
      solutions: [
        {
          id: 'solar_panels',
          name: 'Commercial Solar Installation',
          description: 'Rooftop or ground-mounted solar panel systems',
          savings: '40-70% electricity cost reduction',
          cost: '£80-120/sq ft roof area',
          payback: '4-8 years',
          implementation: '8-16 weeks',
          benefits: [
            'Generate renewable electricity',
            'Export excess energy for income',
            'Hedge against energy price rises',
            'Significant carbon footprint reduction'
          ],
          icon: '☀️',
          priority: 'high'
        },
        {
          id: 'heat_pump',
          name: 'Commercial Heat Pump',
          description: 'Replace gas boilers with efficient electric heat pumps',
          savings: '30-50% heating cost reduction',
          cost: '£60-100/sq ft',
          payback: '5-10 years',
          implementation: '6-12 weeks',
          benefits: [
            'Highly efficient heating and cooling',
            'Low carbon alternative to gas',
            'Government grants available',
            'Long-term future-proofing'
          ],
          icon: '♨️',
          priority: 'medium'
        }
      ]
    },
    {
      id: 'compliance',
      name: 'Compliance & Regulations',
      icon: '📋',
      description: 'Meet UK building standards',
      color: 'purple',
      solutions: [
        {
          id: 'epc_improvement',
          name: 'EPC Rating Improvement',
          description: 'Upgrade building to meet minimum EPC requirements',
          savings: 'Avoid rental restrictions',
          cost: '£25-75/sq ft',
          payback: 'Regulatory compliance',
          implementation: '4-12 weeks',
          benefits: [
            'Meet minimum EPC rating of E',
            'Avoid rental market restrictions',
            'Improve marketability',
            'Future-proof against regulations'
          ],
          icon: '📈',
          priority: 'essential'
        },
        {
          id: 'building_regs_compliance',
          name: 'Building Regulations Upgrade',
          description: 'Ensure compliance with latest UK building regulations',
          savings: 'Avoid penalties and restrictions',
          cost: '£15-40/sq ft',
          payback: 'Risk mitigation',
          implementation: '2-8 weeks',
          benefits: [
            'Full regulatory compliance',
            'Avoid enforcement action',
            'Professional certification',
            'Peace of mind'
          ],
          icon: '✅',
          priority: 'essential'
        }
      ]
    }
  ], [])

  const allSolutions = useMemo(() => {
    return solutionCategories.flatMap(category => 
      category.solutions.map(solution => ({ ...solution, category: category.id, categoryName: category.name }))
    )
  }, [solutionCategories])

  const filteredSolutions = useMemo(() => {
    if (selectedCategory === 'all') return allSolutions
    return allSolutions.filter(solution => solution.category === selectedCategory)
  }, [allSolutions, selectedCategory])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'essential': return 'bg-red-100 text-red-800 border-red-300'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Link href="/commercial/configure" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Questionnaire
            </Link>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Optimization Solutions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Personalized recommendations to reduce costs, improve efficiency, and increase property value
          </p>
        </div>

        {/* Property Summary */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-bold mb-2">5,000 sq ft Office Building Analysis</h2>
              <div className="flex items-center space-x-6 text-sm">
                <span>Current EPC: D</span>
                <span>Annual Energy Cost: £{analysis.currentCosts.totalAnnualCost.toLocaleString()}</span>
                <span>Carbon Footprint: {analysis.currentCosts.carbonFootprint} tonnes CO2</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">£{analysis.roiAnalysis.annualSavings.toLocaleString()}</div>
              <div className="text-blue-100">Potential Annual Savings</div>
            </div>
          </div>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            All Solutions
          </button>
          {solutionCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 flex items-center space-x-2 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Solutions Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {filteredSolutions.map((solution) => (
            <Card key={solution.id} className="p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{solution.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{solution.name}</h3>
                    <p className="text-gray-600">{solution.categoryName}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getPriorityColor(solution.priority)}`}>
                  {solution.priority}
                </span>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">{solution.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-sm text-green-600 font-medium">Savings</div>
                  <div className="font-bold text-green-800">{solution.savings}</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium">Investment</div>
                  <div className="font-bold text-blue-800">{solution.cost}</div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="text-sm text-orange-600 font-medium">Payback</div>
                  <div className="font-bold text-orange-800">{solution.payback}</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-sm text-purple-600 font-medium">Timeline</div>
                  <div className="font-bold text-purple-800">{solution.implementation}</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
                <ul className="space-y-2">
                  {solution.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
                <Button variant="outline" size="sm" className="flex-1">
                  Get Quote
                </Button>
                <Button size="sm" className="flex-1">
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* ROI Calculator */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Interactive ROI Calculator
          </h2>
          <ROICalculator 
            initialPropertyType="office_building"
            initialFloorArea={5000}
          />
        </div>

        {/* Implementation Timeline */}
        <Card className="p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Recommended Implementation Timeline
          </h2>
          
          <div className="space-y-8">
            {[
              {
                phase: 'Phase 1 (Months 1-2)',
                title: 'Quick Wins & Assessment',
                description: 'Immediate impact solutions with minimal disruption',
                solutions: ['Energy monitoring', 'LED lighting retrofit', 'Smart controls'],
                cost: '£35,000 - £65,000',
                savings: '£8,500 - £12,000/year'
              },
              {
                phase: 'Phase 2 (Months 3-6)',
                title: 'Major Systems Upgrades',
                description: 'Comprehensive HVAC and building fabric improvements',
                solutions: ['HVAC optimization', 'Insulation upgrade', 'Smart sensors'],
                cost: '£85,000 - £150,000',
                savings: '£15,000 - £25,000/year'
              },
              {
                phase: 'Phase 3 (Months 6-12)',
                title: 'Renewable Energy Integration',
                description: 'Long-term sustainability and energy independence',
                solutions: ['Solar installation', 'Heat pump upgrade', 'Energy storage'],
                cost: '£120,000 - £200,000',
                savings: '£20,000 - £35,000/year'
              }
            ].map((phase, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{phase.phase}</h3>
                  <h4 className="text-lg font-semibold text-blue-600 mb-2">{phase.title}</h4>
                  <p className="text-gray-600 mb-4">{phase.description}</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500">Solutions</div>
                      <ul className="text-sm text-gray-700">
                        {phase.solutions.map((solution, idx) => (
                          <li key={idx}>• {solution}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Investment</div>
                      <div className="font-bold text-blue-600">{phase.cost}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Annual Savings</div>
                      <div className="font-bold text-green-600">{phase.savings}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Next Steps CTA */}
        <Card className="p-8 bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to Start Your Optimization Journey?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-3xl mx-auto">
            Our certified commercial specialists are ready to help you implement these solutions and start saving immediately.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/10 rounded-lg p-4">
              <Phone className="h-8 w-8 mx-auto mb-2" />
              <div className="font-semibold">Free Consultation</div>
              <div className="text-sm text-blue-100">Expert advice tailored to your property</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <Download className="h-8 w-8 mx-auto mb-2" />
              <div className="font-semibold">Detailed Report</div>
              <div className="text-sm text-blue-100">Comprehensive analysis & recommendations</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <div className="font-semibold">Expert Installation</div>
              <div className="text-sm text-blue-100">Certified professionals across the UK</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="text-blue-700 border-white bg-white hover:bg-blue-50"
            >
              Schedule Free Consultation
              <Phone className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
            >
              Download Full Report
              <Download className="ml-2 h-5 w-5" />
            </Button>
            <Link 
              href="/commercial/pricing"
              className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View Business Plans
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}