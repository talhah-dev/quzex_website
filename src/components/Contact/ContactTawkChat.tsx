"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Tawk_API?: {
      onLoad?: () => void;
      hideWidget?: () => void;
      showWidget?: () => void;
    };
    Tawk_LoadStart?: Date;
  }
}

const TAWK_SCRIPT_ID = "tawk-contact-script";
const TAWK_SRC = "https://embed.tawk.to/69ab8e1f71c7231c3a290716/1jj326bns";

export default function ContactTawkChat() {
  useEffect(() => {
    let isActive = true;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    window.Tawk_API.onLoad = () => {
      if (isActive) {
        window.Tawk_API?.showWidget?.();
      } else {
        window.Tawk_API?.hideWidget?.();
      }
    };

    const existingScript = document.getElementById(TAWK_SCRIPT_ID) as HTMLScriptElement | null;

    if (existingScript) {
      window.Tawk_API?.showWidget?.();
    } else {
      const script = document.createElement("script");
      script.id = TAWK_SCRIPT_ID;
      script.async = true;
      script.src = TAWK_SRC;
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");
      document.body.appendChild(script);
    }

    return () => {
      isActive = false;
      window.Tawk_API?.hideWidget?.();
    };
  }, []);

  return null;
}
