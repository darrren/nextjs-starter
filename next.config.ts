import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.EXPORT === 'true' ? 'export' : undefined,
  reactStrictMode: true,
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  distDir: `out/${process.env.NEXT_PUBLIC_BASE_PATH}`,
};

export default nextConfig;

