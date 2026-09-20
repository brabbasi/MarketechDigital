import { test, expect } from "@playwright/test";
import { adaptTrustedControlPlaneSnapshot, jarvisStateEndpointEnabled } from "../app/jarvis/trustedMirror";

test.describe("JARVIS Founder Portal", () => {

  test("production state endpoint requires a verified Founder session", () => {
    expect(jarvisStateEndpointEnabled("production", false)).toBe(false);
    expect(jarvisStateEndpointEnabled("production", true)).toBe(true);
    expect(jarvisStateEndpointEnabled("preview", false)).toBe(true);
    expect(jarvisStateEndpointEnabled(undefined, false)).toBe(true);
  });

  test("trusted control-plane mirror adapter is freshness and authority bound", async () => {
    const nowMs = Date.parse("2026-09-19T19:45:00Z");
    const fixture = {
      schema_version: 1,
      source: "trusted-github-control-plane-sync-v1",
      generated_at: "2026-09-19T19:44:30Z",
      repository: "brabbasi/Marketech_Digital_OS",
      authority: {
        github_read_only: true,
        github_mutation_authorized: false,
        runtime_write_authorized: false,
        founder_decision_authorized: false,
        outbound_authorized: false,
        spend_authorized: false,
      },
      projects: [
        {
          repository: "brabbasi/Marketech_Digital_OS",
          present: true,
          archived: false,
          default_branch: "main",
          head_sha: "a".repeat(40),
          head_committed_at: "2026-09-19T19:40:00Z",
          open_pr_count: 1,
          open_prs: [{ number: 66, title: "Trusted Machine Bridge", head_sha: "b".repeat(40) }],
        },
        ...[
          "brabbasi/MarketechDigital",
          "brabbasi/Rangrez",
          "brabbasi/deutschpath-ai",
          "brabbasi/axiom-market-intelligence",
          "brabbasi/Tradepilot",
          "brabbasi/Basit-Portfolio",
          "brabbasi/veilbound-shadows-origin",
        ].map((repository, index) => ({
          repository,
          present: true,
          archived: false,
          default_branch: "main",
          head_sha: String(index + 1).repeat(40),
          head_committed_at: "2026-09-19T19:40:00Z",
          open_pr_count: 0,
          open_prs: [],
        })),
      ],
      workforce: {
        source_ref: "canonical-org",
        source_sha: "c".repeat(40),
        workers: [{ id: "ai-reviewer", role: "Independent AI Reviewer", department: "independent_assurance" }],
      },
      company: {
        active_work: [{
          id: "portal",
          title: "Founder portal mirror binding",
          status: "RUNNING",
          owner: "Engineering",
          next_action: "Validate exact mirror contract",
        }],
      },
      revenue: {
        qualified_prospects: 48,
        draft_ready_pending_review: 12,
        independently_reviewed_send_ready: 36,
        founder_approved_sends: 17,
        outreach_sent: 11,
        replies: 0,
        meetings: 0,
        contracted_revenue_cad: 0,
        collected_revenue_cad: 0,
      },
      finish_chain: {
        bridge: { pr: 66, title: "Trusted Bridge", status: "NEEDS FOUNDER", status_reason: "Exact-head review passed", head_sha: "1".repeat(40), needs_founder: true },
        reviewer: { pr: 46, title: "Independent Reviewer", status: "QUEUED · BOOTSTRAP REVIEW", status_reason: "Waiting on bridge", head_sha: "2".repeat(40), needs_founder: false },
        runtime: { pr: 40, title: "Runtime", status: "QUEUED · REVIEW PENDING", status_reason: "Waiting on reviewer", head_sha: "3".repeat(40), needs_founder: false },
        autonomy: { pr: 80, title: "Autonomy", status: "QUEUED · REVIEW PENDING", status_reason: "Waiting on runtime", head_sha: "4".repeat(40), needs_founder: false },
      },
    };

    const state = adaptTrustedControlPlaneSnapshot(fixture, { nowMs, maxAgeSeconds: 600 });
    expect(state.source).toBe("mirror");
    expect(state.mirror?.authoritySafe).toBe(true);
    expect(state.mirror?.ageSeconds).toBe(30);
    const jarvis = state.projects.find(project => project.id === "jarvis");
    expect(jarvis?.progressKnown).toBe(false);
    expect(jarvis?.state).toBe("unknown");
    expect(jarvis?.now).toContain("main@aaaaaaaaaa");
    expect(state.tasks.find(task => task.id === "finish-bridge")?.state).toBe("founder");
    expect(state.agents.find(agent => agent.id === "reviewer")?.state).toBe("review");
    expect(state.agents.find(agent => agent.id === "engineering")?.state).toBe("unknown");

    expect(() => adaptTrustedControlPlaneSnapshot(
      { ...fixture, generated_at: "2026-09-19T19:20:00Z" },
      { nowMs, maxAgeSeconds: 600 },
    )).toThrow(/stale/);

    expect(() => adaptTrustedControlPlaneSnapshot(
      {
        ...fixture,
        authority: { ...fixture.authority, github_mutation_authorized: true },
      },
      { nowMs, maxAgeSeconds: 600 },
    )).toThrow(/authority/);

    const { autonomy: _removedAutonomy, ...partialFinishChain } = fixture.finish_chain;
    expect(() => adaptTrustedControlPlaneSnapshot(
      { ...fixture, finish_chain: partialFinishChain },
      { nowMs, maxAgeSeconds: 600 },
    )).toThrow(/finish chain autonomy/);

    expect(() => adaptTrustedControlPlaneSnapshot(
      { ...fixture, projects: fixture.projects.slice(0, -1) },
      { nowMs, maxAgeSeconds: 600 },
    )).toThrow(/project catalog incomplete/);
  });

  test("read model is explicit, read-only and structurally complete", async ({ request }) => {
    const response = await request.get("/api/jarvis/state");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["cache-control"]).toContain("no-store");
    expect(response.headers()["x-jarvis-source"]).toBe("demo");

    const payload = await response.json();
    expect(payload.schemaVersion).toBe(1);
    expect(payload.source).toBe("demo");
    expect(payload.authority).toBe("read_only");
    expect(payload.agents.length).toBeGreaterThanOrEqual(8);
    expect(payload.projects.length).toBeGreaterThanOrEqual(10);
    expect(payload.projects.every((project: { objective?: string; next?: string; assignments?: unknown[] }) => project.objective && project.next && Array.isArray(project.assignments))).toBe(true);
    expect(payload.tasks.length).toBeGreaterThanOrEqual(6);
    expect(payload.revenue.outboundHeld).toBe(true);
    expect(payload.revenue.qualifiedProspects).toBe(60);
    expect(payload.revenue.pendingIndependentReview).toBe(24);
    expect(payload.portal?.buildSha).toBeTruthy();
    expect(payload.portal?.environment).toBeTruthy();
  });

  test("Founder login remains staged and fail-closed in preview QA", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium");

    await page.goto("/jarvis/login");
    await expect(page.getByRole("heading", { name: "Founder authentication" })).toBeVisible();
    await expect(page.getByTestId("founder-auth-status")).toContainText("staged but not activated");
    await expect(page.getByRole("button", { name: "Verify Founder" })).toBeDisabled();
  });

  test("unavailable read model hides sample company state", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium");

    await page.route("**/api/jarvis/state", async route => {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ status: "unavailable", source: "mirror", reason: "qa_forced_unavailable" }),
      });
    });

    await page.goto("/jarvis");
    await expect(page.getByTestId("read-model-gate")).toBeVisible();
    await expect(page.getByText("JARVIS will not show demo data as live state.")).toBeVisible();
    await expect(page.getByText("Agent Constellation")).toHaveCount(0);
    await expect(page.getByTestId("project-rangrez")).toHaveCount(0);
    await expect(page.getByTestId("read-model-status")).toContainText("UNAVAILABLE");
    await page.screenshot({ path: "artifacts/jarvis-read-model-unavailable.png", fullPage: true });
  });

  test("desktop cockpit stays compact and makes project-to-agent focus obvious", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium");

    await page.goto("/jarvis");
    await expect(page.getByText("Agent Constellation")).toBeVisible();
    await expect(page.getByTestId("founder-truth-strip")).toBeVisible();
    await expect(page.getByTestId("founder-truth-strip")).toContainText("REVIEW QUEUE");
    await expect(page.getByTestId("founder-truth-strip")).toContainText("CI BLOCKERS");
    await expect(page.getByTestId("founder-truth-strip")).toContainText("GATED");
    await expect(page.locator(".ai-launcher")).toHaveCount(0);
    await expect(page.getByText("PROJECT UNIVERSE")).toBeVisible();
    await expect(page.getByTestId("approvals-title")).toBeVisible();
    await expect(page.getByTestId("read-model-status")).toContainText("READ MODEL");
    await expect(page.getByTestId("portal-build")).toContainText("BUILD");
    await expect(page.getByTestId("portal-build")).toContainText("5S REFRESH");

    const layout = await page.evaluate(() => ({
      scrollHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
      publicHeaderPresent: !!document.querySelector(".standard-page-header-shell"),
      bodyOverflowX: getComputedStyle(document.body).overflowX,
    }));
    expect(layout.publicHeaderPresent).toBe(false);
    expect(layout.scrollHeight).toBeLessThanOrEqual(layout.viewportHeight + 16);
    expect(layout.bodyOverflowX).not.toBe("scroll");

    await page.getByTestId("project-rangrez").click();
    await expect(page.getByText("Rangrez", { exact: true }).last()).toBeVisible();
    await expect(page.getByTestId("project-worklane")).toContainText("Product head frozen; normal CI and a separate one-step hosted-runner probe both fail before step 1");
    await expect(page.getByTestId("project-worklane")).toContainText("NEXT");
    await expect(page.getByTestId("project-worklane")).toContainText("Primary");
    await expect(page.getByTestId("project-worklane")).toContainText("Reviewer");

    const relatedCount = await page.locator('button[data-testid^="agent-"][data-assigned="true"]').count();
    const unrelatedCount = await page.locator('button[data-testid^="agent-"][data-assigned="false"]').count();
    expect(relatedCount).toBeGreaterThan(0);
    expect(unrelatedCount).toBeGreaterThan(0);

    await page.screenshot({ path: "artifacts/jarvis-desktop-rangrez.png", fullPage: true });
  });

  test("agent inspector exposes worker, skill and history layers", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium");

    await page.goto("/jarvis");
    await page.getByTestId("agent-engineering").click();

    await expect(page.getByText("AGENT INSPECTOR")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Workers" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Skills" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Recent agent history" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Project roles" })).toBeVisible();
    await expect(page.getByText("Codebase Memory")).toBeVisible();

    await page.screenshot({ path: "artifacts/jarvis-agent-inspector.png", fullPage: true });
  });

  test("dragging an agent to a project requests bounded assignment instead of mutating silently", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium");

    await page.goto("/jarvis");
    const source = page.getByTestId("agent-marketing");
    const target = page.getByTestId("project-rangrez");
    await source.dragTo(target);

    await expect(page.getByText("ASSIGN AGENT")).toBeVisible();
    await expect(page.getByText("Scope validation")).toBeVisible();
    await expect(page.getByText(/No new production, financial or credential authority/)).toBeVisible();
    await expect(page.getByRole("button", { name: "Assign preview" })).toBeVisible();
  });

  test("mobile uses focused Founder tabs instead of stacking the desktop cockpit", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-chromium");

    await page.goto("/jarvis");
    await expect(page.getByTestId("mobile-nav")).toBeVisible();
    await expect(page.getByTestId("mobile-home")).toBeVisible();
    await expect(page.getByText("FOUNDER SNAPSHOT")).toBeVisible();
    await expect(page.getByTestId("mobile-home").getByText("NEEDS YOU", { exact: true })).toBeVisible();
    await expect(page.getByTestId("mobile-home").getByText("ASK JARVIS", { exact: true })).toBeVisible();
    await expect(page.getByText("Agent Constellation")).toBeHidden();
    await expect(page.locator(".ai-launcher")).toHaveCount(0);

    const homeLayout = await page.evaluate(() => ({
      bodyWidth: document.body.scrollWidth,
      viewportWidth: window.innerWidth,
      scrollHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
    }));
    expect(homeLayout.bodyWidth).toBeLessThanOrEqual(homeLayout.viewportWidth + 2);
    expect(homeLayout.scrollHeight).toBeLessThanOrEqual(homeLayout.viewportHeight * 1.8);

    await page.getByRole("button", { name: "Projects", exact: true }).click();
    await expect(page.getByTestId("mobile-projects")).toBeVisible();
    await expect(page.getByTestId("mobile-project-rangrez")).toBeVisible();

    await page.getByRole("button", { name: "Agents", exact: true }).click();
    await expect(page.getByTestId("mobile-agents")).toBeVisible();
    await expect(page.getByTestId("mobile-list-agent-engineering")).toBeVisible();

    await page.getByRole("button", { name: "Tasks", exact: true }).click();
    await expect(page.getByTestId("mobile-tasks")).toBeVisible();
    await expect(page.getByText("MISSION HORIZON")).toBeVisible();

    await page.getByRole("button", { name: "Approvals", exact: true }).click();
    await expect(page.getByTestId("mobile-approvals")).toBeVisible();

    await page.getByRole("button", { name: "History", exact: true }).click();
    await expect(page.getByTestId("mobile-history")).toBeVisible();

    await page.getByRole("button", { name: "JARVIS", exact: true }).click();
    await expect(page.getByTestId("mobile-home")).toBeVisible();
    await page.screenshot({ path: "artifacts/jarvis-mobile.png", fullPage: true });
  });
});
