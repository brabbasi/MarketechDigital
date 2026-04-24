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
      return NextResponse.json({ reply: "Tell me what you want to build, automate, or clarify, and I’ll suggest the best Marketech path." });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ reply: localAssistantReply(lastUser), mode: "fallback" });
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
        max_tokens: 650,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...messages
        ]
      })
    });

    if (!response.ok) {
      console.error("OpenAI chat error", await response.text());
      return NextResponse.json({ reply: localAssistantReply(lastUser), mode: "fallback" });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content;

    return NextResponse.json({
      reply: typeof reply === "string" && reply.trim() ? reply.trim() : localAssistantReply(lastUser),
      mode: "ai"
    });
  } catch (error) {
    console.error("Chat route error", error);
    return NextResponse.json(
      { reply: "I had trouble processing that. Tell me your business type, project goal, and what feels repetitive or unclear, and I’ll suggest a starting point.", mode: "error" },
      { status: 200 }
    );
  }
}
