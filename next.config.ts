import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/growth", destination: "/growth.html" }];
  },
};

export default nextConfig;
