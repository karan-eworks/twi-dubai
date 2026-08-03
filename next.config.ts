import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
 images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.woolwich.ac.ae",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "woolwich.ac.ae",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/w80/**",
      },
    ],
  },
  
};

export default nextConfig;
