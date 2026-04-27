"use client";

import { useEffect } from "react";

const icons = {
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.554V9h3.565v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0Z" /></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7.25A4.75 4.75 0 1 1 12 16.75 4.75 4.75 0 0 1 12 7.25Zm0 2A2.75 2.75 0 1 0 12 14.75 2.75 2.75 0 0 0 12 9.25ZM17 6.5a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" /></svg>',
  facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.513c-1.49 0-1.956.931-1.956 1.887v2.266h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" /></svg>',
  email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 5.75A2.75 2.75 0 0 1 4.75 3h14.5A2.75 2.75 0 0 1 22 5.75v12.5A2.75 2.75 0 0 1 19.25 21H4.75A2.75 2.75 0 0 1 2 18.25V5.75Zm2.75-.75a.75.75 0 0 0-.75.75v.6l8 5.12 8-5.12v-.6a.75.75 0 0 0-.75-.75H4.75ZM20 8.73l-7.46 4.78a1 1 0 0 1-1.08 0L4 8.73v9.52c0 .414.336.75.75.75h14.5a.75.75 0 0 0 .75-.75V8.73Z" /></svg>'
};

const socialLinks = [
  { label: "Marketech Digital LinkedIn", href: "https://www.linkedin.com/company/marketechdigital/", icon: icons.linkedin },
  { label: "Marketech Digital Instagram", href: "https://www.instagram.com/official.marketech?igsh=NTR0YnVhemRiMnhr", icon: icons.instagram },
  { label: "Marketech Digital Facebook", href: "https://www.facebook.com/share/17ee6kJiPF/", icon: icons.facebook },
  { label: "Email Marketech Digital", href: "mailto:contact@getmarketechdigital.com", icon: icons.email }
];

function injectFooterSocials() {
  const footer = document.querySelector("footer .footer-wrap") as HTMLElement | null;
  if (!footer || footer.querySelector("[data-footer-socials='true']")) return;

  const companyColumn = Array.from(footer.querySelectorAll(".footer-columns div")).find((column) => {
    return (column.textContent || "").toLowerCase().includes("company");
  });

  if (companyColumn && !companyColumn.querySelector("a[href='/about']")) {
    const aboutLink = document.createElement("a");
    aboutLink.href = "/about";
    aboutLink.textContent = "About us";
    companyColumn.insertBefore(aboutLink, companyColumn.querySelector("a") || null);
  }

  const socialWrap = document.createElement("div");
  socialWrap.setAttribute("data-footer-socials", "true");
  socialWrap.className = "footer-socials";
  socialWrap.innerHTML = socialLinks
    .map((link) => `<a href="${link.href}" aria-label="${link.label}" ${link.href.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""}>${link.icon}</a>`)
    .join("");

  const footerBottom = footer.querySelector(".footer-bottom");
  if (footerBottom) footerBottom.insertAdjacentElement("beforebegin", socialWrap);
  else footer.appendChild(socialWrap);
}

export default function FooterSocialLayer() {
  useEffect(() => {
    injectFooterSocials();
    const timeout = window.setTimeout(injectFooterSocials, 900);
    const observer = new MutationObserver(injectFooterSocials);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  return (
    <style jsx global>{`
      .footer-socials {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin: 24px 0 10px;
        padding-top: 18px;
        border-top: 1px solid rgba(255,255,255,.08);
      }
      .footer-socials a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        border: 1px solid rgba(255,255,255,.12);
        border-radius: 999px;
        background: rgba(255,255,255,.035);
        color: rgba(255,255,255,.82);
        text-decoration: none;
        transition: color .18s ease, border-color .18s ease, background .18s ease, transform .18s ease;
      }
      .footer-socials a svg {
        width: 19px;
        height: 19px;
        fill: currentColor;
      }
      .footer-socials a:hover,
      .footer-socials a:focus-visible {
        outline: none;
        color: #fff;
        border-color: rgba(255,106,0,.45);
        background: rgba(255,106,0,.12);
        transform: translateY(-1px);
      }
      @media (prefers-reduced-motion: reduce) {
        .footer-socials a { transition: none; }
      }
    `}</style>
  );
}
