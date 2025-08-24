import { render, screen } from "@testing-library/react";
import Markdown from "@/components/markdown";

describe("Markdown", () => {
  it("renders plain text content", () => {
    render(<Markdown>Hello world</Markdown>);
    
    expect(screen.getByTestId("mock-markdown")).toBeInTheDocument();
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("renders markdown formatting", () => {
    const markdownContent = "Bold text and italic text";
    render(<Markdown>{markdownContent}</Markdown>);
    
    expect(screen.getByTestId("mock-markdown")).toBeInTheDocument();
    expect(screen.getByText("Bold text and italic text")).toBeInTheDocument();
  });

  it("renders external links with proper attributes", () => {
    const content = "[External link](https://example.com)";
    render(<Markdown>{content}</Markdown>);
    
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByText("External link")).toBeInTheDocument();
    
    // Check for screen reader text
    expect(screen.getByText("components.markdown.link-opens-in-new-tab")).toBeInTheDocument();
  });

  it("renders internal links without target attribute", () => {
    const content = "[Internal link](/internal-page)";
    render(<Markdown>{content}</Markdown>);
    
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/internal-page");
    expect(link).not.toHaveAttribute("target");
    expect(screen.getByText("Internal link")).toBeInTheDocument();
    
    // Should not have screen reader text for external links
    expect(screen.queryByText("components.markdown.link-opens-in-new-tab")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Markdown className="custom-class">Test content</Markdown>
    );
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("handles different link types correctly", () => {
    const httpContent = "[HTTP link](http://example.com)";
    
    const { rerender } = render(<Markdown>{httpContent}</Markdown>);
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
    
    const httpsContent = "[HTTPS link](https://example.com)";
    rerender(<Markdown>{httpsContent}</Markdown>);
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
    
    const internalContent = "[Internal link](/internal)";
    rerender(<Markdown>{internalContent}</Markdown>);
    expect(screen.getByRole("link")).not.toHaveAttribute("target");
  });
});