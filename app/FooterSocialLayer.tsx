"use client";

import { useEffect } from "react";

const socialLinks = [
  { label: "Marketech Digital LinkedIn", href: "#replace-marketech-linkedin", text: "LinkedIn" },
  { label: "Marketech Digital Instagram", href: "#replace-marketech-instagram", text: "Instagram" },
  { label: "Marketech Digital Facebook", href: "#replace-marketech-facebook", text: "Facebook" },
  { label: "Email Marketech Digital", href: "mailto:replace@marketechdigital.ai", text: "Email" }
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
    .map((link) => `<a href="${link.href}" aria-label="${link.label}">${link.text}</a>`)
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
        min-height: 40px;
        padding: 10px 14px;
        border: 1px solid rgba(255,255,255,.12);
        border-radius: 999px;
        background: rgba(255,255,255,.035);
        color: rgba(255,255,255,.82);
        text-decoration: none;
        font-size: 12px;
        font-weight: 900;
        letter-spacing: .12em;
        text-transform: uppercase;
        transition: color .18s ease, border-color .18s ease, background .18s ease, transform .18s ease;
      }
      .footer-socials a:hover,
      .footer-socials a:focus-visible {
        outline: none;
        color: #fff;
        border-color: rgba(255,106,0,.45);
        background: rgba(255,106,0,.12);
        transform: translateY(-1px);
      }
      @media (max-width: 640px) {
        .footer-socials { gap: 8px; }
        .footer-socials a { flex: 1 1 calc(50% - 8px); min-width: 130px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .footer-socials a { transition: none; }
      }
    `}</style>
  );
}
