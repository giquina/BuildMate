import { NextResponse } from 'next/server'

// Commercial Pricing Request Interface
interface CommercialPricingRequest {
  propertyCount?: number
  employeeCount?: number
  industryType?: string
  features?: string[]
  region?: string
  existingCustomer?: boolean
  annualCommitment?: boolean
}

// Business Subscription Tiers Interface
interface BusinessSubscriptionTier {
  id: string
  name: string
  tagline: string
  monthlyPrice: number
  annualPrice: number
  annualSavings: number
  popular?: boolean
  enterprise?: boolean
  features: {
    category: string
    items: {
      name: string
      included: boolean | number | string
      description?: string
    }[]
  }[]
  limits: {
    properties: number | 'unlimited'
    assessments: number | 'unlimited'
    roiCalculations: number | 'unlimited'
    professionalContacts: number | 'unlimited'
    teamMembers: number | 'unlimited'
    support: string
    apiAccess: boolean
    customIntegrations: boolean
  }
  addOns: {
    id: string
    name: string
    description: string
    monthlyPrice: number
    unit?: string
  }[]
  idealFor: string[]
  caseStudies: {
    clientType: string
    challenge: string
    solution: string
    results: string[]
  }[]
}

// Commercial Pricing Response Interface
interface CommercialPricingResponse {
  success: boolean
  data: {
    tiers: {
      starter: BusinessSubscriptionTier
      professional: BusinessSubscriptionTier
      enterprise: BusinessSubscriptionTier
    }
    customization: {
      availableAddOns: {
        category: string
        addOns: {
          id: string
          name: string
          description: string
          pricing: {
            monthly: number
            annual: number
            unit?: string
          }
          minimumTier: string
        }[]
      }[]
      enterpriseFeatures: {
        name: string
        description: string
        pricingModel: 'quote' | 'fixed' | 'usage'
      }[]
    }
    comparisonMatrix: {
      feature: string
      category: string
      starter: boolean | string | number
      professional: boolean | string | number
      enterprise: boolean | string | number
      description: string
    }[]
    calculator: {
      estimatedMonthlySavings: {
        min: number
        max: number
        basis: string
      }
      roi: {
        paybackPeriod: string
        annualReturn: string
        fiveYearValue: number
      }
      costJustification: string[]
    }
    specialOffers: {
      name: string
      description: string
      discount: number | string
      validUntil: string
      conditions: string[]
      applicableTiers: string[]
    }[]
  }
  metadata: {
    currency: 'GBP'
    region: string
    lastUpdated: string
    nextPriceReview: string
    vatInclusive: boolean
    billingTerms: string
    cancellationPolicy: string
  }
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const url = new URL(request.url)
    const propertyCount = parseInt(url.searchParams.get('propertyCount') || '1')
    const employeeCount = parseInt(url.searchParams.get('employeeCount') || '50')
    const region = url.searchParams.get('region') || 'UK'
    const existingCustomer = url.searchParams.get('existingCustomer') === 'true'
    
