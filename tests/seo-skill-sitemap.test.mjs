import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const sitemap = readFileSync("app/sitemap.ts", "utf8");
const seo = readFileSync("app/seo.ts", "utf8");
const robots = readFileSync("app/robots.ts", "utf8");
const service = readFileSync("app/services/[slug]/page.tsx", "utf8");

test("static sitemap routes do not pretend they were modified on every request", () => {
  assert.doesNotMatch(sitemap, /const now = new Date\(\)/);
  assert.doesNotMatch(sitemap, /lastModified:\s*now/);
  assert.match(sitemap, /lastModified: new Date\(\x60\$\{article\.date\}T12:00:00\x60\)/);
});

test("existing canonical, sitemap and schema implementation stays in place", () => {
  assert.match(seo, /export function jsonLdGraph/);
  assert.match(robots, /sitemap: absoluteUrl\("\/sitemap\.xml"\)/);
  assert.match(service, /alternates: \{ canonical: \x60\/services\/\$\{service\.slug\}\x60 \}/);
  assert.match(service, /serviceJsonLd\(service\.name, service\.metaDescription, pagePath\)/);
});
