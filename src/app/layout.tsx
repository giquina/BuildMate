import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Home, ShoppingCart, Users, LayoutDashboard } from 'lucide-react'

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
        <nav className="bg-white shadow-sm border-b fixed top-0 w-full z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="flex items-center">
                <Home className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">BuildMate AI</span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-blue-600">
                  <LayoutDashboard className="h-4 w-4 mr-1" />
                  Dashboard
                </Link>
                <Link href="/materials" className="flex items-center text-gray-600 hover:text-blue-600">
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Materials
                </Link>
                <Link href="/professionals" className="flex items-center text-gray-600 hover:text-blue-600">
                  <Users className="h-4 w-4 mr-1" />
                  Professionals
                </Link>
                <Link href="/start" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Start Building
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="pt-20 min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  )
}