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
