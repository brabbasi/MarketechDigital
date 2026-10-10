import { NextRequest, NextResponse } from "next/server";
import {
  mirrorIngestEnabled,
  mirrorStoreConfigured,
  mirrorWriteSecret,
  readRequestBodyBounded,
  validateMirrorIngestEnvelope,
} from "../../../jarvis/mirrorIngest";
import { writeTrustedMirrorBlob } from "../../../jarvis/mirrorStore";
import { adaptTrustedControlPlaneSnapshot } from "../../../jarvis/trustedMirror";

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

function rejected() {
  return NextResponse.json(
    { status: "rejected", reason: "mirror_request_rejected" },
    {
      status: 403,
      headers: {
        "cache-control": "no-store",
        "x-robots-tag": "noindex",
      },
    },
  );
}

export async function POST(request: NextRequest) {
  if (!mirrorIngestEnabled()) {
    return unavailable("mirror_ingest_not_active");
  }
  if (!mirrorStoreConfigured()) {
    return unavailable("mirror_store_not_configured");
  }
  const secret = mirrorWriteSecret();
  if (!secret) {
    return unavailable("mirror_write_secret_not_configured");
  }

  try {
    const body = await readRequestBodyBounded(request);
    const envelope = validateMirrorIngestEnvelope(body, request.headers, secret);
    const payload: unknown = JSON.parse(new TextDecoder().decode(body));

    // Reuse the exact read-side contract before persistence. This rejects stale,
    // malformed or authority-widened snapshots before private storage is touched.
    adaptTrustedControlPlaneSnapshot(payload, { maxAgeSeconds: 600 });

    const stored = await writeTrustedMirrorBlob(body, envelope.contentSha256);
    return NextResponse.json(
      {
        accepted: true,
        content_sha256: stored.contentSha256,
        unchanged: stored.unchanged,
      },
      {
        status: 200,
        headers: {
          "cache-control": "no-store",
          "x-robots-tag": "noindex",
        },
      },
    );
  } catch {
    return rejected();
  }
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
