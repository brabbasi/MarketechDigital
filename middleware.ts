import { NextRequest, NextResponse } from "next/server";
import {
  FOUNDER_SESSION_COOKIE,
  founderAuthConfigured,
  founderAuthEnabled,
  verifyFounderSessionToken,
} from "./app/jarvis/founderAuth";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/jarvis/login") ||
    pathname.startsWith("/api/jarvis/auth/") ||
    pathname === "/api/jarvis/state"
  ) {
    return NextResponse.next();
  }

  if (!pathname.startsWith("/jarvis")) return NextResponse.next();

  // Preview stays available behind Vercel Preview Protection for browser QA.
  // Production Founder access fails closed until application auth is explicitly enabled.
  if (process.env.VERCEL_ENV !== "production") return NextResponse.next();

  if (!founderAuthEnabled() || !founderAuthConfigured()) {
    const login = request.nextUrl.clone();
    login.pathname = "/jarvis/login";
    login.search = "reason=not_active";
    return NextResponse.redirect(login);
  }

  const token = request.cookies.get(FOUNDER_SESSION_COOKIE)?.value;
  if (!(await verifyFounderSessionToken(token))) {
    const login = request.nextUrl.clone();
    login.pathname = "/jarvis/login";
    login.search = "";
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/jarvis/:path*", "/api/jarvis/state"],
};
