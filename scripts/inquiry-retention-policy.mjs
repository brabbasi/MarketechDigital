/**
 * Marketech Digital: stateless, offline inquiry-retention classification.
 *
 * The original website only sends owner-only email through Resend. It does not
 * possess, search, export, or delete mailbox/provider/back-up records.
 * All outcomes below REQUIRE manual, independently evidenced operator actions.
 * No connector, network, credentials, PII or destructive operation is used.
 */
const DAY = 86_400_000;
export const REVIEW_DAYS = 120;
export const PRIMARY_DELETE_DAYS = 140;
export const MAX_RETENTION_DAYS = 180;
const allowedFields = new Set([
  "reference", "received_at", "meaningful_human_at", "automated_message_at",
  "client_converted", "legal_hold", "deletion_requested",
  "provider_inventory_verified", "backup_expiry_verified", "exports_reviewed"
]);

function instant(value) {
  if (typeof value !== "string" || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{1,3})?Z$/.test(value)) return null;
  const d = new Date(value);
  if (!Number.isFinite(d.getTime())) return null;
  // Reject non-existent dates silently normalized by permissive parsers.
  const canonical = d.toISOString().replace(/\.000Z$/, "Z");
  const supplied = value.replace(/\.000Z$/, "Z");
  return canonical === supplied ? d : null;
}
function dateOnly(ms) { return new Date(ms).toISOString().slice(0, 10); }

export function classifyInquiry(row, asOf = new Date()) {
  if (row === null || Array.isArray(row) || typeof row !== "object") throw Error("INVALID_METADATA_RECORD");
  for (const key of Object.keys(row)) {
    if (!allowedFields.has(key)) throw Error("UNEXPECTED_METADATA_FIELD");
  }
  if (typeof row.reference !== "string" || !/^[A-Za-z0-9][A-Za-z0-9_-]{7,63}$/.test(row.reference)) {
    throw Error("INVALID_OPAQUE_REFERENCE");
  }
  if (Array.isArray(row.meaningful_human_at) === false && row.meaningful_human_at !== undefined) {
    throw Error("INVALID_HUMAN_EXCHANGES");
  }
  if (Array.isArray(row.automated_message_at) === false && row.automated_message_at !== undefined) {
    throw Error("INVALID_AUTOMATED_EXCHANGES");
  }
  const now = asOf instanceof Date ? asOf : instant(asOf);
  if (!now || !Number.isFinite(now.getTime())) throw Error("INVALID_AS_OF_DATE");

  const result = {
    reference: row.reference,
    policy: "UNCONVERTED_INQUIRY_180D",
    action: "REVIEW",
    due_at: null,
    primary_action_at: null,
    review_at: null,
    human_proof_required: true,
    provider_inventory_verified: row.provider_inventory_verified === true,
    backup_expiry_verified: row.backup_expiry_verified === true,
    exports_reviewed: row.exports_reviewed === true
  };

  if (row.client_converted === true) { result.action = "SEPARATE_CLIENT_POLICY"; return result; }
  if (row.deletion_requested === true) { result.action = "IDENTITY_AND_EXCEPTION_REVIEW"; return result; }
  if (row.legal_hold === true) { result.action = "DOCUMENTED_HOLD_REVIEW"; return result; }

  const first = instant(row.received_at);
  const human = (row.meaningful_human_at || []).map(instant);
  // A missing/invalid date is not permission to assume retention has expired.
  if (!first || human.some(d => !d)) { result.action = "QUARANTINE_DATE"; return result; }
  // Do not allow future/backdated human exchanges to silently extend retention.
  if (first > now || human.some(d => d < first || d > now)) {
    result.action = "QUARANTINE_DATE"; return result;
  }

  // Only real, meaningful exchanges reset the clock. Automated confirmations
  // intentionally have no influence on the calculation.
  const lastAt = Math.max(first.getTime(), ...human.map(d => d.getTime()));
  const age = (now.getTime() - lastAt) / DAY;
  result.review_at = dateOnly(lastAt + REVIEW_DAYS * DAY);
  result.primary_action_at = dateOnly(lastAt + PRIMARY_DELETE_DAYS * DAY);
  result.due_at = dateOnly(lastAt + MAX_RETENTION_DAYS * DAY);
  if (age >= MAX_RETENTION_DAYS) result.action = "POLICY_LIMIT_REACHED_REVIEW_NOW";
  else if (age >= 152) result.action = "BACKUP_EXPIRY_WINDOW_AT_RISK";
  else if (age >= PRIMARY_DELETE_DAYS) result.action = "PRIMARY_DELETION_REVIEW_DUE";
  else if (age >= REVIEW_DAYS) result.action = "REVIEW_WINDOW";
  else result.action = "NOT_DUE";

  // Missing inventory can never make a due record look safe; report it visibly.
  if (!result.provider_inventory_verified || !result.backup_expiry_verified || !result.exports_reviewed) {
    result.inventory_gap = true;
  }
  return result;
}

export function classifyBatch(rows, asOf) {
  if (!Array.isArray(rows) || rows.length > 10000) throw Error("INVALID_RETENTION_BATCH");
  const seen = new Set();
  const plans = rows.map(row => {
    const result = classifyInquiry(row, asOf);
    if (seen.has(result.reference)) throw Error("DUPLICATE_OPAQUE_REFERENCE");
    seen.add(result.reference);
    return result;
  });
  return {
    policy: "UNCONVERTED_INQUIRY_180D",
    mode: "OFFLINE_METADATA_ONLY_HUMAN_ACTION_REQUIRED",
    records: plans,
    deleted_anything: false,
    accessed_provider: false,
    accepted_operational_compliance: false
  };
}
