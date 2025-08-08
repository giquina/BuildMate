'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { 
  ArrowRight, 
  Home, 
  PaintBucket, 
  Settings, 
  ChevronLeft,
  CheckCircle,
  Clock,
  Users,
  Calculator
} from 'lucide-react'

export default function ConfigureStep1() {
  const router = useRouter()

  const features = [
    {
      icon: <Home className="h-8 w-8" />,
      title: "Choose Your Style",
      description: "Select from Modern, Traditional, Contemporary, or Victorian architectural styles with AI-generated visuals",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Configure Layout", 
      description: "Specify bedrooms, bathrooms, and room preferences to match your family's needs",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: <PaintBucket className="h-8 w-8" />,
      title: "Customize Details",
      description: "Fine-tune materials, colors, and finishes to create your perfect home design",
      color: "bg-purple-100 text-purple-600"
    }
  ]

  const benefits = [
    {
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      text: "AI-generated realistic home visualizations"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      text: "UK building regulations compliance"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      text: "Professional architectural accuracy"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      text: "Instant cost and timeline estimates"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Navigation */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => router.push('/')}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Configure Your Dream Home
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Use BuildMate AI AI's advanced configuration system to design your perfect UK home with professional architectural accuracy and realistic visualizations.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-blue-600" />
              <span>What You'll Get</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {benefit.icon}
                  <span className="text-gray-700">{benefit.text}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline & Cost Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">Quick Process</h3>
              </div>
              <p className="text-blue-800">
                Complete your home configuration in just 5-10 minutes with our intuitive step-by-step process.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Calculator className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-900">Instant Estimates</h3>
              </div>
              <p className="text-green-800">
                Get immediate cost estimates and project timelines based on current UK construction market rates.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Start Designing?
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Begin your home configuration journey with BuildMate AI AI. Our advanced system will generate realistic visualizations of your dream home as you make your selections.
              </p>
              <Button 
                size="lg"
                onClick={() => router.push('/configure')}
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3"
              >
                Start Configuration
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}