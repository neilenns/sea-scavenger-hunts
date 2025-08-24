// Mock useTransition
const mockStartTransition = jest.fn();
const mockReplace = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useTransition: () => [false, mockStartTransition],
}));

jest.mock("@/i18n/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  usePathname: () => "/post-security",
  Link: ({ href, children, ...props }) => <a href={href} {...props}>{children}</a>,
}));

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useParams: () => ({ locale: "en" }),
}));

jest.mock("next-intl", () => ({
  useTranslations: (namespace) => (key) => {
    if (namespace === "components") {
      const translations = {
        "language-switcher.en": "English",
        "language-switcher.fr": "Français", 
        "language-switcher.de": "Deutsch",
        "language-switcher.es": "Español",
      };
      return translations[key] || key;
    }
    return key;
  },
  useLocale: () => "en",
}));

jest.mock("lucide-react", () => ({
  GlobeIcon: ({ className, ...props }) => <svg className={className} {...props} data-testid="globe-icon" />,
}));

jest.mock("country-flag-icons/react/3x2", () => ({
  US: ({ className, ...props }) => <svg className={className} role="img" aria-hidden="true" {...props} data-testid="us-flag" />,
  FR: ({ className, ...props }) => <svg className={className} role="img" aria-hidden="true" {...props} data-testid="fr-flag" />,
  DE: ({ className, ...props }) => <svg className={className} role="img" aria-hidden="true" {...props} data-testid="de-flag" />,
  ES: ({ className, ...props }) => <svg className={className} role="img" aria-hidden="true" {...props} data-testid="es-flag" />,
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

jest.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }) => <div data-testid="dropdown-menu">{children}</div>,
  DropdownMenuContent: ({ children, ...props }) => <div {...props} data-testid="dropdown-content">{children}</div>,
  DropdownMenuRadioGroup: ({ children, value, onValueChange }) => (
    <div role="radiogroup" data-testid="radio-group" onChange={(e) => onValueChange?.(e.target.value)}>
      {children}
    </div>
  ),
  DropdownMenuRadioItem: ({ children, value, ...props }) => (
    <div role="menuitemradio" data-value={value} {...props}>
      {children}
    </div>
  ),
  DropdownMenuTrigger: ({ children, asChild }) => (asChild ? children : <div>{children}</div>),
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LanguageSwitcher from "@/components/language-switcher";

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the language switcher button", () => {
    render(<LanguageSwitcher />);
    
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "English");
  });

  it("displays current language text", () => {
    render(<LanguageSwitcher />);
    
    expect(screen.getByText("English")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<LanguageSwitcher className="custom-class" />);
    
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("opens dropdown menu when clicked", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);
    
    const button = screen.getByRole("button");
    await user.click(button);
    
    // Check that all language options are present
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Français")).toBeInTheDocument();
    expect(screen.getByText("Deutsch")).toBeInTheDocument();
    expect(screen.getByText("Español")).toBeInTheDocument();
  });

  it("handles pending state correctly", () => {
    // Mock useTransition to return pending state
    jest.mocked(require("react").useTransition).mockReturnValue([true, mockStartTransition]);
    
    render(<LanguageSwitcher />);
    
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });
});