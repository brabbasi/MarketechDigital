export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export const marketechServices = [
  {
    name: "AI Agent Website Bot",
    range: "$750–$2,500 CAD starter / $3,500–$8,000+ CAD advanced",
    bestFor: "Lead capture, FAQs, qualification, booking guidance, service routing, and guided website support.",
    deliverables: ["Website chat assistant", "Service guidance", "Lead qualification", "Email/contact handoff", "Conversation-ready sales copy"]
  },
  {
    name: "AI Strategy Sprint",
    range: "$500–$1,500 CAD",
    bestFor: "Founders or teams that want to understand where AI creates leverage before paying for a larger build.",
    deliverables: ["AI opportunity audit", "30–90 day roadmap", "Use-case shortlist", "Tool recommendations", "Implementation direction"]
  },
  {
    name: "Workflow Automation Build",
    range: "$1,500–$6,000+ CAD",
    bestFor: "Manual admin, intake, follow-ups, task routing, internal alerts, reporting flows, and CRM handoffs.",
    deliverables: ["Workflow mapping", "Automation architecture", "Tool integration", "Testing", "Handoff documentation"]
  },
  {
    name: "Decision Intelligence Dashboard",
    range: "$2,000–$8,000+ CAD",
    bestFor: "Teams that need cleaner KPIs, reporting, data cleanup, and decision-support views.",
    deliverables: ["KPI structure", "Dashboard design", "Data cleanup plan", "Reporting logic", "Decision views"]
  },
  {
    name: "Growth Systems Stack",
    range: "$4,000–$15,000+ CAD",
    bestFor: "Businesses that want a fuller operating layer across AI strategy, automation, analytics, lead capture, and growth execution.",
    deliverables: ["Systems blueprint", "Automation stack", "Data visibility", "AI assistant layer", "Growth workflow design"]
  }
];

export const founderProfile = {
  name: "Basit Abbasi",
  role: "Founder of Marketech Digital",
  education: "Bachelor's in Computer Science from the University of Hertfordshire",
  focus: "AI systems, workflow automation, data intelligence, bot creation, decision intelligence, and clarity-driven digital execution"
};

function isUrgentBrokenSystem(message: string) {
  return /(system|site|website|app|automation|bot|dashboard|crm|form|backend|workflow).*(down|broken|not working|stopped|crashed|failed|error|bug|offline|issue)|(?:down|broken|not working|stopped|crashed|failed|error|bug|offline).*(system|site|website|app|automation|bot|dashboard|crm|form|backend|workflow)/.test(message.toLowerCase());
}

export function estimateService(message: string) {
  const q = message.toLowerCase();
  const wantsBot = /(bot|agent|chat|assistant|faq|lead capture|lead qualification)/.test(q);
  const wantsAutomation = /(automation|automate|workflow|zapier|make|crm|follow.?up|admin|routing|alert|manual|booking|estimate|quote request)/.test(q);
  const wantsDashboard = /(dashboard|data|analytics|report|kpi|metrics|business intelligence|bi)/.test(q);

  if (wantsBot && wantsAutomation) {
    return {
      name: "AI Agent + Workflow Automation Starter",
      range: "$1,500–$4,500 CAD starter / $4,500–$9,500+ CAD advanced",
      bestFor: "Businesses that want the website bot and the behind-the-scenes follow-up, booking, CRM, or internal notification flow to work together.",
      deliverables: ["AI website guide", "Lead qualification", "Inquiry routing", "Follow-up automation", "Basic CRM or email handoff"]
    };
  }

  if (wantsBot) return marketechServices[0];
  if (/(strategy|roadmap|audit|plan|consult|where to start|idea)/.test(q)) return marketechServices[1];
  if (wantsAutomation) return marketechServices[2];
  if (wantsDashboard) return marketechServices[3];
  if (/(system|stack|full|growth|operating layer|backend|platform|website)/.test(q)) return marketechServices[4];
  return null;
}

function industrySuggestion(message: string) {
  const q = message.toLowerCase();
  if (/(cleaning|cleaner|janitorial|maid|housekeeping)/.test(q)) {
    return {
      industry: "cleaning business",
      useCase: "quote requests, service-area questions, booking inquiries, recurring-cleaning follow-ups, missed-call recovery, and lead handoff",
      firstBuild: "an AI quote/intake bot connected to a follow-up workflow for new leads"
    };
  }
  if (/(real estate|realtor|property)/.test(q)) {
    return {
      industry: "real estate business",
      useCase: "buyer/seller qualification, listing inquiries, showing requests, CRM handoff, and follow-up reminders",
      firstBuild: "an AI lead qualifier connected to a CRM and follow-up sequence"
    };
  }
  if (/(clinic|dental|medical|physio|salon|spa)/.test(q)) {
    return {
      industry: "appointment-based business",
      useCase: "service questions, appointment requests, reminders, intake forms, and front-desk workload reduction",
      firstBuild: "an AI receptionist-style assistant with appointment and intake automation"
    };
  }
  return null;
}

function brokenSystemReply() {
  return `I can help, but I should not guess the fix without knowing what failed.

First, identify the failure layer:
- Website/app not loading
- Form or booking flow not sending
- AI bot not responding
- Automation/CRM handoff failing
- Dashboard or data feed not updating

Fastest next step: tell me what system is down, what changed recently, the exact error if any, and what tool/platform it runs on. If this is a business-critical issue, Marketech would treat it as a systems audit or recovery workflow first, then quote the fix once the cause is clear.`;
}

