export const siteName = "Marketech Digital";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://marketech-digital.vercel.app").replace(/\/$/, "");
export const contactEmail = "abasitabbasi99@gmail.com";

export const siteDescription =
  "Marketech Digital is a premium digital agency in Ottawa, Canada helping businesses build custom websites, AI automation systems, software solutions, SEO foundations, branding, landing pages, and growth-focused digital infrastructure.";

export const serviceKeywords = [
  "Marketech Digital",
  "digital agency Canada",
  "digital agency Ottawa",
  "web development Ottawa",
  "AI automation agency",
  "AI automation Ottawa",
  "custom software development Canada",
  "business automation agency",
  "Next.js website development",
  "website design for small business",
  "digital marketing Ottawa",
  "SEO services Ottawa",
  "landing page design agency",
  "app development Canada",
  "custom website development",
  "AI systems for small businesses",
  "automated workflows for businesses",
  "business process automation",
  "high-converting website design",
  "premium website development",
  "performance-focused digital marketing",
  "intelligent digital systems",
  "growth-focused web design",
  "automation for service businesses"
];

export const areasServed = ["Ottawa", "Kanata", "Barrhaven", "Nepean", "Gatineau", "Toronto", "Canada"];

export const coreServices = [
  "Custom Web Development",
  "AI Automation",
  "Workflow Automation",
  "Software Development",
  "App Development",
  "Digital Marketing",
  "SEO Services",
  "Branding and Digital Identity",
  "Landing Page Design",
  "Performance Optimization",
  "Lead Capture Systems",
  "Business Process Automation",
  "Decision Intelligence"
];

export function absoluteUrl(path = "") {
  if (!path) return siteUrl;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const homepageFaq = [
  {
    question: "What does Marketech Digital do?",
    answer:
      "Marketech Digital builds premium websites, AI automation systems, custom software, SEO foundations, branding, landing pages, and digital growth systems for modern businesses."
  },
  {
    question: "Do you build custom websites?",
    answer:
      "Yes. Marketech Digital builds custom business websites, landing pages, and modern web experiences designed for clarity, lead generation, performance, and future automation."
  },
  {
    question: "Can you automate business workflows with AI?",
    answer:
      "Yes. Marketech Digital designs AI assistants, workflow automation, lead qualification flows, CRM handoffs, dashboards, and decision-support systems for service businesses and growing teams."
  },
  {
    question: "Do you serve businesses in Ottawa and across Canada?",
    answer:
      "Yes. Marketech Digital supports businesses in Ottawa, Kanata, Barrhaven, Nepean, Gatineau, Toronto, and across Canada."
  },
  {
    question: "Can you help with SEO, branding, and digital marketing?",
    answer:
      "Yes. Marketech Digital helps businesses improve SEO foundations, brand clarity, landing pages, marketing systems, and conversion-focused digital infrastructure."
  }
];

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    url: siteUrl,
    logo: absoluteUrl("/logo.svg"),
    email: contactEmail,
    founder: {
      "@type": "Person",
      name: "Basit Abbasi",
      jobTitle: "Founder"
    },
    areaServed: areasServed,
    knowsAbout: serviceKeywords,
    description: siteDescription,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: contactEmail,
      areaServed: "CA",
      availableLanguage: ["English"]
    }
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en-CA",
    description: siteDescription
  };
}

export function localBusinessJsonLd() {
  return {
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#localbusiness`,
    name: siteName,
    url: siteUrl,
    image: absoluteUrl("/logo.svg"),
    logo: absoluteUrl("/logo.svg"),
    email: contactEmail,
    priceRange: "$$$",
    areaServed: areasServed,
    description:
      "A modern digital agency serving Ottawa and Canadian businesses with web development, AI automation, software development, SEO, branding, digital marketing, landing pages, and growth systems."
  };
}

export function serviceJsonLd(serviceName: string, description: string, path = "/services") {
  return {
    "@type": "Service",
    name: serviceName,
    serviceType: serviceName,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: areasServed,
    url: absoluteUrl(path),
    description
  };
}

export function faqJsonLd(id: string, faqs: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    "@id": `${siteUrl}${id}`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function jsonLdGraph(graph: unknown[]) {
  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}
