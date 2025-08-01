// Intelligent questionnaire system for BuildMate configuration
export interface Question {
  id: string
  type: 'select' | 'multiselect' | 'range' | 'text' | 'boolean'
  question: string
  options?: { value: string; label: string; description?: string }[]
  min?: number
  max?: number
  step?: number
  required: boolean
  dependsOn?: { questionId: string; values: string[] }
  hint?: string
  smartSuggestion?: (answers: Record<string, any>) => string
}

export interface ConfigurationStep {
  id: string
  title: string
  description: string
  questions: Question[]
  smartInsights?: (answers: Record<string, any>) => string[]
}

// UK-specific property types with regional considerations
export const propertyTypes = [
  { value: 'detached', label: 'Detached House', description: 'Standalone property with garden space' },
  { value: 'semi-detached', label: 'Semi-Detached', description: 'Attached to one neighboring property' },
  { value: 'terraced', label: 'Terraced House', description: 'Part of a continuous row of houses' },
  { value: 'bungalow', label: 'Bungalow', description: 'Single-story dwelling' },
  { value: 'flat', label: 'Flat/Apartment', description: 'Part of a larger residential building' },
  { value: 'cottage', label: 'Cottage', description: 'Traditional small house, often rural' },
  { value: 'townhouse', label: 'Townhouse', description: 'Multi-story urban property' }
]

// Architectural styles with UK focus
export const architecturalStyles = [
  { 
    value: 'victorian', 
    label: 'Victorian', 
    description: 'Period features, bay windows, high ceilings',
    era: '1837-1901',
    characteristics: ['Ornate details', 'Sash windows', 'High ceilings', 'Period features']
  },
  { 
    value: 'edwardian', 
    label: 'Edwardian', 
    description: 'Lighter, more spacious than Victorian',
    era: '1901-1910',
    characteristics: ['Larger windows', 'Wider hallways', 'Mock Tudor elements']
  },
  { 
    value: 'georgian', 
    label: 'Georgian', 
    description: 'Symmetrical facades, elegant proportions',
    era: '1714-1830',
    characteristics: ['Symmetrical design', 'Sash windows', 'Classical proportions']
  },
  { 
    value: 'modern', 
    label: 'Modern', 
    description: 'Clean lines, large windows, open spaces',
    era: '2000+',
    characteristics: ['Clean lines', 'Large glazing', 'Open plan', 'Contemporary materials']
  },
  { 
    value: 'contemporary', 
    label: 'Contemporary', 
    description: 'Current trends, mixed materials',
    era: '2010+',
    characteristics: ['Mixed materials', 'Innovative design', 'Energy efficient', 'Smart home ready']
  }
]

// UK budget ranges with regional multipliers
export const budgetRanges = [
  { value: '15000-30000', label: '£15,000 - £30,000', description: 'Small improvements, cosmetic updates' },
  { value: '30000-60000', label: '£30,000 - £60,000', description: 'Kitchen renovation, bathroom upgrade' },
  { value: '60000-100000', label: '£60,000 - £100,000', description: 'Single-story extension, major renovation' },
  { value: '100000-200000', label: '£100,000 - £200,000', description: 'Two-story extension, full house renovation' },
  { value: '200000-500000', label: '£200,000 - £500,000', description: 'Major extensions, luxury finishes' },
  { value: '500000+', label: '£500,000+', description: 'Premium build, architectural design' }
]

