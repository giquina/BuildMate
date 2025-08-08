import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy - BuildMate AI AI',
  description: 'Learn how BuildMate AI AI protects your privacy with cookie-free analytics and transparent data practices.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Privacy Policy Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last Updated: August 1, 2025</p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">🔒 Your Privacy Matters</h2>
            <p className="text-gray-700 mb-6">
              At BuildMate AI AI, we believe your privacy is fundamental. This privacy policy explains how we collect, use, and protect your information when you use our UK construction platform.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">📊 Analytics & Data Collection</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">What We Collect</h3>
            <p className="text-gray-700 mb-4">
              We use <strong>Plausible Analytics</strong>, a privacy-friendly analytics service that helps us understand how you use our platform without compromising your privacy.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-green-800 mb-2">Plausible Analytics collects:</h4>
              <ul className="text-green-700 space-y-1">
                <li>✅ Page views and unique visitors</li>
                <li>✅ Referral sources (where you came from)</li>
                <li>✅ Device type (mobile/desktop) and browser</li>
                <li>✅ Country-level location (UK, France, etc.)</li>
                <li>✅ Pages visited and time spent</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-red-800 mb-2">Plausible Analytics does NOT collect:</h4>
              <ul className="text-red-700 space-y-1">
                <li>❌ Personal information (name, email, address)</li>
                <li>❌ Cookies or persistent identifiers</li>
                <li>❌ Cross-site or cross-device tracking</li>
                <li>❌ IP addresses (not stored)</li>
                <li>❌ Personally identifiable information</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Why We Use Analytics</h3>
            <p className="text-gray-700 mb-6">
              Understanding how you use BuildMate AI AI helps us improve the user experience for UK builders and homeowners, 
              identify valuable features, optimize performance for construction professionals on mobile devices, and make 
              data-driven decisions about new features.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">🍪 Cookies & Tracking</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 font-semibold">
                We don't use tracking cookies. Plausible Analytics is cookie-free and complies with GDPR, CCPA, and PECR without requiring cookie banners.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">🇬🇧 UK Data Protection Rights</h2>
            <p className="text-gray-700 mb-4">Under UK GDPR, you have the right to:</p>
            <ul className="text-gray-700 space-y-2 mb-6">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Rectification:</strong> Correct inaccurate personal data</li>
              <li><strong>Erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Portability:</strong> Receive your data in a structured format</li>
              <li><strong>Objection:</strong> Object to processing of your personal data</li>
            </ul>
            <p className="text-gray-700 mb-6">
              To exercise these rights, contact us at <a href="mailto:privacy@buildmate-ai.com" className="text-blue-600 hover:text-blue-700">privacy@buildmate-ai.com</a>
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">📞 Contact Us</h2>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-gray-700 mb-2">Have questions about privacy or data protection?</p>
              <p className="text-gray-700">
                <strong>Email:</strong> <a href="mailto:privacy@buildmate-ai.com" className="text-blue-600 hover:text-blue-700">privacy@buildmate-ai.com</a><br />
                <strong>Response Time:</strong> We aim to respond within 48 hours
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">✅ Privacy-First Commitment</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Our Promise:</h4>
              <ul className="text-green-700 space-y-1">
                <li>✓ We only collect data that improves your experience</li>
                <li>✓ We never sell your personal information</li>
                <li>✓ We use privacy-friendly tools wherever possible</li>
                <li>✓ We're transparent about what data we collect and why</li>
              </ul>
            </div>

            <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500">
              <p className="text-blue-800 font-medium">
                <strong>Summary:</strong> We use Plausible Analytics for privacy-friendly website insights. 
                No tracking cookies, no personal data sale, full transparency. Your construction projects are secure and private.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}