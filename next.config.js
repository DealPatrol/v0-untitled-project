/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Disable the CSR bailout warning
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
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
  // Disable automatic static optimization for the not-found page
  output: "standalone",
}

module.exports = nextConfig
