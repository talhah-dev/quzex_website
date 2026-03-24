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
import { deletePortfolioCard } from "@/lib/api/portfolio";

type DeletePortfolioDialogProps = {
  portfolioId: string;
  portfolioTitle: string;
};

export default function DeletePortfolioDialog({
  portfolioId,
  portfolioTitle,
}: DeletePortfolioDialogProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deletePortfolioCard(portfolioId),
    onSuccess: (data) => {
      setOpen(false);
      toast.success(data.message || "Portfolio card deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["portfolio-cards"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Unable to delete portfolio card.");
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
            <DialogTitle>Delete portfolio item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium text-[#0A211F]">{portfolioTitle}</span>? This action
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
            {isPending ? "Deleting..." : "Delete portfolio"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


