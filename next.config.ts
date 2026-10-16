import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Local photography lives in /public/images. Remote patterns can be added
    // here when the brand's assets move to a CDN or CMS.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920, 2560],
  },
  /* Next writes AGENTS.md / CLAUDE.md into the project root by default. This
     project documents itself in README.md instead. */
  agentRules: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default nextConfig;
