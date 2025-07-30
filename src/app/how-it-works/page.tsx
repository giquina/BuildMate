import Link from 'next/link'
import { Card } from '@/components/ui/Card'

export const metadata = {
  title: 'How BuildMate AI Works | UK Construction Platform',
  description: 'Discover how BuildMate AI streamlines UK construction projects with intelligent planning, professional matching, and cost optimization.',
}

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Configure Your Project",
      description: "Answer a few simple questions about your construction project, location, and requirements. Our AI analyzes your needs instantly.",
      features: ["3-minute configuration", "AI-powered analysis", "UK building regulations check", "Regional cost assessment"],
      icon: "⚙️"
    },
    {
      number: "02", 
      title: "Get Intelligent Recommendations",
      description: "Receive personalized recommendations for professionals, materials, and project timeline based on UK construction standards.",
      features: ["Professional matching", "Material sourcing", "Timeline optimization", "Cost predictions"],
      icon: "🧠"
    },
    {
      number: "03",
      title: "Connect with Verified Professionals",
      description: "Access our network of CSCS-certified, Gas Safe registered, and fully insured UK construction professionals.",
      features: ["CSCS verification", "Insurance validation", "Performance ratings", "Local expertise"],
      icon: "👷"
    },
    {
      number: "04",
      title: "Manage Your Project",
      description: "Track progress, manage costs, and communicate with your team through our integrated project management platform.",
      features: ["Progress tracking", "Cost monitoring", "Team communication", "Document storage"],
      icon: "📊"
    }
  ]

  const features = [
    {
      title: "AI-Powered Planning",
      description: "Advanced algorithms analyze your project requirements and provide intelligent recommendations based on thousands of UK construction projects.",
      icon: "🤖"
    },
    {
      title: "Professional Verification",
      description: "All professionals are verified with current CSCS cards, Gas Safe registration, NICEIC certification, and comprehensive insurance coverage.",
      icon: "✅"
    },
    {
      title: "UK Building Compliance",
      description: "Automatic checks against current UK building regulations, planning permissions, and regional building standards for England, Scotland, Wales, and Northern Ireland.",
      icon: "📋"
    },
    {
      title: "Regional Cost Intelligence",
      description: "Accurate cost predictions with regional variations, London premiums, and current UK market rates updated in real-time.",
      icon: "💷"
    },
    {
      title: "Material Optimization",
      description: "Smart material recommendations with supplier comparisons, bulk pricing opportunities, and delivery optimization across the UK.",
      icon: "🧱"
    },
    {
      title: "Timeline Intelligence",
      description: "Realistic project timelines accounting for UK weather patterns, material delivery schedules, and professional availability.",
      icon: "⏱️"
    }
  ]

  const benefits = [
    {
      metric: "30%",
      label: "Average Time Savings",
      description: "Reduce project planning and coordination time"
    },
    {
      metric: "15%",
      label: "Cost Optimization",
      description: "Average savings through intelligent recommendations"
    },
    {
      metric: "95%",
      label: "Professional Match Rate",
      description: "Successful professional-project matching"
    },
    {
      metric: "24/7",
      label: "Platform Availability",
      description: "Access your project dashboard anytime"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="mr-2">🚀</span>
            Intelligent Construction Technology
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            How BuildMate AI
            <span className="block text-blue-700">Transforms Construction</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover how our AI-powered platform streamlines UK construction projects from initial planning 
            to project completion, saving time, reducing costs, and ensuring quality outcomes.
          </p>

          <Link
            href="/configure"
            className="inline-flex items-center bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Your Project
            <span className="ml-2">→</span>
          </Link>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Four Simple Steps to Success
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From project configuration to completion, BuildMate AI guides you through every step of your UK construction journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="p-8 text-center bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="text-sm font-bold text-blue-600 mb-2">STEP {step.number}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-6">{step.description}</p>
                <div className="space-y-2">
                  {step.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {feature}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced Construction Intelligence
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powered by cutting-edge AI technology specifically designed for the UK construction industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Measurable Results
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See the tangible benefits that BuildMate AI delivers to UK construction projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-8 text-center bg-gradient-to-br from-blue-700 to-blue-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="text-4xl md:text-5xl font-bold mb-4 group-hover:scale-110 transition-transform">
                  {benefit.metric}
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.label}</h3>
                <p className="text-blue-100">{benefit.description}</p>
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
              Ready to Experience the Future of Construction?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of UK homeowners and professionals who are already benefiting from AI-powered construction planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/configure"
                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start Your Project Now
              </Link>
              <Link
                href="/examples"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-700 transition-all duration-200"
              >
                View Examples
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}