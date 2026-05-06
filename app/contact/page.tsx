import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Marketech Digital | Free Digital Growth Audit",
  description:
    "Book a free digital growth audit for websites, SEO, lead capture, TradePilot AI, automation, or custom digital systems.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-shell" aria-labelledby="contact-title">
        <div className="contact-top"><Link href="/">← Home</Link><Link href="/services">Services</Link><Link href="/systems">Systems</Link></div>
        <div className="contact-label">Free Digital Growth Audit</div>
        <h1 id="contact-title">Let&apos;s find the clearest next digital upgrade for your business.</h1>
        <p>
          Whether you need a starter website, a premium growth system, TradePilot AI, or custom automation, Marketech Digital will help you choose the most useful next step.
        </p>
        <div className="contact-layout">
          <aside className="contact-note" aria-label="Audit process">
            <span>What happens next</span>
            <h2>A simple audit, not a pressure call.</h2>
            <p>We review your website, lead capture, SEO basics, follow-up flow, and automation opportunities. Then we recommend the clearest next move.</p>
            <ul><li>Website clarity</li><li>Lead capture and follow-up</li><li>SEO and local presence</li><li>TradePilot or automation fit</li></ul>
          </aside>
          <Suspense fallback={<div className="contact-card">Loading form...</div>}><ContactClient /></Suspense>
        </div>
      </section>
      <style>{`
        .contact-page{min-height:100vh;background:radial-gradient(circle at 20% 0%,rgba(255,106,0,.14),transparent 34%),radial-gradient(circle at 80% 8%,rgba(89,175,255,.12),transparent 34%),#05070d;color:#fff;padding:120px 20px 80px}.contact-shell{width:min(1180px,100%);margin:0 auto}.contact-top{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:30px}.contact-top a{color:rgba(255,255,255,.74);text-decoration:none;font-weight:800}.contact-label{display:inline-flex;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);border-radius:999px;padding:9px 13px;color:rgba(255,255,255,.78);font-size:.82rem}.contact-page h1{font-size:clamp(2.7rem,7vw,5.8rem);line-height:.9;letter-spacing:-.075em;margin:22px 0;max-width:960px}.contact-shell>p{max-width:760px;color:rgba(255,255,255,.72);line-height:1.7;font-size:1.1rem}.contact-layout{display:grid;grid-template-columns:.85fr 1.15fr;gap:20px;margin-top:34px;align-items:start}.contact-note,.contact-card{border:1px solid rgba(255,255,255,.12);background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.035));border-radius:30px;padding:24px;box-shadow:0 24px 80px rgba(0,0,0,.28)}.contact-note span{color:#ff8a2a;text-transform:uppercase;letter-spacing:.14em;font-size:.78rem;font-weight:900}.contact-note h2{font-size:clamp(1.8rem,4vw,3rem);line-height:1;letter-spacing:-.05em;margin:16px 0 12px}.contact-note p,.contact-note li{color:rgba(255,255,255,.7);line-height:1.7}.contact-note ul{margin:18px 0 0;padding-left:20px}.contact-card{display:grid;gap:18px}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.contact-card label{display:grid;gap:8px;color:rgba(255,255,255,.82);font-weight:700}.contact-card input,.contact-card select,.contact-card textarea{width:100%;box-sizing:border-box;border:1px solid rgba(255,255,255,.14);background:rgba(0,0,0,.22);color:#fff;border-radius:16px;padding:13px 14px;font:inherit}.contact-card textarea{resize:vertical}.contact-card button{border:0;border-radius:999px;padding:15px 20px;background:linear-gradient(135deg,#ff6a00,#ff8a2a);color:#120804;font-weight:900;cursor:pointer}.contact-card button:disabled{opacity:.65;cursor:wait}.contact-card small,.contact-status{color:rgba(255,255,255,.56);line-height:1.6}.contact-status{margin:0}@media(max-width:900px){.contact-layout{grid-template-columns:1fr}.contact-page{padding:92px 18px 64px}.form-grid{grid-template-columns:1fr}}
      `}</style>
    </main>
  );
}
