/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wyw from '@wyw-in-js/vite';

const wywPlugin = wyw({
  include: ['src/**/*.{ts,tsx}'],
  babelOptions: {
    presets: ['@babel/preset-typescript'],
  },
});
wywPlugin.enforce = 'pre';

export default defineConfig({
  base: '/website/',
  plugins: [wywPlugin, react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/utils/tests/setupTests.tsx',
    css: true, // not to disable css for testing
  },
});
