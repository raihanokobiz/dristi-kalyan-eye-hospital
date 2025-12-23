"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MoreHorizontal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { confirmation } from "@/components/modals/confirm-modal";
import { deleteAction } from "./actions";
import { TSubscribe } from "./type";


interface Props {
  item: TSubscribe;
}

export const DetailsSheet: React.FC<Props> = ({ item }) => {
  const { toast } = useToast();
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const handleDeleteClick = async () => {
    const confirmed = await confirmation(
      "Are you sure you want to delete this item?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      await deleteAction(String(item._id));

      toast({
        title: "Item deleted successfully",
      });

      setSheetOpen(false);
    } catch (error) {
      toast({
        title: "Failed to delete item",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-[400px]">
        <SheetHeader>
          <SheetTitle>Delete Category</SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-4">
            This action cannot be undone.
          </p>

          <Button
            variant="destructive"
            onClick={handleDeleteClick}
            loading={deleting}
            className="w-full"
          >
            Delete
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
