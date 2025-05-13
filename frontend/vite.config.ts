import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Încărcăm variabilele de mediu în funcție de modul de construire
  const env = loadEnv(mode, process.cwd(), '');

  // Verificăm dacă trebuie să sărim peste verificarea tipurilor
  const skipTypeCheck = process.argv.includes('--skipTypeCheck');

  return {
    plugins: [react()],
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
    server: {
      port: parseInt(process.env.VITE_PORT || '5173'),
      open: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      chunkSizeWarningLimit: 1600,
      // Dezactivăm verificarea tipurilor dacă este specificat flag-ul
      typescript: {
        typeCheck: !skipTypeCheck,
      },
      // Adăugăm opțiuni pentru a rezolva conflictele de dependențe
      commonjsOptions: {
        esmExternals: true,
      },
      rollupOptions: {
        // Opțiuni pentru a rezolva conflictele de dependențe
        external: [],
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            zustand: ['zustand', 'immer'],
          },
        },
      },
    },
    // Adăugăm opțiuni pentru a rezolva conflictele de dependențe
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'zustand', 'immer'],
      exclude: [],
    },
  };
});
