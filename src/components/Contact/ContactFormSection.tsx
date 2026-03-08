import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SERVICE_ITEMS } from "@/lib/services";
import { AnimatedButton } from "../ui/AnimatedButton";
import { SITE_CONFIG, SITE_LINKS } from "@/lib/site";

export default function ContactFormSection() {
  return (
    <section className="w-full text-[#0A211F]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-8 flex flex-col gap-2">
              <Badge variant="outline" className="w-fit rounded-full border-[#0A211F]/20 bg-[#EDF6E8]">
                Contact us
              </Badge>
              <h2 className="text-3xl font-semibold mt-2 md:text-4xl">
                Tell us about your project
              </h2>
              <p className="text-[#0A211F]/70">
                Share your requirements and we will get back with the best plan for your website.
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-sm font-medium">
                    Name*
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    className="mt-1 h-12 w-full rounded-xl border border-[#0A211F]/20 bg-transparent px-4 text-sm text-[#0A211F] placeholder:text-[#0A211F]/45 outline-none transition focus:border-[#0A211F]/40 focus:ring-2 focus:ring-[#8AF7B7]/35"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-phone" className="text-sm font-medium">
                    Phone*
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    className="mt-1 h-12 w-full rounded-xl border border-[#0A211F]/20 bg-transparent px-4 text-sm text-[#0A211F] placeholder:text-[#0A211F]/45 outline-none transition focus:border-[#0A211F]/40 focus:ring-2 focus:ring-[#8AF7B7]/35"
                    placeholder={SITE_CONFIG.phone}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="contact-service" className="text-sm font-medium">
                    Service Interested In*
                  </label>
                  <Select name="service_interest">
                    <SelectTrigger
                      id="contact-service"
                      className="mt-1 h-12 w-full rounded-xl border border-[#0A211F]/20 bg-transparent px-4 text-sm text-[#0A211F] shadow-none focus-visible:border-[#0A211F]/40 focus-visible:ring-2 focus-visible:ring-[#8AF7B7]/35"
                    >
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-[#0A211F]/10 bg-[#FCFDF8] text-[#0A211F] shadow-[0_20px_45px_-30px_rgba(10,33,31,0.4)]">
                      <SelectGroup>
                        <SelectLabel>Services</SelectLabel>
                        {SERVICE_ITEMS.map((service) => (
                          <SelectItem key={service.id} value={service.title}>
                            {service.title}
                          </SelectItem>
                        ))}
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-sm font-medium">
                    Email*
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 h-12 w-full rounded-xl border border-[#0A211F]/20 bg-transparent px-4 text-sm text-[#0A211F] placeholder:text-[#0A211F]/45 outline-none transition focus:border-[#0A211F]/40 focus:ring-2 focus:ring-[#8AF7B7]/35"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-sm font-medium">
                  Message*
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  className="w-full resize-none rounded-xl border mt-1 border-[#0A211F]/20 bg-transparent px-4 py-3 text-sm text-[#0A211F] placeholder:text-[#0A211F]/45 outline-none transition focus:border-[#0A211F]/40 focus:ring-2 focus:ring-[#8AF7B7]/35"
                  placeholder="Tell us what you want to build..."
                />
              </div>

              <AnimatedButton color="dark" href="#">
                Send Now
              </AnimatedButton>

            </form>
          </div>

          <aside className="lg:col-span-4 lg:pl-4">
            <div className="flex h-full flex-col justify-between gap-14">
              <div className="space-y-4 text-sm font-medium md:text-base">
                <a
                  href="#"
                  className="block text-[#0A211F]/75 transition-colors hover:text-[#0A211F]"
                >
                  Whatsapp
                </a>
                <a
                  href="#"
                  className="block text-[#0A211F]/75 transition-colors hover:text-[#0A211F]"
                >
                  facebook
                </a>
                <a
                  href="#"
                  className="block text-[#0A211F]/75 transition-colors hover:text-[#0A211F]"
                >
                  LinkedIn
                </a>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                <div className="border-b border-[#0A211F]/25 pb-3">
                  <p className="text-sm text-[#0A211F]/60">Email</p>
                  <a
                    href={SITE_LINKS.mailto}
                    className="mt-1 block text-base font-semibold text-[#0A211F]/85 transition-colors hover:text-[#0A211F]"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
                <div className="border-b border-[#0A211F]/25 pb-3">
                  <p className="text-sm text-[#0A211F]/60">Phone</p>
                  <a
                    href={SITE_LINKS.tel}
                    className="mt-1 block text-base font-semibold text-[#0A211F]/85 transition-colors hover:text-[#0A211F]"
                  >
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
