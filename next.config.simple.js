const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Essential optimizations only
  experimental: {
    optimizePackageImports: ['lucide-react'],
    scrollRestoration: true,
  },
  
  // Image optimization
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  
  // Basic settings
  compress: true,
  poweredByHeader: false,
  output: 'standalone',
  trailingSlash: false,
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Simplified webpack config
  webpack: (config, { dev, isServer }) => {
    // Only safe optimizations
    if (!dev && !isServer) {
      config.optimization.moduleIds = 'deterministic'
      config.optimization.chunkIds = 'deterministic'
    }
    
    return config
  },
  
  // Basic security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
}

module.exports = withBundleAnalyzer(nextConfig)