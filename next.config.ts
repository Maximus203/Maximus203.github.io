import type { NextConfig } from 'next';

const isStaticExport = process.env.NEXT_OUTPUT === 'export';
const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || undefined;

const nextConfig: NextConfig = {
  output: isStaticExport ? 'export' : undefined,
  assetPrefix,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
