import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*", // ✅ trailing slash 제거
        destination:
          "https://port-0-word-wise-dk-m78s70fc7c5822ef.sel4.cloudtype.app/api/v1/:path*", // ✅ 정확한 경로 지정
      },
    ];
  },
};

export default nextConfig;
