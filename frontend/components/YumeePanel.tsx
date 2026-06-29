"use client";

import { useState } from "react";
import { Bot, X, Send } from "lucide-react";

export default function YumeePanel() {

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [chat, setChat] = useState([
    {
      sender: "yumee",
      text:
        "Hi buddy👋\nI'm Yumee.\nHow can I help you today?",
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

    setLoading(true);

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
          text: "I couldn't reach the backend.",
        },
      ]);

    } finally {

      setLoading(false);

    }

  }

  return (

    <>

      {/* Floating Button */}

      {!open && (

        <button
          onClick={() => setOpen(true)}
          className="
          fixed
          bottom-8
          right-8
          z-50
          group
          "
        >

          <div
            className="
            absolute
            inset-0
            rounded-full
            bg-violet-300
            blur-2xl
            opacity-60
            group-hover:opacity-100
            transition
          "
          />

          <div
            className="
            relative
            h-20
            w-20
            rounded-full
            bg-gradient-to-br
            from-violet-500
            via-fuchsia-500
            to-indigo-500
            shadow-2xl
            flex
            items-center
            justify-center
            transition-all
            duration-300
            group-hover:scale-110
            group-hover:-translate-y-2
          "
          >

            <Bot
              size={36}
              className="text-white"
            />

          </div>

        </button>

      )}

      {open && (

        <div
          className="
          fixed
          bottom-8
          right-8
          z-50
          flex
          h-[650px]
          w-[390px]
          flex-col
          overflow-hidden
          rounded-[34px]
          border
          border-violet-100
          bg-white/90
          backdrop-blur-3xl
          shadow-[0_25px_70px_rgba(139,92,246,0.18)]
          animate-in
          fade-in
          slide-in-from-bottom-4
          duration-300
        "
        >

          {/* Header */}

          <div
            className="
            flex
            items-center
            justify-between
            border-b
            border-violet-100
            p-6
          "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-violet-500
                to-fuchsia-500
                shadow-lg
              "
              >

                <Bot
                  size={26}
                  className="text-white"
                />

              </div>

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  Yumee
                </h2>

                <p className="text-sm text-gray-500">
                  Your AI Productivity Companion
                </p>

              </div>

            </div>

            <button
              onClick={() => setOpen(false)}
              className="
              rounded-full
              p-2
              text-gray-400
              transition
              hover:bg-violet-50
              hover:text-violet-600
            "
            >

              <X size={20} />

            </button>

          </div>
          {/* Messages */}

          <div className="flex-1 overflow-y-auto bg-[#FCFBFF] p-5 space-y-4">

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
                  className={`max-w-[80%] rounded-3xl px-5 py-4 whitespace-pre-line leading-7 shadow-sm ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white"
                      : "bg-white border border-violet-100 text-gray-700"
                  }`}
                >

                  {msg.text}

                </div>

              </div>

            ))}

            {loading && (

              <div className="flex justify-start">

                <div
                  className="
                    rounded-3xl
                    bg-violet-50
                    border
                    border-violet-100
                    px-5
                    py-4
                    text-violet-700
                    animate-pulse
                  "
                >

                  Yumee is thinking...

                </div>

              </div>

            )}

          </div>

          {/* Input */}

          <div className="border-t border-violet-100 bg-white p-5">

            <div className="flex items-center gap-3">

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
                  rounded-2xl
                  border
                  border-violet-200
                  bg-violet-50
                  px-5
                  py-3
                  text-gray-800
                  outline-none
                  transition
                  focus:border-violet-500
                  focus:bg-white
                "
              />

              <button
                onClick={sendMessage}
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-r
                  from-violet-600
                  to-fuchsia-500
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:scale-110
                  hover:shadow-violet-300
                "
              >

                <Send size={18} />

              </button>

            </div>

          </div>

        </div>

      )}

    </>

  );

}