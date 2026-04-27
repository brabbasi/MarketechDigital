"use client";

import { useEffect } from "react";

const projectEmail = "project@getmarketechdigital.com";
const contactEmail = "contact@getmarketechdigital.com";

function addCarouselTools(id: string, label: string) {
  const rail = document.getElementById(id);
  if (!rail || rail.previousElementSibling?.getAttribute("data-carousel-tools") === id) return;

  rail.setAttribute("aria-label", `${label} scroll area`);

  const tools = document.createElement("div");
  tools.className = "carousel-tools ux-carousel-tools";
  tools.setAttribute("data-carousel-tools", id);
  tools.innerHTML = `
    <div><span></span><strong>${label}</strong><p>Swipe or use the controls.</p></div>
    <div class="carousel-buttons"><button type="button" aria-label="Previous ${label}">←</button><button type="button" aria-label="Next ${label}">→</button></div>
  `;
  rail.insertAdjacentElement("beforebegin", tools);
  const [prev, next] = Array.from(tools.querySelectorAll("button"));
  const scrollAmount = () => Math.min(rail.clientWidth * 0.9, 520);
  prev?.addEventListener("click", () => rail.scrollBy({ left: -scrollAmount(), behavior: "smooth" }));
  next?.addEventListener("click", () => rail.scrollBy({ left: scrollAmount(), behavior: "smooth" }));
}

function makeFAQCarousel() {
  const cards = Array.from(document.querySelectorAll<HTMLElement>(".faq-card"));
  const grid = cards[0]?.parentElement as HTMLElement | null;
  if (!grid || grid.id === "faqGrid") return;
  grid.id = "faqGrid";
  grid.classList.add("faq-carousel");
  addCarouselTools("faqGrid", "FAQ carousel");
}

function addHomeIdeaGeneratorCTA() {
  if (document.getElementById("homeIdeaGeneratorCta")) return;
  if (document.querySelector(".idea-lab")) return;

  const anchorTarget = "/services#idea-generator";
  const cta = document.createElement("section");
  cta.id = "homeIdeaGeneratorCta";
  cta.className = "home-idea-cta";
  cta.setAttribute("aria-labelledby", "homeIdeaTitle");
  cta.innerHTML = `
    <div class="home-idea-copy">
      <div class="home-idea-label"><span></span> Free idea helper</div>
      <h2 id="homeIdeaTitle">Not sure what your business needs first?</h2>
      <p>Tell us what kind of business you run, what feels stuck, and what tools you already use. We will suggest a practical first step before you book a call.</p>
      <div class="home-idea-actions">
        <a href="${anchorTarget}">Get a helpful suggestion →</a>
        <button type="button" data-open-contact aria-label="Ask Basit about your project instead of using the idea helper">Ask Basit instead</button>
      </div>
    </div>
    <a class="home-idea-preview" href="${anchorTarget}" aria-label="Open free idea helper">
      <div class="home-idea-node one" aria-hidden="true"></div>
      <div class="home-idea-node two" aria-hidden="true"></div>
      <div class="home-idea-node three" aria-hidden="true"></div>
      <svg viewBox="0 0 520 260" aria-hidden="true">
        <path d="M42 178 C 110 92, 168 222, 236 126 S 358 76, 478 118" />
        <path d="M66 206 C 142 150, 196 154, 268 104 S 388 66, 492 84" />
      </svg>
      <div class="home-idea-card">
        <span>Personal suggestion</span>
        <strong>A simple first step</strong>
        <em>What to build first · what to save time on · what to track · likely budget range</em>
      </div>
    </a>
  `;

  const starter = document.querySelector(".starter-systems");
  const offers = document.getElementById("offers");
  const process = document.getElementById("process");
  const hero = document.querySelector(".hero, header, main section");

  if (starter?.parentElement) starter.insertAdjacentElement("afterend", cta);
  else if (offers?.parentElement) offers.insertAdjacentElement("beforebegin", cta);
  else if (process?.parentElement) process.insertAdjacentElement("beforebegin", cta);
  else hero?.insertAdjacentElement("afterend", cta);

  cta.querySelector("[data-open-contact]")?.addEventListener("click", openContactModal);
}

