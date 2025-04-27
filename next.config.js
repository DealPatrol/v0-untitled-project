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
  // Disable experimental features that might be causing issues
  experimental: {
    appDir: true, // Keep App Router enabled
    missingSuspenseWithCSRBailout: false, // Disable the warning
  },
}

module.exports = nextConfig
