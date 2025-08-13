export enum AirportArea {
  AIRPORT_WIDE,
  CENTRAL_TERMINAL,
  CONCOURSE_A,
  CONCOURSE_B,
  CONCOURSE_C,
  CONCOURSE_D,
  CONCOURSE_N,
  CONCOURSE_S,
}

export enum AnswerType {
  TEXT = "text",
  IMAGE = "image",
}

export const airportAreaNames: Record<AirportArea, string> = {
  [AirportArea.AIRPORT_WIDE]: "Airport-wide",
  [AirportArea.CONCOURSE_A]: "Concourse A",
  [AirportArea.CONCOURSE_B]: "Concourse B",
  [AirportArea.CENTRAL_TERMINAL]: "Central Terminal",
  [AirportArea.CONCOURSE_C]: "Concourse C",
  [AirportArea.CONCOURSE_D]: "Concourse D",
  [AirportArea.CONCOURSE_N]: "Concourse N",
  [AirportArea.CONCOURSE_S]: "Concourse S",
};

export interface Clue {
  id: string;
  clue: string;
  airportArea: AirportArea;
  answerType: AnswerType;
  answer?: string;
  answerDetails?: string;
  hint?: string;
}
