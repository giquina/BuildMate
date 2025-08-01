import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Navigation } from '@/components/ui/Navigation'
import { LiveNotifications } from '@/components/ui/LiveNotifications'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'BuildMate - Complete Home Building Platform | Design, Build, Manage',
  description: 'All-in-one UK home building platform. Generate smart floorplans, create realistic renders, source materials from major suppliers, and connect with verified builders. From design to completion.',
  keywords: 'UK home building, smart floorplans, home design, construction materials, verified builders, home renovation, property development, building platform',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'BuildMate'
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#1e40af',
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
          {children}
        </main>

        {/* Live Activity Notifications */}
        <LiveNotifications />

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

              // Initialize performance monitoring safely
              if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
                window.requestIdleCallback(function() {
                  // Safely load performance monitoring
                  try {
                    import('@/lib/performance').then(({ initPerformanceMonitoring }) => {
                      if (initPerformanceMonitoring && typeof initPerformanceMonitoring === 'function') {
                        initPerformanceMonitoring();
                      }
                    }).catch(function(err) {
                      console.warn('Performance monitoring failed to load:', err);
                    });
                  } catch (err) {
                    console.warn('Performance monitoring initialization failed:', err);
                  }
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