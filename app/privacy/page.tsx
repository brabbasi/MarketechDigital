import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How Marketech Digital handles website inquiries and visitor information.",
  alternates: { canonical: "/privacy" }
};

// Founder approved the 180-day unconverted-inquiry policy for draft preparation
// on November 5, 2026; NOT approval to publish or represent deletion as operational.
// Verify retention/deletion across inbox, providers and backups before production.
export default function PrivacyPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "170px 24px 85px", background: "#050911", color: "#f4f7fc" }}>
      <article style={{ margin: "0 auto", maxWidth: 850, lineHeight: 1.75 }}>
        <p style={{ color: "#ffb777", fontWeight: 800 }}>MARKETECH DIGITAL · CANADA</p>
        <h1 style={{ fontSize: "clamp(2.3rem, 6vw, 4.2rem)", lineHeight: 1.1, margin: "15px 0 24px" }}>
          Website privacy notice
        </h1>
        <p>Marketech Digital uses information you choose to provide to understand and respond to
          your inquiry. This notice covers our public website and initial contact requests;
          project-specific data processing may require a separate agreement.</p>

        <h2>What we collect</h2>
        <p>When you submit a contact request, you may provide your name, company, email,
          phone number, website, service interest and project details. We also receive
          limited inquiry metadata, such as the page and public offer you selected, to
          understand which service you are asking about. Please do not include passwords,
          banking information, sensitive personal records, or other confidential information
          in a first-contact form.</p>

        <h2>Why we use it</h2>
        <p>We use contact details and your project description to review your request,
          reply to you, clarify the scope, discuss potential services, protect the
          form against misuse and keep appropriate business records. Agreeing to
          an inquiry response is not consent to unrelated promotional email campaigns.
          We do not automatically send a marketing mailing to the address you submit.</p>

        <h2>Who processes it</h2>
        <p>Our website uses Vercel hosting. When you submit an inquiry, the form sends
          the information through a server-side route and Resend email-delivery service
          to the Marketech Digital business inbox. These service providers may process
          information under their own security and service arrangements, including
          processing outside your province or country. Any new project-specific
          service that needs additional information will be discussed before use.</p>

        <h2>Optional AI assistant and Idea Helper</h2>
        <p>These tools receive the messages or business details you type through our
          website server. Unless you explicitly choose optional OpenAI processing,
          the assistant and Idea Helper return a guided suggestion without forwarding
          those inputs to OpenAI. If you opt in, the assistant may send up to the last
          12 chat messages, including earlier messages, to OpenAI for a response.
          The Idea Helper may send your business type, goal, current obstacles and
          existing tools to OpenAI to generate a tailored recommendation.
          OpenAI is a third-party service provider and information may be processed
          outside Canada according to its applicable privacy and retention terms.
          Do not enter passwords, personal health details or other confidential records.
          Using either tool does not submit a sales inquiry; only the separate
          contact form can do that with its own permission.</p>

        <h2>Analytics and browsing</h2>
        <p>Google Analytics is optional. It is not loaded for new visitors unless
          they actively choose <strong>Allow analytics</strong> in the privacy
          preferences. If enabled, it can collect general page visits and technical
          data, including browser information and cookie or similar identifiers.
          You can change your selection using the <strong>Analytics choices</strong>
          control at the bottom of the site. Declining does not prevent you from
          using the contact form or viewing service information. Your preference
          is saved in this browser so the site can respect your choice.
          Analytics permission is not permission to send marketing emails.</p>

        <h2>Retention and choices</h2>
        <p>For inquiries that do not become client projects, our intended retention limit is
          180 days after the last meaningful exchange about your inquiry. We then plan
          to delete or de-identify the inquiry and related correspondence, unless an
          active request, legal obligation or documented dispute requires longer
          retention. Records connected to active client projects may follow different
          contractual and legal retention requirements. You may request access,
          correction or deletion where applicable, or withdraw permission for further
          contact. This draft policy is not active until its operational deletion
          process has been verified before launch.</p>

        <h2>Questions or requests</h2>
        <p>Email <a href="mailto:hello@getmarketechdigital.com" style={{ color: "#ffb777" }}>
          hello@getmarketechdigital.com</a> with the subject “Privacy request”.
          We may ask for sufficient verification before changing or releasing private
          inquiry records.</p>
        <p style={{ borderTop: "1px solid #394451", paddingTop: 20 }}>
          <Link href="/contact" style={{ color: "#ffb777" }}>Back to contact</Link>
          {" · "} <Link href="/" style={{ color: "#ffb777" }}>Home</Link>
        </p>
        <p style={{ color: "#9babbd", fontSize: ".84rem" }}>
          Notice prepared for the next Marketech Digital inquiry release.
          Last draft update: November 5, 2026.
        </p>
      </article>
    </main>
  );
}
