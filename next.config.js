/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // output: 'export',
  swcMinify: true,
  env: {
    BASE_URL : process.env.NEXT_PUBLIC_BASE_URL,
    BASE_URL_SERVER : process.env.NEXT_PUBLIC_BASE_URL_SERVER,
    API_BASE_URL : process.env.NEXT_PUBLIC_API_BASE_URL,
    GMAP_TOKEN : process.env.NEXT_PUBLIC_GMAP_AUTH,
    // NEXTAUTH_SECRET: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    // NEXTAUTH_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL
  },
  images: {
    unoptimized: true
  },
}

module.exports = nextConfig
