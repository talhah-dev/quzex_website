"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { SITE_CONFIG, SITE_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

type FooterData = {
    title: string;
    links: {
        title: string;
        href: string;
    }[];
};

const footerSections: FooterData[] = [
    {
        title: "Quick Links",
        links: [
            { title: "Home", href: "/" },
            { title: "About", href: "/about" },
            { title: "Services", href: "/services" },
            { title: "Our Work", href: "/work" },
            { title: "Contact", href: "/contact" },
        ],
    },
    {
        title: "Services",
        links: [
            { title: "Website Development", href: "/services" },
            { title: "Website Redesign", href: "/services" },
            { title: "Full Stack Development", href: "/services" },
            { title: "API Integration", href: "/services" },
        ],
    },
];

const Footer = () => {
    const pathname = usePathname();

    const isActiveRoute = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    return (
        <footer className="relative overflow-hidden bg-[#0A211F] py-10 text-[#E9F3E6]">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[url('/footer.avif')] bg-cover bg-center opacity-[0.10]"
            />

            <div className="relative mx-auto max-w-7xl px-4 lg:px-8 xl:px-16">
                <div className="flex flex-col gap-6 sm:gap-12">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 px-6 py-12 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-12 xl:px-0">
                        <div className="col-span-full lg:col-span-4">
                            <div className="flex flex-col gap-6 animate-in fill-mode-both slide-in-from-bottom-10 fade-in duration-1000 delay-100 ease-in-out">
                                <Link href="/" className="flex items-center">
                                    <Image
                                        src="/quzex.png"
                                        alt={SITE_CONFIG.name}
                                        width={470}
                                        height={207}
                                        className="h-12 w-auto object-contain"
                                    />
                                    <span className="sr-only">{SITE_CONFIG.name}</span>
                                </Link>

                                <p className="text-base font-normal text-[#E9F3E6]/85">
                                    We deliver high-quality websites, dependable support, and
                                    tailored solutions built around your business needs.
                                </p>

                                <div className="flex items-center gap-4">
                                    <a
                                        href={SITE_LINKS.instagram}
                                        className="text-[#E9F3E6]/85 transition-colors hover:text-[#E9F3E6]"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaInstagram size={20} />
                                    </a>
                                    <a
                                        href={SITE_LINKS.linkedin}
                                        className="text-[#E9F3E6]/85 transition-colors hover:text-[#E9F3E6]"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaLinkedinIn size={20} />
                                    </a>
                                    <a
                                        href={SITE_LINKS.whatsapp}
                                        className="text-[#E9F3E6]/85 transition-colors hover:text-[#E9F3E6]"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaWhatsapp size={20} />
                                    </a>
                                    <a
                                        href={SITE_LINKS.facebook}
                                        className="text-[#E9F3E6]/85 transition-colors hover:text-[#E9F3E6]"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaFacebookF size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-1 hidden lg:block" />

                        {footerSections.map(({ title, links }, index) => (
                            <div key={index} className="col-span-2">
                                <div className="flex flex-col gap-4 animate-in fill-mode-both slide-in-from-bottom-10 fade-in duration-1000 delay-100 ease-in-out">
                                    <p className="text-base font-medium text-[#E9F3E6]">{title}</p>
                                    <ul className="flex flex-col gap-3">
                                        {links.map(({ title: linkTitle, href }) => (
                                            <li key={linkTitle}>
                                                <Link
                                                    href={href}
                                                    className={cn(
                                                        "text-base font-normal transition-colors",
                                                        title === "Quick Links" && isActiveRoute(href)
                                                            ? "text-[#D8F782]"
                                                            : "text-[#E9F3E6]/85 hover:text-[#D8F782]"
                                                    )}
                                                >
                                                    {linkTitle}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}

                        <div className="col-span-3">
                            <div className="flex flex-col gap-4 animate-in fill-mode-both slide-in-from-bottom-10 fade-in duration-1000 delay-100 ease-in-out">
                                <p className="text-base font-medium text-[#E9F3E6]">Contact</p>
                                <ul className="flex flex-col gap-3">
                                    <li>
                                        <p className="text-base font-normal text-[#E9F3E6]/85">
                                            Remote - Available worldwide
                                        </p>
                                    </li>
                                    <li>
                                        <a
                                            href={SITE_LINKS.mailto}
                                            className="text-base font-normal text-[#E9F3E6]/85 transition-colors hover:text-[#D8F782]"
                                        >
                                            {SITE_CONFIG.email}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={SITE_LINKS.tel}
                                            className="text-base font-normal text-[#E9F3E6]/85 transition-colors hover:text-[#D8F782]"
                                        >
                                            {SITE_CONFIG.phone}
                                        </a>
                                    </li>
                                    <li>
                                        <Link
                                            href="/contact"
                                            className={cn(
                                                "text-base font-normal transition-colors",
                                                isActiveRoute("/contact")
                                                    ? "text-[#D8F782]"
                                                    : "text-[#E9F3E6]/85 hover:text-[#D8F782]"
                                            )}
                                        >
                                            Get a quote
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <Separator orientation="horizontal" className="bg-white/10" />

                    <p className="animate-in fill-mode-both slide-in-from-bottom-10 fade-in text-center text-sm font-normal text-[#E9F3E6]/85 duration-1000 delay-100 ease-in-out">
                        Copyright © {new Date().getFullYear()} {SITE_CONFIG.name}. All Rights
                        Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
