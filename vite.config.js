import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const base = '/About_My/';

export default defineConfig({
  base,

  plugins: [
    react(),
    {
      name: 'github-pages-public-asset-paths',
      transform(code, id) {
        if (!id.includes('/src/') || (!id.endsWith('.jsx') && !id.endsWith('.css'))) {
          return null;
        }

        const rewritten = code.replaceAll('/assets/', `${base}assets/`);
        return rewritten === code ? null : { code: rewritten, map: null };
      },
    },
  ],

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
