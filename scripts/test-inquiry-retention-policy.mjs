import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, readFileSync, rmSync, symlinkSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { classifyInquiry, classifyBatch } from "./inquiry-retention-policy.mjs";

const NOW = "2026-11-08T00:45:00Z";
const day = 86_400_000;
const base = {reference:"INQ-fixture-001", received_at:"2026-03-01T10:00:00Z",
  meaningful_human_at:[], provider_inventory_verified:true, backup_expiry_verified:true,
  exports_reviewed:true };
function row(data = {}) { return {...base,...data}; }
function daysAgo(n) { return new Date(Date.parse(NOW)-n*day).toISOString().replace(".000Z","Z"); }
function action(record) { return classifyInquiry(row(record),NOW).action; }

test("historical unanswered inquiry reaches 180-day limit and requires human review", () => {
  assert.equal(action(), "POLICY_LIMIT_REACHED_REVIEW_NOW");
});
test("recent inquiry remains not due", () => {
  assert.equal(action({received_at:"2026-10-27T10:00:00Z"}),"NOT_DUE");
});
test("meaningful human exchange extends clock", () => {
  assert.equal(action({received_at:"2026-02-01T10:00:00Z",
    meaningful_human_at:["2026-10-01T12:00:00Z"]}),"NOT_DUE");
});
test("automated confirmations never extend clock", () => {
  assert.equal(action({automated_message_at:["2026-11-05T12:00:00Z"]}),
    "POLICY_LIMIT_REACHED_REVIEW_NOW");
});
test("legal hold receives a separate documented review, never automatic deletion", () => {
  assert.equal(action({legal_hold:true}),"DOCUMENTED_HOLD_REVIEW");
});
test("converted client is governed by separate agreement", () => {
  assert.equal(action({client_converted:true}),"SEPARATE_CLIENT_POLICY");
});
test("provider or backup inventory gaps never clear a due item", () => {
  const result=classifyInquiry(row({provider_inventory_verified:false,backup_expiry_verified:false}),NOW);
  assert.equal(result.action,"POLICY_LIMIT_REACHED_REVIEW_NOW");
  assert.equal(result.inventory_gap,true);
});
test("deletion request requires identity and exception check", () => {
  assert.equal(action({deletion_requested:true}),"IDENTITY_AND_EXCEPTION_REVIEW");
});
test("missing authoritative date is quarantined", () => {
  assert.equal(action({received_at:null}),"QUARANTINE_DATE");
});
test("review starts at day 120, not at expiry", () => {
  assert.equal(action({received_at:daysAgo(119)}),"NOT_DUE");
  assert.equal(action({received_at:daysAgo(120)}),"REVIEW_WINDOW");
});
test("primary deletion targeted at day 140 to allow backup expiry", () => {
  assert.equal(action({received_at:daysAgo(139)}),"REVIEW_WINDOW");
  assert.equal(action({received_at:daysAgo(140)}),"PRIMARY_DELETION_REVIEW_DUE");
});
test("backup expiry at risk after day 152", () => {
  assert.equal(action({received_at:daysAgo(151)}),"PRIMARY_DELETION_REVIEW_DUE");
  assert.equal(action({received_at:daysAgo(152)}),"BACKUP_EXPIRY_WINDOW_AT_RISK");
});
test("180 day retention limit is inclusive", () => {
  assert.equal(action({received_at:daysAgo(179)}),"BACKUP_EXPIRY_WINDOW_AT_RISK");
  assert.equal(action({received_at:daysAgo(180)}),"POLICY_LIMIT_REACHED_REVIEW_NOW");
});
test("future dates and pre-inquiry human exchanges fail closed", () => {
  assert.equal(action({received_at:"2026-11-12T00:45:00Z"}),"QUARANTINE_DATE");
  assert.equal(action({meaningful_human_at:["2026-02-01T00:00:00Z"]}),"QUARANTINE_DATE");
});
test("invalid received date does not normalize to false completion", () => {
  assert.equal(action({received_at:"2026-02-31T00:00:00Z"}),"QUARANTINE_DATE");
  assert.equal(action({received_at:"Oct 1 2026"}),"QUARANTINE_DATE");
});
test("unknown PII-shaped fields rejected instead of copied to outputs", () => {
  assert.throws(()=>classifyInquiry(row({email:"private@business.example"}),NOW),/UNEXPECTED_METADATA_FIELD/);
  assert.throws(()=>classifyInquiry(row({message:"confidential"}),NOW),/UNEXPECTED_METADATA_FIELD/);
});
test("duplicated opaque IDs rejected, no ambiguous cleanup lists", () => {
  assert.throws(()=>classifyBatch([row(),row()],NOW),/DUPLICATE_OPAQUE_REFERENCE/);
});
test("no input yields no false deletion or operational acceptance", () => {
  const r=classifyBatch([],NOW);
  assert.deepEqual(r.records,[]);
  assert.equal(r.deleted_anything,false);
  assert.equal(r.accepted_operational_compliance,false);
  assert.equal(r.accessed_provider,false);
});
test("manual metadata CLI creates a non-destructive, opaque-only artifact", () => {
  const dir=mkdtempSync(path.join(tmpdir(),"marketech-retention-fixture-"));
  const code=path.join(path.dirname(fileURLToPath(import.meta.url)),"review-inquiry-retention.mjs");
  try {
    const input=path.join(dir,"input-private.json"),output=path.join(dir,"plan-private.json");
    writeFileSync(input,JSON.stringify({schema_version:1,as_of:NOW,records:[row()]}));
    const result=spawnSync(process.execPath,[code,"--input",input,"--output",output],{encoding:"utf8"});
    assert.equal(result.status,0,result.stderr);
    assert.match(result.stdout,/DELETED=0; PROVIDER_ACCESSED=false/);
    const report=JSON.parse(readFileSync(output,"utf8"));
    assert.equal(report.records[0].action,"POLICY_LIMIT_REACHED_REVIEW_NOW");
    assert.equal(report.deleted_anything,false);
    assert.equal(report.accessed_provider,false);
    assert.equal(report.accepted_operational_compliance,false);
    assert.equal(report.records[0].reference,"INQ-fixture-001");
    assert.ok(!("email" in report.records[0]));
  } finally { rmSync(dir,{recursive:true,force:true}); }
});
test("metadata output cannot be written into the Git repository", () => {
  const dir=mkdtempSync(path.join(tmpdir(),"marketech-retention-path-"));
  const code=path.join(path.dirname(fileURLToPath(import.meta.url)),"review-inquiry-retention.mjs");
  try {
    const input=path.join(dir,"clean.json");
    const forbidden=path.join(path.dirname(code),"NEVER_WRITE_PRIVATE_PLAN.json");
    writeFileSync(input,JSON.stringify({schema_version:1,as_of:NOW,records:[row()]}));
    const result=spawnSync(process.execPath,[code,"--input",input,"--output",forbidden],{encoding:"utf8"});
    assert.notEqual(result.status,0);
    assert.match(result.stderr,/PRIVATE_METADATA_MUST_STAY_OUTSIDE_REPOSITORY/);
    assert.doesNotMatch(result.stderr,/[\\]Users[\\]|\/tmp\//);
  } finally { rmSync(dir,{recursive:true,force:true}); }
});

test("realpath guard rejects symlink or junction paths into repository", (t) => {
  const dir=mkdtempSync(path.join(tmpdir(),"marketech-retention-link-"));
  const repoRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
  const alias=path.join(dir,"repo-link");
  const cli=path.join(repoRoot,"scripts","review-inquiry-retention.mjs");
  const fixture=path.join(dir,"input.json");
  const forbiddenName="NEVER_WRITE_PRIVATE_PLAN_FROM_SYMLINK_TEST.json";
  const forbiddenReal=path.join(repoRoot,forbiddenName);
  try {
    try {
      symlinkSync(repoRoot,alias,process.platform==="win32"?"junction":"dir");
    } catch(error) {
      if (["EPERM","EACCES","ENOTSUP","EOPNOTSUPP"].includes(error.code)) {
        t.skip("OS does not authorize test directory symlinks");
        return;
      }
      throw error;
    }
    assert.equal(existsSync(forbiddenReal),false,"test requires no prior output");
    writeFileSync(fixture,JSON.stringify({schema_version:1,as_of:NOW,records:[row()]}));
    const res=spawnSync(process.execPath,[cli,"--input",fixture,
      "--output",path.join(alias,forbiddenName)],{encoding:"utf8"});
    assert.notEqual(res.status,0);
    assert.match(res.stderr,/PRIVATE_METADATA_MUST_STAY_OUTSIDE_REPOSITORY/);
    assert.equal(existsSync(forbiddenReal),false,"no output can land in Git via directory alias");
    const inputResult=spawnSync(process.execPath,[cli,
      "--input",path.join(alias,"scripts","inquiry-retention-policy.mjs"),
      "--output",path.join(dir,"outside-output.json")],{encoding:"utf8"});
    assert.notEqual(inputResult.status,0);
    assert.match(inputResult.stderr,/PRIVATE_METADATA_MUST_STAY_OUTSIDE_REPOSITORY/);
    assert.equal(existsSync(path.join(dir,"outside-output.json")),false);
  } finally {
    if (existsSync(forbiddenReal)) rmSync(forbiddenReal,{force:true});
    rmSync(dir,{recursive:true,force:true});
  }
});

test("invalid private input never leaks supplied email into logs", () => {
  const dir=mkdtempSync(path.join(tmpdir(),"marketech-retention-guard-"));
  const code=path.join(path.dirname(fileURLToPath(import.meta.url)),"review-inquiry-retention.mjs");
  try {
    const input=path.join(dir,"bad.json"),output=path.join(dir,"output.json");
    writeFileSync(input,JSON.stringify({schema_version:1,as_of:NOW,
      records:[row({message:"PRIVATE_NEVER_LOG_THIS_TEXT"})]}));
    const result=spawnSync(process.execPath,[code,"--input",input,"--output",output],{encoding:"utf8"});
    assert.notEqual(result.status,0);
    assert.doesNotMatch(result.stderr+result.stdout,/PRIVATE_NEVER_LOG_THIS_TEXT/);
    assert.match(result.stderr,/UNEXPECTED_METADATA_FIELD/);
  } finally { rmSync(dir,{recursive:true,force:true}); }
});
