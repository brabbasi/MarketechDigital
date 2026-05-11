"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const cleanNav = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Systems", "/systems"],
  ["TradePilot AI", "/tradepilot"],
  ["Work", "/work"],
  ["Insights", "/insights"],
  ["About", "/about"],
  ["Founder", "/founder"],
  ["Contact", "/contact"]
];

const faqCopy = new Map<string, string>([
  ["What does Marketech Digital actually help with?", "What does Marketech Digital help with?"],
  ["Marketech Digital helps businesses with AI strategy, workflow automation, decision intelligence, and growth-ready systems that reduce friction and improve clarity.", "Marketech Digital helps businesses improve their website, capture more leads, strengthen SEO, automate follow-up, and build practical digital systems that are easier to manage."],
  ["Who is this for?", "Who is Marketech Digital for?"],
  ["This is for founders, operators, and leadership teams that need cleaner systems, less operational drag, and better visibility into what matters.", "This is for local businesses, service companies, trades, consultants, and growing brands that need a stronger online presence, better lead capture, and clearer systems."],
  ["What happens after I reach out?", "What happens after I request an audit?"],
  ["You start a conversation, explain the business problem or goal, and then the right offer or build path can be shaped around your needs.", "We review your current website, lead flow, SEO basics, and automation opportunities, then recommend the clearest next step without pressure."],
  ["Can this become a connected to a real backend live site later?", "Can my website grow into a more advanced system later?"],
  ["Can this become a backend-driven live site later?", "Can my website grow into a more advanced system later?"],
  ["Can this grow into a real connected system later?", "Can my website grow into a more advanced system later?"],
  ["Yes. The current version is structured so public metrics, contact handling, and content management can be wired into a real backend later.", "Yes. Your website can grow with lead tracking, CRM routing, dashboards, content updates, forms, booking flows, and automation when the business is ready."],
  ["Yes. The site can grow over time with better lead handling, content updates, public metrics, and backend tools when the business is ready.", "Yes. Your website can grow with lead tracking, CRM routing, dashboards, content updates, forms, booking flows, and automation when the business is ready."]
]);

function rewriteTopNav() {
  const navs = Array.from(document.querySelectorAll<HTMLElement>(".nav-links"));
  navs.forEach((nav) => {
    if (nav.getAttribute("data-v1-clean-nav") === "true") return;
    nav.setAttribute("data-v1-clean-nav", "true");
    nav.innerHTML = cleanNav.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");
  });

  const ctas = Array.from(document.querySelectorAll<HTMLAnchorElement>("a"));
  ctas.forEach((link) => {
    const text = (link.textContent || "").trim().toLowerCase();
    if (text.includes("book a consultation") || text.includes("start a conversation")) {
      link.href = "/contact";
    }
    if (text === "see the offers") link.href = "/services";
  });
}

function rewriteFAQCopy() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName.toLowerCase();
      if (["script", "style", "svg", "textarea", "input", "select", "option"].includes(tag)) return NodeFilter.FILTER_REJECT;
      return node.nodeValue?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  nodes.forEach((node) => {
    const current = node.nodeValue || "";
    const trimmed = current.trim();
    const replacement = faqCopy.get(trimmed);
    if (replacement) node.nodeValue = current.replace(trimmed, replacement);
  });
}

export default function HomeV1CleanupLayer() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== "/") return;
    const run = () => {
      rewriteTopNav();
      rewriteFAQCopy();
    };
    run();
    const timers = [250, 900, 1800].map((delay) => window.setTimeout(run, delay));
    return () => {
      timers.forEach(window.clearTimeout);
    };
  }, [pathname]);
  return null;
}
