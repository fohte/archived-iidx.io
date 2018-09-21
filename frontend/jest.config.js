module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '{components,contexts,lib,pages,queries}/**/*.{{j,t}s{,x}}',
  ],
  coverageDirectory: './coverage/',
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsConfig: '<rootDir>/tsconfig.jest.json',
    },
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/$1',
  },
  setupFiles: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  transform: {
    '^.+\\.jsx?$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
}
