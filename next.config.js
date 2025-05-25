/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for better performance
  output: 'standalone',
  // Strict mode for better development
  reactStrictMode: true,
  // Disable server-side image optimization as we don't use it
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig; 