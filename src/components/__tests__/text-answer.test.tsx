import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { TextAnswer } from "@/components/text-answer";
import { Clue, AirportArea, ClueType } from "@/types/clue";
import { AnswerType } from "@/types/answer";

// Mock the persistent answer hook
jest.mock("@/hooks/use-persistent-answer", () => ({
  usePersistentAnswer: jest.fn(),
}));

const mockUsePersistentAnswer = require("@/hooks/use-persistent-answer").usePersistentAnswer;

describe("TextAnswer", () => {
  const mockClue: Clue = {
    id: "test-clue-1",
    type: ClueType.TEXT,
    airportArea: AirportArea.AIRPORT_WIDE,
    sortOrder: 1,
    answer: {
      type: AnswerType.TEXT,
    },
  };

  const mockSetText = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders text input when loaded", () => {
    mockUsePersistentAnswer.mockReturnValue(["", mockSetText, true]);

    render(<TextAnswer clue={mockClue} />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "components.text-answer.input-placeholder");
    expect(input).toHaveAttribute("aria-label", "components.text-answer.input-aria-label");
  });

  it("does not render when not loaded", () => {
    mockUsePersistentAnswer.mockReturnValue(["", mockSetText, false]);

    const { container } = render(<TextAnswer clue={mockClue} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("displays current text value", () => {
    const currentText = "My answer";
    mockUsePersistentAnswer.mockReturnValue([currentText, mockSetText, true]);

    render(<TextAnswer clue={mockClue} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue(currentText);
  });

  it("calls setText when user types", async () => {
    const user = userEvent.setup();
    mockUsePersistentAnswer.mockReturnValue(["", mockSetText, true]);

    render(<TextAnswer clue={mockClue} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Test");

    // userEvent.type calls onChange for each character
    expect(mockSetText).toHaveBeenCalledWith("T");
    expect(mockSetText).toHaveBeenCalledWith("e");
    expect(mockSetText).toHaveBeenCalledWith("s");
    expect(mockSetText).toHaveBeenCalledWith("t");
    expect(mockSetText).toHaveBeenCalledTimes(4);
  });

  it("handles onChange event correctly", () => {
    mockUsePersistentAnswer.mockReturnValue(["", mockSetText, true]);

    render(<TextAnswer clue={mockClue} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New answer" } });

    expect(mockSetText).toHaveBeenCalledWith("New answer");
  });

  it("throws error for non-text answer type", () => {
    const nonTextClue: Clue = {
      ...mockClue,
      answer: {
        type: AnswerType.IMAGE,
        expectedImageCount: 1,
      },
    };

    mockUsePersistentAnswer.mockReturnValue(["", mockSetText, true]);

    expect(() => render(<TextAnswer clue={nonTextClue} />)).toThrow(
      "TextAnswer component expects a text answer"
    );
  });

  it("initializes with correct clue ID", () => {
    mockUsePersistentAnswer.mockReturnValue(["", mockSetText, true]);

    render(<TextAnswer clue={mockClue} />);

    expect(mockUsePersistentAnswer).toHaveBeenCalledWith("test-clue-1", "");
  });
});