/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
    ],
  },

  async rewrites() {
    const BE = "http://localhost:5000";
    // /api/me/sales 와 /api/sales/:saleId 는 로컬 mock 핸들러가 처리하므로 제외
    return [
      { source: "/api/auth/:path*",               destination: `${BE}/api/auth/:path*` },
      { source: "/api/cards/:path*",              destination: `${BE}/api/cards/:path*` },
      { source: "/api/market/:path*",             destination: `${BE}/api/market/:path*` },
      { source: "/api/me/cards",                  destination: `${BE}/api/me/cards` },
      { source: "/api/me/cards/:path*",           destination: `${BE}/api/me/cards/:path*` },
      { source: "/api/exchange-proposals/:path*", destination: `${BE}/api/exchange-proposals/:path*` },
      { source: "/api/notifications/:path*",      destination: `${BE}/api/notifications/:path*` },
      { source: "/api/points/:path*",             destination: `${BE}/api/points/:path*` },
      { source: "/api/upload/:path*",             destination: `${BE}/api/upload/:path*` },
    ];
  },
};

export default nextConfig;
