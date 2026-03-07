import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { ReactNode } from "react";

type FaqItem = {
    question: string;
    answer: ReactNode;
};

const FAQ_DATA: FaqItem[] = [
    {
        question: "What types of websites do you build?",
        answer: (
            <>
                We build landing pages, business websites, dashboards, custom web pages, and
                full-stack web platforms tailored to each client&apos;s requirements. Our services
                also include static websites, dynamic pages, API integrations, website redesigns,
                and complete frontend and backend development.
            </>
        ),
    },
    {
        question: "What is your typical project timeline?",
        answer: (
            <>
                Timelines depend on the project scope and required functionality. Smaller websites
                are typically completed within 3 to 4 business days, while larger or full-stack
                projects generally take 1 to 2 weeks to complete with proper testing and launch
                preparation.
            </>
        ),
    },
    {
        question: "How is project pricing determined?",
        answer: (
            <>
                Our standard packages are available in the{" "}
                <Link
                    href="#pricing"
                    className="font-medium text-[#0A211F] underline underline-offset-4"
                >
                    pricing section
                </Link>
                . For custom projects, pricing is based on page count, features, integrations, and
                the overall scope of work. If your requirements are specific, we can prepare a
                custom quote that aligns with your project.
            </>
        ),
    },
    {
        question: "Do you provide support after launch?",
        answer: (
            <>
                Yes. We provide post-launch support to resolve technical issues, fix unexpected
                errors, and help keep your website running smoothly. If a critical issue affects
                your site, we aim to respond and address it within 24 hours.
            </>
        ),
    },
    {
        question: "Can we hire your team for custom work?",
        answer: (
            <>
                Yes. We work with clients on one-time builds, website redesigns, and ongoing
                development engagements. Whether you need a complete website, additional features,
                or long-term technical support, our team can be hired based on your requirements.
            </>
        ),
    },
];

export default function Faq() {
    return (
        <section>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:py-20 py-8 flex flex-col md:gap-16 gap-6">
                <div className="flex flex-col gap-4 items-center animate-in fade-in slide-in-from-top-10 duration-1000 delay-100 ease-in-out fill-mode-both">
                    <Badge
                        variant="outline"
                        className="text-sm h-auto py-1 px-3 border-0 outline outline-border"
                    >
                        FAQs
                    </Badge>
                    <h2 className="text-foreground leading-tight text-3xl sm:text-5xl font-medium max-w-xs sm:max-w-2xl mx-auto text-center">
                        Questions clients ask before we start
                    </h2>
                </div>

                <div>
                    <Accordion type="single" collapsible className="w-full flex flex-col gap-6">
                        {FAQ_DATA.map((faq, index) => (
                            <AccordionItem
                                key={`item-${index}`}
                                value={`item-${index}`}
                                className={[
                                    "p-6 border border-border rounded-2xl flex flex-col gap-3 group/item data-[state=open]:bg-[#d8f782]/80 transition-colors animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both",
                                    index === 0 ? "delay-100" : "",
                                    index === 1 ? "delay-200" : "",
                                    index === 2 ? "delay-300" : "",
                                    index === 3 ? "delay-400" : "",
                                    index === 4 ? "delay-500" : "",
                                ].join(" ")}
                            >
                                <AccordionTrigger className="p-0 text-xl font-medium hover:no-underline">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="p-0 text-base text-muted-foreground">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
