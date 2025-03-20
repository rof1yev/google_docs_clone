"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { templates } from "@/constants";
import { ITemplate } from "@/interface";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { useRouter } from "nextjs-toploader/app";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export const TemplatesGallery = () => {
  const router = useRouter();
  const create = useMutation(api.documents.createDocument);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const onTemplateClick = (title: string, initialContent: string) => {
    setIsCreating(true);
    create({ title, initialContent })
      .then((documentId) => {
        router.push(`/documents/${documentId}`);
        toast({
          title: "Successfully created!",
          description: "The document was successfully created.",
        });
      })
      .catch(() =>
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
      )
      .finally(() => setIsCreating(false));
  };

  return (
    <div className="bg-[#f1f3f4]">
      <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
        <h3>Start a new document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map(
              ({ id, imageUrl, label, initialContent }: ITemplate) => (
                <CarouselItem
                  key={id}
                  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:-1/5 2xl:basis-1/6 pl-4"
                >
                  <div
                    className={cn(
                      "aspect-[3/4] flex flex-col gap-y-2.5",
                      isCreating && "pointer-events-none opacity-50"
                    )}
                  >
                    <button
                      disabled={isCreating}
                      onClick={() => onTemplateClick(label, initialContent)}
                      style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                      className="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
                    />
                    <p className="text-sm font-medium truncate">{label}</p>
                  </div>
                </CarouselItem>
              )
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
