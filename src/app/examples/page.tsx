import Link from 'next/link'
import { Card } from '@/components/ui/Card'

export const metadata = {
  title: 'BuildMate AI Examples | UK Construction Projects',
  description: 'Explore real UK construction examples and success stories powered by BuildMate AI technology.',
}

export default function ExamplesPage() {
  const examples = [
    {
      id: 1,
      title: "Victorian Terrace Extension",
      location: "Birmingham, West Midlands",
      type: "Single-storey rear extension",
      size: "25m²",
      cost: "£45,000",
      timeline: "16 weeks",
      description: "Modern open-plan kitchen extension to a 1900s terrace house with building regulations compliance and party wall agreements.",
      features: ["Bi-fold doors to garden", "Underfloor heating", "Roof lights", "Building regs approved"],
      image: "🏠"
    },
    {
      id: 2,
      title: "New Build Eco Home",
      location: "Cotswolds, Gloucestershire", 
      type: "New build detached house",
      size: "180m²",
      cost: "£320,000",
      timeline: "26 weeks",
      description: "Energy-efficient 4-bedroom family home meeting current building regulations with renewable energy systems.",
      features: ["Air source heat pump", "Solar panels", "Triple glazing", "EPC Rating A"],
      image: "🏡"
    },
    {
      id: 3,
      title: "Loft Conversion",
      location: "London, Islington",
      type: "Full loft conversion",
      size: "35m²",
      cost: "£65,000",
      timeline: "12 weeks",
      description: "Two-bedroom loft conversion with dormer windows and ensuite bathroom, including planning permission.",
      features: ["Dormer windows", "Ensuite bathroom", "Built-in storage", "Planning approved"],
      image: "🏘️"
    },
    {
      id: 4,
      title: "Barn Conversion",
      location: "Yorkshire Dales",
      type: "Heritage barn conversion",
      size: "220m²", 
      cost: "£280,000",
      timeline: "32 weeks",
      description: "Historic stone barn converted to luxury family home with conservation area planning approval.",
      features: ["Stone restoration", "Timber frame", "Heritage compliance", "Conservation area"],
      image: "🏚️"
    },
    {
      id: 5,
      title: "Modern Kitchen Extension",
      location: "Edinburgh, Scotland",
      type: "Side return extension",
      size: "30m²",
      cost: "£38,000",
      timeline: "14 weeks",
      description: "Contemporary side return extension to Georgian townhouse with Scottish building standards compliance.",
      features: ["Steel frame", "Large roof light", "Polished concrete", "Scottish standards"],
      image: "🏢"
    },
    {
      id: 6,
      title: "Garden Room Office",
      location: "Surrey, South East",
      type: "Detached garden office",
      size: "20m²",
      cost: "£28,000",
      timeline: "8 weeks",
      description: "Modern insulated garden office under permitted development rights with power and heating.",
      features: ["Permitted development", "Insulation", "Power supply", "Modern design"],
      image: "🏗️"
    }
  ]

  const stats = [
    { label: "Projects Completed", value: "2,450+" },
    { label: "Average Savings", value: "£8,500" },
    { label: "Customer Satisfaction", value: "97%" },
    { label: "On-Time Delivery", value: "94%" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="mr-2">🏗️</span>
            Real UK Construction Projects
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Construction Examples
            <span className="block text-blue-700">That Inspire</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore real UK construction projects delivered with BuildMate AI technology. 
            See how our platform helps achieve better outcomes, reduce costs, and streamline timelines.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <div className="text-2xl md:text-3xl font-bold text-blue-700 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {examples.map((example) => (
              <Card key={example.id} className="overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="p-6">
                  <div className="text-4xl mb-4 text-center">{example.image}</div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {example.title}
                  </h3>
                  
                  <div className="text-blue-600 font-semibold mb-2">{example.location}</div>
                  
                  <div className="text-gray-600 mb-4">{example.description}</div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <div className="font-semibold text-gray-900">Size</div>
                      <div className="text-gray-600">{example.size}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Cost</div>
                      <div className="text-gray-600">{example.cost}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Timeline</div>
                      <div className="text-gray-600">{example.timeline}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {example.features.map((feature, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
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
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of UK homeowners who've successfully completed their construction projects with BuildMate AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/configure"
                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start Your Project
              </Link>
              <Link
                href="/case-studies"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-700 transition-all duration-200"
              >
                View Case Studies
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}