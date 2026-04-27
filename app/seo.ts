export const siteName = "Marketech Digital";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://getmarketechdigital.com").replace(/\/$/, "");
export const contactEmail = "abasitabbasi99@gmail.com";

export const officialSocialLinks = {
  company: {
    linkedin: "https://www.linkedin.com/company/marketechdigital/",
    instagram: "https://www.instagram.com/official.marketech?igsh=NTR0YnVhemRiMnhr",
    facebook: "https://www.facebook.com/share/17ee6kJiPF/"
  },
  founder: {
    linkedin: "https://www.linkedin.com/in/basitrabbasi?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram: "https://www.instagram.com/a.b_abbasi?igsh=ZzViNGc5bjNxaDJ4",
    facebook: "https://www.facebook.com/share/17yJwoTW1r/",
    github: "https://github.com/brabbasi"
  }
};

export const siteDescription =
  "Marketech Digital is an Ottawa digital agency and AI automation agency that helps small businesses build better websites, improve local SEO, capture more leads, use AI in practical ways, and turn messy workflows into simple digital growth systems.";

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
  "website design for small businesses",
  "website design for small business",
  "digital marketing Ottawa",
  "digital marketing automation",
  "SEO services Ottawa",
  "local business SEO",
  "lead generation website",
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
  "automation for service businesses",
  "free digital growth audit",
  "Ottawa small business digital services",
  "Canada small business digital services"
];

export const areasServed = ["Ottawa", "Kanata", "Barrhaven", "Nepean", "Gatineau", "Toronto", "Ontario", "Canada", "Remote clients"];

export const coreServices = [
  "Website Design and Development",
  "Custom Web Development",
  "Software Development",
  "App Development",
  "AI Workflow Automation",
  "Digital Marketing",
  "SEO Services",
  "Local Business SEO",
  "Lead Generation Website Design",
  "Digital Growth Audit",
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
      "Yes. Marketech Digital supports businesses in Ottawa, Kanata, Barrhaven, Nepean, Gatineau, Toronto, Ontario, across Canada, and remote clients."
  },
  {
    question: "Can you help with SEO, branding, and digital marketing?",
    answer:
      "Yes. We help businesses improve their SEO foundation, sharpen their brand, build better landing pages, and create marketing systems that feel clear and useful for real customers."
  },
  {
    question: "What is the Free Digital Growth Audit?",
    answer:
      "The Free Digital Growth Audit is a low-pressure review for local businesses. It looks at website clarity, mobile experience, local SEO, Google Business Profile visibility, lead capture, trust signals, and simple AI automation opportunities."
  },
  {
    question: "What is the Marketech Digital Growth Starter package?",
    answer:
      "The Growth Starter is an accessible first project for small businesses that want quick improvements without a full rebuild. It can include website review, Google Business Profile suggestions, basic SEO cleanup, contact or booking flow setup, lead capture improvements, one simple automation, and a clear action report."
  }
];

const offerCatalog = {
  "@type": "OfferCatalog",
  name: "Marketech Digital services",
  itemListElement: coreServices.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service,
      serviceType: service,
      areaServed: areasServed
    }
  }))
};

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    url: siteUrl,
    logo: absoluteUrl("/logo.svg"),
    image: absoluteUrl("/logo.svg"),
    email: contactEmail,
    sameAs: [
      officialSocialLinks.company.linkedin,
      officialSocialLinks.company.instagram,
      officialSocialLinks.company.facebook
    ],
    founder: {
      "@type": "Person",
      name: "Basit Abbasi",
      jobTitle: "Founder",
      sameAs: [
        officialSocialLinks.founder.linkedin,
        officialSocialLinks.founder.instagram,
        officialSocialLinks.founder.facebook,
        officialSocialLinks.founder.github
      ]
    },
    areaServed: areasServed,
    knowsAbout: serviceKeywords,
    makesOffer: offerCatalog,
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
    sameAs: [
      officialSocialLinks.company.linkedin,
      officialSocialLinks.company.instagram,
      officialSocialLinks.company.facebook
    ],
    priceRange: "$497-$997+",
    areaServed: areasServed,
    makesOffer: offerCatalog,
    description:
      "A digital agency serving Ottawa, Ontario, Canada, and remote clients with website design and development, software and app development, AI workflow automation, local business SEO, branding, digital marketing automation, lead generation websites, landing pages, and practical business growth systems."
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
