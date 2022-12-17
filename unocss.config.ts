import type { Preset, SourceCodeTransformer } from 'unocss'
import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import {
  presetApplet,
  presetRemToRpx,
  transformerApplet,
  transformerAttributify,
} from 'unocss-applet'
import { times } from 'lodash'
import path from 'path'

const presets: Preset[] = []
const transformers: SourceCodeTransformer[] = []
const isMP = !!process.env.UNI_PLATFORM?.startsWith('mp')

if (!isMP) {
  presets.push(presetAttributify())
} else {
  transformers.push(transformerAttributify())
  transformers.push(transformerApplet())
}

export default defineConfig({
  theme: {
    spacing: [
      ...['none', 'xs', 'sm', 'DEFAULT', 'lg', 'xl'],
      ...times(8).map(n => n + 2 + 'xl'),
    ].reduce((o, k, i) => {
      if (isMP) o[k] = (i * 10).toFixed(2) + 'rpx'
      else o[k] = (i / 3.2).toFixed(2) + 'rem'
      return o
    }, {}),
    breakpoints: {},
  },
  presets: [presetUno(), presetIcons(), ...presets],
  transformers: [transformerDirectives(), transformerVariantGroup(), ...transformers],
  shortcuts: {
    'flex-center': 'flex flex-row justify-center items-center',
    'flex-center-col': 'flex flex-col justify-center items-center',
  },
  include: [path.resolve(__dirname, 'src', '**')],
})
