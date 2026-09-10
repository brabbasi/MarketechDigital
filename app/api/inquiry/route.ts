import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 32_000;

type LeadPayload = {
  submissionId?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string;
  business?: string;
  service?: string;
  preferredContact?: string;
  message?: string;
  budget?: string;
  recommendedService?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  referrer?: string;
  landingPage?: string;
  firstTouchOffer?: string;
  companyUrl2?: string;
};

type EmailMessage = {
  to: string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  idempotencyKey: string;
};

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://getmarketechdigital.com").replace(/\/$/, "");
const leadToEmail = process.env.LEAD_TO_EMAIL || "project@getmarketechdigital.com";
const projectEmail = "project@getmarketechdigital.com";
const contactEmail = "contact@getmarketechdigital.com";

function clean(value: unknown, limit = 500) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidSubmissionId(value: string) {
  return /^[A-Za-z0-9][A-Za-z0-9_-]{7,127}$/.test(value);
}

function isSameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (!origin) return false;

  try {
    if (origin !== new URL(request.url).origin) return false;
  } catch {
    return false;
  }

  return !fetchSite || fetchSite === "same-origin";
}

function normalize(payload: LeadPayload) {
  return {
    submissionId: clean(payload.submissionId, 128),
    name: clean(payload.name, 160),
    email: clean(payload.email, 240),
    phone: clean(payload.phone, 120),
    company: clean(payload.company, 240),
    website: clean(payload.website, 500),
    business: clean(payload.business, 240),
    service: clean(payload.service, 240),
    preferredContact: clean(payload.preferredContact, 120),
    message: clean(payload.message, 2400),
    budget: clean(payload.budget, 160),
    recommendedService: clean(payload.recommendedService, 240),
    source: clean(payload.source, 120),
    medium: clean(payload.medium, 120),
    campaign: clean(payload.campaign, 160),
    referrer: clean(payload.referrer, 500),
    landingPage: clean(payload.landingPage, 500),
    firstTouchOffer: clean(payload.firstTouchOffer, 240),
    companyUrl2: clean(payload.companyUrl2, 240)
  };
}

function ownerText(data: ReturnType<typeof normalize>) {
  const rows = [
    ["Lead ID", data.submissionId],
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Company", data.company],
    ["Website", data.website],
    ["Business type", data.business],
    ["Service", data.service],
    ["Recommended service", data.recommendedService],
    ["First-touch offer", data.firstTouchOffer],
    ["Budget", data.budget],
    ["Preferred contact", data.preferredContact],
    ["Source", data.source],
    ["Medium", data.medium],
    ["Campaign", data.campaign],
    ["Landing page", data.landingPage],
    ["Referrer", data.referrer]
  ];

  return `New Marketech Digital inquiry\n\n${rows
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n")}\n\nProject details:\n${data.message || "Not provided"}`;
}

function ownerHtml(data: ReturnType<typeof normalize>) {
  const rows = [
    ["Lead ID", data.submissionId],
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Company", data.company],
    ["Website", data.website],
    ["Business type", data.business],
    ["Service", data.service],
    ["Recommended service", data.recommendedService],
    ["First-touch offer", data.firstTouchOffer],
    ["Budget", data.budget],
    ["Preferred contact", data.preferredContact],
    ["Source", data.source],
    ["Medium", data.medium],
    ["Campaign", data.campaign],
    ["Landing page", data.landingPage],
    ["Referrer", data.referrer]
  ];

  const details = rows
    .filter(([, value]) => value)
    .map(([label, value]) => `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 0;color:#111827;">${escapeHtml(value)}</td></tr>`)
    .join("");

  return `<!doctype html><html><body style="margin:0;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#111827;background:#ffffff;"><div style="max-width:640px;"><div style="font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#d35400;">Marketech Digital</div><h1 style="font-size:24px;margin:10px 0 18px;">New project inquiry</h1><table style="border-collapse:collapse;font-size:14px;line-height:1.5;">${details}</table><h2 style="font-size:16px;margin:24px 0 8px;">Project details</h2><p style="font-size:15px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(data.message || "Not provided")}</p></div></body></html>`;
}

async function sendResendEmail(message: EmailMessage) {
  const from = process.env.LEAD_FROM_EMAIL || `Marketech Digital <${contactEmail}>`;
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": message.idempotencyKey
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
    if (!isSameOriginRequest(request)) {
      return NextResponse.json({ ok: false, error: "This form must be submitted from the Marketech Digital website." }, { status: 403 });
    }

    const declaredLength = Number(request.headers.get("content-length") || "0");
    if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "Your request is too large. Please shorten the message and try again." }, { status: 413 });
    }

    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "Your request is too large. Please shorten the message and try again." }, { status: 413 });
    }

    let input: LeadPayload = {};
    try {
      input = JSON.parse(raw || "{}") as LeadPayload;
    } catch {
      return NextResponse.json({ ok: false, error: "Please refresh the page and try again." }, { status: 400 });
    }

    const payload = normalize(input);

    // Honeypot: legitimate UI keeps this field empty and hidden from people.
    if (payload.companyUrl2) {
      return NextResponse.json({ ok: true, submissionId: payload.submissionId });
    }

    if (!isValidSubmissionId(payload.submissionId)) {
      return NextResponse.json({ ok: false, error: "Please refresh the page and try again." }, { status: 400 });
    }

    if (!payload.email && !payload.message) {
      return NextResponse.json({ ok: false, error: "Please provide an email or a short project message." }, { status: 400 });
    }

    if (payload.email && !isValidEmail(payload.email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ ok: false, error: `Email delivery is not configured yet. Please email ${projectEmail} directly.` }, { status: 503 });
    }

    const ownerResponse = await sendResendEmail({
      to: [leadToEmail],
      replyTo: payload.email || undefined,
      subject: ["New Marketech Digital inquiry", payload.name, payload.company || payload.service].filter(Boolean).join(" - "),
      text: ownerText(payload),
      html: ownerHtml(payload),
      idempotencyKey: `lead-owner/${payload.submissionId}`
    });

    if (!ownerResponse.ok) {
      const detail = await ownerResponse.text();
      console.error("MARKETECH_INQUIRY_OWNER_SEND_FAILED", detail);
      return NextResponse.json({ ok: false, error: `Email delivery failed. Please email ${projectEmail} directly.` }, { status: 502 });
    }

    // Deliberately no automatic client receipt in v1. This prevents the public
    // endpoint from becoming a generic mail-sending surface before stronger
    // abuse controls are available. The UI confirms successful submission.
    return NextResponse.json({ ok: true, submissionId: payload.submissionId });
  } catch (error) {
    console.error("MARKETECH_INQUIRY_UNEXPECTED", error);
    return NextResponse.json({ ok: false, error: `Something went wrong. Please email ${projectEmail} directly.` }, { status: 500 });
  }
}
