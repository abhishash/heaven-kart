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
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
    ASSET_ENDPOINS : process.env.ASSET_ENDPOINS,
    NEXTAUTH_URL : process.env.NEXTAUTH_URL
}
};

export default nextConfig;
