/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ensure images work properly
  images: {
    unoptimized: true,
  },
  // Use standalone instead of export to support API routes
  output: "standalone",
  // Disable automatic 404 page generation
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

module.exports = nextConfig
