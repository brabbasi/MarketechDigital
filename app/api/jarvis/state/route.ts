import { NextResponse } from "next/server";
import { demoJarvisState, type JarvisState } from "../../../jarvis/jarvisState";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function isJarvisState(value: unknown): value is JarvisState {
  if (!value || typeof value !== "object") return false;
  const state = value as Partial<JarvisState>;
  return (
    state.schemaVersion === 1 &&
    state.authority === "read_only" &&
    Array.isArray(state.agents) &&
    Array.isArray(state.projects) &&
    state.projects.every(project =>
      !!project &&
      typeof project.id === "string" &&
      typeof project.objective === "string" &&
      typeof project.now === "string" &&
      typeof project.next === "string" &&
      typeof project.lastUpdate === "string" &&
      Array.isArray(project.agentIds) &&
      Array.isArray(project.assignments) &&
      project.assignments.every(assignment =>
        !!assignment &&
        typeof assignment.agentId === "string" &&
        ["Primary","Assist","Specialist","Reviewer","Observer","Shadow"].includes(assignment.role)
      )
    ) &&
    Array.isArray(state.tasks) &&
    state.tasks.every(task => !!task && typeof task.id === "string" && typeof task.projectId === "string") &&
    !!state.revenue &&
    !!state.finishChain
  );
}

export async function GET() {
  const mirrorUrl = process.env.JARVIS_MIRROR_URL?.trim();
  const mirrorToken = process.env.JARVIS_MIRROR_READ_TOKEN?.trim();
  const demoAllowed =
    process.env.JARVIS_DEMO_MODE === "1" ||
    process.env.VERCEL_ENV !== "production";

  if (mirrorUrl && mirrorToken) {
    try {
      const response = await fetch(mirrorUrl, {
        cache: "no-store",
        headers: {
          authorization: `Bearer ${mirrorToken}`,
          accept: "application/json",
          "user-agent": "marketech-jarvis-founder-portal/1",
        },
      });

      if (!response.ok) {
        return NextResponse.json(
          {
            status: "unavailable",
            source: "mirror",
            reason: `mirror_http_${response.status}`,
          },
          {
            status: 503,
            headers: { "cache-control": "no-store" },
          },
        );
      }

      const payload: unknown = await response.json();
      if (!isJarvisState(payload) || payload.source !== "mirror") {
        return NextResponse.json(
          {
            status: "unavailable",
            source: "mirror",
            reason: "invalid_mirror_contract",
          },
          {
            status: 503,
            headers: { "cache-control": "no-store" },
          },
        );
      }

      return NextResponse.json(payload, {
        status: 200,
        headers: {
          "cache-control": "no-store",
          "x-jarvis-source": "mirror",
        },
      });
    } catch {
      return NextResponse.json(
        {
          status: "unavailable",
          source: "mirror",
          reason: "mirror_fetch_failed",
        },
        {
          status: 503,
          headers: { "cache-control": "no-store" },
        },
      );
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
