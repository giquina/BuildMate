import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import { Navigation } from '@/components/ui/Navigation'

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
      <head>
        {/* Plausible Analytics - Privacy-friendly analytics */}
        <script 
          defer 
          data-domain="buildmate-ai.vercel.app" 
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body className={inter.className}>
        {/* Skip Link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50 focus:z-[100]"
        >
          Skip to main content
        </a>
        
        <Navigation />

        <main id="main-content" className="pt-28 md:pt-24 pb-24 md:pb-0 min-h-screen bg-gray-50">
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