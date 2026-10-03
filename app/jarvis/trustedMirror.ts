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
const TRUSTED_REPOSITORY = "brabbasi/Marketech_Digital_OS";
const EXPECTED_REPOSITORIES = new Set(
  demoJarvisState.projects.flatMap(project => project.repo ? [project.repo] : []),
);
const EXPECTED_FINISH_PRS = {
  bridge: 66,
  reviewer: 46,
  runtime: 40,
  autonomy: 80,
} as const;

export function jarvisStateEndpointEnabled(
  environment: string | undefined,
  founderAuthenticated = false,
): boolean {
  // Preview remains available behind Vercel Preview Protection for QA.
  // Production requires a separately verified application-layer Founder session.
  return environment !== "production" || founderAuthenticated;
}

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

type TrustedWorkforceLiveProfile = {
  agent_id: string;
  name?: string | null;
  department?: string | null;
  kind?: string | null;
  workforce_class?: string | null;
  maturity?: string | null;
  reports_to?: string | null;
  mission?: string | null;
  job_code?: string | null;
  job_title?: string | null;
  employment_state?: string | null;
  runtime_dispatch?: boolean;
  projects?: string[];
  worklane?: string | null;
  current_work?: string | null;
  blocker?: string | null;
  current_task?: {
    id?: string | null;
    title?: string | null;
    status?: string | null;
    status_reason?: string | null;
    next_action?: string | null;
    project_id?: string | null;
    updated_at?: string | null;
    source?: string | null;
  } | null;
  progress?: {
    known?: boolean;
    percent?: number | null;
    label?: string | null;
    source?: string | null;
    exact?: boolean;
  };
  last_activity_at?: string | null;
  performance?: {
    active_task_count?: number;
    completed_history_count?: number;
    blocked_task_count?: number;
    history_event_count?: number;
    evidence_source?: string | null;
  };
  learning?: {
    status?: string | null;
    self_learning_active?: boolean;
    promotion_evidence_count?: number;
    last_improvement_at?: string | null;
    learning_focus?: string[];
    competency_domains?: string[];
    note?: string | null;
  };
  recent_history?: Array<{
    kind?: string | null;
    title?: string | null;
    status?: string | null;
    detail?: string | null;
    at?: string | null;
    project_id?: string | null;
    head?: string | null;
    source?: string | null;
  }>;
};

