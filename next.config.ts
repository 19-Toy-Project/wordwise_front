import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*", // ✅ trailing slash 제거
        destination: "http://localhost:8080/api/v1/:path*", // ✅ 정확한 경로 지정
      },
    ];
  },
};

export default nextConfig;
