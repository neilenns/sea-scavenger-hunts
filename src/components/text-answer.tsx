"use client";

import { usePersistentAnswer } from "@/hooks/use-persistent-answer";
import { Clue } from "@/types/clue";
import { useTranslations } from "next-intl";
import { Input } from "./ui/input";

export interface TextAnswerProperties {
  clue: Clue;
}

export function TextAnswer({ clue }: TextAnswerProperties) {
  const { id } = clue;
  const [text, setText, loaded] = usePersistentAnswer<string>(id, "");
  const t = useTranslations("components");

  if (!loaded) return;

  return (
    <Input
      id={id}
      type="text"
      value={text}
      onChange={(event) => setText(event.target.value)}
      placeholder={t("text-answer.input-placeholder")}
      aria-label={t("text-answer.input-aria-label")}
    />
  );
}
