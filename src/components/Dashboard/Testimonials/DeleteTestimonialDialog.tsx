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
import { deleteTestimonial } from "@/lib/api/testimonials";

type DeleteTestimonialDialogProps = {
  testimonialId: string;
  testimonialName: string;
};

export default function DeleteTestimonialDialog({
  testimonialId,
  testimonialName,
}: DeleteTestimonialDialogProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteTestimonial(testimonialId),
    onSuccess: (data) => {
      setOpen(false);
      toast.success(data.message || "Review deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Unable to delete review.");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="destructive"
          className="cursor-pointer"
        >
          <Trash2 className="size-3.5" />
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF5F5]">
            <AlertTriangleIcon className="size-5 text-[#C24141]" />
          </div>

          <DialogHeader>
            <DialogTitle>Delete review</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <span className="font-medium text-[#0A211F]">{testimonialName}</span>? This action cannot be undone.
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
            {isPending ? "Deleting..." : "Delete review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
