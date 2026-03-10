"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImagePlus, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClientLogo } from "@/lib/api/client-logo";
import { compressImageFile } from "@/lib/compress-image";
import { uploadFile } from "@/lib/api/upload";
import type { UploadClientLogoPayload } from "@/types";

export default function ClientLogoUploadDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState<UploadClientLogoPayload["file"] | null>(null);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: UploadClientLogoPayload) => {
      const optimizedFile = await compressImageFile(payload.file, 100);

      const uploadedFile = await uploadFile({
        file: optimizedFile,
        folder: "client-logos",
      });

      return createClientLogo({
        name: payload.name,
        url: uploadedFile.url,
      });
    },
    onSuccess: (data) => {
      setName("");
      setFile(null);
      setOpen(false);
      toast.success(data?.message || "Client logo uploaded successfully.");
      queryClient.invalidateQueries({ queryKey: ["admin-client-logos"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong.");
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      toast.error("Please select a logo image.");
      return;
    }

    mutate({
      name,
      file,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="inline-flex items-center gap-2 self-start rounded-xl bg-[#0A211F] px-4 py-2 text-[#E9F3E6] hover:bg-[#143531]"
        >
          <ImagePlus className="size-4" />
          <span>Upload New Logo</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Upload client logo</DialogTitle>
            <DialogDescription>
              Add a new client logo to the dashboard library using your Vercel Blob upload setup.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5 grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="client-logo-name">Logo name</Label>
              <Input
                id="client-logo-name"
                name="logo_name"
                placeholder="Client logo name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="client-logo-file">Logo file</Label>
              <label
                htmlFor="client-logo-file"
                className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#0A211F]/18 bg-[#f7f9f2] px-4 py-8 text-center transition-colors hover:border-[#0A211F]/28 hover:bg-[#EDF6E8]"
              >
                <div className="inline-flex rounded-xl bg-[#0A211F] p-3 text-[#E9F3E6]">
                  <UploadCloud className="size-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-[#0A211F]">Choose logo file</p>
                  <p className="text-xs text-[#0A211F]/58">
                    PNG, SVG, or WEBP formats are supported. Raster images are optimized before
                    upload.
                  </p>
                  {file ? (
                    <p className="text-xs font-medium text-[#0A211F]">{file.name}</p>
                  ) : null}
                </div>
                <input
                  id="client-logo-file"
                  name="logo_file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                  required
                />
              </label>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline" className="border-[#0A211F]/12 text-[#0A211F]">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-[#0A211F] text-[#E9F3E6] hover:bg-[#143531]"
            >
              {isPending ? "Uploading..." : "Save Logo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
