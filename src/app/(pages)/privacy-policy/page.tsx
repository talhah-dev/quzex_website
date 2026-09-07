import Link from "next/link";
import Wrapper from "@/app/Wrapper";
import { SITE_CONFIG, SITE_LINKS } from "@/lib/site";
import { buildBreadcrumbSchema, buildPageMetadata, stringifyJsonLd } from "@/lib/seo";
import { Mail, Phone, ShieldCheck, Clock, FileText, Lock, Eye, Globe } from "lucide-react";

export const metadata = buildPageMetadata({
  title: "Privacy Policy | Quzex Digital Agency",
  description:
    "Read the Quzex Privacy Policy. Learn how we collect, protect, and handle your data and project information when using our web development and digital services.",
  path: "/privacy-policy",
  keywords: [
    "quzex privacy policy",
    "web agency privacy terms",
    "client data protection",
    "confidentiality agreement",
  ],
});

export default function PrivacyPolicyPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy-policy" },
  ]);

  const lastUpdated = "March 2026";

  const sections = [
    {
      icon: <Eye className="w-6 h-6 text-[#0A211F]" />,
      title: "1. Information We Collect",
      content: (
        <div className="space-y-4 text-black/75 text-base md:text-lg leading-relaxed">
          <p>
            When you visit {SITE_CONFIG.name} ({SITE_CONFIG.primaryDomain}) or interact with our services, we may collect the following types of information:
          </p>
          <ul className="list-disc pl-5 space-y-2.5 marker:text-[#0A211F]">
            <li>
              <strong className="text-black font-semibold">Personal & Contact Details:</strong> Name, email address, phone/WhatsApp number, company name, and project specifications provided when submitting contact forms, requesting quotes, or scheduling consultations.
            </li>
            <li>
              <strong className="text-black font-semibold">Project Materials:</strong> Technical requirements, wireframes, design files, repository links, or credentials shared voluntarily for project execution.
            </li>
            <li>
              <strong className="text-black font-semibold">Technical & Usage Data:</strong> Anonymized browser type, operating system, referring URLs, pages visited, and session duration captured to understand platform usage.
            </li>
          </ul>
        </div>
      ),
    },
    {
      icon: <FileText className="w-6 h-6 text-[#0A211F]" />,
      title: "2. How We Use Your Information",
      content: (
        <div className="space-y-4 text-black/75 text-base md:text-lg leading-relaxed">
          <p>We use the data we collect solely for legitimate business purposes:</p>
          <ul className="list-disc pl-5 space-y-2.5 marker:text-[#0A211F]">
            <li>To evaluate project scopes, deliver proposals, and prepare contracts.</li>
            <li>To design, build, test, and deploy website and application deliverables.</li>
            <li>To provide customer support, ongoing maintenance, and critical technical notices.</li>
            <li>To monitor website performance, prevent security threats, and enhance user experience.</li>
          </ul>
        </div>
      ),
    },
    {
      icon: <Globe className="w-6 h-6 text-[#0A211F]" />,
      title: "3. Analytics & Tracking Technologies",
      content: (
        <div className="space-y-4 text-black/75 text-base md:text-lg leading-relaxed">
          <p>
            We use Google Analytics to measure aggregate website traffic patterns. Google Analytics collects anonymized data such as device type, approximate city/country, and browsing behavior.
          </p>
          <p>
            This data contains no personally identifying information (such as your name, passwords, or financial details). You can manage or disable cookies at any time through your browser settings.
          </p>
        </div>
      ),
    },
    {
      icon: <Lock className="w-6 h-6 text-[#0A211F]" />,
      title: "4. Client Confidentiality & Intellectual Property",
      content: (
        <div className="space-y-4 text-black/75 text-base md:text-lg leading-relaxed">
          <p>
            We treat all proprietary client information, trade secrets, database records, and software architectures with strict confidentiality.
          </p>
          <p>
            We will readily execute a mutual Non-Disclosure Agreement (NDA) upon request prior to discussing sensitive software projects or internal business operations.
          </p>
        </div>
      ),
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#0A211F]" />,
      title: "5. Information Sharing & Third Parties",
      content: (
        <div className="space-y-4 text-black/75 text-base md:text-lg leading-relaxed">
          <p>
            We never sell, rent, or trade your personal information to third-party marketers. Information is only shared under the following limited circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-2.5 marker:text-[#0A211F]">
            <li>
              <strong className="text-black font-semibold">Infrastructure Providers:</strong> Trusted third-party vendors (such as hosting servers, email delivery services, or database cloud providers) strictly necessary to run our agency operations.
            </li>
            <li>
              <strong className="text-black font-semibold">Legal Compliance:</strong> When required by applicable law, court order, or official governmental regulation.
            </li>
          </ul>
        </div>
      ),
    },
    {
      icon: <Lock className="w-6 h-6 text-[#0A211F]" />,
      title: "6. Data Security & Retention",
      content: (
        <div className="space-y-4 text-black/75 text-base md:text-lg leading-relaxed">
          <p>
            We implement industry-standard SSL encryption, secure access credentials, and restricted environment controls to safeguard your data against unauthorized access, alteration, or disclosure.
          </p>
          <p>
            We retain contact and project records only as long as necessary to fulfill service agreements, provide post-launch support, or meet tax and legal record-keeping obligations.
          </p>
        </div>
      ),
    },
    {
      icon: <FileText className="w-6 h-6 text-[#0A211F]" />,
      title: "7. Your Rights & Inquiries",
      content: (
        <div className="space-y-4 text-black/75 text-base md:text-lg leading-relaxed">
          <p>Depending on your location, you have the right to:</p>
          <ul className="list-disc pl-5 space-y-2.5 marker:text-[#0A211F]">
            <li>Request a copy of the personal data we hold about you.</li>
            <li>Request rectification of inaccurate or outdated information.</li>
            <li>Request the deletion of your personal data from our contact databases.</li>
            <li>Withdraw consent to receiving promotional communications at any time.</li>
          </ul>
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
            Privacy Policy
          </h1>

          <p className="text-lg md:text-xl text-[#E9F3E6]/90 leading-relaxed">
            At {SITE_CONFIG.name}, we value your privacy and trust. This policy explains how we collect, safeguard, and use your data when you interact with our website and development services.
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
              8. Contact Us Regarding Your Privacy
            </h2>
            <p className="text-black/75 text-base md:text-lg leading-relaxed">
              If you have any questions, concerns, or requests regarding this Privacy Policy or how your data is handled, feel free to contact us:
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
                Contact Form →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
}
