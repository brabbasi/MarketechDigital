export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export const marketechServices = [
  {
    name: "AI Agent Website Bot",
    range: "$750 to $2,500 CAD to start, $3,500 to $8,000+ CAD for a deeper build",
    bestFor: "Business owners who want their website to answer questions, capture better inquiries, guide people to the right service, and pass cleaner details to the team.",
    deliverables: ["Website chat assistant", "Service guidance", "Lead qualification", "Email and contact handoff", "Conversation copy written for the business"]
  },
  {
    name: "AI Strategy Sprint",
    range: "$500 to $1,500 CAD",
    bestFor: "Founders or teams who know AI could help, but want a clear plan before spending money on tools or development.",
    deliverables: ["AI opportunity review", "Plan for the next 30 to 90 days", "Practical use case shortlist", "Tool recommendations", "Clear implementation direction"]
  },
  {
    name: "Workflow Automation Build",
    range: "$1,500 to $6,000+ CAD",
    bestFor: "Teams dealing with repeated admin work, intake, follow ups, task routing, internal alerts, reporting flows, or CRM handoffs.",
    deliverables: ["Workflow mapping", "Automation plan", "Tool connection", "Testing", "Simple handoff notes"]
  },
  {
    name: "Decision Intelligence Dashboard",
    range: "$2,000 to $8,000+ CAD",
    bestFor: "Owners and teams who need a clearer view of leads, sales, operations, campaigns, and business activity without digging through scattered tools.",
    deliverables: ["KPI structure", "Dashboard design", "Data cleanup plan", "Reporting logic", "Decision views"]
  },
  {
    name: "Growth Systems Stack",
    range: "$4,000 to $15,000+ CAD",
    bestFor: "Businesses that want their website, automation, lead capture, analytics, SEO, and growth work to feel connected instead of scattered.",
    deliverables: ["Systems blueprint", "Automation stack", "Data visibility", "AI assistant layer", "Growth workflow design"]
  }
];

export const founderProfile = {
  name: "Basit Abbasi",
  role: "Founder of Marketech Digital",
  education: "Bachelor's in Computer Science from the University of Hertfordshire",
  focus: "AI systems, workflow automation, data intelligence, bot creation, decision support, web systems, and practical digital execution"
};

function isUrgentBrokenSystem(message: string) {
  return /(system|site|website|app|automation|bot|dashboard|crm|form|backend|workflow).*(down|broken|not working|stopped|crashed|failed|error|bug|offline|issue)|(?:down|broken|not working|stopped|crashed|failed|error|bug|offline).*(system|site|website|app|automation|bot|dashboard|crm|form|backend|workflow)/.test(message.toLowerCase());
}

function isGeneralInternetQuestion(message: string) {
  return /(internet|wifi|wi-fi|router|modem|network|connection).*(not working|down|slow|fix|issue|problem|offline)|(?:how do i fix|fix|repair|troubleshoot).*(internet|wifi|wi-fi|router|modem|network|connection)/.test(message.toLowerCase());
}

function generalInternetReply() {
  return `If your internet is down, try this first:

1. Restart the modem and router. Unplug both for 30 seconds, then plug the modem in first. Wait until it settles, then plug in the router.
2. Check whether the issue is one device or every device. If it is only one device, restart it and reconnect to WiFi.
3. Check your provider app or outage page.
4. Try Ethernet if you can. If Ethernet works but WiFi does not, the issue is likely with the router or WiFi signal.
5. If the modem still shows warning lights after a restart, contact your internet provider.

For Marketech Digital, I can help if the internet issue is affecting your business website, booking flow, AI assistant, CRM, automation, dashboard, or lead system. What part of your business is being affected?`;
}

