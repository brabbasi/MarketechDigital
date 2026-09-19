import { test, expect } from "@playwright/test";

test.describe("JARVIS Founder Portal", () => {
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
    expect(payload.projects.length).toBeGreaterThanOrEqual(6);
    expect(payload.tasks.length).toBeGreaterThanOrEqual(6);
    expect(payload.revenue.outboundHeld).toBe(true);
  });

  test("desktop cockpit stays compact and makes project-to-agent focus obvious", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium");

    await page.goto("/jarvis");
    await expect(page.getByText("Agent Constellation")).toBeVisible();
    await expect(page.locator(".ai-launcher")).toHaveCount(0);
    await expect(page.getByText("PROJECT UNIVERSE")).toBeVisible();
    await expect(page.getByTestId("approvals-title")).toBeVisible();
    await expect(page.getByTestId("read-model-status")).toContainText("READ MODEL");

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

  test("mobile keeps core Founder actions understandable", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-chromium");

    await page.goto("/jarvis");
    await expect(page.getByText("PROJECT UNIVERSE")).toBeVisible();
    await expect(page.getByText("Agent Constellation")).toBeVisible();
    await expect(page.getByTestId("approvals-title")).toBeVisible();
    await expect(page.getByText("ASK JARVIS")).toBeVisible();
    await expect(page.locator(".ai-launcher")).toHaveCount(0);

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2);

    const sceneBox = await page.getByTestId("agent-scene").boundingBox();
    const horizonBox = await page.getByTestId("task-horizon").boundingBox();
    expect(sceneBox).not.toBeNull();
    expect(horizonBox).not.toBeNull();
    expect(horizonBox!.y).toBeGreaterThanOrEqual(sceneBox!.y + sceneBox!.height - 2);

    await page.screenshot({ path: "artifacts/jarvis-mobile.png", fullPage: true });
  });
});
