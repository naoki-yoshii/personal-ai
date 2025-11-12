"use client";
import { useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim() || loading) return;
    const next = [...messages, { role: "user", content: input } as Msg];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const json = await res.json();
      setMessages([...next, { role: "assistant", content: String(json.reply ?? "(no reply)") }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Chat</h1>
      <div className="border rounded-xl p-4 h-96 overflow-auto space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <span className={m.role === "user" ? "inline-block rounded-2xl px-3 py-2 bg-gray-200" : "inline-block rounded-2xl px-3 py-2 border bg-white"}>
              <b>{m.role === "user" ? "You" : "AI"}: </b>{m.content}
            </span>
          </div>
        ))}
        {loading && <div className="text-sm opacity-60">…thinking</div>}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded-xl px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="メッセージを入力"
        />
        <button className="border rounded-xl px-4 py-2" onClick={send} disabled={loading}>送信</button>
      </div>
    </main>
  );
}
