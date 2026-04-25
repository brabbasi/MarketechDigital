export type ServicePage = {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  targetTopic: string;
  label: string;
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
    h1: "Websites that feel premium and help people take the next step.",
    intro: "Marketech Digital builds business websites that look sharp, load cleanly, explain the offer clearly, and make it easier for visitors to trust you. The goal is not just a prettier website. The goal is a digital front door that supports leads, SEO, automation, and growth.",
    whoFor: [
      "Local service businesses that need a stronger online presence",
      "Founders who want a premium website without a generic template feel",
      "Companies that need clearer service pages, landing pages, and lead capture",
      "Teams that want a website ready for SEO, AI assistants, forms, and future automations"
    ],
    builds: [
      "Custom business websites",
      "Next.js website development",
      "Landing pages for campaigns and offers",
      "Service pages written around real buyer questions",
      "Contact and inquiry flows that are easier for clients to use",
      "Website foundations that can connect with automation, CRM, analytics, and AI tools"
    ],
    process: [
      "Understand the business, offer, audience, and current website problems",
      "Shape the page structure, message, and conversion path",
      "Design and build the site using the existing brand direction or a new digital identity",
      "Prepare the site for SEO, speed, accessibility, and future system connections",
      "Review the experience on mobile and desktop before launch"
    ],
    benefits: [
      "Clearer first impression for serious buyers",
      "Better structure for Google and AI search tools",
      "More useful contact and inquiry paths",
      "A website that can grow into a larger digital system",
      "Less confusion for visitors who need to understand what you do quickly"
    ],
    faqs: [
      {
        question: "Do you build fully custom websites?",
        answer: "Yes. Marketech Digital can build custom websites, landing pages, and business web systems using a premium design direction and clean technical structure."
      },
      {
        question: "Can the website be connected to automation later?",
        answer: "Yes. The website can be built so forms, AI assistants, CRM tools, analytics, email follow ups, and dashboards can be connected later."
      },
      {
        question: "Do you work with businesses in Ottawa?",
        answer: "Yes. Marketech Digital supports businesses in Ottawa, nearby areas, and remote clients across Canada."
      }
    ],
    related: ["ai-automation", "seo", "branding"]
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    title: "AI Automation Agency Ottawa | Marketech Digital",
    metaDescription: "AI automation services for businesses that want smarter intake, lead qualification, follow ups, workflow automation, AI assistants, and cleaner operations.",
    targetTopic: "AI automation agency and AI automation Ottawa",
    label: "AI workflow automation",
    h1: "AI systems that make daily business work easier to manage.",
    intro: "AI should not make your business feel more complicated. Marketech Digital helps turn repeated questions, messy intake, slow follow ups, and scattered handoffs into simple AI supported workflows that your team can actually use.",
    whoFor: [
      "Business owners getting the same questions again and again",
      "Teams that lose time on manual intake, follow ups, and routing",
      "Service businesses that want a smarter website assistant",
      "Companies that want AI support without guessing which tools to buy first"
    ],
    builds: [
      "AI website assistants",
      "Lead qualification flows",
      "Workflow automation plans",
      "AI supported intake and routing",
      "Follow up systems for new inquiries",
      "Internal assistants for repeated business questions and tasks"
    ],
    process: [
      "Map the repeated tasks and questions slowing the business down",
      "Choose the right AI use cases instead of adding tools everywhere",
      "Design the assistant, workflow, prompts, and handoff logic",
      "Connect the system to the website, form, email, CRM, or dashboard where needed",
      "Test the responses and refine the flow so it feels useful to real people"
    ],
    benefits: [
      "Cleaner client inquiries before you speak with the lead",
      "Faster answers to common questions",
      "Less manual admin work for the team",
      "Better routing from website visitor to next step",
      "A practical AI system that supports business operations"
    ],
    faqs: [
      {
        question: "Can you build an AI bot for my website?",
        answer: "Yes. Marketech Digital can build an AI assistant that answers service questions, collects project details, guides visitors, and helps send cleaner inquiries to your team."
      },
      {
        question: "Can AI automation connect with my current tools?",
        answer: "Often yes. The right setup depends on the tools you already use, such as your website, forms, email, CRM, booking tools, spreadsheets, or project management software."
      },
      {
        question: "Is AI automation only for large companies?",
        answer: "No. Many small businesses can benefit from one focused system first, such as lead capture, follow up, booking support, or internal task routing."
      }
    ],
    related: ["web-development", "software-development", "digital-marketing"]
  },
  {
    slug: "software-development",
    name: "Software Development",
    title: "Custom Software Development Canada | Marketech Digital",
    metaDescription: "Custom software development for businesses that need internal tools, dashboards, workflow systems, portals, data views, and scalable digital infrastructure.",
    targetTopic: "custom software development Canada and business software systems",
    label: "Custom software systems",
    h1: "Software systems built around how your business actually works.",
    intro: "Some problems cannot be solved with another generic tool. Marketech Digital helps businesses plan and build custom software systems, internal tools, dashboards, portals, and workflow layers that match how the team works every day.",
    whoFor: [
      "Businesses outgrowing spreadsheets and disconnected tools",
      "Teams that need internal tools for operations, reporting, or client handling",
      "Founders with a software idea that needs structure before development",
      "Companies that want a system designed around their own process"
    ],
    builds: [
      "Internal business tools",
      "Client portals and admin panels",
      "Workflow systems and task views",
      "Dashboards and reporting layers",
      "Data intake and review tools",
      "Software planning for future scalable products"
    ],
    process: [
      "Understand the business process and what the current tools cannot handle",
      "Define the core screens, users, permissions, and workflows",
      "Plan the data structure and integration needs",
      "Build the first useful version with room to improve",
      "Test with real use cases and prepare handoff notes"
    ],
    benefits: [
      "Software that fits your workflow instead of forcing workarounds",
      "Cleaner visibility for owners and team members",
      "Less repeated manual tracking",
      "A stronger base for automation and data intelligence",
      "A system that can grow in phases"
    ],
    faqs: [
      {
        question: "Do you build custom business software?",
        answer: "Yes. Marketech Digital can help plan and build internal tools, dashboards, portals, workflow systems, and business software that supports real operations."
      },
      {
        question: "Can you start with a smaller version first?",
        answer: "Yes. A focused first version is often the best way to test the system, learn from real use, and avoid overbuilding before the workflow is clear."
      },
      {
        question: "Can software connect with AI automation later?",
        answer: "Yes. Custom software can be planned so AI assistants, automation flows, reporting, and integrations can be added in later phases."
      }
    ],
    related: ["ai-automation", "web-development", "seo"]
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    title: "Digital Marketing Ottawa | Marketech Digital",
    metaDescription: "Digital marketing services for businesses that need clearer offers, landing pages, lead capture, campaign support, SEO structure, and growth systems.",
    targetTopic: "digital marketing Ottawa and growth focused marketing systems",
    label: "Digital growth systems",
    h1: "Digital marketing that connects the offer, website, and follow up.",
    intro: "Marketing works better when the offer, page, traffic, follow up, and measurement are connected. Marketech Digital helps businesses build cleaner digital marketing systems that focus on clarity, trust, leads, and practical growth.",
    whoFor: [
      "Businesses that want stronger lead capture from their website",
      "Service companies preparing campaigns or offers",
      "Founders who need clearer messaging before running ads",
      "Teams that want marketing activity connected to follow up and reporting"
    ],
    builds: [
      "Offer and campaign structure",
      "Landing pages for lead generation",
      "Lead capture and follow up paths",
      "Content and SEO direction",
      "Conversion focused page improvements",
      "Simple reporting views for campaign activity"
    ],
    process: [
      "Clarify the offer, audience, and next step for the buyer",
      "Review the website, landing page, and current lead path",
      "Build or improve the campaign page and contact flow",
      "Connect follow up, automation, and tracking where useful",
      "Use the data to improve the next round of activity"
    ],
    benefits: [
      "Clearer messaging for people who are ready to buy",
      "Better landing pages for campaigns and offers",
      "Less wasted traffic from unclear next steps",
      "Stronger connection between marketing and follow up",
      "A practical growth system instead of random tactics"
    ],
    faqs: [
      {
        question: "Do you run digital marketing campaigns?",
        answer: "Marketech Digital can help structure campaign pages, messaging, lead capture, follow up, and reporting. Campaign management can be scoped based on the business and goals."
      },
      {
        question: "Can you improve my existing website for marketing?",
        answer: "Yes. We can review the current site, improve the message, strengthen landing pages, add better calls to action, and make the lead path clearer."
      },
      {
        question: "Can digital marketing connect with automation?",
        answer: "Yes. Lead capture, email follow up, CRM routing, AI assistants, and dashboards can be added so marketing activity is easier to manage."
      }
    ],
    related: ["seo", "web-development", "branding"]
  },
  {
    slug: "seo",
    name: "SEO",
    title: "SEO Services Ottawa | Marketech Digital",
    metaDescription: "SEO services in Ottawa for businesses that need better website structure, technical SEO, local SEO foundations, service page clarity, and search ready content.",
    targetTopic: "SEO services Ottawa and local SEO for businesses",
    label: "SEO and search clarity",
    h1: "SEO foundations that help people and search engines understand your business.",
    intro: "Good SEO starts with clarity. Marketech Digital helps businesses organize their website, service pages, metadata, technical structure, local signals, and content so Google and AI search tools can understand what the business offers.",
    whoFor: [
      "Businesses with a website that looks good but does not explain services clearly",
      "Local service companies that want stronger Ottawa and Canada search visibility",
      "Teams that need technical SEO cleanup before adding more content",
      "Founders who want search pages that feel helpful instead of spammy"
    ],
    builds: [
      "Technical SEO foundations",
      "Service page structure",
      "Local SEO copy and metadata",
      "Schema markup and indexing support",
      "Content planning for search intent",
      "Internal linking and page clarity improvements"
    ],
    process: [
      "Review the current website structure, metadata, headings, and indexable pages",
      "Clarify the main services, locations, and buyer questions",
      "Improve page titles, descriptions, schema, and internal links",
      "Strengthen service pages and local relevance without keyword stuffing",
      "Prepare the site for future content and location pages in phases"
    ],
    benefits: [
      "Clearer website structure for Google and visitors",
      "Better service page targeting without sounding robotic",
      "Stronger local search foundations",
      "Improved metadata and structured data",
      "A scalable SEO system for future pages"
    ],
    faqs: [
      {
        question: "Do you guarantee first place rankings?",
        answer: "No. Honest SEO does not guarantee first place rankings. Marketech Digital focuses on strong structure, useful content, technical quality, local relevance, and steady improvement."
      },
      {
        question: "Can you improve technical SEO?",
        answer: "Yes. We can improve metadata, headings, schema, sitemap, robots, internal links, page clarity, performance, and accessibility."
      },
      {
        question: "Can you help with local SEO in Ottawa?",
        answer: "Yes. Marketech Digital can help Ottawa and Canadian businesses create clearer service pages, local signals, and search focused content that still feels premium."
      }
    ],
    related: ["web-development", "digital-marketing", "branding"]
  },
  {
    slug: "branding",
    name: "Branding",
    title: "Branding and Digital Identity Ottawa | Marketech Digital",
    metaDescription: "Branding and digital identity services for businesses that need a clearer visual system, stronger website presence, premium messaging, and consistent digital execution.",
    targetTopic: "branding Ottawa and digital identity for business websites",
    label: "Branding and digital identity",
    h1: "A digital brand that feels clear, trusted, and ready for growth.",
    intro: "Branding is not only a logo. It is how a business feels when someone lands on the website, reads the offer, clicks a button, fills out a form, or speaks with the team. Marketech Digital helps shape digital identity so the business feels more polished and easier to trust.",
    whoFor: [
      "Businesses that look less premium online than they are in real life",
      "Founders preparing a new website, landing page, or service offer",
      "Teams that need clearer messaging and visual consistency",
      "Companies that want their brand, website, SEO, and digital systems to feel connected"
    ],
    builds: [
      "Digital brand direction",
      "Website ready messaging",
      "Visual identity guidance",
      "Service offer positioning",
      "Landing page copy direction",
      "Brand system support for web, SEO, and marketing"
    ],
    process: [
      "Understand the business, audience, tone, and current brand gap",
      "Shape the positioning and digital message",
      "Define the visual direction and content style for the website",
      "Apply the brand across pages, buttons, forms, and service sections",
      "Prepare the brand system for marketing, SEO, automation, and future content"
    ],
    benefits: [
      "A stronger first impression online",
      "Clearer messaging for serious buyers",
      "More consistent website and marketing materials",
      "A brand direction that supports premium service pricing",
      "Better alignment between design, copy, SEO, and conversion"
    ],
    faqs: [
      {
        question: "Do you create logos?",
        answer: "Logo work can be part of a branding project, but the focus is usually broader: digital identity, website messaging, visual direction, and how the brand feels across the full online experience."
      },
      {
        question: "Can you improve my existing brand without starting over?",
        answer: "Yes. Many businesses only need a cleaner digital direction, stronger messaging, and better consistency across the website and marketing materials."
      },
      {
        question: "Can branding be included with web development?",
        answer: "Yes. Branding often works best when it is connected to the website, landing pages, SEO, and conversion path."
      }
    ],
    related: ["web-development", "digital-marketing", "seo"]
  }
];

export const servicePageMap = Object.fromEntries(servicePages.map((service) => [service.slug, service])) as Record<string, ServicePage>;

export function getServicePage(slug: string) {
  return servicePageMap[slug];
}
