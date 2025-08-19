import { Answer } from "./answer";

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

export enum ClueType {
  TEXT = "text",
  IMAGE = "image",
}

// Base interface for common clue properties
export interface ClueBase {
  airportArea: AirportArea;
  /** Answer configuration */
  answer: Answer;
  id: string;
}

// Discriminated union types for Clue content
export interface TextClue extends ClueBase {
  type: ClueType.TEXT;
}

export interface ImageClue extends ClueBase {
  type: ClueType.IMAGE;
}

export type Clue = TextClue | ImageClue;

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

// Type guard functions for Clue
export function isTextClue(clue: Clue): clue is TextClue {
  return clue.type === ClueType.TEXT;
}

export function isImageClue(clue: Clue): clue is ImageClue {
  return clue.type === ClueType.IMAGE;
}