    // Define the three business subscription tiers
    const businessTiers = {
      starter: {
        id: 'business_starter',
        name: 'Business Starter',
        tagline: 'Essential property optimization tools for growing businesses',
        monthlyPrice: 199,
        annualPrice: 1990, // 2 months free
        annualSavings: 398,
        features: [
          {
            category: 'Property Management',
            items: [
              { name: 'Property Assessments', included: 'Up to 3 properties', description: 'Comprehensive energy and efficiency analysis' },
              { name: 'Energy Benchmarking', included: true, description: 'Compare performance against industry standards' },
              { name: 'Basic ROI Calculations', included: '10 per month', description: 'Simple payback and savings projections' },
              { name: 'Compliance Monitoring', included: true, description: 'MEES and EPC rating tracking' }
            ]
          },
          {
            category: 'Professional Network',
            items: [
              { name: 'Verified Contractors', included: 'Basic directory access', description: 'Access to certified energy efficiency contractors' },
              { name: 'Quote Requests', included: '5 per month', description: 'Request quotes from multiple professionals' },
              { name: 'Project Management', included: 'Basic tools', description: 'Simple project tracking and timeline management' }
            ]
          },
          {
            category: 'Reporting & Analytics',
            items: [
              { name: 'Monthly Reports', included: true, description: 'Energy usage and cost analysis' },
              { name: 'Savings Tracking', included: true, description: 'Monitor actual vs projected savings' },
              { name: 'Export Data', included: 'CSV format', description: 'Download reports for external analysis' }
            ]
          },
          {
            category: 'Support',
            items: [
              { name: 'Customer Support', included: 'Email only', description: 'Business hours email support' },
              { name: 'Knowledge Base', included: true, description: 'Self-service help articles and guides' },
              { name: 'Video Training', included: 'Basic library', description: 'Getting started and feature overview videos' }
            ]
          }
        ],
        limits: {
          properties: 3,
          assessments: 12, // per year
          roiCalculations: 120, // per year
          professionalContacts: 25,
          teamMembers: 2,
          support: 'Email only',
          apiAccess: false,
          customIntegrations: false
        },
        addOns: [
          {
            id: 'additional_property',
            name: 'Additional Property Slots',
            description: 'Add more properties to your plan',
            monthlyPrice: 49,
            unit: 'per property'
          },
          {
            id: 'priority_support',
            name: 'Priority Support',
            description: 'Phone support with faster response times',
            monthlyPrice: 99
          }
        ],
        idealFor: [
          'Small businesses with 1-3 commercial properties',
          'Property owners new to energy efficiency',
          'Businesses seeking basic compliance monitoring',
          'Companies with limited sustainability budgets'
        ],
        caseStudies: [
          {
            clientType: 'Independent Retailer (2 locations)',
            challenge: 'Rising energy costs and MEES compliance concerns',
            solution: 'LED retrofit and basic energy monitoring',
            results: [
              '£8,400 annual energy savings',
              'Achieved EPC rating E for MEES compliance',
              '18-month payback period'
            ]
          }
        ]
      } as BusinessSubscriptionTier,
      
      professional: {
        id: 'business_professional',
        name: 'Business Professional',
        tagline: 'Advanced optimization and analytics for serious property portfolios',
        monthlyPrice: 499,
        annualPrice: 4990, // 2 months free
        annualSavings: 998,
        popular: true,
        features: [
          {
            category: 'Property Management',
            items: [
              { name: 'Property Assessments', included: 'Up to 15 properties', description: 'Detailed multi-property portfolio analysis' },
              { name: 'Advanced Energy Analytics', included: true, description: 'Machine learning-powered insights and predictions' },
              { name: 'Comprehensive ROI Modeling', included: 'Unlimited', description: 'Complex financial modeling with sensitivity analysis' },
              { name: 'Automated Compliance Alerts', included: true, description: 'Proactive notifications for regulatory changes' },
              { name: 'Portfolio Optimization', included: true, description: 'Cross-property efficiency strategies' }
            ]
          },
          {
            category: 'Professional Network',
            items: [
              { name: 'Premium Contractor Network', included: true, description: 'Access to top-tier energy efficiency specialists' },
              { name: 'Unlimited Quote Requests', included: true, description: 'No limits on professional quotes' },
              { name: 'Advanced Project Management', included: true, description: 'Gantt charts, resource planning, milestone tracking' },
              { name: 'Tender Management', included: true, description: 'Competitive bidding process management' }
            ]
          },
          {
            category: 'Reporting & Analytics',
            items: [
              { name: 'Real-time Dashboards', included: true, description: 'Live energy usage and performance monitoring' },
              { name: 'Custom Reports', included: true, description: 'Branded reports with custom KPIs' },
              { name: 'API Access', included: 'Standard', description: 'Integrate with existing systems' },
              { name: 'Data Export', included: 'All formats', description: 'Excel, PDF, XML, JSON export options' },
              { name: 'Benchmarking Database', included: true, description: 'Industry and regional performance comparisons' }
            ]
          },
          {
            category: 'Support',
            items: [
              { name: 'Priority Support', included: 'Phone + Email', description: '4-hour response time during business hours' },
              { name: 'Account Manager', included: true, description: 'Dedicated account management' },
              { name: 'Training Sessions', included: '2 per year', description: 'Custom training for your team' },
              { name: 'Implementation Support', included: true, description: 'Onboarding and setup assistance' }
            ]
          }
        ],
        limits: {
          properties: 15,
          assessments: 'unlimited',
          roiCalculations: 'unlimited',
          professionalContacts: 100,
          teamMembers: 8,
          support: 'Phone + Email priority',
          apiAccess: true,
          customIntegrations: false
        },
        addOns: [
          {
            id: 'additional_properties_pro',
            name: 'Additional Property Slots',
            description: 'Expand beyond 15 properties',
            monthlyPrice: 29,
            unit: 'per property'
          },
          {
            id: 'advanced_analytics',
            name: 'AI-Powered Predictive Analytics',
            description: 'Machine learning insights and forecasting',
            monthlyPrice: 199
          },
          {
            id: 'white_label',
            name: 'White Label Reporting',
            description: 'Branded reports with your company logo and colors',
            monthlyPrice: 149
          }
        ],
        idealFor: [
          'Property management companies with 5-15 properties',
          'Facilities management teams seeking advanced analytics',
          'Businesses requiring detailed ROI justification',
          'Organizations with dedicated sustainability teams'
        ],
        caseStudies: [
          {
            clientType: 'Office Portfolio Manager (12 buildings)',
            challenge: 'Optimize energy across diverse property types',
            solution: 'Comprehensive HVAC and lighting optimization',
            results: [
              '£127,000 annual savings across portfolio',
              'Average 34% energy reduction per property',
              '2.8-year payback with phased implementation'
            ]
          }
        ]
      } as BusinessSubscriptionTier,
      
      enterprise: {
        id: 'business_enterprise',
        name: 'Business Enterprise',
        tagline: 'Complete commercial property optimization platform for large organizations',
        monthlyPrice: 1499,
        annualPrice: 14990, // 2 months free
        annualSavings: 2988,
        enterprise: true,
        features: [
          {
            category: 'Property Management',
            items: [
              { name: 'Unlimited Properties', included: true, description: 'No limits on property portfolio size' },
              { name: 'AI-Powered Optimization Engine', included: true, description: 'Machine learning-driven efficiency recommendations' },
              { name: 'Advanced Financial Modeling', included: true, description: 'Monte Carlo analysis, scenario planning, risk assessment' },
              { name: 'Regulatory Compliance Suite', included: true, description: 'Automated compliance tracking across all jurisdictions' },
              { name: 'Portfolio Strategy Planning', included: true, description: 'Long-term sustainability roadmap development' },
              { name: 'Carbon Footprint Management', included: true, description: 'Scope 1, 2, and 3 emissions tracking' }
            ]
          },
          {
            category: 'Professional Network',
            items: [
              { name: 'Elite Contractor Network', included: true, description: 'Access to tier-1 contractors and consultants' },
              { name: 'Procurement Management', included: true, description: 'End-to-end procurement process management' },
              { name: 'Program Management Office', included: true, description: 'Enterprise-grade project management tools' },
              { name: 'Vendor Performance Tracking', included: true, description: 'Contractor performance analytics and ratings' },
              { name: 'Risk Management', included: true, description: 'Project risk assessment and mitigation tools' }
            ]
          },
          {
            category: 'Reporting & Analytics',
            items: [
              { name: 'Executive Dashboards', included: true, description: 'C-suite focused KPI dashboards' },
              { name: 'Advanced Analytics Suite', included: true, description: 'Predictive analytics and machine learning insights' },
              { name: 'Full API Access', included: true, description: 'Complete API access with high rate limits' },
              { name: 'Custom Integrations', included: true, description: 'Bespoke integrations with your systems' },
              { name: 'Data Warehouse', included: true, description: 'Centralized data repository with historical trends' },
              { name: 'Automated Reporting', included: true, description: 'Scheduled reports to stakeholders' }
            ]
          },
          {
            category: 'Support',
            items: [
              { name: 'Dedicated Success Team', included: true, description: '24/7 support with dedicated team' },
              { name: 'Strategic Account Management', included: true, description: 'Senior account management and quarterly business reviews' },
              { name: 'Unlimited Training', included: true, description: 'Custom training programs and workshops' },
              { name: 'Implementation Consulting', included: true, description: 'Enterprise implementation consulting' },
              { name: 'Technical Support', included: 'White-glove', description: '1-hour SLA with technical experts' }
            ]
          }
        ],
        limits: {
          properties: 'unlimited',
          assessments: 'unlimited',
          roiCalculations: 'unlimited',
          professionalContacts: 'unlimited',
          teamMembers: 'unlimited',
          support: 'Dedicated team',
          apiAccess: true,
          customIntegrations: true
        },
        addOns: [
          {
            id: 'custom_development',
            name: 'Custom Feature Development',
            description: 'Bespoke features developed for your specific needs',
            monthlyPrice: 0, // Quote-based
            unit: 'custom quote'
          },
          {
            id: 'onsite_consulting',
            name: 'On-site Consulting',
            description: 'Strategic consulting at your facilities',
            monthlyPrice: 2500,
            unit: 'per day'
          },
          {
            id: 'managed_services',
            name: 'Managed Optimization Services',
            description: 'Full-service energy management by our experts',
            monthlyPrice: 0, // Quote-based
            unit: 'custom quote'
          }
        ],
        idealFor: [
          'Large corporations with 20+ commercial properties',
          'REITs and institutional property owners',
          'Facilities management companies serving enterprise clients',
          'Organizations with complex compliance requirements',
          'Companies with aggressive sustainability targets'
        ],
        caseStudies: [
          {
            clientType: 'Fortune 500 Retail Chain (187 locations)',
            challenge: 'Standardize energy efficiency across national portfolio',
            solution: 'Enterprise-wide LED, HVAC, and solar program',
            results: [
              '£1.8M annual energy savings',
              '42% average energy reduction across portfolio',
              'Net zero operational carbon by 2028 pathway'
            ]
          }
        ]
      } as BusinessSubscriptionTier
    }
    
