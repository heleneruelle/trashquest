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
  esbuild: {
    target: 'esnext', // Ensure ESNext to support Top-level await
  },
  build: {
    target: 'esnext', // Same for the build step
  },
});
