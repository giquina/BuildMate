import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Navigation } from '@/components/ui/Navigation'
import { LiveNotifications } from '@/components/ui/LiveNotifications'
import { Footer } from '@/components/ui/Footer'
import { ToastProvider } from '@/components/ui/Toast'
import { UserProvider } from '@/contexts/UserContext'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://build-mate-mu.vercel.app'),
  title: {
    default: 'BuildMate AI - Complete Home Building Platform | Design, Build, Manage',
    template: '%s | BuildMate AI - UK Home Building Platform'
  },
  description: 'All-in-one UK home building platform. Generate smart floorplans, create realistic renders, source materials from major suppliers, and connect with verified builders. From design to completion.',
  keywords: [
    'UK home building',
    'smart floorplans', 
    'home design',
    'construction materials',
    'verified builders',
    'home renovation',
    'property development',
    'building platform',
    'UK construction',
    'home extension',
    'loft conversion',
    'planning permission',
    'building regulations',
    'construction professionals',
    'materials marketplace',
    'BuildMate AI'
  ],
  authors: [{ name: 'BuildMate AI Team' }],
  creator: 'BuildMate AI',
  publisher: 'BuildMate AI',
  category: 'Construction & Home Building',
  classification: 'Business',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://build-mate-mu.vercel.app',
    siteName: 'BuildMate AI',
    title: 'BuildMate AI - Complete Home Building Platform | Design, Build, Manage',
    description: 'All-in-one UK home building platform. Generate smart floorplans, create realistic renders, source materials from major suppliers, and connect with verified builders.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BuildMate AI - UK Home Building Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@buildmate_uk',
    creator: '@buildmate_uk',
    title: 'BuildMate AI - Complete Home Building Platform',
    description: 'All-in-one UK home building platform. Generate smart floorplans, source materials, and connect with verified builders.',
    images: ['/twitter-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'BuildMate AI',
    startupImage: '/apple-startup-image.png',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      'msvalidate.01': process.env.BING_SITE_VERIFICATION || '',
    },
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
        <ToastProvider>
          <UserProvider>
            {/* Skip Link for accessibility */}
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50 focus:z-[100]"
            >
              Skip to main content
            </a>
            
            <Navigation />

            <main id="main-content" className="pt-28 md:pt-24 pb-0 min-h-screen bg-gray-50">
              {children}
            </main>

            {/* Footer */}
            <Footer />

            {/* Live Activity Notifications */}
            <LiveNotifications />
          </UserProvider>
        </ToastProvider>

        {/* Structured Data - JSON-LD for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "BuildMate AI",
              "description": "UK's complete home building platform connecting homeowners with verified professionals and smart materials sourcing.",
              "url": "https://build-mate-mu.vercel.app",
              "logo": "/logo.png",
              "foundingDate": "2024",
              "founders": [
                {
                  "@type": "Person",
                  "name": "BuildMate AI Team"
                }
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+44-800-123-4567",
                "contactType": "customer service",
                "availableLanguage": "English",
                "areaServed": "GB"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "GB",
                "addressRegion": "United Kingdom"
              },
              "sameAs": [
                "https://twitter.com/buildmate_uk",
                "https://linkedin.com/company/buildmate-uk",
                "https://github.com/giquina/BuildMate"
              ],
              "serviceType": "Construction Platform",
              "areaServed": {
                "@type": "Country",
                "name": "United Kingdom"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "BuildMate AI Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Smart Floorplan Generation",
                      "description": "AI-powered floorplan generation for UK homes"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Materials Marketplace",
                      "description": "Source construction materials from verified UK suppliers"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Professional Network",
                      "description": "Connect with verified UK construction professionals"
                    }
                  }
                ]
              }
            })
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "BuildMate AI",
              "url": "https://build-mate-mu.vercel.app",
              "description": "UK's complete home building platform",
              "publisher": {
                "@type": "Organization",
                "name": "BuildMate AI"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://build-mate-mu.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* Performance Monitoring & Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Register Service Worker for PWA caching
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('🏗️ BuildMate AI SW: Registered successfully for construction site usage', registration.scope);
                    
                    // Check for updates periodically
                    setInterval(() => {
                      registration.update();
                    }, 60000); // Check every minute
                  }).catch(function(error) {
                    console.log('🏗️ BuildMate AI SW: Registration failed', error);
                  });
                });
              }

              // Initialize performance monitoring safely - DISABLED for debugging
              // if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
              //   window.requestIdleCallback(function() {
              //     // Safely load performance monitoring
              //     try {
              //       import('@/lib/performance').then(({ initPerformanceMonitoring }) => {
              //         if (initPerformanceMonitoring && typeof initPerformanceMonitoring === 'function') {
              //           initPerformanceMonitoring();
              //         }
              //       }).catch(function(err) {
              //         console.warn('Performance monitoring failed to load:', err);
              //       });
              //     } catch (err) {
              //       console.warn('Performance monitoring initialization failed:', err);
              //     }
              //   });
              // }

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