import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { netlifyPlugin } from '@netlify/remix-adapter/plugin';

export default defineConfig({
  plugins: [remix(), netlifyPlugin(), tsconfigPaths()],
  resolve: {
    alias: {
      '/locales': '/public/locales',
    },
  },
  build: {
    ssr: true, // Active SSR
    target: 'node16', // Cible Node.js pour le SSR
  },
});
