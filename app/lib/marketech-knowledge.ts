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

export function estimateService(message: string) {
  const q = message.toLowerCase();
  if (/(bot|agent|chat|assistant|faq|lead capture|lead qualification)/.test(q)) return marketechServices[0];
  if (/(strategy|roadmap|audit|plan|consult|where to start|idea)/.test(q)) return marketechServices[1];
  if (/(automation|workflow|zapier|make|crm|follow.?up|admin|routing|alert|manual)/.test(q)) return marketechServices[2];
  if (/(dashboard|data|analytics|report|kpi|metrics|business intelligence|bi)/.test(q)) return marketechServices[3];
  if (/(system|stack|full|growth|operating layer|backend|platform|website)/.test(q)) return marketechServices[4];
  return null;
}

export function localAssistantReply(message: string) {
  const q = message.toLowerCase();
  const service = estimateService(message);

  if (/(price|pricing|quote|cost|budget|estimate|range)/.test(q)) {
    if (service) {
      return `This sounds closest to ${service.name}. Typical guidance range: ${service.range}. Best fit: ${service.bestFor} A final quote depends on integrations, data quality, number of workflows/pages, backend needs, and how much custom AI logic is required.`;
    }
    return `Marketech guidance ranges are: ${marketechServices.map((item) => `${item.name}: ${item.range}`).join("; ")}. Tell me your business type and what you want automated or clarified, and I can narrow the likely fit.`;
  }

  if (/(founder|basit|education|who built|owner)/.test(q)) {
    return `${founderProfile.name} is the ${founderProfile.role}. He studied ${founderProfile.education} and focuses on ${founderProfile.focus}. You can open the founder page for the full portfolio-style profile.`;
  }

  if (/(start|contact|book|call|next step)/.test(q)) {
    return "The best first step is to describe your business, current bottleneck, tools you use, desired outcome, and budget range. I can then suggest whether you need an AI strategy sprint, AI agent bot, workflow automation, dashboard, or a larger growth systems stack.";
  }

  if (/(solve|help|problem|can you|what can)/.test(q) || service) {
    const picked = service || marketechServices[2];
    return `Marketech can help with problems where work is repetitive, scattered, unclear, or hard to measure. Your message sounds like it may fit ${picked.name}: ${picked.range}. Typical deliverables include ${picked.deliverables.join(", ")}.`;
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

Rules:
- Be helpful, confident, premium, and practical.
- Never sound desperate, pushy, cheap, or condescending.
- Give guidance ranges, not guaranteed final quotes.
- Explain that final pricing depends on integrations, backend needs, data quality, workflow complexity, timeline, number of pages/workflows, and custom AI logic.
- If the user describes a problem, recommend the best-fit service and a likely range.
- Ask at most 2 useful qualifying questions when needed.
- Encourage the user to contact Basit when they have enough project context.
- Keep replies concise, usually 2–5 short paragraphs or bullets.
- Do not claim Marketech has completed real client work unless the user provides it. You may discuss portfolio concepts as examples.
- Contact email: abasitabbasi99@gmail.com.
- If asked whether the bot is live AI, say it is powered by Marketech's backend AI assistant when API keys are configured; otherwise it can run guided fallback responses.`;
}
