/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'page.ts', 'api.tsx', 'api.ts'],
  images: {
    domains: ['source.unsplash.com'],
  },
}

module.exports = nextConfig
