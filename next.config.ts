import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // リポジトリ名を指定することで、画像やリンクのパスを正しく通します
  basePath: '/urawa-higashikishi-hp',
  assetPrefix: '/urawa-higashikishi-hp',
};

export default nextConfig;
