import "@testing-library/jest-dom";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  useParams: () => ({}),
  usePathname: () => "/en",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next-intl navigation
jest.mock("@/i18n/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  usePathname: () => "/post-security",
  Link: ({ href, children, ...props }) => <a href={href} {...props}>{children}</a>,
}));

// Mock next-intl hooks
jest.mock("next-intl", () => ({
  useTranslations: (namespace) => {
    const t = (key, values) => {
      let result = namespace ? `${namespace}.${key}` : key;
      
      // Handle interpolation
      if (values) {
        Object.keys(values).forEach((valueKey) => {
          result = result.replace(`{${valueKey}}`, values[valueKey]);
        });
      }
      
      return result;
    };
    
    // Add has method for checking if translation exists
    t.has = (key) => true;
    
    return t;
  },
  useLocale: () => "en",
}));

// Mock react-markdown
jest.mock("react-markdown", () => {
  return ({ children, components }) => {
    if (components?.a) {
      // Test link component behavior
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const parts = children.split(linkRegex);
      
      return (
        <div data-testid="mock-markdown">
          {parts.map((part, index) => {
            if (index % 3 === 1) { // Link text
              const href = parts[index + 1];
              return components.a({ href, children: part, key: index });
            } else if (index % 3 === 2) { // Skip href part
              return null;
            }
            return part || "";
          })}
        </div>
      );
    }
    return <div data-testid="mock-markdown">{children}</div>;
  };
});

// Mock remark-gfm
jest.mock("remark-gfm", () => ({}));

// Mock IndexedDB
global.indexedDB = {
  open: jest.fn(),
  deleteDatabase: jest.fn(),
  databases: jest.fn(),
};

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  root: null,
  rootMargin: "",
  thresholds: [],
}));

// Mock flag components
jest.mock("country-flag-icons/react/3x2", () => ({
  US: ({ className, ...props }) => <svg className={className} role="img" aria-hidden="true" {...props} />,
  FR: ({ className, ...props }) => <svg className={className} role="img" aria-hidden="true" {...props} />,
  DE: ({ className, ...props }) => <svg className={className} role="img" aria-hidden="true" {...props} />,
  ES: ({ className, ...props }) => <svg className={className} role="img" aria-hidden="true" {...props} />,
}));

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  GlobeIcon: ({ className, ...props }) => <svg className={className} {...props} />,
  CameraIcon: ({ className, ...props }) => <svg className={className} {...props} />,
  FileIcon: ({ className, ...props }) => <svg className={className} {...props} />,
  TrashIcon: ({ className, ...props }) => <svg className={className} {...props} />,
}));

// Mock shadcn/ui components
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

jest.mock("@/components/ui/input", () => ({
  Input: (props) => <input {...props} />,
}));

jest.mock("@/components/ui/card", () => ({
  Card: ({ children, ...props }) => <div {...props}>{children}</div>,
  CardContent: ({ children, ...props }) => <div {...props}>{children}</div>,
}));

jest.mock("@/components/ui/accordion", () => ({
  Accordion: ({ children, ...props }) => <div {...props}>{children}</div>,
  AccordionContent: ({ children, ...props }) => <div {...props}>{children}</div>,
  AccordionItem: ({ children, ...props }) => <div {...props}>{children}</div>,
  AccordionTrigger: ({ children, ...props }) => <button {...props}>{children}</button>,
}));