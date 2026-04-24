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

function buildEmailBody(payload: LeadPayload) {
  const conversation = Array.isArray(payload.conversation)
    ? payload.conversation
        .slice(-10)
        .map((message) => `${message.role}: ${sanitize(message.content, 900)}`)
        .join("\n\n")
    : "No conversation summary provided.";

  return `New Marketech Digital lead

Name: ${sanitize(payload.name, 160) || "Not provided"}
Email: ${sanitize(payload.email, 240) || "Not provided"}
Phone: ${sanitize(payload.phone, 120) || "Not provided"}
Company: ${sanitize(payload.company, 240) || "Not provided"}
Business type: ${sanitize(payload.business, 240) || "Not provided"}
Service interested in: ${sanitize(payload.service, 240) || "Not provided"}
Budget: ${sanitize(payload.budget, 160) || "Not provided"}
Preferred contact method: ${sanitize(payload.preferredContact, 160) || "Not provided"}
Recommended service: ${sanitize(payload.recommendedService, 240) || "Not provided"}

Project details:
${sanitize(payload.message, 2000) || "Not provided"}

Recent AI assistant conversation:
${conversation}`;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json().catch(() => ({}))) as LeadPayload;
    const email = sanitize(payload.email, 240);
    const message = sanitize(payload.message, 2000);

    if (!email && !message) {
      return NextResponse.json({ ok: false, error: "Please provide at least an email or project message." }, { status: 400 });
    }

    const body = buildEmailBody(payload);

    if (process.env.RESEND_API_KEY) {
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
          text: body
        })
      });

      if (!resendResponse.ok) {
        console.error("Resend lead error", await resendResponse.text());
      } else {
        return NextResponse.json({ ok: true, mode: "email" });
      }
    }

    console.log("MARKETECH_LEAD", body);
    return NextResponse.json({ ok: true, mode: "logged" });
  } catch (error) {
    console.error("Lead route error", error);
    return NextResponse.json({ ok: false, error: "Lead submission failed." }, { status: 500 });
  }
}
