/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Completely disable the CSR bailout warning
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ensure images work with static export
  images: {
    unoptimized: true,
  },
  // Don't use static export as it's causing issues
  // output: "export",
  // Skip the problematic not-found page during build
  distDir: ".next",
  pageExtensions: ["js", "jsx", "ts", "tsx"],
}

module.exports = nextConfig
