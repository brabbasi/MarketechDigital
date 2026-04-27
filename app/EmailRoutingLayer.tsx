"use client";

import { useEffect } from "react";

const emailMap = {
  outreach: "hello@getmarketechdigital.com",
  founder: "basit@getmarketechdigital.com",
  contact: "contact@getmarketechdigital.com",
  project: "project@getmarketechdigital.com",
  support: "support@getmarketechdigital.com"
};

const oldPersonalEmail = "abasitabbasi99@gmail.com";

function getContextEmail(element: Element | null) {
  const text = (element?.closest("section, footer, nav, main, article, div")?.textContent || "").toLowerCase();
  const href = element instanceof HTMLAnchorElement ? element.getAttribute("href") || "" : "";
  const combined = `${text} ${href}`;

  if (/support|maintenance|bug|delivered project|existing client|handoff|repair|fix/.test(combined)) return emailMap.support;
  if (/founder|basit|profile|personal/.test(combined)) return emailMap.founder;
  if (/start a project|project inquiry|book a consultation|tell us what you want|audit|growth audit|quote|lead|inquiry|estimate/.test(combined)) return emailMap.project;
  return emailMap.contact;
}

function rewriteEmailLinks() {
  document.querySelectorAll<HTMLAnchorElement>(`a[href*="${oldPersonalEmail}"], a[href^="mailto:"]`).forEach((anchor) => {
    const currentHref = anchor.getAttribute("href") || "";
    const targetEmail = currentHref.includes(oldPersonalEmail) ? getContextEmail(anchor) : null;
    if (!targetEmail) return;

    const [base, query = ""] = currentHref.split("?");
    const nextHref = `mailto:${targetEmail}${query ? `?${query}` : ""}`;
    anchor.setAttribute("href", nextHref);

    const text = anchor.textContent || "";
    if (text.includes(oldPersonalEmail)) anchor.textContent = text.replaceAll(oldPersonalEmail, targetEmail);
    if (anchor.getAttribute("aria-label")?.includes(oldPersonalEmail)) {
      anchor.setAttribute("aria-label", anchor.getAttribute("aria-label")!.replaceAll(oldPersonalEmail, targetEmail));
    }
  });

  document.querySelectorAll<HTMLElement>("[data-destination-email]").forEach((element) => {
    element.setAttribute("data-destination-email", emailMap.project);
  });
}

function rewriteVisibleEmailText(root: ParentNode = document) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || !node.nodeValue?.includes(oldPersonalEmail)) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName.toLowerCase();
      if (["script", "style", "svg", "path"].includes(tag)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  nodes.forEach((node) => {
    node.nodeValue = (node.nodeValue || "").replaceAll(oldPersonalEmail, getContextEmail(node.parentElement));
  });
}

function applyEmailRouting() {
  rewriteEmailLinks();
  rewriteVisibleEmailText();
}

export default function EmailRoutingLayer() {
  useEffect(() => {
    applyEmailRouting();
    const timers = [300, 900, 1800].map((delay) => window.setTimeout(applyEmailRouting, delay));
    const observer = new MutationObserver(() => applyEmailRouting());
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      timers.forEach(window.clearTimeout);
      observer.disconnect();
    };
  }, []);

  return null;
}
