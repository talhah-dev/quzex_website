import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const FAQ_DATA = [
    {
        question: "What do you build at Quzex?",
        answer:
            "I build modern websites and web apps—landing pages, dashboards, SaaS MVPs, and custom APIs. Most projects use Next.js on the frontend and Go (Fiber) on the backend when needed.",
    },
    {
        question: "What’s your typical timeline?",
        answer:
            "Small websites usually take 3–7 days. Landing pages and marketing sites take 1–2 weeks. MVPs typically take 2–6 weeks depending on scope, integrations, and revisions.",
    },
    {
        question: "How do you price projects?",
        answer:
            "Pricing is based on scope, complexity, and delivery timeline. I can work on a fixed price for clearly defined projects, or hourly/weekly for ongoing development and iterations.",
    },
    {
        question: "Do you provide support after launch?",
        answer:
            "Yes. I offer post-launch support for bug fixes, improvements, and new features. If you want ongoing updates, I can set up a monthly maintenance plan.",
    },
    {
        question: "How will communication and updates work?",
        answer:
            "You’ll get regular updates with clear milestones. I share progress frequently (daily or a few times per week), and we can coordinate via your preferred channel (Upwork/Fiverr chat, email, Slack, or WhatsApp).",
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
                                <AccordionContent className="p-0 text-muted-foreground text-base">
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