function ensureContactModal() {
  if (document.getElementById("contactPopup")) return;
  const modal = document.createElement("div");
  modal.id = "contactPopup";
  modal.className = "contact-popup";
  modal.innerHTML = `
    <div class="contact-popup-card" role="dialog" aria-modal="true" aria-labelledby="contactPopupTitle">
      <button class="contact-popup-close" type="button" aria-label="Close contact form">×</button>
      <div class="contact-popup-label"><span></span> Start a project</div>
      <h2 id="contactPopupTitle">Tell us what you want to build.</h2>
      <p>Share what you are trying to fix, improve, or launch. You do not need to have everything figured out. A few honest details are enough to start the right conversation.</p>
      <form class="contact-popup-form" aria-label="Marketech Digital project inquiry form">
        <input name="name" placeholder="Your name" aria-label="Your name" autocomplete="name" />
        <input name="email" type="email" placeholder="Email address" aria-label="Email address" autocomplete="email" />
        <input name="phone" type="tel" placeholder="Phone number optional" aria-label="Phone number optional" autocomplete="tel" />
        <input name="company" placeholder="Company name optional" aria-label="Company name optional" autocomplete="organization" />
        <input name="business" placeholder="Business type" aria-label="Business type" />
        <select name="service" aria-label="Service interested in">
          <option value="">What do you need help with?</option>
          <option>AI automation</option>
          <option>Web development</option>
          <option>Software or internal system</option>
          <option>SEO or digital marketing</option>
          <option>Landing page</option>
          <option>Branding</option>
          <option>Not sure yet</option>
        </select>
        <select name="budget" aria-label="Budget range">
          <option value="">Budget range</option>
          <option>$500 to $1,500 CAD</option>
          <option>$1,500 to $4,500 CAD</option>
          <option>$4,500 to $9,500 CAD</option>
          <option>$10,000+ CAD</option>
          <option>Not sure yet</option>
        </select>
        <select name="preferredContact" aria-label="Preferred contact method">
          <option value="">Preferred contact method</option>
          <option>Email</option>
          <option>Phone</option>
          <option>WhatsApp</option>
        </select>
        <textarea name="message" placeholder="What problem, system, or idea do you want help with?" aria-label="Project details"></textarea>
        <button type="submit">Send project inquiry →</button>
      </form>
      <div class="contact-popup-status" aria-live="polite"></div>
      <a class="contact-popup-mail" href="mailto:${projectEmail}">Prefer email? ${projectEmail}</a>
    </div>
  `;
  document.body.appendChild(modal);

  const close = () => modal.classList.remove("show");
  modal.querySelector(".contact-popup-close")?.addEventListener("click", close);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) close();
  });
  modal.querySelector("form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const status = modal.querySelector<HTMLElement>(".contact-popup-status");
    const data = Object.fromEntries(new FormData(form).entries());
    if (status) status.textContent = "Sending your inquiry...";
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        const detail = typeof result?.error === "string" ? result.error : `Please email ${projectEmail} and we will still help you.`;
        throw new Error(detail);
      }
      if (status) status.textContent = "Thank you. Your inquiry has been emailed to Marketech Digital.";
      form.reset();
    } catch (error) {
      const detail = error instanceof Error && error.message ? error.message : `Please email ${projectEmail} and we will still help you.`;
      if (status) status.textContent = `The form had trouble sending. ${detail}`;
    }
  });
}

function openContactModal() {
  ensureContactModal();
  document.getElementById("contactPopup")?.classList.add("show");
}

function interceptContactClicks() {
  if (document.body.getAttribute("data-contact-intercept") === "true") return;
  document.body.setAttribute("data-contact-intercept", "true");
  document.addEventListener(
    "click",
    (event) => {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest("a,button") as HTMLElement | null;
      if (!trigger) return;
      const href = trigger instanceof HTMLAnchorElement ? trigger.getAttribute("href") || "" : "";
      const text = (trigger.textContent || "").toLowerCase();
      const isContact =
        href === "#contact" ||
        href === "/#contact" ||
        href.startsWith("mailto:") ||
        text.includes("book a consultation") ||
        text.includes("start a conversation") ||
        text.includes("ask for a recommendation") ||
        text.includes("start this project") ||
        text.includes("send message");
      if (!isContact) return;
      event.preventDefault();
      openContactModal();
    },
    true
  );
}

function enhanceFooter() {
  const footer = document.querySelector("footer .footer-wrap") as HTMLElement | null;
  if (!footer || footer.getAttribute("data-enhanced-footer") === "true") return;
  const year = new Date().getFullYear();
  footer.setAttribute("data-enhanced-footer", "true");
  footer.innerHTML = `
    <div class="footer-brand-block">
      <div class="footer-mark"><img src="/logo.svg" alt="Marketech Digital logo" /></div>
      <div>
        <strong>Marketech Digital</strong>
        <p>Websites, automation, SEO, branding, and digital systems for business owners who want their online presence to feel clear, trustworthy, and easier to manage.</p>
      </div>
    </div>
    <div class="footer-columns">
      <div><span>Services</span><a href="/services">Starter systems</a><a href="#offers">Main offers</a><a href="#process">How we work</a></div>
      <div><span>Company</span><a href="/founder">Founder profile</a><a href="#faq">Questions</a><a href="#contact">Contact</a></div>
      <div><span>Contact</span><a href="mailto:${contactEmail}">${contactEmail}</a><button type="button">Book a consultation</button></div>
    </div>
    <div class="footer-bottom"><span>© ${year} Marketech Digital. All rights reserved.</span><span>Serving Ottawa, Kanata, Barrhaven, Nepean, Gatineau, Toronto, and businesses across Canada.</span></div>
  `;
}

function stabilizeDecorativeMedia() {
  document.getElementById("bgCanvas")?.setAttribute("aria-hidden", "true");
  document.querySelectorAll("svg").forEach((svg) => {
    if (!svg.getAttribute("role") && !svg.getAttribute("aria-label")) svg.setAttribute("aria-hidden", "true");
  });
}

