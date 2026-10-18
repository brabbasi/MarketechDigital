import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How Marketech Digital handles website inquiries and visitor information.",
  alternates: { canonical: "/privacy" }
};

// Proposed customer-facing notice: must be approved against actual operational
// retention/deletion, analytics and vendor configurations before production.
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
          processing outside your province or country. A project may require additional
          tools, which we would discuss separately before requesting more data.</p>

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
        <p>Inquiries and related email records are kept only for the time reasonably
          needed to handle the inquiry, maintain relevant business records and meet
          applicable legal obligations. Specific retention and deletion schedules
          must be confirmed by Marketech Digital before the new form is launched.
          You can ask what information we hold about your inquiry, request correction
          or deletion where applicable, or withdraw permission for further contact.
          Some records may need to be retained for legitimate legal or contractual reasons.</p>

        <h2>Questions or requests</h2>
        <p>Email <a href="mailto:contact@getmarketechdigital.com" style={{ color: "#ffb777" }}>
          contact@getmarketechdigital.com</a> with the subject “Privacy request”.
          We may ask for sufficient verification before changing or releasing private
          inquiry records.</p>
        <p style={{ borderTop: "1px solid #394451", paddingTop: 20 }}>
          <Link href="/contact" style={{ color: "#ffb777" }}>Back to contact</Link>
          {" · "} <Link href="/" style={{ color: "#ffb777" }}>Home</Link>
        </p>
        <p style={{ color: "#9babbd", fontSize: ".84rem" }}>
          Notice prepared for the next Marketech Digital inquiry release.
          Last draft update: October 18, 2026.
        </p>
      </article>
    </main>
  );
}
