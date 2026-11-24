import type { Metadata } from "next";
import Link from "next/link";
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

// Recovery mode is a server-owned flag; never leave a client-only fallback.
// Enforce it at render time as well as when building the recovery artifact.
export const dynamic = "force-dynamic";

export default function AuditPage() {
  const recoveryMode = process.env.MARKETECH_RECOVERY_MODE === "true";
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
      {recoveryMode ? (
        <section className="conversion-section" role="status" aria-labelledby="audit-recovery-title">
          <div className="container conversion-shell">
            <div className="label">Website recovery mode</div>
            <h1 id="audit-recovery-title">Online audit requests temporarily unavailable</h1>
            <p>
              Our public information remains available, but the online growth audit
              request form is paused during website recovery. This page does not
              accept or transmit audit details while recovery mode is active.
            </p>
            <p>
              Visit the <Link href="/contact">contact page</Link> for the existing
              direct-email option. Email is a separate communication channel
              governed by our privacy and retention procedures.
            </p>
            <p><Link href="/privacy">Read our website privacy notice</Link></p>
          </div>
        </section>
      ) : (
        <ConversionAudit />
      )}
    </main>
  );
}
