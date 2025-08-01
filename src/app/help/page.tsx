import { ArrowLeft, Search, MessageCircle, FileText, Phone, Mail, Clock, CheckCircle, AlertCircle, Info } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Help Center - BuildMate',
  description: 'Get help with BuildMate. Find answers to common questions, contact support, and access guides for home building projects.',
}

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get the help you need for your home building project. Find answers, contact support, and access comprehensive guides.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for help articles, guides, or questions..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <Phone className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
            <p className="text-sm text-gray-600 mb-4">Speak with our UK construction experts</p>
            <p className="font-medium text-green-600">0800 123 4567</p>
            <p className="text-xs text-gray-500 mt-1">Mon-Fri 9am-6pm</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <Mail className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-sm text-gray-600 mb-4">Get detailed help via email</p>
            <p className="font-medium text-blue-600">support@buildmate.co.uk</p>
            <p className="text-xs text-gray-500 mt-1">24-48 hour response</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <Clock className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600 mb-4">Chat with our support team</p>
            <button className="font-medium text-purple-600 hover:text-purple-700 transition-colors">
              Start Chat
            </button>
            <p className="text-xs text-gray-500 mt-1">Available 9am-9pm</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Getting Started */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    <Link href="#" className="hover:text-blue-600 transition-colors">
                      How to create your first project
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Step-by-step guide to setting up your home building project on BuildMate.
                  </p>
                  <span className="text-xs text-blue-600 font-medium">5 min read</span>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    <Link href="#" className="hover:text-blue-600 transition-colors">
                      Understanding UK building regulations
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Essential guide to building regulations and planning permission requirements.
                  </p>
                  <span className="text-xs text-green-600 font-medium">8 min read</span>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    <Link href="#" className="hover:text-blue-600 transition-colors">
                      Finding the right professionals
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    How to connect with verified architects, builders, and tradespeople.
                  </p>
                  <span className="text-xs text-purple-600 font-medium">6 min read</span>
                </div>
              </div>
            </div>

            {/* Popular Questions */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    How much does it cost to use BuildMate?
                  </h3>
                  <p className="text-gray-600 text-sm ml-7">
                    BuildMate offers a free plan with basic features, and paid plans starting from £29/month for advanced project management and professional connections.
                  </p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Are all professionals on BuildMate verified?
                  </h3>
                  <p className="text-gray-600 text-sm ml-7">
                    Yes, all professionals go through our verification process including insurance checks, qualification verification, and background checks.
                  </p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Can I get planning permission help?
                  </h3>
                  <p className="text-gray-600 text-sm ml-7">
                    Our platform connects you with planning consultants and architects who can help with planning applications and building regulations.
                  </p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    How do I get quotes from multiple professionals?
                  </h3>
                  <p className="text-gray-600 text-sm ml-7">
                    Simply post your project requirements and multiple verified professionals will provide detailed quotes within 24-48 hours.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    What if I'm not happy with a professional's work?
                  </h3>
                  <p className="text-gray-600 text-sm ml-7">
                    We offer dispute resolution support and all work is covered by our BuildMate guarantee for added peace of mind.
                  </p>
                </div>
              </div>
            </div>

            {/* Troubleshooting */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Troubleshooting</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Can't access your account?</h3>
                    <p className="text-sm text-gray-600">Try resetting your password or contact our support team for assistance.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Project images not uploading?</h3>
                    <p className="text-sm text-gray-600">Ensure images are under 10MB and in JPG, PNG, or WebP format.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Not receiving notifications?</h3>
                    <p className="text-sm text-gray-600">Check your email settings and spam folder, or update your notification preferences.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-blue-600 text-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Need More Help?</h3>
              <p className="text-blue-100 mb-4 text-sm">
                Our UK-based support team is here to help with your construction project questions.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>0800 123 4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>support@buildmate.co.uk</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Mon-Fri 9am-6pm GMT</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/uk-building-regs" className="text-blue-600 hover:text-blue-700 transition-colors">
                    UK Building Regulations Guide
                  </Link>
                </li>
                <li>
                  <Link href="/professionals" className="text-blue-600 hover:text-blue-700 transition-colors">
                    Find Professionals
                  </Link>
                </li>
                <li>
                  <Link href="/materials" className="text-blue-600 hover:text-blue-700 transition-colors">
                    Materials Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-blue-600 hover:text-blue-700 transition-colors">
                    Pricing Plans
                  </Link>
                </li>
                <li>
                  <Link href="/api-docs" className="text-blue-600 hover:text-blue-700 transition-colors">
                    API Documentation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">All systems operational</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">API services running</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Professional matching active</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Last updated: 2 minutes ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}