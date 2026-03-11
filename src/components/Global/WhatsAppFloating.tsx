"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { FaWhatsapp } from "react-icons/fa";
import { getPublicSettings } from "@/lib/api/settings";

export default function WhatsAppFloating() {
  const { data: settings } = useQuery({
    queryKey: ["public-settings"],
    queryFn: getPublicSettings,
  });

  return (
    <Link
      href={settings?.whatsapp || "#"}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="whatsapp-float fixed bottom-5 right-4 z-[60] grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white transition duration-200 hover:brightness-110 md:bottom-7 md:right-6"
    >
      <span className="sr-only">Open WhatsApp chat</span>
      <FaWhatsapp size={30} />
    </Link>
  );
}
