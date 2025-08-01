import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, FileText, Building, Users, Shield } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'UK Building Regulations Guide - BuildMate',
  description: 'Complete guide to UK building regulations, planning permission, and compliance requirements for construction projects.',
}

export default function UKBuildingRegsPage() {
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
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">UK Building Regulations Guide</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your complete guide to navigating UK building regulations, planning permission, and compliance requirements for construction projects.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Building className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Building Regulations</h3>
            <p className="text-sm text-gray-600">Safety standards and compliance</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <FileText className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Planning Permission</h3>
            <p className="text-sm text-gray-600">When and how to apply</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Users className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Professional Help</h3>
            <p className="text-sm text-gray-600">When to hire experts</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Shield className="h-8 w-8 text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Compliance</h3>
            <p className="text-sm text-gray-600">Meeting all requirements</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Building Regulations */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Building Regulations</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">What Are Building Regulations?</h3>
                  <p className="text-gray-600 mb-4">
                    Building regulations are legal requirements that ensure construction work meets safety, health, and energy efficiency standards. They apply to most building work in England and Wales.
                  </p>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-blue-900">Key Areas Covered:</p>
                        <ul className="mt-2 text-blue-800 text-sm space-y-1">
                          <li>• Structural safety and stability</li>
                          <li>• Fire safety and means of escape</li>
                          <li>• Energy efficiency and insulation</li>
                          <li>• Ventilation and drainage</li>
                          <li>• Electrical safety</li>
                          <li>• Access and facilities for disabled people</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">When Do You Need Building Regulations Approval?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Always Required:</p>
                        <ul className="mt-1 text-gray-600 text-sm space-y-1">
                          <li>• New buildings and extensions</li>
                          <li>• Loft conversions</li>
                          <li>• Structural alterations</li>
                          <li>• Installing new heating systems</li>
                          <li>• New electrical installations</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Sometimes Required:</p>
                        <ul className="mt-1 text-gray-600 text-sm space-y-1">
                          <li>• Replacement windows and doors</li>
                          <li>• Minor electrical work</li>
                          <li>• Small extensions under permitted development</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Planning Permission */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Planning Permission</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Permitted Development Rights</h3>
                  <p className="text-gray-600 mb-4">
                    Many home improvements fall under "permitted development" and don't need planning permission, but they still need building regulations approval.
                  </p>
                  
                  <div className="bg-green-50 border-l-4 border-green-500 p-4">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-green-900">Usually Permitted Development:</p>
                        <ul className="mt-2 text-green-800 text-sm space-y-1">
                          <li>• Single-story rear extensions up to 6m (detached) or 3m (other houses)</li>
                          <li>• Two-story rear extensions up to 6m (detached) or 3m (other houses)</li>
                          <li>• Loft conversions (within limits)</li>
                          <li>• Converting garages</li>
                          <li>• Adding conservatories</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">When You Need Planning Permission</h3>
                  <div className="bg-red-50 border-l-4 border-red-500 p-4">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-red-900">Planning Permission Required:</p>
                        <ul className="mt-2 text-red-800 text-sm space-y-1">
                          <li>• Extensions exceeding permitted development limits</li>
                          <li>• Front extensions</li>
                          <li>• Building in conservation areas</li>
                          <li>• Listed building alterations</li>
                          <li>• Change of use (e.g., residential to commercial)</li>
                          <li>• New separate dwellings</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Process */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Process</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Building Regulations Application</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Full Plans Application</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Detailed drawings required</li>
                        <li>• 5-8 week approval time</li>
                        <li>• More expensive but safer</li>
                        <li>• Best for complex projects</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Building Notice</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Minimal drawings needed</li>
                        <li>• Can start work in 2 days</li>
                        <li>• Less expensive upfront</li>
                        <li>• Risk of costly changes</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Typical Costs</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Building Regs Fee</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Planning Permission</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 text-sm">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Single-story extension</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">£400 - £800</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">Often not required</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Two-story extension</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">£600 - £1,200</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">£462 (if required)</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Loft conversion</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">£300 - £600</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">Usually not required</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <div className="bg-blue-600 text-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Need Professional Help?</h3>
              <p className="text-blue-100 mb-4 text-sm">
                BuildMate connects you with qualified architects, structural engineers, and planning consultants.
              </p>
              <Link 
                href="/professionals" 
                className="inline-flex items-center bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Find Professionals
                <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
              </Link>
            </div>

            {/* Useful Links */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Useful Resources</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="https://www.planningportal.co.uk/" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-700 transition-colors">
                    Planning Portal (Official UK Site)
                  </a>
                </li>
                <li>
                  <a href="https://www.labc.co.uk/" target="_blank" rel="noopener noreferrer"
                     className="text-blue-600 hover:text-blue-700 transition-colors">
                    Local Authority Building Control
                  </a>
                </li>
                <li>
                  <a href="https://www.gov.uk/building-regulations-approval" target="_blank" rel="noopener noreferrer"
                     className="text-blue-600 hover:text-blue-700 transition-colors">
                    Gov.uk Building Regulations
                  </a>
                </li>
                <li>
                  <Link href="/help" className="text-blue-600 hover:text-blue-700 transition-colors">
                    BuildMate Help Center
                  </Link>
                </li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-900 mb-1">Important Disclaimer</h4>
                  <p className="text-yellow-800 text-sm">
                    This guide provides general information only. Always consult with your local planning authority and qualified professionals for specific projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}