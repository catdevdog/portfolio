import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // React Strict Mode 활성화
  compiler: {
    styledComponents: true, // Styled-Components SWC 플러그인 활성화
  },
};

export default nextConfig;
