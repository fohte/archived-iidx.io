const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$'

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '{components,contexts,lib,pages,queries}/**/*.{{j,t}s{,x}}',
  ],
  globals: {
    'ts-jest': {
      tsConfigFile: '<rootDir>/tsconfig.jest.json',
      useBabelrc: true,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testRegex: TEST_REGEX,
  transform: {
    '^.+\\.jsx?$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
}
