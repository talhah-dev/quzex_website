"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
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
import { createContact } from "@/lib/api/contact";
import { SERVICE_ITEMS } from "@/lib/services";
import { SITE_CONFIG, SITE_LINKS } from "@/lib/site";
import type { CreateContactInquiryPayload } from "@/types";
import { ArrowUpRight } from "lucide-react";

export default function ContactFormSection() {
  const [name, setName] = useState<CreateContactInquiryPayload["name"]>("");
  const [email, setEmail] = useState<CreateContactInquiryPayload["email"]>("");
  const [phone, setPhone] = useState<CreateContactInquiryPayload["phone"]>("");
  const [service, setService] = useState<CreateContactInquiryPayload["service"]>("");
  const [message, setMessage] = useState<CreateContactInquiryPayload["message"]>("");

  const { mutate, isPending } = useMutation({
    mutationFn: createContact,
    onSuccess: (data) => {
      setName("");
      setEmail("");
      setPhone("");
      setService("");
      setMessage("");
      toast.success(data?.message || "Message sent successfully.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong.");
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload: CreateContactInquiryPayload = {
      name,
      email,
      phone,
      service,
      message,
    };

    mutate(payload);
  }

  return (
    <section className="w-full text-[#0A211F]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-8 flex flex-col gap-2">
              <Badge
                variant="outline"
                className="w-fit rounded-full border-[#0A211F]/20 bg-[#EDF6E8]"
              >
                Contact us
              </Badge>
              <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
                Tell us about your project
              </h2>
              <p className="text-[#0A211F]/70">
                Share your requirements and we will get back with the best plan for your website.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
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
                    value={name}
                    onChange={(event) => setName(event.target.value)}
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
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
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
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger
                      id="contact-service"
                      className="mt-1 h-12 w-full rounded-xl border border-[#0A211F]/20 bg-transparent px-4 text-sm text-[#0A211F] shadow-none focus-visible:border-[#0A211F]/40 focus-visible:ring-2 focus-visible:ring-[#8AF7B7]/35"
                    >
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-[#0A211F]/10 bg-[#FCFDF8] text-[#0A211F] shadow-[0_20px_45px_-30px_rgba(10,33,31,0.4)]">
                      <SelectGroup>
                        <SelectLabel>Services</SelectLabel>
                        {SERVICE_ITEMS.map((item) => (
                          <SelectItem key={item.id} value={item.title}>
                            {item.title}
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
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
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
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="mt-1 w-full resize-none rounded-xl border border-[#0A211F]/20 bg-transparent px-4 py-3 text-sm text-[#0A211F] placeholder:text-[#0A211F]/45 outline-none transition focus:border-[#0A211F]/40 focus:ring-2 focus:ring-[#8AF7B7]/35"
                  placeholder="Tell us what you want to build..."
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="group relative inline-flex h-12 w-fit cursor-pointer items-center overflow-hidden rounded-full border border-white/15 bg-[#0A211F] p-1 ps-6 pe-14 text-sm font-medium text-[#E9F3E6] transition-all duration-500 hover:bg-[#0F2D2A] hover:ps-14 hover:pe-6 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="relative z-10 transition-all duration-500">
                  {isPending ? "Sending..." : "Send Now"}
                </span>
                <span className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#D8F782] transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                  <span className="text-sm font-semibold text-[#0A211F]">
                    <ArrowUpRight size={16} />
                  </span>
                </span>
              </button>
            </form>
          </div>

          <aside className="lg:col-span-4 lg:pl-4">
            <div className="flex h-full flex-col justify-between gap-14">
              <div className="space-y-4 text-sm font-medium md:text-base">
                <a
                  href={SITE_LINKS.whatsapp}
                  className="block text-[#0A211F]/75 transition-colors hover:text-[#0A211F]"
                  target="_blank"
                  rel="noreferrer"
                >
                  Whatsapp
                </a>
                <a
                  href={SITE_LINKS.facebook}
                  className="block text-[#0A211F]/75 transition-colors hover:text-[#0A211F]"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
                <a
                  href={SITE_LINKS.linkedin}
                  className="block text-[#0A211F]/75 transition-colors hover:text-[#0A211F]"
                  target="_blank"
                  rel="noreferrer"
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
