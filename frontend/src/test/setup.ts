import { expect, afterEach, afterAll, beforeAll, vi } from 'vitest';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extinde expect cu matchers de la @testing-library/jest-dom
expect.extend(matchers);

// Configurare globală pentru testare
beforeAll(() => {
  // Mockuri globale pentru obiectele browser care nu sunt disponibile în jsdom
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Mockuri pentru localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });

  // Mockuri pentru sessionStorage
  Object.defineProperty(window, 'sessionStorage', {
    value: localStorageMock,
  });

  // Suprimă avertismentele
  vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

// Curățare după fiecare test
afterEach(() => {
  // Curăță DOM-ul după fiecare test
  cleanup();

  // Resetează toate mockurile
  vi.clearAllMocks();
});

// Curățare după toate testele
afterAll(() => {
  // Restaurează console.error și console.warn
  vi.restoreAllMocks();
});
