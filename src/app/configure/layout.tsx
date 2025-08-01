import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Smart Floorplan Generator',
  description: 'Generate professional floorplans for your UK home building project. Create detailed layouts, visualize spaces, and get instant cost estimates for your construction project.',
  keywords: [
    'floorplan generator UK',
    'house plans UK',
    'home design tool',
    'building plans generator',
    'UK house plans',
    'architectural drawings',
    'floor plan software',
    'home layout planner',
    'UK building design',
    'construction planning tool'
  ],
  openGraph: {
    title: 'Smart Floorplan Generator | BuildMate',
    description: 'Generate professional floorplans for your UK home building project. Create detailed layouts and get instant cost estimates.',
    type: 'website',
    images: [
      {
        url: '/og-configure.jpg',
        width: 1200,
        height: 630,
        alt: 'BuildMate Smart Floorplan Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Floorplan Generator | BuildMate',  
    description: 'Generate professional floorplans for your UK home building project. Create detailed layouts and get instant cost estimates.',
    images: ['/twitter-configure.jpg'],
  },
}

export default function ConfigureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Structured Data for Floorplan Generator */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Smart Floorplan Generator",
            "description": "Generate professional floorplans for UK home building projects",
            "url": "https://build-mate-mu.vercel.app/configure",
            "applicationCategory": "DesignApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "GBP",
              "availability": "https://schema.org/InStock"
            },
            "featureList": [
              "Professional floorplan generation",
              "Instant cost estimation",
              "UK building regulations compliance",
              "Multiple architectural styles",
              "Export to PDF/DWG formats"
            ],
            "provider": {
              "@type": "Organization",
              "name": "BuildMate",
              "url": "https://build-mate-mu.vercel.app"
            }
          })
        }}
      />
      {children}
    </>
  )
}