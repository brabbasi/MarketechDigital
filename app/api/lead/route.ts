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

function buildConversation(payload: LeadPayload) {
  return Array.isArray(payload.conversation)
    ? payload.conversation
        .slice(-10)
        .map((message) => `${message.role}: ${sanitize(message.content, 900)}`)
        .join("\n\n")
    : "No conversation summary provided.";
}

function buildEmailText(payload: LeadPayload) {
  const conversation = buildConversation(payload);

  return `New Marketech Digital lead

${field("Name", sanitize(payload.name, 160))}
${field("Email", sanitize(payload.email, 240))}
${field("Phone", sanitize(payload.phone, 120))}
${field("Company", sanitize(payload.company, 240))}
${field("Business type", sanitize(payload.business, 240))}
${field("Service interested in", sanitize(payload.service, 240))}
${field("Budget", sanitize(payload.budget, 160))}
${field("Preferred contact method", sanitize(payload.preferredContact, 160))}
${field("Recommended service", sanitize(payload.recommendedService, 240))}

Project details:
${sanitize(payload.message, 2000) || "Not provided"}

Recent AI assistant conversation:
${conversation}`;
}

function buildEmailHtml(payload: LeadPayload) {
  const details = [
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

  const rows = details
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 14px;border-bottom:1px solid #243044;color:#9ca3af;font-size:13px;letter-spacing:.04em;text-transform:uppercase;">${escapeHtml(label)}</td>
          <td style="padding:12px 14px;border-bottom:1px solid #243044;color:#f8fafc;font-size:15px;font-weight:700;">${escapeHtml(value || "Not provided")}</td>
        </tr>`
    )
    .join("");

  const projectDetails = escapeHtml(sanitize(payload.message, 2000) || "Not provided").replace(/\n/g, "<br />");
  const conversation = escapeHtml(buildConversation(payload)).replace(/\n/g, "<br />");

  return `
  <!doctype html>
  <html>
    <body style="margin:0;background:#05070d;padding:28px;font-family:Arial,Helvetica,sans-serif;color:#f8fafc;">
      <div style="max-width:720px;margin:0 auto;border:1px solid #263244;border-radius:24px;overflow:hidden;background:linear-gradient(180deg,#101827,#060912);box-shadow:0 24px 80px rgba(0,0,0,.35);">
        <div style="padding:26px 28px;border-bottom:1px solid #243044;background:radial-gradient(circle at 20% 0%,rgba(255,106,0,.24),transparent 36%),#0b1220;">
          <div style="color:#ff8a33;font-size:12px;font-weight:900;letter-spacing:.18em;text-transform:uppercase;">Marketech Digital</div>
          <h1 style="margin:10px 0 0;font-size:28px;line-height:1.15;color:#ffffff;">New project inquiry</h1>
          <p style="margin:10px 0 0;color:#cbd5e1;font-size:15px;line-height:1.6;">A visitor submitted the project inquiry form on the website.</p>
        </div>
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;background:#0b1220;">
          ${rows}
        </table>
        <div style="padding:24px 28px;border-top:1px solid #243044;">
          <h2 style="margin:0 0 10px;font-size:16px;color:#ffb15d;letter-spacing:.08em;text-transform:uppercase;">Project details</h2>
          <div style="padding:16px;border:1px solid #243044;border-radius:16px;background:#070b13;color:#f8fafc;font-size:15px;line-height:1.7;">${projectDetails}</div>
        </div>
        <div style="padding:0 28px 28px;">
          <h2 style="margin:0 0 10px;font-size:16px;color:#ffb15d;letter-spacing:.08em;text-transform:uppercase;">Recent AI assistant conversation</h2>
          <div style="padding:16px;border:1px solid #243044;border-radius:16px;background:#070b13;color:#cbd5e1;font-size:14px;line-height:1.7;">${conversation}</div>
        </div>
      </div>
    </body>
  </html>`;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json().catch(() => ({}))) as LeadPayload;
    const email = sanitize(payload.email, 240);
    const message = sanitize(payload.message, 2000);

    if (!email && !message) {
      return NextResponse.json({ ok: false, error: "Please provide at least an email or project message." }, { status: 400 });
    }

    const text = buildEmailText(payload);
    const html = buildEmailHtml(payload);

    if (!process.env.RESEND_API_KEY) {
      console.error("MARKETECH_LEAD_EMAIL_NOT_CONFIGURED", text);
      return NextResponse.json(
        {
          ok: false,
          mode: "email_not_configured",
          error: "Email delivery is not configured yet. Please email abasitabbasi99@gmail.com directly."
        },
        { status: 503 }
      );
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: process.env.LEAD_FROM_EMAIL || "Marketech Digital <onboarding@resend.dev>",
        to: [process.env.LEAD_TO_EMAIL || "abasitabbasi99@gmail.com"],
        reply_to: email || undefined,
        subject: `New Marketech lead${payload.name ? ` from ${sanitize(payload.name, 80)}` : ""}`,
        text,
        html
      })
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();
      console.error("Resend lead error", resendError);
      return NextResponse.json(
        { ok: false, mode: "email_failed", error: "Email delivery failed. Please email abasitabbasi99@gmail.com directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, mode: "email" });
  } catch (error) {
    console.error("Lead route error", error);
    return NextResponse.json({ ok: false, error: "Lead submission failed." }, { status: 500 });
  }
}
