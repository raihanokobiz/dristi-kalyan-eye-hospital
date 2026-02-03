import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8001",
        pathname: "/api/v1/public/uploads/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "https://dristi-kalyan-eye-hospital-r3t8.vercel.app",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
