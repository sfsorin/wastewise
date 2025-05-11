// Importă extensiile pentru Jest DOM
import '@testing-library/jest-dom';

// Configurare globală pentru testare
beforeAll(() => {
  // Mockuri globale pentru obiectele browser care nu sunt disponibile în jsdom
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
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

  // Suprimă avertismentele de la React
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

// Curățare după fiecare test
afterEach(() => {
  // Resetează toate mockurile
  jest.clearAllMocks();
});

// Curățare după toate testele
afterAll(() => {
  // Restaurează console.error și console.warn
  jest.restoreAllMocks();
});
