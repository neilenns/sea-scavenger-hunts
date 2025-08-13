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

// The order of the elements in this array also defines the order of the groups
// on the page.
export const airportAreaNames: Array<{ area: AirportArea; name: string }> = [
  { area: AirportArea.AIRPORT_WIDE, name: "Airport-wide" },
  { area: AirportArea.SOUTH_SATELLITE, name: "South satellite" },
  { area: AirportArea.CONCOURSE_A, name: "Concourse A" },
  { area: AirportArea.CONCOURSE_B, name: "Concourse B" },
  { area: AirportArea.CENTRAL_TERMINAL, name: "Central terminal" },
  { area: AirportArea.CONCOURSE_C, name: "Concourse C" },
  { area: AirportArea.CONCOURSE_D, name: "Concourse D" },
  { area: AirportArea.NORTH_SATELLITE, name: "North satellite" },
];

export interface Clue {
  id: string;
  clue: string;
  airportArea: AirportArea;
  answerType: AnswerType;
  answer?: string;
  answerDetails?: string;
  hint?: string;
}
