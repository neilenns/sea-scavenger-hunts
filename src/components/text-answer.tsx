"use client";

import { usePersistentAnswer } from "@/hooks/use-persistent-answer";
import { useTranslations } from "next-intl";
import { Input } from "./ui/input";

export interface TextAnswerProperties {
  id: string;
}

export function TextAnswer({ id }: TextAnswerProperties) {
  const [text, setText, loaded] = usePersistentAnswer<string>(id, "");
  const t = useTranslations("text-answer");

  if (!loaded) return;

  return (
    <Input
      type="text"
      value={text}
      onChange={(event) => setText(event.target.value)}
      placeholder={t("input-placeholder")}
    />
  );
}
