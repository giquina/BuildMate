'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { 
  Search, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle, 
  Shield,
  Users,
  Calendar,
  Award,
  Hammer,
  Zap,
  Droplets,
  Paintbrush2
} from 'lucide-react'

interface Professional {
  id: string
  name: string
  company: string
  specialties: string[]
  location: string
  distance: number
  rating: number
  reviewCount: number
  verified: boolean
  insurance: boolean
  description: string
  contactInfo: {
    phone: string
    email: string
    website?: string
  }
  certifications: string[]
  yearsExperience: number
  projectsCompleted: number
  averageQuote: number
  availability: 'available' | 'busy' | 'booked'
}

const mockProfessionals: Professional[] = [
  {
    id: '1',
    name: 'James Mitchell',
    company: 'Mitchell Construction Ltd',
    specialties: ['General Building', 'Extensions', 'Renovations'],
    location: 'Birmingham',
    distance: 2.3,
    rating: 4.8,
    reviewCount: 127,
    verified: true,
    insurance: true,
    description: 'Experienced builder specializing in residential projects across Birmingham. 15+ years of quality construction work.',
    contactInfo: {
      phone: '0121 555 0123',
      email: 'james@mitchellconstruction.co.uk',
      website: 'www.mitchellconstruction.co.uk'
    },
    certifications: ['CITB', 'CSCS Gold Card', 'FMB Member'],
    yearsExperience: 15,
    projectsCompleted: 89,
    averageQuote: 35000,
    availability: 'available'
  },
  {
    id: '2',
    name: 'Sarah Thompson',
    company: 'Elite Electrical Services',
    specialties: ['Electrical Installation', 'Rewiring', 'Smart Home'],
    location: 'Solihull',
    distance: 5.1,
    rating: 4.9,
    reviewCount: 203,
    verified: true,
    insurance: true,
    description: 'NICEIC approved electrician with expertise in modern electrical installations and smart home technology.',
    contactInfo: {
      phone: '0121 555 0456',
      email: 'sarah@eliteelectrical.co.uk'
    },
    certifications: ['NICEIC Approved', '18th Edition', 'Part P Certified'],
    yearsExperience: 12,
    projectsCompleted: 156,
    averageQuote: 4500,
    availability: 'available'
  }
]

export default function ProfessionalsPage() {
  const [professionals] = useState<Professional[]>(mockProfessionals)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Find Verified Professionals
            </h1>
            <p className="text-gray-600">
              Connect with rated builders, electricians, plumbers and more in your area
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <Input
            placeholder="Search by name, company, or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Results */}
        <div className="space-y-4">
          {professionals.map((professional) => (
            <Card key={professional.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 mr-3">
                        {professional.name}
                      </h3>
                      {professional.verified && (
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <p className="text-lg text-gray-700 font-medium mb-1">{professional.company}</p>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{professional.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-1">
                      <Star className="h-5 w-5 text-yellow-400 mr-1" />
                      <span className="font-semibold text-lg">{professional.rating}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{professional.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {professional.specialties.map((specialty) => (
                    <div key={specialty} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {specialty}
                    </div>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <Button className="btn-primary">Request Quote</Button>
                  <Button variant="outline">Contact</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}