    // Add-on categories for customization
    const customizationOptions = {
      availableAddOns: [
        {
          category: 'Extended Capabilities',
          addOns: [
            {
              id: 'iot_monitoring',
              name: 'IoT Sensor Monitoring',
              description: 'Real-time environmental and energy monitoring with IoT sensors',
              pricing: { monthly: 299, annual: 2990 },
              minimumTier: 'professional'
            },
            {
              id: 'predictive_maintenance',
              name: 'Predictive Maintenance AI',
              description: 'AI-powered equipment failure prediction and maintenance optimization',
              pricing: { monthly: 399, annual: 3990 },
              minimumTier: 'professional'
            },
            {
              id: 'tenant_portal',
              name: 'Tenant Engagement Portal',
              description: 'Self-service portal for tenants to track their usage and efficiency',
              pricing: { monthly: 199, annual: 1990 },
              minimumTier: 'starter'
            }
          ]
        },
        {
          category: 'Professional Services',
          addOns: [
            {
              id: 'energy_audits',
              name: 'Professional Energy Audits',
              description: 'Certified energy audits conducted by accredited professionals',
              pricing: { monthly: 0, annual: 0, unit: '£850-£1,500 per property' },
              minimumTier: 'starter'
            },
            {
              id: 'implementation_management',
              name: 'Implementation Project Management',
              description: 'Full project management for efficiency upgrade implementations',
              pricing: { monthly: 0, annual: 0, unit: '8-12% of project value' },
              minimumTier: 'professional'
            },
            {
              id: 'financing_assistance',
              name: 'Green Financing Assistance',
              description: 'Support securing green loans and financing for efficiency projects',
              pricing: { monthly: 0, annual: 0, unit: '0.5-1.5% of financing amount' },
              minimumTier: 'professional'
            }
          ]
        }
      ],
      enterpriseFeatures: [
        {
          name: 'Custom Analytics Dashboard',
          description: 'Bespoke dashboard design matching your brand and KPIs',
          pricingModel: 'quote' as const
        },
        {
          name: 'ERP System Integration',
          description: 'Direct integration with SAP, Oracle, or other enterprise systems',
          pricingModel: 'quote' as const
        },
        {
          name: 'Multi-Country Portfolio Management',
          description: 'Support for international portfolios with local regulations',
          pricingModel: 'quote' as const
        },
        {
          name: 'Dedicated Cloud Infrastructure',
          description: 'Private cloud deployment for enhanced security and performance',
          pricingModel: 'quote' as const
        }
      ]
    }
    
