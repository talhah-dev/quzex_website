import { Separator } from "@/components/ui/separator";
import { Twitter, Linkedin, Instagram, Dribbble } from "lucide-react";

type FooterData = {
    title: string;
    links: {
        title: string;
        href: string;
    }[];
};

const footerSections: FooterData[] = [
    {
        title: "Sitemap",
        links: [
            { title: "Contact", href: "/contact" },
            { title: "About", href: "/about" },
            { title: "Portfolio", href: "/portfolio" },
            { title: "Services", href: "/services" },
            { title: "Home", href: "/" },
        ],
    },
    {
        title: "Quick Links",
        links: [
            { title: "Web Apps (Next.js)", href: "/services/nextjs" },
            { title: "APIs (Go + Fiber)", href: "/services/go-fiber" },
            { title: "Performance & SEO", href: "/services/performance-seo" },
        ],
    },
];

const Footer = () => {
    return (
        <footer className="py-10 relative overflow-hidden bg-[#0A211F] text-[#E9F3E6]">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-90"
                style={{
                    background:
                        "radial-gradient(70% 60% at 10% 10%, rgba(216,247,130,.18) 0%, rgba(10,33,31,0) 60%), radial-gradient(60% 55% at 80% 20%, rgba(138,247,183,.14) 0%, rgba(10,33,31,0) 55%), radial-gradient(60% 60% at 50% 120%, rgba(255,255,255,.08) 0%, rgba(10,33,31,0) 55%)",
                }}
            />

            <div className="relative max-w-7xl xl:px-16 lg:px-8 px-4 mx-auto">
                <div className="flex flex-col gap-6 sm:gap-12">
                    <div className="py-12 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-12 gap-x-8 gap-y-10 px-6 xl:px-0">
                        <div className="col-span-full lg:col-span-4">
                            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
                                <a href="/" className="text-[#E9F3E6] font-semibold tracking-tight">
                                    Quzex
                                </a>

                                <p className="text-base font-normal text-[#E9F3E6]/70">
                                    Quzex is the portfolio of Muhammad Talha — a full-stack developer building fast,
                                    accessible, and SEO-ready websites and web apps with Next.js and Go (Fiber).
                                </p>

                                <div className="flex items-center gap-4">
                                    <a href="#" className="text-[#E9F3E6]/65 hover:text-[#E9F3E6] transition-colors">
                                        <Twitter size={20} />
                                    </a>
                                    <a href="#" className="text-[#E9F3E6]/65 hover:text-[#E9F3E6] transition-colors">
                                        <Linkedin size={20} />
                                    </a>
                                    <a href="#" className="text-[#E9F3E6]/65 hover:text-[#E9F3E6] transition-colors">
                                        <Dribbble size={20} />
                                    </a>
                                    <a href="#" className="text-[#E9F3E6]/65 hover:text-[#E9F3E6] transition-colors">
                                        <Instagram size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-1 lg:block hidden"></div>

                        {footerSections.map(({ title, links }, index) => (
                            <div key={index} className="col-span-2">
                                <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
                                    <p className="text-base font-medium text-[#E9F3E6]">{title}</p>
                                    <ul className="flex flex-col gap-3">
                                        {links.map(({ title, href }) => (
                                            <li key={title}>
                                                <a
                                                    href={href}
                                                    className="text-base font-normal text-[#E9F3E6]/70 hover:text-[#D8F782] transition-colors"
                                                >
                                                    {title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}

                        <div className="col-span-3">
                            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
                                <p className="text-base font-medium text-[#E9F3E6]">Contact</p>
                                <ul className="flex flex-col gap-3">
                                    <li>
                                        <p className="text-base font-normal text-[#E9F3E6]/70">
                                            Remote • Available worldwide
                                        </p>
                                    </li>
                                    <li>
                                        <a
                                            href="mailto:perfectwork0022@gmail.com"
                                            className="text-base font-normal text-[#E9F3E6]/70 hover:text-[#D8F782] transition-colors"
                                        >
                                            perfectwork0022@gmail.com
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/contact"
                                            className="text-base font-normal text-[#E9F3E6]/70 hover:text-[#D8F782] transition-colors"
                                        >
                                            Get a quote
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <Separator orientation="horizontal" className="bg-white/10" />

                    <p className="text-sm font-normal text-[#E9F3E6]/60 text-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
                        ©{new Date().getFullYear()} Quzex. All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;