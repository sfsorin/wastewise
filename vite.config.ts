import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    deps: {
      inline: ["vitest-canvas-mock"],
    },
    environmentOptions: {
      jsdom: {
        resources: "usable",
      },
    },
    browser: {
      enabled: true,
      name: "chrome",
    },
    include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    css: true,
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts",
        "**/*.test.{ts,tsx}",
        "src/main.tsx",
        "src/vite-env.d.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  server: {
    port: parseInt(process.env.VITE_PORT || "5173"),
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    chunkSizeWarningLimit: 1600,
  },
});
