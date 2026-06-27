"use client";

import { useState } from "react";

export default function YumeePanel() {
  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([
    {
      sender: "yumee",
      text: "Hey Jhanvi 👋\nHow can I help today?",
    },
  ]);

  async function sendMessage() {
    if (!message.trim()) return;

    const userMessage = message;

    setChat((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/yumee-chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
          }),
        }
      );

      const data = await response.json();

      setChat((prev) => [
        ...prev,
        {
          sender: "yumee",
          text: data.reply,
        },
      ]);
    } catch {
      setChat((prev) => [
        ...prev,
        {
          sender: "yumee",
          text: "Backend isn't reachable.",
        },
      ]);
    }
  }

  return (
    <div
      className="
        fixed
        right-6
        bottom-28
        w-96
        h-[600px]
        bg-[#1E293B]
        rounded-3xl
        border
        border-slate-700
        shadow-2xl
        flex
        flex-col
        overflow-hidden
      "
    >
      {/* Header */}
      <div className="p-5 border-b border-slate-700">
        <h2 className="text-xl font-bold text-white">
          Yumee ✨
        </h2>

        <p className="text-slate-400 text-sm mt-1">
          AI Productivity Companion
        </p>
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 whitespace-pre-line ${
                msg.sender === "user"
                  ? "bg-violet-600 text-white"
                  : "bg-[#0F172A] text-slate-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-slate-700 p-4">
        <div className="flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Ask Yumee anything..."
            className="
              flex-1
              bg-[#0F172A]
              text-white
              rounded-xl
              px-4
              py-3
              outline-none
              border
              border-slate-700
            "
          />

          <button
            onClick={sendMessage}
            className="
              bg-violet-600
              hover:bg-violet-500
              px-5
              rounded-xl
              transition
            "
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}