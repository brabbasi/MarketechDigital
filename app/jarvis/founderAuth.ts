const encoder = new TextEncoder();
const SESSION_SUBJECT = "marketech-founder";
export const FOUNDER_SESSION_COOKIE = "marketech-founder-session";

type SessionPayload = {
  sub: typeof SESSION_SUBJECT;
  iat: number;
  exp: number;
  nonce: string;
};

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string): Uint8Array {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) throw new Error("invalid base64url");
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - value.length % 4) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

function textToBase64Url(value: string): string {
  return bytesToBase64Url(encoder.encode(value));
}

function base64UrlToText(value: string): string {
  return new TextDecoder().decode(base64UrlToBytes(value));
}

function constantStringEqual(left: string, right: string): boolean {
  if (left.length !== right.length) return false;
  let diff = 0;
  for (let index = 0; index < left.length; index += 1) {
    diff |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return diff === 0;
}

function sessionSecret(): string | null {
  const value = process.env.FOUNDER_SESSION_SECRET?.trim();
  return value && value.length >= 32 ? value : null;
}

function passwordRecord(): string | null {
  const value = process.env.FOUNDER_PASSWORD_PBKDF2?.trim();
  return value || null;
}

function totpSecret(): string | null {
  const value = process.env.FOUNDER_TOTP_SECRET?.trim();
  return value || null;
}

export function founderAuthEnabled(environment = process.env.VERCEL_ENV): boolean {
  return environment === "production" && process.env.FOUNDER_AUTH_ENABLED === "true";
}

export function founderAuthConfigured(): boolean {
  return Boolean(sessionSecret() && passwordRecord() && totpSecret());
}

export function founderSessionTtlSeconds(): number {
  const raw = Number.parseInt(process.env.FOUNDER_SESSION_TTL_SECONDS ?? "3600", 10);
  if (!Number.isFinite(raw)) return 3600;
  return Math.min(Math.max(raw, 300), 14_400);
}

async function hmacKey(secret: string, hash: "SHA-1" | "SHA-256", usage: KeyUsage[]): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash },
    false,
    usage,
  );
}

async function sessionSignature(payloadPart: string): Promise<Uint8Array> {
  const secret = sessionSecret();
  if (!secret) throw new Error("founder session secret unavailable");
  const key = await hmacKey(secret, "SHA-256", ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(payloadPart)));
}

export async function createFounderSessionToken(nowMs = Date.now()): Promise<string> {
  if (!founderAuthConfigured()) throw new Error("founder auth not configured");
  const iat = Math.floor(nowMs / 1000);
  const payload: SessionPayload = {
    sub: SESSION_SUBJECT,
    iat,
    exp: iat + founderSessionTtlSeconds(),
    nonce: crypto.randomUUID(),
  };
  const payloadPart = textToBase64Url(JSON.stringify(payload));
  const signature = await sessionSignature(payloadPart);
  return `${payloadPart}.${bytesToBase64Url(signature)}`;
}

export async function verifyFounderSessionToken(token: string | undefined, nowMs = Date.now()): Promise<boolean> {
  if (!token || !founderAuthConfigured()) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadPart, signaturePart] = parts;
  try {
    const secret = sessionSecret();
    if (!secret) return false;
    const key = await hmacKey(secret, "SHA-256", ["verify"]);
    const verified = await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlToBytes(signaturePart),
      encoder.encode(payloadPart),
    );
    if (!verified) return false;
    const parsed = JSON.parse(base64UrlToText(payloadPart)) as Partial<SessionPayload>;
    if (parsed.sub !== SESSION_SUBJECT) return false;
    if (!Number.isInteger(parsed.iat) || !Number.isInteger(parsed.exp)) return false;
    const now = Math.floor(nowMs / 1000);
    if ((parsed.iat as number) > now + 30) return false;
    if ((parsed.exp as number) <= now) return false;
    if ((parsed.exp as number) - (parsed.iat as number) > 14_400) return false;
    return typeof parsed.nonce === "string" && parsed.nonce.length >= 16;
  } catch {
    return false;
  }
}

export function founderSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.VERCEL_ENV === "production" || process.env.VERCEL_ENV === "preview",
    sameSite: "strict" as const,
    path: "/",
    maxAge: founderSessionTtlSeconds(),
  };
}

