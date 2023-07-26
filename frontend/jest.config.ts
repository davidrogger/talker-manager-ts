import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: import('jest').Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['./node_modules', './.next', './__tests__/utils'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  moduleNameMapper: {
    '^@/src/(.*)$': '<rootDir>/src/$1',
  },
  coverageProvider: 'v8',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.tsx',
    '!<rootDir>/src/app/layout.tsx',
  ],
};

export default createJestConfig(config);
