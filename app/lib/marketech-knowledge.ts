import { insights, insightCategories } from "../insights/insights-data";
import { servicePages } from "../services/service-pages";

export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export const companyContactEmail = "contact@getmarketechdigital.com";
export const founderEmail = "basit@getmarketechdigital.com";
export const projectEmail = "project@getmarketechdigital.com";
export const supportEmail = "support@getmarketechdigital.com";
export const outreachEmail = "hello@getmarketechdigital.com";

export const socialLinks = {
  company: {
    linkedin: "https://www.linkedin.com/company/marketechdigital/",
    instagram: "https://www.instagram.com/official.marketech?igsh=NTR0YnVhemRiMnhr",
    facebook: "https://www.facebook.com/share/17ee6kJiPF/",
    email: `mailto:${companyContactEmail}`
  },
  founder: {
    linkedin: "https://www.linkedin.com/in/basitrabbasi?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram: "https://www.instagram.com/a.b_abbasi?igsh=ZzViNGc5bjNxaDJ4",
    facebook: "https://www.facebook.com/share/17yJwoTW1r/",
    github: "https://github.com/brabbasi",
    email: `mailto:${founderEmail}`
  }
};

export const marketechProfile = {
  name: "Marketech Digital",
  type: "Founder-led digital growth company, Ottawa digital agency, AI automation studio, and premium website systems partner",
  positioning:
    "Marketech Digital helps small and local businesses turn outdated websites, weak online presence, scattered lead flow, and repetitive manual work into premium lead-generating systems using website design, SEO, Google Business Profile optimization, branding, lead capture, AI automation, workflow automation, and growth strategy.",
  belief:
    "Small businesses should not have to look small online. Marketech Digital gives businesses a cleaner digital presence, stronger trust layer, better lead capture, useful automation, and practical growth systems without agency bloat.",
  primaryAudience:
    "Small and local businesses in Ottawa, Kanata, Barrhaven, Nepean, Gatineau, nearby Ontario communities, and remote Canadian clients. Strong-fit industries include barbershops, cleaning companies, car detailing businesses, immigration consultants, restaurants, contractors, salons, clinics, home service companies, and local service businesses.",
  profilePage: "/about",
  founderPage: "/founder",
  servicesPage: "/services",
  auditPage: "/audit",
  insightsPage: "/insights",
  aboutUsLocation:
    "The home page includes an About Us carousel with two profile cards: Marketech Digital as the company profile and Basit Abbasi as the founder profile.",
  profileExperience:
    "The Marketech Digital profile page shows the company story, mission, trust positioning, focus areas, and a social orbit around the logo. The founder profile page shows Basit Abbasi, his approach, focus areas, and a social orbit around the founder photo.",
  trustSignals: [
    "Founder-led execution",
    "Built for local businesses",
    "Website + SEO + automation focus",
    "Conversion-first digital systems",
    "Practical execution without agency bloat",
    "Free Website Growth Audit as the main low-pressure starting point",
    "Human, premium, no-fake-guarantee SEO and growth guidance"
  ]
};

export const freeWebsiteGrowthAudit = {
  name: "Free Website Growth Audit",
  href: "/audit",
  positioning:
    "A low-pressure review for local businesses that want to understand what is holding back their website, Google presence, lead flow, and automation opportunities.",
  reviews: [
    "website design and first impression",
    "mobile experience",
    "SEO basics",
    "Google Business Profile visibility and trust signals",
    "lead capture and contact flow",
    "simple AI automation or workflow automation opportunities"
  ],
  ctaOptions: ["Get a Free Website Growth Audit", "Request Free Audit", "See What Your Website Is Missing", "Improve My Website"]
};

