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
    <Card className="py-4">
      <CardContent className="px-4">
        <div className="pb-2 font-bold">{clue.clue}</div>
        {clue.hint && (
          <div className="text-gray-500 mb-2">
            <Markdown>{clue.hint}</Markdown>
          </div>
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
