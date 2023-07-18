import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: import('jest').Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['./node_modules', './.next'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  moduleNameMapper: {
    '^@/src/(.*)$': '<rootDir>/src/$1',
  },
  coverageProvider: 'v8',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.tsx'],
};

export default createJestConfig(config);
