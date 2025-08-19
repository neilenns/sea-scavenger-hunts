export enum AnswerType {
  TEXT = "text",
  IMAGE = "image",
}

// Discriminated union types for Answer
export interface TextAnswer {
  type: AnswerType.TEXT;
}

export interface ImageAnswer {
  type: AnswerType.IMAGE;
  /** Number of images the user must provide (>= 1). */
  expectedImageCount: number;
}

export type Answer = TextAnswer | ImageAnswer;

// Type guard functions for Answer
export function isTextAnswer(answer: Answer): answer is TextAnswer {
  return answer.type === AnswerType.TEXT;
}

export function isImageAnswer(answer: Answer): answer is ImageAnswer {
  return answer.type === AnswerType.IMAGE;
}