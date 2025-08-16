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

// The order of the elements in this array also defines the order of the groups
// on the page. key is the string used to look up the i18n display name.
export const airportAreaNames: Array<{ area: AirportArea; key: string }> = [
  { area: AirportArea.AIRPORT_WIDE, key: "airport-wide" },
  { area: AirportArea.SOUTH_SATELLITE, key: "south-satellite" },
  { area: AirportArea.CONCOURSE_A, key: "concourse-a" },
  { area: AirportArea.CONCOURSE_B, key: "concourse-b" },
  { area: AirportArea.CENTRAL_TERMINAL, key: "central-terminal" },
  { area: AirportArea.CONCOURSE_C, key: "concourse-c" },
  { area: AirportArea.CONCOURSE_D, key: "concourse-d" },
  { area: AirportArea.NORTH_SATELLITE, key: "north-satellite" },
];

export interface Clue {
  airportArea: AirportArea;
  answerType: AnswerType;
  clueType: ClueType;
  id: string;
}
