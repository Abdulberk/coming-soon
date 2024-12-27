/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.esimtime.com', 'do23ht5tkvefc.cloudfront.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.esimtime.com',
      },
      {
        protocol: 'https',
        hostname: 'do23ht5tkvefc.cloudfront.net',
      },
    ],
  },
};

export default nextConfig;