export function estimateService(message: string) {
  const q = message.toLowerCase();
  const wantsBot = /(bot|agent|chat|assistant|faq|lead capture|lead qualification)/.test(q);
  const wantsAutomation = /(automation|automate|workflow|zapier|make|crm|follow.?up|admin|routing|alert|manual|booking|estimate|quote request)/.test(q);
  const wantsDashboard = /(dashboard|data|analytics|report|kpi|metrics|business intelligence|bi)/.test(q);

  if (wantsBot && wantsAutomation) {
    return {
      name: "AI Agent and Workflow Automation Starter",
      range: "$1,500 to $4,500 CAD to start, $4,500 to $9,500+ CAD for a deeper build",
      bestFor: "Businesses that want the website assistant and the follow up, booking, CRM, or internal notification flow to work together.",
      deliverables: ["AI website guide", "Lead qualification", "Inquiry routing", "Follow up automation", "Basic CRM or email handoff"]
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
      useCase: "quote requests, service area questions, booking inquiries, recurring cleaning follow ups, missed call recovery, and lead handoff",
      firstBuild: "an AI quote and intake assistant connected to a follow up flow for new leads"
    };
  }
  if (/(real estate|realtor|property)/.test(q)) {
    return {
      industry: "real estate business",
      useCase: "buyer and seller qualification, listing inquiries, showing requests, CRM handoff, and follow up reminders",
      firstBuild: "an AI lead qualifier connected to a CRM and follow up sequence"
    };
  }
  if (/(clinic|dental|medical|physio|salon|spa)/.test(q)) {
    return {
      industry: "appointment based business",
      useCase: "service questions, appointment requests, reminders, intake forms, and front desk workload reduction",
      firstBuild: "an AI receptionist style assistant with appointment and intake support"
    };
  }
  return null;
}

function brokenSystemReply() {
  return `I can help, but I should not guess the fix without knowing what failed.

First, identify where the issue is happening:

1. Website or app is not loading
2. Form or booking flow is not sending
3. AI assistant is not responding
4. Automation or CRM handoff is failing
5. Dashboard or data feed is not updating

Tell me what system is down, what changed recently, the exact error if you see one, and what tool or platform it runs on. If it is affecting your business, Marketech can start with a systems review, find the cause, and then quote the repair properly.`;
}

export function localAssistantReply(message: string) {
  const q = message.toLowerCase();
  const service = estimateService(message);
  const industry = industrySuggestion(message);

  if (isGeneralInternetQuestion(message)) {
    return generalInternetReply();
  }

  if (isUrgentBrokenSystem(message)) {
    return brokenSystemReply();
  }

  if (/(price|pricing|quote|cost|budget|estimate|range)/.test(q)) {
    if (service) {
      const industryLine = industry
        ? `For a ${industry.industry}, I would start with ${industry.firstBuild}. It can help with ${industry.useCase}.\n\n`
        : "";

      return `${industryLine}Best starting point: ${service.name}.\n\nTypical guidance range: ${service.range}.\n\nWhat that could include:\n\n${service.deliverables.map((item, index) => `${index + 1}. ${item}`).join("\n")}\n\nA final quote depends on your website, tools, booking setup, CRM setup, backend needs, number of workflows, and how much custom AI logic is needed. Two useful questions: what tools do you currently use, and where do most new leads come from?`;
    }
    return `Here are typical Marketech starting ranges:\n\n${marketechServices.map((item, index) => `${index + 1}. ${item.name}: ${item.range}`).join("\n")}\n\nTell me your business type and what you want fixed or improved, and I can narrow the likely fit.`;
  }

  if (/(founder|basit|education|who built|owner)/.test(q)) {
    return `${founderProfile.name} is the ${founderProfile.role}. He studied ${founderProfile.education} and focuses on ${founderProfile.focus}. You can open the founder page for the full portfolio style profile.`;
  }

  if (/(start|contact|book|call|next step)/.test(q)) {
    return "The best first step is to describe your business, the main bottleneck, the tools you use, the outcome you want, and the budget range you are comfortable with. From there, I can suggest whether you need an AI strategy sprint, an AI website assistant, workflow automation, a dashboard, or a larger growth system.";
  }

  if (/(solve|help|problem|can you|what can)/.test(q) || service) {
    const picked = service || marketechServices[2];
    const industryLine = industry ? `For a ${industry.industry}, a strong first system would help with ${industry.useCase}. ` : "";
    return `${industryLine}This sounds like a fit for ${picked.name}. Typical guidance range: ${picked.range}.\n\nCommon deliverables:\n\n${picked.deliverables.map((item, index) => `${index + 1}. ${item}`).join("\n")}\n\nIf you share your current tools and the main workflow you want fixed, I can narrow this into a sensible starter scope.`;
  }

  return "I can help you understand what Marketech Digital can build for your business. That can include AI website assistants, workflow automations, dashboards, CRM flows, lead capture systems, websites, SEO, branding, landing pages, and larger digital systems. Tell me what your business does and what feels slow, repetitive, or unclear.";
}

