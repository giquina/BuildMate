import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CheckCircle, ArrowLeft, Building2, Users, BarChart3, Phone, Crown, Shield, Zap, Award } from 'lucide-react'

export const metadata = {
  title: 'Commercial Pricing | BuildMate AI Property Investment Plans',
  description: 'Professional property investment optimization plans for UK commercial real estate. From single properties to portfolio management.',
}

export const dynamic = 'force-static'

export default function CommercialPricingPage() {
  const businessPlans = [
    {
      name: "Business Starter",
      price: "£199",
      period: "per month",
      description: "Perfect for single property owners and small businesses getting started with optimization",
      features: [
        "Up to 3 commercial properties",
        "Basic energy assessments",
        "Standard optimization recommendations", 
        "Access to commercial specialists network",
        "ROI calculator and basic analytics",
        "Email support (48hr response)",
        "Quarterly energy reports",
        "Basic compliance monitoring",
        "Standard supplier network access"
      ],
      limitations: [
        "Limited to 3 properties",
        "Basic-level recommendations only",
        "No dedicated account manager"
      ],
      buttonText: "Start Business Plan",
      buttonStyle: "outline",
      popular: false,
      bestFor: "Small businesses, single properties",
      badge: "STARTER"
    },
    {
      name: "Business Professional",
      price: "£499",
      period: "per month",
      description: "Comprehensive solution for growing businesses with multiple properties and advanced needs",
      features: [
        "Up to 15 commercial properties",
        "Advanced energy assessments with site visits",
        "Detailed optimization recommendations",
        "Priority access to commercial specialists",
        "Advanced ROI modeling and analytics",
        "Phone + email support (24hr response)",
        "Monthly detailed energy reports",
        "Full compliance management",
        "Premium supplier partnerships",
        "Project management dashboard",
        "Team collaboration tools (up to 5 users)",
        "Custom branding for client reports",
        "API access for basic integrations",
        "Quarterly business reviews"
      ],
      limitations: [],
      buttonText: "Choose Professional",
      buttonStyle: "primary",
      popular: true,
      savings: "Average ROI: 285% first year",
      bestFor: "Property portfolios, facility managers",
      badge: "MOST POPULAR"
    },
    {
      name: "Enterprise",
      price: "£1,499",
      period: "per month",
      description: "Enterprise-grade solution for large portfolios, property developers, and corporations",
      features: [
        "Unlimited commercial properties",
        "Comprehensive on-site assessments",
        "Custom optimization strategies",
        "Dedicated commercial specialists team",
        "Advanced predictive analytics & AI insights",
        "24/7 priority support + dedicated account manager",
        "Real-time energy monitoring & alerts",
        "Complete regulatory compliance management",
        "Exclusive supplier partnerships & bulk pricing",
        "Full project management & implementation",
        "Unlimited team members",
        "White-label reporting & client portals",
        "Full API access + custom integrations",
        "Monthly strategic business reviews",
        "Custom training programs",
        "Multi-site portfolio optimization",
        "Carbon footprint tracking & offsetting",
        "Regulatory change notifications & updates"
      ],
      limitations: [],
      buttonText: "Contact Sales",
      buttonStyle: "primary",
      popular: false,
      savings: "Enterprise clients save £500K+ annually",
      bestFor: "Large portfolios, corporations, developers",
      badge: "ENTERPRISE"
    }
  ]

  const addOns = [
    {
      name: "On-Site Energy Assessment",
      price: "£495",
      description: "Comprehensive professional energy audit with detailed report and recommendations",
      icon: "🔍",
      category: "analysis"
    },
    {
      name: "Priority Implementation Support",
      price: "£199",
      description: "Fast-track your projects with dedicated implementation project manager",
      icon: "⚡",
      category: "support"
    },
    {
      name: "Custom Analytics Dashboard",
      price: "£299",
      description: "Bespoke energy monitoring dashboard with your branding and KPIs",
      icon: "📊",
      category: "reporting"
    },
    {
      name: "Regulatory Compliance Package",
      price: "£395",
      description: "Complete support for EPC improvements and building regulations compliance",
      icon: "✅",
      category: "compliance"
    },
    {
      name: "Carbon Footprint Certification",
      price: "£595",
      description: "Professional carbon assessment and certification for ESG reporting",
      icon: "🌱",
      category: "analysis"
    },
    {
      name: "Multi-Site Portfolio Management",
      price: "£799",
      description: "Advanced tools for managing energy optimization across multiple properties",
      icon: "🏢",
      category: "management"
    }
  ]

  const enterpriseFeatures = [
    {
      title: "Dedicated Success Team",
      description: "Personal account manager and technical specialists",
      icon: "👥"
    },
    {
      title: "Custom Implementation",
      description: "Tailored solutions for your specific business needs",
      icon: "⚙️"
    },
    {
      title: "Advanced Analytics",
      description: "AI-powered insights and predictive maintenance",
      icon: "🔮"
    },
    {
      title: "White-Label Portal",
      description: "Branded client portals and reporting",
      icon: "🏷️"
    }
  ]

  const faqs = [
    {
      question: "What's included in the energy assessment?",
      answer: "Our energy assessments include detailed analysis of your building's systems, current energy usage patterns, efficiency opportunities, regulatory compliance status, and customized recommendations with ROI projections."
    },
    {
      question: "Do you work with all commercial property types?",
      answer: "Yes, we optimize offices, retail spaces, warehouses, manufacturing facilities, hotels, healthcare buildings, and educational facilities across the UK."
    },
    {
      question: "How quickly can I see energy savings?",
      answer: "Most businesses see immediate savings (5-15%) from operational optimizations, with major upgrades delivering 30-50% reductions within 3-6 months of implementation."
    },
    {
      question: "Are your specialists certified?",
      answer: "All our commercial specialists are certified with relevant UK qualifications including Gas Safe, NICEIC, CSCS, and industry-specific certifications for commercial systems."
    },
    {
      question: "What financing options are available?",
      answer: "We partner with leading green finance providers to offer competitive rates for energy efficiency projects, plus help you access government grants and incentive schemes."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes, you can change your plan anytime. Upgrades are immediate, and downgrades take effect at your next billing cycle."
    },
    {
      question: "Do you provide implementation services?",
      answer: "Our Professional and Enterprise plans include access to our certified specialist network for full project implementation, from planning through completion."
    },
    {
      question: "How do you ensure ROI projections are accurate?",
      answer: "Our ROI models are based on real UK commercial energy data, regional pricing, and verified results from 2,400+ completed projects across similar property types."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Link href="/commercial" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Commercial
        </Link>
      </div>

      {/* Hero Section */}
      <section className="pt-8 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Building2 className="h-4 w-4 mr-2" />
            Professional Commercial Solutions
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Property Investment Plans Built for
            <span className="block text-blue-700">Commercial Success</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            From individual properties to investment portfolios, choose the plan that matches your property optimization needs. 
            All plans include UK compliance support and verified ROI projections.
          </p>

          <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full text-lg font-semibold">
            <Shield className="h-5 w-5 mr-2" />
            30-day money-back guarantee • Cancel anytime
          </div>
        </div>
      </section>

      {/* Business Plans */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {businessPlans.map((plan, index) => (
              <Card key={index} className={`relative p-8 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center">
                      <Crown className="h-4 w-4 mr-2" />
                      {plan.badge}
                    </span>
                  </div>
                )}
                
                {!plan.popular && plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className={`px-6 py-2 rounded-full text-sm font-bold ${
                      plan.badge === 'ENTERPRISE' 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-gray-500 text-white'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl md:text-5xl font-bold text-blue-700">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/ {plan.period}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{plan.description}</p>
                  {plan.savings && (
                    <div className="mt-4 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                      {plan.savings}
                    </div>
                  )}
                  <div className="mt-4 bg-blue-50 text-blue-800 px-4 py-2 rounded-lg text-sm">
                    <strong>Best for:</strong> {plan.bestFor}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-bold text-gray-900 mb-4">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.limitations.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-bold text-gray-900 mb-4">Plan limits:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, idx) => (
                          <li key={idx} className="flex items-start text-gray-500">
                            <span className="w-5 h-5 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">−</span>
                            <span>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="text-center">
                  {plan.name === 'Enterprise' ? (
                    <Button
                      className="w-full py-4 text-lg font-bold"
                      variant={plan.buttonStyle === 'primary' ? 'primary' : 'outline'}
                    >
                      {plan.buttonText}
                    </Button>
                  ) : (
                    <Link
                      href={`/commercial/configure?plan=${plan.name.toLowerCase().replace(' ', '_')}`}
                      className={`block w-full py-4 text-lg font-bold rounded-xl transition-all duration-200 text-center ${
                        plan.buttonStyle === 'primary'
                          ? 'bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                          : 'border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white'
                      }`}
                    >
                      {plan.buttonText}
                    </Link>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Features Highlight */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-700 to-indigo-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Enterprise Solutions
            </h2>
            <p className="text-purple-100 text-xl max-w-2xl mx-auto">
              For large portfolios and corporations requiring the highest level of service and customization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {enterpriseFeatures.map((feature, index) => (
              <Card key={index} className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-white text-center">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-purple-100 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" className="text-purple-700 border-white bg-white hover:bg-purple-50 px-8 py-3">
              Schedule Enterprise Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional Add-ons
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enhance your plan with specialized services designed for commercial properties
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon, index) => (
              <Card key={index} className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group text-center">
                <div className="text-3xl mb-4">{addon.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {addon.name}
                </h3>
                <div className="text-2xl font-bold text-blue-700 mb-4">{addon.price}</div>
                <p className="text-gray-600 text-sm mb-4">{addon.description}</p>
                <Button size="sm" variant="outline" className="w-full">
                  Add to Plan
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Plan Comparison
            </h2>
            <p className="text-xl text-gray-600">
              Choose the right level of support for your commercial property optimization needs
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Feature</th>
                    <th className="px-6 py-4 text-center font-bold">Starter</th>
                    <th className="px-6 py-4 text-center font-bold">Professional</th>
                    <th className="px-6 py-4 text-center font-bold">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    ['Properties Included', '3', '15', 'Unlimited'],
                    ['Energy Assessments', 'Basic', 'Advanced + Site Visit', 'Comprehensive On-site'],
                    ['Specialist Access', 'Standard Network', 'Priority Access', 'Dedicated Team'],
                    ['Support Response', '48 hours', '24 hours', 'Same day'],
                    ['Account Management', 'Self-service', 'Quarterly Reviews', 'Dedicated Manager'],
                    ['Custom Reporting', '✗', 'Basic Branding', 'Full White-label'],
                    ['API Access', '✗', 'Basic', 'Full Access'],
                    ['Implementation Support', 'Self-managed', 'Project Dashboard', 'Full Service']
                  ].map(([feature, starter, professional, enterprise], index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 font-medium text-gray-900">{feature}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{starter}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{professional}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers about our commercial optimization plans and services
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12 bg-gradient-to-r from-blue-700 to-blue-800 text-white border-0 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Optimize Your Commercial Property?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join 2,400+ property investors reducing costs and maximizing asset value with BuildMate AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/commercial/configure"
                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start Property Analysis
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-700 transition-all duration-200 flex items-center justify-center"
              >
                <Phone className="h-5 w-5 mr-2" />
                Schedule Consultation
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}