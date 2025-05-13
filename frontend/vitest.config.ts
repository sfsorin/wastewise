import { defineConfig } from 'vitest/config';
import path from 'path';
import react from '@vitejs/plugin-react';

// Configurație separată pentru Vitest
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    deps: {
      // Includem toate dependențele problematice pentru a evita conflictele
      inline: [
        'vitest-canvas-mock',
        '@vitest/coverage-v8',
        '@testing-library/react',
        '@testing-library/jest-dom',
        '@testing-library/user-event',
      ],
      // Dezactivăm verificarea peer dependencies pentru a evita erorile ERESOLVE
      fallbackCJS: true,
      interopDefault: true,
    },
    // Adăugăm opțiuni pentru a rezolva conflictele
    pool: 'forks', // Folosim forks în loc de threads pentru a evita probleme de compatibilitate
    isolate: true, // Izolăm testele pentru a evita efecte secundare
    testTimeout: 10000, // Mărim timeout-ul pentru teste
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@config': path.resolve(__dirname, './src/config'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
});
