import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
const files = ["app/api/chat/route.ts", "app/api/idea/route.ts"];
function make(path) {
  const source = readFileSync(path, "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {}, calls = [];
  vm.runInNewContext(compiled, {
    exports, Request, Response,
    process: { env: { OPENAI_API_KEY: "synthetic-test", OPENAI_MODEL: "synthetic" } },
    fetch: async (_url, args) => { calls.push(JSON.parse(args.body)); return Response.json({ choices: [{ message: { content: "{}" } }] }); },
    console: { error: () => {} },
    require: name => name === "next/server"
      ? { NextResponse: { json: (x, args) => Response.json(x, args) } }
      : { buildSystemPrompt: () => "test", localAssistantReply: () => "guided" }
  });
  return { calls, post: async input => {
    const result = await exports.POST(new Request("https://example.invalid/", { method: "POST", body: JSON.stringify(input) }));
    return result.json();
  } };
}
for (const path of files) {
  test(path + " rejects unapproved third-party egress", async () => {
    const h = make(path);
    const input = path.includes("idea") ? { business: "synthetic" } : { messages: [{ role: "user", content: "synthetic" }] };
    for (const choice of [undefined, false, "yes"]) {
      const data = await h.post({ ...input, openaiConsent: choice });
      assert.equal(h.calls.length, 0);
      assert.equal(data.reason, "openai_consent_not_granted");
    }
    await h.post({ ...input, openaiConsent: true });
    assert.equal(h.calls.length, 1);
  });
}

test("analytics opt-out signals other tabs even when storage write fails", () => {
  const source = readFileSync("app/GoogleAnalytics.tsx", "utf8");
  assert.match(source, /new BroadcastChannel\(WITHDRAWAL_CHANNEL\)/);
  assert.match(source, /channelRef\.current\?\.postMessage\(\{ type: "ANALYTICS_WITHDRAWN" \}\)/);
  assert.match(source, /channel\.onmessage/);
  assert.match(source, /ga-disable-/);
  assert.match(source, /SESSION_REFUSAL_KEY/);
  assert.match(source, /hadAnalytics && safeReload/);
  assert.match(source, /channel\?\.close\(\)/);
});

test("mobile keyboard changes actual assistant scrollport, not just svh CSS", () => {
  const source = readFileSync("app/AIAssistant.tsx", "utf8");
  const css = readFileSync("app/bot-position-fix.css", "utf8");
  assert.match(source, /window\.visualViewport/);
  assert.match(source, /viewport\?\.addEventListener\("resize", onViewportChange\)/);
  assert.match(source, /viewport\?\.addEventListener\("scroll", onViewportChange\)/);
  assert.match(source, /focusin/);
  assert.match(source, /--ai-mobile-height/);
  assert.match(source, /--ai-mobile-top/);
  assert.match(css, /height: var\(--ai-mobile-height,/);
  assert.match(css, /top: var\(--ai-mobile-top,/);
  assert.match(css, /bottom: var\(--ai-mobile-bottom,/);
  assert.match(source, /overflow-y: auto;/);
});

test("consent restored after decline clears GA disabled flag in current tab", () => {
  const source = readFileSync("app/GoogleAnalytics.tsx", "utf8");
  const handler = source.slice(source.indexOf("  function choose("), source.indexOf("\n  return (", source.indexOf("  function choose(")));
  assert.match(handler, /if \(next === "declined"\)/);
  assert.match(handler, /\[`ga-disable-\$\{measurementId\}`\] = true/);
  assert.match(handler, /\[`ga-disable-\$\{measurementId\}`\] = false/);
  assert.ok(handler.indexOf("] = false;") > handler.indexOf('if (next === "declined")'), "restore must run only on affirmative branch");
});

test("assistant keyboard layout supports short landscape phones wider than 560px", () => {
  const source = readFileSync("app/AIAssistant.tsx", "utf8");
  const css = readFileSync("app/bot-position-fix.css", "utf8");
  assert.match(source, /max-height: 560px/);
  assert.match(source, /viewport\.height \+ viewport\.offsetTop < window\.innerHeight - 72/);
  assert.match(source, /classList\.toggle\("ai-keyboard-adjusted", adjustToKeyboard\)/);
  assert.match(source, /classList\.remove\("ai-keyboard-adjusted"\)/);
  assert.match(css, /\.ai-panel\.ai-keyboard-adjusted \{/);
  assert.match(css, /max-height: var\(--ai-mobile-height, none\) !important/);
});
