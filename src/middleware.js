import { NextResponse } from "next/server";

const PROTECTED_PATHS = ["/my-gallery", "/my-shop", "/cards/create"];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));

  if (isProtected && !request.cookies.has("refreshToken")) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-gallery/:path*", "/my-shop/:path*", "/cards/create"],
};
