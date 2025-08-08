'use client'

import { useState, useMemo, useCallback } from 'react'
import { Card } from './Card'
import { Button } from './Button'
import { Input } from './Input'
import { TrendingUp, DollarSign, Clock, Zap, Building2, Calculator, CheckCircle, ArrowRight } from 'lucide-react'
import { calculateCommercialEnergyCost, calculateEnergyUpgradeROI, getEnergyRecommendations, calculatePropertyValueImpact, EFFICIENCY_IMPROVEMENTS } from '@/lib/uk-utils'
import type { CommercialPropertyType, EPCRating } from '@/types'

interface ROICalculatorProps {
  className?: string
  initialPropertyType?: CommercialPropertyType
  initialFloorArea?: number
  compact?: boolean
}

export function ROICalculator({ 
  className = '', 
  initialPropertyType = 'office_building',
  initialFloorArea = 5000,
  compact = false
}: ROICalculatorProps) {
  const [propertyType, setPropertyType] = useState<CommercialPropertyType>(initialPropertyType)
  const [floorArea, setFloorArea] = useState(initialFloorArea.toString())
  const [currentEPC, setCurrentEPC] = useState<EPCRating>('D')
  const [budget, setBudget] = useState<'low' | 'medium' | 'high' | 'unlimited'>('medium')
  const [propertyValue, setPropertyValue] = useState('1500000')

  const propertyTypes = [
    { id: 'office_building', name: 'Office Building', icon: '🏢' },
    { id: 'retail_space', name: 'Retail Space', icon: '🏪' },
    { id: 'warehouse', name: 'Warehouse', icon: '🏭' },
    { id: 'hospitality', name: 'Hotel/Hospitality', icon: '🏨' },
    { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
    { id: 'education', name: 'Education', icon: '🏫' }
  ]

  // Calculate current energy costs and potential savings
  const calculations = useMemo(() => {
    const area = Number(floorArea)
    if (!area || area <= 0) return null

    try {
      // Current energy costs
      const currentCosts = calculateCommercialEnergyCost(propertyType, area)
      
      // Get recommendations based on property type and EPC
      const recommendations = getEnergyRecommendations(
        propertyType,
        currentEPC,
        budget,
        ['cost_savings', 'carbon_reduction']
      )
      
      // Calculate ROI for recommended improvements
      const roiAnalysis = calculateEnergyUpgradeROI(
        currentCosts.totalAnnualCost,
        area,
        recommendations
      )
      
      // Calculate property value impact
      const epcImprovement = currentEPC === 'G' ? 4 : currentEPC === 'F' ? 3 : currentEPC === 'E' ? 2 : 1
      const valueImpact = calculatePropertyValueImpact(
        Number(propertyValue),
        epcImprovement,
        recommendations
      )

      return {
        currentCosts,
        recommendations,
        roiAnalysis,
        valueImpact,
        recommendationDetails: recommendations.map(rec => ({
          name: rec,
          config: EFFICIENCY_IMPROVEMENTS[rec]
        }))
      }
    } catch (error) {
      console.error('Calculation error:', error)
      return null
    }
  }, [propertyType, floorArea, currentEPC, budget, propertyValue])

  const formatCurrency = (amount: number) => `£${amount.toLocaleString()}`
  const formatNumber = (num: number, decimals: number = 1) => num.toFixed(decimals)

  if (!calculations) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="text-center">
          <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Enter property details to see ROI calculations</p>
        </div>
      </Card>
    )
  }

  const { currentCosts, roiAnalysis, valueImpact, recommendationDetails } = calculations

  if (compact) {
    return (
      <Card className={`p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 ${className}`}>
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
            <h3 className="text-lg font-bold text-green-900">Potential ROI</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(roiAnalysis.annualSavings)}
              </div>
              <div className="text-xs text-green-700">Annual Savings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {formatNumber(roiAnalysis.simplePayback)} yrs
              </div>
              <div className="text-xs text-green-700">Payback Period</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {formatNumber(roiAnalysis.internalRateOfReturn)}%
              </div>
              <div className="text-xs text-green-700">IRR</div>
            </div>
          </div>
          
          <Button size="sm" className="w-full">
            Get Full Analysis
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Input Controls */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Building2 className="h-5 w-5 mr-2" />
          Property Details
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value as CommercialPropertyType)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {propertyTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.icon} {type.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Floor Area (sq ft)</label>
            <Input
              type="number"
              value={floorArea}
              onChange={(e) => setFloorArea(e.target.value)}
              placeholder="5000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current EPC Rating</label>
            <select
              value={currentEPC}
              onChange={(e) => setCurrentEPC(e.target.value as EPCRating)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {['A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].map(rating => (
                <option key={rating} value={rating}>{rating}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value as any)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="low">£10k - £50k</option>
              <option value="medium">£50k - £200k</option>
              <option value="high">£200k - £1M</option>
              <option value="unlimited">£1M+</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Results Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Current Costs */}
        <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
          <div className="text-center">
            <Zap className="h-10 w-10 text-red-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-red-900 mb-4">Current Annual Costs</h3>
            
            <div className="space-y-3">
              <div>
                <div className="text-3xl font-bold text-red-600">
                  {formatCurrency(currentCosts.totalAnnualCost)}
                </div>
                <div className="text-sm text-red-700">Total Energy Cost</div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/50 rounded p-2">
                  <div className="font-semibold">{formatCurrency(Math.round(currentCosts.totalAnnualCost * 0.7))}</div>
                  <div className="text-gray-600">Electricity</div>
                </div>
                <div className="bg-white/50 rounded p-2">
                  <div className="font-semibold">{formatCurrency(Math.round(currentCosts.totalAnnualCost * 0.3))}</div>
                  <div className="text-gray-600">Gas & Other</div>
                </div>
              </div>
              
              <div className="bg-white/50 rounded p-2">
                <div className="font-semibold">{currentCosts.carbonFootprint} tonnes CO2</div>
                <div className="text-xs text-gray-600">Annual Carbon Footprint</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Projected Savings */}
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="text-center">
            <TrendingUp className="h-10 w-10 text-green-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-green-900 mb-4">After Optimization</h3>
            
            <div className="space-y-3">
              <div>
                <div className="text-3xl font-bold text-green-600">
                  {formatCurrency(roiAnalysis.annualSavings)}
                </div>
                <div className="text-sm text-green-700">Annual Savings</div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/50 rounded p-2">
                  <div className="font-semibold">{formatNumber(roiAnalysis.simplePayback)} years</div>
                  <div className="text-gray-600">Payback Period</div>
                </div>
                <div className="bg-white/50 rounded p-2">
                  <div className="font-semibold">{formatNumber(roiAnalysis.internalRateOfReturn)}%</div>
                  <div className="text-gray-600">Annual ROI</div>
                </div>
              </div>
              
              <div className="bg-white/50 rounded p-2">
                <div className="font-semibold">{formatNumber(roiAnalysis.carbonSavings)} tonnes CO2</div>
                <div className="text-xs text-gray-600">Annual Carbon Reduction</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Investment & Returns */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="text-center">
            <DollarSign className="h-10 w-10 text-blue-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-blue-900 mb-4">Investment Analysis</h3>
            
            <div className="space-y-3">
              <div>
                <div className="text-3xl font-bold text-blue-600">
                  {formatCurrency(roiAnalysis.totalInvestment)}
                </div>
                <div className="text-sm text-blue-700">Total Investment</div>
              </div>
              
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="bg-white/50 rounded p-2">
                  <div className="font-semibold">{formatCurrency(roiAnalysis.netPresentValue)}</div>
                  <div className="text-gray-600">20-Year NPV</div>
                </div>
                <div className="bg-white/50 rounded p-2">
                  <div className="font-semibold">{formatCurrency(roiAnalysis.annualSavings * 20)}</div>
                  <div className="text-gray-600">20-Year Total Savings</div>
                </div>
              </div>
              
              <div className="bg-white/50 rounded p-2">
                <div className="font-semibold">{valueImpact.percentageIncrease}%</div>
                <div className="text-xs text-gray-600">Property Value Increase</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
          Recommended Improvements
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendationDetails.map(({ name, config }) => {
            // Handle different config types
            const getSavings = () => {
              if ('energySavings' in config) return Math.round(config.energySavings * 100)
              return 'Varies'
            }
            
            const getCost = () => {
              if ('costPerSqM' in config) return `£${config.costPerSqM}/sq ft`
              if ('costPerKwp' in config) return `£${config.costPerKwp}/kWp`
              if ('costPerKw' in config) return `£${config.costPerKw}/kW`
              return 'Custom quote'
            }
            
            return (
              <div key={name} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2 capitalize">
                  {name.replace(/_/g, ' ')}
                </h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Savings: {getSavings()}%</div>
                  <div>Cost: {getCost()}</div>
                  <div>Lifespan: {config.lifespan} years</div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Summary */}
      <Card className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Investment Summary</h3>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div>
              <div className="text-2xl font-bold">{formatCurrency(roiAnalysis.totalInvestment)}</div>
              <div className="text-blue-100 text-sm">Initial Investment</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{formatCurrency(roiAnalysis.annualSavings)}</div>
              <div className="text-blue-100 text-sm">Annual Savings</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{formatNumber(roiAnalysis.simplePayback)} years</div>
              <div className="text-blue-100 text-sm">Payback Period</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{formatCurrency(valueImpact.valueIncrease)}</div>
              <div className="text-blue-100 text-sm">Property Value Gain</div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-blue-100 mb-4">
              Over 20 years, this investment could generate <span className="font-bold text-white">
                {formatCurrency(roiAnalysis.annualSavings * 20 - roiAnalysis.totalInvestment)}
              </span> in net returns.
            </p>
            <Button variant="outline" className="text-blue-600 border-white hover:bg-white">
              Get Detailed Analysis
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}