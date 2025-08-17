"use client";

import { usePersistentAnswer } from "@/hooks/use-persistent-answer";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";

export interface ImageAnswerProperties {
  id: string;
}

export function ImageAnswer({ id }: ImageAnswerProperties) {
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
        multiple
        onChange={handleFilesSelected}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => fileInputReference.current?.click()}
        className="rounded bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
      >
        {t("image-answer.choose-files-button")}
      </button>

      {files.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] w-24 group overflow-hidden rounded"
            >
              <Image
                src={URL.createObjectURL(file)}
                alt=""
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100 transition"
                aria-label={t("image-answer.remove-image-aria", {
                  index: index + 1,
                })}
              >
                <span aria-hidden>×</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
