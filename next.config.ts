import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default nextConfig;
