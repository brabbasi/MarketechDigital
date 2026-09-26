import { NextRequest, NextResponse } from "next/server";
import {
  FOUNDER_SESSION_COOKIE,
  founderAuthConfigured,
  founderAuthEnabled,
  verifyFounderSessionToken,
} from "@/app/jarvis/founderAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const enabled = founderAuthEnabled();
  const configured = founderAuthConfigured();
  const token = request.cookies.get(FOUNDER_SESSION_COOKIE)?.value;
  const authenticated = enabled && configured
    ? await verifyFounderSessionToken(token)
    : false;
  return NextResponse.json(
    { enabled, configured, authenticated },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "X-Robots-Tag": "noindex",
      },
    },
  );
}
