import type { Config } from 'jest';
import { defaults } from 'jest-config';

const config: Config = {
  // Indică Jest să folosească TypeScript
  preset: 'ts-jest',

  // Mediul de testare pentru React
  testEnvironment: 'jsdom',

  // Extensiile de fișiere pe care Jest le va recunoaște
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],

  // Transformări pentru diferite tipuri de fișiere
  transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest', { configFile: './babel.config.js' }],
  },

  // Ignoră anumite directoare
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  // Mapări pentru module
  moduleNameMapper: {
    // Mapări pentru path aliases
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@layouts/(.*)$': '<rootDir>/src/layouts/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',

    // Mapări pentru fișiere statice
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.ts',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },

  // Fișiere de setup pentru Jest
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Colectează coverage
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts',
    '!src/__mocks__/**',
    '!src/**/*.stories.{ts,tsx}',
  ],
  coverageDirectory: 'coverage',

  // Threshold pentru coverage
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  // Afișează un sumar detaliat al testelor
  verbose: true,
};

export default config;