export function founderSessionClearCookieOptions() {
  return {
    ...founderSessionCookieOptions(),
    maxAge: 0,
  };
}

function parsePasswordRecord(value: string): { iterations: number; salt: Uint8Array; expected: Uint8Array } | null {
  const [iterationText, saltText, expectedText, ...extra] = value.split(":");
  if (extra.length || !iterationText || !saltText || !expectedText) return null;
  const iterations = Number.parseInt(iterationText, 10);
  if (!Number.isInteger(iterations) || iterations < 210_000 || iterations > 2_000_000) return null;
  try {
    const salt = base64UrlToBytes(saltText);
    const expected = base64UrlToBytes(expectedText);
    if (salt.length < 16 || expected.length < 32) return null;
    return { iterations, salt, expected };
  } catch {
    return null;
  }
}

async function derivePassword(
  password: string,
  salt: Uint8Array,
  iterations: number,
  outputBytes: number,
): Promise<Uint8Array> {
  const material = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations },
    material,
    outputBytes * 8,
  );
  return new Uint8Array(bits);
}

export async function verifyFounderPassword(password: string): Promise<boolean> {
  if (!password || password.length > 512) return false;
  const record = passwordRecord();
  if (!record) return false;
  const parsed = parsePasswordRecord(record);
  if (!parsed) return false;
  const actual = await derivePassword(password, parsed.salt, parsed.iterations, parsed.expected.length);
  return constantStringEqual(bytesToBase64Url(actual), bytesToBase64Url(parsed.expected));
}

function decodeBase32(value: string): Uint8Array | null {
  const normalized = value.toUpperCase().replace(/[\s=-]/g, "");
  if (!normalized || !/^[A-Z2-7]+$/.test(normalized)) return null;
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = 0;
  let buffer = 0;
  const output: number[] = [];
  for (const char of normalized) {
    const next = alphabet.indexOf(char);
    if (next < 0) return null;
    buffer = (buffer << 5) | next;
    bits += 5;
    if (bits >= 8) {
      bits -= 8;
      output.push((buffer >>> bits) & 0xff);
    }
  }
  return new Uint8Array(output);
}

async function totpAt(secret: Uint8Array, counter: number): Promise<string> {
  const counterBytes = new Uint8Array(8);
  let remaining = BigInt(counter);
  for (let index = 7; index >= 0; index -= 1) {
    counterBytes[index] = Number(remaining & 0xffn);
    remaining >>= 8n;
  }
  const key = await crypto.subtle.importKey(
    "raw",
    secret,
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"],
  );
  const digest = new Uint8Array(await crypto.subtle.sign("HMAC", key, counterBytes));
  const offset = digest[digest.length - 1] & 0x0f;
  const binary =
    ((digest[offset] & 0x7f) << 24) |
    ((digest[offset + 1] & 0xff) << 16) |
    ((digest[offset + 2] & 0xff) << 8) |
    (digest[offset + 3] & 0xff);
  return String(binary % 1_000_000).padStart(6, "0");
}

export async function verifyFounderTotp(code: string, nowMs = Date.now()): Promise<boolean> {
  if (!/^\d{6}$/.test(code)) return false;
  const raw = totpSecret();
  if (!raw) return false;
  const secret = decodeBase32(raw);
  if (!secret || secret.length < 10) return false;
  const counter = Math.floor(nowMs / 30_000);
  for (const delta of [-1, 0, 1]) {
    const expected = await totpAt(secret, counter + delta);
    if (constantStringEqual(code, expected)) return true;
  }
  return false;
}

export async function verifyFounderCredentials(password: string, code: string, nowMs = Date.now()): Promise<boolean> {
  if (!founderAuthConfigured()) return false;
  const [passwordOk, totpOk] = await Promise.all([
    verifyFounderPassword(password),
    verifyFounderTotp(code, nowMs),
  ]);
  return passwordOk && totpOk;
}

export function requestHasSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const requestUrl = new URL(request.url);
    const originUrl = new URL(origin);
    return requestUrl.protocol === originUrl.protocol && requestUrl.host === originUrl.host;
  } catch {
    return false;
  }
}
