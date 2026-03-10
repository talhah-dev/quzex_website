"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAdminSettings, updateAdminSettings } from "@/lib/api/settings";
import { SITE_CONFIG } from "@/lib/site";
import type { UpsertSiteSettingsPayload } from "@/types";

const initialFormState: UpsertSiteSettingsPayload = {
  ownerName: "",
  email: "",
  phone: "",
  phoneE164: "",
  whatsapp: "",
  instagram: "",
  linkedin: "",
  facebook: "",
};

function SettingsField({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: keyof UpsertSiteSettingsPayload;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="bg-white"
      />
    </div>
  );
}

export default function DashboardSettings() {
  const queryClient = useQueryClient();
  const [draftData, setDraftData] = useState<UpsertSiteSettingsPayload | null>(null);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: getAdminSettings,
  });
  const formData: UpsertSiteSettingsPayload = draftData ?? {
    ownerName: data?.ownerName || initialFormState.ownerName,
    email: data?.email || initialFormState.email,
    phone: data?.phone || initialFormState.phone,
    phoneE164: data?.phoneE164 || initialFormState.phoneE164,
    whatsapp: data?.whatsapp || initialFormState.whatsapp,
    instagram: data?.instagram || initialFormState.instagram,
    linkedin: data?.linkedin || initialFormState.linkedin,
    facebook: data?.facebook || initialFormState.facebook,
  };

  const { mutate, isPending } = useMutation({
    mutationFn: updateAdminSettings,
    onSuccess: (response) => {
      toast.success(response.message || "Settings updated successfully.");
      setDraftData(null);
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Unable to update website settings.");
    },
  });

  const handleChange = (field: keyof UpsertSiteSettingsPayload, value: string) => {
    setDraftData((prev) => ({
      ...(prev ?? formData),
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(formData);
  };

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
                Update the contact information and social profile links used across your website.
              </p>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <article className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-[#0A211F]">Brand Information</h2>
                <p className="text-sm leading-relaxed text-[#0A211F]/62">
                  Fixed website details currently used across your public pages.
                </p>
              </div>

              <div className="mt-5 grid gap-4">
                <div className="rounded-xl border border-[#0A211F]/10 bg-white px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#0A211F]/42">
                    Website Name
                  </p>
                  <p className="mt-2 break-all text-sm font-medium text-[#0A211F]">
                    {SITE_CONFIG.name}
                  </p>
                </div>
                <div className="rounded-xl border border-[#0A211F]/10 bg-white px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#0A211F]/42">
                    Primary Domain
                  </p>
                  <p className="mt-2 break-all text-sm font-medium text-[#0A211F]">
                    {SITE_CONFIG.primaryDomain}
                  </p>
                </div>
              </div>
            </article>

            <form onSubmit={handleSubmit} className="xl:col-span-2">
              <div className="grid gap-6">
                <article className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-[#0A211F]">Contact Details</h2>
                    <p className="text-sm leading-relaxed text-[#0A211F]/62">
                      Manage the owner and contact information used in your website footer and
                      contact area.
                    </p>
                  </div>

                  {isLoading ? (
                    <div className="mt-5 rounded-xl border border-[#0A211F]/10 bg-white px-4 py-8 text-sm text-[#0A211F]/62">
                      Loading settings...
                    </div>
                  ) : isError ? (
                    <div className="mt-5 rounded-xl border border-[#C24141]/15 bg-[#FFF5F5] px-4 py-8 text-sm text-[#C24141]">
                      Unable to load website settings right now.
                    </div>
                  ) : (
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <SettingsField
                        id="ownerName"
                        label="Owner Name"
                        value={formData.ownerName}
                        onChange={(value) => handleChange("ownerName", value)}
                        placeholder="Enter owner name"
                      />
                      <SettingsField
                        id="email"
                        label="Email Address"
                        value={formData.email}
                        onChange={(value) => handleChange("email", value)}
                        placeholder="Enter email address"
                      />
                      <SettingsField
                        id="phone"
                        label="Phone Number"
                        value={formData.phone}
                        onChange={(value) => handleChange("phone", value)}
                        placeholder="Enter display phone number"
                      />
                      <SettingsField
                        id="phoneE164"
                        label="Phone E164"
                        value={formData.phoneE164 || ""}
                        onChange={(value) => handleChange("phoneE164", value)}
                        placeholder="Enter E164 number"
                      />
                      <div className="md:col-span-2">
                        <SettingsField
                          id="whatsapp"
                          label="WhatsApp Link"
                          value={formData.whatsapp}
                          onChange={(value) => handleChange("whatsapp", value)}
                          placeholder="Enter WhatsApp link"
                        />
                      </div>
                    </div>
                  )}
                </article>

                <article className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-[#0A211F]">Social Profiles</h2>
                    <p className="text-sm leading-relaxed text-[#0A211F]/62">
                      Update the social profile links shown on your website.
                    </p>
                  </div>

                  {!isLoading && !isError ? (
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <SettingsField
                        id="instagram"
                        label="Instagram"
                        value={formData.instagram}
                        onChange={(value) => handleChange("instagram", value)}
                        placeholder="Enter Instagram URL"
                      />
                      <SettingsField
                        id="linkedin"
                        label="LinkedIn"
                        value={formData.linkedin}
                        onChange={(value) => handleChange("linkedin", value)}
                        placeholder="Enter LinkedIn URL"
                      />
                      <div className="md:col-span-2">
                        <SettingsField
                          id="facebook"
                          label="Facebook"
                          value={formData.facebook}
                          onChange={(value) => handleChange("facebook", value)}
                          placeholder="Enter Facebook URL"
                        />
                      </div>
                    </div>
                  ) : null}
                </article>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isPending || isLoading || isError}
                    className="h-11 rounded-xl bg-[#0A211F] px-6 text-[#E9F3E6] hover:bg-[#0A211F]/92"
                  >
                    {isPending ? "Saving..." : "Save Settings"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
