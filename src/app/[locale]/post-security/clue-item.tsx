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
import { AnswerType, Clue, ClueType } from "@/types/clue";
import { useTranslations } from "next-intl";
import Image from "next/image";

export interface ClueItemProperties {
  clue: Clue;
  namespace: string;
}

export function ClueItem({ clue, namespace }: ClueItemProperties) {
  const t = useTranslations();

  return (
    <Card className="p-0" aria-labelledby={`clue-${clue.id}`} role="group">
      <CardContent className="px-4 py-3 space-y-2">
        <h3 id={`clue-${clue.id}`} className="pb-2 font-bold !text-base">
          {t(`${namespace}.clues.${clue.id}.clue`)}
        </h3>
        {clue.clueType === ClueType.IMAGE && (
          <div className="relative mx-auto max-w-[400px] aspect-video">
            <Image
              alt={
                t.has(`${namespace}.clues.${clue.id}.alternateText`)
                  ? t(`${namespace}.clues.${clue.id}.alternateText`)
                  : t(`${namespace}.clues.${clue.id}.clue`)
              }
              src={`/clue-images/${clue.id}.jpg`}
              fill
              sizes="(max-width: 420px) 100vw, 400px"
              className="object-contain"
            />
          </div>
        )}
        {t.has(`${namespace}.clues.${clue.id}.hint`) && (
          <Markdown className="text-muted-foreground mb-2">
            {t(`${namespace}.clues.${clue.id}.hint`)}
          </Markdown>
        )}
        {clue.answerType === AnswerType.TEXT && <TextAnswer id={clue.id} />}
        {clue.answerType === AnswerType.IMAGE && <ImageAnswer id={clue.id} />}
        {(t.has(`${namespace}.clues.${clue.id}.answer`) ||
          t.has(`${namespace}.clues.${clue.id}.answerDetails`)) && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="answer">
              <AccordionTrigger className="pb-0">
                {t("components.clue-item.answer")}
              </AccordionTrigger>
              <AccordionContent className="pb-0 mt-2">
                {t.has(`${namespace}.clues.${clue.id}.answer`) && (
                  <p>{t(`${namespace}.clues.${clue.id}.answer`)}</p>
                )}
                {t.has(`${namespace}.clues.${clue.id}.answerDetails`) && (
                  <Markdown>
                    {t(`${namespace}.clues.${clue.id}.answerDetails`)}
                  </Markdown>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
