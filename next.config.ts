import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployment
  output: "standalone",

  // ✅ MOVED from experimental → top-level
  serverExternalPackages: [],

  // Environment variables available at build time
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // Image optimization
  images: {
    domains: ["localhost"],
    unoptimized: process.env.NODE_ENV === "development",
  },

  // Disable telemetry
  telemetry: false,
};

export default nextConfig;

