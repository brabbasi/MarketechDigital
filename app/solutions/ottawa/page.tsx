import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ottawa Lead Capture, Trades Websites & AI Automation | Marketech Digital",
  description:
    "Practical, clearly scoped digital upgrades for Ottawa small businesses: lead capture repairs, trades quote funnels and internal AI workflow pilots.",
  alternates: { canonical: "/solutions/ottawa" }
};

const offers = [
  {
    slug: "lead-rescue",
    label: "Fastest first win",
    name: "Lead Capture Rescue",
    price: "CAD $490",
    priceNote: "Fixed-scope pilot price; final scope confirmed before work",
    timing: "Typical delivery target: 5 business days after access and acceptance",
    includes: [
      "Review one existing lead or quote-request path",
      "Repair or build one form with clear confirmation and safe validation",
      "Test notifications and mobile completion using agreed test data",
      "Provide a concise before/after handoff and basic measurement plan"
    ],
    excludes:
      "Does not include advertising, full website rebuilds, CRM subscriptions or guaranteed lead volume.",
    service: "Lead capture"
  },
  {
    slug: "trades-funnel",
    label: "Best for service teams",
    name: "Trades Quote Funnel",
    price: "From CAD $1,490",
    priceNote: "Final quote depends on content, hosting and integrations",
    timing: "Typical delivery target: 2–3 weeks after the brief and assets",
    includes: [
      "One responsive service-focused landing page",
      "Clear quote-request fields and consent-conscious intake",
      "Mobile-first contact path and basic local SEO foundations",
      "Owner notification testing and handoff documentation"
    ],
    excludes:
      "Does not include paid ad campaigns, lead-list purchases, guaranteed rankings or unrestricted outbound texting.",
    service: "Starter website"
  },
  {
    slug: "content-sprint",
    label: "Video & thumbnails",
    name: "Short-Form Content Sprint",
    price: "From CAD $690",
    priceNote: "Three edited vertical shorts from client-supplied, rights-cleared footage",
    timing: "Typical delivery target: 7–10 business days after approved footage",
    includes: [
      "Edit three original 15–35-second vertical clips",
      "Add captions, consistent brand titles and basic sound balancing",
      "Create three companion thumbnail/cover designs",
      "Include one consolidated revision round and a source-rights checklist"
    ],
    excludes:
      "Client supplies usable footage and rights. No promised views, followers, viral reach, automated channel uploads, licensed music costs or AI-generated cinematic claims.",
    service: "Video editing / content"
  },
  {
    slug: "internal-ai-pilot",
    label: "Low-risk operational AI",
    name: "Internal AI Workflow Pilot",
    price: "From CAD $990",
    priceNote: "Third-party subscriptions and optional support quoted separately",
    timing: "Typical delivery target: 2–4 weeks after workflow approval",
    includes: [
      "Map one repetitive internal process",
      "Create a bounded draft-only automation or review assistant",
      "Demonstrate test cases, logs, permissions and a manual fallback",
      "Train the owner and document handoff / next upgrades"
    ],
    excludes:
      "No autonomous customer outreach, payment execution, sensitive-data import or AI accuracy guarantees.",
    service: "AI automation"
  }
] as const;

function offerHref(slug: string, service: string) {
  return `/contact?service=${encodeURIComponent(service)}&offer=${encodeURIComponent(slug)}`;
}

