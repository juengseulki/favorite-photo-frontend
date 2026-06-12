/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },

  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      // 로컬 백엔드
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },

      // Render 백엔드
      {
        protocol: "https",
        hostname: "favorite-photo-backend.onrender.com",
        pathname: "/uploads/**",
      },

      // 테스트 이미지
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
