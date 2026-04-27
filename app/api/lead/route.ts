import { NextResponse } from "next/server";

export const runtime = "nodejs";

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  business?: string;
  service?: string;
  preferredContact?: string;
  message?: string;
  budget?: string;
  recommendedService?: string;
  conversation?: { role: string; content: string }[];
};

type EmailMessage = {
  to: string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://getmarketechdigital.com").replace(/\/$/, "");
const logoUrl = `${siteUrl}/logo.svg`;
const defaultLeadToEmail = "abasitabbasi99@gmail.com";

function sanitize(value: unknown, limit = 1200) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function field(label: string, value: string) {
  return `${label}: ${value || "Not provided"}`;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildConversation(payload: LeadPayload) {
  return Array.isArray(payload.conversation)
    ? payload.conversation
        .slice(-10)
        .map((message) => `${message.role}: ${sanitize(message.content, 900)}`)
        .join("\n\n")
    : "No conversation summary provided.";
}

function getLeadDetails(payload: LeadPayload) {
  return [
    ["Name", sanitize(payload.name, 160)],
    ["Email", sanitize(payload.email, 240)],
    ["Phone", sanitize(payload.phone, 120)],
    ["Company", sanitize(payload.company, 240)],
    ["Business type", sanitize(payload.business, 240)],
    ["Service interested in", sanitize(payload.service, 240)],
    ["Budget", sanitize(payload.budget, 160)],
    ["Preferred contact method", sanitize(payload.preferredContact, 160)],
    ["Recommended service", sanitize(payload.recommendedService, 240)]
  ];
}

function buildOwnerEmailText(payload: LeadPayload) {
  const conversation = buildConversation(payload);

  return `New Marketech Digital project inquiry

${getLeadDetails(payload).map(([label, value]) => field(label, value)).join("\n")}

Project details:
${sanitize(payload.message, 2000) || "Not provided"}

Recent AI assistant conversation:
${conversation}

Reply directly to this email to contact the lead if they provided an email address.`;
}

function detailCard(label: string, value: string) {
  return `
    <div style="margin:0 0 10px;padding:14px 14px 13px;border:1px solid #263244;border-radius:14px;background:#0b1220;box-sizing:border-box;">
      <div style="margin:0 0 6px;color:#94a3b8;font-size:11px;line-height:1.35;font-weight:800;letter-spacing:.12em;text-transform:uppercase;">${escapeHtml(label)}</div>
      <div style="color:#f8fafc;font-size:15px;line-height:1.55;font-weight:700;word-break:break-word;overflow-wrap:anywhere;">${escapeHtml(value || "Not provided")}</div>
    </div>`;
}

function buildEmailShell(content: string, preview = "Marketech Digital email") {
  return `
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <title>${escapeHtml(preview)}</title>
    </head>
    <body style="margin:0;padding:0;background:#05070d;font-family:Arial,Helvetica,sans-serif;color:#f8fafc;-webkit-text-size-adjust:100%;text-size-adjust:100%;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preview)}</div>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;border-collapse:collapse;background:#05070d;">
        <tr>
          <td align="center" style="padding:14px 10px;">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;max-width:600px;border-collapse:separate;border-spacing:0;background:#07101d;border:1px solid #263244;border-radius:22px;overflow:hidden;box-shadow:0 22px 70px rgba(0,0,0,.35);">
              <tr>
                <td style="padding:0;">
                  ${content}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

function buildOwnerEmailHtml(payload: LeadPayload) {
  const projectDetails = escapeHtml(sanitize(payload.message, 2000) || "Not provided").replace(/\n/g, "<br />");
  const conversation = escapeHtml(buildConversation(payload)).replace(/\n/g, "<br />");
  const detailCards = getLeadDetails(payload).map(([label, value]) => detailCard(label, value)).join("");

  return buildEmailShell(
    `
    <div style="padding:24px 20px 20px;background:radial-gradient(circle at 16% 0%,rgba(255,106,0,.26),transparent 34%),linear-gradient(180deg,#101827,#07101d);border-bottom:1px solid #263244;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="vertical-align:middle;width:54px;padding:0 12px 0 0;">
            <img src="${logoUrl}" width="48" height="48" alt="Marketech Digital" style="display:block;width:48px;height:48px;border-radius:14px;background:#ffffff;object-fit:contain;" />
          </td>
          <td style="vertical-align:middle;padding:0;">
            <div style="color:#ff8a33;font-size:11px;line-height:1.35;font-weight:900;letter-spacing:.18em;text-transform:uppercase;">Marketech Digital</div>
            <div style="margin-top:3px;color:#cbd5e1;font-size:13px;line-height:1.5;">Website inquiry notification</div>
          </td>
        </tr>
      </table>
      <h1 style="margin:22px 0 0;color:#ffffff;font-size:30px;line-height:1.08;font-weight:900;letter-spacing:-.04em;">New project inquiry</h1>
      <p style="margin:12px 0 0;color:#cbd5e1;font-size:15px;line-height:1.65;">A visitor submitted the project inquiry form on the Marketech Digital website.</p>
    </div>

    <div style="padding:18px 14px 4px;background:#07101d;">
      ${detailCards}
    </div>

    <div style="padding:8px 14px 4px;background:#07101d;">
      <h2 style="margin:0 0 10px;color:#ffb15d;font-size:14px;line-height:1.35;font-weight:900;letter-spacing:.12em;text-transform:uppercase;">Project details</h2>
      <div style="padding:15px;border:1px solid #263244;border-radius:16px;background:#050912;color:#f8fafc;font-size:15px;line-height:1.7;word-break:break-word;overflow-wrap:anywhere;">${projectDetails}</div>
    </div>

    <div style="padding:18px 14px 22px;background:#07101d;">
      <h2 style="margin:0 0 10px;color:#ffb15d;font-size:14px;line-height:1.35;font-weight:900;letter-spacing:.12em;text-transform:uppercase;">Recent AI assistant conversation</h2>
      <div style="padding:15px;border:1px solid #263244;border-radius:16px;background:#050912;color:#cbd5e1;font-size:14px;line-height:1.7;word-break:break-word;overflow-wrap:anywhere;">${conversation}</div>
    </div>

    <div style="padding:18px 20px;background:#050912;border-top:1px solid #263244;color:#94a3b8;font-size:13px;line-height:1.65;">
      <strong style="display:block;color:#f8fafc;font-size:14px;">Reply action</strong>
      If the visitor provided an email address, you can reply directly to this email.
    </div>`,
    "New Marketech Digital project inquiry"
  );
}

function buildClientEmailText(payload: LeadPayload) {
  const name = sanitize(payload.name, 80) || "there";
  return `Hi ${name},

Thank you for reaching out to Marketech Digital.

Your project inquiry has been received. I will review your message and contact you as soon as possible.

Summary received:
${field("Business type", sanitize(payload.business, 240))}
${field("Service interested in", sanitize(payload.service, 240))}
${field("Budget", sanitize(payload.budget, 160))}
${field("Preferred contact method", sanitize(payload.preferredContact, 160))}

Kind regards,
Basit Abbasi
Founder, Marketech Digital
Email: abasitabbasi99@gmail.com
Website: ${siteUrl}`;
}

function buildClientEmailHtml(payload: LeadPayload) {
  const name = escapeHtml(sanitize(payload.name, 80) || "there");
  const summaryCards = [
    ["Business type", sanitize(payload.business, 240)],
    ["Service interested in", sanitize(payload.service, 240)],
    ["Budget", sanitize(payload.budget, 160)],
    ["Preferred contact method", sanitize(payload.preferredContact, 160)]
  ].map(([label, value]) => detailCard(label, value)).join("");

  return buildEmailShell(
    `
    <div style="padding:24px 20px 20px;background:radial-gradient(circle at 16% 0%,rgba(255,106,0,.26),transparent 34%),linear-gradient(180deg,#101827,#07101d);border-bottom:1px solid #263244;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="vertical-align:middle;width:54px;padding:0 12px 0 0;">
            <img src="${logoUrl}" width="48" height="48" alt="Marketech Digital" style="display:block;width:48px;height:48px;border-radius:14px;background:#ffffff;object-fit:contain;" />
          </td>
          <td style="vertical-align:middle;padding:0;">
            <div style="color:#ff8a33;font-size:11px;line-height:1.35;font-weight:900;letter-spacing:.18em;text-transform:uppercase;">Marketech Digital</div>
            <div style="margin-top:3px;color:#cbd5e1;font-size:13px;line-height:1.5;">Websites · AI automation · SEO · digital systems</div>
          </td>
        </tr>
      </table>
      <h1 style="margin:22px 0 0;color:#ffffff;font-size:30px;line-height:1.08;font-weight:900;letter-spacing:-.04em;">Thank you for reaching out.</h1>
      <p style="margin:12px 0 0;color:#cbd5e1;font-size:15px;line-height:1.65;">Hi ${name}, your project inquiry has been received. I will review your message and contact you as soon as possible.</p>
    </div>

    <div style="padding:20px 14px 8px;background:#07101d;">
      <h2 style="margin:0 6px 12px;color:#ffb15d;font-size:14px;line-height:1.35;font-weight:900;letter-spacing:.12em;text-transform:uppercase;">Your inquiry summary</h2>
      ${summaryCards}
    </div>

    <div style="padding:10px 20px 24px;background:#07101d;color:#cbd5e1;font-size:15px;line-height:1.72;">
      <p style="margin:0 0 14px;">If anything urgent changes, you can reply directly to this email with more details.</p>
      <p style="margin:0;color:#f8fafc;font-weight:700;">Kind regards,</p>
      <p style="margin:4px 0 0;color:#f8fafc;font-weight:900;">Basit Abbasi</p>
      <p style="margin:3px 0 0;color:#94a3b8;">Founder, Marketech Digital</p>
    </div>

    <div style="padding:18px 20px;background:#050912;border-top:1px solid #263244;color:#94a3b8;font-size:13px;line-height:1.7;">
      <strong style="display:block;color:#f8fafc;font-size:14px;margin-bottom:4px;">Contact</strong>
      Email: <a href="mailto:abasitabbasi99@gmail.com" style="color:#ffb15d;text-decoration:none;word-break:break-word;">abasitabbasi99@gmail.com</a><br />
      Website: <a href="${siteUrl}" style="color:#ffb15d;text-decoration:none;word-break:break-word;">${siteUrl.replace("https://", "")}</a>
    </div>`,
    "Thank you for reaching out to Marketech Digital"
  );
}

async function sendResendEmail(message: EmailMessage) {
  const from = process.env.LEAD_FROM_EMAIL || "Marketech Digital <hello@getmarketechdigital.com>";

  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: message.to,
      reply_to: message.replyTo || undefined,
      subject: message.subject,
      text: message.text,
      html: message.html
    })
  });
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json().catch(() => ({}))) as LeadPayload;
    const email = sanitize(payload.email, 240);
    const message = sanitize(payload.message, 2000);
    const leadToEmail = process.env.LEAD_TO_EMAIL || defaultLeadToEmail;

    if (!email && !message) {
      return NextResponse.json({ ok: false, error: "Please provide at least an email or project message." }, { status: 400 });
    }

    const ownerText = buildOwnerEmailText(payload);
    const ownerHtml = buildOwnerEmailHtml(payload);

    if (!process.env.RESEND_API_KEY) {
      console.error("MARKETECH_LEAD_EMAIL_NOT_CONFIGURED", ownerText);
      return NextResponse.json(
        {
          ok: false,
          mode: "email_not_configured",
          error: "Email delivery is not configured yet. Please email abasitabbasi99@gmail.com directly."
        },
        { status: 503 }
      );
    }

    const ownerSubjectParts = [
      "New Marketech Digital inquiry",
      sanitize(payload.name, 80),
      sanitize(payload.business, 80) || sanitize(payload.service, 80)
    ].filter(Boolean);

    const ownerResponse = await sendResendEmail({
      to: [leadToEmail],
      replyTo: isValidEmail(email) ? email : undefined,
      subject: ownerSubjectParts.join(" — "),
      text: ownerText,
      html: ownerHtml
    });

    if (!ownerResponse.ok) {
      const resendError = await ownerResponse.text();
      console.error("Resend lead owner email error", resendError);
      return NextResponse.json(
        { ok: false, mode: "email_failed", error: "Email delivery failed. Please email abasitabbasi99@gmail.com directly." },
        { status: 502 }
      );
    }

    let clientReceipt = "skipped_no_valid_email";
    if (isValidEmail(email)) {
      const clientResponse = await sendResendEmail({
        to: [email],
        replyTo: leadToEmail,
        subject: "Thank you for reaching out to Marketech Digital",
        text: buildClientEmailText(payload),
        html: buildClientEmailHtml(payload)
      });

      if (clientResponse.ok) {
        clientReceipt = "sent";
      } else {
        clientReceipt = "failed";
        console.error("Resend client confirmation error", await clientResponse.text());
      }
    }

    return NextResponse.json({ ok: true, mode: "email", clientReceipt });
  } catch (error) {
    console.error("Lead route error", error);
    return NextResponse.json({ ok: false, error: "Lead submission failed." }, { status: 500 });
  }
}
