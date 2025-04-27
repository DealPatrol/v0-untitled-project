/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: "standalone" to prevent static export
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["memorialqr.com", "localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  // Disable static generation completely
  experimental: {
    // Force server-side rendering for all pages
    appDir: true,
    serverActions: true,
  },
}

module.exports = nextConfig
