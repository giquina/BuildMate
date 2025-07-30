import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export const metadata = {
  title: 'BuildMate AI Pricing | UK Construction Platform Plans',
  description: 'Choose the perfect BuildMate AI plan for your UK construction project. From free basic access to professional enterprise solutions.',
}

export const dynamic = 'force-static'

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "£0",
      period: "forever",
      description: "Perfect for exploring BuildMate AI and small DIY projects",
      features: [
        "Basic project configuration",
        "1 AI-generated floor plan",
        "Basic material estimates", 
        "Community support",
        "UK building regulations check",
        "Basic regional pricing"
      ],
      limitations: [
        "Limited to 1 active project",
        "Basic material recommendations",
        "No professional matching"
      ],
      buttonText: "Get Started Free",
      buttonStyle: "outline",
      popular: false
    },
    {
      name: "Professional",
      price: "£29",
      period: "per month",
      description: "Ideal for homeowners and self-builders managing construction projects",
      features: [
        "Unlimited project configurations",
        "Unlimited AI floor plan generation",
        "Advanced material recommendations",
        "Professional matching system",
        "CSCS-verified professional network",
        "Regional cost intelligence",
        "Timeline optimization",
        "Email support",
        "Project progress tracking",
        "Cost monitoring dashboard",
        "Material supplier comparisons"
      ],
      limitations: [],
      buttonText: "Start Professional",
      buttonStyle: "primary",
      popular: true,
      savings: "Save £200+ per project"
    },
    {
      name: "Enterprise",
      price: "£99",
      period: "per month",
      description: "Comprehensive solution for property developers and construction businesses",
      features: [
        "Everything in Professional",
        "Multi-project management",
        "Team collaboration tools",
        "API access for integrations",
        "Custom AI model training",
        "Priority professional matching",
        "Dedicated account manager",
        "Phone support",
        "Advanced analytics",
        "Custom reporting",
        "White-label options",
        "Bulk material pricing",
        "Project portfolio management"
      ],
      limitations: [],
      buttonText: "Contact Sales",
      buttonStyle: "primary",
      popular: false,
      savings: "Save £1,000+ per month"
    }
  ]

  const addOns = [
    {
      name: "Express Professional Matching",
      price: "£15",
      description: "Get matched with available professionals within 24 hours",
      icon: "⚡"
    },
    {
      name: "Advanced AI Consultation",
      price: "£49",
      description: "1-hour video consultation with AI-powered project analysis",
      icon: "🤖"
    },
    {
      name: "3D Visualization Package",
      price: "£79",
      description: "Professional 3D renders and virtual walkthroughs",
      icon: "🏠"
    },
    {
      name: "Building Regulations Support",
      price: "£125",
      description: "Expert guidance through UK building regulations process",
      icon: "📋"
    }
  ]

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences."
    },
    {
      question: "Are professionals really verified?",
      answer: "Absolutely. All professionals in our network are verified with current CSCS cards, Gas Safe registration (where applicable), insurance coverage, and performance ratings."
    },
    {
      question: "What regions do you cover?",
      answer: "We cover all of England, Scotland, Wales, and Northern Ireland with region-specific building standards, cost intelligence, and professional networks."
    },
    {
      question: "How accurate are the cost estimates?",
      answer: "Our AI cost estimates are typically within ±10% of final project costs, based on current UK market rates and regional variations."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll provide a full refund."
    },
    {
      question: "Can I use this for commercial projects?",
      answer: "Yes, our Professional and Enterprise plans support both residential and commercial construction projects across the UK."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="mr-2">💷</span>
            Transparent UK Construction Pricing
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Choose Your
            <span className="block text-blue-700">Construction Plan</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            From free exploration to enterprise solutions, BuildMate AI offers pricing that scales with your UK construction needs. 
            Start free and upgrade as your projects grow.
          </p>

          <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full text-lg font-semibold">
            <span className="mr-2">✅</span>
            30-day money-back guarantee on all paid plans
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative p-8 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl md:text-5xl font-bold text-blue-700">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/ {plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                  {plan.savings && (
                    <div className="mt-4 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                      {plan.savings}
                    </div>
                  )}
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
                      <h4 className="font-bold text-gray-900 mb-4">Limitations:</h4>
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
                      href={plan.name === 'Free' ? '/configure' : '/configure'}
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

      {/* Add-ons Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Optional Add-ons
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enhance your BuildMate AI experience with specialized services tailored to UK construction needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <Card key={index} className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group text-center">
                <div className="text-3xl mb-4">{addon.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {addon.name}
                </h3>
                <div className="text-2xl font-bold text-blue-700 mb-4">{addon.price}</div>
                <p className="text-gray-600 text-sm">{addon.description}</p>
              </Card>
            ))}
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
              Get answers to common questions about BuildMate AI pricing and features.
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
              Start Building Smarter Today
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of UK construction professionals who trust BuildMate AI for their projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/configure"
                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start Free Trial
              </Link>
              <Link
                href="/how-it-works"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-700 transition-all duration-200"
              >
                Learn How It Works
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}