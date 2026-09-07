import Link from "next/link";
import Wrapper from "@/app/Wrapper";
import { SITE_CONFIG, SITE_LINKS } from "@/lib/site";
import { buildBreadcrumbSchema, buildPageMetadata, stringifyJsonLd } from "@/lib/seo";
import { Mail, Phone, Scale, Clock, CheckCircle2, ShieldAlert, FileCode2, Briefcase, RefreshCw } from "lucide-react";

export const metadata = buildPageMetadata({
  title: "Terms of Service | Quzex Digital Agency",
  description:
    "Review the Terms of Service for Quzex. Understand the contractual terms, intellectual property ownership, milestone payments, and policies governing our web development services.",
  path: "/terms-of-service",
  keywords: [
    "quzex terms of service",
    "web development contract terms",
    "agency service agreement",
    "code ownership and licensing",
  ],
});

export default function TermsOfServicePage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Terms of Service", path: "/terms-of-service" },
  ]);

  const lastUpdated = "March 2026";

  const sections = [
    {
      icon: <Scale className="w-6 h-6 text-[#0A211F]" />,
      title: "1. Acceptance of Terms",
      content: (
        <div className="space-y-4 text-black/75 text-base md:text-lg leading-relaxed">
          <p>
            By accessing {SITE_CONFIG.primaryDomain} or engaging {SITE_CONFIG.name} for design, engineering, or consulting services, you agree to be bound by these Terms of Service.
          </p>
          <p>
            If you are entering into this agreement on behalf of a company or organization, you represent that you have full legal authority to bind that entity to these terms.
          </p>
        </div>
      ),
    },
    {
      icon: <Briefcase className="w-6 h-6 text-[#0A211F]" />,
      title: "2. Services & Scope of Work",
      content: (
        <div className="space-y-4 text-black/75 text-base md:text-lg leading-relaxed">
          <p>
            {SITE_CONFIG.name} provides custom website development, full-stack web applications, UI/UX design, performance optimization, and API integrations.
          </p>
          <p>
            Each client engagement is governed by a specific Statement of Work (SOW), proposal, or invoice detailing project deliverables, estimated timelines, and pricing. Any requests outside the agreed scope will be evaluated and quoted as separate change orders.
          </p>
        </div>
      ),
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-[#0A211F]" />,
      title: "3. Client Responsibilities & Assets",
      content: (
        <div className="space-y-4 text-black/75 text-base md:text-lg leading-relaxed">
          <p>Successful project delivery relies on collaborative cooperation. Clients agree to:</p>
          <ul className="list-disc pl-5 space-y-2.5 marker:text-[#0A211F]">
            <li>Provide timely feedback, approvals, copy, images, and brand assets necessary for execution.</li>
            <li>Ensure that all media, trademarks, and text supplied do not infringe any third-party copyrights or intellectual property rights.</li>
            <li>Provide necessary third-party API credentials, domain access, or hosting permissions in a timely manner.</li>
          </ul>
        </div>
      ),
    },
    {
      icon: <FileCode2 className="w-6 h-6 text-[#0A211F]" />,
      title: "4. Intellectual Property & Code Ownership",
      content: (
        <div className="space-y-4 text-black/75 text-base md:text-lg leading-relaxed">
          <p>
            <strong className="text-black font-semibold">Client Ownership:</strong> Upon receipt of complete payment for the project, all bespoke designs, codebases, custom components, and assets developed specifically for your project transfer fully to you.
          </p>
          <p>
            <strong className="text-black font-semibold">Open Source & Frameworks:</strong> Deliverables may incorporate open-source libraries (such as React, Next.js, or TailwindCSS) governed by their respective licenses (e.g., MIT, Apache 2.0).
          </p>
          <p>
            <strong className="text-black font-semibold">Portfolio Rights:</strong> Unless otherwise agreed in a Non-Disclosure Agreement (NDA), {SITE_CONFIG.name} reserves the right to showcase finished work in our online portfolio, case studies, and social media channels.
          </p>
        </div>
      ),
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-[#0A211F]" />,
      title: "5. Payments, Deposits & Milestones",
      content: (
        <div className="space-y-4 text-black/75 text-base md:text-lg leading-relaxed">
          <ul className="list-disc pl-5 space-y-2.5 marker:text-[#0A211F]">
            <li>Standard engagements require an upfront deposit before work begins, with remaining balances tied to agreed project milestones.</li>
            <li>Invoices are due upon receipt or according to net terms specified on the invoice.</li>
            <li>Work on subsequent phases or final deployment may be paused if outstanding milestone payments are overdue.</li>
          </ul>
        </div>
      ),
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-[#0A211F]" />,
      title: "6. Revisions & Acceptance",
      content: (
        <div className="space-y-4 text-black/75 text-base md:text-lg leading-relaxed">
          <p>
            Each project milestone includes specified revision rounds (typically 2 to 3 iterations) to refine designs and functionality.
          </p>
          <p>
            Upon delivery of a milestone or final staging link, the client will have a review period (typically 7 to 14 days) to report any discrepancies. If no issues are submitted within this timeframe, the deliverable is deemed accepted.
          </p>
        </div>
      ),
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-[#0A211F]" />,
      title: "7. Warranties & Limitation of Liability",
      content: (
        <div className="space-y-4 text-black/75 text-base md:text-lg leading-relaxed">
          <p>
            We take pride in our craft and guarantee that deliverables will perform in substantial accordance with specifications upon delivery.
          </p>
          <p>
            To the maximum extent permitted by law, {SITE_CONFIG.name} shall not be liable for any indirect, incidental, special, or consequential damages (including loss of profits, downtime, or data corruption) arising from third-party services, external hosting providers, or unauthorized client code modifications.
          </p>
        </div>
      ),
    },
    {
      icon: <Scale className="w-6 h-6 text-[#0A211F]" />,
      title: "8. Termination",
      content: (
        <div className="space-y-4 text-black/75 text-base md:text-lg leading-relaxed">
          <p>
            Either party may terminate a project agreement upon written notice if the other party breaches a material term and fails to cure such breach within 14 days.
          </p>
          <p>
            In the event of cancellation, the client will pay for all work completed up to the termination date, and {SITE_CONFIG.name} will deliver all work-in-progress materials paid for.
          </p>
        </div>
      ),
    },
  ];

  return (
    <Wrapper forceNavbarBackground={true}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumbSchema) }}
      />

      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 text-[#E9F3E6]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-full overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#0A211F]" />
          <div className="absolute inset-0 isolate opacity-65 contain-strict">
            <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(138,247,183,.14)_0,rgba(94,163,131,.06)_50%,rgba(10,33,31,0)_80%)]" />
            <div className="h-320 absolute right-0 top-0 w-80 rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(216,247,130,.10)_0,rgba(94,163,131,.06)_80%,transparent_100%)]" />
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-[#8AF7B7] backdrop-blur mb-6">
            <Clock className="w-3.5 h-3.5" />
            Last Updated: {lastUpdated}
          </div>

          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-[#8AF7B7] mb-6">
            Terms of Service
          </h1>

          <p className="text-lg md:text-xl text-[#E9F3E6]/90 leading-relaxed">
            These terms govern the web development, software engineering, and digital services provided by {SITE_CONFIG.name}. We believe in transparent, collaborative partnerships built on trust.
          </p>
        </div>
      </section>

      <section className="relative py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-6 space-y-12">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex items-center gap-3">
                {section.icon}
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A211F]">
                  {section.title}
                </h2>
              </div>
              <div>{section.content}</div>
            </div>
          ))}

          <div className="pt-6 space-y-4 border-t border-black/10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0A211F]">
              9. Questions Regarding Our Terms?
            </h2>
            <p className="text-black/75 text-base md:text-lg leading-relaxed">
              If you have questions about these terms or wish to discuss custom contract stipulations or an enterprise NDA, our team is happy to assist:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={SITE_LINKS.mailto}
                className="inline-flex items-center gap-2 text-[#0A211F] hover:underline text-base font-medium"
              >
                <Mail className="w-5 h-5 text-[#0A211F]" />
                {SITE_CONFIG.email}
              </a>
              <span className="hidden sm:inline text-black/30">·</span>
              <a
                href={SITE_LINKS.tel}
                className="inline-flex items-center gap-2 text-[#0A211F] hover:underline text-base font-medium"
              >
                <Phone className="w-5 h-5 text-[#0A211F]" />
                {SITE_CONFIG.phone}
              </a>
              <span className="hidden sm:inline text-black/30">·</span>
              <Link
                href="/contact"
                className="inline-flex items-center text-[#0A211F] hover:underline text-base font-medium"
              >
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
}
