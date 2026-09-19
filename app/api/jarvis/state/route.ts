import { NextResponse } from "next/server";
import { demoJarvisState } from "../../../jarvis/jarvisState";
import { adaptTrustedControlPlaneSnapshot } from "../../../jarvis/trustedMirror";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function maxMirrorAgeSeconds(): number {
  const raw = Number.parseInt(process.env.JARVIS_MIRROR_MAX_AGE_SECONDS ?? "600", 10);
  if (!Number.isFinite(raw)) return 600;
  return Math.min(Math.max(raw, 30), 3600);
}

function mirrorUrlAllowed(value: string): boolean {
  try {
    const parsed = new URL(value);
    if (process.env.VERCEL_ENV === "production") return parsed.protocol === "https:";
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function unavailable(reason: string) {
  return NextResponse.json(
    {
      status: "unavailable",
      source: "mirror",
      reason,
    },
    {
      status: 503,
      headers: { "cache-control": "no-store" },
    },
  );
}

export async function GET() {
  const mirrorUrl = process.env.JARVIS_MIRROR_URL?.trim();
  const mirrorToken = process.env.JARVIS_MIRROR_READ_TOKEN?.trim();
  const demoAllowed =
    process.env.JARVIS_DEMO_MODE === "1" ||
    process.env.VERCEL_ENV !== "production";

  if (mirrorUrl || mirrorToken) {
    if (!mirrorUrl || !mirrorToken) {
      return unavailable("mirror_configuration_incomplete");
    }
    if (!mirrorUrlAllowed(mirrorUrl)) {
      return unavailable("mirror_url_not_allowed");
    }

    try {
      const response = await fetch(mirrorUrl, {
        cache: "no-store",
        redirect: "error",
        headers: {
          authorization: `Bearer ${mirrorToken}`,
          accept: "application/json",
          "user-agent": "marketech-jarvis-founder-portal/1",
        },
      });

      if (!response.ok) {
        return unavailable(`mirror_http_${response.status}`);
      }

      const payload: unknown = await response.json();
      const maxAgeSeconds = maxMirrorAgeSeconds();
      let normalized;

      try {
        normalized = adaptTrustedControlPlaneSnapshot(payload, { maxAgeSeconds });
      } catch (error) {
        const detail = error instanceof Error ? error.message : "";
        if (detail.includes("stale") || detail.includes("future")) {
          return unavailable("mirror_stale_or_clock_invalid");
        }
        return unavailable("invalid_mirror_contract");
      }

      return NextResponse.json(normalized, {
        status: 200,
        headers: {
          "cache-control": "no-store",
          "x-jarvis-source": "mirror",
          "x-jarvis-generated-at": normalized.generatedAt,
          "x-jarvis-mirror-contract": normalized.mirror?.contract ?? "jarvis-state-v1",
        },
      });
    } catch {
      return unavailable("mirror_fetch_failed");
    }
  }

  if (!demoAllowed) {
    return NextResponse.json(
      {
        status: "unavailable",
        source: "none",
        reason: "jarvis_mirror_not_configured",
      },
      {
        status: 503,
        headers: { "cache-control": "no-store" },
      },
    );
  }

  return NextResponse.json(
    {
      ...demoJarvisState,
      generatedAt: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        "cache-control": "no-store",
        "x-jarvis-source": "demo",
      },
    },
  );
}
