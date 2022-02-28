import { defineConfig } from 'vite'
import path from 'path'

import uni from '@dcloudio/vite-plugin-uni'
import ViteRestart from 'vite-plugin-restart'
import AutoImport from 'unplugin-auto-import/vite'
import Inspect from 'vite-plugin-inspect'
import Unocss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import presetUniapp from './build/uniapp.preset'
import presetAppUtils from './build/appUtils.preset'
import UniMeta from './build/vite-plugin-uni-meta'
import UniProvider from './build/vite-plugin-uni-provider'
import MpAttrFix from './build/vite-plugin-mp-attr-fix'
import RelaxedUnit from 'postcss-relaxed-unit'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    Inspect(),
    MpAttrFix(),
    UniMeta(),
    UniProvider(),
    Unocss({
      presets: [presetUno(), presetAttributify({ prefix: 'data-' }), presetIcons()],
    }),
    ViteRestart({
      restart: ['src/pages.js', 'src/app.config.ts'],
    }),
    AutoImport({
      imports: ['vue', presetAppUtils, presetUniapp],
      dts: 'declare/auto-imports.d.ts',
    }),
    uni({
      vueOptions: {
        reactivityTransform: true,
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [
        RelaxedUnit({
          rules: { rem: 'mul(10).unit(rpx)' },
        }) as any,
      ],
    },
  },
})
