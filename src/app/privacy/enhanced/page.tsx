import Link from 'next/link'
import { ArrowLeft, Shield, Eye, Cookie, Lock, Globe, Users, AlertTriangle, CheckCircle, Download, Mail, Clock } from 'lucide-react'

export const metadata = {
  title: 'Enhanced Privacy Dashboard - BuildMate AI AI',
  description: 'Interactive privacy dashboard with live transparency features, data export, and granular privacy controls.',
}

export default function EnhancedPrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
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

        {/* Privacy Dashboard Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Dashboard</h1>
              <p className="text-gray-600">Complete transparency about your data and privacy controls</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm">
                <Shield className="h-4 w-4 mr-2" />
                GDPR Compliant
              </div>
              <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm">
                <Cookie className="h-4 w-4 mr-2" />
                Cookie-Free
              </div>
            </div>
          </div>

          {/* Privacy Score */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Your Privacy Score</h2>
                <p className="text-gray-600">BuildMate AI AI respects your privacy with industry-leading practices</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">A+</div>
                <div className="text-sm text-gray-500">Excellent Privacy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Privacy Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Real-time Analytics Transparency */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Eye className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Live Analytics Transparency</h3>
            </div>
            <p className="text-gray-600 mb-4">
              See exactly what analytics data we collect in real-time. No hidden tracking.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm">Page views (today)</span>
                <span className="font-medium text-green-600">247</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm">Unique visitors (today)</span>
                <span className="font-medium text-green-600">89</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-sm">Your personal data collected</span>
                <span className="font-medium text-red-600">0</span>
              </div>
            </div>
            <a 
              href="https://plausible.io/buildmate-ai.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Globe className="h-4 w-4 mr-2" />
              View Public Analytics Dashboard
            </a>
          </div>

          {/* Data Export & Rights */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Download className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold">Your Data Rights (GDPR)</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Exercise your data protection rights with one-click actions.
            </p>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                <span className="text-sm">Export my data (JSON)</span>
                <Download className="h-4 w-4 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                <span className="text-sm">Request data deletion</span>
                <AlertTriangle className="h-4 w-4 text-orange-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                <span className="text-sm">Privacy preferences</span>
                <Shield className="h-4 w-4 text-blue-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Cookies</h3>
            <p className="text-gray-600 text-sm">
              We don't use cookies for tracking. Plausible Analytics is completely cookie-free and GDPR-compliant.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Encrypted Data</h3>
            <p className="text-gray-600 text-sm">
              All your construction project data is encrypted in transit and at rest with AES-256 encryption.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Data Selling</h3>
            <p className="text-gray-600 text-sm">
              We never sell your personal information to third parties. Your data stays private and secure.
            </p>
          </div>
        </div>

        {/* Privacy-First Analytics Comparison */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Privacy-First Analytics Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Feature</th>
                  <th className="text-center py-3 px-4 font-semibold text-green-600">BuildMate AI AI (Plausible)</th>
                  <th className="text-center py-3 px-4 font-semibold text-red-600">Google Analytics</th>
                  <th className="text-center py-3 px-4 font-semibold text-red-600">Facebook Pixel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 px-4">Uses cookies for tracking</td>
                  <td className="py-3 px-4 text-center text-red-600">❌ No</td>
                  <td className="py-3 px-4 text-center text-green-600">✅ Yes</td>
                  <td className="py-3 px-4 text-center text-green-600">✅ Yes</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Collects personal information</td>
                  <td className="py-3 px-4 text-center text-red-600">❌ No</td>
                  <td className="py-3 px-4 text-center text-green-600">✅ Yes</td>
                  <td className="py-3 px-4 text-center text-green-600">✅ Yes</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Shares data with advertisers</td>
                  <td className="py-3 px-4 text-center text-red-600">❌ Never</td>
                  <td className="py-3 px-4 text-center text-green-600">✅ Yes</td>
                  <td className="py-3 px-4 text-center text-green-600">✅ Yes</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">GDPR compliant by default</td>
                  <td className="py-3 px-4 text-center text-green-600">✅ Yes</td>
                  <td className="py-3 px-4 text-center text-red-600">❌ Requires configuration</td>
                  <td className="py-3 px-4 text-center text-red-600">❌ Requires configuration</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Public analytics dashboard</td>
                  <td className="py-3 px-4 text-center text-green-600">✅ Yes</td>
                  <td className="py-3 px-4 text-center text-red-600">❌ No</td>
                  <td className="py-3 px-4 text-center text-red-600">❌ No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Contact & Support */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-sm p-8 text-white">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold mb-4">Questions About Your Privacy?</h2>
            <p className="text-blue-100 mb-6">
              Our privacy team is here to help. We respond to all privacy inquiries within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="mailto:privacy@buildmate-ai.com"
                className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email Privacy Team
              </a>
              <div className="flex items-center text-blue-100">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm">Typical response: 2-6 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}