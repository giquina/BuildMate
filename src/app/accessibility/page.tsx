import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Accessibility Statement - BuildMate AI',
  description: 'BuildMate AI accessibility statement and WCAG 2.1 AA compliance information.',
}

export default function AccessibilityPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Accessibility Statement</h1>
          <p className="text-gray-600 mb-8">Last Updated: August 1, 2025</p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">♿ Our Commitment to Accessibility</h2>
            <p className="text-gray-700 mb-6">
              BuildMate AI is committed to ensuring digital accessibility for people with disabilities. 
              We continually improve the user experience for everyone and apply relevant accessibility standards.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-green-800 mb-2">WCAG 2.1 AA Compliance</h3>
              <p className="text-green-700">
                Our platform conforms to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards, 
                ensuring accessibility for construction professionals with diverse needs.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">✅ Accessibility Features</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Keyboard Navigation</h3>
            <ul className="text-gray-700 space-y-2 mb-6">
              <li>✓ Full keyboard navigation support</li>
              <li>✓ Logical tab order throughout the platform</li>
              <li>✓ Visible focus indicators on all interactive elements</li>
              <li>✓ Skip navigation links for screen readers</li>
              <li>✓ Keyboard shortcuts for common actions</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Screen Reader Support</h3>
            <ul className="text-gray-700 space-y-2 mb-6">
              <li>✓ Semantic HTML structure for proper navigation</li>
              <li>✓ ARIA labels and descriptions on interactive elements</li>
              <li>✓ Alt text for all construction images and diagrams</li>
              <li>✓ Descriptive link text and button labels</li>
              <li>✓ Properly labeled form inputs and error messages</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Visual Accessibility</h3>
            <ul className="text-gray-700 space-y-2 mb-6">
              <li>✓ High contrast color ratios (4.5:1 minimum)</li>
              <li>✓ Scalable text up to 200% without horizontal scrolling</li>
              <li>✓ Color is not the only means of conveying information</li>
              <li>✓ Focus indicators with sufficient contrast</li>
              <li>✓ Responsive design for various screen sizes</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Motor Accessibility</h3>
            <ul className="text-gray-700 space-y-2 mb-6">
              <li>✓ Large touch targets (minimum 44px) for mobile users</li>
              <li>✓ Sufficient spacing between interactive elements</li>
              <li>✓ Support for reduced motion preferences</li>
              <li>✓ Timeout extensions for complex forms</li>
              <li>✓ Alternative input methods support</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">🏗️ Construction Industry Focus</h2>
            <p className="text-gray-700 mb-4">
              We recognize that construction professionals work in diverse environments and may have accessibility needs:
            </p>
            <ul className="text-gray-700 space-y-2 mb-6">
              <li><strong>On-site usage:</strong> High contrast modes for bright sunlight</li>
              <li><strong>Mobile optimization:</strong> Touch-friendly interface for tablets and phones</li>
              <li><strong>Voice control:</strong> Compatible with speech recognition software</li>
              <li><strong>Simplified navigation:</strong> Clear, logical layout for quick access</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">🔧 Assistive Technology Compatibility</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-800 mb-2">Tested with:</h4>
              <ul className="text-blue-700 space-y-1">
                <li>• JAWS (Windows screen reader)</li>
                <li>• NVDA (Windows screen reader)</li>
                <li>• VoiceOver (macOS/iOS screen reader)</li>
                <li>• Dragon NaturallySpeaking (speech recognition)</li>
                <li>• Switch navigation devices</li>
                <li>• High contrast and magnification tools</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">📱 Mobile Accessibility</h2>
            <p className="text-gray-700 mb-4">
              Construction professionals often work on mobile devices. Our mobile accessibility features include:
            </p>
            <ul className="text-gray-700 space-y-2 mb-6">
              <li>✓ Compatible with mobile screen readers</li>
              <li>✓ Touch-friendly interface with large tap targets</li>
              <li>✓ Gesture-based navigation alternatives</li>
              <li>✓ Orientation lock support</li>
              <li>✓ Reduced motion support for vestibular disorders</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">🎯 Known Limitations</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 font-semibold mb-2">Areas for Ongoing Improvement:</p>
              <ul className="text-yellow-700 space-y-1">
                <li>⚠️ Some complex 3D visualizations may have limited screen reader support</li>
                <li>⚠️ Third-party content (maps, videos) may not meet full accessibility standards</li>
                <li>⚠️ PDF documents are being updated for better accessibility</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">🔄 Continuous Improvement</h2>
            <p className="text-gray-700 mb-6">
              We regularly audit our platform for accessibility and make improvements based on user feedback 
              and evolving standards. Our development team receives ongoing accessibility training.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Recent Improvements (2025)</h3>
            <ul className="text-gray-700 space-y-2 mb-6">
              <li>✅ Enhanced keyboard navigation for dashboard</li>
              <li>✅ Improved color contrast across all components</li>
              <li>✅ Added skip navigation links</li>
              <li>✅ Enhanced ARIA labeling for complex forms</li>
              <li>✅ Mobile accessibility improvements</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">📞 Accessibility Support</h2>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-gray-700 mb-2">Need accessibility assistance or want to report an issue?</p>
              <p className="text-gray-700">
                <strong>Email:</strong> <a href="mailto:accessibility@buildmate-ai.com" className="text-blue-600 hover:text-blue-700">accessibility@buildmate-ai.com</a><br/>
                <strong>Phone:</strong> 0800 BUILD-AI (0800 284-534)<br/>
                <strong>Response Time:</strong> We aim to respond within 24 hours<br/>
                <strong>Alternative formats:</strong> We can provide content in alternative formats upon request
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">⚖️ Legal Compliance</h2>
            <p className="text-gray-700 mb-6">
              BuildMate AI strives to comply with UK accessibility legislation including the Equality Act 2010 
              and the Public Sector Bodies (Websites and Mobile Applications) Accessibility Regulations 2018.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">💡 Accessibility Tips</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-800 mb-2">To optimize your experience:</h4>
              <ul className="text-blue-700 space-y-1">
                <li>• Use the latest version of your browser and assistive technology</li>
                <li>• Enable JavaScript for full functionality</li>
                <li>• Adjust your browser's zoom and contrast settings as needed</li>
                <li>• Use keyboard shortcuts: Tab (navigate), Enter (activate), Escape (close)</li>
              </ul>
            </div>

            <div className="mt-8 p-4 bg-green-50 border-l-4 border-green-500">
              <p className="text-green-800 font-medium">
                <strong>Our Promise:</strong> Every construction professional deserves equal access to BuildMate AI. 
                We're committed to removing barriers and creating an inclusive building platform for all users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}