const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'clsx', '@supabase/supabase-js'],
    scrollRestoration: true,
    webVitalsAttribution: ['CLS', 'LCP', 'FID', 'FCP', 'TTFB'],
    cpus: Math.max(1, (require('os').cpus() || { length: 1 }).length - 1),
    workerThreads: false,
    esmExternals: true,
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
  },
  
  // Image optimization for construction industry
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  
  // Compression and caching
  compress: true,
  poweredByHeader: false,
  
  // Static optimization
  output: 'standalone',
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Enhanced tree shaking
      config.optimization.usedExports = true
      config.optimization.sideEffects = false
      config.optimization.moduleIds = 'deterministic'
      config.optimization.chunkIds = 'deterministic'
      
      // Advanced chunk splitting for construction app
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 200000,
        cacheGroups: {
          // Framework chunk (React, Next.js core)
          framework: {
            test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
            name: 'framework',
            priority: 40,
            enforce: true,
          },
          // UI Libraries chunk
          ui: {
            test: /[\\/]node_modules[\\/](lucide-react|clsx)[\\/]/,
            name: 'ui-lib',
            priority: 30,
            enforce: true,
          },
          // Utilities chunk
          utils: {
            test: /[\\/](lib|utils)[\\/]/,
            name: 'utils',
            priority: 20,
            minChunks: 2,
          },
          // Construction domain chunk
          construction: {
            test: /[\\/](uk-utils|construction|algorithms)[\\/]/,
            name: 'construction',
            priority: 25,
            chunks: 'all',
          },
          // Vendor chunk for remaining node_modules
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            chunks: 'all',
          },
          // Common chunk for shared components
          common: {
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      }

      // Module concatenation for better performance
      config.optimization.concatenateModules = true
      
      // Minimize bundle size
      config.optimization.minimize = true
    }
    
    // Enable webpack caching for faster builds
    config.cache = {
      type: 'filesystem',
      cacheDirectory: require('path').resolve('.next/cache/webpack'),
    }
    
    return config
  },
  
  // Headers for caching and security
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
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      // API caching with construction-specific strategies
      {
        source: '/api/materials/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/api/professionals/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=900, s-maxage=1800, stale-while-revalidate=3600',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=600, stale-while-revalidate=1800',
          },
        ],
      },
      // Static assets with long-term caching
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Images with medium-term caching
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=604800',
          },
        ],
      },
      // Fonts with long-term caching
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ]
  },
}

module.exports = withBundleAnalyzer(nextConfig)