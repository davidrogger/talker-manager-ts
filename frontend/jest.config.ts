import nextJest from 'next/jest.js';
import { Config } from 'jest';

const createJestConfig = nextJest({
  dir: './',
});

const config:Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['./node_modules', './.next'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  moduleNameMapper: {
    '^@/src/(.*)$': '<rootDir>/src/$1',
  },
};

export default createJestConfig(config);
