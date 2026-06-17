"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I can help you find an article from Maia's blog. What are you interested in?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });
    const data = await res.json();

    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    setLoading(false);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="w-80 h-[28rem] bg-white border border-gray-200 rounded-xl shadow-xl flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <span className="font-semibold text-black">Find an article</span>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-black">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <span className="inline-block rounded-lg px-3 py-2 bg-gray-100 text-black text-left text-sm">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: ({ href, children }) => (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {m.content}
                  </ReactMarkdown>
                </span>
              </div>
            ))}
            {loading && <p className="text-gray-400 text-sm">Thinking…</p>}
          </div>

          <div className="flex gap-2 p-3 border-t border-gray-200">
            <input
              className="flex-1 border rounded-lg px-3 py-2 text-black text-sm placeholder-gray-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about an article…"
            />
            <button onClick={sendMessage} className="bg-black text-white rounded-lg px-3 py-2 text-sm">Send</button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="w-14 h-14 rounded-full bg-black text-white shadow-lg text-2xl flex items-center justify-center"
        >
          💬
        </button>
      )}
    </div>
  );
}