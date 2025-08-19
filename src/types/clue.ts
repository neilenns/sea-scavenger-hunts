export enum AirportArea {
  AIRPORT_WIDE,
  CENTRAL_TERMINAL,
  CONCOURSE_A,
  CONCOURSE_B,
  CONCOURSE_C,
  CONCOURSE_D,
  NORTH_SATELLITE,
  SOUTH_SATELLITE,
}

export enum AnswerType {
  TEXT = "text",
  IMAGE = "image",
}

export enum ClueType {
  TEXT = "text",
  IMAGE = "image",
}

// New discriminated union types for Answer
export interface TextAnswer {
  type: "text";
}

export interface ImageAnswer {
  type: "image";
  /** Number of images the user must provide (>= 1). */
  expectedImageCount: number;
}

export type Answer = TextAnswer | ImageAnswer;

// New discriminated union types for Clue content
export interface TextClue {
  type: "text";
}

export interface ImageClue {
  type: "image";
}

export type ClueContent = TextClue | ImageClue;

// The order of the elements in this array also defines the order of the groups
// on the page. key is the string used to look up the i18n display name.
export const airportAreaNames = [
  { area: AirportArea.AIRPORT_WIDE, key: "airport-wide" },
  { area: AirportArea.SOUTH_SATELLITE, key: "south-satellite" },
  { area: AirportArea.CONCOURSE_A, key: "concourse-a" },
  { area: AirportArea.CONCOURSE_B, key: "concourse-b" },
  { area: AirportArea.CENTRAL_TERMINAL, key: "central-terminal" },
  { area: AirportArea.CONCOURSE_C, key: "concourse-c" },
  { area: AirportArea.CONCOURSE_D, key: "concourse-d" },
  { area: AirportArea.NORTH_SATELLITE, key: "north-satellite" },
] as const satisfies ReadonlyArray<
  Readonly<{ area: AirportArea; key: string }>
>;

export interface Clue {
  airportArea: AirportArea;
  /** Answer configuration */
  answer: Answer;
  /** How clue content is rendered */
  content: ClueContent;
  id: string;
}

// Type guard functions
export function isTextAnswer(answer: Answer): answer is TextAnswer {
  return answer.type === "text";
}

export function isImageAnswer(answer: Answer): answer is ImageAnswer {
  return answer.type === "image";
}

export function isTextClue(content: ClueContent): content is TextClue {
  return content.type === "text";
}

export function isImageClue(content: ClueContent): content is ImageClue {
  return content.type === "image";
}
