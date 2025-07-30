'use client'

import Link from 'next/link'
import { Home, Eye, PoundSterling, Settings, User, ArrowRight, Heart, ShoppingCart, Shield, Award, CheckCircle, Menu, X, Hammer, Building2 } from 'lucide-react'
import { useState } from 'react'

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Enhanced Global Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Trust Indicators Bar */}
          <div className="hidden md:block border-b border-gray-100 py-2">
            <div className="flex items-center justify-center space-x-6 text-xs">
              <div className="flex items-center text-green-600">
                <Shield className="h-3 w-3 mr-1" />
                <span className="font-semibold">UK Building Regs Compliant</span>
              </div>
              <div className="flex items-center text-blue-600">
                <Award className="h-3 w-3 mr-1" />
                <span className="font-semibold">RIBA Certified Platform</span>
              </div>
              <div className="flex items-center text-orange-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                <span className="font-semibold">10,000+ Projects Completed</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-700 to-blue-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                <Home className="h-7 w-7 text-white" />
              </div>
              <div className="ml-3">
                <span className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors block">
                  BuildMate AI
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  Professional Building Platform
                </span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/materials" className="flex items-center text-gray-700 hover:text-blue-700 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-blue-50">
                <Hammer className="h-4 w-4 mr-2" />
                Materials
              </Link>
              <Link href="/professionals" className="flex items-center text-gray-700 hover:text-blue-700 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-blue-50">
                <User className="h-4 w-4 mr-2" />
                Professionals
              </Link>
              <Link href="/examples" className="flex items-center text-gray-700 hover:text-blue-700 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-blue-50">
                <Eye className="h-4 w-4 mr-2" />
                Examples
              </Link>
              <Link href="/pricing" className="flex items-center text-gray-700 hover:text-blue-700 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-blue-50">
                <PoundSterling className="h-4 w-4 mr-2" />
                Pricing
              </Link>
              
              {/* Desktop Cart & Wishlist */}
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
                <Link href="/wishlist" className="flex items-center text-gray-700 hover:text-red-500 transition-colors px-3 py-2 rounded-lg hover:bg-red-50 relative">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Wishlist</span>
                </Link>
                <Link href="/cart" className="flex items-center text-gray-700 hover:text-blue-700 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50 relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Cart</span>
                  {/* Cart badge */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">3</span>
                  </div>
                </Link>
              </div>
              
              <Link href="/configure" className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-6 py-3 rounded-xl font-bold flex items-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[44px] ml-4">
                Configure Now
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 bg-white/95 backdrop-blur-md">
              <div className="flex flex-col space-y-3">
                <Link 
                  href="/materials" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Hammer className="h-5 w-5 mr-3" />
                  Materials
                </Link>
                <Link 
                  href="/professionals" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-3" />
                  Professionals
                </Link>
                <Link 
                  href="/examples" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Eye className="h-5 w-5 mr-3" />
                  Examples
                </Link>
                <Link 
                  href="/pricing" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <PoundSterling className="h-5 w-5 mr-3" />
                  Pricing
                </Link>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <Link 
                    href="/configure" 
                    className="flex items-center justify-center bg-gradient-to-r from-blue-700 to-blue-800 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 shadow-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Configure Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-300 z-50 shadow-2xl">
        <div className="flex justify-around py-2 px-2">
          <Link href="/" className="flex flex-col items-center py-2 px-2 text-gray-600 hover:text-blue-700 transition-all duration-200 rounded-xl hover:bg-blue-50 min-h-[60px] touch-manipulation flex-1">
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs font-semibold">Home</span>
          </Link>
          <Link href="/materials" className="flex flex-col items-center py-2 px-2 text-gray-600 hover:text-blue-700 transition-all duration-200 rounded-xl hover:bg-blue-50 min-h-[60px] touch-manipulation flex-1">
            <Hammer className="h-5 w-5 mb-1" />
            <span className="text-xs font-semibold">Materials</span>
          </Link>
          <Link href="/professionals" className="flex flex-col items-center py-2 px-2 text-gray-600 hover:text-blue-700 transition-all duration-200 rounded-xl hover:bg-blue-50 min-h-[60px] touch-manipulation flex-1">
            <User className="h-5 w-5 mb-1" />
            <span className="text-xs font-semibold">Pros</span>
          </Link>
          <Link href="/cart" className="flex flex-col items-center py-2 px-2 text-gray-600 hover:text-blue-700 transition-all duration-200 rounded-xl hover:bg-blue-50 min-h-[60px] touch-manipulation relative flex-1">
            <ShoppingCart className="h-5 w-5 mb-1" />
            <span className="text-xs font-semibold">Cart</span>
            {/* Cart badge */}
            <div className="absolute top-1 right-2 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">3</span>
            </div>
          </Link>
          <Link href="/configure" className="flex flex-col items-center py-2 px-3 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-xl hover:from-blue-800 hover:to-blue-900 transition-all duration-200 shadow-lg hover:shadow-xl min-h-[60px] touch-manipulation flex-1 mx-1">
            <Settings className="h-5 w-5 mb-1" />
            <span className="text-xs font-bold">Configure</span>
          </Link>
        </div>
      </div>
    </>
  )
}