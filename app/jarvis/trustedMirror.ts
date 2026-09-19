import {
  demoJarvisState,
  type JarvisAgent,
  type JarvisProject,
  type JarvisState,
  type JarvisTask,
  type ProjectState,
  type TaskState,
} from "./jarvisState";

const TRUSTED_SOURCE = "trusted-github-control-plane-sync-v1";

type UnknownRecord = Record<string, unknown>;

type TrustedProject = {
  repository: string;
  present: boolean;
  archived?: boolean;
  default_branch?: string | null;
  head_sha?: string | null;
  head_committed_at?: string | null;
  open_pr_count?: number | null;
  open_prs?: Array<{
    number?: number;
    title?: string | null;
    head_sha?: string | null;
    updated_at?: string | null;
  }>;
};

type TrustedWorkforceRow = {
  id: string;
  role?: string;
  department?: string;
  category?: string;
  responsibilities?: string[];
};

type TrustedFinishRow = {
  pr?: number;
  title?: string | null;
  status?: string | null;
  status_reason?: string | null;
  head_sha?: string | null;
  review_state?: string | null;
  reviewed_head?: string | null;
  needs_founder?: boolean;
};

type TrustedSnapshot = {
  schema_version: 1;
  source: typeof TRUSTED_SOURCE;
  generated_at: string;
  repository?: string;
  authority: {
    github_read_only: true;
    github_mutation_authorized: false;
    runtime_write_authorized: false;
    founder_decision_authorized: false;
    outbound_authorized: false;
    spend_authorized?: false;
  };
  projects: TrustedProject[];
  workforce: {
    source_ref?: string;
    source_sha?: string;
    workers: TrustedWorkforceRow[];
  };
  company?: {
    company_state?: string | null;
    needs_founder_count?: number | null;
    active_work?: Array<{
      id?: string;
      title?: string;
      status?: string;
      owner?: string;
      manager?: string;
      head?: string;
      blocker?: string;
      next_action?: string;
    }>;
    completed_or_live?: Array<{
      id?: string;
      title?: string;
      status?: string;
      head?: string;
    }>;
  };
  revenue?: {
    qualified_prospects?: number;
    draft_ready_pending_review?: number;
    independently_reviewed_send_ready?: number;
    founder_approved_sends?: number;
    outreach_sent?: number;
    replies?: number;
    meetings?: number;
    contracted_revenue_cad?: number;
    collected_revenue_cad?: number;
    current_blocker?: string | null;
  };
  finish_chain: {
    bridge: TrustedFinishRow;
    reviewer: TrustedFinishRow;
    runtime: TrustedFinishRow;
    autonomy: TrustedFinishRow;
  };
};

const workforceIds: Record<string, string[]> = {
  orchestrator: ["coo-jarvis"],
  resource: ["agent-resource-manager", "chief-of-staff"],
  reviewer: ["ai-reviewer"],
  delivery: ["portfolio-delivery-manager", "delivery-operations-manager"],
  engineering: ["platform-engineering-manager", "cto-product"],
  memory: ["memory-agent", "company-knowledge-qa"],
  revenue: ["revenue-manager", "revenue-growth-manager"],
  marketing: ["marketing-manager", "organic-marketing-agent"],
  client: ["client-success-manager", "client-success-agent"],
};

function record(value: unknown): UnknownRecord | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as UnknownRecord)
    : null;
}

function safeString(value: unknown, max = 500): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : undefined;
}

function safeNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : 0;
}

function safeSha(value: unknown): string | undefined {
  const text = safeString(value, 40);
  return text && /^[0-9a-f]{40}$/.test(text) ? text : undefined;
}

function normalizeStatus(status: unknown): TaskState {
  const value = String(status ?? "").toUpperCase();
  if (value.includes("NEEDS FOUNDER")) return "founder";
  if (value.includes("BLOCK") || value.includes("FAIL") || value.includes("QUARANTIN")) return "blocked";
  if (value.includes("REVIEW") || value.includes("BOOTSTRAP")) return "review";
  if (value.includes("LIVE") || value.includes("RUNNING")) return "live";
  if (value.includes("NEXT")) return "next";
  if (value.includes("COMPLETE") || value.includes("DONE")) return "done";
  return "queued";
}

function repoState(project: TrustedProject): ProjectState {
  if (!project.present || project.archived) return "blocked";
  return "unknown";
}

function validateTrustedSnapshot(value: unknown): TrustedSnapshot {
  const root = record(value);
  if (!root || root.schema_version !== 1 || root.source !== TRUSTED_SOURCE) {
    throw new Error("unsupported trusted mirror contract");
  }

  const generatedAt = safeString(root.generated_at, 80);
  if (!generatedAt || Number.isNaN(Date.parse(generatedAt))) {
    throw new Error("trusted mirror generated_at invalid");
  }

  const authority = record(root.authority);
  if (
    !authority ||
    authority.github_read_only !== true ||
    authority.github_mutation_authorized !== false ||
    authority.runtime_write_authorized !== false ||
    authority.founder_decision_authorized !== false ||
    authority.outbound_authorized !== false ||
    (authority.spend_authorized !== undefined && authority.spend_authorized !== false)
  ) {
    throw new Error("trusted mirror authority boundary invalid");
  }

  if (!Array.isArray(root.projects)) {
    throw new Error("trusted mirror projects missing");
  }
  if (!record(root.workforce) || !Array.isArray((root.workforce as UnknownRecord).workers)) {
    throw new Error("trusted mirror workforce missing");
  }
  if (!record(root.finish_chain)) {
    throw new Error("trusted mirror finish chain missing");
  }

  return value as TrustedSnapshot;
}

