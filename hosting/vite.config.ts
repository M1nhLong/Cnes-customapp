/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isProduction = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: isProduction,
    minify: isProduction,
    cssMinify: true,
    outDir: '../public',
    chunkSizeWarningLimit: 512,
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
