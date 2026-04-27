import type { Metadata } from "next";
import ConversionAudit from "../ConversionAudit";
import { absoluteUrl, siteName } from "../seo";

export const metadata: Metadata = {
  title: "Free Digital Growth Audit for Local Businesses",
  description:
    "Request a free digital growth audit from Marketech Digital. Built for Ottawa and Canada small businesses that want better website clarity, local SEO, lead capture, and simple AI automation.",
  alternates: {
    canonical: "/audit"
  },
  openGraph: {
    title: `Free Digital Growth Audit | ${siteName}`,
    description:
      "A low-pressure audit for local businesses that want a sharper online presence, better lead capture, local SEO improvements, and practical AI automation opportunities.",
    url: absoluteUrl("/audit"),
    type: "website"
  }
};

export default function AuditPage() {
  return (
    <main className="audit-page-shell">
      <header className="audit-page-header">
        <div className="container audit-page-nav">
          <a className="audit-page-brand" href="/" aria-label="Marketech Digital home">
            Marketech Digital
          </a>
          <nav aria-label="Audit page navigation">
            <a href="/">Home</a>
            <a href="/services">Services</a>
            <a href="/#contact">Contact</a>
          </nav>
        </div>
      </header>
      <ConversionAudit />
    </main>
  );
}
