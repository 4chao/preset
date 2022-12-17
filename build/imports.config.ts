import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import * as Hooks from '../src/hooks'

export const ImportsConfig: Parameters<typeof AutoImport>[0] = {
  imports: [
    'vue',
    'uni-app',
    { '@/app/index': ['app'] },
    { '@/app/utils/request': ['api'] },
    getImports('@/hooks', Hooks),
    { 'power-assert': [['default', 'assert']] },
  ],
  dts: 'declare/auto-imports.d.ts',
}

function getImports(path: string, o: Record<string, any>) {
  return { [path]: Object.keys(o) }
}

export const ComponentsConfig: Parameters<typeof Components>[0] = {
  dts: 'declare/components.d.ts',
  dirs: ['src/components', 'src/modules', 'node_modules/@dcloudio/uni-ui/lib'],
}