// Intelligent configuration steps
export const configurationSteps: ConfigurationStep[] = [
  {
    id: 'property-basics',
    title: 'Tell us about your property',
    description: 'Understanding your current property helps us suggest the best improvements',
    questions: [
      {
        id: 'propertyType',
        type: 'select',
        question: 'What type of property do you have?',
        options: propertyTypes,
        required: true,
        hint: 'This affects planning permissions and structural possibilities'
      },
      {
        id: 'currentStyle',
        type: 'select',
        question: 'What architectural style is your property?',
        options: architecturalStyles.map(style => ({
          value: style.value,
          label: style.label,
          description: `${style.era} - ${style.description}`
        })),
        required: true,
        smartSuggestion: (answers) => {
          const property = answers.propertyType
          if (property === 'terraced') return 'Most terraced houses are Victorian or Edwardian - check for original features'
          if (property === 'detached') return 'Detached properties offer more flexibility for extensions'
          return 'Understanding your property\'s era helps preserve character while modernizing'
        }
      },
      {
        id: 'postcode',
        type: 'text',
        question: 'What\'s your postcode?',
        required: true,
        hint: 'We use this for local building regulations, costs, and finding nearby professionals'
      }
    ],
    smartInsights: (answers) => {
      const insights = []
      if (answers.propertyType === 'flat') {
        insights.push('💡 Flats may have leasehold restrictions - check with your freeholder before major works')
      }
      if (answers.currentStyle === 'victorian') {
        insights.push('🏛️ Victorian properties often have original features worth preserving and highlighting')
      }
      if (answers.postcode?.startsWith('SW') || answers.postcode?.startsWith('W1')) {
        insights.push('📍 Central London location may require additional planning considerations')
      }
      return insights
    }
  },
  {
    id: 'project-goals',
    title: 'What do you want to achieve?',
    description: 'Your goals help us prioritize the right solutions',
    questions: [
      {
        id: 'primaryGoal',
        type: 'select',
        question: 'What\'s your main goal for this project?',
        options: [
          { value: 'more-space', label: 'Create more living space', description: 'Extensions, conversions, open-plan' },
          { value: 'modernize', label: 'Modernize the property', description: 'Update fixtures, layout, technology' },
          { value: 'value-add', label: 'Increase property value', description: 'Strategic improvements for ROI' },
          { value: 'energy-efficiency', label: 'Improve energy efficiency', description: 'Insulation, heating, windows' },
          { value: 'lifestyle', label: 'Better lifestyle/functionality', description: 'Home office, family spaces' },
          { value: 'maintenance', label: 'Essential maintenance', description: 'Roof, damp, structural issues' }
        ],
        required: true
      },
      {
        id: 'budget',
        type: 'select',
        question: 'What\'s your budget range?',
        options: budgetRanges,
        required: true,
        smartSuggestion: (answers) => {
          const goal = answers.primaryGoal
          if (goal === 'more-space') return 'Extensions typically cost £1,200-£2,500 per sqm depending on specification'
          if (goal === 'modernize') return 'Kitchen renovations average £15,000-£40,000, bathrooms £8,000-£25,000'
          return 'We\'ll help optimize your budget for maximum impact'
        }
      },
      {
        id: 'timeline',
        type: 'select',
        question: 'When would you like to start?',
        options: [
          { value: 'asap', label: 'As soon as possible', description: 'Ready to begin planning immediately' },
          { value: '1-3months', label: '1-3 months', description: 'Planning and preparation phase' },
          { value: '3-6months', label: '3-6 months', description: 'Research and design phase' },
          { value: '6months+', label: '6+ months', description: 'Long-term planning' },
          { value: 'flexible', label: 'Flexible timing', description: 'Open to optimal scheduling' }
        ],
        required: true,
        hint: 'Starting in spring/summer often works better for extensions and external work'
      }
    ],
    smartInsights: (answers) => {
      const insights = []
      const budget = answers.budget?.split('-')[0]?.replace('£', '').replace(',', '')
      const goal = answers.primaryGoal
      
      if (goal === 'more-space' && parseInt(budget) < 60000) {
        insights.push('💰 Consider a loft conversion (£15k-£60k) as a cost-effective way to add space')
      }
      if (goal === 'value-add') {
        insights.push('📈 Kitchen and bathroom improvements typically offer the best ROI (60-80%)')
      }
      if (answers.timeline === 'asap') {
        insights.push('⚡ Quick wins: cosmetic improvements can be completed in 2-6 weeks')
      }
      
      return insights
    }
  },
  {
    id: 'specific-requirements',
    title: 'Specific requirements',
    description: 'Let\'s get into the details of what you need',
    questions: [
      {
        id: 'rooms',
        type: 'multiselect',
        question: 'Which areas need attention?',
        options: [
          { value: 'kitchen', label: 'Kitchen', description: 'Cooking and dining space' },
          { value: 'bathroom', label: 'Bathroom(s)', description: 'Main and en-suite bathrooms' },
          { value: 'living', label: 'Living areas', description: 'Lounge, dining room, family room' },
          { value: 'bedrooms', label: 'Bedrooms', description: 'Master and guest bedrooms' },
          { value: 'extension', label: 'Extension', description: 'Single or double-story addition' },
          { value: 'loft', label: 'Loft conversion', description: 'Converting roof space' },
          { value: 'basement', label: 'Basement/cellar', description: 'Underground space conversion' },
          { value: 'garden', label: 'Garden/outdoor', description: 'Landscaping, outbuildings' },
          { value: 'whole-house', label: 'Whole house', description: 'Complete renovation' }
        ],
        required: true,
        dependsOn: { questionId: 'primaryGoal', values: ['more-space', 'modernize', 'lifestyle'] }
      },
      {
        id: 'specialRequirements',
        type: 'multiselect',
        question: 'Any special requirements?',
        options: [
          { value: 'accessibility', label: 'Accessibility features', description: 'Ramps, wider doors, accessible bathroom' },
          { value: 'energy-efficient', label: 'Energy efficiency', description: 'Insulation, efficient heating, solar' },
          { value: 'smart-home', label: 'Smart home features', description: 'Home automation, integrated tech' },
          { value: 'period-features', label: 'Preserve period features', description: 'Maintain historical character' },
          { value: 'rental-ready', label: 'Rental property prep', description: 'Optimize for tenants' },
          { value: 'family-friendly', label: 'Family-friendly design', description: 'Child-safe, practical for families' },
          { value: 'home-office', label: 'Home office space', description: 'Dedicated workspace' },
          { value: 'multi-generation', label: 'Multi-generational living', description: 'Separate living areas' }
        ],
        required: false
      }
    ],
    smartInsights: (answers) => {
      const insights = []
      const rooms = answers.rooms || []
      
      if (rooms.includes('kitchen') && rooms.includes('extension')) {
        insights.push('🏗️ Kitchen extensions are popular and add significant value - consider open-plan design')
      }
      if (rooms.includes('loft')) {
        insights.push('📐 Loft conversions don\'t usually need planning permission if they meet permitted development rules')
      }
      if (answers.specialRequirements?.includes('energy-efficient')) {
        insights.push('🌱 Energy improvements may qualify for government grants and significantly reduce bills')
      }
      
      return insights
    }
  }
]

// Smart suggestions based on configuration
export const generateSmartSuggestions = (answers: Record<string, any>) => {
  const suggestions = []
  
  // Budget optimization suggestions
  const budget = answers.budget
  const rooms = answers.rooms || []
  const goal = answers.primaryGoal
  
  if (goal === 'value-add') {
    suggestions.push({
      type: 'value',
      title: 'ROI Optimization',
      message: 'Kitchen and bathroom renovations typically return 60-80% of investment',
      action: 'Prioritize these areas for maximum value increase'
    })
  }
  
  if (rooms.includes('extension') && budget && budget.includes('60000-100000')) {
    suggestions.push({
      type: 'space',
      title: 'Extension Strategy',
      message: 'Single-story rear extension could add 20-30% to property value',
      action: 'Consider permitted development rules to avoid planning permission'
    })
  }
  
  if (answers.currentStyle === 'victorian' && rooms.includes('kitchen')) {
    suggestions.push({
      type: 'design',
      title: 'Victorian Character',
      message: 'Blend modern functionality with period charm',
      action: 'Keep original features like ceiling roses and cornicing'
    })
  }
  
  return suggestions
}

export default configurationSteps