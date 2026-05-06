import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Systems | Marketech Digital",
  description:
    "Explore Marketech Digital productized systems including TradePilot AI, lead capture engines, intake systems, dashboards, and custom automation builds.",
  alternates: { canonical: "/systems" }
};

const systems = [
  {
    name: "TradePilot AI",
    label: "Flagship system",
    href: "/tradepilot",
    copy: "Missed-lead recovery for HVAC, plumbing, roofing, and electrical companies that need faster response, qualification, follow-up, and warm lead routing.",
    cta: "View TradePilot AI"
  },
  {
    name: "Lead Capture Engine",
    label: "Available custom build",
    href: "/services#core-services",
    copy: "Website forms, CRM tracking, email/SMS alerts, and follow-up sequences for businesses that need better lead handling.",
    cta: "Improve lead capture"
  },
  {
    name: "Smart Intake System",
    label: "Available custom build",
    href: "/contact?service=AI%20automation",
    copy: "A cleaner customer intake flow that gathers useful details before your team spends time manually chasing information.",
    cta: "Discuss intake automation"
  },
  {
    name: "Growth Dashboard",
    label: "Available custom build",
    href: "/contact?service=Custom%20system",
    copy: "A reporting dashboard for leads, sources, follow-up activity, website performance, and business visibility.",
    cta: "Discuss a dashboard"
  }
];

export default function SystemsPage() {
  return (
    <main className="systems-page">
      <section className="systems-shell" aria-labelledby="systems-title">
        <div className="systems-top"><Link href="/">← Marketech Digital</Link><Link href="/services">View services</Link></div>
        <div className="systems-label">Productized systems by Marketech Digital</div>
        <h1 id="systems-title">Practical digital systems built around real business bottlenecks.</h1>
        <p>
          Systems are more focused than general services. They combine website logic, lead capture, automation, tracking, and follow-up into repeatable setups that solve a clear operational problem.
        </p>
        <div className="systems-grid">
          {systems.map((system) => (
            <article className="system-card" key={system.name}>
              <span>{system.label}</span>
              <h2>{system.name}</h2>
              <p>{system.copy}</p>
              <Link href={system.href}>{system.cta} →</Link>
            </article>
          ))}
        </div>
      </section>
      <style>{`
        .systems-page{min-height:100vh;background:radial-gradient(circle at 18% 0%,rgba(255,106,0,.14),transparent 34%),radial-gradient(circle at 82% 10%,rgba(89,175,255,.12),transparent 34%),#05070d;color:#fff;padding:120px 20px 80px}.systems-shell{width:min(1180px,100%);margin:0 auto}.systems-top{display:flex;justify-content:space-between;gap:16px;margin-bottom:34px}.systems-top a,.system-card a{color:rgba(255,255,255,.76);text-decoration:none}.systems-label{display:inline-flex;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);border-radius:999px;padding:9px 13px;color:rgba(255,255,255,.78);font-size:.82rem}.systems-page h1{font-size:clamp(2.8rem,7vw,6.2rem);line-height:.9;letter-spacing:-.075em;margin:22px 0;max-width:980px}.systems-shell>p{max-width:760px;color:rgba(255,255,255,.72);line-height:1.75;font-size:1.1rem}.systems-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-top:38px}.system-card{border:1px solid rgba(255,255,255,.12);background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.035));border-radius:30px;padding:26px;box-shadow:0 24px 80px rgba(0,0,0,.28)}.system-card span{color:#ff8a2a;font-size:.78rem;text-transform:uppercase;letter-spacing:.14em;font-weight:900}.system-card h2{font-size:clamp(1.8rem,4vw,3rem);line-height:1;letter-spacing:-.05em;margin:18px 0 12px}.system-card p{color:rgba(255,255,255,.68);line-height:1.7}.system-card a{display:inline-flex;margin-top:10px;font-weight:900;color:#fff}@media(max-width:800px){.systems-grid{grid-template-columns:1fr}.systems-page{padding-top:92px}}
      `}</style>
    </main>
  );
}