type TrustedWorkforceLive = {
  schema_version: 2;
  source: "local_control_center_sanitized_workforce";
  control_center_deployment_sha?: string | null;
  connected: true;
  registered_agents: number;
  assigned_agents: number;
  profile_count: number;
  skill_profiled_agents: number;
  self_learning_agents_proven: number;
  promotion_evidence_records: number;
  profiles: TrustedWorkforceLiveProfile[];
  authority: {
    runtime_write_authorized: false;
    founder_decision_authorized: false;
    outbound_authorized: false;
    spend_authorized: false;
    provider_credentials_exposed: false;
  };
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
  mirror_schema_version?: 2;
  workforce_live?: TrustedWorkforceLive;
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
    historical_independent_review_coverage_unique?: number;
    founder_approved_sends?: number;
    historical_founder_approved_initial_contacts?: number;
    current_evidence_valid_founder_approved_execution_held?: number;
    known_requalification_holds?: number;
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

function safeCount(value: unknown): number | null {
  return typeof value === "number" &&
    Number.isSafeInteger(value) &&
    value >= 0
    ? value
    : null;
}

function safeStringList(value: unknown, maxItems = 24, maxChars = 180): string[] {
  if (!Array.isArray(value)) return [];
  const result: string[] = [];
  for (const candidate of value.slice(0, maxItems)) {
    const text = safeString(candidate, maxChars);
    if (text) result.push(text);
  }
  return [...new Set(result)];
}

function validateWorkforceLive(root: UnknownRecord): void {
  if (root.workforce_live === undefined && root.mirror_schema_version === undefined) return;
  if (root.mirror_schema_version !== 2) {
    throw new Error("trusted mirror v2 schema marker invalid");
  }
  const live = record(root.workforce_live);
  if (
    !live ||
    live.schema_version !== 2 ||
    live.source !== "local_control_center_sanitized_workforce" ||
    live.connected !== true
  ) {
    throw new Error("trusted live workforce contract invalid");
  }

  const registered = safeCount(live.registered_agents);
  const assigned = safeCount(live.assigned_agents);
  const profileCount = safeCount(live.profile_count);
  const skillProfiled = safeCount(live.skill_profiled_agents);
  const selfLearningProven = safeCount(live.self_learning_agents_proven);
  const promotionEvidence = safeCount(live.promotion_evidence_records);
  if (
    registered === null ||
    assigned === null ||
    profileCount === null ||
    skillProfiled === null ||
    selfLearningProven === null ||
    promotionEvidence === null ||
    assigned > registered ||
    skillProfiled > registered ||
    selfLearningProven > registered ||
    profileCount !== registered ||
    !Array.isArray(live.profiles) ||
    live.profiles.length !== registered
  ) {
    throw new Error("trusted live workforce counts invalid");
  }

  const authority = record(live.authority);
  if (
    !authority ||
    authority.runtime_write_authorized !== false ||
    authority.founder_decision_authorized !== false ||
    authority.outbound_authorized !== false ||
    authority.spend_authorized !== false ||
    authority.provider_credentials_exposed !== false
  ) {
    throw new Error("trusted live workforce authority boundary invalid");
  }

  const ids = new Set<string>();
  let learningProfiles = 0;
  let observedPromotionEvidence = 0;
  for (const candidate of live.profiles) {
    const profile = record(candidate);
    const agentId = safeString(profile?.agent_id, 120);
    if (!profile || !agentId || !/^[a-z0-9][a-z0-9._-]{0,119}$/.test(agentId) || ids.has(agentId)) {
      throw new Error("trusted live workforce profile identity invalid");
    }
    ids.add(agentId);

    const progress = record(profile.progress);
    if (!progress || typeof progress.known !== "boolean") {
      throw new Error("trusted live workforce progress invalid");
    }
    if (progress.known === true) {
      if (
        typeof progress.percent !== "number" ||
        !Number.isFinite(progress.percent) ||
        progress.percent < 0 ||
        progress.percent > 100
      ) {
        throw new Error("trusted live workforce known progress invalid");
      }
    } else if (
      progress.percent !== null &&
      progress.percent !== undefined
    ) {
      throw new Error("trusted live workforce unknown progress must not carry a percentage");
    }

    const performance = record(profile.performance);
    if (!performance) throw new Error("trusted live workforce performance missing");
    for (const key of [
      "active_task_count",
      "completed_history_count",
      "blocked_task_count",
      "history_event_count",
    ]) {
      if (safeCount(performance[key]) === null) {
        throw new Error("trusted live workforce performance count invalid");
      }
    }

    const learning = record(profile.learning);
    if (!learning || typeof learning.self_learning_active !== "boolean") {
      throw new Error("trusted live workforce learning invalid");
    }
    const evidenceCount = safeCount(learning.promotion_evidence_count);
    if (evidenceCount === null) {
      throw new Error("trusted live workforce promotion evidence invalid");
    }
    if (learning.self_learning_active === true) {
      if (evidenceCount <= 0) {
        throw new Error("trusted live workforce self-learning lacks promotion evidence");
      }
      learningProfiles += 1;
    }
    observedPromotionEvidence += evidenceCount;
  }

  if (learningProfiles !== selfLearningProven) {
    throw new Error("trusted live workforce self-learning count mismatch");
  }
  if (observedPromotionEvidence > promotionEvidence) {
    throw new Error("trusted live workforce promotion evidence total mismatch");
  }
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

  if (root.repository !== TRUSTED_REPOSITORY) {
    throw new Error("trusted mirror repository identity invalid");
  }

  if (!Array.isArray(root.projects)) {
    throw new Error("trusted mirror projects missing");
  }
  const projectRepositories = new Set<string>();
  for (const candidate of root.projects) {
    const project = record(candidate);
    const repository = safeString(project?.repository, 180);
    if (!project || !repository || typeof project.present !== "boolean") {
      throw new Error("trusted mirror project row invalid");
    }
    if (!EXPECTED_REPOSITORIES.has(repository) || projectRepositories.has(repository)) {
      throw new Error("trusted mirror project catalog identity invalid");
    }
    if (project.present === true && !safeSha(project.head_sha)) {
      throw new Error("trusted mirror present project head invalid");
    }
    projectRepositories.add(repository);
  }
  for (const repository of EXPECTED_REPOSITORIES) {
    if (!projectRepositories.has(repository)) {
      throw new Error("trusted mirror project catalog incomplete");
    }
  }

  const workforce = record(root.workforce);
  if (!workforce || !Array.isArray(workforce.workers) || !safeSha(workforce.source_sha)) {
    throw new Error("trusted mirror workforce missing or unprovenanced");
  }

  const company = record(root.company);
  if (!company || !Array.isArray(company.active_work)) {
    throw new Error("trusted mirror company summary missing");
  }

  const revenue = record(root.revenue);
  const revenueFields = [
    "qualified_prospects",
    "draft_ready_pending_review",
    "independently_reviewed_send_ready",
    "founder_approved_sends",
    "outreach_sent",
    "replies",
    "meetings",
    "contracted_revenue_cad",
    "collected_revenue_cad",
  ] as const;
  if (!revenue || revenueFields.some(key => (
    typeof revenue[key] !== "number" ||
    !Number.isFinite(revenue[key] as number) ||
    (revenue[key] as number) < 0
  ))) {
    throw new Error("trusted mirror revenue summary incomplete or invalid");
  }

  const finishChain = record(root.finish_chain);
  if (!finishChain) {
    throw new Error("trusted mirror finish chain missing");
  }
  for (const [key, expectedPr] of Object.entries(EXPECTED_FINISH_PRS)) {
    const row = record(finishChain[key]);
    if (
      !row ||
      row.pr !== expectedPr ||
      !safeSha(row.head_sha) ||
      !safeString(row.status, 120) ||
      typeof row.needs_founder !== "boolean"
    ) {
      throw new Error(`trusted mirror finish chain ${key} invalid`);
    }
  }

  validateWorkforceLive(root);
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
    task: "No live agent mission is exposed by the current sanitized control-plane mirror.",
    skills: responsibilities.length ? responsibilities.slice(0, 8) : base.skills,
    workers: [],
    progress: {
      known: false,
      label: "Live mission progress not exposed by current mirror",
      source: "trusted_mirror_without_agent_mission",
      exact: false,
    },
    resume: row ? {
      agentId: row.id,
      jobTitle: row.role ?? base.name,
      mission: responsibilities.length ? responsibilities.join(" · ") : undefined,
    } : {
      agentId: base.id,
      jobTitle: base.name,
    },
    learning: {
      status: "not_exposed_by_current_mirror",
      selfLearningActive: false,
      promotionEvidenceCount: 0,
      learningFocus: [],
      competencies: [],
      note: "The current signed mirror does not expose governed skill-promotion evidence. No self-learning claim is inferred.",
    },
    history: row
      ? [`Canonical workforce identity: ${row.id}`, "Live worker activity is not inferred from org membership."]
      : ["Canonical portal role; no matching workforce identity exposed by the current mirror."],
  };
}

