import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import * as path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    eslint({
      include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
    }),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, './src/assets/images') + '/[!.]*', // 1️⃣
          dest: './src/assets/images', // 2️⃣
        },
        {
          src:
            path.resolve(__dirname, './src/assets/fonts/HankenGrotesk') +
            '/[!.]*', // 1️⃣
          dest: './src/assets/fonts/HankenGrotesk', // 2️⃣
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    assetsDir: 'src/assets',
  },
});
