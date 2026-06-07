// Jest configuration (updated to handle JSX, module aliases, and a few ESM node modules)
// This configuration focuses on frontend UI tests only and keeps changes minimal.

module.exports = {
  // Use jsdom environment for React component tests
  testEnvironment: 'jsdom',

  // Ignore backend/API folders so Jest only runs frontend UI tests
  testPathIgnorePatterns: ['<rootDir>/src/api/', '<rootDir>/server/'],

  // Transform JS/JSX using babel-jest so JSX is supported
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  // For some ESM node modules (like query-string) we need Jest to transform them too.
  // This pattern tells Jest to ignore transforming most node_modules but allow query-string.
  transformIgnorePatterns: ['node_modules/(?!(query-string)/)'],

  // Map static assets and style imports to mocks to avoid parsing issues during tests
  moduleNameMapper: {
    // CSS modules and plain CSS imports -> use a simple style mock
    '\\.(css|less|sass|scss)$': '<rootDir>/jest/styleMock.js',
    // Static assets (images, fonts) -> use a file mock that returns a filename
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': '<rootDir>/jest/fileMock.js',
    // Support the @/* path alias used in the project (maps to src/*)
    '^@/(.*)$': '<rootDir>/src/$1',
    '^shared/(.*)$': '<rootDir>/src/shared/$1',
    // Map styled-components to a lightweight mock so styled.* usage works in tests
    '^styled-components$': '<rootDir>/jest/styledComponentsMock.js',
    // Mock query-string to avoid ESM import errors from that package during tests
    '^query-string$': '<rootDir>/jest/queryStringMock.js',
    // Provide lightweight mocks for internal UI primitives used across components
    '^@/components/ui/(.*)$': '<rootDir>/jest/ui-mocks/$1.js',
  },

  // Recognize these file extensions
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],

  // Run this setup file after the test environment is set up
  setupFilesAfterEnv: ['<rootDir>/jest/setupTests.js'],
};
