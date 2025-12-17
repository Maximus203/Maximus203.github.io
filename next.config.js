/** @type {import('next').NextConfig} */
const nextConfig = {
 output: 'export',
 trailingSlash: true,
 skipTrailingSlashRedirect: true,
 images: {
  unoptimized: true,
  formats: ['image/webp', 'image/avif'],
  remotePatterns: [
   {
    protocol: 'https',
    hostname: 'images.unsplash.com',
   },
  ],
 },
 experimental: {
  optimizeCss: true,
 },
 assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
 basePath: '',
 reactStrictMode: true,
 compiler: {
  removeConsole: process.env.NODE_ENV === 'production',
 },
 eslint: {
  dirs: ['app', 'components', 'lib', 'data'],
 },
 typescript: {
  tsconfigPath: './tsconfig.json',
 },
 poweredByHeader: false,
 generateEtags: false,
 compress: true,
}

module.exports = nextConfig