import { ArrowLeft, Code, Key, Database, Zap, Shield, GitBranch, Copy } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'API Documentation - BuildMate',
  description: 'Complete API documentation for BuildMate. Learn how to integrate with our construction platform APIs.',
}

export default function ApiDocsPage() {
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
            <Code className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">API Documentation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Integrate with BuildMate's construction platform APIs. Access professional networks, material suppliers, and project management tools.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Key className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Authentication</h3>
            <p className="text-sm text-gray-600">API keys and OAuth setup</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Database className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Endpoints</h3>
            <p className="text-sm text-gray-600">Available API endpoints</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Zap className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Webhooks</h3>
            <p className="text-sm text-gray-600">Real-time notifications</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Shield className="h-8 w-8 text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Rate Limits</h3>
            <p className="text-sm text-gray-600">Usage limits and quotas</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Getting Started */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Base URL</h3>
                  <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
                    https://api.buildmate.co.uk/v1
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Authentication</h3>
                  <p className="text-gray-600 mb-4">
                    All API requests require authentication using an API key. Include your API key in the Authorization header:
                  </p>
                  <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">cURL Example</span>
                      <button className="text-gray-400 hover:text-white">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                    <code>
{`curl -H "Authorization: Bearer your-api-key" \\
     -H "Content-Type: application/json" \\
     https://api.buildmate.co.uk/v1/projects`}
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Response Format</h3>
                  <p className="text-gray-600 mb-4">
                    All API responses are returned in JSON format with consistent structure:
                  </p>
                  <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    // Response data
  },
  "meta": {
    "timestamp": "2024-01-01T00:00:00Z",
    "version": "1.0"
  }
}`}
                  </div>
                </div>
              </div>
            </div>

            {/* Core Endpoints */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Core Endpoints</h2>
              
              <div className="space-y-8">
                {/* Projects API */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Projects API</h3>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-3">GET</span>
                          <code className="text-sm font-mono">/projects</code>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">List all projects for the authenticated user</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mr-3">POST</span>
                          <code className="text-sm font-mono">/projects</code>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">Create a new construction project</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-3">GET</span>
                          <code className="text-sm font-mono">/projects/{'{id}'}</code>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">Get project details by ID</p>
                    </div>
                  </div>
                </div>

                {/* Professionals API */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Professionals API</h3>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-3">GET</span>
                          <code className="text-sm font-mono">/professionals</code>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">Search verified construction professionals</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mr-3">POST</span>
                          <code className="text-sm font-mono">/quotes</code>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">Request quotes from multiple professionals</p>
                    </div>
                  </div>
                </div>

                {/* Materials API */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Materials API</h3>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-3">GET</span>
                          <code className="text-sm font-mono">/materials</code>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">Browse construction materials from UK suppliers</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mr-3">GET</span>
                          <code className="text-sm font-mono">/suppliers</code>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">List verified UK construction suppliers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Webhooks */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Webhooks</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Event Types</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">project.created</h4>
                      <p className="text-sm text-gray-600">Triggered when a new project is created</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">quote.received</h4>
                      <p className="text-sm text-gray-600">Triggered when a professional submits a quote</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">project.completed</h4>
                      <p className="text-sm text-gray-600">Triggered when a project is marked complete</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">professional.matched</h4>
                      <p className="text-sm text-gray-600">Triggered when professionals are matched to a project</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Webhook Payload Example</h3>
                  <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
{`{
  "event": "quote.received",
  "timestamp": "2024-01-01T10:30:00Z",
  "data": {
    "quote_id": "quote_123",
    "project_id": "proj_456",
    "professional_id": "prof_789",
    "amount": 15000,
    "currency": "GBP",
    "timeline": "8-12 weeks"
  }
}`}
                  </div>
                </div>
              </div>
            </div>

            {/* Rate Limits */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Rate Limits</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requests/Hour</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requests/Day</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Burst Limit</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 text-sm">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Free</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">100</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">1,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">10/min</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Pro</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">1,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">10,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">50/min</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Enterprise</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">10,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">100,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">200/min</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* API Key */}
            <div className="bg-blue-600 text-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Get Your API Key</h3>
              <p className="text-blue-100 mb-4 text-sm">
                Sign up for a BuildMate account to get your API key and start integrating with our platform.
              </p>
              <Link 
                href="/configure" 
                className="inline-flex items-center bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Get Started
                <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
              </Link>
            </div>

            {/* SDKs */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Official SDKs</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center">
                  <GitBranch className="h-4 w-4 text-gray-400 mr-2" />
                  <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
                    Node.js SDK
                  </a>
                </li>
                <li className="flex items-center">
                  <GitBranch className="h-4 w-4 text-gray-400 mr-2" />
                  <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
                    Python SDK
                  </a>
                </li>
                <li className="flex items-center">
                  <GitBranch className="h-4 w-4 text-gray-400 mr-2" />
                  <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
                    PHP SDK
                  </a>
                </li>
                <li className="flex items-center">
                  <GitBranch className="h-4 w-4 text-gray-400 mr-2" />
                  <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
                    Ruby SDK
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Developer Support</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/help" className="text-blue-600 hover:text-blue-700 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <a href="mailto:developers@buildmate.co.uk" className="text-blue-600 hover:text-blue-700 transition-colors">
                    Developer Email
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
                    Community Forum
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
                    GitHub Repository
                  </a>
                </li>
              </ul>
            </div>

            {/* Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">API Status</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API</span>
                  <span className="flex items-center text-sm text-green-600">
                    <div className="h-2 w-2 bg-green-400 rounded-full mr-2"></div>
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Webhooks</span>
                  <span className="flex items-center text-sm text-green-600">
                    <div className="h-2 w-2 bg-green-400 rounded-full mr-2"></div>
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <span className="text-sm text-gray-600">~120ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}