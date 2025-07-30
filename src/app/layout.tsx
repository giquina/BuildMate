import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Home, Eye, DollarSign, Settings, User, ArrowRight, BookOpen, Heart, ShoppingCart, Shield, Award, CheckCircle } from 'lucide-react'
import { Suspense } from 'react'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'BuildMate AI - Complete Home Building Platform | Design, Build, Manage',
  description: 'All-in-one UK home building platform. Generate AI floorplans, create realistic renders, source materials from major suppliers, and connect with verified builders. From design to completion.',
  keywords: 'UK home building, AI floorplans, home design, construction materials, verified builders, home renovation, property development, building platform',
  manifest: '/manifest.json',
  themeColor: '#1e40af',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover'
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'BuildMate AI'
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
              
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/how-it-works" className="text-gray-700 hover:text-blue-700 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-blue-50">
                  How It Works
                </Link>
                <Link href="/examples" className="flex items-center text-gray-700 hover:text-blue-700 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-blue-50">
                  <Eye className="h-4 w-4 mr-2" />
                  Examples
                </Link>
                <Link href="/guides" className="flex items-center text-gray-700 hover:text-blue-700 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-blue-50">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Guides
                </Link>
                <Link href="/pricing" className="flex items-center text-gray-700 hover:text-blue-700 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-blue-50">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Pricing
                </Link>
                <Link href="/configure" className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-8 py-3.5 rounded-xl font-bold flex items-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[48px]">
                  Configure Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Enhanced Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-300 z-50 shadow-2xl">
          <div className="flex justify-around py-3">
            <Link href="/" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-700 transition-all duration-200 rounded-xl hover:bg-blue-50 min-h-[48px] touch-manipulation">
              <Home className="h-6 w-6 mb-1" />
              <span className="text-xs font-semibold">Home</span>
            </Link>
            <Link href="/examples" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-700 transition-all duration-200 rounded-xl hover:bg-blue-50 min-h-[48px] touch-manipulation">
              <Eye className="h-6 w-6 mb-1" />
              <span className="text-xs font-semibold">Examples</span>
            </Link>
            <Link href="/cart" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-700 transition-all duration-200 rounded-xl hover:bg-blue-50 min-h-[48px] touch-manipulation relative">
              <ShoppingCart className="h-6 w-6 mb-1" />
              <span className="text-xs font-semibold">Cart</span>
              {/* Cart badge */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">3</span>
              </div>
            </Link>
            <Link href="/wishlist" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-red-500 transition-all duration-200 rounded-xl hover:bg-red-50 min-h-[48px] touch-manipulation">
              <Heart className="h-6 w-6 mb-1" />
              <span className="text-xs font-semibold">Wishlist</span>
            </Link>
            <Link href="/configure" className="flex flex-col items-center py-2 px-4 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-xl mx-1 hover:from-blue-800 hover:to-blue-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[48px] touch-manipulation">
              <Settings className="h-6 w-6 mb-1" />
              <span className="text-xs font-bold">Configure</span>
            </Link>
          </div>
        </div>

        <main className="pt-28 md:pt-24 pb-24 md:pb-0 min-h-screen bg-gray-50">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          }>
            {children}
          </Suspense>
        </main>

        {/* Performance Monitoring & Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Register Service Worker for PWA caching
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('🏗️ BuildMate SW: Registered successfully for construction site usage', registration.scope);
                    
                    // Check for updates periodically
                    setInterval(() => {
                      registration.update();
                    }, 60000); // Check every minute
                  }).catch(function(error) {
                    console.log('🏗️ BuildMate SW: Registration failed', error);
                  });
                });
              }

              // Initialize performance monitoring
              if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
                window.requestIdleCallback(function() {
                  // Load web vitals when browser is idle
                  import('/src/lib/performance.js').then(({ initPerformanceMonitoring }) => {
                    initPerformanceMonitoring();
                  }).catch(console.error);
                });
              }

              // Construction site connection monitoring
              if ('connection' in navigator) {
                const connection = navigator.connection;
                const logConnection = () => {
                  console.log('🏗️ Connection:', {
                    type: connection.effectiveType,
                    downlink: connection.downlink + 'Mbps',
                    rtt: connection.rtt + 'ms',
                    saveData: connection.saveData
                  });
                };
                connection.addEventListener('change', logConnection);
                logConnection();
              }

              // Background sync when connection restored (for construction data)
              if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
                window.addEventListener('online', function() {
                  console.log('🏗️ Connection restored - triggering construction data sync');
                  navigator.serviceWorker.ready.then(function(registration) {
                    return registration.sync.register('construction-data-sync');
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}