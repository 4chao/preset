import { defineConfig } from 'vite'
import path from 'path'

import uni from '@dcloudio/vite-plugin-uni'
import ViteRestart from 'vite-plugin-restart'
import AutoImport from 'unplugin-auto-import/vite'
import presetUniapp from './build/uniapp.preset'
import presetAppUtils from './build/appUtils.preset'
import UniMeta from './build/vite-plugin-uni-meta'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  plugins: [
    UniMeta(),
    uni(),
    ViteRestart({
      restart: ['src/pages.js', 'src/app.config.js'],
    }),
    AutoImport({
      imports: ['vue', presetAppUtils, presetUniapp],
      dts: 'declare/auto-imports.d.ts',
    }),
  ],
})
