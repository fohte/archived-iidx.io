module.exports = {
  collectCoverageFrom: [
    'src/**/*.{{j,t}s{,x}}',
    '!src/.next/**/*',
    '!src/queries/index.tsx',
  ],
  coverageDirectory: './coverage/',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/$1',
    '\\.s?css$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/src/.next/', '<rootDir>/node_modules/'],
  testMatch: ['**/__tests__/**/*.test.{j,t}s{,x}'],
}
