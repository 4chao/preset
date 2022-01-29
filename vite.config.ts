import { defineConfig } from 'vite'
import path from 'path'

import uni from '@dcloudio/vite-plugin-uni'
import ViteRestart from 'vite-plugin-restart'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  plugins: [
    uni(),
    ViteRestart({
      restart: ['src/pages.js', 'src/app.config.js'],
    }),
    AutoImport({
      imports: ['vue', { '@/app/index': [['app', 'app']] }],
      dts: 'declare/auto-imports.d.ts',
    }),
  ],
})
