"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PencilLine } from "lucide-react";
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
import { updateClientLogo } from "@/lib/api/client-logo";
import type { ClientLogoRecord } from "@/types";

type EditClientLogoDialogProps = {
  logo: ClientLogoRecord;
};

export default function EditClientLogoDialog({
  logo,
}: EditClientLogoDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(logo.name);
  const [url, setUrl] = useState(logo.src);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      updateClientLogo({
        id: logo._id,
        name,
        url,
      }),
    onSuccess: (data) => {
      setOpen(false);
      toast.success(data.message || "Client logo updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["admin-client-logos"] });
      queryClient.invalidateQueries({ queryKey: ["client-logos"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Unable to update client logo.");
    },
  });

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (nextOpen) {
      setName(logo.name);
      setUrl(logo.src);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    mutate();
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="inline-flex items-center gap-2 rounded-lg border border-[#0A211F]/10 bg-white px-3 py-2 text-xs font-medium text-[#0A211F] hover:bg-[#EDF6E8]"
        >
          <PencilLine className="size-3.5" />
          <span>Edit</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit client logo</DialogTitle>
            <DialogDescription>
              Update the logo name or image URL for this client logo.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5 grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor={`edit-client-logo-name-${logo._id}`}>Logo name</Label>
              <Input
                id={`edit-client-logo-name-${logo._id}`}
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor={`edit-client-logo-url-${logo._id}`}>Logo URL</Label>
              <Input
                id={`edit-client-logo-url-${logo._id}`}
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                required
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-[#0A211F] text-[#E9F3E6] hover:bg-[#143531]"
            >
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
