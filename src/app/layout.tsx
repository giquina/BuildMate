import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Home, Eye, DollarSign, Settings, User, ArrowRight, BookOpen, Heart, ShoppingCart } from 'lucide-react'

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
                <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
                  <Home className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                  BuildMate AI
                </span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/how-it-works" className="text-gray-600 hover:text-blue-700 font-medium transition-colors">
                  How It Works
                </Link>
                <Link href="/examples" className="flex items-center text-gray-600 hover:text-blue-700 font-medium transition-colors">
                  <Eye className="h-4 w-4 mr-2" />
                  Examples
                </Link>
                <Link href="/guides" className="flex items-center text-gray-600 hover:text-blue-700 font-medium transition-colors">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Guides
                </Link>
                <Link href="/pricing" className="flex items-center text-gray-600 hover:text-blue-700 font-medium transition-colors">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Pricing
                </Link>
                <Link href="/configure" className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold flex items-center transition-all duration-200 shadow-lg hover:shadow-xl">
                  Configure Now
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
          <div className="flex justify-around py-2">
            <Link href="/" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-700 transition-colors">
              <Home className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Home</span>
            </Link>
            <Link href="/examples" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-700 transition-colors">
              <Eye className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Examples</span>
            </Link>
            <Link href="/cart" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-700 transition-colors">
              <ShoppingCart className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Cart</span>
            </Link>
            <Link href="/wishlist" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-red-500 transition-colors">
              <Heart className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Wishlist</span>
            </Link>
            <Link href="/configure" className="flex flex-col items-center py-2 px-4 bg-blue-700 text-white rounded-lg mx-1 hover:bg-blue-800 transition-colors">
              <Settings className="h-5 w-5 mb-1" />
              <span className="text-xs font-semibold">Configure</span>
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