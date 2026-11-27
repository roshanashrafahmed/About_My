
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/About_My/',

  plugins: [react()],

  server: {
    // Project lives on a network share; native fs watching crashes there.
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
});
