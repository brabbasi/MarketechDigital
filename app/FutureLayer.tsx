"use client";

import { useEffect } from "react";

function buildDeck() {
  return `
    <div class="future-eyebrow"><span></span> Live systems cockpit</div>
    <div class="future-grid">
      <div class="future-copy">
        <h2>From scattered work to an intelligent operating layer.</h2>
        <p>Marketech Digital turns workflows, data, and decision points into a cleaner command system — so leaders can see what matters, automate what repeats, and move with more confidence.</p>
        <div class="future-tags">
          <span>AI roadmaps</span><span>Automation maps</span><span>Decision views</span><span>Growth systems</span>
        </div>
      </div>
      <div class="future-console" aria-hidden="true">
        <div class="console-top"><span>Signal OS</span><strong data-future-status>Calibrating</strong></div>
        <div class="console-orbit">
          <i></i><i></i><i></i>
          <svg viewBox="0 0 520 270">
            <defs><linearGradient id="fg" x1="0" x2="1"><stop stop-color="#ff6a00"/><stop offset="1" stop-color="#59afff"/></linearGradient></defs>
            <path d="M40 190C110 104 178 222 254 132C340 30 416 164 480 76" fill="none" stroke="url(#fg)" stroke-width="3" stroke-linecap="round"/>
            <path d="M60 218H460" stroke="rgba(255,255,255,.08)"/>
            <circle cx="254" cy="132" r="42" fill="none" stroke="rgba(89,175,255,.22)"/>
            <circle cx="254" cy="132" r="12" fill="#59afff"/>
            <circle cx="410" cy="100" r="8" fill="#ff6a00"/>
          </svg>
        </div>
        <div class="future-metrics">
          <div><strong data-live-one>04</strong><span>systems mapped</span></div>
          <div><strong data-live-two>87%</strong><span>signal clarity</span></div>
          <div><strong data-live-three>12</strong><span>automation paths</span></div>
        </div>
      </div>
    </div>
  `;
}

function buildStarterSystems() {
  return `
    <div class="starter-label"><span></span> Starter systems</div>
    <div class="starter-headline-row">
      <div class="starter-copy">
        <h2>Smaller entry systems without lowering the brand.</h2>
        <p>Focused starter systems for clients who want value quickly before moving into a full operating-system build.</p>
      </div>
    </div>
    <div class="starter-carousel" id="starterCarousel" aria-label="Starter systems carousel">
      <article class="starter-mini"><strong>AI Agent Bot</strong><span>Lead capture, FAQs, qualification, and service routing.</span><a href="#contact">Start with bot →</a></article>
      <article class="starter-mini"><strong>Automation Audit</strong><span>Find repetitive work and map the fastest automation wins.</span><a href="#contact">Map workflow →</a></article>
      <article class="starter-mini"><strong>Dashboard Starter</strong><span>Clean visibility for KPIs, reports, and decision signals.</span><a href="#contact">Build visibility →</a></article>
      <article class="starter-mini"><strong>CRM Workflow Setup</strong><span>Connect intake, follow-ups, client handoff, and alerts.</span><a href="#contact">Clean handoff →</a></article>
      <article class="starter-mini"><strong>Lead Capture System</strong><span>Turn website interest into structured inquiries and faster follow-up.</span><a href="#contact">Capture leads →</a></article>
    </div>
    <div class="starter-actions starter-actions-bottom">
      <a href="/services">Explore starter systems →</a>
      <a href="#contact">Ask for a recommendation</a>
    </div>
  `;
}

function addCarouselTools(id: string, label: string) {
  const rail = document.getElementById(id);
  if (!rail || rail.previousElementSibling?.getAttribute("data-carousel-tools") === id) return;

  const tools = document.createElement("div");
  tools.className = "carousel-tools";
  tools.setAttribute("data-carousel-tools", id);
  tools.innerHTML = `
    <div><span></span><strong>${label}</strong><p>Swipe or use the controls to move through the system.</p></div>
    <div class="carousel-buttons"><button type="button" aria-label="Previous ${label}">←</button><button type="button" aria-label="Next ${label}">→</button></div>
  `;
  rail.insertAdjacentElement("beforebegin", tools);
  const [prev, next] = Array.from(tools.querySelectorAll("button"));
  const getAmount = () => Math.min(rail.clientWidth * 0.92, 460);
  prev?.addEventListener("click", () => rail.scrollBy({ left: -getAmount(), behavior: "smooth" }));
  next?.addEventListener("click", () => rail.scrollBy({ left: getAmount(), behavior: "smooth" }));
}

function addFounderButton() {
  const profile = document.querySelector(".founder-profile");
  if (!profile || profile.querySelector("[data-founder-full-page]")) return;
  const actions = profile.querySelector(".hero-actions");
  if (!actions) return;
  const link = document.createElement("a");
  link.href = "/founder";
  link.className = "btn btn-secondary";
  link.setAttribute("data-founder-full-page", "true");
  link.textContent = "Explore the founder story →";
  actions.appendChild(link);
}

