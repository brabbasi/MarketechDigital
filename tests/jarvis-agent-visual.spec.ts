import { test, expect } from "@playwright/test";
import { deriveVisualAgentState, visualIdentityForAgent } from "../app/jarvis/agentVisualState";
import type { JarvisAgent } from "../app/jarvis/jarvisState";

function agent(overrides: Partial<JarvisAgent> = {}): JarvisAgent {
  return {
    id: "engineering",
    name: "Engineering Agent",
    short: "EN",
    department: "Engineering",
    state: "unknown",
    x: 0,
    y: 0,
    load: 0,
    task: "",
    skills: [],
    workers: [],
    history: [],
    ...overrides,
  };
}

test.describe("JARVIS visual agent truth contract", () => {
  test("running without current evidence never animates as working", () => {
    const state = deriveVisualAgentState(agent({ state: "running" }), Date.parse("2026-10-03T22:00:00Z"));
    expect(state.mode).toBe("unknown");
    expect(state.animate).toBe(false);
    expect(state.label).toBe("ACTIVITY UNPROVEN");
  });

  test("running with bounded current task evidence may animate as working", () => {
    const state = deriveVisualAgentState(
      agent({
        state: "running",
        performance: {
          activeTaskCount: 1,
          completedHistoryCount: 3,
          blockedTaskCount: 0,
          historyEventCount: 4,
          evidenceSource: "trusted_mirror",
        },
      }),
      Date.parse("2026-10-03T22:00:00Z"),
    );
    expect(state.mode).toBe("working");
    expect(state.animate).toBe(true);
    expect(state.evidence).toContain("active tasks 1");
  });

  test("stale or future timestamps do not create fake activity", () => {
    const stale = deriveVisualAgentState(
      agent({
        state: "running",
        resume: { agentId: "engineering", lastActivityAt: "2026-10-03T21:00:00Z" },
      }),
      Date.parse("2026-10-03T22:00:00Z"),
    );
    const future = deriveVisualAgentState(
      agent({
        state: "running",
        resume: { agentId: "engineering", lastActivityAt: "2026-10-03T22:00:01Z" },
      }),
      Date.parse("2026-10-03T22:00:00Z"),
    );
    expect(stale.animate).toBe(false);
    expect(future.animate).toBe(false);
  });

  test("learning animation requires governed learning evidence", () => {
    const unproven = deriveVisualAgentState(agent({ state: "training" }));
    const proven = deriveVisualAgentState(
      agent({
        state: "training",
        learning: {
          status: "governed",
          selfLearningActive: false,
          promotionEvidenceCount: 1,
          learningFocus: [],
          competencies: [],
          note: "promotion evidence exists",
        },
      }),
    );
    expect(unproven.mode).toBe("unknown");
    expect(unproven.animate).toBe(false);
    expect(proven.mode).toBe("learning");
    expect(proven.animate).toBe(true);
  });

  test("visual identity is deterministic and does not infer human demographics", () => {
    const first = visualIdentityForAgent(agent({ id: "reviewer", department: "Governance" }));
    const second = visualIdentityForAgent(agent({ id: "reviewer", department: "Governance" }));
    expect(first).toEqual(second);
    expect(first.seed).toBe("reviewer:Governance");
    expect(first).not.toHaveProperty("gender");
    expect(first).not.toHaveProperty("ethnicity");
    expect(first).not.toHaveProperty("age");
  });
});
