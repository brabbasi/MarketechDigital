import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Legacy endpoint intentionally retired by inbound acquisition v1.
 *
 * Keeping a hard 410 here prevents old or duplicated client code from retaining
 * a second public email-sending path. All active website inquiry surfaces must
 * use /api/inquiry, which carries stable submission identity, attribution,
 * same-origin checks, abuse controls and provider idempotency.
 */
export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      mode: "legacy_endpoint_retired",
      error: "This inquiry endpoint has been retired. Please use the current contact form."
    },
    {
      status: 410,
      headers: { "Cache-Control": "no-store" }
    }
  );
}
