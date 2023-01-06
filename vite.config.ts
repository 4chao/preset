/// <reference types="vitest" />
import { defineConfig } from 'vite'
import path from 'path'

import uni from '@dcloudio/vite-plugin-uni'
import ViteRestart from 'vite-plugin-restart'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Inspect from 'vite-plugin-inspect'
import Unocss from 'unocss/vite'
import UniMeta from './build/vite-plugin-uni-meta'
import UniProvider from './build/vite-plugin-uni-provider'
import Espower from './build/vite-plugin-espower'
import Define from './build/vite-plugin-define'
import { visualizer } from 'rollup-plugin-visualizer'

import { Macros, ImportsConfig, ComponentsConfig } from './build/imports.config'

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
    ViteRestart({ restart: ['src/app.config.ts'] }),
    AutoImport(ImportsConfig),
    Components(ComponentsConfig),
    uni({ vueOptions: { reactivityTransform: true } }),
    Espower(),
    Define(), //添加一些全局变量
    Macros(), //宏
    visualizer(), //可视化依赖关系
  ],
  esbuild: { keepNames: true },
  optimizeDeps: { exclude: ['lodash-es'] },
})
