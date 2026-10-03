import { NextRequest, NextResponse } from "next/server";
import {
  FOUNDER_SESSION_COOKIE,
  founderSessionClearCookieOptions,
  requestHasSameOrigin,
} from "@/app/jarvis/founderAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!requestHasSameOrigin(request)) {
    return NextResponse.json(
      { ok: false, error: "invalid_request" },
      { status: 403, headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(FOUNDER_SESSION_COOKIE, "", founderSessionClearCookieOptions());
  response.headers.set("Cache-Control", "no-store, max-age=0");
  return response;
}
