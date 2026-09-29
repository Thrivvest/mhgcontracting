import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async redirects() {
    return [
      // One host: www 308s to the apex (standard 1.5).
      { source: "/:path*", has: [{ type: "host", value: "www.mhgcon.com" }], destination: "https://mhgcon.com/:path*", permanent: true },
      // Retired URLs (standard 1.5). Consolidation 2026-09-28: blog posts that
      // were a second page on the same topic, merged into the one guide.
      { source: "/blog/5-things-to-consider-before-kitchen-renovation", destination: "/blog/kitchen-remodel-cost", permanent: true },
      { source: "/blog/kitchen-renovation-cost-breakdown", destination: "/blog/kitchen-remodel-cost", permanent: true },
      { source: "/blog/how-long-does-bathroom-remodel-take", destination: "/blog/kitchen-renovation-timeline-nj", permanent: true },
      { source: "/blog/choosing-the-right-contractor", destination: "/blog/choosing-a-contractor", permanent: true },
      { source: "/blog/basement-finishing-guide-central-nj", destination: "/blog/basement-finishing-cost", permanent: true },
      { source: "/blog/bathroom-remodel-cost-nj", destination: "/blog/bathroom-remodel-cost", permanent: true },
      { source: "/blog/bathroom-remodel-ideas-nj", destination: "/blog/bathroom-ideas", permanent: true },
      { source: "/blog/basement-ideas", destination: "/blog/basement-finishing-ideas", permanent: true },
      { source: "/blog/kitchen-timeline", destination: "/blog/kitchen-renovation-timeline-nj", permanent: true },
      { source: "/blog/remodel-roi", destination: "/blog/home-remodeling-cost-hamilton-nj", permanent: true },
      { source: "/blog/why-we-love-what-we-do", destination: "/about", permanent: true },
      { source: "/blog/luxury-kitchen-remodeling-nj", destination: "/blog/kitchen-remodel-cost", permanent: true },
      { source: "/blog/master-bathroom-remodel-nj", destination: "/blog/bathroom-remodel-cost", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
