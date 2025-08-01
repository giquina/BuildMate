import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service - BuildMate AI',
  description: 'Terms of service for BuildMate AI construction platform.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last Updated: August 1, 2025</p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">🏗️ Welcome to BuildMate AI</h2>
            <p className="text-gray-700 mb-6">
              These terms of service govern your use of BuildMate AI, the UK's leading construction platform 
              for homeowners, self-builders, and property developers.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">📝 Acceptance of Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing or using BuildMate AI, you agree to be bound by these Terms of Service and our 
              Privacy Policy. If you don't agree to these terms, please don't use our platform.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">🇬🇧 UK Construction Focus</h2>
            <p className="text-gray-700 mb-4">BuildMate AI is specifically designed for the UK construction market:</p>
            <ul className="text-gray-700 space-y-2 mb-6">
              <li><strong>Building Regulations:</strong> All designs comply with current UK building regulations</li>
              <li><strong>Planning Permission:</strong> Guidance provided for UK planning requirements</li>
              <li><strong>Professional Network:</strong> Access to RIBA-certified architects and FMB builders</li>
              <li><strong>Pricing:</strong> All costs displayed in GBP with UK market rates</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">🔧 Platform Services</h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">What We Provide</h3>
            <ul className="text-gray-700 space-y-2 mb-6">
              <li>✅ AI-powered floorplan generation</li>
              <li>✅ 3D visualization and rendering</li>
              <li>✅ Materials sourcing and pricing</li>
              <li>✅ Professional builder matching</li>
              <li>✅ Project management tools</li>
              <li>✅ UK building regulation guidance</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Limitations</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 font-semibold mb-2">Important Notice:</p>
              <ul className="text-yellow-700 space-y-1">
                <li>⚠️ BuildMate AI provides guidance, not professional architectural services</li>
                <li>⚠️ Always consult qualified professionals for structural work</li>
                <li>⚠️ Planning permission requirements vary by location</li>
                <li>⚠️ Final costs may vary from estimates provided</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">💳 Subscription Plans</h2>
            <p className="text-gray-700 mb-4">BuildMate AI offers three subscription tiers:</p>
            <ul className="text-gray-700 space-y-2 mb-6">
              <li><strong>Free:</strong> Basic floorplan generation (1 project)</li>
              <li><strong>Pro (£29/month):</strong> Advanced features, unlimited projects</li>
              <li><strong>Enterprise (£99/month):</strong> Full platform access, priority support</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">👤 User Responsibilities</h2>
            <p className="text-gray-700 mb-4">As a BuildMate AI user, you agree to:</p>
            <ul className="text-gray-700 space-y-2 mb-6">
              <li>✓ Provide accurate project information</li>
              <li>✓ Comply with UK building regulations</li>
              <li>✓ Obtain necessary planning permissions</li>
              <li>✓ Work with qualified professionals for structural work</li>
              <li>✓ Use the platform for legitimate construction projects only</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">🚫 Prohibited Uses</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 font-semibold mb-2">You may NOT use BuildMate AI for:</p>
              <ul className="text-red-700 space-y-1">
                <li>❌ Commercial resale of generated content</li>
                <li>❌ Creating competing construction platforms</li>
                <li>❌ Violating UK building regulations</li>
                <li>❌ Bypassing planning permission requirements</li>
                <li>❌ Any illegal construction activities</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">📱 Intellectual Property</h2>
            <p className="text-gray-700 mb-6">
              You retain ownership of your project data and designs created using BuildMate AI. 
              We retain ownership of our platform, algorithms, and software. Generated content 
              may be used for your construction projects but not for commercial redistribution.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">⚖️ Limitation of Liability</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 font-semibold mb-2">Important Legal Notice:</p>
              <p className="text-blue-700">
                BuildMate AI provides tools and guidance but is not responsible for construction 
                outcomes, structural integrity, building regulation compliance, or project costs. 
                Always consult qualified professionals for construction work.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">🔄 Changes to Terms</h2>
            <p className="text-gray-700 mb-6">
              We may update these terms periodically. We'll notify users of significant changes 
              via email or platform notification. Continued use after changes constitutes acceptance.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">📞 Contact & Support</h2>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-gray-700 mb-2">Questions about these terms?</p>
              <p className="text-gray-700">
                <strong>Email:</strong> <a href="mailto:legal@buildmate-ai.com" className="text-blue-600 hover:text-blue-700">legal@buildmate-ai.com</a><br/>
                <strong>Support:</strong> <a href="mailto:support@buildmate-ai.com" className="text-blue-600 hover:text-blue-700">support@buildmate-ai.com</a><br/>
                <strong>Response Time:</strong> We aim to respond within 48 hours
              </p>
            </div>

            <div className="mt-8 p-4 bg-green-50 border-l-4 border-green-500">
              <p className="text-green-800 font-medium">
                <strong>Summary:</strong> Use BuildMate AI responsibly for UK construction projects. 
                Follow building regulations, consult professionals, and respect intellectual property. 
                We're here to help you build better.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}