import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work | Marketech Digital",
  description:
    "Explore example systems, demo builds, internal concepts, and available implementations from Marketech Digital.",
  alternates: { canonical: "/work" }
};

const workItems = [
  ["Example system", "Premium local business website system", "A polished multi-section website structure for service businesses that need credibility, mobile clarity, lead capture, and stronger calls to action."],
  ["Flagship system", "TradePilot AI missed-lead recovery", "A productized missed-call, website lead, and after-hours inquiry recovery system for trades businesses."],
  ["Demo build", "Booking and lead capture funnel", "A clean flow that captures service need, contact details, urgency, and source before routing the lead to the business."],
  ["Available implementation", "AI workflow dashboard", "A custom dashboard concept for tracking workflows, repeated tasks, lead movement, and operational visibility."],
  ["Available implementation", "Local SEO service page structure", "A service-page system designed around clear offers, local search intent, trust-building sections, and conversion paths."],
  ["Available implementation", "Customer intake automation", "A guided intake system that helps collect the right details before a team member spends time manually following up."]
];

export default function WorkPage() {
  return (
    <main className="work-page">
      <section className="work-shell" aria-labelledby="work-title">
        <div className="work-top"><Link href="/">← Marketech Digital</Link><Link href="/contact">Request an audit</Link></div>
        <div className="work-label">Examples, demos, and available implementations</div>
        <h1 id="work-title">Realistic systems without fake client claims.</h1>
        <p>
          This page shows the kind of work Marketech Digital can build. Items are clearly labeled as example systems, demo builds, flagship systems, or available implementations.
        </p>
        <div className="work-grid">
          {workItems.map(([label, title, copy]) => (
            <article className="work-card" key={title}>
              <span>{label}</span>
              <h2>{title}</h2>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <style>{`
        .work-page{min-height:100vh;background:radial-gradient(circle at 18% 0%,rgba(255,106,0,.14),transparent 34%),radial-gradient(circle at 82% 10%,rgba(89,175,255,.12),transparent 34%),#05070d;color:#fff;padding:120px 20px 80px}.work-shell{width:min(1180px,100%);margin:0 auto}.work-top{display:flex;justify-content:space-between;gap:16px;margin-bottom:34px}.work-top a{color:rgba(255,255,255,.76);text-decoration:none}.work-label{display:inline-flex;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);border-radius:999px;padding:9px 13px;color:rgba(255,255,255,.78);font-size:.82rem}.work-page h1{font-size:clamp(2.8rem,7vw,6.2rem);line-height:.9;letter-spacing:-.075em;margin:22px 0;max-width:980px}.work-shell>p{max-width:760px;color:rgba(255,255,255,.72);line-height:1.75;font-size:1.1rem}.work-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:38px}.work-card{border:1px solid rgba(255,255,255,.12);background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.035));border-radius:30px;padding:24px;box-shadow:0 24px 80px rgba(0,0,0,.28)}.work-card span{color:#ff8a2a;font-size:.78rem;text-transform:uppercase;letter-spacing:.14em;font-weight:900}.work-card h2{font-size:1.45rem;line-height:1.05;letter-spacing:-.035em;margin:16px 0 12px}.work-card p{color:rgba(255,255,255,.68);line-height:1.7}@media(max-width:960px){.work-grid{grid-template-columns:1fr 1fr}}@media(max-width:700px){.work-grid{grid-template-columns:1fr}.work-page{padding-top:92px}}
      `}</style>
    </main>
  );
}