function addServicesNav() {
  const nav = document.querySelector(".nav-links");
  if (!nav || nav.querySelector('[href="/services"]')) return;
  const link = document.createElement("a");
  link.href = "/services";
  link.textContent = "Services";
  const contact = nav.querySelector('[href="#contact"]');
  nav.insertBefore(link, contact || null);
}

function refreshFAQ() {
  const cards = Array.from(document.querySelectorAll<HTMLElement>(".faq-card"));
  if (!cards.length || document.querySelector("[data-faq-refresh='true']")) return;
  const nextFaq = [
    ["What does Marketech Digital actually build?", "Marketech builds AI agent bots, workflow automations, decision dashboards, CRM flows, lead-capture systems, and growth-ready operating layers for businesses that want less manual drag and more clarity."],
    ["How does pricing work?", "Starter systems have guidance ranges, while larger builds are quoted after the workflow, integrations, data needs, and backend requirements are understood. The goal is fair scope, not surprise pricing."],
    ["Can the AI bot help before I contact you?", "Yes. The bot can explain offers, suggest a likely service path, estimate starter ranges, and help a visitor describe their business problem before sending an inquiry."],
    ["Do I need a full custom system or a smaller starter system?", "If the problem is narrow, start with a bot, audit, dashboard starter, or CRM workflow. If your operations are scattered across multiple tools and teams, a larger systems stack may be the better fit."],
    ["What happens after I reach out?", "You explain your business, current bottleneck, tools, and desired outcome. From there, Marketech recommends a strategy sprint, starter system, automation build, dashboard, or larger systems roadmap."],
    ["Can this connect to a real backend later?", "Yes. Contact handling, live metrics, CMS content, analytics, customer records, AI memory, and real assistant logic can be connected to a backend when the business is ready."]
  ];
  cards.forEach((card, index) => {
    const pair = nextFaq[index] || nextFaq[nextFaq.length - 1];
    const h3 = card.querySelector("h3");
    const p = card.querySelector("p");
    if (h3) h3.textContent = pair[0];
    if (p) p.textContent = pair[1];
    if (index === 0) card.setAttribute("data-faq-refresh", "true");
  });
  const faqGrid = cards[0]?.parentElement;
  if (faqGrid && cards.length < nextFaq.length) {
    nextFaq.slice(cards.length).forEach(([q, a]) => {
      const card = document.createElement("article");
      card.className = "faq-card";
      card.innerHTML = `<h3>${q}</h3><p>${a}</p>`;
      faqGrid.appendChild(card);
    });
  }
}

export default function FutureLayer() {
  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (hero && !document.querySelector("[data-future-deck]")) {
      const deck = document.createElement("section");
      deck.className = "future-deck container";
      deck.setAttribute("data-future-deck", "true");
      deck.innerHTML = buildDeck();
      hero.insertAdjacentElement("afterend", deck);
    }

    const offerSection = document.getElementById("offers") || document.getElementById("offerGrid")?.closest("section");
    if (offerSection && !document.querySelector("[data-starter-systems]")) {
      const starter = document.createElement("section");
      starter.className = "starter-systems container";
      starter.setAttribute("data-starter-systems", "true");
      starter.innerHTML = buildStarterSystems();
      offerSection.insertAdjacentElement("beforebegin", starter);
    }

    addServicesNav();
    refreshFAQ();
    addCarouselTools("offerGrid", "Offer carousel");
    addCarouselTools("processGrid", "Process carousel");
    addCarouselTools("starterCarousel", "Starter systems carousel");
    addFounderButton();
    document.addEventListener("click", addFounderButton);

    let tick = 0;
    const timer = window.setInterval(() => {
      tick += 1;
      addFounderButton();
      addServicesNav();
      refreshFAQ();
      addCarouselTools("starterCarousel", "Starter systems carousel");
      const one = document.querySelector<HTMLElement>("[data-live-one]");
      const two = document.querySelector<HTMLElement>("[data-live-two]");
      const three = document.querySelector<HTMLElement>("[data-live-three]");
      const status = document.querySelector<HTMLElement>("[data-future-status]");
      if (one) one.textContent = String(4 + (tick % 3)).padStart(2, "0");
      if (two) two.textContent = `${87 + (tick % 9)}%`;
      if (three) three.textContent = String(12 + (tick % 5));
      if (status) status.textContent = ["Calibrating", "Mapping", "Optimizing", "Ready"][tick % 4];
    }, 1600);

    return () => {
      window.clearInterval(timer);
      document.removeEventListener("click", addFounderButton);
    };
  }, []);

  return null;
}
