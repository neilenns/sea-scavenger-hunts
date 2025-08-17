"use client";
import { ImageAnswer } from "@/components/image-answer";
import RichText from "@/components/rich-text";
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
}

export function ClueItem({ clue }: ClueItemProperties) {
  const t = useTranslations("clue-item");
  const translatedClues = useTranslations("clues");

  return (
    <Card className="p-0" aria-labelledby={`clue-${clue.id}`} role="group">
      <CardContent className="px-4 py-3 space-y-2">
        <h3 id={`clue-${clue.id}`} className="pb-2 font-bold !text-base">
          {translatedClues(`${clue.id}.clue`)}
        </h3>
        {clue.clueType === ClueType.IMAGE && (
          <div className="relative mx-auto max-w-[400px] aspect-video">
            <Image
              alt={
                translatedClues.has(`${clue.id}.alternateText`)
                  ? translatedClues(`${clue.id}.alternateText`)
                  : translatedClues(`${clue.id}.clue`)
              }
              src={`/clue-images/${clue.id}.jpg`}
              fill
              sizes="(max-width: 420px) 100vw, 400px"
              className="object-contain"
            />
          </div>
        )}
        {translatedClues.has(`${clue.id}.hint`) && (
          <RichText className="text-muted-foreground mb-2">
            {(tags) => translatedClues.rich(`${clue.id}.hint`, tags)}
          </RichText>
        )}
        {clue.answerType === AnswerType.TEXT && <TextAnswer id={clue.id} />}
        {clue.answerType === AnswerType.IMAGE && <ImageAnswer id={clue.id} />}
        {(translatedClues.has(`${clue.id}.answer`) ||
          translatedClues.has(`${clue.id}.answerDetails`)) && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="answer">
              <AccordionTrigger className="pb-0">
                {t("answer")}
              </AccordionTrigger>
              <AccordionContent className="pb-0 mt-2">
                {translatedClues.has(`${clue.id}.answer`) && (
                  <p>
                    <RichText>
                      {(tags) =>
                        translatedClues.rich(`${clue.id}.answer`, tags)
                      }
                    </RichText>
                  </p>
                )}
                {translatedClues.has(`${clue.id}.answerDetails`) && (
                  <RichText>
                    {(tags) =>
                      translatedClues.rich(`${clue.id}.answerDetails`, tags)
                    }
                  </RichText>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