export default function OttawaBusinessSolutionsPage() {
  return (
    <main className="mk-offers">
      <div className="mk-wrap">
        <nav className="mk-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Marketech Digital</Link><span aria-hidden="true">/</span>
          <Link href="/services">Services</Link><span aria-hidden="true">/</span>
          <span>Ottawa business solutions</span>
        </nav>

        <header className="mk-hero">
          <p className="mk-eyebrow">MARKETECH DIGITAL · OTTAWA & CANADA</p>
          <h1>Fix the next revenue leak. <span>Not your entire business at once.</span></h1>
          <p>
            Start with a bounded digital upgrade: a lead form that reliably reaches you,
            a practical service quote funnel, or one internal AI workflow that saves time.
            Every project begins with scope, cost and acceptance criteria—not claims of instant revenue.
          </p>
          <div className="mk-actions">
            <Link href={offerHref("lead-rescue", "Lead capture")} className="mk-primary">
              Discuss Lead Capture Rescue <span aria-hidden="true">→</span>
            </Link>
            <Link href="/contact" className="mk-secondary">Request a free fit check</Link>
          </div>
          <p className="mk-disclaimer">No obligation to proceed. Indicative Canadian-dollar pricing; taxes, third-party services and additional scope are discussed before commitment.</p>
        </header>

        <section aria-labelledby="mk-packages">
          <div className="mk-section-heading">
            <p className="mk-eyebrow">FOUR CLEAR STARTING POINTS</p>
            <h2 id="mk-packages">Practical services you can actually review.</h2>
            <p>Small businesses need a clear deliverable, not a vague promise of growth or “fully autonomous AI.”</p>
          </div>
          <div className="mk-grid">
            {offers.map((offer) => (
              <article className="mk-card" key={offer.slug}>
                <p className="mk-label">{offer.label}</p>
                <h3>{offer.name}</h3>
                <p className="mk-price">{offer.price}</p>
                <p className="mk-price-note">{offer.priceNote}</p>
                <p className="mk-timing">{offer.timing}</p>
                <ul>{offer.includes.map((item) => <li key={item}>{item}</li>)}</ul>
                <p className="mk-excludes">{offer.excludes}</p>
                <Link className="mk-card-button" href={offerHref(offer.slug, offer.service)}>
                  Check fit for this offer <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mk-process" aria-labelledby="mk-how">
          <div>
            <p className="mk-eyebrow">HOW IT WORKS</p>
            <h2 id="mk-how">An outcome first, then a roadmap.</h2>
            <p>We'll discuss your bottleneck, confirm what data or accounts are needed,
              agree on a short scope and acceptance test, and only then plan implementation.
              Work that requires external accounts, customer messages or ongoing provider fees
              receives separate approval.</p>
          </div>
          <ol>
            <li><strong>Free fit check</strong> — identify the single biggest current bottleneck.</li>
            <li><strong>Written scope</strong> — confirm deliverables, price, ownership and timeline.</li>
            <li><strong>Reviewable demo</strong> — demonstrate a useful result using approved inputs.</li>
            <li><strong>Verified handoff</strong> — test the new workflow together and document support.</li>
          </ol>
        </section>

        <section className="mk-bottom" aria-labelledby="mk-start">
          <p className="mk-eyebrow">NO PRESSURE, NO AUTOMATED SPAM</p>
          <h2 id="mk-start">Have a website or workflow that is costing you time?</h2>
          <p>Tell us what isn't working. We'll recommend a starting point—or tell you when a paid build isn't warranted.</p>
          <Link className="mk-primary" href="/contact">Describe your project <span aria-hidden="true">→</span></Link>
        </section>
      </div>
      <style>{`
        .mk-offers{min-height:100vh;padding:145px 20px 90px;background:radial-gradient(ellipse at 15% 4%,rgba(255,106,0,.14),transparent 38%),radial-gradient(ellipse at 85% 32%,rgba(36,143,204,.1),transparent 43%),#050911;color:#f5f8fc}
        .mk-wrap{width:min(1200px,100%);margin:0 auto}
        .mk-breadcrumb{display:flex;flex-wrap:wrap;gap:10px;align-items:center;color:#a9b8c9;font-size:.85rem}
        .mk-breadcrumb a{color:#e4eaf3;text-decoration:underline;text-underline-offset:3px}
        .mk-hero{padding:54px 0 86px;max-width:1050px}
        .mk-eyebrow{font-size:.79rem;font-weight:850;letter-spacing:.18em;color:#ffb36f}
        .mk-hero h1{font-size:clamp(2.8rem,7vw,6.2rem);line-height:1.03;letter-spacing:-.068em;margin:19px 0 26px}
        .mk-hero h1 span{color:#ff9951}
        .mk-hero>p:not(.mk-eyebrow),.mk-section-heading>p:not(.mk-eyebrow),.mk-process p,.mk-bottom p:not(.mk-eyebrow){color:#bdc9d7;max-width:790px;font-size:1.08rem;line-height:1.65}
        .mk-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}
        .mk-primary,.mk-secondary,.mk-card-button{display:inline-flex;align-items:center;justify-content:center;gap:14px;text-decoration:none;font-weight:800;border-radius:16px;padding:16px 20px}
        .mk-primary{background:#ff8a33;color:#140c07}
        .mk-secondary{color:#f9fbff;border:1px solid #596477}
        .mk-hero .mk-disclaimer{margin-top:22px;font-size:.85rem;opacity:.85}
        .mk-section-heading{margin-bottom:27px}.mk-section-heading h2,.mk-process h2,.mk-bottom h2{font-size:clamp(2rem,4vw,3.2rem);letter-spacing:-.04em;line-height:1.08;margin:12px 0}
        .mk-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
        .mk-card{display:flex;flex-direction:column;padding:27px;border:1px solid #304055;border-radius:25px;background:linear-gradient(180deg,#111d2b,#0a131e);box-shadow:0 15px 45px #0002}
        .mk-label{color:#ffad65;text-transform:uppercase;letter-spacing:.12em;font-weight:800;font-size:.75rem}
        .mk-card h3{font-size:1.65rem;line-height:1.18;margin:10px 0 2px}
        .mk-price{font-size:2rem;font-weight:900;color:#fff;margin:10px 0 0}
        .mk-price-note,.mk-timing,.mk-excludes{color:#bbcadb;font-size:.89rem;line-height:1.5}
        .mk-timing{margin:9px 0}
        .mk-card ul{padding-left:21px;line-height:1.58;color:#e4ecf4;flex:1}
        .mk-card li{margin:7px 0}
        .mk-excludes{min-height:76px}
        .mk-card-button{background:#1e3650;border:1px solid #56708b;color:#fff;margin-top:12px}
        .mk-process{display:grid;grid-template-columns:1fr 1fr;gap:36px;margin:78px 0 55px;padding:32px;border:1px solid #304055;border-radius:24px}
        .mk-process ol{padding-left:25px;line-height:1.8;color:#e3edf7}.mk-process li{margin-bottom:12px}
        .mk-bottom{padding:45px;border-radius:28px;background:linear-gradient(120deg,#122c3e,#182132);border:1px solid #416078}
        .mk-bottom .mk-primary{margin-top:15px}
        .mk-offers a:focus-visible{outline:3px solid #ffc783;outline-offset:4px}
        @media(max-width:940px){.mk-grid{grid-template-columns:1fr}.mk-card .mk-excludes{min-height:0}.mk-process{grid-template-columns:1fr}}
        @media(max-width:560px){.mk-offers{padding:170px 15px 55px}.mk-hero{padding:28px 0 55px}.mk-bottom,.mk-process{padding:23px}.mk-card{padding:22px}}
      `}</style>
    </main>
  );
}
