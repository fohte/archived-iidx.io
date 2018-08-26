const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$'

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '{components,contexts,lib,pages,queries}/**/*.{{j,t}s{,x}}',
  ],
  coverageDirectory: './coverage/',
  globals: {
    'ts-jest': {
      tsConfigFile: '<rootDir>/tsconfig.jest.json',
      useBabelrc: true,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: { '@app/(.*)': '<rootDir>/$1' },
  setupFiles: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testRegex: TEST_REGEX,
  transform: {
    '^.+\\.jsx?$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
}
