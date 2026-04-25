export type ServicePage = {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  targetTopic: string;
  label: string;
  category: "core" | "starter";
  price: string;
  priceContext: string;
  pricingDetails: string[];
  h1: string;
  intro: string;
  whoFor: string[];
  builds: string[];
  process: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
  related: string[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "web-development",
    name: "Web Development",
    title: "Web Development Ottawa | Marketech Digital",
    metaDescription: "Premium web development in Ottawa for businesses that need fast, trustworthy websites, landing pages, custom web systems, SEO structure, and clear lead paths.",
    targetTopic: "web development Ottawa and custom website development",
    label: "Website design and development",
    category: "core",
    price: "$1,500 to $7,500+ CAD",
    priceContext: "Starter business sites, landing pages, and custom web builds",
    pricingDetails: ["Single landing page builds usually start lower", "Full business websites depend on page count, copy, visuals, and SEO structure", "Custom web systems, portals, dashboards, or backend work are quoted separately"],
    h1: "Websites that feel premium and help people take the next step.",
    intro: "Marketech Digital builds business websites that look sharp, load cleanly, explain the offer clearly, and make it easier for visitors to trust you. The goal is not just a prettier website. The goal is a digital front door that supports leads, SEO, automation, and growth.",
    whoFor: ["Local service businesses that need a stronger online presence", "Founders who want a premium website without a generic template feel", "Companies that need clearer service pages, landing pages, and lead capture", "Teams that want a website ready for SEO, AI assistants, forms, and future automations"],
    builds: ["Custom business websites", "Next.js website development", "Landing pages for campaigns and offers", "Service pages written around real buyer questions", "Contact and inquiry flows that are easier for clients to use", "Website foundations that can connect with automation, CRM, analytics, and AI tools"],
    process: ["Understand the business, offer, audience, and current website problems", "Shape the page structure, message, and conversion path", "Design and build the site using the existing brand direction or a new digital identity", "Prepare the site for SEO, speed, accessibility, and future system connections", "Review the experience on mobile and desktop before launch"],
    benefits: ["Clearer first impression for serious buyers", "Better structure for Google and AI search tools", "More useful contact and inquiry paths", "A website that can grow into a larger digital system", "Less confusion for visitors who need to understand what you do quickly"],
    faqs: [{ question: "Do you build fully custom websites?", answer: "Yes. Marketech Digital can build custom websites, landing pages, and business web systems using a premium design direction and clean technical structure." }, { question: "Can the website be connected to automation later?", answer: "Yes. The website can be built so forms, AI assistants, CRM tools, analytics, email follow ups, and dashboards can be connected later." }, { question: "Do you work with businesses in Ottawa?", answer: "Yes. Marketech Digital supports businesses in Ottawa, nearby areas, and remote clients across Canada." }],
    related: ["ai-automation", "seo", "branding"]
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    title: "AI Automation Agency Ottawa | Marketech Digital",
    metaDescription: "AI automation services for businesses that want smarter intake, lead qualification, follow ups, workflow automation, AI assistants, and cleaner operations.",
    targetTopic: "AI automation agency and AI automation Ottawa",
    label: "AI workflow automation",
    category: "core",
    price: "$750 to $8,000+ CAD",
    priceContext: "Focused assistants, intake flows, and deeper workflow automation",
    pricingDetails: ["Simple AI assistant or intake support usually starts lower", "Workflow automation depends on your tools, data, and handoff logic", "Deeper AI systems with integrations, testing, and custom routing require a custom quote"],
    h1: "AI systems that make daily business work easier to manage.",
    intro: "AI should not make your business feel more complicated. Marketech Digital helps turn repeated questions, messy intake, slow follow ups, and scattered handoffs into simple AI supported workflows that your team can actually use.",
    whoFor: ["Business owners getting the same questions again and again", "Teams that lose time on manual intake, follow ups, and routing", "Service businesses that want a smarter website assistant", "Companies that want AI support without guessing which tools to buy first"],
    builds: ["AI website assistants", "Lead qualification flows", "Workflow automation plans", "AI supported intake and routing", "Follow up systems for new inquiries", "Internal assistants for repeated business questions and tasks"],
    process: ["Map the repeated tasks and questions slowing the business down", "Choose the right AI use cases instead of adding tools everywhere", "Design the assistant, workflow, prompts, and handoff logic", "Connect the system to the website, form, email, CRM, or dashboard where needed", "Test the responses and refine the flow so it feels useful to real people"],
    benefits: ["Cleaner client inquiries before you speak with the lead", "Faster answers to common questions", "Less manual admin work for the team", "Better routing from website visitor to next step", "A practical AI system that supports business operations"],
    faqs: [{ question: "Can you build an AI bot for my website?", answer: "Yes. Marketech Digital can build an AI assistant that answers service questions, collects project details, guides visitors, and helps send cleaner inquiries to your team." }, { question: "Can AI automation connect with my current tools?", answer: "Often yes. The right setup depends on the tools you already use, such as your website, forms, email, CRM, booking tools, spreadsheets, or project management software." }, { question: "Is AI automation only for large companies?", answer: "No. Many small businesses can benefit from one focused system first, such as lead capture, follow up, booking support, or internal task routing." }],
    related: ["web-development", "software-development", "digital-marketing"]
  },
  {
    slug: "software-development",
    name: "Software Development",
    title: "Custom Software Development Canada | Marketech Digital",
    metaDescription: "Custom software development for businesses that need internal tools, dashboards, workflow systems, portals, data views, and scalable digital infrastructure.",
    targetTopic: "custom software development Canada and business software systems",
    label: "Custom software systems",
    category: "core",
    price: "$3,000 to $20,000+ CAD",
    priceContext: "Internal tools, portals, dashboards, and custom business systems",
    pricingDetails: ["Smaller internal tools and dashboard starters sit near the lower range", "Portals and workflow systems depend on users, permissions, screens, and data logic", "Larger custom software builds should be scoped in phases before a final quote"],
    h1: "Software systems built around how your business actually works.",
    intro: "Some problems cannot be solved with another generic tool. Marketech Digital helps businesses plan and build custom software systems, internal tools, dashboards, portals, and workflow layers that match how the team works every day.",
    whoFor: ["Businesses outgrowing spreadsheets and disconnected tools", "Teams that need internal tools for operations, reporting, or client handling", "Founders with a software idea that needs structure before development", "Companies that want a system designed around their own process"],
    builds: ["Internal business tools", "Client portals and admin panels", "Workflow systems and task views", "Dashboards and reporting layers", "Data intake and review tools", "Software planning for future scalable products"],
    process: ["Understand the business process and what the current tools cannot handle", "Define the core screens, users, permissions, and workflows", "Plan the data structure and integration needs", "Build the first useful version with room to improve", "Test with real use cases and prepare handoff notes"],
    benefits: ["Software that fits your workflow instead of forcing workarounds", "Cleaner visibility for owners and team members", "Less repeated manual tracking", "A stronger base for automation and data intelligence", "A system that can grow in phases"],
    faqs: [{ question: "Do you build custom business software?", answer: "Yes. Marketech Digital can help plan and build internal tools, dashboards, portals, workflow systems, and business software that supports real operations." }, { question: "Can you start with a smaller version first?", answer: "Yes. A focused first version is often the best way to test the system, learn from real use, and avoid overbuilding before the workflow is clear." }, { question: "Can software connect with AI automation later?", answer: "Yes. Custom software can be planned so AI assistants, automation flows, reporting, and integrations can be added in later phases." }],
    related: ["ai-automation", "web-development", "seo"]
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    title: "Digital Marketing Ottawa | Marketech Digital",
    metaDescription: "Digital marketing services for businesses that need clearer offers, landing pages, lead capture, campaign support, SEO structure, and growth systems.",
    targetTopic: "digital marketing Ottawa and growth focused marketing systems",
    label: "Digital growth systems",
    category: "core",
    price: "$750 to $3,500+ CAD",
    priceContext: "Marketing setup, campaign pages, lead capture, and growth support",
    pricingDetails: ["A focused landing page or campaign setup can start lower", "Monthly support depends on content, campaigns, reporting, and follow up systems", "Ad spend is separate from Marketech Digital service fees"],
    h1: "Digital marketing that connects the offer, website, and follow up.",
    intro: "Marketing works better when the offer, page, traffic, follow up, and measurement are connected. Marketech Digital helps businesses build cleaner digital marketing systems that focus on clarity, trust, leads, and practical growth.",
    whoFor: ["Businesses that want stronger lead capture from their website", "Service companies preparing campaigns or offers", "Founders who need clearer messaging before running ads", "Teams that want marketing activity connected to follow up and reporting"],
    builds: ["Offer and campaign structure", "Landing pages for lead generation", "Lead capture and follow up paths", "Content and SEO direction", "Conversion focused page improvements", "Simple reporting views for campaign activity"],
    process: ["Clarify the offer, audience, and next step for the buyer", "Review the website, landing page, and current lead path", "Build or improve the campaign page and contact flow", "Connect follow up, automation, and tracking where useful", "Use the data to improve the next round of activity"],
    benefits: ["Clearer messaging for people who are ready to buy", "Better landing pages for campaigns and offers", "Less wasted traffic from unclear next steps", "Stronger connection between marketing and follow up", "A practical growth system instead of random tactics"],
    faqs: [{ question: "Do you run digital marketing campaigns?", answer: "Marketech Digital can help structure campaign pages, messaging, lead capture, follow up, and reporting. Campaign management can be scoped based on the business and goals." }, { question: "Can you improve my existing website for marketing?", answer: "Yes. We can review the current site, improve the message, strengthen landing pages, add better calls to action, and make the lead path clearer." }, { question: "Can digital marketing connect with automation?", answer: "Yes. Lead capture, email follow up, CRM routing, AI assistants, and dashboards can be added so marketing activity is easier to manage." }],
    related: ["seo", "web-development", "branding"]
  },
  {
    slug: "seo",
    name: "SEO",
    title: "SEO Services Ottawa | Marketech Digital",
    metaDescription: "SEO services in Ottawa for businesses that need better website structure, technical SEO, local SEO foundations, service page clarity, and search ready content.",
    targetTopic: "SEO services Ottawa and local SEO for businesses",
    label: "SEO and search clarity",
    category: "core",
    price: "$600 to $2,500+ CAD",
    priceContext: "SEO cleanup, local SEO foundations, and ongoing search support",
    pricingDetails: ["Technical SEO and metadata cleanup can start lower", "Local SEO and service page work depends on the number of pages and locations", "Ongoing SEO support can be quoted monthly once the base is clear"],
    h1: "SEO foundations that help people and search engines understand your business.",
    intro: "Good SEO starts with clarity. Marketech Digital helps businesses organize their website, service pages, metadata, technical structure, local signals, and content so Google and AI search tools can understand what the business offers.",
    whoFor: ["Businesses with a website that looks good but does not explain services clearly", "Local service companies that want stronger Ottawa and Canada search visibility", "Teams that need technical SEO cleanup before adding more content", "Founders who want search pages that feel helpful instead of spammy"],
    builds: ["Technical SEO foundations", "Service page structure", "Local SEO copy and metadata", "Schema markup and indexing support", "Content planning for search intent", "Internal linking and page clarity improvements"],
    process: ["Review the current website structure, metadata, headings, and indexable pages", "Clarify the main services, locations, and buyer questions", "Improve page titles, descriptions, schema, and internal links", "Strengthen service pages and local relevance without keyword stuffing", "Prepare the site for future content and location pages in phases"],
    benefits: ["Clearer website structure for Google and visitors", "Better service page targeting without sounding robotic", "Stronger local search foundations", "Improved metadata and structured data", "A scalable SEO system for future pages"],
    faqs: [{ question: "Do you guarantee first place rankings?", answer: "No. Honest SEO does not guarantee first place rankings. Marketech Digital focuses on strong structure, useful content, technical quality, local relevance, and steady improvement." }, { question: "Can you improve technical SEO?", answer: "Yes. We can improve metadata, headings, schema, sitemap, robots, internal links, page clarity, performance, and accessibility." }, { question: "Can you help with local SEO in Ottawa?", answer: "Yes. Marketech Digital can help Ottawa and Canadian businesses create clearer service pages, local signals, and search focused content that still feels premium." }],
    related: ["web-development", "digital-marketing", "branding"]
  },
  {
    slug: "branding",
    name: "Branding",
    title: "Branding and Digital Identity Ottawa | Marketech Digital",
    metaDescription: "Branding and digital identity services for businesses that need a clearer visual system, stronger website presence, premium messaging, and consistent digital execution.",
    targetTopic: "branding Ottawa and digital identity for business websites",
    label: "Branding and digital identity",
    category: "core",
    price: "$800 to $4,500+ CAD",
    priceContext: "Digital identity, messaging, visual direction, and website ready brand systems",
    pricingDetails: ["Small brand refreshes and message cleanup start lower", "Full digital identity work depends on assets, pages, offer structure, and visual depth", "Logo work can be included, but the bigger value is the full digital experience"],
    h1: "A digital brand that feels clear, trusted, and ready for growth.",
    intro: "Branding is not only a logo. It is how a business feels when someone lands on the website, reads the offer, clicks a button, fills out a form, or speaks with the team. Marketech Digital helps shape digital identity so the business feels more polished and easier to trust.",
    whoFor: ["Businesses that look less premium online than they are in real life", "Founders preparing a new website, landing page, or service offer", "Teams that need clearer messaging and visual consistency", "Companies that want their brand, website, SEO, and digital systems to feel connected"],
    builds: ["Digital brand direction", "Website ready messaging", "Visual identity guidance", "Service offer positioning", "Landing page copy direction", "Brand system support for web, SEO, and marketing"],
    process: ["Understand the business, audience, tone, and current brand gap", "Shape the positioning and digital message", "Define the visual direction and content style for the website", "Apply the brand across pages, buttons, forms, and service sections", "Prepare the brand system for marketing, SEO, automation, and future content"],
    benefits: ["A stronger first impression online", "Clearer messaging for serious buyers", "More consistent website and marketing materials", "A brand direction that supports premium service pricing", "Better alignment between design, copy, SEO, and conversion"],
    faqs: [{ question: "Do you create logos?", answer: "Logo work can be part of a branding project, but the focus is usually broader: digital identity, website messaging, visual direction, and how the brand feels across the full online experience." }, { question: "Can you improve my existing brand without starting over?", answer: "Yes. Many businesses only need a cleaner digital direction, stronger messaging, and better consistency across the website and marketing materials." }, { question: "Can branding be included with web development?", answer: "Yes. Branding often works best when it is connected to the website, landing pages, SEO, and conversion path." }],
    related: ["web-development", "digital-marketing", "seo"]
  },
  {
    slug: "ai-agent-website-bot",
    name: "AI Agent Website Bot",
    title: "AI Agent Website Bot | Marketech Digital",
    metaDescription: "AI website bot service for businesses that want visitor guidance, service answers, lead qualification, booking support, and cleaner project inquiries.",
    targetTopic: "AI agent website bot and lead qualification assistant",
    label: "Starter system",
    category: "starter",
    price: "$750 to $2,500 CAD to start",
    priceContext: "$3,500 to $8,000+ CAD for a deeper assistant system",
    pricingDetails: ["Starter bots cover FAQs, service guidance, and basic lead capture", "Advanced builds can include custom knowledge, routing, forms, and backend logic", "Pricing depends on conversation depth, integrations, and how much training content is needed"],
    h1: "A website assistant that helps visitors understand what to do next.",
    intro: "The AI Agent Website Bot helps visitors ask questions, understand your services, share useful details, and reach the right next step without getting lost on the site. It is a strong first system for businesses that want better lead capture and cleaner inquiries.",
    whoFor: ["Businesses that get repeated questions from website visitors", "Teams that want better lead qualification before calls", "Service companies that need booking or inquiry guidance", "Founders who want an AI system that feels useful instead of gimmicky"],
    builds: ["Website chat assistant", "Service guidance and FAQ support", "Lead qualification questions", "Project inquiry handoff", "Conversation copy written for the business", "Optional backend AI integration for stronger answers"],
    process: ["Review the business services and common visitor questions", "Write the assistant flow and response rules", "Build the chat experience using the current website style", "Connect the bot to forms, email, or backend logic where needed", "Test real questions and refine the assistant before launch"],
    benefits: ["Visitors get answers faster", "Inquiries arrive with more useful detail", "The website feels more helpful and interactive", "The team spends less time repeating basic explanations", "The assistant can grow into a deeper automation system later"],
    faqs: [{ question: "Can the bot answer pricing questions?", answer: "Yes. The bot can share guidance ranges and explain that final quotes depend on scope, integrations, content, and workflow depth." }, { question: "Can the bot collect project details?", answer: "Yes. It can ask for business type, service interest, budget range, project details, and preferred contact method before handoff." }, { question: "Can the bot be upgraded later?", answer: "Yes. A starter bot can later become a deeper AI assistant with stronger knowledge, routing, integrations, and backend logic." }],
    related: ["ai-automation", "web-development", "workflow-automation-build"]
  },
  {
    slug: "ai-strategy-sprint",
    name: "AI Strategy Sprint",
    title: "AI Strategy Sprint | Marketech Digital",
    metaDescription: "AI strategy sprint for businesses that want a clear automation roadmap, useful AI opportunities, tool guidance, and a practical plan before building.",
    targetTopic: "AI strategy sprint and AI automation roadmap",
    label: "Starter system",
    category: "starter",
    price: "$500 to $1,500 CAD",
    priceContext: "Clarity before you invest in AI tools or development",
    pricingDetails: ["Best for early planning and prioritizing what to build first", "Scope depends on business complexity, tools, workflows, and number of systems reviewed", "Can turn into a build plan for AI automation, websites, dashboards, or internal tools"],
    h1: "A clear AI roadmap before you spend money building the wrong thing.",
    intro: "The AI Strategy Sprint gives business owners a practical way to understand where AI can actually help. It is built for people who want clarity first, not a pile of random tool recommendations.",
    whoFor: ["Founders who know AI could help but do not know where to start", "Businesses considering automation but unsure what should come first", "Teams with scattered tools and repeated manual tasks", "Owners who want a plan before investing in a larger build"],
    builds: ["Business workflow review", "AI opportunity map", "Priority roadmap", "Tool recommendations", "Build options with guidance ranges", "Next step plan for one useful first system"],
    process: ["Review the business, current tools, and repeated workflows", "Identify the highest value AI and automation opportunities", "Separate nice ideas from practical first moves", "Create a clear roadmap with priorities", "Recommend the right next build or system"],
    benefits: ["Less guessing before investing in AI", "Clearer project priorities", "Better understanding of what should be automated first", "A plan that matches business value instead of hype", "A smoother path into a larger system build"],
    faqs: [{ question: "Is this a build or a planning sprint?", answer: "It is a planning sprint. The goal is to map the best AI and automation opportunities before building anything expensive or unnecessary." }, { question: "Can this lead into a full build?", answer: "Yes. The sprint can lead into an AI assistant, workflow automation, dashboard, website improvement, or larger systems stack." }, { question: "Do I need technical knowledge?", answer: "No. The sprint is designed for business owners and teams who want practical clarity in plain language." }],
    related: ["ai-automation", "workflow-automation-build", "software-development"]
  },
  {
    slug: "workflow-automation-build",
    name: "Workflow Automation Build",
    title: "Workflow Automation Build | Marketech Digital",
    metaDescription: "Workflow automation build for businesses that want cleaner intake, forms, follow ups, task routing, handoffs, and tool connections.",
    targetTopic: "workflow automation build and business process automation",
    label: "Starter system",
    category: "starter",
    price: "$1,500 to $6,000+ CAD",
    priceContext: "Scope depends on your tools, handoffs, and integrations",
    pricingDetails: ["Smaller automations can cover one intake, follow up, or routing flow", "Larger builds can connect multiple tools, forms, notifications, and task paths", "Final pricing depends on testing, access, platform limits, and workflow complexity"],
    h1: "Workflow automation that removes repeated manual work.",
    intro: "The Workflow Automation Build is for businesses that keep repeating the same admin steps. It connects forms, follow ups, task assignments, notifications, and handoffs so the team can move with less friction.",
    whoFor: ["Teams losing time to repeated admin work", "Businesses with messy form intake or follow ups", "Owners who need cleaner task routing", "Service companies that want better handoffs between website, email, CRM, and team"],
    builds: ["Workflow mapping", "Automation plan", "Tool connection", "Testing and refinement", "Simple handoff notes", "Optional dashboard or reporting layer"],
    process: ["Map the current workflow and where it slows down", "Choose the fastest useful automation wins", "Design the new flow and handoff logic", "Connect the tools and test the movement of information", "Refine the system and document how it works"],
    benefits: ["Less repetitive manual work", "Faster follow up with leads and clients", "Cleaner handoffs between tools and people", "Fewer missed steps", "A system that can be expanded over time"],
    faqs: [{ question: "What tools can automation connect?", answer: "It depends on the business, but common examples include website forms, email, CRM tools, spreadsheets, booking tools, task boards, and notification systems." }, { question: "Can you automate my full business at once?", answer: "It is usually better to automate one important workflow first, test it properly, and then expand once the first system is stable." }, { question: "Does this include AI?", answer: "It can. Some workflows only need automation, while others benefit from AI for routing, summaries, replies, or internal decision support." }],
    related: ["ai-automation", "software-development", "ai-agent-website-bot"]
  },
  {
    slug: "decision-intelligence-dashboard",
    name: "Decision Intelligence Dashboard",
    title: "Decision Intelligence Dashboard | Marketech Digital",
    metaDescription: "Decision intelligence dashboard service for businesses that need clearer KPI views, reporting logic, data cleanup, and business visibility.",
    targetTopic: "decision intelligence dashboard and business KPI reporting",
    label: "Starter system",
    category: "starter",
    price: "$2,000 to $8,000+ CAD",
    priceContext: "Data quality, tools, and reporting depth affect scope",
    pricingDetails: ["Starter dashboards focus on key metrics and one or two data sources", "Advanced dashboards depend on data cleanup, integrations, and reporting logic", "Larger systems can include executive views, team views, and automation signals"],
    h1: "A clearer dashboard for the decisions your business needs to make.",
    intro: "The Decision Intelligence Dashboard gives owners and teams a cleaner way to see leads, sales, operations, campaigns, and business activity without digging through scattered tools every day.",
    whoFor: ["Owners who need a clearer view of business activity", "Teams working across scattered spreadsheets and platforms", "Businesses that want better reporting before scaling", "Companies that need KPI clarity without overcomplicated dashboards"],
    builds: ["KPI structure", "Dashboard design", "Data cleanup plan", "Reporting logic", "Decision views", "Optional automation signals and summaries"],
    process: ["Clarify what decisions the dashboard should support", "Review available data sources and quality", "Define the key metrics and views", "Build the dashboard and reporting logic", "Test the numbers and refine the view"],
    benefits: ["Cleaner visibility for owners and teams", "Less time searching through scattered tools", "Better understanding of leads, activity, and performance", "A stronger base for automation and forecasting", "More confident decisions from clearer information"],
    faqs: [{ question: "Can you connect multiple data sources?", answer: "Often yes. The final setup depends on the tools, access, data quality, and whether the platforms allow the right type of connection." }, { question: "Can dashboards include AI insights?", answer: "Yes. AI summaries, alerts, and signal detection can be added when the data is clean enough to support useful output." }, { question: "Do I need perfect data first?", answer: "No, but data quality affects the build. Part of the work can include identifying cleanup steps before creating deeper reporting." }],
    related: ["software-development", "ai-automation", "seo"]
  },
  {
    slug: "growth-systems-stack",
    name: "Growth Systems Stack",
    title: "Growth Systems Stack | Marketech Digital",
    metaDescription: "Growth systems stack for businesses that want their website, automation, lead capture, analytics, SEO, AI assistant, and growth workflow connected.",
    targetTopic: "growth systems stack and connected digital infrastructure",
    label: "Premium buildout",
    category: "starter",
    price: "$4,000 to $15,000+ CAD",
    priceContext: "Premium connected build across website, automation, analytics, and growth systems",
    pricingDetails: ["Smaller stacks focus on website, lead capture, and one or two automations", "Larger stacks can include AI assistant, dashboards, SEO structure, and internal workflows", "The right quote depends on how many systems need to be connected and how much backend logic is needed"],
    h1: "A connected growth system instead of scattered digital tools.",
    intro: "The Growth Systems Stack is for businesses that want their website, automation, lead capture, analytics, SEO, and growth work to feel connected. It is a larger build for teams ready to clean up the whole operating layer, not just one page or one tool.",
    whoFor: ["Businesses ready for a deeper digital systems upgrade", "Teams using too many disconnected tools", "Founders who want website, automation, SEO, and lead capture planned together", "Companies preparing for stronger growth and cleaner execution"],
    builds: ["Systems blueprint", "Automation stack", "Data visibility", "AI assistant layer", "Growth workflow design", "Website and landing page support"],
    process: ["Audit the website, tools, lead flow, reporting, and repeated workflows", "Design the connected system architecture", "Build the website, automation, assistant, and data layers in phases", "Test each handoff and conversion path", "Prepare the system for future content, campaigns, and operations"],
    benefits: ["A cleaner digital operating layer", "Better connection between website, leads, and follow up", "Stronger visibility across marketing and operations", "Less scattered execution for the team", "A premium foundation that can scale in phases"],
    faqs: [{ question: "Is this the largest Marketech service?", answer: "It is one of the broader build options because it connects multiple pieces of the business system instead of focusing on one small deliverable." }, { question: "Can this be built in phases?", answer: "Yes. A phased build is usually best so each part can be tested and improved before adding the next layer." }, { question: "Does this include SEO and automation?", answer: "It can. The stack can include website structure, SEO foundations, AI assistants, workflow automation, dashboards, and lead capture systems depending on the scope." }],
    related: ["web-development", "ai-automation", "digital-marketing"]
  }
];

export const coreServicePages = servicePages.filter((service) => service.category === "core");
export const starterSystemPages = servicePages.filter((service) => service.category === "starter");
export const servicePageMap = Object.fromEntries(servicePages.map((service) => [service.slug, service])) as Record<string, ServicePage>;

export function getServicePage(slug: string) {
  return servicePageMap[slug];
}
