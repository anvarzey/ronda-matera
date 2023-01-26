/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com']
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'res.cloudinary.com',
    //     port: '',
    //     pathname: '/dfyxdowwb/image/upload/*'
    //   }
    // ]
  },
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig
