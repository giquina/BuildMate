import { ArrowLeft, Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Contact Us - BuildMate AI',
  description: 'Get in touch with BuildMate AI support team. UK construction platform assistance.',
}

export default function ContactPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact BuildMate AI</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get expert support for your UK construction projects. We're here to help you build better.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">General Support</p>
                    <a href="mailto:support@buildmate-ai.com" className="text-blue-600 hover:text-blue-700">
                      support@buildmate-ai.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">24-48 hour response time</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Phone Support</p>
                    <a href="tel:+448001234567" className="text-blue-600 hover:text-blue-700">
                      0800 BUILD-UK (284-585)
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9:00 AM - 6:00 PM GMT</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">UK Office</p>
                    <p className="text-gray-600">
                      BuildMate AI Ltd<br/>
                      Innovation Centre<br/>
                      London Tech Hub<br/>
                      London E14 5AB, UK
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Support Hours</p>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM GMT<br/>
                      Saturday: 10:00 AM - 4:00 PM GMT<br/>
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Specialized Support */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Specialized Support</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-blue-800">Technical Issues</p>
                  <a href="mailto:tech@buildmate-ai.com" className="text-blue-600 hover:text-blue-700 text-sm">
                    tech@buildmate-ai.com
                  </a>
                </div>
                <div>
                  <p className="font-medium text-blue-800">Partnership Inquiries</p>
                  <a href="mailto:partnerships@buildmate-ai.com" className="text-blue-600 hover:text-blue-700 text-sm">
                    partnerships@buildmate-ai.com
                  </a>
                </div>
                <div>
                  <p className="font-medium text-blue-800">Media & Press</p>
                  <a href="mailto:press@buildmate-ai.com" className="text-blue-600 hover:text-blue-700 text-sm">
                    press@buildmate-ai.com
                  </a>
                </div>
                <div>
                  <p className="font-medium text-blue-800">Accessibility</p>
                  <a href="mailto:accessibility@buildmate-ai.com" className="text-blue-600 hover:text-blue-700 text-sm">
                    accessibility@buildmate-ai.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center mb-6">
                <MessageSquare className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="0123 456 7890"
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select project type</option>
                    <option value="new-build">New Build</option>
                    <option value="extension">Extension</option>
                    <option value="renovation">Renovation</option>
                    <option value="conversion">Conversion</option>
                    <option value="commercial">Commercial</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                    placeholder="Please provide details about your construction project, specific questions, or how we can help..."
                  />
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="updates"
                    name="updates"
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="updates" className="ml-3 text-sm text-gray-600">
                    I'd like to receive updates about new BuildMate AI features and UK construction insights
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Send Message
                </button>

                <p className="text-sm text-gray-500 text-center">
                  By submitting this form, you agree to our{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-700">Privacy Policy</Link>
                  {' '}and{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-700">Terms of Service</Link>.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How quickly will I get a response?</h3>
                <p className="text-gray-600 text-sm">
                  We aim to respond to all inquiries within 24-48 hours during business hours. 
                  Technical issues are prioritized and typically resolved within 24 hours.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Do you provide phone support?</h3>
                <p className="text-gray-600 text-sm">
                  Yes! Call 0800 BUILD-UK for immediate assistance Monday-Friday 9 AM - 6 PM GMT. 
                  Weekend support available Saturday 10 AM - 4 PM GMT.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can you help with specific building regulations?</h3>
                <p className="text-gray-600 text-sm">
                  Our team includes UK construction experts who can provide guidance on building regulations, 
                  planning permission, and professional requirements for your area.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Is there emergency support available?</h3>
                <p className="text-gray-600 text-sm">
                  For critical issues affecting active construction projects, email tech@buildmate-ai.com 
                  with "URGENT" in the subject line for expedited response.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}