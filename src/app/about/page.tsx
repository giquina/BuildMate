import { ArrowLeft, Users, Award, Target, Heart, Building, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'About Us - BuildMate AI',
  description: 'Learn about BuildMate AI, the UK\'s leading construction platform for homeowners and professionals.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-blue-100 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
          
          <div className="text-center py-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">About BuildMate AI</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Revolutionizing the UK construction industry with smart tools, professional networking, 
              and comprehensive project management solutions.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <div className="text-center mb-8">
            <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To democratize professional construction services and make home building accessible, 
              affordable, and efficient for everyone in the UK.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Simplify Construction</h3>
              <p className="text-gray-600">
                Make complex construction processes simple and accessible for homeowners and self-builders.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect Professionals</h3>
              <p className="text-gray-600">
                Bridge the gap between homeowners and qualified UK construction professionals.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ensure Quality</h3>
              <p className="text-gray-600">
                Maintain the highest standards through smart quality checks and professional verification.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                BuildMate AI AI was founded in 2024 by a team of construction professionals, software engineers, 
                and AI researchers who experienced firsthand the challenges of the UK building industry.
              </p>
              <p>
                After witnessing countless homeowners struggle with complex planning processes, finding reliable 
                tradespeople, and managing construction costs, we decided to create a comprehensive platform 
                that addresses these pain points with cutting-edge technology.
              </p>
              <p>
                Our platform combines artificial intelligence with deep industry expertise to provide tools 
                that were previously only available to large construction firms, making them accessible to 
                individual homeowners and self-builders across the UK.
              </p>
              <p>
                Today, BuildMate AI AI serves thousands of users nationwide, from first-time builders in Scotland 
                to experienced developers in London, all united by the goal of building better homes efficiently 
                and affordably.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">By the Numbers</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-blue-600">10k+</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Projects Completed</p>
                  <p className="text-sm text-gray-600">Successful constructions across the UK</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-green-600">2k+</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Verified Professionals</p>
                  <p className="text-sm text-gray-600">RIBA architects and FMB builders</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-orange-600">£2M+</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Cost Savings</p>
                  <p className="text-sm text-gray-600">Total saved by our users</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-purple-600">98%</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Satisfaction Rate</p>
                  <p className="text-sm text-gray-600">Customer satisfaction score</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <div className="text-center mb-8">
            <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do at BuildMate AI AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Transparency</h3>
              <p className="text-sm text-gray-600">
                Clear pricing, honest communication, and transparent processes throughout your journey.
              </p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-sm text-gray-600">
                Uncompromising standards in our platform, partnerships, and customer service.
              </p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-sm text-gray-600">
                Building a supportive network of homeowners, builders, and construction professionals.
              </p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-sm text-gray-600">
                Continuously improving our AI technology to solve real construction challenges.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">
              Experienced professionals with deep UK construction and technology expertise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                👨‍💼
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">James Mitchell</h3>
              <p className="text-blue-600 font-medium mb-2">CEO & Co-Founder</p>
              <p className="text-sm text-gray-600">
                15+ years in UK construction, former project director at major London developments. 
                RIBA chartered architect.
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                👩‍💻
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dr. Sarah Chen</h3>
              <p className="text-green-600 font-medium mb-2">CTO & Co-Founder</p>
              <p className="text-sm text-gray-600">
                PhD in Machine Learning from Cambridge, former AI researcher at DeepMind. 
                Expert in construction AI applications.
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                👨‍🔧
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mark Thompson</h3>
              <p className="text-orange-600 font-medium mb-2">Head of Construction</p>
              <p className="text-sm text-gray-600">
                20+ years as site manager and construction director. FMB member, 
                specialist in UK building regulations and compliance.
              </p>
            </div>
          </div>
        </div>

        {/* Recognition Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recognition & Awards</h2>
            <p className="text-xl text-gray-600">
              Proud to be recognized by leading UK construction and technology organizations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="text-2xl mb-2">🏆</div>
              <h3 className="font-semibold text-gray-900 mb-1">ConstructionTech Awards 2024</h3>
              <p className="text-sm text-gray-600">Best AI Innovation</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="text-2xl mb-2">🌟</div>
              <h3 className="font-semibold text-gray-900 mb-1">UK PropTech Awards</h3>
              <p className="text-sm text-gray-600">Startup of the Year</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="text-2xl mb-2">🚀</div>
              <h3 className="font-semibold text-gray-900 mb-1">TechNation</h3>
              <p className="text-sm text-gray-600">Rising Star Company</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="text-2xl mb-2">✅</div>
              <h3 className="font-semibold text-gray-900 mb-1">RIBA Approved</h3>
              <p className="text-sm text-gray-600">Technology Partner</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Building?</h2>
          <p className="text-gray-600 mb-6">
            Join thousands of UK homeowners who trust BuildMate AI AI for their construction projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/configure"
              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Your Project
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 font-bold px-8 py-4 rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}