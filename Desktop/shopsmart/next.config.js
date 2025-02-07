/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.escuelajs.co'
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com'
      }
    ],
    unoptimized: true
  }
};

module.exports = nextConfig;
