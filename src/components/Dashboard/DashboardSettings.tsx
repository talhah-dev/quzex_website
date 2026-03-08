import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG, SITE_LINKS } from "@/lib/site";

const settingsSections = [
  {
    title: "Brand Information",
    description: "Current website identity details used across your admin and public pages.",
    fields: [
      { id: "website-name", label: "Website Name", value: SITE_CONFIG.name },
      { id: "owner-name", label: "Owner Name", value: SITE_CONFIG.ownerName },
      { id: "primary-domain", label: "Primary Domain", value: SITE_CONFIG.primaryDomain },
    ],
  },
  {
    title: "Contact Details",
    description: "Current contact information used in your website footer and contact area.",
    fields: [
      { id: "email-address", label: "Email Address", value: SITE_CONFIG.email },
      { id: "phone-number", label: "Phone Number", value: SITE_CONFIG.phone },
      { id: "whatsapp-link", label: "WhatsApp Link", value: SITE_LINKS.whatsapp },
    ],
  },
  {
    title: "Social Profiles",
    description: "Current social profile links connected to your website.",
    fields: [
      { id: "instagram-link", label: "Instagram", value: SITE_LINKS.instagram },
      { id: "linkedin-link", label: "LinkedIn", value: SITE_LINKS.linkedin },
      { id: "facebook-link", label: "Facebook", value: SITE_LINKS.facebook },
    ],
  },
] as const;

export default function DashboardSettings() {
  return (
    <div className="grid gap-6">
      <section className="overflow-hidden rounded-xl border border-[#0A211F]/10 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)] sm:p-8">
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <Badge
              variant="outline"
              className="rounded-full border-[#0A211F]/12 bg-[#EDF6E8] px-3 py-1 text-[#0A211F]"
            >
              Settings
            </Badge>
            <div className="space-y-2">
              <h1 className="text-2xl font-medium leading-tight text-[#0A211F] sm:text-4xl">
                Website settings
              </h1>
              <p className="max-w-3xl text-sm leading-relaxed text-[#0A211F]/68 sm:text-base">
                Review your website name, business contact details, and social profile links from
                one admin settings page.
              </p>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            {settingsSections.map((section) => (
              <article
                key={section.title}
                className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5"
              >
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-[#0A211F]">{section.title}</h2>
                  <p className="text-sm leading-relaxed text-[#0A211F]/62">
                    {section.description}
                  </p>
                </div>

                <div className="mt-5 grid gap-4">
                  {section.fields.map((field) => (
                    <div
                      key={field.id}
                      className="rounded-xl border border-[#0A211F]/10 bg-white px-4 py-3"
                    >
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#0A211F]/42">
                        {field.label}
                      </p>
                      <p className="mt-2 break-all text-sm font-medium text-[#0A211F]">
                        {field.value}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
