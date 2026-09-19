import { NextRequest, NextResponse } from "next/server";
import {
  FOUNDER_SESSION_COOKIE,
  createFounderSessionToken,
  founderAuthConfigured,
  founderAuthEnabled,
  founderSessionCookieOptions,
  requestHasSameOrigin,
  verifyFounderCredentials,
} from "@/app/jarvis/founderAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function noStore(response: NextResponse) {
  response.headers.set("Cache-Control", "no-store, max-age=0");
  response.headers.set("X-Robots-Tag", "noindex");
  return response;
}

export async function POST(request: NextRequest) {
  if (!founderAuthEnabled()) {
    return noStore(NextResponse.json(
      { ok: false, error: "founder_auth_not_active" },
      { status: 503 },
    ));
  }
  if (!founderAuthConfigured()) {
    return noStore(NextResponse.json(
      { ok: false, error: "founder_auth_not_configured" },
      { status: 503 },
    ));
  }
  if (!requestHasSameOrigin(request)) {
    return noStore(NextResponse.json(
      { ok: false, error: "invalid_request" },
      { status: 403 },
    ));
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return noStore(NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 }));
  }
  if (!body || typeof body !== "object") {
    return noStore(NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 }));
  }

  const record = body as Record<string, unknown>;
  const password = typeof record.password === "string" ? record.password : "";
  const code = typeof record.code === "string" ? record.code.replace(/\s/g, "") : "";
  const verified = await verifyFounderCredentials(password, code);
  if (!verified) {
    return noStore(NextResponse.json(
      { ok: false, error: "invalid_credentials" },
      { status: 401 },
    ));
  }

  const token = await createFounderSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(FOUNDER_SESSION_COOKIE, token, founderSessionCookieOptions());
  return noStore(response);
}
