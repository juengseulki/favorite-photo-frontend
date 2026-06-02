import QueryProvider from "@/providers/QueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import Header from "@/components/layout/Header";
import "./globals.css";

export const metadata = {
  title: "최애의 포토",
  description: "나만의 포토카드 거래 플랫폼",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <QueryProvider>
          <AuthProvider>
            <Header />
            <main className="min-h-[calc(100vh-128px)]">{children}</main>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
