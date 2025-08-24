import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ClueItem } from "@/app/[locale]/post-security/clue-item";
import { Clue, AirportArea, ClueType } from "@/types/clue";
import { AnswerType } from "@/types/answer";

// Mock the answer components
jest.mock("@/components/image-answer", () => ({
  ImageAnswer: ({ clue }) => <div data-testid="image-answer">Image Answer for {clue.id}</div>,
}));

jest.mock("@/components/text-answer", () => ({
  TextAnswer: ({ clue }) => <div data-testid="text-answer">Text Answer for {clue.id}</div>,
}));

jest.mock("@/components/markdown", () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="mock-markdown">{children}</div>,
}));

describe("ClueItem", () => {
  const textClue: Clue = {
    id: "test-text-clue",
    type: ClueType.TEXT,
    airportArea: AirportArea.AIRPORT_WIDE,
    sortOrder: 1,
    answer: {
      type: AnswerType.TEXT,
    },
  };

  const imageClue: Clue = {
    id: "test-image-clue",
    type: ClueType.IMAGE,
    airportArea: AirportArea.CONCOURSE_A,
    sortOrder: 2,
    answer: {
      type: AnswerType.IMAGE,
      expectedImageCount: 1,
    },
  };

  const noneAnswerClue: Clue = {
    id: "test-none-clue",
    type: ClueType.TEXT,
    airportArea: AirportArea.CENTRAL_TERMINAL,
    sortOrder: 3,
    answer: {
      type: AnswerType.NONE,
    },
  };

  it("renders clue with text answer", () => {
    render(<ClueItem clue={textClue} namespace="test-namespace" />);
    
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getByText("test-namespace.clues.test-text-clue.clue")).toBeInTheDocument();
    expect(screen.getByTestId("text-answer")).toBeInTheDocument();
  });

  it("renders clue with image answer", () => {
    render(<ClueItem clue={imageClue} namespace="test-namespace" />);
    
    expect(screen.getByText("test-namespace.clues.test-image-clue.clue")).toBeInTheDocument();
    expect(screen.getByTestId("image-answer")).toBeInTheDocument();
  });

  it("renders clue with no answer component for NONE type", () => {
    render(<ClueItem clue={noneAnswerClue} namespace="test-namespace" />);
    
    expect(screen.getByText("test-namespace.clues.test-none-clue.clue")).toBeInTheDocument();
    expect(screen.queryByTestId("text-answer")).not.toBeInTheDocument();
    expect(screen.queryByTestId("image-answer")).not.toBeInTheDocument();
  });

  it("displays clue image for image clue types", () => {
    render(<ClueItem clue={imageClue} namespace="test-namespace" />);
    
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/clue-images/test-image-clue.jpg");
    expect(image).toHaveAttribute("alt", "test-namespace.clues.test-image-clue.clue");
  });

  it("does not display clue image for text clue types", () => {
    render(<ClueItem clue={textClue} namespace="test-namespace" />);
    
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("displays hint when available", () => {
    render(<ClueItem clue={textClue} namespace="test-namespace" />);
    
    // The mock useTranslations will return the key, so we check for the hint key
    expect(screen.getByText("test-namespace.clues.test-text-clue.hint")).toBeInTheDocument();
  });

  it("renders answer accordion when answer is available", async () => {
    const user = userEvent.setup();
    render(<ClueItem clue={textClue} namespace="test-namespace" />);
    
    // Look for the answer trigger
    const answerTrigger = screen.getByText("components.clue-item.answer");
    expect(answerTrigger).toBeInTheDocument();
    
    // Click to expand accordion
    await user.click(answerTrigger);
    
    // Check for answer content
    expect(screen.getByText("test-namespace.clues.test-text-clue.answer.answer")).toBeInTheDocument();
  });

  it("does not render answer accordion for NONE answer type", () => {
    render(<ClueItem clue={noneAnswerClue} namespace="test-namespace" />);
    
    expect(screen.queryByText("components.clue-item.answer")).not.toBeInTheDocument();
  });

  it("uses correct aria labelling", () => {
    render(<ClueItem clue={textClue} namespace="test-namespace" />);
    
    const clueGroup = screen.getByRole("group");
    expect(clueGroup).toHaveAttribute("aria-labelledby", "clue-test-text-clue");
    
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveAttribute("id", "clue-test-text-clue");
  });

  it("renders answer details in accordion when available", async () => {
    const user = userEvent.setup();
    render(<ClueItem clue={textClue} namespace="test-namespace" />);
    
    const answerTrigger = screen.getByText("components.clue-item.answer");
    await user.click(answerTrigger);
    
    // Check for both answer and details
    expect(screen.getByText("test-namespace.clues.test-text-clue.answer.answer")).toBeInTheDocument();
    expect(screen.getByTestId("mock-markdown")).toBeInTheDocument();
  });

  it("uses alternate text for image when available", () => {
    render(<ClueItem clue={imageClue} namespace="test-namespace" />);
    
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "test-namespace.clues.test-image-clue.alternateText");
  });
});