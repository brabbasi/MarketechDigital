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
    await expect(page.getByText("PROJECT UNIVERSE")).toBeVisible();
    await expect(page.getByText("NEEDS YOUR APPROVAL")).toBeVisible();
    await expect(page.getByText(/READ MODEL/)).toBeVisible();

    const initialHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    expect(initialHeight).toBeLessThanOrEqual(viewportHeight + 16);

    await page.getByRole("button", { name: /Rangrez/ }).click();
    await expect(page.getByText("Rangrez", { exact: true }).last()).toBeVisible();

    const relatedCount = await page.locator('[class*="related"]').count();
    const unrelatedCount = await page.locator('[class*="unrelated"]').count();
    expect(relatedCount).toBeGreaterThan(0);
    expect(unrelatedCount).toBeGreaterThan(0);

    await page.screenshot({ path: "artifacts/jarvis-desktop-rangrez.png", fullPage: true });
  });

  test("agent inspector exposes worker, skill and history layers", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium");

    await page.goto("/jarvis");
    await page.getByRole("button", { name: /Engineering Agent/ }).click();

    await expect(page.getByText("AGENT INSPECTOR")).toBeVisible();
    await expect(page.getByText("Workers")).toBeVisible();
    await expect(page.getByText("Skills")).toBeVisible();
    await expect(page.getByText("Recent agent history")).toBeVisible();
    await expect(page.getByText("Codebase Memory")).toBeVisible();

    await page.screenshot({ path: "artifacts/jarvis-agent-inspector.png", fullPage: true });
  });

  test("dragging an agent to a project requests bounded assignment instead of mutating silently", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium");

    await page.goto("/jarvis");
    const source = page.getByRole("button", { name: /Marketing Agent/ });
    const target = page.getByRole("button", { name: /Rangrez/ });
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
    await expect(page.getByText("NEEDS YOUR APPROVAL")).toBeVisible();
    await expect(page.getByText("ASK JARVIS")).toBeVisible();

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 2);

    await page.screenshot({ path: "artifacts/jarvis-mobile.png", fullPage: true });
  });
});
