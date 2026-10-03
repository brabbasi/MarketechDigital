import type { JarvisAgent } from "./jarvisState";

export type VisualAgentMode =
  | "working"
  | "reviewing"
  | "blocked"
  | "learning"
  | "idle"
  | "unknown";

export type VisualAgentIdentity = {
  seed: string;
  accentIndex: number;
  silhouette: "orb" | "visor" | "holo" | "desk";
  accessory: "none" | "terminal" | "notebook" | "review-badge" | "memory-ring";
};

export type VisualAgentState = {
  mode: VisualAgentMode;
  animate: boolean;
  label: string;
  evidence: string[];
  identity: VisualAgentIdentity;
};

const ACTIVE_WINDOW_MS = 15 * 60 * 1000;

function hash32(value: string): number {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export function visualIdentityForAgent(agent: Pick<JarvisAgent, "id" | "department">): VisualAgentIdentity {
  const seed = `${agent.id}:${agent.department}`;
  const hash = hash32(seed);
  const silhouettes: VisualAgentIdentity["silhouette"][] = ["orb", "visor", "holo", "desk"];
  const accessories: VisualAgentIdentity["accessory"][] = [
    "none",
    "terminal",
    "notebook",
    "review-badge",
    "memory-ring",
  ];
  return {
    seed,
    accentIndex: hash % 12,
    silhouette: silhouettes[(hash >>> 4) % silhouettes.length],
    accessory: accessories[(hash >>> 8) % accessories.length],
  };
}

function parseFreshActivity(agent: JarvisAgent, nowMs: number): string | null {
  const raw = agent.resume?.lastActivityAt;
  if (!raw) return null;
  const parsed = Date.parse(raw);
  if (!Number.isFinite(parsed)) return null;
  const age = nowMs - parsed;
  if (age < 0 || age > ACTIVE_WINDOW_MS) return null;
  return raw;
}

function hasBoundedWorkEvidence(agent: JarvisAgent, nowMs: number): string[] {
  const evidence: string[] = [];
  const fresh = parseFreshActivity(agent, nowMs);
  if (fresh) evidence.push(`fresh activity ${fresh}`);
  if ((agent.performance?.activeTaskCount ?? 0) > 0) {
    evidence.push(`active tasks ${agent.performance!.activeTaskCount}`);
  }
  if (agent.progress?.known === true && typeof agent.progress.percent === "number") {
    evidence.push(`progress ${Math.round(agent.progress.percent)}%`);
  }
  return evidence;
}

export function deriveVisualAgentState(
  agent: JarvisAgent,
  nowMs: number = Date.now(),
): VisualAgentState {
  const identity = visualIdentityForAgent(agent);
  const workEvidence = hasBoundedWorkEvidence(agent, nowMs);

  if (agent.state === "blocked") {
    return {
      mode: "blocked",
      animate: false,
      label: "BLOCKED",
      evidence: workEvidence,
      identity,
    };
  }

  if (agent.state === "review") {
    return {
      mode: "reviewing",
      animate: true,
      label: "REVIEWING",
      evidence: workEvidence.length ? workEvidence : ["explicit review state"],
      identity,
    };
  }

  if (agent.state === "training") {
    const promoted =
      agent.learning?.selfLearningActive === true ||
      (agent.learning?.promotionEvidenceCount ?? 0) > 0;
    return {
      mode: promoted ? "learning" : "unknown",
      animate: promoted,
      label: promoted ? "LEARNING" : "LEARNING UNPROVEN",
      evidence: promoted ? ["governed learning evidence"] : [],
      identity,
    };
  }

  if (agent.state === "running") {
    if (workEvidence.length === 0) {
      return {
        mode: "unknown",
        animate: false,
        label: "ACTIVITY UNPROVEN",
        evidence: [],
        identity,
      };
    }
    return {
      mode: "working",
      animate: true,
      label: "WORKING",
      evidence: workEvidence,
      identity,
    };
  }

  if (agent.state === "ready") {
    return {
      mode: "idle",
      animate: false,
      label: "READY",
      evidence: [],
      identity,
    };
  }

  return {
    mode: "unknown",
    animate: false,
    label: "UNKNOWN",
    evidence: [],
    identity,
  };
}