export const siteNavigation = [
  { label: "Home", href: "/" },
  { label: "Free Audit", href: "/audit" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Founder", href: "/founder" },
  { label: "Contact", href: "/#contact" }
];

export const marketechServices = servicePages.map((service) => ({
  name: service.name,
  slug: service.slug,
  href: `/services/${service.slug}`,
  range: `${service.price} — ${service.priceContext}`,
  bestFor: service.whoFor.join(" "),
  deliverables: service.builds.slice(0, 7),
  category: service.category,
  intro: service.intro,
  label: service.label
}));

export const coreCapabilities = [
  "premium website design and development",
  "custom web development",
  "software development",
  "app development",
  "local SEO and technical SEO foundations",
  "Google Business Profile optimization guidance",
  "branding and digital identity",
  "landing pages and lead capture systems",
  "AI website assistants",
  "AI automation for small businesses",
  "workflow automation and CRM handoffs",
  "decision dashboards and reporting layers",
  "digital marketing systems",
  "growth strategy and systems planning"
];

export const insightHub = {
  name: "Local Business Growth Insights",
  href: "/insights",
  subtitle:
    "Practical website, SEO, and automation advice for Ottawa businesses that want more leads without wasting money on ads.",
  categories: insightCategories.filter((category) => category !== "All"),
  purpose:
    "The Insights section is a strategic content hub, not a basic blog. It is built to educate local business owners, support organic SEO, build trust, and guide readers toward the Free Website Growth Audit.",
  articles: insights.map((article) => ({
    title: article.title,
    href: `/insights/${article.slug}`,
    category: article.category,
    excerpt: article.excerpt,
    readTime: article.readTime,
    date: article.date,
    seoTitle: article.seoTitle,
    metaDescription: article.metaDescription
  }))
};

export const founderProfile = {
  name: "Basit Abbasi",
  role: "Founder of Marketech Digital",
  education: "Bachelor's in Computer Science from the University of Hertfordshire",
  focus: "AI systems, workflow automation, data intelligence, bot creation, decision support, web systems, SEO foundations, branding support, lead capture, and practical digital execution",
  founderPage: "/founder",
  story:
    "Basit founded Marketech Digital to help businesses combine design, technology, marketing, and automation into one clear growth system. The inspiration came from seeing small businesses lose trust and leads because their websites, branding, SEO, Google presence, or workflows felt outdated, unclear, or hard to use."
};

export const socialProfileNotes = {
  company:
    `Company social links are shown on the Marketech Digital profile page as orbiting icons around the logo. LinkedIn: ${socialLinks.company.linkedin}. Instagram: ${socialLinks.company.instagram}. Facebook: ${socialLinks.company.facebook}. Email: ${socialLinks.company.email.replace("mailto:", "")}.`,
  founder:
    `Founder social links are shown on the founder profile page as orbiting icons around Basit Abbasi's photo. LinkedIn: ${socialLinks.founder.linkedin}. Instagram: ${socialLinks.founder.instagram}. Facebook: ${socialLinks.founder.facebook}. GitHub: ${socialLinks.founder.github}. Email: ${socialLinks.founder.email.replace("mailto:", "")}.`
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
2. Check whether the issue is one device or every device.
3. Check your provider app or outage page.
4. Try Ethernet if you can.
5. If the modem still shows warning lights after a restart, contact your internet provider.

For Marketech Digital, I can help if the internet issue is affecting your business website, booking flow, AI assistant, CRM, automation, dashboard, or lead system. What part of your business is being affected?`;
}

function findServiceByIntent(message: string) {
  const q = message.toLowerCase();

  const matches = marketechServices.find((service) => {
    const name = service.name.toLowerCase();
    return q.includes(name) || q.includes(service.slug.replace(/-/g, " "));
  });
  if (matches) return matches;

  if (/(website|web site|web design|web development|landing page|mobile layout|site redesign|premium site|pagespeed|page speed)/.test(q)) {
    return marketechServices.find((service) => service.slug === "web-development") || null;
  }
  if (/(seo|rank|ranking|google search|bing|local seo|keyword|metadata|schema|sitemap|index|search console)/.test(q)) {
    return marketechServices.find((service) => service.slug === "seo") || null;
  }
  if (/(google business|gbp|business profile|maps|map pack|reviews|local listing|google profile)/.test(q)) {
    return marketechServices.find((service) => service.slug === "seo") || null;
  }
  if (/(brand|branding|logo|identity|visual|premium look|trustworthy|professional look)/.test(q)) {
    return marketechServices.find((service) => service.slug === "branding") || null;
  }
  if (/(marketing|campaign|leads|lead generation|conversion|funnel|ads|landing)/.test(q)) {
    return marketechServices.find((service) => service.slug === "digital-marketing") || null;
  }
  if (/(software|portal|internal tool|custom system|platform|backend|admin panel|dashboard app)/.test(q)) {
    return marketechServices.find((service) => service.slug === "software-development") || null;
  }
  if (/(bot|agent|chat|assistant|faq|lead capture|lead qualification|ai receptionist)/.test(q)) {
    return marketechServices.find((service) => service.slug === "ai-agent-website-bot") || marketechServices.find((service) => service.slug === "ai-automation") || null;
  }
  if (/(automation|automate|workflow|zapier|make|crm|follow.?up|admin|routing|alert|manual|booking|estimate|quote request|missed call)/.test(q)) {
    return marketechServices.find((service) => service.slug === "workflow-automation-build") || marketechServices.find((service) => service.slug === "ai-automation") || null;
  }
  if (/(dashboard|data|analytics|report|kpi|metrics|business intelligence|bi)/.test(q)) {
    return marketechServices.find((service) => service.slug === "decision-intelligence-dashboard") || null;
  }
  if (/(strategy|roadmap|audit|plan|consult|where to start|idea)/.test(q)) {
    return marketechServices.find((service) => service.slug === "ai-strategy-sprint") || null;
  }
  if (/(system|stack|full|growth|operating layer|everything connected|complete setup)/.test(q)) {
    return marketechServices.find((service) => service.slug === "growth-systems-stack") || null;
  }
  return null;
}

export function estimateService(message: string) {
  const q = message.toLowerCase();
  const wantsBot = /(bot|agent|chat|assistant|faq|lead capture|lead qualification|ai receptionist)/.test(q);
  const wantsAutomation = /(automation|automate|workflow|zapier|make|crm|follow.?up|admin|routing|alert|manual|booking|estimate|quote request|missed call)/.test(q);

  if (wantsBot && wantsAutomation) {
    return {
      name: "AI Agent and Workflow Automation Starter",
      href: "/services/ai-agent-website-bot",
      range: "$1,500 to $4,500 CAD to start, $4,500 to $9,500+ CAD for a deeper build",
      bestFor: "Businesses that want the website assistant and the follow up, booking, CRM, or internal notification flow to work together.",
      deliverables: ["AI website guide", "Lead qualification", "Inquiry routing", "Follow up automation", "Basic CRM or email handoff"]
    };
  }

  const service = findServiceByIntent(message);
  if (!service) return null;
  return {
    name: service.name,
    href: service.href,
    range: service.range,
    bestFor: service.bestFor,
    deliverables: service.deliverables
  };
}

function industrySuggestion(message: string) {
  const q = message.toLowerCase();
  if (/(cleaning|cleaner|janitorial|maid|housekeeping)/.test(q)) {
    return {
      industry: "cleaning business",
      useCase: "residential vs commercial service pages, quote requests, service area questions, before-and-after proof, Google reviews, recurring cleaning follow ups, missed call recovery, and lead handoff",
      firstBuild: "a quote-focused website or AI quote and intake assistant connected to follow-up automation",
      insight: "/insights/cleaning-company-quote-requests-online"
    };
  }
  if (/(real estate|realtor|property)/.test(q)) {
    return {
      industry: "real estate business",
      useCase: "buyer and seller qualification, listing inquiries, showing requests, CRM handoff, follow up reminders, and trust-building landing pages",
      firstBuild: "an AI lead qualifier connected to a CRM and follow up sequence",
      insight: "/insights/get-more-local-leads-without-ads"
    };
  }
  if (/(clinic|dental|medical|physio|chiro|health)/.test(q)) {
    return {
      industry: "clinic or appointment-based business",
      useCase: "service questions, appointment requests, reminders, intake forms, Google profile trust, and front desk workload reduction",
      firstBuild: "an AI receptionist style assistant with appointment and intake support",
      insight: "/insights/ai-automation-small-business-lead-follow-up"
    };
  }
  if (/(salon|spa|esthetic|lashes|nails|hair)/.test(q)) {
    return {
      industry: "salon or beauty business",
      useCase: "booking buttons, service menus, galleries, reviews, Google profile trust, reminders, and local SEO",
      firstBuild: "a premium booking-focused website with local SEO and simple appointment follow up",
      insight: "/insights/best-website-structure-local-service-businesses"
    };
  }
  if (/(barber|barbershop|haircut|grooming)/.test(q)) {
    return {
      industry: "barbershop or grooming business",
      useCase: "booking buttons, service menu, barber profiles, reviews, gallery, Google Maps, Instagram integration, local SEO, and missed lead recovery",
      firstBuild: "a premium booking-focused website with local SEO and a simple AI inquiry assistant",
      insight: "/insights/website-design-for-barbershops"
    };
  }
  if (/(detailing|car detail|auto detail|car wash)/.test(q)) {
    return {
      industry: "car detailing business",
      useCase: "package questions, quote requests, before-and-after proof, booking flows, Google profile trust, local SEO, and follow up reminders",
      firstBuild: "a conversion-focused website with package pages, lead capture, and automated follow up",
      insight: "/insights/best-website-structure-local-service-businesses"
    };
  }
  if (/(restaurant|food|cafe|pizza|takeout|menu)/.test(q)) {
    return {
      industry: "restaurant or food business",
      useCase: "menu clarity, location trust, Google profile photos, reservations, ordering links, reviews, and mobile-first discovery",
      firstBuild: "a mobile-first website refresh with Google Business Profile optimization and clear call, directions, reservation, or order actions",
      insight: "/insights/google-business-profile-checklist-ottawa"
    };
  }
  if (/(contractor|renovation|roofing|plumbing|hvac|electrician|home service|landscaping|construction)/.test(q)) {
    return {
      industry: "contractor or home service business",
      useCase: "service pages, location pages, reviews, project galleries, quote forms, local SEO, and missed call follow up",
      firstBuild: "a service-page website structure with local SEO and quote request automation",
      insight: "/insights/best-website-structure-local-service-businesses"
    };
  }
  if (/(immigration|consultant|visa|pr application|work permit|study permit)/.test(q)) {
    return {
      industry: "immigration consulting business",
      useCase: "service clarity, trust signals, consultation booking, intake forms, FAQs, local SEO, and organized lead follow up",
      firstBuild: "a trust-focused website with consultation intake, service pages, FAQs, and follow-up automation",
      insight: "/insights/website-visitors-but-no-calls"
    };
  }
  return null;
}

function findRelevantInsights(message: string) {
  const q = message.toLowerCase();
  const scored = insights
    .map((article) => {
      const haystack = `${article.title} ${article.category} ${article.excerpt} ${article.metaDescription} ${article.sections.map((section) => `${section.heading} ${section.paragraphs.join(" ")} ${(section.bullets || []).join(" ")}`).join(" ")}`.toLowerCase();
      const words = q.split(/\W+/).filter((word) => word.length > 3);
      const score = words.reduce((total, word) => total + (haystack.includes(word) ? 1 : 0), 0);
      return { article, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.article);

  if (scored.length) return scored;

  if (/(google business|gbp|maps|review|profile)/.test(q)) return insights.filter((article) => article.slug === "google-business-profile-checklist-ottawa");
  if (/(seo|rank|ranking|search|keywords)/.test(q)) return insights.filter((article) => article.slug === "seo-for-small-businesses-ottawa");
  if (/(lead|leads|calls|bookings|quote)/.test(q)) return insights.filter((article) => ["get-more-local-leads-without-ads", "website-visitors-but-no-calls"].includes(article.slug));
  if (/(barber|barbershop)/.test(q)) return insights.filter((article) => article.slug === "website-design-for-barbershops");
  if (/(cleaning|cleaner)/.test(q)) return insights.filter((article) => article.slug === "cleaning-company-quote-requests-online");
  if (/(premium|trust|2026|modern)/.test(q)) return insights.filter((article) => article.slug === "premium-trustworthy-website-2026");
  return insights.slice(0, 3);
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

function formatInsightLinks(items: ReturnType<typeof findRelevantInsights>) {
  return items.map((article, index) => `${index + 1}. ${article.title}: /insights/${article.slug}`).join("\n");
}

export function localAssistantReply(message: string) {
  const q = message.toLowerCase();
  const service = estimateService(message);
  const industry = industrySuggestion(message);
  const relevantInsights = findRelevantInsights(message);

  if (isGeneralInternetQuestion(message)) {
    return generalInternetReply();
  }

  if (isUrgentBrokenSystem(message)) {
    return brokenSystemReply();
  }

  if (/(insight|insights|blog|article|guide|resources|learn|content)/.test(q)) {
    return `Marketech Digital now has a premium Insights hub, not a basic blog: ${insightHub.href}.

It includes practical guides on website design, local SEO, Google Business Profile optimization, AI automation, lead generation, and industry-specific growth for Ottawa-area businesses.

Good starting points based on your question:

${formatInsightLinks(relevantInsights)}

If you want a faster next step, request the Free Website Growth Audit at ${freeWebsiteGrowthAudit.href}.`;
  }

  if (/(audit|free audit|website audit|growth audit|review my site|check my website|what is missing)/.test(q)) {
    return `${freeWebsiteGrowthAudit.name} is the best starting point: ${freeWebsiteGrowthAudit.href}.

It reviews:
${freeWebsiteGrowthAudit.reviews.map((item, index) => `${index + 1}. ${item}`).join("\n")}

It is designed for business owners who are not sure why their website, Google presence, or lead flow is not producing enough calls, bookings, or quote requests.`;
  }

  if (/(about|company|who are you|who is marketech|marketech digital|trust|story|mission)/.test(q)) {
    return `${marketechProfile.name} is a ${marketechProfile.type}. ${marketechProfile.positioning}

The main audience is: ${marketechProfile.primaryAudience}

The idea behind the company is simple: ${marketechProfile.belief}

Useful pages: Services ${marketechProfile.servicesPage}, Insights ${marketechProfile.insightsPage}, Free Audit ${marketechProfile.auditPage}, About ${marketechProfile.profilePage}, Founder ${marketechProfile.founderPage}.`;
  }

  if (/(social|linkedin|instagram|facebook|github|x\/twitter|twitter|profile links)/.test(q)) {
    return `Here are the current social links:

Marketech Digital:
1. LinkedIn: ${socialLinks.company.linkedin}
2. Instagram: ${socialLinks.company.instagram}
3. Facebook: ${socialLinks.company.facebook}

Basit Abbasi / Founder:
1. LinkedIn: ${socialLinks.founder.linkedin}
2. Instagram: ${socialLinks.founder.instagram}
3. Facebook: ${socialLinks.founder.facebook}
4. GitHub: ${socialLinks.founder.github}`;
  }

  if (/(rank|ranking|google|bing|seo|search engine|search console|indexed|indexing)/.test(q)) {
    return `Marketech can help with SEO foundations, but honest SEO does not promise instant top rankings.

The site now has dedicated service pages, an Insights hub, clean article URLs, metadata, internal links, schema, sitemap support, and local business content around Ottawa, Kanata, Barrhaven, website design, local SEO, Google Business Profile, lead generation, and AI automation.

Helpful next reads:
${formatInsightLinks(relevantInsights)}

Best next step: request the Free Website Growth Audit at ${freeWebsiteGrowthAudit.href}, then improve Google Search Console, Bing Webmaster Tools, Google Business Profile, backlinks/citations, local landing pages, and ongoing content depth.`;
  }

  if (/(price|pricing|quote|cost|budget|estimate|range)/.test(q)) {
    if (service) {
      const industryLine = industry
        ? `For a ${industry.industry}, I would start with ${industry.firstBuild}. It can help with ${industry.useCase}. A useful guide is ${industry.insight}.\n\n`
        : "";

      return `${industryLine}Best starting point: ${service.name}.

Typical guidance range: ${service.range}.

What that could include:

${service.deliverables.map((item, index) => `${index + 1}. ${item}`).join("\n")}

A final quote depends on your website, tools, booking setup, CRM setup, backend needs, number of workflows, timeline, and how much custom AI logic is needed. A safe first step is the Free Website Growth Audit: ${freeWebsiteGrowthAudit.href}.`;
    }
    return `Here are typical Marketech starting ranges:

${marketechServices.map((item, index) => `${index + 1}. ${item.name}: ${item.range}`).join("\n")}

Tell me your business type and what you want fixed or improved, and I can narrow the likely fit. You can also start with the Free Website Growth Audit at ${freeWebsiteGrowthAudit.href}.`;
  }

  if (/(founder|basit|education|who built|owner)/.test(q)) {
    return `${founderProfile.name} is the ${founderProfile.role}. He studied ${founderProfile.education} and focuses on ${founderProfile.focus}. ${founderProfile.story} You can open the founder page at ${founderProfile.founderPage} for the full profile. His LinkedIn is ${socialLinks.founder.linkedin} and GitHub is ${socialLinks.founder.github}.`;
  }

  if (/(start|contact|book|call|next step|how do we start)/.test(q)) {
    return `The best first step is the Free Website Growth Audit: ${freeWebsiteGrowthAudit.href}.

Share your business type, current website, main bottleneck, tools you use, and whether you want more calls, bookings, quote requests, SEO visibility, Google Business Profile improvements, or automation.

For project inquiries, email ${projectEmail}.`;
  }

  if (/(solve|help|problem|can you|what can|improve|fix)/.test(q) || service || industry) {
    const picked = service || marketechServices.find((item) => item.slug === "web-development") || marketechServices[0];
    const industryLine = industry ? `For a ${industry.industry}, a strong first system would help with ${industry.useCase}. Read this guide too: ${industry.insight}.\n\n` : "";
    return `${industryLine}This sounds like a fit for ${picked.name}. Typical guidance range: ${picked.range}.

Common deliverables:

${picked.deliverables.map((item, index) => `${index + 1}. ${item}`).join("\n")}

Useful related Insights:
${formatInsightLinks(relevantInsights)}

If you want a low-pressure first step, request the Free Website Growth Audit at ${freeWebsiteGrowthAudit.href}.`;
  }

  return `I can help you understand what Marketech Digital can build for your business. That can include premium websites, local SEO, Google Business Profile optimization, lead capture systems, AI website assistants, workflow automations, dashboards, CRM flows, branding, landing pages, and larger digital growth systems.

Useful pages:
1. Services: /services
2. Insights: /insights
3. Free Website Growth Audit: /audit

Tell me what your business does and what feels slow, repetitive, outdated, or unclear.`;
}

export function buildSystemPrompt() {
  return `You are Marketech Intelligence, the AI sales and project advisor for Marketech Digital.

Company positioning:
${marketechProfile.name} is a ${marketechProfile.type}. ${marketechProfile.positioning}

Primary audience:
${marketechProfile.primaryAudience}

Company belief and story:
${marketechProfile.belief}

Current website structure:
${siteNavigation.map((item) => `${item.label}: ${item.href}`).join("\n")}

Current website trust structure:
${marketechProfile.aboutUsLocation}
${marketechProfile.profileExperience}
Company profile page: ${marketechProfile.profilePage}.
Founder profile page: ${marketechProfile.founderPage}.
Trust signals: ${marketechProfile.trustSignals.join(", ")}.

Free Website Growth Audit:
Name: ${freeWebsiteGrowthAudit.name}
Page: ${freeWebsiteGrowthAudit.href}
Positioning: ${freeWebsiteGrowthAudit.positioning}
Audit reviews: ${freeWebsiteGrowthAudit.reviews.join(", ")}.
Use this as the main low-pressure CTA when the visitor is unsure, asks about their website, SEO, Google profile, local leads, conversion problems, or automation opportunities.

Founder:
${founderProfile.name}, ${founderProfile.role}. Education: ${founderProfile.education}. Focus: ${founderProfile.focus}. Story: ${founderProfile.story}

Social profile links:
${socialProfileNotes.company}
${socialProfileNotes.founder}

Core capabilities:
${coreCapabilities.map((item, index) => `${index + 1}. ${item}`).join("\n")}

Services and guidance ranges:
${marketechServices
  .map(
    (service, index) => `${index + 1}. ${service.name} (${service.href}): ${service.range}. Best for: ${service.bestFor}. Deliverables: ${service.deliverables.join(", ")}.`
  )
  .join("\n")}

Important combined offer:
AI Agent and Workflow Automation Starter: $1,500 to $4,500 CAD to start, $4,500 to $9,500+ CAD for a deeper build. Use this when a visitor asks for both a bot and automation.

Insights hub:
${insightHub.name}: ${insightHub.href}
Purpose: ${insightHub.purpose}
Subtitle: ${insightHub.subtitle}
Categories: ${insightHub.categories.join(", ")}
Articles:
${insightHub.articles.map((article, index) => `${index + 1}. ${article.title} (${article.category}) — ${article.href}. ${article.excerpt}`).join("\n")}

Industry examples:
1. Barbershops: booking buttons, service menu, barber profiles, reviews, gallery, Google Maps, Instagram integration, mobile-first design, and local SEO. Related insight: /insights/website-design-for-barbershops.
2. Cleaning businesses: residential vs commercial pages, quote forms, before-and-after photos, reviews, service areas, trust badges, FAQs, and automated follow ups. Related insight: /insights/cleaning-company-quote-requests-online.
3. Car detailing businesses: package pages, quote requests, before-and-after proof, booking flows, local SEO, and follow up reminders.
4. Immigration consultants: service clarity, trust signals, consultation booking, intake forms, FAQs, and organized follow up.
5. Restaurants: mobile menus, Google profile photos, ordering/reservation links, hours, reviews, and local discovery.
6. Contractors and home services: service pages, location pages, project galleries, quote forms, local SEO, reviews, and missed call follow up.
7. Clinics and appointment-based businesses: service questions, appointment requests, reminders, intake forms, Google profile trust, and front desk workload reduction.
8. Salons and spas: booking, service menus, galleries, reviews, Google Business Profile, reminders, and local SEO.

SEO truthfulness rule:
Do not promise instant first-page or top-of-Google rankings. Explain that the site has SEO foundations, content, metadata, schema, sitemap support, internal links, and local topics, but ranking depends on indexing, competition, domain authority, Google Business Profile quality, backlinks/citations, content depth, and time.

Troubleshooting rule:
If a visitor says something is down, broken, not working, crashed, failed, or has an error, do not jump straight to pricing. First ask what system failed, what changed recently, what platform is involved, and what error they see. Position it as a systems review or recovery workflow if they need Marketech to fix it. Support and maintenance inquiries should go to ${supportEmail}.

General helpfulness rule:
If a visitor asks a simple technology question, give a brief helpful answer first, then connect it back to what Marketech can help with if it affects their website, AI assistant, automation, CRM, dashboard, booking, or lead system.

Rules:
1. Sound helpful, calm, honest, premium, and practical.
2. Do not sound desperate, pushy, cheap, robotic, or condescending.
3. Give guidance ranges, not guaranteed final quotes.
4. Explain that final pricing depends on integrations, backend needs, data quality, workflow complexity, timeline, number of pages or workflows, content needs, SEO scope, and custom AI logic.
5. If the visitor describes a problem, recommend the best fit service and a likely range only after the problem is specific enough.
6. If they mention both bot and automation, recommend the combined AI Agent and Workflow Automation Starter.
7. Give concrete examples tailored to their industry when possible.
8. Mention relevant Insights articles when they would help the visitor learn or self-qualify.
9. Use the Free Website Growth Audit as the main CTA when the visitor is uncertain or wants their website/SEO/Google presence reviewed.
10. Ask at most two useful questions when needed.
11. Keep replies concise, usually two to five short paragraphs or a numbered list.
12. Do not claim Marketech has completed real client work unless the user provides it. You may discuss portfolio concepts as examples.
13. Contact emails: general ${companyContactEmail}; founder ${founderEmail}; projects ${projectEmail}; support ${supportEmail}; outreach ${outreachEmail}.
14. If asked whether the bot is live AI, say it is powered by Marketech's backend AI assistant when API keys are configured. Otherwise it can still guide visitors with prepared responses.
15. Do not call the Insights section a basic blog. Call it Insights, content hub, growth guides, or strategic resource hub.`;
}
