"use client";

import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import { Id } from "../../../../convex/_generated/dataModel";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "@/hooks/use-toast";
import { useStatus } from "@liveblocks/react";
import { LoaderIcon } from "lucide-react";

interface DocumentInputProps {
  title: string;
  id: Id<"documents">;
}

export const DocumentInput = ({ title, id }: DocumentInputProps) => {
  const status = useStatus();
  const [value, setValue] = useState<string>(title);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const mutate = useMutation(api.documents.updateById);

  const debounceUpdate = useDebounce((newValue: string) => {
    if (newValue === title) return;

    setIsPending(true);
    mutate({ id, title: newValue })
      .then(() => {
        toast({
          title: "Successfully updated!",
          description: "The document title has been successfully updated.",
        });
        setIsEditing(false);
      })
      .catch(() =>
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
      )
      .finally(() => setIsPending(false));
  }, 2000);

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
    debounceUpdate(target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPending(true);
    mutate({ id, title: value })
      .then(() => {
        toast({
          title: "Successfully updated!",
          description: "The document title has been successfully updated.",
        });
        setIsEditing(false);
      })
      .catch(() =>
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
      )
      .finally(() => setIsPending(false));
  };

  const showLoader =
    isPending || status === "connecting" || status === "reconnecting";
  const showError = status === "disconnected";

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="relative w-fit max-w-[50ch]">
          <span className="invisible whitespace-pre px-1.5 text-lg">
            {value || " "}
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            onBlur={() => setIsEditing(false)}
            className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
          className="text-lg px-1.5 cursor-pointer truncate"
        >
          {title}
        </span>
      )}
      {showError && <BsCloudSlash className="size-4" />}
      {!showError && !showLoader && <BsCloudCheck className="size-4" />}
      {showLoader && (
        <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
      )}
    </div>
  );
};
