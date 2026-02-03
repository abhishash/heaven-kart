import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows any hostname
        port: "",
        pathname: "/**", // Allows any pathname
      },
    ],
  },
};

export default nextConfig;
