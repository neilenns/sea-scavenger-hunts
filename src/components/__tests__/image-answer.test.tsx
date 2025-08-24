import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ImageAnswer } from "@/components/image-answer";
import { Clue, AirportArea, ClueType } from "@/types/clue";
import { AnswerType } from "@/types/answer";

// Mock the hooks
jest.mock("@/hooks/use-persistent-answer", () => ({
  usePersistentAnswer: jest.fn(),
}));

jest.mock("@/hooks/use-mobile", () => ({
  useIsMobile: jest.fn(),
}));

const mockUsePersistentAnswer = require("@/hooks/use-persistent-answer").usePersistentAnswer;
const mockUseIsMobile = require("@/hooks/use-mobile").useIsMobile;

// Mock URL methods
global.URL.createObjectURL = jest.fn(() => "mocked-url");
global.URL.revokeObjectURL = jest.fn();

describe("ImageAnswer", () => {
  const mockClue: Clue = {
    id: "test-image-clue-1",
    type: ClueType.TEXT,
    airportArea: AirportArea.AIRPORT_WIDE,
    sortOrder: 1,
    answer: {
      type: AnswerType.IMAGE,
      expectedImageCount: 1,
    },
  };

  const mockSetFiles = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    global.URL.createObjectURL.mockClear();
    global.URL.revokeObjectURL.mockClear();
  });

  it("renders image upload interface when loaded", () => {
    mockUsePersistentAnswer.mockReturnValue([[], mockSetFiles, true]);
    mockUseIsMobile.mockReturnValue(false);

    render(<ImageAnswer clue={mockClue} />);

    expect(screen.getByText("components.image-answer.choose-files-button")).toBeInTheDocument();
  });

  it("does not render when not loaded", () => {
    mockUsePersistentAnswer.mockReturnValue([[], mockSetFiles, false]);
    mockUseIsMobile.mockReturnValue(false);

    const { container } = render(<ImageAnswer clue={mockClue} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("shows camera button on mobile", () => {
    mockUsePersistentAnswer.mockReturnValue([[], mockSetFiles, true]);
    mockUseIsMobile.mockReturnValue(true);

    render(<ImageAnswer clue={mockClue} />);

    expect(screen.getByText("components.image-answer.take-photo-button")).toBeInTheDocument();
  });

  it("hides camera button on desktop", () => {
    mockUsePersistentAnswer.mockReturnValue([[], mockSetFiles, true]);
    mockUseIsMobile.mockReturnValue(false);

    render(<ImageAnswer clue={mockClue} />);

    expect(screen.queryByText("components.image-answer.take-photo-button")).not.toBeInTheDocument();
  });

  it("handles file selection correctly", () => {
    mockUsePersistentAnswer.mockReturnValue([[], mockSetFiles, true]);
    mockUseIsMobile.mockReturnValue(false);

    render(<ImageAnswer clue={mockClue} />);

    const fileInput = document.querySelector('#test-image-clue-1');
    const file = new File(["test"], "test.jpg", { type: "image/jpeg" });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockSetFiles).toHaveBeenCalledWith(expect.any(Function));
  });

  it("displays uploaded images", () => {
    const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
    mockUsePersistentAnswer.mockReturnValue([[mockFile], mockSetFiles, true]);
    mockUseIsMobile.mockReturnValue(false);

    render(<ImageAnswer clue={mockClue} />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(mockFile);
  });

  it("allows removing uploaded images", async () => {
    const user = userEvent.setup();
    const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
    mockUsePersistentAnswer.mockReturnValue([[mockFile], mockSetFiles, true]);
    mockUseIsMobile.mockReturnValue(false);

    render(<ImageAnswer clue={mockClue} />);

    const removeButton = screen.getByLabelText("components.image-answer.remove-image-aria");
    await user.click(removeButton);

    expect(mockSetFiles).toHaveBeenCalledWith(expect.any(Function));
  });

  it("supports multiple images when expected", () => {
    const multipleImagesClue: Clue = {
      ...mockClue,
      answer: {
        type: AnswerType.IMAGE,
        expectedImageCount: 3,
      },
    };

    mockUsePersistentAnswer.mockReturnValue([[], mockSetFiles, true]);
    mockUseIsMobile.mockReturnValue(false);

    render(<ImageAnswer clue={multipleImagesClue} />);

    const fileInput = document.querySelector('input[type="file"]:not([capture])');
    expect(fileInput).toHaveAttribute("multiple");
  });

  it("throws error for non-image answer type", () => {
    const nonImageClue: Clue = {
      ...mockClue,
      answer: {
        type: AnswerType.TEXT,
      },
    };

    mockUsePersistentAnswer.mockReturnValue([[], mockSetFiles, true]);

    expect(() => render(<ImageAnswer clue={nonImageClue} />)).toThrow(
      "ImageAnswer component expects an image answer"
    );
  });

  it("cleans up object URLs on unmount", () => {
    const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
    mockUsePersistentAnswer.mockReturnValue([[mockFile], mockSetFiles, true]);
    mockUseIsMobile.mockReturnValue(false);

    const { unmount } = render(<ImageAnswer clue={mockClue} />);
    unmount();

    expect(global.URL.revokeObjectURL).toHaveBeenCalledWith("mocked-url");
  });

  it("initializes with correct clue ID", () => {
    mockUsePersistentAnswer.mockReturnValue([[], mockSetFiles, true]);
    mockUseIsMobile.mockReturnValue(false);

    render(<ImageAnswer clue={mockClue} />);

    expect(mockUsePersistentAnswer).toHaveBeenCalledWith("test-image-clue-1", []);
  });
});