function projectFromMirror(base: JarvisProject, trusted?: TrustedProject): JarvisProject {
  if (!base.repo) {
    return {
      ...base,
      progress: 0,
      progressKnown: false,
      agentIds: [],
      assignments: [],
      lastUpdate: "Canonical project catalog · no live repository mirror",
    };
  }

  if (!trusted || !trusted.present) {
    return {
      ...base,
      state: "blocked",
      progress: 0,
      progressKnown: false,
      now: "Repository metadata unavailable in the current sanitized mirror.",
      next: "Restore trusted mirror coverage before treating repository state as current.",
      blocked: 1,
      lastUpdate: "Trusted mirror reports repository metadata unavailable",
      agentIds: [],
      assignments: [],
      history: ["Repository metadata unavailable in the current sanitized mirror."],
    };
  }

  const head = safeSha(trusted.head_sha);
  const branch = safeString(trusted.default_branch, 120) ?? "default";
  const openPrs = Array.isArray(trusted.open_prs) ? trusted.open_prs : [];
  const leadPr = openPrs.find(row => typeof row?.number === "number" && row.number > 0);
  const count = typeof trusted.open_pr_count === "number" && trusted.open_pr_count >= 0
    ? trusted.open_pr_count
    : openPrs.length;

  const liveSummary = head
    ? `${branch}@${head.slice(0, 10)} · ${count} open PR${count === 1 ? "" : "s"}`
    : `${branch} · ${count} open PR${count === 1 ? "" : "s"}`;

  return {
    ...base,
    state: repoState(trusted),
    progress: 0,
    progressKnown: false,
    now: liveSummary,
    next: leadPr
      ? `Open PR #${leadPr.number}: ${safeString(leadPr.title, 180) ?? "Untitled"}`
      : "No open pull request is present in the sanitized repository mirror.",
    blocked: trusted.archived ? 1 : 0,
    lastUpdate: safeString(trusted.head_committed_at, 80) ?? "Trusted mirror repository metadata",
    agentIds: [],
    assignments: [],
    history: [
      `Trusted repository mirror: ${base.repo}`,
      head ? `Exact default-branch head: ${head}` : "Default-branch head unavailable",
    ],
  };
}

function workforceAgent(base: JarvisAgent, workforce: TrustedWorkforceRow[], reviewerBusy: boolean): JarvisAgent {
  const ids = workforceIds[base.id] ?? [];
  const row = workforce.find(item => ids.includes(item.id));
  const responsibilities = Array.isArray(row?.responsibilities) ? row.responsibilities : [];
  return {
    ...base,
    name: row?.role ?? base.name,
    department: row?.department ?? base.department,
    state: base.id === "reviewer" && reviewerBusy ? "review" : "unknown",
    load: 0,
    task: "No live agent mission is exposed by the sanitized control-plane mirror.",
    skills: responsibilities.length ? responsibilities.slice(0, 8) : base.skills,
    workers: [],
    history: row
      ? [`Canonical workforce identity: ${row.id}`, "Live worker activity is not inferred from org membership."]
      : ["Canonical portal role; no matching workforce identity exposed by the current mirror."],
  };
}

function finishTasks(snapshot: TrustedSnapshot): JarvisTask[] {
  return (["bridge", "reviewer", "runtime", "autonomy"] as const).map(key => {
    const row = snapshot.finish_chain[key];
    const title = safeString(row?.title, 220) ?? `${key} finish gate`;
    return {
      id: `finish-${key}`,
      title,
      projectId: "jarvis",
      project: "Marketech OS / JARVIS",
      agent: key === "reviewer" || key === "bridge" ? "AI Reviewer" : "Engineering Agent",
      state: normalizeStatus(row?.status),
      detail: [
        safeString(row?.status, 120),
        safeString(row?.status_reason, 500),
        safeSha(row?.head_sha) ? `head ${safeSha(row?.head_sha)}` : undefined,
      ].filter(Boolean).join(" · "),
    };
  });
}

