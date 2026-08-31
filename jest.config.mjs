const config = {
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["<rootDir>/jest.setup.env.js"],
  roots: ["<rootDir>/src"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.[jt]sx?$": ["babel-jest", { configFile: "./babel.config.test.js" }],
  },
  transformIgnorePatterns: [
    "/node_modules/.pnpm/(?!(query-string|decode-uri-component|filter-obj|split-on-first)@)",
  ],
  testMatch: ["<rootDir>/src/**/*.test.{js,jsx}"],
  clearMocks: true,
};

export default config;
