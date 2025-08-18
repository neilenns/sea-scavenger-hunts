"use client";

import { usePersistentAnswer } from "@/hooks/use-persistent-answer";
import { Clue } from "@/types/clue";
import { TrashIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";
import { Button } from "./ui/button";

export interface ImageAnswerProperties {
  clue: Clue;
}

export function ImageAnswer({ clue }: ImageAnswerProperties) {
  const { id, expectedImageCount } = clue;
  const [files, setFiles, loaded] = usePersistentAnswer<File[]>(id, []);
  const fileInputReference = useRef<HTMLInputElement>(null);
  const t = useTranslations("components");

  function handleFilesSelected(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    // eslint-disable-next-line unicorn/prefer-spread
    const newFiles = Array.from(event.target.files); // type is File[]

    setFiles((previous) => [...previous, ...newFiles]);
    event.target.value = ""; // allow re-adding same file
  }

  function handleRemove(imageIndex: number) {
    setFiles((previous) => previous.filter((_, index) => index !== imageIndex));
  }

  if (!loaded) return;

  return (
    <div className="mt-2">
      <input
        ref={fileInputReference}
        id={id}
        type="file"
        accept="image/*"
        multiple={(expectedImageCount ?? 1) > 1}
        onChange={handleFilesSelected}
        className="hidden"
      />

      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => fileInputReference.current?.click()}
      >
        {t("image-answer.choose-files-button", {
          expectedImageCount: expectedImageCount ?? 1,
        })}
      </Button>

      {files.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${file.lastModified}`}
              className="relative aspect-[4/3] w-24 overflow-hidden rounded"
            >
              <Image
                src={URL.createObjectURL(file)}
                alt=""
                fill
                className="object-cover"
                onLoad={(event) =>
                  URL.revokeObjectURL((event.target as HTMLImageElement).src)
                }
              />
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white text-xs"
                aria-label={t("image-answer.remove-image-aria", {
                  index: index + 1,
                })}
              >
                <TrashIcon />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
