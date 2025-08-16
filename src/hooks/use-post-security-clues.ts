import { AirportArea, AnswerType, Clue, ClueType } from "@/types/clue";
import { useTranslations } from "next-intl";

export function usePostSecurityClues() {
  const t = useTranslations("clues");

  return [
    {
      id: "XU2Q6uk5Sj", // cspell: disable-line
      clue: t("XU2Q6uk5Sj.clue"),
      airportArea: AirportArea.CONCOURSE_B,
      answerType: AnswerType.TEXT,
      clueType: ClueType.TEXT,
      answer: t("XU2Q6uk5Sj.answer"),
      // hint: "",
    },
    {
      id: "Fq6cpEvGKt", // cspell: disable-line
      clue: "How many airplanes have fins?",
      airportArea: AirportArea.CONCOURSE_B,
      answerType: AnswerType.TEXT,
      clueType: ClueType.TEXT,
      answer: "3 (to be verified)",
      // hint: "",
    },
    {
      id: "BL5xfCD1Pl", // cspell: disable-line
      clue: "Take a photo of three different aircraft tails for non-US carriers.",
      airportArea: AirportArea.CONCOURSE_A,
      answerType: AnswerType.IMAGE,
      clueType: ClueType.TEXT,
      // answer: "",
      // hint: "",
    },
    {
      id: "KFNxBoixx9", // cspell: disable-line
      clue: "Past Gate B15, there's an escalator to a tucked-away gate area. What's the highest-numbered B gate there?",
      airportArea: AirportArea.CONCOURSE_B,
      answerType: AnswerType.TEXT,
      clueType: ClueType.TEXT,
      answer: "21",
      answerDetails:
        "Gate B21 is accessed using the escalator or elevator at the end of Concourse B, near Gate B15.",
    },
    {
      id: "JTaK-wv-cm", // cspell: disable-line
      clue: "How many balls are in the sculpture?",
      airportArea: AirportArea.CONCOURSE_A,
      answerType: AnswerType.TEXT,
      clueType: ClueType.TEXT,
      answer: "10 (to be verified)",
      // hint: "",
    },
    {
      id: "GpyOC1fxZv", // cspell: disable-line
      clue: "Watch a few planes take off. Based on the takeoff direction, what flow is the airport in today?",
      airportArea: AirportArea.CONCOURSE_A,
      answerType: AnswerType.TEXT,
      clueType: ClueType.TEXT,
      answer: "North flow or south flow",
      answerDetails:
        "If planes are taking off from right to left, the airport is in south flow. If planes are taking off from left to right, the airport is in north flow.",
      hint: "Airport flow is the direction airplanes take off toward. For example, if planes take off toward the south, the airport is in south flow.",
    },
    {
      id: "WOflQcqqRa", // cspell: disable-line
      clue: "Listen to SEA Tower and take a photo of a plane you heard cleared for takeoff.",
      airportArea: AirportArea.CONCOURSE_A,
      answerType: AnswerType.IMAGE,
      clueType: ClueType.TEXT,
      // answer: "",
      hint: "LiveATC [broadcasts audio from SEA East Tower](https://www.liveatc.net/hlisten.php?mount=ksea3_twr_east&icao=ksea).",
    },
    {
      id: "wIuAhUYSUJ", // cspell: disable-line
      clue: "Find the CBP office in Concourse A. What's the phone number posted outside?",
      airportArea: AirportArea.CONCOURSE_A,
      answerType: AnswerType.TEXT,
      clueType: ClueType.TEXT,
      answer: "+1-800-TBD-9999 (to be verified)",
      // hint: "",
    },
    {
      id: "Mr8NTBLVuw", // cspell: disable-line
      clue: "Visit the all-gender restroom. How many faucets are at the sink?",
      airportArea: AirportArea.CONCOURSE_D,
      answerType: AnswerType.TEXT,
      clueType: ClueType.TEXT,
      answer: "6 (to be verified)",
      // hint: "",
    },
    {
      id: "Y7qiTGjFDA", // cspell: disable-line
      clue: "Ride the blue train to the South Satellite. How many languages are shown on the train display screens during the ride?",
      airportArea: AirportArea.SOUTH_SATELLITE,
      answerType: AnswerType.TEXT,
      clueType: ClueType.TEXT,
      answer: "5 (to be verified)",
      answerDetails: "The languages are: English, etc.",
      // hint: "",
    },
    {
      id: "CEDiAt5_TD", // cspell: disable-line
      clue: "Take a selfie with a gate sign for a flight heading outside of the United States.",
      airportArea: AirportArea.SOUTH_SATELLITE,
      answerType: AnswerType.IMAGE,
      clueType: ClueType.TEXT,
      // answer: "",
      // hint: "",
    },
    {
      id: "mdihls1FXP", // cspell: disable-line
      clue: "Find a gate with a flight to a city inside Washington State and take a selfie with the sign.",
      airportArea: AirportArea.CONCOURSE_C,
      answerType: AnswerType.IMAGE,
      clueType: ClueType.TEXT,
      // answer: "",
      // hint: "",
    },
    {
      id: "qsWmZtJQx9", // cspell: disable-line
      clue: "Search the gate screens and snap a photo of the highest flight number you spot.",
      airportArea: AirportArea.AIRPORT_WIDE,
      answerType: AnswerType.IMAGE,
      clueType: ClueType.TEXT,
      // answer: "",
      // hint: "",
    },
    {
      id: "vVzEujhDHt", // cspell: disable-line
      clue: "If you hit the jackpot, where would you cash your Washington Lotto ticket?",
      airportArea: AirportArea.CONCOURSE_C,
      answerType: AnswerType.TEXT,
      clueType: ClueType.TEXT,
      answer: "At the Washington Lotto desk near Gate C10.",
      // hint: "",
    },
    {
      id: "fId26KufqS", // cspell: disable-line
      clue: 'Where does Cordell "The Transformer" Truluck work?',
      airportArea: AirportArea.CONCOURSE_D,
      answerType: AnswerType.TEXT,
      clueType: ClueType.TEXT,
      answer: "Cordell works at the Luck Shines shoe shine near Gate D2.",
      // hint: "",
    },
    {
      id: "vVonLvfgvX", // cspell: disable-line
      clue: "Take a selfie with a vending machine selling something other than food and drink.",
      airportArea: AirportArea.AIRPORT_WIDE,
      answerType: AnswerType.IMAGE,
      clueType: ClueType.TEXT,
      // answer: "",
      // hint: "",
    },
    {
      id: "Z8uD5RIdFk", // cspell: disable-line
      clue: "Explore the shops. Take a photo of the single most expensive item you can find for sale.",
      airportArea: AirportArea.AIRPORT_WIDE,
      answerType: AnswerType.IMAGE,
      clueType: ClueType.TEXT,
      // answerDetails: ""
      // hint: "",
    },
    {
      id: "U2Ml_N2Ao1", // cspell: disable-line
      clue: "Take a photo of an album cover with the letter S on it.",
      airportArea: AirportArea.CENTRAL_TERMINAL,
      answerType: AnswerType.IMAGE,
      clueType: ClueType.TEXT,
      // answer: "",
      // hint: "",
    },
    {
      id: "uaPC_HvMqd", // cspell: disable-line
      clue: "Take a photo of something with the Space Needle on it.",
      airportArea: AirportArea.CENTRAL_TERMINAL,
      answerType: AnswerType.IMAGE,
      clueType: ClueType.TEXT,
      // answer: "",
      // hint: "",
    },
    {
      id: "1XWgzKECE6", // cspell: disable-line
      clue: "Find the boba shop. How many different add-ins can you choose from?",
      airportArea: AirportArea.CONCOURSE_D,
      answerType: AnswerType.TEXT,
      clueType: ClueType.TEXT,
      answer: "5 (to be verified)",
      // hint: "",
    },
    {
      id: "xH4xrNHYJe", // cspell: disable-line
      clue: t("xH4xrNHYJe.clue"),
      airportArea: AirportArea.CONCOURSE_D,
      answerType: AnswerType.TEXT,
      clueType: ClueType.TEXT,
      answer: t("xH4xrNHYJe.answer"),
      answerDetails: t("xH4xrNHYJe.answerDetails"),
      // hint: "",
    },
    {
      id: "pB53_yVOPQ", // cspell: disable-line
      clue: t("pB53_yVOPQ.clue"),
      airportArea: AirportArea.AIRPORT_WIDE,
      answerType: AnswerType.IMAGE,
      clueType: ClueType.TEXT,
      answerDetails: t("pB53_yVOPQ.answerDetails"),
      hint: t("pB53_yVOPQ.hint"),
    },
    {
      id: "96FePKs7zD", // cspell: disable-line
      clue: "Take a selfie with Jet the SEA otter.",
      airportArea: AirportArea.AIRPORT_WIDE,
      answerType: AnswerType.IMAGE,
      clueType: ClueType.TEXT,
      // answer: "",
      // hint: "",
    },
    {
      id: "ShfXCzAYKC", // cspell: disable-line
      clue: 'Find the painted wood sculpture "Modern Mask." How many faces stare back at you?',
      airportArea: AirportArea.CONCOURSE_C,
      answerType: AnswerType.TEXT,
      clueType: ClueType.TEXT,
      answer: "5 (to be verified)",
      answerDetails:
        '"[Modern Mask](https://www.portseattle.org/page/modern-mask)" by James Schoppert is a 3\' tall painted wood sculpture.',
      // hint: "",
    },
    {
      id: "4B8BuOoy-A", // cspell: disable-line
      clue: "Head downstairs and away from the crowds. What's the highest D gate number you see?",
      airportArea: AirportArea.CONCOURSE_D,
      answerType: AnswerType.TEXT,
      clueType: ClueType.TEXT,
      answer: "26",
      answerDetails: "Gate D26 is located downstairs, across from Gate D5.",
      // hint: "",
    },
    {
      id: "cvI9vHSRuC", // cspell: disable-line
      clue: "Take a selfie with an automated defibrillator.",
      airportArea: AirportArea.AIRPORT_WIDE,
      answerType: AnswerType.IMAGE,
      clueType: ClueType.TEXT,
      // answer: "",
      // hint: "",
    },
    {
      id: "PWYzT5xEM_", // cspell: disable-line
      clue: "Take a ride on the SEA underground. What are the three colors of the different train lines?",
      airportArea: AirportArea.AIRPORT_WIDE,
      answerType: AnswerType.TEXT,
      clueType: ClueType.TEXT,
      answer: "Blue, yellow, and green.",
      // hint: "",
    },
    {
      id: "FwkTyDghkR", // cspell: disable-line
      clue: "Look up near Seattle Beer Union. How many cloud sculptures are floating above you?",
      airportArea: AirportArea.CONCOURSE_A,
      answerType: AnswerType.TEXT,
      clueType: ClueType.TEXT,
      answer: "20 (to be verified)",
      answerDetails:
        '"[cloudsandclunkers](https://www.portseattle.org/page/cloudsandclunkers-peter-shelton)" by Peter Shelton hangs above Concourse A near Seattle Beer Union.',
      // hint: "",
    },
    {
      id: "VGDb3ekZZs", // cspell: disable-line
      clue: "Check the travel time display between Concourse A and the train station. Is it faster to walk or take the train to C gates?",
      airportArea: AirportArea.CONCOURSE_A,
      answerType: AnswerType.TEXT,
      clueType: ClueType.TEXT,
      answer: "Walk",
      answerDetails:
        "It takes nine minutes to walk, and 11 minutes to take the train. The times are shown at the bottom of the map on the information display on the landing between A gates and the train station.",
      // hint: "",
    },
    {
      id: "yTNP29jtdB", // cspell: disable-line
      clue: "Head upstairs to the mezzanine in the North Satellite. Which restaurant is there?",
      airportArea: AirportArea.NORTH_SATELLITE,
      answerType: AnswerType.TEXT,
      clueType: ClueType.TEXT,
      answer: "PF Chang's",
      // hint: "",
    },
    {
      id: "-buCfuZ_Js", // cspell: disable-line
      clue: "You've got a postcard to mail. Where can you buy postage stamps?",
      airportArea: AirportArea.CENTRAL_TERMINAL,
      answerType: AnswerType.TEXT,
      clueType: ClueType.TEXT,
      answer: "Sub Pop, near Concourse C.",
      // hint: "",
    },
    {
      id: "JjwwVsnaNJ", // cspell: disable-line
      clue: "Take a photo of a Japanese sandwich.",
      airportArea: AirportArea.SOUTH_SATELLITE,
      answerType: AnswerType.IMAGE,
      clueType: ClueType.TEXT,
      answerDetails:
        "The vending machines near the escalators in the South Satellite sell a variety of Japanese food and drinks.",
      // hint: "",
    },
    {
      id: "ewJw9uhuxK", // cspell: disable-line
      clue: "Take a selfie with a live plant.",
      airportArea: AirportArea.CENTRAL_TERMINAL,
      answerType: AnswerType.IMAGE,
      clueType: ClueType.TEXT,
      // answer: "",
      // hint: "",
    },
    {
      id: "ndC0lIJES6", // cspell: disable-line
      clue: "Take a photo of a hibiscus flower.",
      airportArea: AirportArea.NORTH_SATELLITE,
      answerType: AnswerType.IMAGE,
      clueType: ClueType.TEXT,
      // answer: "",
      // hint: "",
    },
    {
      id: "v86d2mm7UT", // cspell: disable-line
      clue: "Check the gate signs around the airport. How many gates have a letter after the number?",
      airportArea: AirportArea.AIRPORT_WIDE,
      answerType: AnswerType.TEXT,
      clueType: ClueType.TEXT,
      answer: "10 (to be verified)",
      // hint: "",
    },
    {
      id: "6IjATuH8h-", // cspell: disable-line
      clue: "Take a photo of a plane passing underneath the international arrivals skybridge.",
      airportArea: AirportArea.CONCOURSE_B,
      answerType: AnswerType.IMAGE,
      clueType: ClueType.TEXT,
      // answer: "",
      // hint: "",
    },
    {
      id: "nGRX7LLH2E", // cspell: disable-line
      clue: "Take a selfie with the neon dog.",
      airportArea: AirportArea.CONCOURSE_C,
      answerType: AnswerType.IMAGE,
      clueType: ClueType.TEXT,
      answerDetails: "The dog is located at Hachi-Ko.",
      // hint: "",
    },
    {
      id: "glwn2opFlc", // cspell: disable-line
      clue: "Which restaurant serves a dish called deconstructed hash?",
      airportArea: AirportArea.CONCOURSE_C,
      answerType: AnswerType.TEXT,
      clueType: ClueType.TEXT,
      answer: "Skillet, near Gate C10.",
      // hint: "",
    },
    {
      id: "uzxCpAxD0O", // cspell: disable-line
      clue: "Take a selfie at every information desk.",
      airportArea: AirportArea.AIRPORT_WIDE,
      answerType: AnswerType.IMAGE,
      clueType: ClueType.TEXT,
      hint: "There are eight information desks post-security.",
      // answer: "",
      answerDetails: `The information desks are:
    
  - **A info**: across from Swarovski in Concourse A
  - **A3 info**: across from Starbucks by Gate A3
  - **Checkpoint 1**: inside Checkpoint 1 on the landing between Concourse A and the A train station
  - **A train**: in the A train station
  - **Central info**: in the central terminal near Dilettante Chocolates & Mocha Cafe
  - **D info**: Across from the all-gender restrooms in Concourse D
  - **D train**: in the D train station
  - **N info**: in the North Satellite
  `,
      // hint: "",
    },
    {
      id: "Ajg7X3_CWe", // cspell: disable-line
      clue: "Take a selfie with a SEA pup.",
      airportArea: AirportArea.CENTRAL_TERMINAL,
      answerType: AnswerType.IMAGE,
      clueType: ClueType.TEXT,
      // answer: "",
      hint: "[SEA pups](https://www.portseattle.org/page/sea-pups) are usually at the airport from 10:00am - 12:00pm at the central terminal.",
    },
    {
      id: "tYEDPlu30G", // cspell: disable-line
      clue: "Which airlines grant business class passengers access to both The Club and British Airways Terraces lounges?",
      airportArea: AirportArea.SOUTH_SATELLITE,
      answerType: AnswerType.TEXT,
      clueType: ClueType.TEXT,
      answer: "Japan Airlines (JAL) and Qatar Airways",
      // answerDetails: "",
      // hint: "",
    },
    {
      id: "sZLbWTNUXK", // cspell: disable-line
      clue: "Take a photo of a sign written in a language other than English.",
      airportArea: AirportArea.SOUTH_SATELLITE,
      answerType: AnswerType.IMAGE,
      clueType: ClueType.TEXT,
      // answerDetails: "",
      // hint: "",
    },
    {
      id: "-GLJeZ-L-K", // cspell: disable-line
      clue: "Find the biggest drink cup for sale and take a photo next to it.",
      airportArea: AirportArea.CONCOURSE_D,
      answerType: AnswerType.IMAGE,
      clueType: ClueType.TEXT,
      // answerDetails: "",
      // hint: "",
    },
    {
      id: "xNr6O90eQa", // cspell: disable-line
      clue: "Listen to the airport announcements. What is the name of the volunteer?",
      airportArea: AirportArea.AIRPORT_WIDE,
      answerType: AnswerType.TEXT,
      clueType: ClueType.TEXT,
      answer: "Susan",
      answerDetails:
        "Airport volunteers are ambassadors for both the airport and the Puget Sound region. [Learn more](https://www.portseattle.org/Volunteer) about the program.",
      // hint: "",
    },
    {
      id: "MSjgrbHme1", // cspell: disable-line
      clue: "Find someone wearing Buc-ee's clothing and take a photo of the logo.",
      clueType: ClueType.IMAGE,
      airportArea: AirportArea.NORTH_SATELLITE,
      answerType: AnswerType.IMAGE,
      alternateText: "Buc-ee's logo on clothing.",
    },
    {
      id: "a8vW4xzkkW", // cspell: disable-line
      clue: "Find the water bottle filler with the highest number of bottles saved, and take a photo of the bottle count.",
      airportArea: AirportArea.AIRPORT_WIDE,
      answerType: AnswerType.IMAGE,
      clueType: ClueType.TEXT,
      // answer: "",
      // answerDetails: "",
      // hint: "",
    },
  ] as Clue[];
}
