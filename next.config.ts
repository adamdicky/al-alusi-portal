import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['apkeqsxxyrlsariwtaow.supabase.co'],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apkeqsxxyrlsariwtaow.supabase.co',
        pathname: '/storage/v1/object/public/**'
      },
    ],
  },
  
};

module.exports = nextConfig;
