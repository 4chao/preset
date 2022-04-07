/// <reference types="vitest" />
import { defineConfig } from 'vite'
import path from 'path'

import uni from '@dcloudio/vite-plugin-uni'
import ViteRestart from 'vite-plugin-restart'
import AutoImport from 'unplugin-auto-import/vite'
import Inspect from 'vite-plugin-inspect'
import Unocss from 'unocss/vite'
import UniMeta from './build/vite-plugin-uni-meta'
import UniProvider from './build/vite-plugin-uni-provider'
import Espower from './build/vite-plugin-espower'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@root': path.resolve(__dirname),
      lodash: 'lodash-es',
    },
  },
  server: { watch: { ignored: ['**/dist/**'] } },
  plugins: [
    Inspect(), //vite分析工具
    UniMeta(), //自动生成页面meta信息和路由并注册pages.json
    UniProvider(), //自动注册页面全局组件
    Unocss(),
    ViteRestart({
      restart: ['src/pages.js', 'src/app.config.ts'],
    }),
    AutoImport({
      imports: [
        'vue',
        'uni-app',
        { '@/app/index': ['app'] },
        { 'power-assert': [['default', 'assert']] },
      ],
      dts: 'declare/auto-imports.d.ts',
    }),
    isTest() ||
      uni({
        vueOptions: {
          reactivityTransform: true,
        },
      }),
    isTest() && Espower(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    deps: {
      inline: ['@vue'],
    },
  },
})

function isTest() {
  return process.env.NODE_ENV === 'test'
}
