import type { NextConfig } from "next";

const serverUrl = process.env.NEXT_PUBLIC_IMAGE_SERVER!;

if (!serverUrl) {
  console.warn('NEXT_PUBLIC_IMAGE_SERVER environment variable is not set');
}

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.techvibeglobal.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-711741862ad043e18c1903cacbb7f64d.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
    // Optional: Add these for better error handling
    domains: ['files.techvibeglobal.com', "pub-711741862ad043e18c1903cacbb7f64d.r2.dev"],
  },
};

export default nextConfig;