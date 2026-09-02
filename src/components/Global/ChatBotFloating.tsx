"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bot, Send, X } from "lucide-react";

type Message = {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
};

const SUGGESTIONS = [
  "Pricing & Timeline",
  "Website Redesign",
  "Next.js Development",
  "Book a Consultation",
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: "init-1",
    sender: "ai",
    text: "Hello! 👋 Welcome to Quzex. How can I assist you with your website project or digital solutions today?",
    timestamp: "Just now",
  },
];

export default function ChatBotFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  function handleSend(userText: string) {
    const text = userText.trim();
    if (!text || isTyping) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: time,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let aiText = "Thanks for your message! Quzex specializes in high-performance custom website development, modern redesigns, and digital solutions tailored to your business goals. Would you like to share more details about your project?";

      const lower = text.toLowerCase();
      if (lower.includes("price") || lower.includes("cost") || lower.includes("pricing") || lower.includes("timeline")) {
        aiText = "Our pricing and timelines are customized based on project scope. Standard website builds typically take 1 to 3 weeks. You can request a fast estimate via our Contact page or WhatsApp!";
      } else if (lower.includes("redesign") || lower.includes("old website")) {
        aiText = "We transform outdated websites into ultra-fast, mobile-optimized platforms built with modern tech like Next.js and Tailwind CSS!";
      } else if (lower.includes("next.js") || lower.includes("tech") || lower.includes("stack") || lower.includes("react")) {
        aiText = "We build our applications using Next.js, React, Node.js, and MongoDB — delivering top-tier Core Web Vitals, SEO optimization, and smooth UI animations!";
      } else if (lower.includes("contact") || lower.includes("book") || lower.includes("call") || lower.includes("hire") || lower.includes("consult")) {
        aiText = "Awesome! You can submit a project inquiry through our Contact page or chat directly with our team on WhatsApp right above!";
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 650);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open AI Chatbot"
        className="fixed bottom-5 right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full border border-[#8AF7B7]/30 bg-[#0A211F] text-[#8AF7B7] shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-[#143531] md:bottom-7 md:right-6"
      >
        {isOpen ? (
          <X className="size-6 text-[#E9F3E6]" />
        ) : (
          <div className="relative flex items-center justify-center">
            <Bot className="size-6 text-[#8AF7B7]" />
            <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D8F782] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#D8F782]" />
            </span>
          </div>
        )}
      </button>

      {isOpen ? (
        <div className="fixed bottom-22 right-4 z-[70] flex w-[calc(100vw-2rem)] max-w-[390px] flex-col overflow-hidden rounded-3xl border border-[#0A211F]/15 bg-white shadow-[0_25px_60px_-15px_rgba(10,33,31,0.35)] md:bottom-24 md:right-6">
          <div className="flex items-center justify-between border-b border-white/10 bg-[#0A211F] p-4 text-[#E9F3E6]">
            <div>
              <h3 className="text-base font-semibold leading-tight text-[#E9F3E6]">Quzex AI Assistant</h3>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="h-2 w-2 rounded-full bg-[#8AF7B7]" />
                <span className="text-xs text-[#E9F3E6]/70">Online</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-xl p-1.5 text-[#E9F3E6]/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="flex h-[320px] flex-col gap-3 overflow-y-auto bg-[#F7F9F2] p-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#0A211F] text-[#E9F3E6] rounded-br-none"
                      : "border border-[#0A211F]/10 bg-white text-[#0A211F] shadow-sm rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="mt-1 px-1 text-[10px] text-[#0A211F]/45">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping ? (
              <div className="flex items-start">
                <div className="flex items-center gap-1.5 rounded-2xl border border-[#0A211F]/10 bg-white px-4 py-3 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#0A211F]/40" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#0A211F]/40 [animation-delay:0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#0A211F]/40 [animation-delay:0.3s]" />
                </div>
              </div>
            ) : null}

            <div ref={chatBottomRef} />
          </div>

          <div className="border-t border-[#0A211F]/10 bg-white p-3">
            <div className="mb-2 flex flex-nowrap overflow-x-auto gap-1.5 py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSend(suggestion)}
                  className="shrink-0 text-nowrap rounded-full border border-[#0A211F]/12 bg-[#EDF6E8] px-3 py-1 text-[11px] font-medium text-[#0A211F] transition-colors hover:bg-[#D8F782]"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex items-center gap-2 rounded-2xl border border-[#0A211F]/12 bg-[#F7F9F2] p-1.5 focus-within:border-[#0A211F]/30"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask AI anything about Quzex..."
                className="flex-1 bg-transparent px-3 py-1 text-xs text-[#0A211F] outline-none placeholder:text-[#0A211F]/40"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0A211F] text-[#E9F3E6] transition-colors hover:bg-[#143531] disabled:opacity-40"
              >
                <Send className="size-3.5" />
              </button>
            </form>

            <div className="mt-2 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0A211F]/60 transition-colors hover:text-[#0A211F]"
              >
                <span>Need custom project assistance? Contact team</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
