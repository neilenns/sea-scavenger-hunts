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
import { AnswerType, Clue } from "@/types/clue";

export interface ClueItemProperties {
  clue: Clue;
}

export function ClueItem({ clue }: ClueItemProperties) {
  return (
    <div>
      {clue.hint && (
        <div className="text-gray-500 mb-2">
          <Markdown>{clue.hint}</Markdown>
        </div>
      )}
      {clue.answerType === AnswerType.TEXT && <TextAnswer id={clue.id} />}
      {clue.answerType === AnswerType.IMAGE && <ImageAnswer id={clue.id} />}
      {(clue.answer || clue.answerDetails) && (
        <Accordion type="single" collapsible className="w-full mt-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>Answer</AccordionTrigger>
            <AccordionContent>
              {clue.answer && <p className="mb-2">{clue.answer}</p>}
              {clue.answerDetails && <Markdown>{clue.answerDetails}</Markdown>}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
