import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Verified UK Construction Professionals',
  description: 'Connect with verified UK construction professionals including architects, builders, electricians, plumbers, and specialists. Read reviews, compare quotes, and hire with confidence.',
  keywords: [
    'UK construction professionals',
    'verified builders UK',
    'UK architects',
    'construction contractors',
    'building professionals',
    'UK tradespeople',
    'construction experts',
    'building contractors UK',
    'verified construction professionals',
    'UK building specialists'
  ],
  openGraph: {
    title: 'Verified UK Construction Professionals | BuildMate AI',
    description: 'Connect with verified UK construction professionals. Read reviews, compare quotes, and hire with confidence.',
    type: 'website',
    images: [
      {
        url: '/og-professionals.jpg',
        width: 1200,
        height: 630,
        alt: 'BuildMate AI Verified Professionals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verified UK Construction Professionals | BuildMate AI',
    description: 'Connect with verified UK construction professionals. Read reviews, compare quotes, and hire with confidence.',
    images: ['/twitter-professionals.jpg'],
  },
}

export default function ProfessionalsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Structured Data for Professionals Directory */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Verified UK Construction Professionals",
            "description": "Connect with verified UK construction professionals",
            "url": "https://build-mate-mu.vercel.app/professionals",
            "mainEntity": {
              "@type": "ItemList",
              "name": "Construction Professionals",
              "itemListElement": [
                {
                  "@type": "LocalBusiness",
                  "name": "Architects",
                  "@id": "architects",
                  "description": "RIBA qualified architects for residential projects",
                  "serviceType": "Architectural Services",
                  "areaServed": "United Kingdom"
                },
                {
                  "@type": "LocalBusiness",
                  "name": "Builders & Contractors",
                  "@id": "builders", 
                  "description": "Verified general contractors and builders",
                  "serviceType": "Construction Services",
                  "areaServed": "United Kingdom"
                },
                {
                  "@type": "LocalBusiness",
                  "name": "Specialists",
                  "@id": "specialists",
                  "description": "Electricians, plumbers, and trade specialists",
                  "serviceType": "Trade Services", 
                  "areaServed": "United Kingdom"
                }
              ]
            },
            "provider": {
              "@type": "Organization",
              "name": "BuildMate AI",
              "url": "https://build-mate-mu.vercel.app"
            }
          })
        }}
      />
      {children}
    </>
  )
}