import type { NextConfig } from "next";

const nextConfig: NextConfig = {
eslint: {
    ignoreDuringBuilds: true,
  },
  images:{
    remotePatterns:[new URL('https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]
  }
};

export default nextConfig;