function agentStateFromLiveProfile(profile: TrustedWorkforceLiveProfile): JarvisAgent["state"] {
  const status = String(profile.current_task?.status ?? "").toLowerCase();
  const blocker = String(profile.blocker ?? profile.current_task?.status_reason ?? "").toLowerCase();
  if (
    blocker ||
    status.includes("block") ||
    status.includes("fail") ||
    status.includes("quarant") ||
    status.includes("error")
  ) return "blocked";
  if (status.includes("review") || status.includes("verify") || status.includes("qa")) return "review";
  if (status.includes("train") || status.includes("learn")) return "training";
  if (
    status.includes("running") ||
    status.includes("working") ||
    status.includes("active") ||
    status.includes("in_progress") ||
    status.includes("in progress") ||
    status.includes("claimed")
  ) return "running";
  if (
    status.includes("ready") ||
    status.includes("assigned") ||
    status.includes("queued") ||
    status.includes("pending")
  ) return "ready";
  const employment = String(profile.employment_state ?? "").toLowerCase();
  return employment.includes("active") || employment.includes("employed") ? "ready" : "unknown";
}

function liveAgentCoordinates(index: number, total: number): { x: number; y: number } {
  if (total <= 1) return { x: 50, y: 50 };
  const columns = Math.max(6, Math.min(9, Math.ceil(Math.sqrt(total * 1.45))));
  const rows = Math.ceil(total / columns);
  const column = index % columns;
  const row = Math.floor(index / columns);
  const x = columns === 1 ? 50 : 8 + (column * 84) / Math.max(columns - 1, 1);
  const y = rows === 1 ? 50 : 10 + (row * 78) / Math.max(rows - 1, 1);
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}

