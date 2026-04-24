import { NextResponse } from "next/server";
import { buildSystemPrompt, localAssistantReply, type ChatMessage } from "../../lib/marketech-knowledge";

export const runtime = "nodejs";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

function cleanMessages(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter((message) => message && typeof message === "object")
    .map((message) => message as Record<string, unknown>)
    .filter((message) => (message.role === "user" || message.role === "assistant") && typeof message.content === "string")
    .slice(-12)
    .map((message) => ({ role: message.role as "user" | "assistant", content: String(message.content).slice(0, 1800) }));
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const messages = cleanMessages(body.messages);
    const lastUser = [...messages].reverse().find((message) => message.role === "user")?.content || "";

    if (!lastUser.trim()) {
      return NextResponse.json({
        reply: "Tell me what you want to build, automate, or clarify, and I’ll suggest the best Marketech path.",
        mode: "fallback",
        reason: "empty_message"
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ reply: localAssistantReply(lastUser), mode: "fallback", reason: "missing_openai_api_key" });
    }

    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.45,
        max_tokens: 750,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...messages
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI chat error", errorText);
      return NextResponse.json({
        reply: localAssistantReply(lastUser),
        mode: "fallback",
        reason: `openai_error_${response.status}`
      });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content;

    return NextResponse.json({
      reply: typeof reply === "string" && reply.trim() ? reply.trim() : localAssistantReply(lastUser),
      mode: typeof reply === "string" && reply.trim() ? "ai" : "fallback",
      reason: typeof reply === "string" && reply.trim() ? "openai_connected" : "empty_openai_reply"
    });
  } catch (error) {
    console.error("Chat route error", error);
    return NextResponse.json(
      { reply: "I had trouble processing that. Tell me your business type, project goal, and what feels repetitive or unclear, and I’ll suggest a starting point.", mode: "error", reason: "route_exception" },
      { status: 200 }
    );
  }
}
