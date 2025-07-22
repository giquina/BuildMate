import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  )
}