import { SITE_CONFIG } from "@/lib/site";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const whatsappHref = `https://wa.me/${SITE_CONFIG.phoneE164.replace(/\D/g, "")}`;

export default function WhatsAppFloating() {
  return (
    <Link
      href={whatsappHref}
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
