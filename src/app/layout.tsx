import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Home, ShoppingCart, Users, LayoutDashboard, Award } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BuildMate AI - UK Home Building & Renovation Platform',
  description: 'AI-powered home building platform for UK homeowners, self-builders, and property developers. Design floorplans, source materials, find professionals.',
  keywords: 'home building, renovation, AI floorplan, UK construction, materials, professionals, self-build',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Global Navigation */}
        <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b fixed top-0 w-full z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="flex items-center group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Home className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  BuildMate AI
                </span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
                <Link href="/materials" className="flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Materials
                </Link>
                <Link href="/professionals" className="flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  <Users className="h-4 w-4 mr-2" />
                  Professionals
                </Link>
                <Link href="/case-studies" className="flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  <Award className="h-4 w-4 mr-2" />
                  Case Studies
                </Link>
                <Link href="/start" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium">
                  Start Building
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden mobile-nav">
          <div className="flex justify-around">
            <Link href="/dashboard" className="nav-item nav-item-inactive">
              <LayoutDashboard className="h-5 w-5 mb-1" />
              <span>Dashboard</span>
            </Link>
            <Link href="/materials" className="nav-item nav-item-inactive">
              <ShoppingCart className="h-5 w-5 mb-1" />
              <span>Materials</span>
            </Link>
            <Link href="/start" className="nav-item bg-blue-600 text-white rounded-lg">
              <Home className="h-5 w-5 mb-1" />
              <span>Build</span>
            </Link>
            <Link href="/professionals" className="nav-item nav-item-inactive">
              <Users className="h-5 w-5 mb-1" />
              <span>Pros</span>
            </Link>
            <Link href="/case-studies" className="nav-item nav-item-inactive">
              <Award className="h-5 w-5 mb-1" />
              <span>Cases</span>
            </Link>
          </div>
        </div>

        <main className="pt-20 pb-20 md:pb-0 min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  )
}