/** Pure first-party inquiry validation. No network, email, logging or storage. */
export const MAX_LEAD_REQUEST_BYTES = 8192;

export type VerifiedFormFields = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  business?: string;
  website?: string;
  service?: string;
  preferredContact?: string;
  message?: string;
  budget?: string;
  recommendedService?: string;
  conversation?: { role: "user" | "assistant"; content: string }[];
};

export class LeadInputError extends Error {
  constructor(public readonly code: string, public readonly status = 400) {
    super(code);
    this.name = "LeadInputError";
  }
}

const fields = new Set([
  "name", "email", "phone", "company", "business", "website", "service",
  "preferredContact", "message", "budget", "recommendedService",
  "conversation", "consentToContact", "consentToShareConversation", "website_check"
]);

function text(value: unknown, maximum: number, key: string): string {
  if (value === undefined || value === null) return "";
  if (typeof value !== "string" || value.length > maximum ||
      /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value)) {
    throw new LeadInputError("invalid_field_" + key);
  }
  return value.trim();
}

function consent(value: unknown): boolean {
  return value === true || value === "yes";
}

export function validateLeadPayload(data: unknown): VerifiedFormFields {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new LeadInputError("invalid_form");
  }
  const source = data as Record<string, unknown>;
  if (Object.keys(source).some((key) => !fields.has(key))) {
    throw new LeadInputError("unexpected_fields");
  }
  if (!consent(source.consentToContact)) {
    throw new LeadInputError("contact_consent_required");
  }
  // A human-checked form submission is consent to REQUEST contact, not consent
  // to marketing campaigns or unrestricted AI/customer outbound.
  if (text(source.website_check, 300, "website_check")) {
    throw new LeadInputError("invalid_form");
  }
  const name = text(source.name, 160, "name");
  const email = text(source.email, 254, "email");
  if (name.length < 2) throw new LeadInputError("name_required");
  if (!/^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,30}$/.test(email)) {
    throw new LeadInputError("valid_email_required");
  }
  const output: VerifiedFormFields = { name, email };
  for (const [key, limit] of Object.entries({
    phone: 120, company: 240, business: 240, website: 500,
    service: 240, preferredContact: 160, message: 2000,
    budget: 160, recommendedService: 240
  })) {
    const value = text(source[key], limit, key);
    if (value) (output as unknown as Record<string, string>)[key] = value;
  }
  // Passing AI chat content to a human inbox requires *separate* opt-in.
  if (source.conversation !== undefined) {
    if (!consent(source.consentToShareConversation)) {
      throw new LeadInputError("conversation_consent_required");
    }
    if (!Array.isArray(source.conversation) || source.conversation.length > 10) {
      throw new LeadInputError("invalid_conversation");
    }
    output.conversation = source.conversation.map((item: unknown) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        throw new LeadInputError("invalid_conversation");
      }
      const msg = item as Record<string, unknown>;
      if (Object.keys(msg).some((key) => key !== "role" && key !== "content") ||
          (msg.role !== "user" && msg.role !== "assistant")) {
        throw new LeadInputError("invalid_conversation");
      }
      const content = text(msg.content, 900, "conversation");
      if (!content) throw new LeadInputError("invalid_conversation");
      return { role: msg.role as "user" | "assistant", content };
    });
  }
  return output;
}

export async function parseFirstPartyLeadRequest(request: Request): Promise<VerifiedFormFields> {
  const origin = request.headers.get("origin");
  let ownOrigin: string;
  try {
    ownOrigin = new URL(request.url).origin;
  } catch {
    throw new LeadInputError("invalid_origin", 403);
  }
  // This blocks cross-site browser submissions; it is NOT bot detection.
  if (!origin || origin !== ownOrigin) {
    throw new LeadInputError("invalid_origin", 403);
  }
  const contentType = request.headers.get("content-type") || "";
  if (!/^application\/json(?:\s*;|\s*$)/i.test(contentType)) {
    throw new LeadInputError("json_required", 415);
  }
  const length = Number(request.headers.get("content-length") || "0");
  if (!Number.isFinite(length) || length > MAX_LEAD_REQUEST_BYTES || length < 0) {
    throw new LeadInputError("request_too_large", 413);
  }
  if (!request.body) throw new LeadInputError("empty_body");
  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let size = 0;
  let raw = "";
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > MAX_LEAD_REQUEST_BYTES) {
        await reader.cancel();
        throw new LeadInputError("request_too_large", 413);
      }
      raw += decoder.decode(chunk.value, { stream: true });
    }
    raw += decoder.decode();
  } catch (error) {
    if (error instanceof LeadInputError) throw error;
    throw new LeadInputError("invalid_body");
  } finally {
    reader.releaseLock();
  }
  if (!raw) throw new LeadInputError("empty_body");
  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    throw new LeadInputError("invalid_json");
  }
  return validateLeadPayload(payload);
}