    // Feature comparison matrix
    const comparisonMatrix = [
      {
        feature: 'Properties Included',
        category: 'Limits',
        starter: 3,
        professional: 15,
        enterprise: 'Unlimited',
        description: 'Number of commercial properties you can manage'
      },
      {
        feature: 'Energy Assessments',
        category: 'Analytics',
        starter: '12/year',
        professional: 'Unlimited',
        enterprise: 'Unlimited',
        description: 'Comprehensive property energy assessments'
      },
      {
        feature: 'ROI Calculations',
        category: 'Analytics',
        starter: '10/month',
        professional: 'Unlimited',
        enterprise: 'Unlimited',
        description: 'Financial modeling and payback analysis'
      },
      {
        feature: 'Professional Network Access',
        category: 'Network',
        starter: 'Basic',
        professional: 'Premium',
        enterprise: 'Elite',
        description: 'Access to energy efficiency contractors and consultants'
      },
      {
        feature: 'Team Members',
        category: 'Limits',
        starter: 2,
        professional: 8,
        enterprise: 'Unlimited',
        description: 'Number of team members who can access the platform'
      },
      {
        feature: 'API Access',
        category: 'Integration',
        starter: false,
        professional: 'Standard',
        enterprise: 'Full',
        description: 'Programmatic access to platform data and features'
      },
      {
        feature: 'Custom Integrations',
        category: 'Integration',
        starter: false,
        professional: false,
        enterprise: true,
        description: 'Bespoke integrations with your existing systems'
      },
      {
        feature: 'Support Level',
        category: 'Support',
        starter: 'Email',
        professional: 'Phone + Email',
        enterprise: 'Dedicated Team',
        description: 'Level of customer support provided'
      },
      {
        feature: 'Account Management',
        category: 'Support',
        starter: false,
        professional: 'Standard',
        enterprise: 'Strategic',
        description: 'Dedicated account management and success support'
      },
      {
        feature: 'Training Included',
        category: 'Support',
        starter: 'Self-service',
        professional: '2 sessions/year',
        enterprise: 'Unlimited',
        description: 'Training sessions for your team'
      }
    ]
    
