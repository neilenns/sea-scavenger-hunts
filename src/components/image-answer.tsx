"use client";

import { useImageUrl } from "@/contexts/image-url-context";
import { usePersistentAnswer } from "@/hooks/use-persistent-answer";
import { Responsive } from "@/lib/media";
import { isImageAnswer } from "@/types/answer";
import { Clue } from "@/types/clue";
import { CameraIcon, FileIcon, TrashIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo, useRef } from "react";
import { Button } from "./ui/button";

export interface ImageAnswerProperties {
  clue: Clue;
}

export function ImageAnswer({ clue }: ImageAnswerProperties) {
  const { id } = clue;
  const { getObjectUrl, getFileKey } = useImageUrl();

  if (!isImageAnswer(clue.answer)) {
    throw new Error("ImageAnswer component expects an image answer");
  }

  const { expectedImageCount } = clue.answer;
  const [files, setFiles, loaded] = usePersistentAnswer<File[]>(id, []);
  const cameraInputReference = useRef<HTMLInputElement>(null);
  const galleryInputReference = useRef<HTMLInputElement>(null);
  const t = useTranslations("components");

  // Create object URLs using the shared context
  const objectUrls = useMemo(
    () => files.map((file) => getObjectUrl(file)),
    [files, getObjectUrl],
  );

  // Helper function to check if a file already exists
  const isFileAlreadyAdded = (
    newFile: File,
    existingFiles: File[],
  ): boolean => {
    return existingFiles.some(
      (existingFile) =>
        existingFile.name === newFile.name &&
        existingFile.lastModified === newFile.lastModified &&
        existingFile.size === newFile.size,
    );
  };

  function handleFilesSelected(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    // eslint-disable-next-line unicorn/prefer-spread
    const newFiles = Array.from(event.target.files); // type is File[]

    // Filter out files that are already added to prevent duplicates
    const uniqueNewFiles = newFiles.filter(
      (newFile) => !isFileAlreadyAdded(newFile, files),
    );

    if (uniqueNewFiles.length > 0) {
      setFiles((previous) => [...previous, ...uniqueNewFiles]);
    }

    // Clear the input value to allow re-selecting the same file if needed
    event.target.value = "";
  }

  function handleRemove(imageIndex: number) {
    const fileToRemove = files[imageIndex];
    if (fileToRemove) {
      setFiles((previous) =>
        previous.filter((_, index) => index !== imageIndex),
      );
    }
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
        <Responsive showOn="mobile">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => cameraInputReference.current?.click()}
          >
            <CameraIcon className="mr-2 h-4 w-4" aria-hidden />
            {t("image-answer.take-photo-button")}
          </Button>
        </Responsive>

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
              key={getFileKey(file)}
              className="relative aspect-[4/3] w-24 overflow-hidden rounded"
            >
              <Image
                src={objectUrls[index]}
                alt=""
                fill
                sizes="96px"
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
                <TrashIcon aria-hidden />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
