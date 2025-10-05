import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eumjdnjpfdcwioxzkisy.supabase.co",
        pathname: "/storage/v1/object/public/category_media_url/**",
      },
    ],
  },
};

export default nextConfig;
