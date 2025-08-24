import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@/components/theme-provider";

describe("ThemeProvider", () => {
  it("renders children correctly", () => {
    render(
      <ThemeProvider>
        <div data-testid="test-child">Test content</div>
      </ThemeProvider>
    );

    expect(screen.getByTestId("test-child")).toBeInTheDocument();
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("passes through theme provider props", () => {
    render(
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div data-testid="test-child">Test content</div>
      </ThemeProvider>
    );

    expect(screen.getByTestId("test-child")).toBeInTheDocument();
  });
});