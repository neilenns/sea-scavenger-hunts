import { AirportArea, AnswerType, Clue } from "@/types/clue";

export const postSecurityClues: ReadonlyArray<Clue> = [
  {
    id: "KFNxBoixx9", // cspell: disable-line
    clue: "What is the highest-numbered B gate?",
    airportArea: AirportArea.CONCOURSE_B,
    answerType: AnswerType.TEXT,
    answer: "21",
    answerDetails:
      "Gate B21 is accessed using the escalator or elevator at the end of Concourse B, near gate B15.",
  },
  {
    id: "XU2Q6uk5Sj", // cspell: disable-line
    clue: "How many fish are carrying suitcases?",
    airportArea: AirportArea.CONCOURSE_B,
    answerType: AnswerType.TEXT,
    answer: "4 (to be verified)",
    // hint: "",
  },
  {
    id: "Fq6cpEvGKt", // cspell: disable-line
    clue: "How many airplanes have fins?",
    airportArea: AirportArea.CONCOURSE_B,
    answerType: AnswerType.TEXT,
    answer: "3 (to be verified)",
    // hint: "",
  },
  {
    id: "BL5xfCD1Pl", // cspell: disable-line
    clue: "Take a picture of three different aircraft tails for non-US carriers.",
    airportArea: AirportArea.AIRPORT_WIDE,
    answerType: AnswerType.IMAGE,
    // answer: "",
    // hint: "",
  },
  {
    id: "WOflQcqqRa", // cspell: disable-line
    clue: "Listen to SEA Tower and take a picture of a plane you heard cleared for takeoff.",
    airportArea: AirportArea.AIRPORT_WIDE,
    answerType: AnswerType.IMAGE,
    // answer: "",
    hint: "LiveATC [broadcasts audio from SEA East Tower](https://www.liveatc.net/hlisten.php?mount=ksea3_twr_east&icao=ksea).",
  },
  {
    id: "GpyOC1fxZv", // cspell: disable-line
    clue: "What flow is the airport in?",
    airportArea: AirportArea.AIRPORT_WIDE,
    answerType: AnswerType.TEXT,
    answer:
      "If planes are taking from right to left, the airport is in south flow. If the planes are taking off from left to right, the airport is in north flow.",
    hint: "Airport flow is the direction airplanes take off towards. For example, if planes takeoff towards the south, the airport is in South flow.",
  },
  {
    id: "wIuAhUYSUJ", // cspell: disable-line
    clue: "What is the phone number to contact Customs and Border Protection (CBP)?",
    airportArea: AirportArea.CONCOURSE_A,
    answerType: AnswerType.TEXT,
    answer: "+1-800-TBD-9999 (to be verified)",
    // hint: "",
  },
  {
    id: "JTaK-wv-cm", // cspell: disable-line
    clue: "How many balls are in the sculpture?",
    airportArea: AirportArea.CONCOURSE_A,
    answerType: AnswerType.TEXT,
    answer: "10 (to be verified)",
    // hint: "",
  },
  {
    id: "Mr8NTBLVuw", // cspell: disable-line
    clue: "How many faucets are in the all-gender restroom?",
    airportArea: AirportArea.CONCOURSE_D,
    answerType: AnswerType.TEXT,
    answer: "6 (to be verified)",
    // hint: "",
  },
  {
    id: "CEDiAt5_TD", // cspell: disable-line
    clue: "Take a selfie with a gate sign for a flight heading outside of the United States.",
    airportArea: AirportArea.AIRPORT_WIDE,
    answerType: AnswerType.TEXT,
    // answer: "",
    // hint: "",
  },
  {
    id: "mdihls1FXP", // cspell: disable-line
    clue: "Take a selfie with a gate sign for a flight heading to a city inside Washington State.",
    airportArea: AirportArea.AIRPORT_WIDE,
    answerType: AnswerType.TEXT,
    // answer: "",
    // hint: "",
  },
  {
    id: "qsWmZtJQx9", // cspell: disable-line
    clue: "Take a photo of a gate screen with the highest flight number you can find.",
    airportArea: AirportArea.AIRPORT_WIDE,
    answerType: AnswerType.TEXT,
    // answer: "",
    // hint: "",
  },
  {
    id: "vVzEujhDHt", // cspell: disable-line
    clue: "Where can you cash a winning Washington Lotto ticket?",
    airportArea: AirportArea.CONCOURSE_C,
    answerType: AnswerType.TEXT,
    answer: "At the Washington Lotto desk near gate C10.",
    // hint: "",
  },
  {
    id: "fId26KufqS", // cspell: disable-line
    clue: 'Where does Cordell "The Transformer" Truluck work?',
    airportArea: AirportArea.CONCOURSE_D,
    answerType: AnswerType.TEXT,
    answer: "Cordell works at the Luck Shines shoe shine near gate D2.",
    // hint: "",
  },
  {
    id: "vVonLvfgvX", // cspell: disable-line
    clue: "Take a selfie with a vending machine selling something other than food and drink.",
    airportArea: AirportArea.AIRPORT_WIDE,
    answerType: AnswerType.IMAGE,
    // answer: "",
    // hint: "",
  },
  {
    id: "Z8uD5RIdFk", // cspell: disable-line
    clue: "What is the most expensive item you can find for sale?",
    airportArea: AirportArea.AIRPORT_WIDE,
    answerType: AnswerType.TEXT,
    answer: "Could be anywhere!",
    // hint: "",
  },
  {
    id: "U2Ml_N2Ao1", // cspell: disable-line
    clue: "Take a photo of an album cover with the letter S on it.",
    airportArea: AirportArea.AIRPORT_WIDE,
    answerType: AnswerType.IMAGE,
    // answer: "",
    // hint: "",
  },
  {
    id: "uaPC_HvMqd", // cspell: disable-line
    clue: "Take a photo of something with the Space Needle on it",
    airportArea: AirportArea.AIRPORT_WIDE,
    answerType: AnswerType.IMAGE,
    // answer: "",
    // hint: "",
  },
  {
    id: "1XWgzKECE6", // cspell: disable-line
    clue: "How many different add-ins are there for boba drinks?",
    airportArea: AirportArea.CONCOURSE_D,
    answerType: AnswerType.TEXT,
    answer: "5 (to be verified)",
    // hint: "",
  },
  {
    id: "xH4xrNHYJe", // cspell: disable-line
    clue: "What object casts a shadow into the terrazzo floor?",
    airportArea: AirportArea.CONCOURSE_D,
    answerType: AnswerType.TEXT,
    answer: "A boat.",
    answerDetails:
      '"[Journey Home](https://www.portseattle.org/page/journey-home-larry-kirkland)" by Larry Kirkland is a 32\' long boat made out of aluminum and glass. The shadow is made from approximately seventy bronze elements.',
    // hint: "",
  },
  {
    id: "pB53_yVOPQ", // cspell: disable-line
    clue: "Take a selfie outside the entrance of each airport lounge.",
    airportArea: AirportArea.AIRPORT_WIDE,
    answerType: AnswerType.IMAGE,
    answerDetails: `The lounges are: 
      
* Delta (A11)
* Delta One (A11)
* The Club (A11)
* United (A10)
* Delta (A1)
* American Express Centurion (Central Terminal)
* Alaska (C16)
* Alaska (D1)
* Alaska (mezzanine above N13*N18)
* The Club (above S10)
* British Airways (above S10).`,
    hint: "There are eleven lounges at SEA, with ten entrances.",
  },
  {
    id: "96FePKs7zD", // cspell: disable-line
    clue: "Take a selfie with Jet the SEA otter.",
    airportArea: AirportArea.AIRPORT_WIDE,
    answerType: AnswerType.IMAGE,
    // answer: "",
    // hint: "",
  },
  {
    id: "ShfXCzAYKC", // cspell: disable-line
    clue: "How many faces are in the modern mask?",
    airportArea: AirportArea.CONCOURSE_C,
    answerType: AnswerType.TEXT,
    answer: "5 (to be verified)",
    answerDetails:
      '"[Modern Mask](https://www.portseattle.org/page/modern-mask)" by James Schoppert is a 3\' tall painted wood sculpture.',
    // hint: "",
  },
  {
    id: "4B8BuOoy-A", // cspell: disable-line
    clue: "What is the highest-numbered D gate?",
    airportArea: AirportArea.CONCOURSE_D,
    answerType: AnswerType.TEXT,
    answer: "26",
    answerDetails: "Gate D26 is located downstairs, across from gate D5.",
    // hint: "",
  },
  {
    id: "cvI9vHSRuC", // cspell: disable-line
    clue: "Take a selfie with an automated defibrillator.",
    airportArea: AirportArea.AIRPORT_WIDE,
    answerType: AnswerType.IMAGE,
    // answer: "",
    // hint: "",
  },
  {
    id: "PWYzT5xEM_", // cspell: disable-line
    clue: "What are the three train colors in the SEA underground train system?",
    airportArea: AirportArea.AIRPORT_WIDE,
    answerType: AnswerType.TEXT,
    answer: "Blue, yellow, and green.",
    // hint: "",
  },
  {
    id: "VGDb3ekZZs", // cspell: disable-line
    clue: "From the exit of checkpoint 1, is it faster to walk or take the train to C gates?",
    airportArea: AirportArea.CONCOURSE_A,
    answerType: AnswerType.TEXT,
    answer: "Walk",
    answerDetails:
      "It takes nine minutes to walk, and 11 minutes to take the train. The times are shown at the bottom of the map on the information display on the landing between A gates and the train station.",
    // hint: "",
  },
  {
    id: "yTNP29jtdB", // cspell: disable-line
    clue: "What restaurant is on the mezzanine?",
    airportArea: AirportArea.NORTH_SATELLITE,
    answerType: AnswerType.TEXT,
    answer: "PF Chang's",
    // hint: "",
  },
  {
    id: "-buCfuZ_Js", // cspell: disable-line
    clue: "Where can you buy postage stamps?",
    airportArea: AirportArea.CENTRAL_TERMINAL,
    answerType: AnswerType.TEXT,
    answer: "Sub Pop, near Concourse C.",
    // hint: "",
  },
  {
    id: "JjwwVsnaNJ", // cspell: disable-line
    clue: "Take a photo of a Japanese sandwich.",
    airportArea: AirportArea.SOUTH_SATELLITE,
    answerType: AnswerType.IMAGE,
    answer:
      "The vending machines near the escalators in the south satellite sell a variety of Japanese food and drinks.",
    // hint: "",
  },
  {
    id: "ewJw9uhuxK", // cspell: disable-line
    clue: "Take a selfie with a live plant.",
    airportArea: AirportArea.AIRPORT_WIDE,
    answerType: AnswerType.IMAGE,
    // answer: "",
    // hint: "",
  },
  {
    id: "ndC0lIJES6", // cspell: disable-line
    clue: "Take a photo of a hibiscus flower",
    airportArea: AirportArea.AIRPORT_WIDE,
    answerType: AnswerType.IMAGE,
    // answer: "",
    // hint: "",
  },
  {
    id: "v86d2mm7UT", // cspell: disable-line
    clue: "How many gates have a letter after the number?",
    airportArea: AirportArea.AIRPORT_WIDE,
    answerType: AnswerType.TEXT,
    answer: "10 (to be verified)",
    // hint: "",
  },
  {
    id: "FwkTyDghkR", // cspell: disable-line
    clue: "How many clouds hang from the ceiling?",
    airportArea: AirportArea.CONCOURSE_A,
    answerType: AnswerType.TEXT,
    answer: "20 (to be verified)",
    answerDetails:
      '"[cloudsandclunkers](https://www.portseattle.org/page/cloudsandclunkers-peter-shelton)" by Peter Shelton hangs above Concourse A near Seattle Beer Union.',
    // hint: "",
  },
  {
    id: "6IjATuH8h-", // cspell: disable-line
    clue: "Take a photo of a plane passing underneath the international arrivals skybridge.",
    airportArea: AirportArea.AIRPORT_WIDE,
    answerType: AnswerType.IMAGE,
    // answer: "",
    // hint: "",
  },
  {
    id: "nGRX7LLH2E", // cspell: disable-line
    clue: "Take a selfie with the neon dog",
    airportArea: AirportArea.CONCOURSE_C,
    answerType: AnswerType.IMAGE,
    answer: "The dog is located at Hachi-Ko.",
    // hint: "",
  },
  {
    id: "glwn2opFlc", // cspell: disable-line
    clue: "Where can you buy deconstructed hash?",
    airportArea: AirportArea.CONCOURSE_C,
    answerType: AnswerType.TEXT,
    answer: "Skillet, near gate C10.",
    // hint: "",
  },
  {
    id: "uzxCpAxD0O", // cspell: disable-line
    clue: "Take a selfie at every information desk.",
    airportArea: AirportArea.AIRPORT_WIDE,
    answerType: AnswerType.IMAGE,
    hint: "There are eight information desks post-security.",
    // answer: "",
    answerDetails: `The information desks are:
    
  - **A info**: across from Swarovski in Concourse A
  - **A3 info**: across from Starbucks by gate A3
  - **Checkpoint 1**: inside checkpoint 1 on the landing between Concourse A and the A train station
  - **A train**: in the A train station
  - **Central info**: in the central terminal near Dilettante Chocolates & Mocha Cafe
  - **D info**: Across from the all-gender restrooms in Concourse D
  - **D train**: in the D train station
  - **N info**: in the north satellite
  `,
    // hint: "",
  },
  {
    id: "Ajg7X3_CWe", // cspell: disable-line
    clue: "Take a selfie with a SEA pup.",
    airportArea: AirportArea.CENTRAL_TERMINAL,
    answerType: AnswerType.IMAGE,
    // answer: "",
    hint: "[SEA pups](https://www.portseattle.org/page/sea-pups) are usually at the airport from 10:00am - 12:00pm at the central terminal.",
  },
];
