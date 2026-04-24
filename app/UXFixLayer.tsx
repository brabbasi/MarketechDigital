"use client";

import { useEffect } from "react";

function addCarouselTools(id: string, label: string) {
  const rail = document.getElementById(id);
  if (!rail || rail.previousElementSibling?.getAttribute("data-carousel-tools") === id) return;

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

function ensureContactModal() {
  if (document.getElementById("contactPopup")) return;
  const modal = document.createElement("div");
  modal.id = "contactPopup";
  modal.className = "contact-popup";
  modal.innerHTML = `
    <div class="contact-popup-card" role="dialog" aria-modal="true" aria-labelledby="contactPopupTitle">
      <button class="contact-popup-close" type="button" aria-label="Close contact form">×</button>
      <div class="contact-popup-label"><span></span> Start a project</div>
      <h2 id="contactPopupTitle">Tell Marketech what you want to build.</h2>
      <p>Share the business problem, system idea, or automation you want. This creates a cleaner inquiry for Basit instead of forcing you to scroll to the bottom of the page.</p>
      <form class="contact-popup-form">
        <input name="name" placeholder="Your name" />
        <input name="email" type="email" placeholder="Email address" />
        <input name="business" placeholder="Business type" />
        <select name="budget" aria-label="Budget range">
          <option value="">Budget range</option>
          <option>$500–$1,500 CAD</option>
          <option>$1,500–$4,500 CAD</option>
          <option>$4,500–$9,500 CAD</option>
          <option>$10,000+ CAD</option>
          <option>Not sure yet</option>
        </select>
        <textarea name="message" placeholder="What problem, system, or idea do you want help with?"></textarea>
        <button type="submit">Send project inquiry →</button>
      </form>
      <div class="contact-popup-status" aria-live="polite"></div>
      <a class="contact-popup-mail" href="mailto:abasitabbasi99@gmail.com">Prefer email? abasitabbasi99@gmail.com</a>
    </div>
  `;
  document.body.appendChild(modal);

  const close = () => modal.classList.remove("show");
  modal.querySelector(".contact-popup-close")?.addEventListener("click", close);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });
  modal.querySelector("form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const status = modal.querySelector<HTMLElement>(".contact-popup-status");
    const data = Object.fromEntries(new FormData(form).entries());
    if (status) status.textContent = "Sending inquiry...";
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error("Lead failed");
      if (status) status.textContent = "Inquiry captured. Basit will review it and follow up.";
      form.reset();
    } catch {
      if (status) status.textContent = "Could not submit directly. Please email abasitabbasi99@gmail.com.";
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
        href.startsWith("mailto:abasitabbasi99") ||
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
        <p>AI systems, workflow automation, decision intelligence, and growth-ready digital execution.</p>
      </div>
    </div>
    <div class="footer-columns">
      <div><span>Services</span><a href="/services">Starter systems</a><a href="#offers">Premium offers</a><a href="#process">Process</a></div>
      <div><span>Company</span><a href="/founder">Founder profile</a><a href="#faq">FAQ</a><a href="#contact">Contact</a></div>
      <div><span>Contact</span><a href="mailto:abasitabbasi99@gmail.com">abasitabbasi99@gmail.com</a><button type="button">Book a consultation</button></div>
    </div>
    <div class="footer-bottom"><span>© ${year} Marketech Digital. All rights reserved.</span><span>Built for clarity, automation, and serious growth.</span></div>
  `;
}

export default function UXFixLayer() {
  useEffect(() => {
    const run = () => {
      makeFAQCarousel();
      addCarouselTools("faqGrid", "FAQ carousel");
      ensureContactModal();
      interceptContactClicks();
      enhanceFooter();
    };
    run();
    const timer = window.setInterval(run, 1500);
    return () => window.clearInterval(timer);
  }, []);

  return null;
}
