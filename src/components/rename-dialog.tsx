"use client";

import { ChangeEvent, FormEvent, MouseEvent, ReactNode, useState } from "react";
import { Id } from "../../convex/_generated/dataModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

interface RenameDialogProps {
  documentId: Id<"documents">;
  initialTitle: string;
  children: ReactNode;
}

export const RenameDialog = ({
  children,
  documentId,
  initialTitle,
}: RenameDialogProps) => {
  const update = useMutation(api.documents.updateById);

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(initialTitle);
  const [open, setOpen] = useState<boolean>(false);

  const { toast } = useToast();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    update({ id: documentId, title: title.trim() || "Untitled" })
      .then(() =>
        toast({
          title: "Successfully updated!",
          description: "The document name was successfully updated.",
        })
      )
      .catch(() =>
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
      )
      .finally(() => {
        setOpen(false);
        setIsUpdating(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Rename Document</DialogTitle>
            <DialogDescription>
              Enter a new name for this document.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              value={title}
              placeholder="Document name"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              disabled={isUpdating}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              onClick={(e: MouseEvent<HTMLButtonElement>) =>
                e.stopPropagation()
              }
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