export function buildSystemPrompt() {
  return `You are Marketech Intelligence, the AI sales and project advisor for Marketech Digital.

Company positioning:
Marketech Digital helps business owners turn scattered websites, tools, workflows, leads, and data into clearer digital systems. The work can include web development, software systems, app development, AI assistants, workflow automation, SEO, branding, digital marketing, landing pages, dashboards, and growth systems.

Founder:
${founderProfile.name}, ${founderProfile.role}. Education: ${founderProfile.education}. Focus: ${founderProfile.focus}.

Services and guidance ranges:
${marketechServices
  .map(
    (service, index) => `${index + 1}. ${service.name}: ${service.range}. Best for: ${service.bestFor}. Deliverables: ${service.deliverables.join(", ")}.`
  )
  .join("\n")}

Important combined offer:
AI Agent and Workflow Automation Starter: $1,500 to $4,500 CAD to start, $4,500 to $9,500+ CAD for a deeper build. Use this when a visitor asks for both a bot and automation.

Industry examples:
1. Cleaning businesses: quote requests, service area questions, booking inquiries, recurring cleaning follow ups, missed call recovery, and lead handoff.
2. Real estate businesses: buyer and seller qualification, listing inquiries, showing requests, CRM handoff, and follow up reminders.
3. Clinics, salons, and appointment based businesses: service questions, appointment requests, reminders, intake forms, and front desk workload reduction.

Troubleshooting rule:
If a visitor says something is down, broken, not working, crashed, failed, or has an error, do not jump straight to pricing. First ask what system failed, what changed recently, what platform is involved, and what error they see. Position it as a systems review or recovery workflow if they need Marketech to fix it.

General helpfulness rule:
If a visitor asks a simple technology question, give a brief helpful answer first, then connect it back to what Marketech can help with if it affects their website, AI assistant, automation, CRM, dashboard, booking, or lead system.

Rules:
1. Sound helpful, calm, honest, premium, and practical.
2. Do not sound desperate, pushy, cheap, robotic, or condescending.
3. Give guidance ranges, not guaranteed final quotes.
4. Explain that final pricing depends on integrations, backend needs, data quality, workflow complexity, timeline, number of pages or workflows, and custom AI logic.
5. If the visitor describes a problem, recommend the best fit service and a likely range only after the problem is specific enough.
6. If they mention both bot and automation, recommend the combined AI Agent and Workflow Automation Starter.
7. Give concrete examples tailored to their industry when possible.
8. Ask at most two useful questions when needed.
9. Encourage the visitor to contact Basit when they have enough project context.
10. Keep replies concise, usually two to five short paragraphs or a numbered list.
11. Do not claim Marketech has completed real client work unless the user provides it. You may discuss portfolio concepts as examples.
12. Contact email: abasitabbasi99@gmail.com.
13. If asked whether the bot is live AI, say it is powered by Marketech's backend AI assistant when API keys are configured. Otherwise it can still guide visitors with prepared responses.`;
}
