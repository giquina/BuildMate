import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Construction Materials Marketplace',
  description: 'Source high-quality construction materials from verified UK suppliers. Compare prices, read reviews, and get bulk discounts on building materials for your home construction project.',
  keywords: [
    'construction materials UK',
    'building materials',
    'UK suppliers',
    'bulk building materials',
    'construction supplies',
    'building supplies UK',
    'materials marketplace',
    'construction materials online',
    'building materials comparison',
    'UK construction suppliers'
  ],
  openGraph: {
    title: 'Construction Materials Marketplace | BuildMate',
    description: 'Source high-quality construction materials from verified UK suppliers. Compare prices and get bulk discounts.',
    type: 'website',
    images: [
      {
        url: '/og-materials.jpg',
        width: 1200,
        height: 630,
        alt: 'BuildMate Materials Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Construction Materials Marketplace | BuildMate',
    description: 'Source high-quality construction materials from verified UK suppliers. Compare prices and get bulk discounts.',
    images: ['/twitter-materials.jpg'],
  },
}

export default function MaterialsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Structured Data for Materials Marketplace */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Construction Materials Marketplace",
            "description": "Source high-quality construction materials from verified UK suppliers",
            "url": "https://build-mate-mu.vercel.app/materials",
            "mainEntity": {
              "@type": "ItemList",
              "name": "Construction Materials",
              "itemListElement": [
                {
                  "@type": "Product",
                  "name": "Structural Materials",
                  "description": "Steel beams, concrete, foundations"
                },
                {
                  "@type": "Product", 
                  "name": "Finishing Materials",
                  "description": "Flooring, tiles, paint, fixtures"
                },
                {
                  "@type": "Product",
                  "name": "Roofing Materials", 
                  "description": "Tiles, membranes, insulation"
                },
                {
                  "@type": "Product",
                  "name": "Electrical & Plumbing",
                  "description": "Wiring, pipes, fittings, fixtures"
                }
              ]
            },
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