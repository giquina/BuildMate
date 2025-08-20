'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useFreemium } from '@/contexts/UserContext'
import { FreemiumSystem, useFeatureAccess } from '@/components/ui'
import { useNotifications, useXPNotification } from '@/components/ui/NotificationSystem'
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
  Clock,
  Wand2,
  RefreshCw,
  Camera,
  Zap
} from 'lucide-react'

import { 
  configurationSteps, 
  generateSmartSuggestions, 
  type Question 
} from '@/lib/intelligentQuestions'
import { getAllArchitecturalStyles, selectBestImageForStyle, getRandomImageForStyle } from '@/lib/pregenerated-images'

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
  generated: boolean
  prompt?: string
}

interface GenerationProgress {
  completed: number
  total: number
  generating: boolean
}

export default function ConfigurePage() {
  const router = useRouter()
  const freemium = useFreemium()
  const { addNotification } = useNotifications()
  const addXPNotification = useXPNotification()
  const aiFeatureAccess = useFeatureAccess('ai_suggestions')
  
  const [selectedStyle, setSelectedStyle] = useState('')
  const [bedrooms, setBedrooms] = useState(3)
  const [bathrooms, setBathrooms] = useState(2)
  const [generatedImages, setGeneratedImages] = useState<{[key: string]: GeneratedImage}>({})
  const [generationProgress, setGenerationProgress] = useState<GenerationProgress>({
    completed: 0,
    total: 4,
    generating: false
  })
  const [smartGenerationEnabled, setSmartGenerationEnabled] = useState(true) // Start with smart generation enabled

  // Base architectural styles configuration
  const baseArchitecturalStyles = getAllArchitecturalStyles().map(style => ({
    id: style.id,
    name: style.name,
    description: style.description,
    fallbackColor: style.fallbackColor,
    icon: style.id === 'modern' ? Building2 : 
          style.id === 'traditional' ? Home :
          style.id === 'contemporary' ? Sparkles : Castle,
    prompt: getStylePrompt(style.id, bedrooms, bathrooms)
  }))

  // Enhanced architectural styles with generation status
  const architecturalStyles = baseArchitecturalStyles.map(style => {
    const generated = generatedImages[style.id]
    const fallbackVariant = selectBestImageForStyle(style.id, bedrooms) || getRandomImageForStyle(style.id)
    
    return {
      ...style,
      imageUrl: generated?.url || fallbackVariant?.url || `/images/architecture/${style.id}-fallback.jpg`,
      loading: generated?.loading || false,
      error: generated?.error,
      generated: generated?.generated || false,
      fallbackColor: style.fallbackColor,
      variantDescription: fallbackVariant?.description || style.description,
      tags: fallbackVariant?.tags || [],
      bedroomMatch: fallbackVariant?.bedrooms === bedrooms
    }
  })

  // Generate style-specific prompts
  function getStylePrompt(styleId: string, bedrooms: number, bathrooms: number): string {
    const bedroomText = bedrooms === 1 ? '1 bedroom' : `${bedrooms} bedroom`
    const bathroomText = bathrooms === 1 ? '1 bathroom' : `${bathrooms} bathroom`
    
    const basePrompts = {
      modern: `modern UK house, ${bedroomText} ${bathroomText}, large windows, clean lines, contemporary architecture, minimalist design, professional photography`,
      traditional: `traditional British house, ${bedroomText} ${bathroomText}, classic design, period features, red brick, pitched roof, charming traditional architecture, professional photography`,
      contemporary: `contemporary UK house, ${bedroomText} ${bathroomText}, mixed materials, current trends, glass and steel, innovative design, cutting-edge architecture, professional photography`,
      victorian: `Victorian UK house, ${bedroomText} ${bathroomText}, period elegance, ornate details, bay windows, decorative features, historic british architecture, professional photography`
    }
    
    return basePrompts[styleId as keyof typeof basePrompts] || basePrompts.modern
  }

  const bedroomOptions = [1, 2, 3, 4, 5]
  const bathroomOptions = [1, 2, 3, 4, 5]

  // Auto-generate all 4 architectural style images on page load
  useEffect(() => {
    if (smartGenerationEnabled && Object.keys(generatedImages).length === 0) {
      generateAllArchitecturalStyles()
    }
  }, [smartGenerationEnabled])

  // Re-generate images when user changes preferences
  const handleBedroomChange = (newBedrooms: number) => {
    setBedrooms(newBedrooms)
    if (smartGenerationEnabled && Object.values(generatedImages).some(img => img.generated)) {
      regenerateAllStyles()
    }
  }

  const handleBathroomChange = (newBathrooms: number) => {
    setBathrooms(newBathrooms)
    if (smartGenerationEnabled && Object.values(generatedImages).some(img => img.generated)) {
      regenerateAllStyles()
    }
  }

  // Generate all 4 architectural styles in parallel
  const generateAllArchitecturalStyles = async () => {
    setGenerationProgress({ completed: 0, total: 4, generating: true })
    
    // Initialize all images as loading
    const initialImages: {[key: string]: GeneratedImage} = {}
    baseArchitecturalStyles.forEach(style => {
      initialImages[style.id] = {
        url: '',
        loading: true,
        error: undefined,
        generated: false,
        prompt: style.prompt
      }
    })
    setGeneratedImages(initialImages)

    // Generate all images in parallel
    const promises = baseArchitecturalStyles.map(style => 
      generateSingleImage(style.id, style.prompt)
    )
    
    await Promise.allSettled(promises)
    setGenerationProgress(prev => ({ ...prev, generating: false }))
  }

  // Regenerate all styles with updated preferences and AI limit check
  const regenerateAllStyles = async () => {
    // Check AI feature access first
    if (!aiFeatureAccess.canUse()) {
      addNotification({
        type: 'upgrade',
        title: 'AI Generation Limit Reached',
        message: 'You\'ve used your daily AI generation limit. Upgrade for unlimited access!',
        duration: 0,
        actions: [{
          label: 'Upgrade Now',
          onClick: () => router.push('/pricing'),
          variant: 'primary'
        }]
      })
      return
    }
    
    setGenerationProgress({ completed: 0, total: 4, generating: true })
    
    // Award XP for starting generation
    addXPNotification(20, 'Started AI image generation!')
    
    // Reset all images to loading state with updated prompts
    const updatedImages: {[key: string]: GeneratedImage} = {}
    baseArchitecturalStyles.forEach(style => {
      updatedImages[style.id] = {
        url: '',
        loading: true,
        error: undefined,
        generated: false,
        prompt: getStylePrompt(style.id, bedrooms, bathrooms)
      }
    })
    setGeneratedImages(updatedImages)

    // Generate all images with updated prompts
    const promises = baseArchitecturalStyles.map(style => 
      generateSingleImage(style.id, getStylePrompt(style.id, bedrooms, bathrooms))
    )
    
    await Promise.allSettled(promises)
    setGenerationProgress(prev => ({ ...prev, generating: false }))
    
    // Award XP for completing generation
    addXPNotification(50, 'AI image generation complete!')
  }

  // Generate a single architectural style image
  const generateSingleImage = async (styleId: string, prompt: string) => {
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          style: styleId,
          prompt: `${prompt}, UK construction standards, architectural accuracy, professional real estate photography, high quality, detailed, realistic lighting`
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setGeneratedImages(prev => ({
          ...prev,
          [styleId]: {
            url: data.imageUrl,
            loading: false,
            error: undefined,
            generated: true,
            prompt: data.prompt
          }
        }))
        setGenerationProgress(prev => ({ 
          ...prev, 
          completed: prev.completed + 1 
        }))
      } else {
        console.error(`Failed to generate ${styleId} image:`, data.error)
        setGeneratedImages(prev => ({
          ...prev,
          [styleId]: {
            url: '',
            loading: false,
            error: data.error || 'Generation failed',
            generated: false,
            prompt: prompt
          }
        }))
      }
    } catch (error) {
      console.error(`Error generating ${styleId} image:`, error)
      setGeneratedImages(prev => ({
        ...prev,
        [styleId]: {
          url: '',
          loading: false,
          error: 'Network error',
          generated: false,
          prompt: prompt
        }
      }))
    }
  }

  // Retry generation for a specific style
  const retryGeneration = async (styleId: string) => {
    const style = baseArchitecturalStyles.find(s => s.id === styleId)
    if (!style) return
    
    setGeneratedImages(prev => ({
      ...prev,
      [styleId]: {
        ...prev[styleId],
        loading: true,
        error: undefined
      }
    }))
    
    await generateSingleImage(styleId, style.prompt)
  }

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId)
  }

  const [generateFloorplan, setGenerateFloorplan] = useState(false)
  const [floorplanLoading, setFloorplanLoading] = useState(false)
  const [generatedFloorplan, setGeneratedFloorplan] = useState<any>(null)

  const handleGenerateSmartFloorplan = async () => {
    if (!selectedStyle) return
    
    // Check AI feature access first
    if (!aiFeatureAccess.canUse()) {
      addNotification({
        type: 'upgrade',
        title: 'AI Suggestion Limit Reached',
        message: 'You\'ve used your daily AI suggestions. Upgrade for unlimited smart features!',
        duration: 0,
        actions: [{
          label: 'Upgrade Now',
          onClick: () => router.push('/pricing'),
          variant: 'primary'
        }]
      })
      return
    }
    
    setFloorplanLoading(true)
    addXPNotification(30, 'Started smart floorplan generation!')
    
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectData: {
            style: selectedStyle,
            bedrooms,
            bathrooms,
            propertyType: 'house',
            budget: 250000, // Default budget - could be from earlier step
            specialRequirements: []
          }
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setGeneratedFloorplan(data.floorplan)
        setGenerateFloorplan(true)
        addXPNotification(75, 'Smart floorplan generated successfully!')
      } else {
        console.error('Smart floorplan generation failed:', data.error)
        addNotification({
          type: 'warning',
          title: 'Generation Failed',
          message: 'Smart floorplan generation encountered an error. Please try again.',
          duration: 4000
        })
      }
    } catch (error) {
      console.error('Error generating smart floorplan:', error)
      addNotification({
        type: 'warning',
        title: 'Network Error',
        message: 'Unable to connect to AI service. Please check your connection.',
        duration: 4000
      })
    } finally {
      setFloorplanLoading(false)
    }
  }

  const handleContinue = () => {
    if (selectedStyle) {
      const selectedStyleData = architecturalStyles.find(s => s.id === selectedStyle)
      const generatedImage = generatedImages[selectedStyle]
      
      // Store selections in sessionStorage for use in materials page
      sessionStorage.setItem('buildmate-config', JSON.stringify({
        style: selectedStyle,
        bedrooms,
        bathrooms,
        // Use smart-generated image if available, otherwise fallback
        generatedImage: generatedImage?.url || selectedStyleData?.imageUrl,
        smartGenerated: generatedImage?.generated || false,
        // Include smart floorplan data if generated
        smartFloorplan: generatedFloorplan
      }))
      
      // Award XP for completing configuration step
      addXPNotification(25, 'Configuration completed!')
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
          
          {/* Smart Generation Status */}
          {generationProgress.generating ? (
            <div className="flex items-center justify-center space-x-2 text-sm text-blue-600 mb-4">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="font-medium">
                Smart Generation: Images {generationProgress.completed}/{generationProgress.total} generating...
              </span>
            </div>
          ) : generationProgress.completed > 0 ? (
            <div className="flex items-center justify-center space-x-2 text-sm text-green-600 mb-4">
              <CheckCircle className="h-4 w-4" />
              <span className="font-medium">
                Smart Generation Complete! {generationProgress.completed}/4 architectural styles ready
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-4">
              <Camera className="h-4 w-4" />
              <span className="font-medium">Professional architectural styles with smart generation</span>
            </div>
          )}
          
          {/* Generation Progress Bar */}
          {generationProgress.generating && (
            <div className="max-w-md mx-auto mb-4">
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(generationProgress.completed / generationProgress.total) * 100}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Generating personalized {bedrooms}-bedroom architectural renders...
              </div>
            </div>
          )}
          
          {/* Smart Generation Controls */}
          <div className="mt-4 space-x-3">
            {!generationProgress.generating && generationProgress.completed === 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => generateAllArchitecturalStyles()}
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                <Zap className="h-4 w-4 mr-2" />
                Generate Smart Styles
              </Button>
            )}
            
            {generationProgress.completed > 0 && !generationProgress.generating && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => regenerateAllStyles()}
                className="text-green-600 border-green-600 hover:bg-green-50"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate All
              </Button>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSmartGenerationEnabled(!smartGenerationEnabled)}
              className={smartGenerationEnabled ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-gray-600'}
            >
              <Wand2 className="h-4 w-4 mr-2" />
              {smartGenerationEnabled ? 'Smart Generation: ON' : 'Smart Generation: OFF'}
            </Button>
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
                      {style.loading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                          <div className="text-center">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
                            <div className="text-sm text-gray-600">
                              Generating smart {style.name.toLowerCase()}...
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {bedrooms}-bedroom design
                            </div>
                          </div>
                        </div>
                      ) : style.error ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-red-50">
                          <div className="text-center">
                            <div className="text-sm text-red-600 mb-2">Generation failed</div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                retryGeneration(style.id)
                              }}
                              className="text-red-600 border-red-600 hover:bg-red-50"
                            >
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Retry
                            </Button>
                          </div>
                        </div>
                      ) : style.generated && style.imageUrl ? (
                        <img
                          src={style.imageUrl}
                          alt={`Smart-generated ${style.name} style ${bedrooms}-bedroom house`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error(`Failed to load generated image for ${style.name}`)
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      ) : (
                        // Use pre-generated image with fallback gradient
                        <>
                          <img
                            src={style.imageUrl}
                            alt={`${style.name} style house`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // If image fails to load, show gradient fallback
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                          <div className={`absolute inset-0 bg-gradient-to-br ${style.fallbackColor}`} />
                        </>
                      )}
                      
                      {/* Icon Overlay */}
                      {!style.loading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                            <IconComponent className="h-8 w-8 text-blue-600" />
                          </div>
                        </div>
                      )}
                      
                      {/* Smart Generated Badge */}
                      {style.generated && (
                        <div className="absolute top-3 left-3">
                          <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                            <Zap className="h-3 w-3" />
                            <span>Smart</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Perfect match badge */}
                      {!style.generated && style.bedroomMatch && (
                        <div className="absolute top-3 left-3">
                          <div className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Perfect Match
                          </div>
                        </div>
                      )}
                      
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
                      <h3 className="font-semibold text-gray-900 text-center mb-2">
                        {style.name}
                      </h3>
                      <p className="text-xs text-gray-600 text-center mb-3">
                        {style.generated 
                          ? `Smart-generated ${bedrooms}-bedroom ${style.name.toLowerCase()} design`
                          : style.variantDescription
                        }
                      </p>
                      
                      {/* Tags */}
                      {style.tags.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-1 mb-3">
                          {style.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Generation Status */}
                      {style.loading && (
                        <div className="text-center text-xs text-blue-600 font-medium">
                          Generating...
                        </div>
                      )}
                      
                      {style.generated && (
                        <div className="text-center text-xs text-green-600 font-medium flex items-center justify-center space-x-1">
                          <Zap className="h-3 w-3" />
                          <span>Smart Generated</span>
                        </div>
                      )}
                      
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
                    onClick={() => handleBedroomChange(num)}
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
                    onClick={() => handleBathroomChange(num)}
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

        {/* Smart Floorplan Generation */}
        {selectedStyle && !generateFloorplan && (
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Lightbulb className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Generate Smart Floorplan
                </h3>
                <p className="text-gray-600 mb-4">
                  Create an intelligent layout optimized for UK building regulations and your specific requirements
                </p>
                <Button
                  onClick={handleGenerateSmartFloorplan}
                  disabled={floorplanLoading}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {floorplanLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Generating Smart Layout...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-5 w-5 mr-2" />
                      Generate Smart Floorplan
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Generated Floorplan Display */}
        {generatedFloorplan && (
          <Card className="mb-8 bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-semibold text-green-900">
                  Smart Floorplan Generated
                </h3>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Floorplan Visualization */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">{generatedFloorplan.name}</h4>
                  <div className="bg-white rounded-lg p-4 border">
                    <div 
                      dangerouslySetInnerHTML={{ __html: generatedFloorplan.svgData }}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Total Area:</span>{' '}
                      <span className="font-medium text-gray-900">{generatedFloorplan.totalArea}m²</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Estimated Cost:</span>{' '}
                      <span className="font-medium text-gray-900">£{generatedFloorplan.estimatedCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                {/* Smart Insights */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Smart Insights</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Design Rationale</h5>
                      <p className="text-sm text-gray-600">{generatedFloorplan.smartInsights.designRationale}</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">UK Building Regulations</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {generatedFloorplan.smartInsights.ukBuildingRegulations.map((reg: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            {reg}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Cost Optimizations</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {generatedFloorplan.smartInsights.costOptimizations.map((opt: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <Target className="h-3 w-3 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                            {opt}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Spatial Efficiency</h5>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all"
                            style={{ width: `${generatedFloorplan.smartInsights.spatialEfficiency}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {generatedFloorplan.smartInsights.spatialEfficiency}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
              
              {generatedFloorplan && (
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <div className="flex items-center space-x-2 text-sm">
                    <Wand2 className="h-4 w-4 text-blue-600" />
                    <span className="text-blue-700">Smart floorplan generated with UK construction optimization</span>
                  </div>
                </div>
              )}
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