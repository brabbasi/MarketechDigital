import { NextRequest, NextResponse } from "next/server";
import {
  mirrorIngestEnabled,
  mirrorStoreConfigured,
} from "../../../jarvis/mirrorIngest";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function unavailable(reason: string) {
  return NextResponse.json(
    { status: "unavailable", reason },
    {
      status: 503,
      headers: {
        "cache-control": "no-store",
        "x-robots-tag": "noindex",
      },
    },
  );
}

export async function POST(_request: NextRequest) {
  if (!mirrorIngestEnabled()) {
    return unavailable("mirror_ingest_not_active");
  }
  if (!mirrorStoreConfigured()) {
    return unavailable("mirror_store_not_configured");
  }

  // Storage is deliberately not implemented until a Marketech-owned
  // private mirror backend is selected, reviewed, and configured.
  return unavailable("mirror_store_driver_not_implemented");
}

export async function GET() {
  return NextResponse.json(
    {
      status: "unavailable",
      reason: mirrorIngestEnabled()
        ? "mirror_ingest_write_only"
        : "mirror_ingest_not_active",
    },
    {
      status: 503,
      headers: {
        "cache-control": "no-store",
        "x-robots-tag": "noindex",
      },
    },
  );
}
