import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "pap-snap-cast.b-cdn.net",
        port: "",
        protocol: "https",
        pathname: "/**"
      },
      {
        hostname: "lh3.googleusercontent.com",
        port: "",
        protocol: "https",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
