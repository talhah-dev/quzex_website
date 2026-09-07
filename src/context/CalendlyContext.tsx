"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { X, Loader2, Calendar } from "lucide-react";
import { SITE_LINKS } from "@/lib/site";

interface CalendlyContextType {
  isOpen: boolean;
  openCalendly: (customUrl?: string) => void;
  closeCalendly: () => void;
}

const CalendlyContext = createContext<CalendlyContextType | undefined>(undefined);

export function CalendlyProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [calendlyUrl, setCalendlyUrl] = useState<string>(SITE_LINKS.calendly);
  const [isLoading, setIsLoading] = useState(true);

  const openCalendly = useCallback((customUrl?: string) => {
    if (customUrl) {
      setCalendlyUrl(customUrl);
    } else {
      setCalendlyUrl(SITE_LINKS.calendly);
    }
    setIsLoading(true);
    setIsOpen(true);
  }, []);

  const closeCalendly = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCalendly();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeCalendly]);

  const embedUrl = `${calendlyUrl}?hide_landing_page_details=0&hide_gdpr_banner=1&background_color=0a211f&text_color=e9f3e6&primary_color=d8f782`;

  return (
    <CalendlyContext.Provider value={{ isOpen, openCalendly, closeCalendly }}>
      {children}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
        >
          <div
            onClick={closeCalendly}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
          />

          <div className="relative z-10 flex h-[90vh] max-h-[780px] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0A211F] shadow-[0_25px_80px_-20px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D8F782]/10 text-[#D8F782]">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#E9F3E6] sm:text-lg">
                    Schedule a 30-Min Discovery Call
                  </h3>
                  <p className="text-xs text-[#E9F3E6]/65">
                    Pick a convenient time to discuss your project scope & strategy
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeCalendly}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#E9F3E6] transition-all hover:bg-white/10 hover:text-white"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex-1 bg-[#0A211F]">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0A211F] text-[#8AF7B7]">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <p className="text-sm font-medium text-[#E9F3E6]/80">Loading calendar...</p>
                </div>
              )}

              <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule a meeting with Quzex"
                onLoad={() => setIsLoading(false)}
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </CalendlyContext.Provider>
  );
}

export function useCalendly() {
  const context = useContext(CalendlyContext);
  if (!context) {
    throw new Error("useCalendly must be used within a CalendlyProvider");
  }
  return context;
}
