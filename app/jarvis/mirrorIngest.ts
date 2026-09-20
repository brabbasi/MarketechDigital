import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const MIRROR_INGEST_MAX_BYTES = 512 * 1024;
export const MIRROR_INGEST_MAX_SKEW_SECONDS = 120;

const SUPPORTED_STORE_DRIVERS = new Set<string>();

export type MirrorIngestEnvelope = {
  timestamp: number;
  contentSha256: string;
  idempotencyKey: string;
};

function safeHexEqual(left: string, right: string): boolean {
  if (!/^[0-9a-f]+$/i.test(left) || !/^[0-9a-f]+$/i.test(right)) return false;
  if (left.length !== right.length || left.length % 2 !== 0) return false;
  const leftBytes = Buffer.from(left, "hex");
  const rightBytes = Buffer.from(right, "hex");
  return leftBytes.length === rightBytes.length && timingSafeEqual(leftBytes, rightBytes);
}

export function mirrorIngestEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.JARVIS_MIRROR_INGEST_ENABLED === "true";
}

export function mirrorStoreConfigured(env: NodeJS.ProcessEnv = process.env): boolean {
  const driver = env.JARVIS_MIRROR_STORE_DRIVER?.trim();
  return Boolean(driver && SUPPORTED_STORE_DRIVERS.has(driver));
}

export function mirrorWriteSecret(env: NodeJS.ProcessEnv = process.env): string | null {
  const secret = env.JARVIS_MIRROR_WRITE_SECRET?.trim();
  return secret && secret.length >= 32 ? secret : null;
}

export function validateMirrorIngestEnvelope(
  body: Uint8Array,
  headers: Headers,
  secret: string,
  nowMs = Date.now(),
): MirrorIngestEnvelope {
  if (!secret || secret.length < 32) {
    throw new Error("mirror write secret invalid");
  }
  if (body.byteLength <= 0 || body.byteLength > MIRROR_INGEST_MAX_BYTES) {
    throw new Error("mirror body size invalid");
  }

  const contentType = headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase();
  if (contentType !== "application/json") {
    throw new Error("mirror content type invalid");
  }

  const timestampText = headers.get("x-marketech-timestamp")?.trim();
  const contentSha = headers.get("x-marketech-content-sha256")?.trim().toLowerCase();
  const signatureHeader = headers.get("x-marketech-signature")?.trim();
  const idempotencyKey = headers.get("idempotency-key")?.trim().toLowerCase();

  if (!timestampText || !/^\d{10,13}$/.test(timestampText)) {
    throw new Error("mirror timestamp invalid");
  }
  const timestamp = Number.parseInt(timestampText, 10);
  if (!Number.isSafeInteger(timestamp)) {
    throw new Error("mirror timestamp invalid");
  }
  const nowSeconds = Math.floor(nowMs / 1000);
  if (Math.abs(nowSeconds - timestamp) > MIRROR_INGEST_MAX_SKEW_SECONDS) {
    throw new Error("mirror timestamp outside replay window");
  }

  if (!contentSha || !/^[0-9a-f]{64}$/.test(contentSha)) {
    throw new Error("mirror content digest invalid");
  }
  const actualDigest = createHash("sha256").update(body).digest("hex");
  if (!safeHexEqual(actualDigest, contentSha)) {
    throw new Error("mirror content digest mismatch");
  }

  if (!idempotencyKey || !/^[0-9a-f]{64}$/.test(idempotencyKey) || !safeHexEqual(idempotencyKey, contentSha)) {
    throw new Error("mirror idempotency key mismatch");
  }

  const match = /^v1=([0-9a-f]{64})$/i.exec(signatureHeader ?? "");
  if (!match) {
    throw new Error("mirror signature shape invalid");
  }
  const expectedSignature = createHmac("sha256", secret)
    .update(`${timestamp}.${contentSha}`)
    .digest("hex");
  if (!safeHexEqual(expectedSignature, match[1].toLowerCase())) {
    throw new Error("mirror signature invalid");
  }

  return {
    timestamp,
    contentSha256: contentSha,
    idempotencyKey,
  };
}
