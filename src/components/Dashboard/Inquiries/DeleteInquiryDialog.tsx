"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertTriangleIcon, Trash2 } from "lucide-react";
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
import { deleteInquiry } from "@/lib/api/contact";

type DeleteInquiryDialogProps = {
  inquiryId: string;
  inquiryName: string;
};

export default function DeleteInquiryDialog({
  inquiryId,
  inquiryName,
}: DeleteInquiryDialogProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteInquiry(inquiryId),
    onSuccess: (data) => {
      setOpen(false);
      toast.success(data.message || "Inquiry deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["admin-inquiries"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Unable to delete inquiry.");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="inline-flex items-center gap-2 rounded-lg border border-[#C24141]/15 bg-[#FFF5F5] px-3 py-2 text-xs font-medium text-[#C24141] hover:bg-[#FEEBEB]"
        >
          <Trash2 className="size-3.5" />
          <span>Delete</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF5F5]">
            <AlertTriangleIcon className="size-5 text-[#C24141]" />
          </div>

          <DialogHeader>
            <DialogTitle>Delete enquiry</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the enquiry from{" "}
              <span className="font-medium text-[#0A211F]">{inquiryName}</span>? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            type="button"
            variant="destructive"
            disabled={isPending}
            onClick={() => mutate()}
          >
            {isPending ? "Deleting..." : "Delete enquiry"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
