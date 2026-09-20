import { get, put } from "@vercel/blob";
import { createHash } from "node:crypto";
import {
  MIRROR_INGEST_MAX_BYTES,
  mirrorStoreConfigured,
  VERCEL_BLOB_MIRROR_DRIVER,
} from "./mirrorIngest";

export const TRUSTED_MIRROR_BLOB_PATH = "jarvis/trusted-control-plane-snapshot.json";

type BlobEnvironment = NodeJS.ProcessEnv;

function credentials(env: BlobEnvironment) {
  if (!mirrorStoreConfigured(env)) {
    throw new Error("mirror blob store is not configured");
  }
  const storeId = env.BLOB_STORE_ID!.trim();
  const oidcToken = env.VERCEL_OIDC_TOKEN!.trim();
  return { storeId, oidcToken };
}

async function readStreamBounded(
  stream: ReadableStream<Uint8Array>,
  maxBytes = MIRROR_INGEST_MAX_BYTES,
): Promise<Uint8Array> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!(value instanceof Uint8Array)) throw new Error("mirror blob chunk invalid");
      total += value.byteLength;
      if (total > maxBytes) throw new Error("mirror blob exceeds size bound");
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  if (total <= 0) throw new Error("mirror blob is empty");
  const output = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    output.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return output;
}

export function mirrorStorageDriver(env: BlobEnvironment = process.env): string | null {
  return mirrorStoreConfigured(env) ? VERCEL_BLOB_MIRROR_DRIVER : null;
}

export async function readTrustedMirrorBlob(
  env: BlobEnvironment = process.env,
): Promise<Uint8Array | null> {
  const { storeId, oidcToken } = credentials(env);
  const result = await get(TRUSTED_MIRROR_BLOB_PATH, {
    access: "private",
    useCache: false,
    storeId,
    oidcToken,
  });
  if (!result) return null;
  if (result.statusCode !== 200) {
    throw new Error(`mirror blob read returned HTTP ${result.statusCode}`);
  }
  return readStreamBounded(result.stream);
}

export async function writeTrustedMirrorBlob(
  body: Uint8Array,
  expectedDigest: string,
  env: BlobEnvironment = process.env,
): Promise<{ contentSha256: string; unchanged: boolean }> {
  if (body.byteLength <= 0 || body.byteLength > MIRROR_INGEST_MAX_BYTES) {
    throw new Error("mirror blob body size invalid");
  }
  const actualDigest = createHash("sha256").update(body).digest("hex");
  if (actualDigest !== expectedDigest) {
    throw new Error("mirror blob digest mismatch");
  }

  const current = await readTrustedMirrorBlob(env);
  if (current) {
    const currentDigest = createHash("sha256").update(current).digest("hex");
    if (currentDigest === expectedDigest) {
      return { contentSha256: expectedDigest, unchanged: true };
    }
  }

  const { storeId, oidcToken } = credentials(env);
  const copy = new Uint8Array(body);
  await put(TRUSTED_MIRROR_BLOB_PATH, copy.buffer, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    storeId,
    oidcToken,
  });
  return { contentSha256: expectedDigest, unchanged: false };
}
