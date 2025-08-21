"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { usePersistentAnswer } from "@/hooks/use-persistent-answer";
import { isImageAnswer } from "@/types/answer";
import { Clue } from "@/types/clue";
import { CameraIcon, FileIcon, TrashIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { Button } from "./ui/button";

export interface ImageAnswerProperties {
  clue: Clue;
}

export function ImageAnswer({ clue }: ImageAnswerProperties) {
  const { id } = clue;

  if (!isImageAnswer(clue.answer)) {
    throw new Error("ImageAnswer component expects an image answer");
  }

  const { expectedImageCount } = clue.answer;
  const [files, setFiles, loaded] = usePersistentAnswer<File[]>(id, []);
  const cameraInputReference = useRef<HTMLInputElement>(null);
  const galleryInputReference = useRef<HTMLInputElement>(null);
  const t = useTranslations("components");
  const isMobile = useIsMobile();

  // Create object URLs when files change
  const objectUrls = useMemo(
    () => files.map((f) => URL.createObjectURL(f)),
    [files],
  );

  // Cleanup when files change or component unmounts
  useEffect(() => {
    return () => {
      for (const url of objectUrls) {
        URL.revokeObjectURL(url);
      }
    };
  }, [objectUrls]);

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
      {/* Camera-only input (single image, hints to open camera) */}
      <input
        ref={cameraInputReference}
        id={`${id}-camera`}
        type="file"
        accept="image/*"
        onChange={handleFilesSelected}
        capture="environment"
        className="hidden"
      />

      {/* Gallery input (can allow multiple selection) */}
      <input
        ref={galleryInputReference}
        id={id}
        type="file"
        accept="image/*"
        multiple={expectedImageCount > 1}
        onChange={handleFilesSelected}
        className="hidden"
      />

      <div className="flex items-center gap-2">
        {isMobile && (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => cameraInputReference.current?.click()}
          >
            <CameraIcon className="mr-2 h-4 w-4" aria-hidden />
            {t("image-answer.take-photo-button")}
          </Button>
        )}

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => galleryInputReference.current?.click()}
        >
          <FileIcon className="mr-2 h-4 w-4" aria-hidden />
          {t("image-answer.choose-files-button", {
            expectedImageCount: expectedImageCount,
          })}
        </Button>
      </div>

      {files.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${file.lastModified}`}
              className="relative aspect-[4/3] w-24 overflow-hidden rounded"
            >
              <Image
                src={objectUrls[index]}
                alt=""
                fill
                className="object-cover"
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
