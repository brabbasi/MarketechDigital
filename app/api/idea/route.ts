import { NextResponse } from "next/server";
import { buildSystemPrompt } from "../../lib/marketech-knowledge";

export const runtime = "nodejs";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

type IdeaInput = {
  business?: string;
  goal?: string;
  friction?: string;
  tools?: string;
};

type IdeaResponse = {
  title: string;
  overview: string;
  recommendedSystem: string;
  firstBuild: string[];
  automations: string[];
  dataLayer: string[];
  priceRange: string;
  nextQuestions: string[];
};

function clean(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim().slice(0, 900) : fallback;
}

function detectIndustry(text: string) {
  const q = text.toLowerCase();
  if (/(cleaning|cleaner|janitorial|maid|housekeeping)/.test(q)) return "cleaning business";
  if (/(real estate|realtor|property|mortgage)/.test(q)) return "real estate or property business";
  if (/(clinic|dental|medical|physio|salon|spa|appointment)/.test(q)) return "appointment-based service business";
  if (/(restaurant|food|cafe|catering)/.test(q)) return "food or hospitality business";
  if (/(ecommerce|shopify|store|retail|product)/.test(q)) return "ecommerce or retail business";
  if (/(agency|marketing|consulting|service provider)/.test(q)) return "service agency";
  if (/(construction|contractor|trades|hvac|plumbing|electrical|roofing)/.test(q)) return "trades or contractor business";
  return "business";
}

function localIdea(input: IdeaInput): IdeaResponse {
  const business = clean(input.business, "business");
  const goal = clean(input.goal, "capture better leads, reduce manual work, and improve clarity");
  const friction = clean(input.friction, "unclear inquiries, repeated questions, manual follow-ups, and scattered tracking");
  const tools = clean(input.tools, "website, email, forms, spreadsheets, CRM, or booking tools");
  const industry = detectIndustry(`${business} ${goal} ${friction}`);
  const q = `${business} ${goal} ${friction} ${tools}`.toLowerCase();

  const wantsBot = /(bot|chat|assistant|faq|lead|inquiry|quote|customer|website)/.test(q);
  const wantsAutomation = /(follow|manual|admin|workflow|automation|crm|booking|routing|alert|email|repetitive)/.test(q);
  const wantsData = /(dashboard|data|report|kpi|metric|track|visibility|analytics|decision)/.test(q);

  let recommendedSystem = "AI Agent + Workflow Automation Starter";
  let priceRange = "$1,500–$4,500 CAD starter / $4,500–$9,500+ CAD advanced";
  if (wantsData && !wantsBot) {
    recommendedSystem = "Decision Intelligence Dashboard Starter";
    priceRange = "$2,000–$8,000+ CAD depending on data sources and dashboard complexity";
  } else if (wantsBot && !wantsAutomation && !wantsData) {
    recommendedSystem = "AI Agent Website Bot";
    priceRange = "$750–$2,500 CAD starter / $3,500–$8,000+ CAD advanced";
  } else if (wantsAutomation && !wantsBot) {
    recommendedSystem = "Workflow Automation Build";
    priceRange = "$1,500–$6,000+ CAD depending on integrations and workflow steps";
  }

  const industryIdeas: Record<string, string[]> = {
    "cleaning business": [
      "Create a quote-intake assistant that asks property type, service frequency, approximate size, location, urgency, and special instructions before handoff.",
      "Trigger instant follow-up emails or texts for new quote requests, missed calls, recurring-cleaning inquiries, and incomplete booking forms.",
      "Track leads by service type, quote status, booking status, follow-up date, and estimated monthly value."
    ],
    "real estate or property business": [
      "Qualify buyer, seller, tenant, or landlord inquiries before they reach the team.",
      "Route hot leads based on budget, location, timeline, property type, and mortgage/pre-approval readiness.",
      "Create a simple pipeline view for inquiry source, lead quality, showing requests, next follow-up, and conversion stage."
    ],
    "appointment-based service business": [
      "Build an AI receptionist layer that answers service questions, captures intake details, and guides booking requests.",
      "Automate reminders, intake form links, cancellation follow-ups, and front-desk notifications.",
      "Track appointment requests, no-shows, service demand, referral source, and response time."
    ],
    "food or hospitality business": [
      "Guide catering, reservation, menu, and event inquiries through a structured intake flow.",
      "Automate event quote follow-ups, allergy/preference collection, and staff alerts.",
      "Track inquiry type, order value, event date, status, and source."
    ],
    "ecommerce or retail business": [
      "Use an assistant to answer product questions, handle order-status guidance, and recommend next actions.",
      "Automate abandoned inquiry follow-ups, support categorization, and priority handoff.",
      "Track product questions, support themes, conversion blockers, and high-intent visitors."
    ],
    "service agency": [
      "Qualify prospects by business type, budget, urgency, desired outcome, and current tools.",
      "Automate proposal-intake summaries, internal routing, and follow-up reminders.",
      "Track lead quality, source, project type, response speed, and proposal stage."
    ],
    "trades or contractor business": [
      "Capture job type, location, urgency, photos/details, budget expectation, and preferred appointment window.",
      "Automate dispatch alerts, estimate follow-ups, and CRM updates for new service requests.",
      "Track inquiry source, job type, quote status, booked jobs, and follow-up gaps."
    ],
    business: [
      "Turn unclear inquiries into a structured intake flow so every lead arrives with useful context.",
      "Automate follow-ups, owner/team notifications, and simple CRM or spreadsheet updates.",
      "Create a visibility layer for lead source, status, next action, bottlenecks, and business outcomes."
    ]
  };

  const base = industryIdeas[industry] || industryIdeas.business;

  return {
    title: `A practical starter system for your ${industry}`,
    overview: `Based on your goal to ${goal}, and the friction around ${friction}, the strongest first move is not a random AI feature. It is a focused system that captures the right information, routes it cleanly, and gives you a simple visibility layer so decisions and follow-ups do not depend on memory.`,
    recommendedSystem,
    firstBuild: [
      base[0],
      `Design the intake questions around your real workflow: business type, customer need, urgency, budget, location/service fit, and next action.`,
      `Connect the front-end experience to the tools you already use: ${tools}.`
    ],
    automations: [
      base[1],
      "Send a clean lead summary to the owner or team with the recommended next action.",
      "Create a fallback path for incomplete inquiries so warm leads do not disappear."
    ],
    dataLayer: [
      base[2],
      "Add a small dashboard or command view so you can see what is coming in, what is stuck, and what is converting.",
      "Use conversation data to improve website copy, FAQs, offers, and service routing over time."
    ],
    priceRange,
    nextQuestions: [
      "What tool receives your leads today: email, forms, WhatsApp, CRM, spreadsheet, or booking app?",
      "What happens after a lead submits a form, and where do leads usually get lost?"
    ]
  };
}

