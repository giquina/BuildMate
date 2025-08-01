'use client'

import Link from 'next/link'
import { Home, Eye, PoundSterling, Settings, User, ArrowRight, Heart, ShoppingCart, Shield, Award, CheckCircle, Menu, X, Hammer, Building2 } from 'lucide-react'
import { useState } from 'react'
import { UserMenu } from './UserMenu'
import { AuthModal } from './AuthModal'

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login')

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
                  BuildMate
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

              {/* User Menu */}
              <UserMenu onOpenAuth={() => setAuthModalOpen(true)} />
              
              <Link href="/configure" className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-6 py-3 rounded-xl font-bold flex items-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[44px] ml-4">
                Configure Now
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-colors min-h-[44px] min-w-[44px]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-haspopup="true"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div 
              id="mobile-menu"
              className="md:hidden border-t border-gray-200 py-4 bg-white/95 backdrop-blur-md"
              role="menu"
              aria-labelledby="mobile-menu-button"
            >
              <div className="flex flex-col space-y-3" role="none">
                <Link 
                  href="/materials" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors min-h-[44px]"
                  onClick={() => setMobileMenuOpen(false)}
                  role="menuitem"
                >
                  <Hammer className="h-5 w-5 mr-3" aria-hidden="true" />
                  Materials
                </Link>
                <Link 
                  href="/professionals" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors min-h-[44px]"
                  onClick={() => setMobileMenuOpen(false)}
                  role="menuitem"
                >
                  <User className="h-5 w-5 mr-3" aria-hidden="true" />
                  Professionals
                </Link>
                <Link 
                  href="/examples" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors min-h-[44px]"
                  onClick={() => setMobileMenuOpen(false)}
                  role="menuitem"
                >
                  <Eye className="h-5 w-5 mr-3" aria-hidden="true" />
                  Examples
                </Link>
                <Link 
                  href="/pricing" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors min-h-[44px]"
                  onClick={() => setMobileMenuOpen(false)}
                  role="menuitem"
                >
                  <PoundSterling className="h-5 w-5 mr-3" aria-hidden="true" />
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

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authModalTab}
      />

      {/* Enhanced Mobile Bottom Navigation - Construction Optimized */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-300 z-50 shadow-2xl safe-area-inset-bottom">
        <div className="flex justify-around py-3 px-2">
          <Link href="/dashboard" className="flex flex-col items-center py-2 px-2 text-gray-600 hover:text-blue-700 transition-all duration-200 rounded-xl hover:bg-blue-50 min-h-[64px] touch-manipulation flex-1 active:scale-95">
            <Home className="h-6 w-6 mb-1" />
            <span className="text-xs font-semibold">Dashboard</span>
          </Link>
          <Link href="/materials" className="flex flex-col items-center py-2 px-2 text-gray-600 hover:text-blue-700 transition-all duration-200 rounded-xl hover:bg-blue-50 min-h-[64px] touch-manipulation flex-1 active:scale-95">
            <Hammer className="h-6 w-6 mb-1" />
            <span className="text-xs font-semibold">Materials</span>
          </Link>
          <Link href="/professionals" className="flex flex-col items-center py-2 px-2 text-gray-600 hover:text-blue-700 transition-all duration-200 rounded-xl hover:bg-blue-50 min-h-[64px] touch-manipulation flex-1 active:scale-95">
            <User className="h-6 w-6 mb-1" />
            <span className="text-xs font-semibold">Team</span>
          </Link>
          <Link href="/cart" className="flex flex-col items-center py-2 px-2 text-gray-600 hover:text-blue-700 transition-all duration-200 rounded-xl hover:bg-blue-50 min-h-[64px] touch-manipulation relative flex-1 active:scale-95">
            <ShoppingCart className="h-6 w-6 mb-1" />
            <span className="text-xs font-semibold">Cart</span>
            {/* Cart badge - larger for construction sites */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white">
              <span className="text-xs font-bold text-white">3</span>
            </div>
          </Link>
          <Link href="/configure" className="flex flex-col items-center py-2 px-3 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-xl hover:from-blue-800 hover:to-blue-900 transition-all duration-200 shadow-lg hover:shadow-xl min-h-[64px] touch-manipulation flex-1 mx-1 active:scale-95">
            <Building2 className="h-6 w-6 mb-1" />
            <span className="text-xs font-bold">Build</span>
          </Link>
        </div>
        
        {/* PWA Install Prompt - Construction Sites */}
        <div className="border-t border-gray-200 bg-blue-50 px-4 py-2 hidden" id="pwa-install-prompt">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-blue-600" />
              <span className="text-blue-800 font-medium">Install for offline construction site use</span>
            </div>
            <button 
              id="pwa-install-btn"
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Install
            </button>
          </div>
        </div>
      </div>
      
      {/* PWA Install Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // PWA Install Prompt for Construction Sites
            let deferredPrompt;
            
            window.addEventListener('beforeinstallprompt', (e) => {
              console.log('🏗️ PWA: Install prompt triggered');
              e.preventDefault();
              deferredPrompt = e;
              
              // Show custom install prompt for construction sites
              const installPrompt = document.getElementById('pwa-install-prompt');
              const installBtn = document.getElementById('pwa-install-btn');
              
              if (installPrompt && installBtn) {
                installPrompt.classList.remove('hidden');
                
                installBtn.addEventListener('click', async () => {
                  console.log('🏗️ PWA: User clicked install');
                  deferredPrompt.prompt();
                  
                  const { outcome } = await deferredPrompt.userChoice;
                  console.log('🏗️ PWA: User choice:', outcome);
                  
                  if (outcome === 'accepted') {
                    console.log('🏗️ PWA: Installation accepted');
                  }
                  
                  installPrompt.classList.add('hidden');
                  deferredPrompt = null;
                });
              }
            });
            
            window.addEventListener('appinstalled', () => {
              console.log('🏗️ PWA: App installed successfully');
              const installPrompt = document.getElementById('pwa-install-prompt');
              if (installPrompt) {
                installPrompt.classList.add('hidden');
              }
            });
            
            // Construction site optimization: Register for background sync
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.ready.then(registration => {
                console.log('🏗️ PWA: Service Worker ready for construction site usage');
                
                // Enable background sync for construction data
                if ('sync' in window.ServiceWorkerRegistration.prototype) {
                  console.log('🏗️ PWA: Background sync supported for construction sites');
                }
                
                // Enable push notifications for construction updates
                if ('Notification' in window && 'PushManager' in window) {
                  console.log('🏗️ PWA: Push notifications supported for construction updates');
                }
              });
            }
          `
        }}
      />"
    </>
  )
}