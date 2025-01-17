import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://backend:3000/api/v1/:path*",
      },
    ];
  },
  /* 他の config オプションをここに追加 */
};

export default nextConfig;
