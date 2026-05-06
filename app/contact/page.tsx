import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Marketech Digital | Free Digital Growth Audit",
  description:
    "Book a free digital growth audit for websites, SEO, lead capture, TradePilot AI, automation, or custom digital systems.",
  alternates: { canonical: "/contact" }
};

const needs = [
  "Starter website",
  "Premium website / SEO",
  "Lead capture",
  "TradePilot AI",
  "AI automation",
  "Custom system",
  "Not sure yet"
];

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-shell" aria-labelledby="contact-title">
        <Link href="/" className="back-link">← Marketech Digital</Link>
        <div className="contact-label">Free Digital Growth Audit</div>
        <h1 id="contact-title">Let&apos;s find the highest-value digital upgrade for your business.</h1>
        <p>
          Whether you need a starter website, a premium growth system, TradePilot AI, or custom automation, we&apos;ll help you choose the clearest next step.
        </p>

        <form className="contact-card" action="/api/lead" method="post">
          <div className="form-grid">
            <label>Name<input name="name" required placeholder="Your name" /></label>
            <label>Company<input name="company" placeholder="Company name" /></label>
            <label>Email<input name="email" type="email" required placeholder="you@company.com" /></label>
            <label>Phone<input name="phone" type="tel" placeholder="Phone number" /></label>
            <label>Website<input name="website" type="url" placeholder="https://yourwebsite.com" /></label>
            <label>What do you need help with?<select name="service" defaultValue=""><option value="" disabled>Select one</option>{needs.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
          </div>
          <label>Message<textarea name="message" rows={5} placeholder="Tell us what you want to improve, fix, or build." /></label>
          <button type="submit">Request a Free Digital Growth Audit</button>
          <small>No pressure. We&apos;ll review your current setup and recommend the clearest next move.</small>
        </form>
      </section>

      <style>{`
        .contact-page{min-height:100vh;background:radial-gradient(circle at 20% 0%,rgba(255,106,0,.14),transparent 34%),radial-gradient(circle at 80% 8%,rgba(89,175,255,.12),transparent 34%),#05070d;color:#fff;padding:120px 20px 80px}.contact-page .contact-shell{width:min(980px,100%);margin:0 auto}.contact-page .back-link{color:rgba(255,255,255,.72);text-decoration:none}.contact-page .contact-label{display:inline-flex;margin-top:34px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);border-radius:999px;padding:9px 13px;color:rgba(255,255,255,.78);font-size:.82rem}.contact-page h1{font-size:clamp(2.7rem,7vw,5.8rem);line-height:.9;letter-spacing:-.075em;margin:22px 0}.contact-page p{max-width:760px;color:rgba(255,255,255,.72);line-height:1.7;font-size:1.1rem}.contact-page .contact-card{margin-top:34px;border:1px solid rgba(255,255,255,.12);background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.035));border-radius:30px;padding:24px;box-shadow:0 24px 80px rgba(0,0,0,.28);display:grid;gap:18px}.contact-page .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.contact-page label{display:grid;gap:8px;color:rgba(255,255,255,.82);font-weight:700}.contact-page input,.contact-page select,.contact-page textarea{width:100%;box-sizing:border-box;border:1px solid rgba(255,255,255,.14);background:rgba(0,0,0,.22);color:#fff;border-radius:16px;padding:13px 14px;font:inherit}.contact-page textarea{resize:vertical}.contact-page button{border:0;border-radius:999px;padding:15px 20px;background:linear-gradient(135deg,#ff6a00,#ff8a2a);color:#120804;font-weight:900;cursor:pointer}.contact-page small{color:rgba(255,255,255,.56);line-height:1.6}@media(max-width:760px){.contact-page .form-grid{grid-template-columns:1fr}.contact-page{padding-top:92px}}
      `}</style>
    </main>
  );
}
