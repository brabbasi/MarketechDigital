export const siteName = "Marketech Digital";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://marketech-digital.vercel.app").replace(/\/$/, "");
export const contactEmail = "abasitabbasi99@gmail.com";

export const siteDescription =
  "Marketech Digital is an Ottawa digital agency that helps business owners build better websites, use AI in practical ways, improve SEO, create stronger branding, and turn messy workflows into simple systems that are easier to manage.";

export const serviceKeywords = [
  "Marketech Digital",
  "digital agency Ottawa",
  "digital agency Canada",
  "web development Ottawa",
  "AI automation Ottawa",
  "AI automation agency",
  "website design and development",
  "software development Canada",
  "app development Canada",
  "business automation agency",
  "Next.js website development",
  "website design for small business",
  "digital marketing Ottawa",
  "SEO services Ottawa",
  "landing page design agency",
  "custom website development",
  "branding agency Ottawa",
  "marketing technology agency",
  "AI systems for small businesses",
  "automated workflows for businesses",
  "business process automation",
  "high converting website design",
  "premium website development",
  "performance focused digital marketing",
  "automation for service businesses"
];

export const areasServed = ["Ottawa", "Kanata", "Barrhaven", "Nepean", "Gatineau", "Toronto", "Ontario", "Canada"];

export const coreServices = [
  "Website Design and Development",
  "Custom Web Development",
  "Software Development",
  "App Development",
  "AI Workflow Automation",
  "Digital Marketing",
  "SEO Services",
  "Branding and Digital Identity",
  "Landing Page Design",
  "Performance Optimization",
  "Lead Capture Systems",
  "Business Growth Systems"
];

export function absoluteUrl(path = "") {
  if (!path) return siteUrl;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const homepageFaq = [
  {
    question: "What does Marketech Digital do?",
    answer:
      "Marketech Digital helps businesses improve their website, use AI in practical ways, automate repetitive work, strengthen SEO, improve branding, and create digital systems that make daily work easier."
  },
  {
    question: "Do you build custom websites?",
    answer:
      "Yes. We build custom business websites, landing pages, and modern web experiences that are clear, fast, easy to trust, and built around real leads instead of just good looks."
  },
  {
    question: "Can you automate business workflows with AI?",
    answer:
      "Yes. We can help with AI assistants, lead qualification, follow up flows, CRM handoffs, dashboards, and simple automation systems that save time without making the business feel complicated."
  },
  {
    question: "Do you serve businesses in Ottawa and across Canada?",
    answer:
      "Yes. Marketech Digital supports businesses in Ottawa, Kanata, Barrhaven, Nepean, Gatineau, Toronto, Ontario, and across Canada."
  },
  {
    question: "Can you help with SEO, branding, and digital marketing?",
    answer:
      "Yes. We help businesses improve their SEO foundation, sharpen their brand, build better landing pages, and create marketing systems that feel clear and useful for real customers."
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
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ottawa",
      addressRegion: "ON",
      addressCountry: "CA"
    },
    areaServed: areasServed,
    description:
      "A digital agency serving Ottawa and Canadian businesses with website design and development, software and app development, AI workflow automation, SEO, branding, digital marketing, landing pages, and practical business growth systems."
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
