import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  // GitHub Pages serves this project below /About_My/.
  base: command === 'build' ? '/About_My/' : '/',
  plugins: [
    react(),
    {
      // The project lives on a network drive (F:). A brief network drop makes the
      // file watcher emit ENETUNREACH, which would otherwise kill the dev server.
      name: 'ignore-network-watch-errors',
      configureServer(server) {
        server.watcher.on('error', (err) => {
          server.config.logger.warn(`[watch] ${err.code || err.message} — network drive hiccup, continuing.`);
        });
      },
    },
  ],
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
