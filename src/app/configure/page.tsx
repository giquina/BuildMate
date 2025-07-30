'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { 
  ChevronLeft, 
  ChevronRight,
  Building2, 
  Home, 
  Sparkles, 
  Castle,
  Bed,
  Bath,
  CheckCircle,
  Loader2,
  ArrowRight,
  Lightbulb,
  MapPin,
  Target,
  Clock
} from 'lucide-react'

import { 
  configurationSteps, 
  generateAISuggestions, 
  type Question 
} from '@/lib/intelligentQuestions'

// Icon mapping for different question types
const getQuestionIcon = (questionId: string) => {
  const iconMap: Record<string, any> = {
    propertyType: Home,
    currentStyle: Building2,
    postcode: MapPin,
    primaryGoal: Target,
    budget: Sparkles,
    timeline: Clock,
    rooms: Building2,
    specialRequirements: CheckCircle
  }
  return iconMap[questionId] || CheckCircle
}

interface GeneratedImage {
  url: string
  loading: boolean
  error?: string
}

export default function ConfigurePage() {
  const router = useRouter()
  const [selectedStyle, setSelectedStyle] = useState('')
  const [bedrooms, setBedrooms] = useState(3)
  const [bathrooms, setBathrooms] = useState(2)
  const [generatedImages, setGeneratedImages] = useState<{[key: string]: GeneratedImage}>({})
  const [imagesGenerated, setImagesGenerated] = useState(0)

  const architecturalStyles = [
    { id: 'modern', name: 'Modern', prompt: 'A modern house with clean lines and large windows', icon: Building2 },
    { id: 'traditional', name: 'Traditional', prompt: 'A traditional house with a brick facade and a pitched roof', icon: Home },
    { id: 'contemporary', name: 'Contemporary', prompt: 'A contemporary house with a unique, sculptural design', icon: Sparkles },
    { id: 'castle', name: 'Castle', prompt: 'A grand castle with stone walls and turrets', icon: Castle },
  ];

  const bedroomOptions = [1, 2, 3, 4, 5];
  const bathroomOptions = [1, 2, 3, 4, 5];

  // Auto-generate all 4 images when page loads
  useEffect(() => {
    const generateAllImages = async () => {
      // Initialize loading states
      const initialState: {[key: string]: GeneratedImage} = {}
      architecturalStyles.forEach(style => {
        initialState[style.id] = { url: '', loading: true }
      })
      setGeneratedImages(initialState)

      // Generate images concurrently but track completion
      const generatePromises = architecturalStyles.map(async (style) => {
        try {
          const response = await fetch('/api/generate-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              style: style.id,
              prompt: style.prompt
            })
          })
          
          const data = await response.json()
          
          if (data.success) {
            setGeneratedImages(prev => ({
              ...prev,
              [style.id]: { url: data.imageUrl, loading: false }
            }))
            setImagesGenerated(prev => prev + 1)
          } else {
            console.error(`Failed to generate ${style.name} image:`, data.error)
            setGeneratedImages(prev => ({
              ...prev,
              [style.id]: { url: '', loading: false, error: data.error }
            }))
          }
        } catch (error) {
          console.error(`Error generating ${style.name} image:`, error)
          setGeneratedImages(prev => ({
            ...prev,
            [style.id]: { url: '', loading: false, error: 'Generation failed' }
          }))
        }
      })

      await Promise.all(generatePromises)
    }

    generateAllImages()
  }, [])

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId)
  }

  const handleContinue = () => {
    if (selectedStyle) {
      // Store selections in sessionStorage for use in materials page
      sessionStorage.setItem('buildmate-config', JSON.stringify({
        style: selectedStyle,
        bedrooms,
        bathrooms,
        generatedImage: generatedImages[selectedStyle]?.url
      }))
      router.push('/materials')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Navigation */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => router.push('/configure/step-1')}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Step 1</span>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Design Your Perfect Home
          </h1>
          <p className="text-gray-600 mb-4">Step 2 of 3 - Choose your style and specifications</p>
          
          {/* Progress indicator for image generation */}
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              {imagesGenerated < 4 ? (
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
              <span>
                AI Images: {imagesGenerated}/4 {imagesGenerated < 4 ? 'generating...' : 'ready'}
              </span>
            </div>
          </div>
        </div>

        {/* Architectural Style Selection */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Choose Your Architectural Style
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {architecturalStyles.map((style) => {
                const IconComponent = style.icon
                const imageData = generatedImages[style.id]
                
                return (
                  <div
                    key={style.id}
                    className={`relative border-2 rounded-lg cursor-pointer transition-all hover:shadow-lg ${
                      selectedStyle === style.id
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleStyleSelect(style.id)}
                  >
                    {/* Background Image */}
                    <div className="relative aspect-[4/3] rounded-t-lg overflow-hidden bg-gray-100">
                      {imageData?.loading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                          <div className="text-center">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
                            <div className="text-sm text-gray-600">Generating {style.name}...</div>
                          </div>
                        </div>
                      ) : imageData?.url ? (
                        <img
                          src={imageData.url}
                          alt={`${style.name} style house`}
                          className="w-full h-full object-cover"
                        />
                      ) : imageData?.error ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-red-50">
                          <div className="text-center text-red-600">
                            <div className="text-sm">Generation failed</div>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200" />
                      )}
                      
                      {/* Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                          <IconComponent className="h-8 w-8 text-blue-600" />
                        </div>
                      </div>
                      
                      {/* Selection Indicator */}
                      {selectedStyle === style.id && (
                        <div className="absolute top-3 right-3">
                          <div className="bg-blue-600 rounded-full p-1">
                            <CheckCircle className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Style Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-center">
                        {style.name}
                      </h3>
                      {selectedStyle === style.id && (
                        <div className="mt-2 text-center">
                          <span className="text-sm text-blue-600 font-medium">✓ Selected</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Room Configuration */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Bedrooms */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Bed className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Bedrooms</h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {bedroomOptions.map((num) => (
                  <button
                    key={num}
                    onClick={() => setBedrooms(num)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      bedrooms === num
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-300 text-gray-700'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bathrooms */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Bath className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Bathrooms</h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {bathroomOptions.map((num) => (
                  <button
                    key={num}
                    onClick={() => setBathrooms(num)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      bathrooms === num
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-300 text-gray-700'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Summary */}
        {selectedStyle && (
          <Card className="mb-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                Configuration Summary
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-blue-700">Style:</span>{' '}
                  <span className="font-medium text-blue-900">
                    {architecturalStyles.find(s => s.id === selectedStyle)?.name}
                  </span>
                </div>
                <div>
                  <span className="text-blue-700">Bedrooms:</span>{' '}
                  <span className="font-medium text-blue-900">{bedrooms}</span>
                </div>
                <div>
                  <span className="text-blue-700">Bathrooms:</span>{' '}
                  <span className="font-medium text-blue-900">{bathrooms}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Continue Button */}
        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedStyle}
            size="lg"
            className="px-8 py-3"
          >
            Continue to Materials
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          
          {!selectedStyle && (
            <p className="text-sm text-gray-500 mt-2">
              Please select an architectural style to continue
            </p>
          )}
        </div>
      </div>
    </div>
  )
}