function liveProfileAgent(
  profile: TrustedWorkforceLiveProfile,
  index: number,
  total: number,
): JarvisAgent {
  const id = safeString(profile.agent_id, 120) ?? `agent-${index + 1}`;
  const name = safeString(profile.name, 160) ?? id;
  const currentTitle =
    safeString(profile.current_task?.title, 240) ??
    safeString(profile.current_work, 300) ??
    "No current task evidence.";
  const progressKnown = profile.progress?.known === true &&
    typeof profile.progress?.percent === "number" &&
    Number.isFinite(profile.progress.percent);
  const progressPercent = progressKnown
    ? Math.max(0, Math.min(100, Number(profile.progress?.percent)))
    : undefined;
  const competencies = safeStringList(profile.learning?.competency_domains, 16, 160);
  const learningFocus = safeStringList(profile.learning?.learning_focus, 12, 160);
  const skills = [...new Set([...competencies, ...learningFocus])].slice(0, 16);
  const history = Array.isArray(profile.recent_history)
    ? profile.recent_history.slice(0, 30).map((row, historyIndex) => {
        const title = safeString(row?.title, 240) ?? safeString(row?.kind, 100) ?? `Update ${historyIndex + 1}`;
        const status = safeString(row?.status, 100);
        const detail = safeString(row?.detail, 360);
        const at = safeString(row?.at, 80);
        return [at, status, title, detail].filter(Boolean).join(" · ");
      })
    : [];
  const { x, y } = liveAgentCoordinates(index, total);
  const learningEvidence = safeCount(profile.learning?.promotion_evidence_count) ?? 0;

  return {
    id,
    name,
    short: name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0]?.toUpperCase() ?? "")
      .join("") || "AG",
    department: safeString(profile.department, 120) ?? "Workforce",
    state: agentStateFromLiveProfile(profile),
    x,
    y,
    load: 0,
    task: currentTitle,
    skills,
    workers: [],
    history: history.length
      ? history
      : ["No durable Runtime / Trusted control-plane history is exposed for this agent yet."],
    progress: {
      known: progressKnown,
      ...(progressKnown ? { percent: progressPercent } : {}),
      label:
        safeString(profile.progress?.label, 160) ??
        (progressKnown ? "Checkpoint evidence" : "No checkpoint evidence"),
      source: safeString(profile.progress?.source, 120) ?? "none",
      exact: profile.progress?.exact === true,
    },
    resume: {
      agentId: id,
      jobCode: safeString(profile.job_code, 120),
      jobTitle: safeString(profile.job_title, 180),
      workforceClass: safeString(profile.workforce_class, 100),
      maturity: safeString(profile.maturity, 100),
      reportsTo: safeString(profile.reports_to, 120),
      mission: safeString(profile.mission, 500),
      lastActivityAt: safeString(profile.last_activity_at, 80),
    },
    learning: {
      status: safeString(profile.learning?.status, 120) ?? "not_recorded",
      selfLearningActive: profile.learning?.self_learning_active === true && learningEvidence > 0,
      promotionEvidenceCount: learningEvidence,
      lastImprovementAt: safeString(profile.learning?.last_improvement_at, 80),
      learningFocus,
      competencies,
      note:
        safeString(profile.learning?.note, 320) ??
        "No governed improvement evidence exposed.",
    },
    performance: {
      activeTaskCount: safeCount(profile.performance?.active_task_count) ?? 0,
      completedHistoryCount: safeCount(profile.performance?.completed_history_count) ?? 0,
      blockedTaskCount: safeCount(profile.performance?.blocked_task_count) ?? 0,
      historyEventCount: safeCount(profile.performance?.history_event_count) ?? 0,
      evidenceSource: safeString(profile.performance?.evidence_source, 120) ?? "unknown",
    },
  };
}

function liveWorkforceAgents(snapshot: TrustedSnapshot, reviewerBusy: boolean): JarvisAgent[] {
  const profiles = snapshot.workforce_live?.profiles;
  if (snapshot.workforce_live && Array.isArray(profiles)) {
    return profiles.map((profile, index) => liveProfileAgent(profile, index, profiles.length));
  }

  const workforceRows = snapshot.workforce.workers.filter(
    (row): row is TrustedWorkforceRow =>
      !!row && typeof row.id === "string" && /^[a-z0-9][a-z0-9._-]{0,119}$/.test(row.id),
  );
  return demoJarvisState.agents.map(base => workforceAgent(base, workforceRows, reviewerBusy));
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

  const reviewerBusy = Object.values(snapshot.finish_chain).some(
    row => normalizeStatus(row?.status) === "review",
  );
  const agents = liveWorkforceAgents(snapshot, reviewerBusy);

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
    readModel: {
      liveConnected: true,
      mode: "trusted_live_mirror",
      label: "TRUSTED LIVE MIRROR",
      reason: "Signed sanitized Trusted control-plane snapshot passed freshness and authority validation.",
    },
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
      historicalReviewedCoverage: safeNumber(
        revenue.historical_independent_review_coverage_unique ?? revenue.independently_reviewed_send_ready,
      ),
      historicalFounderApproved: safeNumber(
        revenue.historical_founder_approved_initial_contacts ?? revenue.founder_approved_sends,
      ),
      currentEvidenceValidFounderApproved:
        typeof revenue.current_evidence_valid_founder_approved_execution_held === "number"
          ? safeNumber(revenue.current_evidence_valid_founder_approved_execution_held)
          : null,
      knownRequalificationHolds:
        typeof revenue.known_requalification_holds === "number"
          ? safeNumber(revenue.known_requalification_holds)
          : null,
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