const exactCopy = new Map<string, string>([
  ["AI SYSTEMS. WORKFLOW AUTOMATION. DECISION CLARITY.", "AI systems. Workflow automation. Better decisions."],
  ["Buy a clearer system — not more noise.", "Build a clearer system for your business."],
  ["Marketech Digital helps businesses get specific outcomes: a sharper AI roadmap, cleaner workflow automation, stronger decision visibility, and a growth-ready operating system built for action. The focus is practical business value, not vague tech talk.", "Marketech Digital helps business owners turn websites, AI, workflow automation, data, and marketing into practical systems that feel clear, useful, and easier to manage. You get a focused plan, better follow up, clearer visibility, and a site people can trust."],
  ["From scattered work to an intelligent operating layer.", "From scattered work to a clearer way to run the business."],
  ["Marketech Digital turns workflows, data, and decision points into a cleaner command system — so leaders can see what matters, automate what repeats, and move with more confidence.", "Marketech Digital turns workflows, data, and decision points into a clearer working system so owners and teams can see what matters, save time on repeated work, and move with more confidence."],
  ["AI ROADMAPS", "AI PLANS"],
  ["GROWTH SYSTEMS", "BUSINESS SYSTEMS"],
  ["Can this become a backend-driven live site later?", "Can this grow into a real connected system later?"],
  ["Yes. The current version is structured so public metrics, contact handling, and content management can be wired into a real backend later.", "Yes. The site can grow over time with better lead handling, content updates, public metrics, and backend tools when the business is ready."],
  ["Smaller entry systems without lowering the brand.", "Start small without making the brand feel small."],
  ["For clients who are not ready for a full operating-system build, Marketech offers focused starter systems: AI agent bots, automation audits, dashboard starters, workflow setup, and lead-capture intelligence.", "Some businesses need a clear first step before a larger build. Marketech can start with an assistant, an automation review, a simple dashboard, a workflow setup, or a better lead capture path."],
  ["Offer-focused by design.", "Clear offers built around real business needs."],
  ["Each offer opens in a deeper animated popup with clearer conversion copy, business outcomes, deliverables, and who it is best for.", "Each offer explains what it helps with, what you get, and when it makes sense for your business."],
  ["OPEN DETAIL POPUP", "OPEN DETAILS"],
  ["Tap for details", "View details"]
]);

const softReplacements: [RegExp, string][] = [
  [/—/g, ","],
  [/–/g, " to "],
  [/growth-ready/gi, "ready to grow"],
  [/backend-driven/gi, "connected to a real backend"],
  [/AI-powered/gi, "personalized"],
  [/high-value/gi, "valuable"],
  [/Use-case/gi, "Use case"],
  [/use-case/gi, "use case"],
  [/delivery-focused/gi, "built around delivery"],
  [/operations-heavy/gi, "operations based"],
  [/long-term/gi, "lasting"],
  [/lead-capture/gi, "lead capture"],
  [/buildout/gi, "build"],
  [/leverage/gi, "make a real difference"],
  [/operating layer/gi, "working system"],
  [/command system/gi, "working system"],
  [/digital infrastructure/gi, "digital setup"],
  [/intelligence layer/gi, "clear view"],
  [/friction/gi, "roadblocks"],
  [/vague tech talk/gi, "confusing tech talk"]
];

function humanizeVisibleCopy(root: ParentNode = document) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName.toLowerCase();
      if (["script", "style", "svg", "path", "textarea", "input", "select", "option"].includes(tag)) return NodeFilter.FILTER_REJECT;
      if (!node.nodeValue?.trim()) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);

  nodes.forEach((node) => {
    const original = node.nodeValue || "";
    const trimmed = original.trim();
    let next = exactCopy.get(trimmed) || original;

    softReplacements.forEach(([pattern, replacement]) => {
      next = next.replace(pattern, replacement);
    });

    next = next.replace(/\s{2,}/g, " ");
    if (next !== original) node.nodeValue = next;
  });
}

function keepCopyHumanized() {
  if (document.body.getAttribute("data-human-copy-observer") === "true") return;
  document.body.setAttribute("data-human-copy-observer", "true");
  humanizeVisibleCopy();
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) humanizeVisibleCopy(node.parentElement || document);
        if (node.nodeType === Node.ELEMENT_NODE) humanizeVisibleCopy(node as Element);
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

export default function UXFixLayer() {
  useEffect(() => {
    const run = () => {
      makeFAQCarousel();
      addCarouselTools("faqGrid", "FAQ carousel");
      ensureContactModal();
      interceptContactClicks();
      addHomeIdeaGeneratorCTA();
      enhanceFooter();
      stabilizeDecorativeMedia();
      keepCopyHumanized();
    };

    run();
    const timeout = window.setTimeout(run, 700);
    const lateTimeout = window.setTimeout(humanizeVisibleCopy, 1600);
    return () => {
      window.clearTimeout(timeout);
      window.clearTimeout(lateTimeout);
    };
  }, []);

  return null;
}
