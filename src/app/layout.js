import QueryProvider from "@/providers/QueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import Header from "@/components/layout/Header";
import "./globals.css";
import RandomPoint from "@/components/common/RandomPoint.jsx";
import RandomPointModalGate from "@/features/point/components/RandomPointModalGate";
import ToastProvider from "@/providers/ToastProvider";
import { Suspense } from "react";
import ScrollToTop from "@/components/common/ScrollToTop";

export const metadata = {
  title: "최애의 포토",
  description: "나만의 포토카드 거래 플랫폼",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <QueryProvider>
          <ScrollToTop />
          <AuthProvider>
            <ToastProvider />
            <Header />
            <Suspense fallback={null}>
              <RandomPointModalGate />
            </Suspense>
            <main className="min-h-[calc(100vh-128px)]">{children}</main>
            <RandomPoint />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
