"use client";
import { ImageAnswer } from "@/components/image-answer";
import Markdown from "@/components/markdown";
import { TextAnswer } from "@/components/text-answer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Clue, isImageClue } from "@/types/clue";
import { isImageAnswer, isNoneAnswer, isTextAnswer } from "@/types/answer";
import { useTranslations } from "next-intl";
import Image from "next/image";

export interface ClueItemProperties {
  clue: Clue;
  namespace: string;
}

export function ClueItem({ clue, namespace }: ClueItemProperties) {
  const t = useTranslations();
  const baseKey = `${namespace}.clues.${clue.id}`;

  return (
    <Card className="p-0" aria-labelledby={`clue-${clue.id}`} role="group">
      <CardContent className="px-4 py-3 space-y-2">
        <h3 id={`clue-${clue.id}`} className="pb-2 font-bold !text-base">
          {t(`${baseKey}.clue`)}
        </h3>
        {isImageClue(clue) && (
          <div className="relative mx-auto max-w-[400px] aspect-video">
            <Image
              alt={
                t.has(`${baseKey}.alternateText`)
                  ? t(`${baseKey}.alternateText`)
                  : t(`${baseKey}.clue`)
              }
              src={`/clue-images/${clue.id}.jpg`}
              fill
              sizes="(max-width: 420px) 100vw, 400px"
              className="object-contain"
            />
          </div>
        )}
        {t.has(`${baseKey}.hint`) && (
          <Markdown className="text-muted-foreground mb-2">
            {t(`${baseKey}.hint`)}
          </Markdown>
        )}
        {isTextAnswer(clue.answer) && <TextAnswer clue={clue} />}
        {isImageAnswer(clue.answer) && <ImageAnswer clue={clue} />}
        {!isNoneAnswer(clue.answer) && (t.has(`${baseKey}.answer.answer`) || t.has(`${baseKey}.answer.details`)) && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="answer">
              <AccordionTrigger className="pb-0">
                {t("components.clue-item.answer")}
              </AccordionTrigger>
              <AccordionContent className="pb-0 mt-2">
                {t.has(`${baseKey}.answer.answer`) && <p>{t(`${baseKey}.answer.answer`)}</p>}
                {t.has(`${baseKey}.answer.details`) && (
                  <Markdown>{t(`${baseKey}.answer.details`)}</Markdown>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
