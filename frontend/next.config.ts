import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/media",
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://backend:3000/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
