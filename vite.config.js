import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  // GitHub Pages serves this project below /About_My/.
  base: command === 'build' ? '/About_My/' : '/',
  plugins: [react()],
  server: {
    watch: { usePolling: true, interval: 1000 },
  },
  resolve: {
    conditions: ['import', 'module', 'browser', 'default'],
  },
  optimizeDeps: {
    esbuildOptions: {
      conditions: ['import', 'module', 'browser', 'default'],
    },
  },
}));
