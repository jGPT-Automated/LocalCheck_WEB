import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel runs `next build`, which defaults to Turbopack in Next.js 16.
  // Explicitly opt in while retaining the optional webpack build below.
  turbopack: {},
  // The optional Workers import is resolved by Vite on Sites. On Node it
  // must stay external so the existing try/catch can use process.env.
  webpack(config, { isServer }) {
    if (isServer) {
      config.externals.push({ "cloudflare:workers": "commonjs cloudflare:workers" });
    }
    return config;
  },
};

export default nextConfig;
