"use client";

import { usePersistentAnswer } from "@/hooks/use-persistent-answer";
import { Input } from "./ui/input";

export interface TextAnswerProperties {
  id: string;
}

export function TextAnswer({ id }: TextAnswerProperties) {
  const [text, setText, loaded] = usePersistentAnswer<string>(id, "");

  if (!loaded) return;

  return (
    <Input
      type="text"
      value={text}
      onChange={(event) => setText(event.target.value)}
      placeholder="Type your answer..."
    />
  );
}
