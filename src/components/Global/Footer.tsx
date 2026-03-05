import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Twitter, Linkedin, Instagram, Dribbble } from "lucide-react";
import { SITE_CONFIG, SITE_LINKS } from "@/lib/site";

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
    return (
        <footer className="py-10 relative overflow-hidden bg-[#0A211F] text-[#E9F3E6]">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[url('/footer.avif')] bg-cover bg-center opacity-[0.10]"
            />

            <div className="relative max-w-7xl xl:px-16 lg:px-8 px-4 mx-auto">
                <div className="flex flex-col gap-6 sm:gap-12">
                    <div className="py-12 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-12 gap-x-8 gap-y-10 px-6 xl:px-0">
                        <div className="col-span-full lg:col-span-4">
                            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
                                <Link href="/" className="text-[#E9F3E6] font-semibold tracking-tight">
                                    {SITE_CONFIG.name}
                                </Link>

                                <p className="text-base font-normal text-[#E9F3E6]/85">
                                    {`${SITE_CONFIG.name} is a professional web services brand powered by a focused team of 2-3 specialists. We build high-quality websites, redesign existing platforms, and deliver complete development solutions tailored to business goals.`}
                                </p>

                                <div className="flex items-center gap-4">
                                    <a href="#" className="text-[#E9F3E6]/85 hover:text-[#E9F3E6] transition-colors">
                                        <Twitter size={20} />
                                    </a>
                                    <a href="#" className="text-[#E9F3E6]/85 hover:text-[#E9F3E6] transition-colors">
                                        <Linkedin size={20} />
                                    </a>
                                    <a href="#" className="text-[#E9F3E6]/85 hover:text-[#E9F3E6] transition-colors">
                                        <Dribbble size={20} />
                                    </a>
                                    <a href="#" className="text-[#E9F3E6]/85 hover:text-[#E9F3E6] transition-colors">
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
                                                <Link
                                                    href={href}
                                                    className="text-base font-normal text-[#E9F3E6]/85 hover:text-[#D8F782] transition-colors"
                                                >
                                                    {title}
                                                </Link>
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
                                        <p className="text-base font-normal text-[#E9F3E6]/85">
                                            Remote - Available worldwide
                                        </p>
                                    </li>
                                    <li>
                                        <a
                                            href={SITE_LINKS.mailto}
                                            className="text-base font-normal text-[#E9F3E6]/85 hover:text-[#D8F782] transition-colors"
                                        >
                                            {SITE_CONFIG.email}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={SITE_LINKS.tel}
                                            className="text-base font-normal text-[#E9F3E6]/85 hover:text-[#D8F782] transition-colors"
                                        >
                                            {SITE_CONFIG.phone}
                                        </a>
                                    </li>
                                    <li>
                                        <Link
                                            href="/contact"
                                            className="text-base font-normal text-[#E9F3E6]/85 hover:text-[#D8F782] transition-colors"
                                        >
                                            Get a quote
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <Separator orientation="horizontal" className="bg-white/10" />

                    <p className="text-sm font-normal text-[#E9F3E6]/85 text-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
                        Copyright © {new Date().getFullYear()} {SITE_CONFIG.name}. All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
