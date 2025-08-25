"use client";

import { usePersistentAnswer } from "@/hooks/use-persistent-answer";
import { isTextAnswer } from "@/types/answer";
import { Clue } from "@/types/clue";
import { useTranslations } from "next-intl";
import { Input } from "./ui/input";

export interface TextAnswerProperties {
  clue: Clue;
}

export function TextAnswer({ clue }: TextAnswerProperties) {
  const { id } = clue;

  if (!isTextAnswer(clue.answer)) {
    throw new Error("TextAnswer component expects a text answer");
  }
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
