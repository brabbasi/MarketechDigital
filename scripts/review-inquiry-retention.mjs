#!/usr/bin/env node
/**
 * Local, operator-controlled metadata plan. NEVER touches provider mail or
 * performs deletion. The source JSON MUST NOT contain inquiry PII.
 * Use an approved private folder and do not commit local input/output files.
 */
import { readFileSync, writeFileSync, statSync } from "node:fs";
import { resolve, dirname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { classifyBatch } from "./inquiry-retention-policy.mjs";

function run() {
  const args = process.argv.slice(2);
  if (args.length !== 4 || args[0] !== "--input" || args[2] !== "--output" || args[1] === args[3]) {
    throw Error("EXPECTED_PRIVATE_INPUT_AND_DISTINCT_OUTPUT");
  }
  const repoRoot=resolve(dirname(fileURLToPath(import.meta.url)),"..").toLowerCase();
  const inRepo=(p)=>{const full=resolve(p).toLowerCase();return full===repoRoot||full.startsWith(repoRoot+sep);};
  if(inRepo(args[1])||inRepo(args[3]))throw Error("PRIVATE_METADATA_MUST_STAY_OUTSIDE_REPOSITORY");
  if (statSync(args[1]).size > 1024 * 1024) throw Error("METADATA_FILE_TOO_LARGE");
  const document = JSON.parse(readFileSync(args[1], "utf8"));
  const keys = Object.keys(document);
  if (document.schema_version !== 1 || !Array.isArray(document.records)
      || keys.some(k => !["schema_version", "as_of", "records"].includes(k))) {
    throw Error("INVALID_METADATA_INPUT");
  }
  // Require explicit, auditable operator cut-off; no silent use of local time.
  if (!document.as_of) throw Error("MISSING_REVIEW_DATE");
  const plan = classifyBatch(document.records, document.as_of);
  // Exclusive-create so a new run cannot overwrite prior evidence accidentally.
  writeFileSync(args[3], JSON.stringify(plan, null, 2) + "\n", { mode: 0o600, flag: "wx" });
  process.stdout.write("RETENTION_LOCAL_PLAN_CREATED; COUNT=" + plan.records.length +
    "; HUMAN_ACTION_REQUIRED=true; DELETED=0; PROVIDER_ACCESSED=false\n");
}

try { run(); } catch (error) {
  // Errors NEVER print records, email contents, credentials or source paths.
  const approved = new Set([
    "EXPECTED_PRIVATE_INPUT_AND_DISTINCT_OUTPUT", "METADATA_FILE_TOO_LARGE",
    "INVALID_METADATA_INPUT", "MISSING_REVIEW_DATE", "INVALID_METADATA_RECORD",
    "UNEXPECTED_METADATA_FIELD", "INVALID_OPAQUE_REFERENCE", "INVALID_HUMAN_EXCHANGES",
    "INVALID_AUTOMATED_EXCHANGES", "INVALID_AS_OF_DATE", "INVALID_RETENTION_BATCH",
    "DUPLICATE_OPAQUE_REFERENCE", "PRIVATE_METADATA_MUST_STAY_OUTSIDE_REPOSITORY"
  ]);
  const code = error instanceof Error && approved.has(error.message)
    ? error.message : "RETENTION_IO_OR_SCHEMA_FAILURE";
  process.stderr.write(code + "\n");
  process.exitCode = 1;
}
