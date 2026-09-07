"use client";

import { useState } from "react";
import { Bot, Calendar, X } from "lucide-react";
import { useCalendly } from "@/context/CalendlyContext";

export default function ChatBotFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const { openCalendly } = useCalendly();

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close AI Chatbot" : "Open AI Chatbot"}
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

      {isOpen && (
        <div className="fixed bottom-22 right-4 z-[70] flex h-[640px] max-h-[82vh] w-[calc(100vw-2rem)] max-w-[420px] flex-col overflow-hidden rounded-3xl border border-[#0A211F]/15 bg-white shadow-[0_25px_60px_-15px_rgba(10,33,31,0.35)] md:bottom-24 md:right-6">
          <div className="relative flex-1 w-full h-full bg-white overflow-hidden">
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/K1NrPTpb1XfsuPQuRAcEj"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="microphone"
              title="Quzex Chatbot"
              className="h-full w-full border-0"
            />
            <div className="absolute bottom-[73px] left-1/2 -translate-x-1/2 h-[25px] w-[195px] rounded-lg bg-white z-20 flex items-center justify-center shadow-xs">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  openCalendly();
                }}
                className="flex items-center justify-center gap-1.5 cursor-pointer text-[11px] font-semibold text-[#0A211F] hover:text-[#174D48] transition-colors whitespace-nowrap"
              >
                <Calendar className="size-3 text-[#0A211F]" />
                <span>Schedule a Call with Quzex</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
