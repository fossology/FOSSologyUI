import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "node",
  setupFiles: ["<rootDir>/jest.setup.env.js"],
  roots: ["<rootDir>/src"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    // query-string (and its deps) are ESM-only; next/jest cannot un-ignore
    // node_modules, so map to a CommonJS stand-in. See jest/queryStringMock.js.
    "^query-string$": "<rootDir>/jest/queryStringMock.js",
  },
  // Only the suites this change introduces/maintains. The other src/api/*.test.js
  // files predate any test runner in this repo (there was no `jest` dependency,
  // no config and no `test` script) and need their own setup — `jest-fetch-mock`
  // and a jsdom environment — before they can run. Reviving them is out of scope
  // for the job-scheduling fix.
  testMatch: [
    "<rootDir>/src/services/**/*.test.{js,jsx}",
    "<rootDir>/src/api/jobs.test.{js,jsx}",
  ],
  clearMocks: true,
};

export default createJestConfig(config);
