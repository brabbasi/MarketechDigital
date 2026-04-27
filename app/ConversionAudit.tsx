"use client";

import { FormEvent, useState } from "react";

const projectEmail = "project@getmarketechdigital.com";

const auditReviewItems = [
  "Website design and first impression",
  "Mobile experience",
  "SEO basics",
  "Google Business/Profile visibility",
  "Lead capture and contact flow",
  "Missed opportunities for automation",
  "Trust signals, offers, and calls-to-action"
];

const starterItems = [
  "Website/landing page review",
  "Google Business Profile improvement suggestions",
  "Basic SEO cleanup",
  "Contact form or booking flow setup",
  "Lead capture improvements",
  "One simple AI or workflow automation",
  "Clear action report"
];

const clientTypes = [
  "Local service businesses",
  "Contractors",
  "Salons and barbershops",
  "Clinics",
  "Restaurants",
  "Car detailers",
  "Cleaning companies",
  "Consultants",
  "Real estate and mortgage professionals",
  "Small business owners who rely on calls, bookings, or quote requests"
];

const helpOptions = [
  "More leads",
  "Better website",
  "SEO",
  "AI automation",
  "Branding",
  "Not sure yet"
];

export default function ConversionAudit() {
  const [submitted, setSubmitted] = useState(false);

  const scrollToForm = () => {
    document.getElementById("audit-contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const businessName = String(data.get("businessName") || "").trim();
    const websiteUrl = String(data.get("websiteUrl") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const helpWith = String(data.get("helpWith") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = `Free Digital Growth Audit Request${businessName ? ` - ${businessName}` : ""}`;
    const body = [
      "New Free Digital Growth Audit request from the Marketech Digital website.",
      "",
      `Name: ${name}`,
      `Business Name: ${businessName}`,
      `Website URL: ${websiteUrl}`,
      `Email: ${email}`,
      `Phone Number: ${phone}`,
      `Needs Help With: ${helpWith}`,
      "",
      "What they want to improve:",
      message || "Not provided"
    ].join("\n");

    window.location.href = `mailto:${projectEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <section id="growth-audit" className="conversion-section" aria-labelledby="growth-audit-title">
      <div className="container conversion-shell">
        <div className="conversion-intro conversion-reveal">
          <div className="label">
            <span className="dot" />
            Client Acquisition Offer
          </div>
          <h2 id="growth-audit-title">Free Digital Growth Audit for Local Businesses</h2>
          <p className="conversion-lead">
            Most business websites do not have a traffic problem. They have a clarity, trust, and conversion problem.
          </p>
          <p>
            Marketech Digital helps local businesses turn their website into a cleaner, sharper, lead-generating system using premium design, SEO structure, and simple AI automation. This is built for Ottawa and Canada small businesses that want more qualified calls, quote requests, bookings, and follow-up without committing to a full rebuild first.
          </p>
          <div className="conversion-actions">
            <button className="btn btn-primary conversion-cta" type="button" onClick={scrollToForm}>
              Get My Free Audit
            </button>
            <a className="btn btn-secondary" href="#growth-starter">
              View Starter Package
            </a>
          </div>
          <p className="conversion-limited">
            We are currently accepting a limited number of audit requests while building our first client case studies.
          </p>
        </div>

        <div className="audit-grid conversion-reveal">
          <article className="audit-card audit-card-large">
            <div className="audit-card-kicker">What the free audit reviews</div>
            <h3>A practical look at where your website is leaking trust, leads, or visibility.</h3>
            <div className="audit-check-grid">
              {auditReviewItems.map((item) => (
                <div className="audit-check" key={item}>
                  <span>✓</span>
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="audit-card audit-signal-card">
            <div className="audit-orbit" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="audit-card-kicker">Outcome</div>
            <h3>Clearer next steps before spending money on random marketing.</h3>
            <p>
              The audit gives business owners a focused view of what to improve first across website design, local business SEO, digital marketing automation, and lead generation website structure.
            </p>
          </article>
        </div>

        <div id="growth-starter" className="starter-panel conversion-reveal">
          <div className="starter-copy">
            <div className="label">
              <span className="dot" />
              Paid Next Step
            </div>
            <h2>Marketech Digital Growth Starter</h2>
            <p>
              A simple starter project for businesses that want fast improvements without a full rebuild. It gives you a cleaner conversion path, stronger trust signals, better local visibility, and one practical automation or workflow improvement that supports lead follow-up.
            </p>
            <p className="starter-price">
              Starter projects typically begin from <strong>$497–$997</strong> depending on the business needs.
            </p>
          </div>
          <div className="starter-list">
            {starterItems.map((item) => (
              <div className="starter-item" key={item}>
                <span>✦</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="ideal-client-block conversion-reveal">
          <div className="section-head compact-head">
            <div>
              <div className="label">
                <span className="dot" />
                Who This Is For
              </div>
              <h2>Built for businesses that rely on calls, bookings, and quote requests.</h2>
            </div>
            <p>
              Ideal for owners who need a sharper online presence, better local SEO, stronger lead capture, and practical AI automation without a complicated agency process.
            </p>
          </div>
          <div className="client-chip-grid">
            {clientTypes.map((type) => (
              <span className="client-chip" key={type}>{type}</span>
            ))}
          </div>
        </div>

        <div id="audit-contact" className="audit-contact-grid conversion-reveal">
          <div className="audit-form-copy">
            <div className="label">
              <span className="dot" />
              Request Your Audit
            </div>
            <h2>Tell us where your business is now. We’ll look for the fastest digital growth opportunities.</h2>
            <p>
              Use this form to request a free digital growth audit. Marketech Digital will review the business, website, local visibility, lead capture path, and automation opportunities so you can see what should be improved first.
            </p>
            <div className="form-flow-card">
              <strong>After the audit</strong>
              <span>If there is a clear fit, the Growth Starter package gives you an accessible first step into a premium AI automation agency and small business website design partner.</span>
            </div>
          </div>

          <form
            className="audit-form"
            onSubmit={handleSubmit}
            data-destination-email={projectEmail}
            data-integration-ready="Formspree, Resend, EmailJS, Supabase, Next.js API route"
          >
            <div className="form-grid audit-form-grid">
              <label>
                <span>Name</span>
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label>
                <span>Business Name</span>
                <input name="businessName" type="text" autoComplete="organization" required />
              </label>
              <label>
                <span>Website URL</span>
                <input name="websiteUrl" type="url" placeholder="https://example.com" inputMode="url" />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>
                <span>Phone Number</span>
                <input name="phone" type="tel" autoComplete="tel" required />
              </label>
              <label>
                <span>What do you need help with?</span>
                <select name="helpWith" required defaultValue="">
                  <option value="" disabled>Select one</option>
                  {helpOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="audit-message-field">
                <span>Tell us briefly what you want to improve.</span>
                <textarea name="message" rows={5} required />
              </label>
            </div>
            <button className="btn btn-primary conversion-cta audit-submit" type="submit">
              Get My Free Audit
            </button>
            {submitted && (
              <p className="audit-submit-note" role="status">
                Your email app should open with the audit request ready to send to {projectEmail}.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