function companyTasks(snapshot: TrustedSnapshot, projects: TrustedProject[]): JarvisTask[] {
  const rows = Array.isArray(snapshot.company?.active_work) ? snapshot.company?.active_work ?? [] : [];
  const finishPrs = new Set(
    Object.values(snapshot.finish_chain)
      .map(row => row?.pr)
      .filter((value): value is number => typeof value === "number"),
  );

  return rows.flatMap((row, index) => {
    const id = safeString(row?.id, 120) ?? `company-work-${index + 1}`;
    const maybePr = /^pr(\d+)$/i.exec(id);
    if (maybePr && finishPrs.has(Number(maybePr[1]))) return [];

    const head = safeSha(row?.head);
    const matchedRepo = head
      ? projects.find(project =>
          Array.isArray(project.open_prs) &&
          project.open_prs.some(pr => safeSha(pr?.head_sha) === head)
        )
      : undefined;
    const portalProject = demoJarvisState.projects.find(project => project.repo === matchedRepo?.repository);
    const projectId = portalProject?.id ?? "jarvis";
    const projectName = portalProject?.name ?? "Company";
    const title = safeString(row?.title, 220) ?? id;
    const detail = [
      safeString(row?.blocker, 300) ? `Blocker: ${safeString(row?.blocker, 300)}` : undefined,
      safeString(row?.next_action, 300) ? `Next: ${safeString(row?.next_action, 300)}` : undefined,
      head ? `head ${head}` : undefined,
    ].filter(Boolean).join(" · ");

    return [{
      id: `company-${id}`,
      title,
      projectId,
      project: projectName,
      agent: safeString(row?.owner, 160) ?? safeString(row?.manager, 160) ?? "JARVIS",
      state: normalizeStatus(row?.status),
      detail: detail || "Sanitized company work item from Trusted Control Plane Sync.",
    }];
  });
}

export function adaptTrustedControlPlaneSnapshot(
  value: unknown,
  options?: { maxAgeSeconds?: number; nowMs?: number },
): JarvisState {
  const snapshot = validateTrustedSnapshot(value);
  const nowMs = options?.nowMs ?? Date.now();
  const generatedMs = Date.parse(snapshot.generated_at);
  const ageSeconds = Math.floor((nowMs - generatedMs) / 1000);
  const maxAgeSeconds = Math.min(Math.max(options?.maxAgeSeconds ?? 600, 30), 3600);

  if (ageSeconds < -60) {
    throw new Error("trusted mirror timestamp is materially in the future");
  }
  if (ageSeconds > maxAgeSeconds) {
    throw new Error("trusted mirror is stale");
  }

  const trustedProjects = snapshot.projects;
  const projects = demoJarvisState.projects.map(base =>
    projectFromMirror(base, trustedProjects.find(row => row.repository === base.repo)),
  );

  const workforceRows = snapshot.workforce.workers.filter(
    (row): row is TrustedWorkforceRow =>
      !!row && typeof row.id === "string" && /^[a-z0-9][a-z0-9._-]{0,119}$/.test(row.id),
  );
  const reviewerBusy = Object.values(snapshot.finish_chain).some(
    row => normalizeStatus(row?.status) === "review",
  );
  const agents = demoJarvisState.agents.map(base => workforceAgent(base, workforceRows, reviewerBusy));

  const tasks = [...finishTasks(snapshot), ...companyTasks(snapshot, trustedProjects)];
  const blockedByProject = new Map<string, number>();
  for (const task of tasks) {
    if (task.state === "blocked") {
      blockedByProject.set(task.projectId, (blockedByProject.get(task.projectId) ?? 0) + 1);
    }
  }
  const projectsWithBlockers = projects.map(project => ({
    ...project,
    blocked: blockedByProject.get(project.id) ?? project.blocked,
  }));

  const revenue = snapshot.revenue ?? {};
  const outboundHeld = snapshot.authority.outbound_authorized === false;

  return {
    schemaVersion: 1,
    generatedAt: snapshot.generated_at,
    source: "mirror",
    authority: "read_only",
    mirror: {
      contract: TRUSTED_SOURCE,
      ageSeconds: Math.max(ageSeconds, 0),
      sourceRepository: safeString(snapshot.repository, 180) ?? "brabbasi/Marketech_Digital_OS",
      workforceSourceSha: safeSha(snapshot.workforce.source_sha),
      authoritySafe: true,
    },
    agents,
    projects: projectsWithBlockers,
    tasks,
    revenue: {
      qualifiedProspects: safeNumber(revenue.qualified_prospects),
      pendingIndependentReview: safeNumber(revenue.draft_ready_pending_review),
      reviewedSendReady: safeNumber(revenue.independently_reviewed_send_ready),
      founderApproved: safeNumber(revenue.founder_approved_sends),
      outreachSent: safeNumber(revenue.outreach_sent),
      replies: safeNumber(revenue.replies),
      meetings: safeNumber(revenue.meetings),
      contractedCad: safeNumber(revenue.contracted_revenue_cad),
      collectedCad: safeNumber(revenue.collected_revenue_cad),
      outboundHeld,
    },
    finishChain: {
      bridge: safeString(snapshot.finish_chain.bridge?.status, 120) ?? "unknown",
      reviewer: safeString(snapshot.finish_chain.reviewer?.status, 120) ?? "unknown",
      runtime: safeString(snapshot.finish_chain.runtime?.status, 120) ?? "unknown",
      autonomy: safeString(snapshot.finish_chain.autonomy?.status, 120) ?? "unknown",
    },
  };
}
