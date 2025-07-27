'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Sparkles, Loader2, Download, Share2, Heart, Eye, CheckCircle, ShoppingCart, Users, Share } from 'lucide-react'

// Mock data for demonstration
const mockProjectData = {
  budget: 150000,
  postcode: 'B12 9QR',
  projectType: 'new_build',
  bedrooms: 3,
  style: 'Modern'
}

const mockFloorplans = [
  {
    id: 'fp_1',
    name: 'Modern 3-Bedroom Layout',
    totalArea: 120,
    estimatedCost: 135000,
    rooms: [
      { name: 'Living Room', area: 25, type: 'living' },
      { name: 'Kitchen', area: 15, type: 'kitchen' },
      { name: 'Bedroom 1', area: 16, type: 'bedroom' },
      { name: 'Bedroom 2', area: 12, type: 'bedroom' },
      { name: 'Bedroom 3', area: 10, type: 'bedroom' },
      { name: 'Bathroom', area: 6, type: 'bathroom' }
    ],
    svgData: '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/><rect x="10" y="10" width="180" height="140" fill="white" stroke="#cbd5e1" stroke-width="1"/><text x="100" y="80" text-anchor="middle" fill="#334155" font-size="12">Living</text><rect x="210" y="10" width="180" height="70" fill="white" stroke="#cbd5e1" stroke-width="1"/><text x="300" y="50" text-anchor="middle" fill="#334155" font-size="12">Kitchen</text></svg>'
  }
]

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount)
}

export default function GeneratePage() {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState(0)
  const [floorplans] = useState(mockFloorplans)
  const [projectData] = useState(mockProjectData)

  useEffect(() => {
    const timer = setTimeout(() => setIsGenerating(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleProceedToMaterials = () => {
    router.push('/materials')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Sparkles className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Your AI-Generated Floorplans
          </h1>
          <p className="text-gray-600 mt-2">
            Professional layouts optimized for your budget and requirements
          </p>
        </div>

        {isGenerating ? (
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="py-12">
              <Loader2 className="h-16 w-16 animate-spin text-blue-600 mx-auto mb-6" />
              <h2 className="text-xl font-semibold mb-4">Generating Your Plans...</h2>
              <p className="text-gray-600 mb-6">
                Our AI is creating custom floorplans based on your requirements
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Analyzing your budget and location
                </div>
                <div className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Optimizing room layouts
                </div>
                <div className="flex items-center justify-center">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600 mr-2" />
                  Checking UK building regulations
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Floorplan Options */}
            <div className="lg:col-span-2 space-y-4">
              {floorplans.map((plan, index) => (
                <Card 
                  key={plan.id}
                  className={`cursor-pointer transition-all ${
                    selectedPlan === index ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedPlan(index)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                        <p className="text-sm text-gray-600">
                          {plan.totalArea}m² • {plan.rooms.length} rooms • Estimated {formatCurrency(plan.estimatedCost)}
                        </p>
                      </div>
                      {selectedPlan === index && (
                        <CheckCircle className="h-6 w-6 text-blue-600" />
                      )}
                    </div>
                    
                    {/* SVG Floorplan Preview */}
                    <div className="bg-white rounded-lg p-4 mb-4 border">
                      <div 
                        dangerouslySetInnerHTML={{ __html: plan.svgData }}
                        className="w-full flex justify-center"
                      />
                    </div>
                    
                    {/* Room List */}
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      {plan.rooms.map((room, roomIndex) => (
                        <div key={roomIndex} className="bg-gray-50 rounded px-3 py-2">
                          <div className="font-medium text-gray-900">{room.name}</div>
                          <div className="text-gray-600">{room.area}m²</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Project Summary & Actions */}
            <div className="space-y-6">
              {/* Project Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Budget:</span>
                    <span className="font-medium">{formatCurrency(projectData.budget)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{projectData.postcode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{projectData.projectType.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bedrooms:</span>
                    <span className="font-medium">{projectData.bedrooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Style:</span>
                    <span className="font-medium">{projectData.style}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Selected Plan Summary */}
              {floorplans.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Selected Plan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Area:</span>
                      <span className="font-medium">{floorplans[selectedPlan].totalArea}m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rooms:</span>
                      <span className="font-medium">{floorplans[selectedPlan].rooms.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Est. Cost:</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(floorplans[selectedPlan].estimatedCost)}
                      </span>
                    </div>
                    <div className="pt-3 border-t">
                      <div className="text-sm text-gray-600 mb-2">Budget remaining:</div>
                      <div className="font-medium text-blue-600">
                        {formatCurrency(projectData.budget - floorplans[selectedPlan].estimatedCost)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleProceedToMaterials}
                  disabled={floorplans.length === 0}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Browse Materials
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push('/professionals')}
                >
                  <Users className="h-5 w-5 mr-2" />
                  Find Professionals
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Upgrade Prompt */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <Sparkles className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">
                        Unlock Pro Features
                      </h4>
                      <p className="text-sm text-blue-700 mb-3">
                        Get 3D visualizations, unlimited projects, and premium exports
                      </p>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Upgrade to Pro
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}