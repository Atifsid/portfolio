import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // 90 keeps the small UI text in the JobsFlow screenshots legible.
    qualities: [75, 90],
  },
  devIndicators: false,
};

export default nextConfig;
