"use client";

import { ImagePlus, UploadCloud } from "lucide-react";
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

export default function ClientLogoUploadDialog() {
  return (
    <Dialog>
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
        <DialogHeader>
          <DialogTitle>Upload client logo</DialogTitle>
          <DialogDescription>
            Add a new client logo to the dashboard library. This dialog is static for now and can
            later connect to a real upload flow.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="client-logo-name">Logo name</Label>
            <Input id="client-logo-name" name="logo_name" placeholder="Client logo name" />
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
                  PNG, SVG, or WEBP formats can be connected here later.
                </p>
              </div>
              <input id="client-logo-file" name="logo_file" type="file" className="hidden" />
            </label>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="border-[#0A211F]/12 text-[#0A211F]">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" className="bg-[#0A211F] text-[#E9F3E6] hover:bg-[#143531]">
            Save Logo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