export function localAssistantReply(message: string) {
  const q = message.toLowerCase();
  const service = estimateService(message);
  const industry = industrySuggestion(message);

  if (isUrgentBrokenSystem(message)) {
    return brokenSystemReply();
  }

  if (/(price|pricing|quote|cost|budget|estimate|range)/.test(q)) {
    if (service) {
      const industryLine = industry
        ? `For a ${industry.industry}, I would start with ${industry.firstBuild}. It can handle ${industry.useCase}.\n\n`
        : "";

      return `${industryLine}Best-fit starting point: ${service.name}.\n\nGuidance range: ${service.range}.\n\nWhat that could include:\n- ${service.deliverables.join("\n- ")}\n\nA final quote depends on your website, tools, number of workflows, booking/CRM setup, backend needs, and how much custom AI logic is required. Two useful questions: what tools do you currently use, and where do new leads usually come from?`;
    }
    return `Marketech guidance ranges:\n\n- ${marketechServices.map((item) => `${item.name}: ${item.range}`).join("\n- ")}\n\nTell me your business type and what you want automated or clarified, and I can narrow the likely fit.`;
  }

  if (/(founder|basit|education|who built|owner)/.test(q)) {
    return `${founderProfile.name} is the ${founderProfile.role}. He studied ${founderProfile.education} and focuses on ${founderProfile.focus}. You can open the founder page for the full portfolio-style profile.`;
  }

  if (/(start|contact|book|call|next step)/.test(q)) {
    return "The best first step is to describe your business, current bottleneck, tools you use, desired outcome, and budget range. I can then suggest whether you need an AI strategy sprint, AI agent bot, workflow automation, dashboard, or a larger growth systems stack.";
  }

  if (/(solve|help|problem|can you|what can)/.test(q) || service) {
    const picked = service || marketechServices[2];
    const industryLine = industry ? `For a ${industry.industry}, a strong first system would cover ${industry.useCase}. ` : "";
    return `${industryLine}This sounds like a fit for ${picked.name}. Guidance range: ${picked.range}.\n\nTypical deliverables:\n- ${picked.deliverables.join("\n- ")}\n\nIf you share your current tools and the main workflow you want fixed, I can narrow this into a starter scope.`;
  }

  return "I can help you figure out what Marketech Digital can build: AI agent bots, workflow automations, decision dashboards, CRM flows, lead-capture systems, and growth systems. Tell me what your business does and what feels slow, repetitive, or unclear.";
}

export function buildSystemPrompt() {
  return `You are Marketech Intelligence, the AI sales and project advisor for Marketech Digital.

Company positioning:
Marketech Digital helps businesses turn complex data, scattered workflows, and repetitive operations into clear AI-powered systems, workflow automations, decision intelligence, and growth-ready operating layers.

Founder:
${founderProfile.name}, ${founderProfile.role}. Education: ${founderProfile.education}. Focus: ${founderProfile.focus}.

Services and guidance ranges:
${marketechServices
  .map(
    (service) => `- ${service.name}: ${service.range}. Best for: ${service.bestFor}. Deliverables: ${service.deliverables.join(", ")}.`
  )
  .join("\n")}

Important combined offer:
- AI Agent + Workflow Automation Starter: $1,500–$4,500 CAD starter / $4,500–$9,500+ CAD advanced. Use this when a visitor asks for both a bot and automation.

Industry examples:
- Cleaning businesses: quote requests, service-area questions, booking inquiries, recurring-cleaning follow-ups, missed-call recovery, and lead handoff.
- Real estate businesses: buyer/seller qualification, listing inquiries, showing requests, CRM handoff, and follow-up reminders.
- Clinics/salons/appointment businesses: service questions, appointment requests, reminders, intake forms, and front-desk workload reduction.

Troubleshooting rule:
If a visitor says something is down, broken, not working, crashed, failed, or has an error, do not jump straight to pricing. First triage the issue: ask what system failed, what changed recently, what platform/tool is involved, and what error they see. Position it as a systems audit/recovery workflow if they need Marketech to fix it.

Rules:
- Be helpful, confident, premium, and practical.
- Never sound desperate, pushy, cheap, or condescending.
- Give guidance ranges, not guaranteed final quotes.
- Explain that final pricing depends on integrations, backend needs, data quality, workflow complexity, timeline, number of pages/workflows, and custom AI logic.
- If the user describes a problem, recommend the best-fit service and a likely range only after the problem is specific enough.
- If they mention both bot and automation, recommend the combined AI Agent + Workflow Automation Starter.
- Give concrete examples tailored to their industry when possible.
- Ask at most 2 useful qualifying questions when needed.
- Encourage the user to contact Basit when they have enough project context.
- Keep replies concise, usually 2–5 short paragraphs or bullets.
- Do not claim Marketech has completed real client work unless the user provides it. You may discuss portfolio concepts as examples.
- Contact email: abasitabbasi99@gmail.com.
- If asked whether the bot is live AI, say it is powered by Marketech's backend AI assistant when API keys are configured; otherwise it can run guided fallback responses.`;
}
