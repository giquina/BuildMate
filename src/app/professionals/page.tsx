        case 'rating':
          return b.rating - a.rating
        case 'distance':
          return a.distance - b.distance
        case 'reviews':
          return b.reviewCount - a.reviewCount
        case 'experience':
          return b.yearsExperience - a.yearsExperience
        default:
          return 0
      }
    })

    setFilteredProfessionals(filtered)
  }

  const requestQuote = (professional: Professional) => {
    // In a real app, this would open a quote request form
    alert(`Quote request sent to ${professional.name}`)
  }

  const contactProfessional = (professional: Professional, method: 'phone' | 'email') => {
    if (method === 'phone') {
      window.open(`tel:${professional.contactInfo.phone}`)
    } else {
      window.open(`mailto:${professional.contactInfo.email}`)
    }
  }

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
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search by name, company, or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Specialties</option>
                {allSpecialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="rating">Highest Rated</option>
                <option value="distance">Nearest First</option>
                <option value="reviews">Most Reviews</option>
                <option value="experience">Most Experienced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filteredProfessionals.map((professional) => (
            <Card key={professional.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Professional Info */}
                  <div className="md:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 mr-3">
                            {professional.name}
                          </h3>
                          {professional.verified && (
                            <CheckCircle className="h-5 w-5 text-blue-600" title="Verified Professional" />
                          )}
                          {professional.insurance && (
                            <Shield className="h-5 w-5 text-green-600 ml-1" title="Fully Insured" />
                          )}
                        </div>
                        <p className="text-lg text-gray-700 font-medium mb-1">{professional.company}</p>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{professional.location} • {professional.distance} miles away</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center mb-1">
                          <Star className="h-5 w-5 text-yellow-400 mr-1" />
                          <span className="font-semibold text-lg">{professional.rating}</span>
                          <span className="text-gray-600 text-sm ml-1">({professional.reviewCount} reviews)</span>
                        </div>
                        <div className={`text-sm px-2 py-1 rounded ${
                          professional.availability === 'available' 
                            ? 'bg-green-100 text-green-800' 
                            : professional.availability === 'busy'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {professional.availability === 'available' ? 'Available' : 
                           professional.availability === 'busy' ? 'Busy' : 'Fully Booked'}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{professional.description}</p>

                    {/* Specialties */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {professional.specialties.map((specialty) => {
                          const IconComponent = specialtyIcons[specialty as keyof typeof specialtyIcons] || Hammer
                          return (
                            <div key={specialty} className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                              <IconComponent className="h-3 w-3 mr-1" />
                              {specialty}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{professional.yearsExperience}</div>
                        <div className="text-sm text-gray-600">Years Experience</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{professional.projectsCompleted}</div>
                        <div className="text-sm text-gray-600">Projects Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">£{(professional.averageQuote / 1000).toFixed(0)}k</div>
                        <div className="text-sm text-gray-600">Average Quote</div>
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Certifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {professional.certifications.map((cert) => (
                          <div key={cert} className="flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                            <Award className="h-3 w-3 mr-1" />
                            {cert}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Contact Actions */}
                  <div className="md:col-span-1">
                    <Card className="bg-gray-50">
                      <CardContent className="p-4 space-y-3">
                        <Button 
                          className="w-full"
                          onClick={() => requestQuote(professional)}
                          disabled={professional.availability === 'booked'}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Request Quote
                        </Button>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => contactProfessional(professional, 'phone')}
                          >
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => contactProfessional(professional, 'email')}
                          >
                            <Mail className="h-4 w-4 mr-1" />
                            Email
                          </Button>
                        </div>

                        {professional.contactInfo.website && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-full text-blue-600"
                            onClick={() => window.open(`https://${professional.contactInfo.website}`, '_blank')}
                          >
                            Visit Website
                          </Button>
                        )}

                        <div className="pt-3 border-t text-sm text-gray-600">
                          <div className="mb-1">
                            <Phone className="h-3 w-3 inline mr-1" />
                            {professional.contactInfo.phone}
                          </div>
                          <div>
                            <Mail className="h-3 w-3 inline mr-1" />
                            {professional.contactInfo.email}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No professionals found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all specialties</p>
          </div>
        )}

        {/* Load More */}
        {filteredProfessionals.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Professionals
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}