/** @type {import('jest').Config} */
const config = {
  displayName: "sea-scavenger-hunts",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: [
    "**/__tests__/**/*.(ts|tsx|js)",
    "**/*.(test|spec).(ts|tsx|js)",
  ],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/components/ui/**", // Exclude shadcn components
    "!src/lib/utils.ts", // Exclude shadcn utils
    "!src/hooks/**", // Exclude shadcn hooks
    "!src/types/cloudflare-env.d.ts", // Exclude auto-generated types
  ],
  coverageReporters: ["text", "lcov", "html"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  transformIgnorePatterns: [
    "/node_modules/(?!(country-flag-icons|@radix-ui|lucide-react|react-markdown|remark-gfm|unified|unist-util-*|micromark|vfile|mdast-*|remark-*|ccount|escape-string-regexp|markdown-table|micromark-*|decode-named-character-reference|character-entities|property-information|hast-util-*|space-separated-tokens|comma-separated-tokens|web-namespaces|zwitch|html-void-elements)/)",
  ],
};

module.exports = config;