function parseIdeaJson(text: string, fallback: IdeaResponse): IdeaResponse {
  try {
    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned) as Partial<IdeaResponse>;
    return {
      title: typeof parsed.title === "string" ? parsed.title : fallback.title,
      overview: typeof parsed.overview === "string" ? parsed.overview : fallback.overview,
      recommendedSystem: typeof parsed.recommendedSystem === "string" ? parsed.recommendedSystem : fallback.recommendedSystem,
      firstBuild: Array.isArray(parsed.firstBuild) ? parsed.firstBuild.map(String).slice(0, 4) : fallback.firstBuild,
      automations: Array.isArray(parsed.automations) ? parsed.automations.map(String).slice(0, 4) : fallback.automations,
      dataLayer: Array.isArray(parsed.dataLayer) ? parsed.dataLayer.map(String).slice(0, 4) : fallback.dataLayer,
      priceRange: typeof parsed.priceRange === "string" ? parsed.priceRange : fallback.priceRange,
      nextQuestions: Array.isArray(parsed.nextQuestions) ? parsed.nextQuestions.map(String).slice(0, 3) : fallback.nextQuestions
    };
  } catch {
    return fallback;
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const input: IdeaInput = {
    business: clean(body.business),
    goal: clean(body.goal),
    friction: clean(body.friction),
    tools: clean(body.tools)
  };

  const fallback = localIdea(input);

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ idea: fallback, mode: "guided", reason: "missing_openai_api_key" });
  }

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.55,
        max_tokens: 900,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          {
            role: "user",
            content: `Create a thoughtful, specific, non-generic Marketech Digital starter-system idea for this visitor. Return ONLY valid JSON with keys: title, overview, recommendedSystem, firstBuild array, automations array, dataLayer array, priceRange, nextQuestions array.\n\nBusiness: ${input.business || "not specified"}\nGoal: ${input.goal || "not specified"}\nFriction: ${input.friction || "not specified"}\nCurrent tools: ${input.tools || "not specified"}\n\nMake it practical, industry-aware, useful before a call, and tied to Marketech services. Give guidance pricing, not a guaranteed quote.`
          }
        ]
      })
    });

    if (!response.ok) {
      return NextResponse.json({ idea: fallback, mode: "guided", reason: `openai_error_${response.status}` });
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    const idea = typeof content === "string" ? parseIdeaJson(content, fallback) : fallback;
    return NextResponse.json({ idea, mode: "ai", reason: "openai_connected" });
  } catch {
    return NextResponse.json({ idea: fallback, mode: "guided", reason: "route_exception" });
  }
}
