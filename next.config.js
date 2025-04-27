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
  // Use static export
  output: "export",
  // Disable automatic 404 page generation
  trailingSlash: false,
}

module.exports = nextConfig
