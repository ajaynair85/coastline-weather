import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/beaches/pacifica-state-beach",
        destination: "/pacifica",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/pacifica",
        destination: "/beaches/pacifica-state-beach",
      },
    ];
  },
};

export default nextConfig;
