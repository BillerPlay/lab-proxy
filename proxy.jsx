import { NextResponse } from "next/server";

const COOKIE_NAME = "token";
const API_BASE = "http://localhost:8080";
const AUTH_ROUTE = "/auth";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(AUTH_ROUTE)) {
    const cookie = request.cookies.get(COOKIE_NAME);
    if (cookie) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  const cookie = request.cookies.get(COOKIE_NAME);
  if (!cookie) {
    return NextResponse.redirect(new URL(AUTH_ROUTE, request.url));
  }

  let user;
  try {
    const res = await fetch(`${API_BASE}/api/me`, {
      headers: {
        cookie: `${COOKIE_NAME}=${cookie.value}`,
      },
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL(AUTH_ROUTE, request.url));
    }

    user = await res.json();
  } catch {
    return NextResponse.redirect(new URL(AUTH_ROUTE, request.url));
  }

  // Role check: only ADMINs can reach /admin
  if (pathname.startsWith("/admin") && user?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/admin", "/admin/:path*", "/auth"],
};