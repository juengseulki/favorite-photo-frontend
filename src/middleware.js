import { NextResponse } from "next/server";

const PROTECTED_PATHS = ["/my-gallery", "/my-shop", "/cards/create"];
const AUTH_PATHS = ["/login", "/signup"];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const hasRefreshToken = request.cookies.has("refreshToken");

  // 로그인 상태에서 인증 페이지 접근 → 홈으로
  if (AUTH_PATHS.includes(pathname) && hasRefreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 비로그인 상태에서 보호된 페이지 접근 → 회원가입으로
  const isProtected = PROTECTED_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));
  if (isProtected && !hasRefreshToken) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/my-gallery/:path*", "/my-shop/:path*", "/cards/create"],
};
