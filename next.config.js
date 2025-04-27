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
  // Disable automatic 404 page generation in App Router
  pageExtensions: ["tsx", "ts", "jsx", "js"],
}

module.exports = nextConfig
