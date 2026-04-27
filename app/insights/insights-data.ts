export type InsightCategory =
  | "Website Design"
  | "Local SEO"
  | "Google Business Profile"
  | "AI Automation"
  | "Lead Generation"
  | "Industry Guides";

export type InsightSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type InternalServiceLink = {
  label: string;
  href: string;
};

export type InsightArticle = {
  title: string;
  slug: string;
  category: InsightCategory;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  intro: string;
  readTime: string;
  date: string;
  updatedFor2026?: boolean;
  serviceLinks: InternalServiceLink[];
  relatedSlugs: string[];
  sections: InsightSection[];
};

export const insightCategories: ("All" | InsightCategory)[] = [
  "All",
  "Website Design",
  "Local SEO",
  "Google Business Profile",
  "AI Automation",
  "Lead Generation",
  "Industry Guides"
];

export const insights: InsightArticle[] = [
  {
    title: "7 Website Mistakes Ottawa Small Businesses Make",
    slug: "website-mistakes-ottawa-small-businesses",
    category: "Website Design",
    seoTitle: "7 Website Mistakes Ottawa Small Businesses Make | Marketech Digital",
    metaDescription: "Discover the most common website mistakes Ottawa small businesses make and how better design, SEO, and lead capture can help turn visitors into customers.",
    excerpt: "Most local websites do not fail because the business is weak. They fail because the page does not make the next step obvious enough.",
    intro: "A small business website has one serious job: help the right visitor trust you enough to call, book, request a quote, or start a conversation. For many Ottawa, Kanata, and Barrhaven businesses, the website looks acceptable at first glance but still leaks leads because the message, mobile flow, local SEO, and follow up system are not working together.",
    readTime: "7 min read",
    date: "2026-04-27",
    updatedFor2026: true,
    serviceLinks: [
      { label: "Website Design", href: "/services/web-development" },
      { label: "SEO", href: "/services/seo" }
    ],
    relatedSlugs: ["website-visitors-but-no-calls", "best-website-structure-local-service-businesses", "premium-trustworthy-website-2026"],
    sections: [
      {
        heading: "1. The headline does not explain the value fast enough",
        paragraphs: [
          "When someone lands on your homepage, they should understand what you do, who you help, where you work, and what action they should take. A headline like \"Welcome to our website\" or \"Quality service you can trust\" is too vague because it could belong to almost any business.",
          "A stronger headline is specific. A cleaning company might say, \"Residential and commercial cleaning in Ottawa with simple online quote requests.\" A barbershop might say, \"Modern cuts, easy booking, and walk-in support near Kanata.\" The goal is not to sound clever. The goal is clarity."
        ],
        bullets: [
          "Name the service clearly.",
          "Mention the local area when it matters.",
          "Make the next step visible above the fold."
        ]
      },
      {
        heading: "2. There is no clear call to action",
        paragraphs: [
          "Many local websites have a phone number somewhere, a contact page hidden in the menu, and maybe a form near the bottom. That is not enough. A visitor should never have to search for how to move forward.",
          "Use one primary action throughout the site: request a quote, book appointment, call now, schedule consultation, or get a free audit. Then repeat it in the hero, after service sections, near trust proof, and again at the bottom."
        ],
        bullets: [
          "Keep the main CTA consistent.",
          "Make phone, booking, and quote actions easy on mobile.",
          "Remove competing buttons that distract from the main lead action."
        ]
      },
      {
        heading: "3. Mobile experience is treated like an afterthought",
        paragraphs: [
          "Most local customers are checking your business from a phone. They may be sitting in a car, comparing nearby options, looking for hours, checking photos, or trying to book quickly. If the mobile site has tiny text, slow sections, awkward buttons, or forms that are hard to complete, the visitor will leave before they judge the quality of your service.",
          "Mobile-first design means the page is designed around thumb movement, short paragraphs, simple forms, quick buttons, and fast loading. The desktop version should feel premium, but the mobile version has to do the heavy lifting."
        ],
        bullets: [
          "Test every page on a real phone, not only browser preview.",
          "Keep forms short and easy to submit.",
          "Use sticky or repeated CTAs where appropriate."
        ]
      },
      {
        heading: "4. The website looks outdated compared to the actual business",
        paragraphs: [
          "A good local business can lose trust online if the website feels old, cluttered, or inconsistent. Outdated visuals make customers wonder whether the business is still active, whether the pricing is current, and whether the service will feel professional.",
          "Premium does not mean flashy. It means clean spacing, strong typography, clear service sections, good photos, consistent colors, and a layout that feels intentional. A contractor, clinic, salon, or immigration consultant does not need a complicated website. They need a polished digital front door."
        ],
        bullets: [
          "Use fewer sections, but make each section clearer.",
          "Replace low-quality visuals with real photos or clean branded graphics.",
          "Make the page feel current without changing the brand identity randomly."
        ]
      },
      {
        heading: "5. Trust signals are missing or weak",
        paragraphs: [
          "Visitors are asking quiet questions before they contact you. Are you real? Are you local? Do people trust you? Can I see your work? Will this business answer me quickly? Your website should answer those questions before the form appears.",
          "Trust can come from Google reviews, real team photos, project photos, before-and-after examples, service guarantees you can actually honor, professional credentials, years of experience, or a clear explanation of how the process works. Avoid fake testimonials or exaggerated claims. Real clarity builds more trust than hype."
        ],
        bullets: [
          "Show reviews or link to your Google Business Profile.",
          "Add real photos where possible.",
          "Explain the process so the next step feels low-risk."
        ]
      },
      {
        heading: "6. Local SEO is not built into the structure",
        paragraphs: [
          "A website can look good and still be hard for Google to understand. If every service is crammed onto one page, there are no local terms, page titles are generic, and headings do not match what customers search, the site has a weaker chance of showing up for relevant local searches.",
          "Ottawa website design, local SEO Ottawa, Kanata business website design, Barrhaven local SEO, and service-specific searches should be used naturally where they fit. Do not stuff keywords. Create useful pages that clearly describe services, locations, and common customer questions."
        ],
        bullets: [
          "Create separate service pages for important offers.",
          "Use clear page titles and descriptions.",
          "Connect the website to your Google Business Profile."
        ]
      },
      {
        heading: "7. There is no follow-up system after the lead submits",
        paragraphs: [
          "The website does not end at the form. If a quote request arrives and nobody responds quickly, the lead may contact two competitors before your team sees the email. Small businesses often lose leads after the visitor already showed interest.",
          "Simple automation can help: instant confirmation emails, internal notifications, missed call follow-up, lead sorting, appointment reminders, and review request flows. You do not need a complex enterprise system. You need a clean path from visitor to response."
        ],
        bullets: [
          "Send an instant confirmation after forms are submitted.",
          "Route leads to the right inbox or CRM.",
          "Follow up with people who requested quotes but did not book."
        ]
      }
    ]
  },
  {
    title: "How to Get More Local Leads Without Paid Ads",
    slug: "get-more-local-leads-without-ads",
    category: "Lead Generation",
    seoTitle: "How to Get More Local Leads Without Paid Ads | Marketech Digital",
    metaDescription: "Learn how local businesses can generate more leads organically through better websites, local SEO, Google Business Profile, reviews, and simple automation.",
    excerpt: "Paid ads can help, but local businesses should not rely on them before the website, Google profile, reviews, and follow-up path are ready.",
    intro: "More leads without paid ads starts with building a better path for people who are already searching, comparing, and asking for help. For Ottawa-area small businesses, that means improving the website, Google Business Profile, local SEO, reviews, lead capture, and follow up before pouring money into traffic.",
    readTime: "8 min read",
    date: "2026-04-27",
    updatedFor2026: true,
    serviceLinks: [
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "SEO", href: "/services/seo" }
    ],
    relatedSlugs: ["google-business-profile-checklist-ottawa", "seo-for-small-businesses-ottawa", "ai-automation-small-business-lead-follow-up"],
    sections: [
      {
        heading: "Start with website clarity before asking for more traffic",
        paragraphs: [
          "A business does not need more traffic if the current traffic cannot understand the offer. The homepage should explain who you help, what services you provide, where you operate, and what the visitor should do next.",
          "For a local service business, clarity beats cleverness. A visitor should quickly see your core service, service area, proof of trust, and a simple way to call, book, or request a quote."
        ],
        bullets: ["Use a clear headline.", "Show the main services early.", "Make quote, booking, or phone actions easy to find."]
      },
      {
        heading: "Build your Google Business Profile like a lead asset",
        paragraphs: [
          "Your Google Business Profile is often seen before your website. When someone searches nearby, your profile can influence whether they call, visit, request directions, or keep scrolling.",
          "Keep categories accurate, add services, upload real photos, answer FAQs, keep hours current, and connect the profile to the strongest page on your website. A clean Google profile supports local SEO and builds confidence before the customer reaches your site."
        ],
        bullets: ["Add service descriptions.", "Use real photos of the team, space, vehicles, or work.", "Respond to reviews professionally."]
      },
      {
        heading: "Create local landing pages only when they are useful",
        paragraphs: [
          "Local landing pages can help, but only when they are built for real users. A generic page that swaps \"Ottawa\" for \"Kanata\" without adding helpful detail is not a strong strategy.",
          "Useful local pages explain service availability, nearby areas served, common customer needs, local proof, booking or quote steps, and FAQs. A contractor in Barrhaven, a salon in Kanata, or a cleaning company serving Ottawa can each benefit from pages that answer specific local questions."
        ],
        bullets: ["Focus on important services and areas first.", "Avoid duplicate copy across location pages.", "Link local pages to the relevant service pages."]
      },
      {
        heading: "Turn reviews into trust, not decoration",
        paragraphs: [
          "Reviews work best when they are connected to the buying decision. Do not hide them at the bottom of the page. Use short review highlights near service descriptions, booking sections, and contact areas where the visitor is deciding whether to act.",
          "Ask happy customers for reviews in a simple, respectful way. A follow-up email or text after a completed appointment can make the process easier without feeling pushy."
        ],
        bullets: ["Feature real review snippets where relevant.", "Link to the Google review page.", "Create a simple review request flow after service completion."]
      },
      {
        heading: "Improve lead forms and booking systems",
        paragraphs: [
          "A form that asks too much too early can reduce inquiries. A form that asks too little can create messy follow-up. The right balance depends on the business, but most local businesses should collect name, contact method, service interest, location, and a short description.",
          "For appointment-based businesses, online booking should be obvious. For quote-based businesses, the form should set expectations and confirm that the request was received."
        ],
        bullets: ["Use short forms for first contact.", "Add a confirmation message after submission.", "Offer phone or booking options for urgent leads."]
      },
      {
        heading: "Use helpful content to capture search demand",
        paragraphs: [
          "Helpful content gives your business more chances to appear for questions customers already ask. A cleaning company can answer questions about move-out cleaning, office cleaning, or deep cleaning. A barbershop can explain booking, styles, pricing, and beard services. An immigration consultant can explain service scope and consultation steps carefully.",
          "Content should support the buyer journey, not exist just to fill a blog. Strong Insights pages can rank, build trust, and guide the reader toward a relevant next step."
        ],
        bullets: ["Write around real customer questions.", "Link articles to service pages.", "Keep content practical and local where relevant."]
      },
      {
        heading: "Follow up faster with simple automation",
        paragraphs: [
          "Organic leads are still easy to lose if the response is slow. Simple automation can send instant confirmations, notify the owner, sort the lead by service type, and remind the team to follow up.",
          "The point is not to replace real conversations. The point is to make sure serious inquiries do not get buried in inboxes, missed calls, or manual spreadsheets."
        ],
        bullets: ["Send instant form confirmations.", "Create missed call follow-up where possible.", "Add reminders for quote follow-ups."]
      }
    ]
  },
  {
    title: "Why Your Website Gets Visitors But No Calls",
    slug: "website-visitors-but-no-calls",
    category: "Website Design",
    seoTitle: "Why Your Website Gets Visitors But No Calls | Marketech Digital",
    metaDescription: "Getting website traffic but no phone calls or quote requests? Learn why visitors leave and how to improve your website’s conversion flow.",
    excerpt: "Traffic is only useful when the website makes the offer clear, removes doubt, and makes contacting you feel easy.",
    intro: "If your website gets visitors but no calls, the problem is usually not one single button or color. It is the full conversion path: message, trust, service clarity, mobile experience, contact flow, and follow up. Local business owners in Ottawa, Kanata, and Barrhaven often have enough demand around them, but the website does not turn attention into action.",
    readTime: "6 min read",
    date: "2026-04-27",
    updatedFor2026: true,
    serviceLinks: [
      { label: "Website Design", href: "/services/web-development" },
      { label: "Digital Marketing", href: "/services/digital-marketing" }
    ],
    relatedSlugs: ["website-mistakes-ottawa-small-businesses", "best-website-structure-local-service-businesses", "get-more-local-leads-without-ads"],
    sections: [
      {
        heading: "The offer is not clear above the fold",
        paragraphs: [
          "The top of the website should answer the visitor's main question: am I in the right place? If the first screen is vague, overly artistic, or packed with internal company language, the visitor has to work too hard.",
          "A strong above-the-fold section includes a clear headline, short supporting copy, primary CTA, secondary trust cue, and usually one visual that supports the offer."
        ],
        bullets: ["Say what you do clearly.", "Mention who you help.", "Put the main CTA in the first screen."]
      },
      {
        heading: "The phone number or booking action is hidden",
        paragraphs: [
          "Many visitors are ready to act but cannot find the next step quickly. If the phone number is only in the footer, the booking link is hidden in a menu, or the form is buried under too much copy, the site creates friction at the wrong moment.",
          "Make the contact path visible in the navigation, hero section, service sections, and bottom CTA. On mobile, test whether the action can be completed easily with one hand."
        ],
        bullets: ["Use tap-to-call on mobile.", "Repeat the booking or quote CTA after key sections.", "Do not make the visitor hunt for contact information."]
      },
      {
        heading: "The form feels like work",
        paragraphs: [
          "A long form can be useful for detailed quotes, but only when the visitor understands why the information is needed. For first contact, keep the form simple and ask for the details that help you respond intelligently.",
          "A good local lead form should reduce uncertainty. Tell people what happens after they submit, how soon you typically respond if you can say that honestly, and what information helps you prepare."
        ],
        bullets: ["Keep required fields limited.", "Explain what happens after submission.", "Use service dropdowns to route inquiries cleanly."]
      },
      {
        heading: "There is not enough trust proof near the decision point",
        paragraphs: [
          "Trust proof should appear where the visitor is deciding. Reviews, photos, project examples, professional details, certifications, and process explanations can all reduce hesitation.",
          "For local businesses, proof does not have to be dramatic. A clean gallery, real reviews, accurate location details, and a transparent process can make the website feel more credible quickly."
        ],
        bullets: ["Place reviews near CTAs.", "Use real work photos where possible.", "Add a clear process section before the contact block."]
      },
      {
        heading: "The services are confusing",
        paragraphs: [
          "If the service list is too broad, too vague, or written from the business's perspective instead of the customer's perspective, visitors may not recognize that you solve their problem.",
          "Create separate sections or pages for your core services. A cleaning company should separate residential, commercial, move-in, move-out, and deep cleaning when those services have different buyer needs. A contractor should separate the jobs customers search for."
        ],
        bullets: ["Name services using customer language.", "Explain who each service is for.", "Add service-specific CTAs."]
      },
      {
        heading: "Mini checklist: why visitors may not be calling",
        paragraphs: [
          "Use this quick checklist before assuming you need more traffic. If several of these are weak, the site likely has a conversion issue."
        ],
        bullets: [
          "The first screen does not clearly explain the offer.",
          "The CTA is hidden, weak, or inconsistent.",
          "The mobile layout makes calling or booking annoying.",
          "The website has no real trust proof near the CTA.",
          "The service pages do not match what customers search.",
          "There is no confirmation or follow-up system after inquiry."
        ]
      }
    ]
  },
  {
    title: "Google Business Profile Checklist for Ottawa Businesses",
    slug: "google-business-profile-checklist-ottawa",
    category: "Google Business Profile",
    seoTitle: "Google Business Profile Checklist for Ottawa Businesses | Marketech Digital",
    metaDescription: "Use this Google Business Profile checklist to improve your local visibility, build trust, and help more nearby customers contact your business.",
    excerpt: "Your Google profile is often the first trust checkpoint. A clean profile can help nearby customers understand, compare, and contact you faster.",
    intro: "For many Ottawa businesses, Google Business Profile is not just a listing. It is a mini storefront that appears when people search locally, compare options, check reviews, look for directions, or decide whether to call. This checklist helps you improve the profile without stuffing keywords or making exaggerated claims.",
    readTime: "7 min read",
    date: "2026-04-27",
    updatedFor2026: true,
    serviceLinks: [
      { label: "SEO", href: "/services/seo" },
      { label: "Digital Marketing", href: "/services/digital-marketing" }
    ],
    relatedSlugs: ["seo-for-small-businesses-ottawa", "get-more-local-leads-without-ads", "website-mistakes-ottawa-small-businesses"],
    sections: [
      {
        heading: "Choose the right primary and secondary categories",
        paragraphs: [
          "Your category helps Google understand what kind of business you are. Choose the most accurate primary category, then add secondary categories only when they truly apply. Do not choose categories because they sound popular if they do not match your service.",
          "A barbershop, cleaning company, car detailing business, immigration consultant, restaurant, contractor, clinic, or salon should each be categorized with precision. The wrong category can confuse both Google and customers."
        ],
        bullets: ["Use the most accurate main category.", "Add secondary categories carefully.", "Review categories when services change."]
      },
      {
        heading: "Complete every service and product area that applies",
        paragraphs: [
          "Add your services with clear names and short descriptions. This helps people understand what you offer before they visit your website. For service businesses, this can also support local relevance when connected to strong service pages on your website.",
          "Keep descriptions practical. Explain what is included, who it is for, and when someone should request the service."
        ],
        bullets: ["List core services clearly.", "Avoid vague service names.", "Connect important services to website pages where possible."]
      },
      {
        heading: "Write a useful business description",
        paragraphs: [
          "Your business description should sound human. Mention your main services, service area, and what makes the experience easier or more trustworthy. Use Ottawa, Kanata, Barrhaven, or nearby areas naturally when relevant.",
          "Do not use the description as a keyword dump. The goal is to help a real person understand whether your business is a fit."
        ],
        bullets: ["Lead with what you do.", "Mention the area served naturally.", "Avoid claims you cannot prove."]
      },
      {
        heading: "Add real photos on a regular basis",
        paragraphs: [
          "Photos help people trust that the business is active. Use real photos of your storefront, team, vehicles, work, tools, interior, menu items, before-and-after examples, or completed projects depending on the business type.",
          "Low-quality stock photos usually do less for trust than honest, well-lit real photos. A local customer wants to know what they can expect."
        ],
        bullets: ["Add exterior and interior photos if customers visit you.", "Show real work for service businesses.", "Keep images clean, bright, and current."]
      },
      {
        heading: "Keep hours, service area, and contact details accurate",
        paragraphs: [
          "Inaccurate hours create frustration and lost trust. Update holiday hours, temporary closures, service areas, phone numbers, website links, and appointment links whenever they change.",
          "If you serve multiple areas, such as Ottawa, Kanata, Barrhaven, Nepean, or nearby communities, make sure your service area is realistic and consistent with your website."
        ],
        bullets: ["Update holiday hours early.", "Use the correct phone number and website link.", "Keep service areas consistent across platforms."]
      },
      {
        heading: "Build a review and response habit",
        paragraphs: [
          "Reviews affect trust. Ask satisfied customers for honest reviews in a simple way after the service is complete. Respond professionally to positive and negative reviews without sounding defensive.",
          "A review response is public. Future customers read how you handle feedback, not just the star rating."
        ],
        bullets: ["Create a simple review request message.", "Respond with calm, specific replies.", "Never fake reviews or pressure customers."
        ]
      },
      {
        heading: "Connect the profile to a stronger website flow",
        paragraphs: [
          "Your Google Business Profile should not send people to a confusing homepage. Connect it to the page that best supports the next action. For some businesses, that is the homepage. For others, it may be a booking page, quote page, or service-specific landing page.",
          "A strong profile brings attention. A strong website converts that attention into calls, bookings, and quote requests."
        ],
        bullets: ["Use appointment links when relevant.", "Add website links that match search intent.", "Make sure the landing page has a clear CTA."]
      }
    ]
  },
  {
    title: "Website Design for Barbershops: What Actually Gets More Bookings",
    slug: "website-design-for-barbershops",
    category: "Industry Guides",
    seoTitle: "Website Design for Barbershops That Want More Bookings | Marketech Digital",
    metaDescription: "Learn what barbershop websites need to turn visitors into bookings, including mobile design, service menus, booking buttons, reviews, photos, and local SEO.",
    excerpt: "A barbershop website should make style, trust, location, pricing, and booking obvious within seconds, especially on mobile.",
    intro: "A barbershop website does not need to be complicated. It needs to feel sharp, local, mobile-friendly, and easy to book. For Ottawa barbershops, the website should support quick decisions: who cuts here, what services are offered, how much does it cost, where is it located, and how do I book?",
    readTime: "6 min read",
    date: "2026-04-27",
    updatedFor2026: true,
    serviceLinks: [
      { label: "Website Design", href: "/services/web-development" },
      { label: "Digital Marketing", href: "/services/digital-marketing" }
    ],
    relatedSlugs: ["best-website-structure-local-service-businesses", "google-business-profile-checklist-ottawa", "premium-trustworthy-website-2026"],
    sections: [
      {
        heading: "Make booking the easiest action on the page",
        paragraphs: [
          "For barbershops, booking is the conversion. The booking button should appear in the hero, navigation, service menu, barber profiles, and bottom CTA. On mobile, it should be easy to tap without hunting through the site.",
          "If you accept walk-ins, say that clearly. If appointments are preferred, say that too. Confusion costs bookings."
        ],
        bullets: ["Use a clear \"Book Appointment\" button.", "Add tap-to-call for quick questions.", "Explain walk-in and appointment policies."
        ]
      },
      {
        heading: "Show services and prices clearly",
        paragraphs: [
          "A barbershop visitor often wants to compare cut types, beard services, kids cuts, fades, lineups, styling, and premium services. A clean service menu helps people decide before they call.",
          "If prices vary by barber, time, or service complexity, explain the range honestly. Clear pricing builds trust even when the final amount depends on the appointment."
        ],
        bullets: ["Group services by category.", "Keep pricing easy to scan.", "Add service duration when useful."]
      },
      {
        heading: "Use barber profiles to create trust",
        paragraphs: [
          "People often choose a barber, not just a shop. Short barber profiles can include specialties, experience, style focus, languages, availability, and booking links.",
          "Profiles do not need to be long. A strong photo, two or three lines, and a direct booking action can make the experience feel more personal and premium."
        ],
        bullets: ["Show real team photos.", "Mention specialties like fades, beard work, or textured cuts.", "Link each profile to booking if possible."]
      },
      {
        heading: "Let the gallery sell the quality",
        paragraphs: [
          "A barbershop is visual. A gallery should show real cuts, clean lighting, consistent framing, and recent work. Instagram can help, but the website should still show a curated set of strong examples.",
          "Avoid overloading the page with too many images. A focused gallery of strong work feels more premium than a messy feed."
        ],
        bullets: ["Use real cuts from your shop.", "Keep the best work near the booking CTA.", "Add descriptive alt text for accessibility and SEO."]
      },
      {
        heading: "Connect local SEO, Google Maps, and reviews",
        paragraphs: [
          "People searching for a barbershop often care about proximity, reviews, hours, and booking speed. Your website should connect with your Google Business Profile, show your location clearly, embed or link maps when appropriate, and mention the area naturally.",
          "Ottawa, Kanata, Barrhaven, Nepean, and nearby neighborhoods can be included where they match the actual service area. Do not pretend to serve areas you do not realistically cover."
        ],
        bullets: ["Add address and parking notes if useful.", "Link to Google Maps.", "Feature real reviews near the service menu or booking block."]
      },
      {
        heading: "Design mobile-first, not desktop-first",
        paragraphs: [
          "A barbershop website is often opened from a phone right before someone books. The mobile version should load fast, show services quickly, make booking obvious, and avoid oversized animations that slow the decision down.",
          "The site can still feel premium with motion, glow, and strong visuals, but every detail should support speed and booking."
        ],
        bullets: ["Keep the mobile homepage simple.", "Make buttons large enough to tap.", "Avoid hiding the service menu behind too many clicks."]
      }
    ]
  },
  {
    title: "How Cleaning Companies Can Get More Quote Requests Online",
    slug: "cleaning-company-quote-requests-online",
    category: "Industry Guides",
    seoTitle: "How Cleaning Companies Can Get More Quote Requests Online | Marketech Digital",
    metaDescription: "Cleaning companies can get more quote requests with better website structure, trust signals, service pages, local SEO, and follow-up automation.",
    excerpt: "Cleaning company websites need to separate services, build trust quickly, and make quote requests feel simple and safe.",
    intro: "Cleaning companies often lose online leads because their websites treat every visitor the same. A homeowner looking for deep cleaning, a property manager looking for turnover cleaning, and an office manager looking for commercial cleaning need different information before requesting a quote.",
    readTime: "7 min read",
    date: "2026-04-27",
    updatedFor2026: true,
    serviceLinks: [
      { label: "Website Design", href: "/services/web-development" },
      { label: "AI Automation", href: "/services/ai-automation" }
    ],
    relatedSlugs: ["best-website-structure-local-service-businesses", "get-more-local-leads-without-ads", "ai-automation-small-business-lead-follow-up"],
    sections: [
      {
        heading: "Separate residential and commercial cleaning",
        paragraphs: [
          "Residential and commercial buyers have different concerns. Homeowners may care about safety, scheduling, supplies, rooms, pets, and recurring service. Commercial buyers may care about insurance, after-hours cleaning, scope, consistency, and contracts.",
          "Separate pages or sections help each visitor find the details that matter to them. It also improves SEO because each service page can target a clearer search intent."
        ],
        bullets: ["Create dedicated residential cleaning content.", "Create dedicated commercial cleaning content.", "Add separate CTAs for quotes and recurring service."]
      },
      {
        heading: "Make the quote form easy but useful",
        paragraphs: [
          "Cleaning quote forms should collect enough information to respond properly without overwhelming the visitor. Good fields include property type, location, service type, approximate size, preferred timing, and any special notes.",
          "Avoid asking for every detail on the first form. The goal is to start the conversation and qualify the request enough for a useful response."
        ],
        bullets: ["Use service type dropdowns.", "Ask for location or service area.", "Confirm what happens after the request is submitted."]
      },
      {
        heading: "Use before-and-after photos responsibly",
        paragraphs: [
          "Before-and-after visuals can build confidence quickly, especially for deep cleaning, move-out cleaning, post-renovation cleaning, and detailing-style services. Use real photos with permission and avoid showing private customer details.",
          "A small curated gallery is better than a messy collection. The images should support trust, not slow the page down."
        ],
        bullets: ["Use real photos with permission.", "Compress images for fast loading.", "Add descriptive alt text for each image."]
      },
      {
        heading: "Show service areas clearly",
        paragraphs: [
          "Cleaning companies often serve multiple neighborhoods and nearby cities. If you serve Ottawa, Kanata, Barrhaven, Nepean, or Gatineau, make that clear on the site and keep it consistent with your Google Business Profile.",
          "Do not create dozens of thin location pages. Start with your strongest areas and build useful pages that answer real local questions."
        ],
        bullets: ["List realistic service areas.", "Create useful local pages only when they add value.", "Keep Google profile and website information aligned."]
      },
      {
        heading: "Add trust signals before the quote request",
        paragraphs: [
          "Cleaning services happen in homes, offices, clinics, and private spaces. Trust matters. Before asking for a quote request, show reviews, process details, insurance or bonding information where applicable, team standards, and what customers can expect.",
          "The website should make the business feel professional, organized, and safe to contact."
        ],
        bullets: ["Show reviews near the form.", "Explain supplies, access, and scheduling.", "Mention insurance or screening only if accurate."]
      },
      {
        heading: "Automate follow-up so quote requests do not go cold",
        paragraphs: [
          "A cleaning quote request can go cold quickly if the lead waits too long. Simple automation can send a confirmation email, notify the owner, assign the lead type, and create a reminder if the quote is not sent or accepted.",
          "This is practical AI automation for small businesses: not complicated, just a cleaner system that helps the team respond faster and stay organized."
        ],
        bullets: ["Send instant confirmations.", "Sort leads by residential or commercial.", "Create quote follow-up reminders."]
      }
    ]
  },
  {
    title: "The Best Website Structure for Local Service Businesses",
    slug: "best-website-structure-local-service-businesses",
    category: "Website Design",
    seoTitle: "Best Website Structure for Local Service Businesses | Marketech Digital",
    metaDescription: "See the ideal website structure for local service businesses that want more calls, quote requests, bookings, and trust from nearby customers.",
    excerpt: "A strong local service website is not just a homepage. It is a clear system of pages that explain services, trust, locations, and next steps.",
    intro: "Local service businesses need website structure that helps both people and search engines. A single-page site can work for a very simple offer, but most businesses eventually need service pages, location clarity, trust proof, FAQs, and a contact path that supports calls, bookings, and quote requests.",
    readTime: "8 min read",
    date: "2026-04-27",
    updatedFor2026: true,
    serviceLinks: [
      { label: "Website Design", href: "/services/web-development" },
      { label: "SEO", href: "/services/seo" }
    ],
    relatedSlugs: ["website-mistakes-ottawa-small-businesses", "website-visitors-but-no-calls", "seo-for-small-businesses-ottawa"],
    sections: [
      {
        heading: "Homepage: the strategic overview",
        paragraphs: [
          "The homepage should explain the business quickly and guide visitors to the right next step. It should not try to say everything. Think of it as the central decision page: what you do, who you help, why trust you, where you work, and how to contact you.",
          "A strong homepage layout includes a clear hero, service overview, trust signals, process, local relevance, proof, FAQs, and final CTA."
        ],
        bullets: ["Hero with clear offer and CTA.", "Service overview linking to service pages.", "Trust proof and simple process."]
      },
      {
        heading: "Services page: the organized menu",
        paragraphs: [
          "The services page should show all major service categories in one place. This helps visitors compare options and helps Google understand the business's full service range.",
          "Each service card or section should include a short explanation, who it is for, and a link to learn more."
        ],
        bullets: ["Group services logically.", "Use customer-friendly service names.", "Link each major service to its own page."]
      },
      {
        heading: "Individual service pages: where conversion and SEO improve",
        paragraphs: [
          "Individual service pages are important because customers often search for specific services, not the business category. A cleaning company may need pages for commercial cleaning, move-out cleaning, and deep cleaning. A contractor may need pages for basement renovation, deck repair, or bathroom renovation.",
          "Each service page should explain the problem, process, deliverables, service area, FAQs, proof, and next step."
        ],
        bullets: ["Use one page per important service.", "Answer real buyer questions.", "Add service-specific CTAs."]
      },
      {
        heading: "Location pages: useful only when they are real",
        paragraphs: [
          "Location pages can help local SEO when they are built with care. A Barrhaven page should not be the same as a Kanata page with one word changed. It should include real service area context, relevant questions, directions or neighborhoods when useful, and clear contact options.",
          "Start with your strongest service areas before scaling."
        ],
        bullets: ["Create pages for real priority locations.", "Avoid duplicate content.", "Link locations to relevant services."]
      },
      {
        heading: "About, reviews, gallery, and case studies: the trust layer",
        paragraphs: [
          "Trust pages help visitors feel the business is real and credible. About pages, review sections, galleries, project examples, and case studies can reduce hesitation before someone submits a form.",
          "A small business does not need fake case studies. Real photos, honest descriptions, and clear process details are stronger than exaggerated results."
        ],
        bullets: ["Use real team or work photos.", "Show reviews where they support decisions.", "Explain how the business works."]
      },
      {
        heading: "FAQs and Insights: the search and education layer",
        paragraphs: [
          "FAQs answer buying questions. Insights answer research questions. Together they can improve SEO, help visitors self-educate, and reduce repeated questions before the first call.",
          "Insights should not feel like a random blog. They should support your services, local relevance, and buyer decision process."
        ],
        bullets: ["Answer real customer questions.", "Link Insights to service pages.", "Use internal links to guide the next step."]
      },
      {
        heading: "Contact or booking page: the conversion endpoint",
        paragraphs: [
          "The contact page should make action simple. Include the form, phone, email if appropriate, service area, expectations, and any booking link. Make sure the form submission triggers a reliable notification and confirmation.",
          "A website structure is only successful if the final step works smoothly."
        ],
        bullets: ["Keep contact options clear.", "Confirm submissions instantly.", "Route leads to the right inbox or system."]
      }
    ]
  },
  {
    title: "How AI Automation Can Help Small Businesses Follow Up With Leads",
    slug: "ai-automation-small-business-lead-follow-up",
    category: "AI Automation",
    seoTitle: "How AI Automation Helps Small Businesses Follow Up With Leads | Marketech Digital",
    metaDescription: "Learn how simple AI automation can help small businesses respond faster, follow up with leads, organize inquiries, and stop losing potential customers.",
    excerpt: "Practical AI automation is not about replacing people. It is about making sure interested leads receive a faster, cleaner response.",
    intro: "Small businesses do not need complex enterprise AI to improve lead follow-up. Most need simple systems that respond faster, organize inquiries, reduce missed opportunities, and help the owner or team know what to do next. For local businesses in Ottawa, AI automation can be practical, affordable, and focused on real daily problems.",
    readTime: "7 min read",
    date: "2026-04-27",
    updatedFor2026: true,
    serviceLinks: [
      { label: "AI Automation", href: "/services/ai-automation" },
      { label: "Workflow Automation", href: "/services/workflow-automation-build" }
    ],
    relatedSlugs: ["get-more-local-leads-without-ads", "cleaning-company-quote-requests-online", "website-visitors-but-no-calls"],
    sections: [
      {
        heading: "Missed call follow-up",
        paragraphs: [
          "A missed call can become a lost lead. A simple follow-up system can send a polite text or email asking how the business can help, then notify the team to respond. The system should be respectful, clear, and easy to opt out of where required.",
          "This is especially useful for service businesses that receive calls during jobs, appointments, or busy hours."
        ],
        bullets: ["Trigger a follow-up after missed calls where technically possible.", "Keep the message short and helpful.", "Notify the owner or team immediately."]
      },
      {
        heading: "Form response automation",
        paragraphs: [
          "When someone submits a form, they should receive confirmation right away. That confirmation can set expectations, summarize what was submitted, and explain the next step.",
          "Behind the scenes, the lead can be sent to the right inbox, spreadsheet, CRM, or task board so the team does not lose it."
        ],
        bullets: ["Send instant confirmation.", "Route leads by service type.", "Store inquiries in one organized place."]
      },
      {
        heading: "Lead sorting and qualification",
        paragraphs: [
          "AI can help sort inquiries by service interest, urgency, location, budget range, or missing information. This does not mean the AI makes business decisions. It simply helps the team see what kind of lead arrived.",
          "A cleaning company might sort residential and commercial inquiries. A contractor might sort repair, renovation, and consultation requests. A clinic might sort booking questions and general inquiries."
        ],
        bullets: ["Tag leads by service.", "Flag urgent requests.", "Identify missing details before the first reply."]
      },
      {
        heading: "Email reply drafts",
        paragraphs: [
          "AI can draft a first reply based on the inquiry, but the business should review important messages before sending. This keeps the response fast while still protecting tone, accuracy, and professionalism.",
          "For small teams, reply drafts save time and reduce the pressure of starting every message from scratch."
        ],
        bullets: ["Use approved templates for common inquiries.", "Review replies before sending when needed.", "Keep the tone human and specific."]
      },
      {
        heading: "Appointment reminders and quote follow-ups",
        paragraphs: [
          "Many leads disappear because nobody follows up after the first quote or booking conversation. Automation can create reminders, send polite follow-ups, and help the team track where each opportunity stands.",
          "The goal is not to annoy people. The goal is to be organized, professional, and consistent."
        ],
        bullets: ["Send appointment reminders.", "Create quote follow-up tasks.", "Separate active leads from closed or inactive ones."]
      },
      {
        heading: "Review request flows",
        paragraphs: [
          "After a service is completed, automation can help request a review at the right time. The message should be simple, honest, and direct. Never pressure people or fake reviews.",
          "A clean review request flow supports local SEO, Google Business Profile trust, and future lead conversion."
        ],
        bullets: ["Ask after successful completion.", "Link to the correct review page.", "Thank customers regardless of whether they leave a review."]
      }
    ]
  },
  {
    title: "SEO for Small Businesses in Ottawa: A Simple Beginner Guide",
    slug: "seo-for-small-businesses-ottawa",
    category: "Local SEO",
    seoTitle: "SEO for Small Businesses in Ottawa: Beginner Guide | Marketech Digital",
    metaDescription: "Simple SEO guide for Ottawa small businesses. Learn how local keywords, service pages, Google Business Profile, reviews, and helpful content improve visibility.",
    excerpt: "SEO is easier to understand when you think of it as clarity: clear services, clear locations, clear pages, and useful answers.",
    intro: "SEO can sound technical, but the foundation is simple. Search engines need to understand what your business does, where you do it, who you help, and why your page is useful. For Ottawa small businesses, local SEO starts with better website structure, Google Business Profile quality, reviews, service pages, and helpful content.",
    readTime: "8 min read",
    date: "2026-04-27",
    updatedFor2026: true,
    serviceLinks: [
      { label: "SEO", href: "/services/seo" },
      { label: "Website Design", href: "/services/web-development" }
    ],
    relatedSlugs: ["google-business-profile-checklist-ottawa", "best-website-structure-local-service-businesses", "get-more-local-leads-without-ads"],
    sections: [
      {
        heading: "Start with the searches your customers actually use",
        paragraphs: [
          "SEO begins with customer language. A business owner might describe a service one way, but customers may search for it differently. Use phrases that match real buying intent, such as \"cleaning company Ottawa,\" \"barbershop Kanata,\" \"local SEO Ottawa,\" or \"contractor Barrhaven\" where relevant.",
          "Do not force keywords into every sentence. Use them naturally in titles, headings, service pages, and helpful content."
        ],
        bullets: ["List your core services.", "List your real service areas.", "Match pages to customer search intent."]
      },
      {
        heading: "Write useful page titles and meta descriptions",
        paragraphs: [
          "A page title helps search engines and users understand what the page is about. A meta description helps explain why someone should click. They should be specific, readable, and relevant to the page.",
          "For example, \"Commercial Cleaning Services in Ottawa | Company Name\" is clearer than \"Home | Company Name.\""
        ],
        bullets: ["Use unique titles for important pages.", "Keep descriptions honest and benefit-driven.", "Avoid repeating the same metadata everywhere."]
      },
      {
        heading: "Create service pages instead of one crowded page",
        paragraphs: [
          "If your business offers several important services, each major service should usually have its own page. This gives customers better information and gives Google a clearer page to rank for that topic.",
          "A service page should answer what the service includes, who it is for, where it is available, common questions, proof, and how to request the service."
        ],
        bullets: ["Build pages for your highest-value services first.", "Use internal links between related pages.", "Add FAQs based on real questions."]
      },
      {
        heading: "Improve Google Business Profile and reviews",
        paragraphs: [
          "Local SEO depends heavily on how your business appears in local results. Your Google Business Profile should have accurate categories, services, photos, hours, website links, and reviews.",
          "Reviews support trust and can improve how people compare your business. Ask honestly, respond professionally, and keep the profile active."
        ],
        bullets: ["Keep hours and categories accurate.", "Add real photos regularly.", "Respond to reviews calmly and professionally."]
      },
      {
        heading: "Use internal links to guide people and search engines",
        paragraphs: [
          "Internal links connect your website together. They help visitors move from an article to a service page, from a service page to a contact page, and from a local page to the right offer.",
          "For search engines, internal links show which pages matter and how topics connect."
        ],
        bullets: ["Link Insights to services.", "Link service pages to contact or audit pages.", "Link related articles together naturally."]
      },
      {
        heading: "Make the site fast, mobile-friendly, and easy to crawl",
        paragraphs: [
          "Technical basics matter. A slow, messy, or hard-to-use website can hurt both user experience and search performance. Focus on fast loading, mobile readability, clean headings, descriptive links, sitemap, robots file, and structured data where appropriate.",
          "You do not need to become a developer to understand the goal: make the website easy for people and search engines to use."
        ],
        bullets: ["Compress images.", "Use clean heading hierarchy.", "Make important pages indexable."]
      },
      {
        heading: "Publish helpful content with a purpose",
        paragraphs: [
          "Content should answer questions your customers already ask before they contact you. A useful Insights section can support SEO, build trust, and guide readers toward services or a free audit.",
          "Avoid generic filler. Every article should help the reader make a better decision."
        ],
        bullets: ["Write for real business questions.", "Keep paragraphs short for mobile.", "End with a clear next step."]
      }
    ]
  },
  {
    title: "What Makes a Website Look Premium and Trustworthy in 2026",
    slug: "premium-trustworthy-website-2026",
    category: "Website Design",
    seoTitle: "What Makes a Website Look Premium and Trustworthy in 2026 | Marketech Digital",
    metaDescription: "Learn what makes a business website feel premium, modern, and trustworthy in 2026, from design and copy to speed, mobile experience, and conversion flow.",
    excerpt: "Premium design is not about adding more effects. It is about clarity, restraint, speed, trust, and a conversion path that feels intentional.",
    intro: "A premium website in 2026 does not have to be loud. It has to feel clear, current, fast, trustworthy, and easy to act on. For local businesses, premium design can help customers feel that the business is serious before they call, book, request a quote, or visit in person.",
    readTime: "7 min read",
    date: "2026-04-27",
    updatedFor2026: true,
    serviceLinks: [
      { label: "Website Design", href: "/services/web-development" },
      { label: "Branding", href: "/services/branding" }
    ],
    relatedSlugs: ["website-mistakes-ottawa-small-businesses", "website-design-for-barbershops", "best-website-structure-local-service-businesses"],
    sections: [
      {
        heading: "Clear messaging before visual effects",
        paragraphs: [
          "A website can have beautiful animations and still fail if the message is unclear. Premium starts with a strong headline, simple explanation, and obvious next step. Visitors should understand the offer before they admire the design.",
          "This is especially important for small business website design in Ottawa because local customers compare several options quickly."
        ],
        bullets: ["Use a direct headline.", "Explain the service in plain language.", "Make the CTA obvious."
        ]
      },
      {
        heading: "Strong spacing and typography",
        paragraphs: [
          "Premium websites give content room to breathe. Crowded sections feel cheap even when the colors are good. Clean spacing, consistent typography, and clear hierarchy make the site easier to read and more trustworthy.",
          "Typography should support confidence. Use readable sizes, strong headings, and short paragraphs, especially on mobile."
        ],
        bullets: ["Avoid cramped sections.", "Use consistent heading sizes.", "Keep body text readable on phones."]
      },
      {
        heading: "Motion that supports the message",
        paragraphs: [
          "Motion can make a website feel modern, but too much motion becomes distracting. Premium motion is subtle, smooth, and connected to the brand. It should guide attention, not compete with the content.",
          "For service businesses, animation should never make booking, calling, or reading harder."
        ],
        bullets: ["Use hover states with restraint.", "Avoid slow loading effects.", "Respect mobile performance."]
      },
      {
        heading: "Real trust signals",
        paragraphs: [
          "Trust is a design element. Reviews, process clarity, real photos, team details, project examples, service guarantees you can honor, and accurate business information all make the site feel safer to use.",
          "A premium website does not need fake client results or exaggerated testimonials. Real signals are stronger."
        ],
        bullets: ["Use real reviews and photos.", "Show process and expectations.", "Keep contact details accurate."]
      },
      {
        heading: "Fast loading and mobile-first flow",
        paragraphs: [
          "A premium website should feel fast. Heavy images, unnecessary scripts, and oversized effects can make a site feel less professional even if it looks impressive in a screenshot.",
          "Mobile-first flow means the visitor can understand the offer, trust the business, and act without pinching, waiting, or searching."
        ],
        bullets: ["Compress images.", "Test on real phones.", "Keep core actions easy to tap."]
      },
      {
        heading: "Brand consistency across every page",
        paragraphs: [
          "A site feels premium when the colors, buttons, icons, spacing, copy, and visuals feel like one system. Random design styles make the business feel less organized.",
          "For local businesses, brand consistency can be simple: one strong color system, clear voice, consistent cards, and repeated conversion patterns."
        ],
        bullets: ["Use one visual direction.", "Keep button styles consistent.", "Make service pages feel connected to the homepage."]
      },
      {
        heading: "A clean conversion path",
        paragraphs: [
          "Premium is not only visual. A premium website helps the visitor move forward without confusion. The CTA, form, booking system, phone link, and follow-up process should feel intentional.",
          "When design and conversion work together, the website becomes more than a digital brochure. It becomes a lead-generation system."
        ],
        bullets: ["Repeat the main CTA naturally.", "Use short forms.", "Add confirmation and follow-up after submission."]
      }
    ]
  }
];

export const featuredInsight = insights[0];

export const insightMap = Object.fromEntries(insights.map((article) => [article.slug, article])) as Record<string, InsightArticle>;

export function getInsightBySlug(slug: string) {
  return insightMap[slug];
}

export function getRelatedInsights(article: InsightArticle, limit = 3) {
  const selected = article.relatedSlugs.map((slug) => insightMap[slug]).filter(Boolean);
  if (selected.length >= limit) return selected.slice(0, limit);
  const fallback = insights.filter((item) => item.slug !== article.slug && !selected.some((related) => related.slug === item.slug));
  return [...selected, ...fallback].slice(0, limit);
}
