"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const money = (value: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(value);

function Slider({ label, value, min, max, step, suffix, onChange }: { label: string; value: number; min: number; max: number; step: number; suffix?: "%" | "$"; onChange: (value: number) => void }) {
  const shown = suffix === "$" ? money(value) : suffix === "%" ? `${value}%` : `${value}`;
  return (
    <label className="tp-slider">
      <span><b>{label}</b><strong>{shown}</strong></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

const steps = [
  ["01", "Lead comes in", "A customer calls, submits a form, or reaches out after hours."],
  ["02", "TradePilot responds", "The system sends an instant response and starts the qualification flow."],
  ["03", "Lead gets qualified", "The customer shares service type, location, urgency, and issue details."],
  ["04", "Team gets alerted", "Your team receives the lead details and the opportunity is tracked."]
];

const packages = [
  ["14-Day Pilot", "$500 setup", "Test the system for 14 days. If you continue, the setup is credited toward your first month."],
  ["Starter", "$799/month", "Missed-call text-back, website form response, basic qualification, owner alerts, follow-up sequence, and monthly report."],
  ["Growth", "$1,400/month", "Everything in Starter, after-hours workflow, booking link integration, lead scoring, weekly report, and workflow optimization."],
  ["Premium", "$2,500+/month", "Lead-flow audit, CRM pipeline setup, call tracking, multi-service routing, dashboard, and monthly optimization meeting."]
];

export default function TradePilotClient() {
  const [weeklyCalls, setWeeklyCalls] = useState(45);
  const [missedRate, setMissedRate] = useState(25);
  const [jobValue, setJobValue] = useState(850);
  const [bookingRate, setBookingRate] = useState(35);

  const estimate = useMemo(() => {
    const missedLeads = weeklyCalls * (missedRate / 100);
    const recoverableJobs = missedLeads * (bookingRate / 100);
    const monthlyOpportunity = recoverableJobs * jobValue * 4.33;
    return { missedLeads, recoverableJobs, monthlyOpportunity, conservative: monthlyOpportunity * 0.5 };
  }, [weeklyCalls, missedRate, jobValue, bookingRate]);

  return (
    <main className="tp-page">
      <header className="tp-local-nav" aria-label="TradePilot page navigation">
        <Link href="/">← Home</Link>
        <nav><Link href="/systems">Systems</Link><Link href="/services">Services</Link><Link href="/contact">Contact</Link></nav>
      </header>

      <section className="tp-hero" aria-labelledby="tradepilot-title">
        <div className="tp-pill">Marketech Digital flagship system for trades businesses</div>
        <h1 id="tradepilot-title">Recover missed calls before they become your competitor&apos;s jobs.</h1>
        <p>TradePilot AI helps HVAC, plumbing, roofing, and electrical companies respond instantly to missed calls, after-hours inquiries, and website leads, then qualify, track, and follow up before the customer calls someone else.</p>
        <div className="tp-actions"><a href="#calculator">Run My Missed Revenue Estimate</a><a href="#workflow">See How It Works</a></div>
      </section>

      <section className="tp-section tp-grid two" aria-labelledby="problem-title">
        <div><div className="tp-label">The missed-lead problem</div><h2 id="problem-title">Fast-response businesses win more of the right conversations.</h2><p>Trade businesses do not only lose leads because of price. They lose them when calls are missed, form submissions sit too long, or after-hours inquiries wait until morning.</p></div>
        <div className="tp-card"><ul><li>Customers often contact more than one contractor.</li><li>Missed calls turn into competitor opportunities.</li><li>Website leads go cold when response is slow.</li><li>Most businesses do not clearly track what slipped through the cracks.</li></ul><p className="tp-muted">Even a 20–30% missed or delayed response rate can create thousands in lost monthly opportunity.</p></div>
      </section>

      <section id="workflow" className="tp-section" aria-labelledby="works-title"><div className="tp-label">How it works</div><h2 id="works-title">A simple recovery flow from missed lead to warm opportunity.</h2><div className="tp-grid four">{steps.map(([num, title, copy]) => <article className="tp-card" key={title}><span className="tp-step">{num}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

      <section className="tp-section tp-grid two" aria-labelledby="demo-title"><div><div className="tp-label">Demo workflow</div><h2 id="demo-title">After-hours missed call recovery.</h2><p>TradePilot reduces manual chasing by handling the first response, collecting details, and alerting your team when the opportunity is warmer or urgent.</p></div><div className="tp-phone"><div className="msg ai">Hi, this is [Company Name]. Sorry we missed your call. What can we help with today?<br />1 — Repair<br />2 — Quote/Install<br />3 — Emergency<br />4 — Maintenance</div><div className="msg user">3 — Emergency</div><div className="msg ai">Thanks. What&apos;s the service address or nearest intersection?</div><div className="msg user">Near Hazeldean and Eagleson. Furnace stopped working.</div><div className="owner-alert"><b>New recovered lead</b><span>Service: Emergency HVAC · Urgency: High · Recommended next step: Call now.</span></div></div></section>

      <section id="calculator" className="tp-section" aria-labelledby="calculator-title">
        <div className="tp-label">Missed revenue calculator</div><h2 id="calculator-title">See what missed or delayed leads could be costing you.</h2>
        <div className="tp-calc-grid">
          <div className="tp-card"><Slider label="Weekly inbound calls" value={weeklyCalls} min={5} max={150} step={5} onChange={setWeeklyCalls} /><Slider label="Missed or delayed response rate" value={missedRate} min={5} max={70} step={5} suffix="%" onChange={setMissedRate} /><Slider label="Average job value" value={jobValue} min={150} max={5000} step={50} suffix="$" onChange={setJobValue} /><Slider label="Booking rate from recovered leads" value={bookingRate} min={5} max={80} step={5} suffix="%" onChange={setBookingRate} /></div>
          <div className="tp-card tp-result"><span>Estimated monthly opportunity</span><strong>{money(estimate.monthlyOpportunity)}</strong><div className="tp-result-grid"><div><b>{estimate.missedLeads.toFixed(1)}</b><small>missed or delayed leads per week</small></div><div><b>{estimate.recoverableJobs.toFixed(1)}</b><small>estimated recoverable jobs per week</small></div><div><b>{money(estimate.conservative)}</b><small>conservative 50% estimate</small></div></div><p className="tp-muted">This is an estimate, not a guarantee. Actual results depend on call volume, service type, response quality, and close rate.</p></div>
        </div>
      </section>

      <section className="tp-section tp-card tp-wide" aria-labelledby="routing-title"><div className="tp-label">Warm lead routing</div><h2 id="routing-title">Spend less time chasing. Spend more time with qualified opportunities.</h2><p>TradePilot AI handles the first response, qualification, reminders, and follow-up so your team is not manually chasing every missed call, form submission, or after-hours inquiry.</p><div className="tp-grid three"><div><b>Responds before the lead goes cold</b></div><div><b>Follows up when customers do not reply</b></div><div><b>Alerts your team when the lead is warm or urgent</b></div></div></section>

      <section className="tp-section" aria-label="TradePilot packages"><div className="tp-label">Pilot and packages</div><h2>Start with a pilot, then scale the system.</h2><div className="tp-grid four">{packages.map(([name, price, copy]) => <article className="tp-card package" key={name}><h3>{name}</h3><strong>{price}</strong><p>{copy}</p></article>)}</div></section>

      <section className="tp-section tp-final" aria-labelledby="pilot-title"><h2 id="pilot-title">Want to test TradePilot AI for your trades business?</h2><p>Book a free digital growth audit and ask for a TradePilot pilot/demo. We&apos;ll review your current lead flow and recommend the clearest next move.</p><div className="tp-actions"><Link href="/contact?service=TradePilot%20AI">Book a Pilot</Link><Link href="/contact?service=TradePilot%20AI">Ask for a Demo</Link></div></section>

      <style jsx>{`.tp-page{min-height:100vh;background:radial-gradient(circle at 18% 0%,rgba(255,106,0,.14),transparent 34%),radial-gradient(circle at 82% 8%,rgba(89,175,255,.12),transparent 32%),#05070d;color:#fff;padding:110px 20px 70px}.tp-local-nav,.tp-hero,.tp-section{width:min(1180px,100%);margin:0 auto}.tp-local-nav{display:flex;justify-content:space-between;gap:14px;align-items:center;margin-bottom:18px}.tp-local-nav a{color:rgba(255,255,255,.74);text-decoration:none;font-weight:800}.tp-local-nav nav{display:flex;gap:14px;flex-wrap:wrap}.tp-hero{min-height:62vh;display:flex;flex-direction:column;justify-content:center}.tp-pill,.tp-label{width:max-content;max-width:100%;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);color:rgba(255,255,255,.78);border-radius:999px;padding:9px 13px;font-size:.82rem}h1{max-width:980px;font-size:clamp(3rem,8vw,6.8rem);line-height:.9;letter-spacing:-.08em;margin:22px 0}h2{font-size:clamp(2rem,5vw,4rem);line-height:.95;letter-spacing:-.055em;margin:14px 0}h3{font-size:1.15rem;margin:10px 0}p{color:rgba(255,255,255,.72);line-height:1.7}.tp-hero p{max-width:800px;font-size:1.15rem}.tp-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:18px}.tp-actions a{border-radius:999px;padding:14px 18px;color:#fff;text-decoration:none;font-weight:800;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.07)}.tp-actions a:first-child{background:linear-gradient(135deg,#ff6a00,#ff8a2a);color:#120804}.tp-section{padding:58px 0}.tp-grid{display:grid;gap:18px}.two{grid-template-columns:1fr 1fr;align-items:center}.three{grid-template-columns:repeat(3,1fr)}.four{grid-template-columns:repeat(4,1fr)}.tp-card,.tp-phone{border:1px solid rgba(255,255,255,.12);background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.035));border-radius:28px;padding:24px;box-shadow:0 24px 80px rgba(0,0,0,.28);backdrop-filter:blur(16px)}.tp-card ul{padding-left:20px;color:rgba(255,255,255,.72);line-height:1.8}.tp-muted{font-size:.88rem;color:rgba(255,255,255,.55)}.tp-calc-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:18px;margin-top:24px}.tp-slider{display:block;margin:0 0 22px}.tp-slider span{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:10px;color:rgba(255,255,255,.8)}.tp-slider b{line-height:1.25}.tp-slider strong,.tp-result>strong,.package strong{color:#ff8a2a;white-space:nowrap}.tp-slider input{width:100%;accent-color:#ff6a00}.tp-result>strong{display:block;font-size:clamp(2.6rem,8vw,5.5rem);letter-spacing:-.07em;margin:10px 0 20px}.tp-result-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.tp-result-grid div,.tp-wide .three div{border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:14px;background:rgba(0,0,0,.18)}.tp-result-grid b{display:block}.tp-result-grid small{display:block;color:rgba(255,255,255,.56);margin-top:4px}.tp-step{color:#ff8a2a;font-weight:900}.tp-phone{display:flex;flex-direction:column;gap:12px}.msg{max-width:88%;border-radius:18px;padding:13px 15px;color:rgba(255,255,255,.86);line-height:1.5}.msg.ai{background:rgba(89,175,255,.13);border:1px solid rgba(89,175,255,.22)}.msg.user{background:rgba(255,106,0,.18);border:1px solid rgba(255,106,0,.28);align-self:flex-end}.owner-alert{border:1px solid rgba(255,255,255,.16);border-radius:20px;padding:15px;background:rgba(255,255,255,.08);display:grid;gap:6px}.tp-wide .three{margin-top:18px}.package strong{display:block;font-size:1.35rem;margin:8px 0}.tp-final{text-align:center;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.06);border-radius:34px;padding:44px}.tp-final p{max-width:720px;margin:0 auto}.tp-final .tp-actions{justify-content:center}@media(max-width:900px){.two,.three,.four,.tp-calc-grid,.tp-result-grid{grid-template-columns:1fr}.tp-page{padding:92px 18px 64px}.tp-local-nav{align-items:flex-start}.tp-local-nav nav{justify-content:flex-end}.tp-hero{min-height:auto;padding:54px 0 34px}.tp-section{padding:46px 0}.tp-card,.tp-phone{padding:22px;border-radius:26px}.tp-slider span{display:grid;grid-template-columns:1fr;gap:4px}.tp-slider strong{justify-self:start}.msg{max-width:100%}.tp-result-grid small{font-size:.9rem}}`}</style>
    </main>
  );
}
