import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "cdn.xanhsm.com" },
      { protocol: "https", hostname: "ticotravel.com.vn" },
      { protocol: "https", hostname: "gabygolf.com" },
      { protocol: "https", hostname: "nicklausdesign.com" },
      { protocol: "https", hostname: "img.tripi.vn" },
      { protocol: "https", hostname: "elinkgolf.vn" },
      { protocol: "https", hostname: "sangolf.vn" },
      { protocol: "https", hostname: "alegolf.com" },
      { protocol: "https", hostname: "golfgroup.com.vn" },
      { protocol: "https", hostname: "bizweb.dktcdn.net" },
    ],
  },
};

export default nextConfig;
