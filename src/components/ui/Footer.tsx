import Link from 'next/link'
import { Shield, Award, CheckCircle, Eye, TrendingUp, Home, X, Linkedin, Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-lg font-bold text-white">BuildMate AI</span>
            </div>
            <p className="text-gray-400 text-sm">
              UK's first smart home building platform. From design to completion, we connect homeowners with verified professionals and intelligent materials sourcing.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/buildmate_ai" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Twitter">
                <X className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/buildmate-ai" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com/giquina/BuildMate" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/configure" className="hover:text-white transition-colors">Smart Floorplan Generator</Link></li>
              <li><Link href="/materials" className="hover:text-white transition-colors">Materials Marketplace</Link></li>
              <li><Link href="/professionals" className="hover:text-white transition-colors">Verified Professionals</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Project Dashboard</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/testimonials" className="hover:text-white transition-colors">Customer Stories</Link></li>
              <li><Link href="/examples" className="hover:text-white transition-colors">Design Examples</Link></li>
              <li><Link href="/uk-building-regs" className="hover:text-white transition-colors">UK Building Regulations</Link></li>
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/api-docs" className="hover:text-white transition-colors">API Documentation</Link></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal & Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
              <p>© 2025 BuildMate AI. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-green-400">
                  <Shield className="h-3 w-3 mr-1" />
                  <span className="text-xs">GDPR Compliant</span>
                </div>
                <div className="flex items-center text-blue-400">
                  <Award className="h-3 w-3 mr-1" />
                  <span className="text-xs">ISO 27001</span>
                </div>
                <div className="flex items-center text-orange-400">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  <span className="text-xs">UK Registered</span>
                </div>
              </div>
            </div>
            
            {/* Privacy-first badges */}
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center bg-green-900/30 text-green-300 px-2 py-1 rounded">
                <Eye className="h-3 w-3 mr-1" />
                Cookie-free analytics
              </div>
              <a 
                href="https://plausible.io/buildmate-ai.vercel.app"
                target="_blank"
                rel="noopener noreferrer" 
                className="flex items-center bg-blue-900/30 text-blue-300 px-2 py-1 rounded hover:bg-blue-900/50 transition-colors"
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                Public Analytics
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}