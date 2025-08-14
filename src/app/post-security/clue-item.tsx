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
import { AnswerType, Clue } from "@/types/clue";

export interface ClueItemProperties {
  clue: Clue;
}

export function ClueItem({ clue }: ClueItemProperties) {
  return (
    <Card className="p-0" aria-labelledby={`clue-${clue.id}`} role="group">
      <CardContent className="px-4 py-3">
        <h3 id={`clue-${clue.id}`} className="pb-2 font-bold !text-base">
          {clue.clue}
        </h3>
        {clue.hint && (
          <Markdown className="text-muted-foreground mb-2">
            {clue.hint}
          </Markdown>
        )}
        {clue.answerType === AnswerType.TEXT && <TextAnswer id={clue.id} />}
        {clue.answerType === AnswerType.IMAGE && <ImageAnswer id={clue.id} />}
        {(clue.answer || clue.answerDetails) && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="answer">
              <AccordionTrigger className="pt-4 pb-0">Answer</AccordionTrigger>
              <AccordionContent className="pb-0 mt-2">
                {clue.answer && <p>{clue.answer}</p>}
                {clue.answerDetails && (
                  <Markdown>{clue.answerDetails}</Markdown>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