    // ROI Calculator estimates
    const calculator = {
      estimatedMonthlySavings: {
        min: Math.round(propertyCount * 500), // £500 per property minimum
        max: Math.round(propertyCount * 2500), // £2,500 per property maximum
        basis: `Based on ${propertyCount} commercial ${propertyCount === 1 ? 'property' : 'properties'} with typical efficiency improvements`
      },
      roi: {
        paybackPeriod: '6-18 months',
        annualReturn: '25-45%',
        fiveYearValue: Math.round((propertyCount * 1500 * 12) * 5) // 5-year cumulative savings
      },
      costJustification: [
        `Platform pays for itself through energy savings in ${propertyCount <= 3 ? '6-12' : '4-8'} months`,
        'Avoid MEES compliance penalties up to £150,000 per property',
        'Professional contractor network saves 15-25% on project costs',
        'Automated reporting saves 10+ hours monthly on compliance administration',
        'Property value increases of 5-12% from efficiency improvements'
      ]
    }
    
    // Special offers (seasonal or promotional)
    const specialOffers = [
      {
        name: 'New Customer Incentive',
        description: 'First 3 months at 50% off for new commercial customers',
        discount: '50%',
        validUntil: '2025-03-31',
        conditions: ['New customers only', 'Annual billing required', 'Minimum 12-month commitment'],
        applicableTiers: ['starter', 'professional']
      },
      {
        name: 'Portfolio Growth Bonus',
        description: 'Free additional property slots for rapidly growing portfolios',
        discount: 'Free slots',
        validUntil: '2025-06-30',
        conditions: ['Add 5+ properties within first 6 months', 'Professional tier or higher'],
        applicableTiers: ['professional', 'enterprise']
      },
      {
        name: 'Enterprise Migration Offer',
        description: 'Free implementation and training for enterprises switching platforms',
        discount: 'Free setup',
        validUntil: '2025-12-31',
        conditions: ['Minimum 20 properties', 'Migration from competitor platform', 'Annual commitment'],
        applicableTiers: ['enterprise']
      }
    ]
    
    const response: CommercialPricingResponse = {
      success: true,
      data: {
        tiers: businessTiers,
        customization: customizationOptions,
        comparisonMatrix,
        calculator,
        specialOffers
      },
      metadata: {
        currency: 'GBP',
        region,
        lastUpdated: new Date().toISOString(),
        nextPriceReview: '2025-04-01',
        vatInclusive: false,
        billingTerms: 'Monthly or annual billing available. Annual billing includes 2 months free.',
        cancellationPolicy: '30-day notice required. No cancellation fees for monthly billing.'
      }
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Error fetching commercial pricing:', error)
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred while fetching commercial pricing information',
        details: process.env.NODE_ENV === 'development' ? { error: String(error) } : undefined
      },
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: CommercialPricingRequest = await request.json()
    
    // This endpoint could handle custom pricing calculations
    // based on specific customer requirements
    
    // For now, redirect to GET with query parameters
    const queryParams = new URLSearchParams()
    if (body.propertyCount) queryParams.set('propertyCount', body.propertyCount.toString())
    if (body.employeeCount) queryParams.set('employeeCount', body.employeeCount.toString())
    if (body.region) queryParams.set('region', body.region)
    if (body.existingCustomer) queryParams.set('existingCustomer', 'true')
    
    const getResponse = await GET(new Request(`${request.url}?${queryParams.toString()}`))
    return getResponse
    
  } catch (error) {
    console.error('Error processing pricing request:', error)
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred while processing pricing request',
        details: process.env.NODE_ENV === 'development' ? { error: String(error) } : undefined
      },
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}