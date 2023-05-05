/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  pageExtensions: ["page.tsx", "page.ts", "api.tsx", "api.ts"],
  images: {
    domains: ["source.unsplash.com", "i.pravatar.cc"],
  },
};

module.exports = nextConfig;
