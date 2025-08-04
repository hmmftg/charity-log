/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://your-supabase-url.supabase.co/rest/v1/:path*',
      },
    ]
  },
  // PWA configuration would go here with next-pwa plugin
}

export default nextConfig
