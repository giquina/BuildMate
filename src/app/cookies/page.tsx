import { ArrowLeft, Cookie, Shield, Settings, Eye, FileText, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Cookie Policy - BuildMate',
  description: 'Learn about how BuildMate uses cookies to improve your experience and protect your privacy.',
}

export default function CookiesPage() {
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
            <Cookie className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn how BuildMate uses cookies to enhance your experience, protect your privacy, and improve our construction platform services.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: January 2024
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Cookie className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">What Are Cookies</h3>
            <p className="text-sm text-gray-600">Understanding cookies</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Eye className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Types We Use</h3>
            <p className="text-sm text-gray-600">Essential and optional cookies</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Settings className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Your Choices</h3>
            <p className="text-sm text-gray-600">Control cookie preferences</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Shield className="h-8 w-8 text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Privacy Protection</h3>
            <p className="text-sm text-gray-600">How we protect your data</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What Are Cookies */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What Are Cookies?</h2>
              
              <div className="space-y-6">
                <div>
                  <p className="text-gray-600 mb-4">
                    Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and enabling essential functionality.
                  </p>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-blue-900">UK GDPR Compliance</p>
                        <p className="mt-1 text-blue-800 text-sm">
                          We comply with UK GDPR and only use cookies that are necessary for our service or that you have explicitly consented to.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">How Cookies Work</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start">
                      <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Cookies are created when you visit our website for the first time
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      They store small amounts of information about your preferences and actions
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      When you return, cookies help us provide a personalized experience
                    </li>
                    <li className="flex items-start">
                      <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      You can control which cookies you accept through your browser settings
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Types of Cookies */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>
              
              <div className="space-y-8">
                {/* Essential Cookies */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="h-5 w-5 text-green-600 mr-2" />
                    Essential Cookies (Always Active)
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to actions you take.
                  </p>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">Authentication Cookies</h4>
                          <p className="text-gray-600">Keep you logged in to your BuildMate account</p>
                        </div>
                        <span className="text-green-600 font-medium">Required</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">Security Cookies</h4>
                          <p className="text-gray-600">Protect against fraud and maintain site security</p>
                        </div>
                        <span className="text-green-600 font-medium">Required</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">Preference Cookies</h4>
                          <p className="text-gray-600">Remember your cookie choices and settings</p>
                        </div>
                        <span className="text-green-600 font-medium">Required</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Cookies */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Eye className="h-5 w-5 text-blue-600 mr-2" />
                    Performance Cookies (Optional)
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    These cookies help us understand how visitors interact with our website by collecting anonymous information.
                  </p>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">Analytics Cookies (Plausible)</h4>
                          <p className="text-gray-600">Privacy-friendly analytics without personal data tracking</p>
                        </div>
                        <span className="text-blue-600 font-medium">Optional</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">Performance Monitoring</h4>
                          <p className="text-gray-600">Monitor site performance and loading times</p>
                        </div>
                        <span className="text-blue-600 font-medium">Optional</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Functionality Cookies */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Settings className="h-5 w-5 text-purple-600 mr-2" />
                    Functionality Cookies (Optional)
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    These cookies enable enhanced functionality and personalization features.
                  </p>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">Project Preferences</h4>
                          <p className="text-gray-600">Remember your project types and location preferences</p>
                        </div>
                        <span className="text-purple-600 font-medium">Optional</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">Professional Matching</h4>
                          <p className="text-gray-600">Improve professional recommendations based on your needs</p>
                        </div>
                        <span className="text-purple-600 font-medium">Optional</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Managing Cookies */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Managing Your Cookie Preferences</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Cookie Banner</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    When you first visit BuildMate, you'll see a cookie banner where you can choose which types of cookies to accept. You can change these preferences at any time.
                  </p>
                  
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Manage Cookie Preferences
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Browser Settings</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    You can also control cookies through your browser settings. Here's how to manage cookies in popular browsers:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Chrome</h4>
                      <p className="text-sm text-gray-600">Settings → Privacy and Security → Cookies</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Firefox</h4>
                      <p className="text-sm text-gray-600">Settings → Privacy & Security → Cookies</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Safari</h4>
                      <p className="text-sm text-gray-600">Preferences → Privacy → Cookies</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Edge</h4>
                      <p className="text-sm text-gray-600">Settings → Privacy → Cookies</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <Eye className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-yellow-900 mb-1">Important Note</h4>
                      <p className="text-yellow-800 text-sm">
                        Disabling essential cookies may prevent certain features of BuildMate from working properly, such as staying logged in or maintaining your project data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Third-Party Services */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Third-Party Services</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Analytics</h3>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Plausible Analytics</h4>
                    <p className="text-gray-600 text-sm mb-2">
                      We use Plausible Analytics, a privacy-friendly analytics service that doesn't track personal information or use invasive cookies.
                    </p>
                    <a 
                      href="https://plausible.io/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm transition-colors"
                    >
                      Learn more about Plausible's privacy policy →
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Construction Suppliers</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    When you access our materials marketplace, you may be directed to partner supplier websites that have their own cookie policies.
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-gray-400 rounded-full mr-3"></div>
                      <span className="text-gray-600">Travis Perkins - External site with own cookie policy</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-gray-400 rounded-full mr-3"></div>
                      <span className="text-gray-600">Wickes - External site with own cookie policy</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-gray-400 rounded-full mr-3"></div>
                      <span className="text-gray-600">B&Q - External site with own cookie policy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-blue-600 text-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Cookie Preferences</h3>
              <p className="text-blue-100 mb-4 text-sm">
                Manage your cookie settings and privacy preferences.
              </p>
              <div className="space-y-3">
                <button className="w-full bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                  Manage Preferences
                </button>
                <button className="w-full bg-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors text-sm">
                  Accept All Cookies
                </button>
              </div>
            </div>

            {/* Related Pages */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Information</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-700 transition-colors flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-blue-600 hover:text-blue-700 transition-colors flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-blue-600 hover:text-blue-700 transition-colors flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Help Center
                  </Link>
                </li>
                <li>
                  <a href="mailto:privacy@buildmate.co.uk" className="text-blue-600 hover:text-blue-700 transition-colors flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Contact Privacy Team
                  </a>
                </li>
              </ul>
            </div>

            {/* Cookie Types Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cookie Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Essential</span>
                  <span className="flex items-center">
                    <div className="h-2 w-2 bg-green-400 rounded-full mr-2"></div>
                    Always Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Analytics</span>
                  <span className="flex items-center">
                    <div className="h-2 w-2 bg-blue-400 rounded-full mr-2"></div>
                    Optional
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Functionality</span>
                  <span className="flex items-center">
                    <div className="h-2 w-2 bg-purple-400 rounded-full mr-2"></div>
                    Optional
                  </span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions?</h3>
              <p className="text-gray-600 text-sm mb-4">
                If you have questions about our cookie policy, please contact us.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">privacy@buildmate.co.uk</span>
                </div>
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-600">0800 123 4567</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}