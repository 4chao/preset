import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { vitePluginMacro } from 'vite-plugin-macro'

import * as Hooks from '../src/hooks'
import { provideDebug } from '../macros/debug'

const macroSet = vitePluginMacro({
  typesPath: 'declare/macros.d.ts',
  include: ['**/*.ts', '**/*.vue'],
}) //在下面注入宏
  .use(provideDebug())

export const Macros = () => macroSet.toPlugin().map(e => ({ ...e, enforce: 'post' }))

export const ImportsConfig: Parameters<typeof AutoImport>[0] = {
  imports: [
    'vue',
    'uni-app',
    { '@/app/index': ['app'] },
    { '@/app/utils/request': ['api'] },
    getImports('@/hooks', Hooks),
    { 'power-assert': [['default', 'assert']] },

    // 自动引入变量名以$开头的宏
    ...Object.entries((macroSet as any).runtime.macros).map(
      ([modules, macros]: [string, any[]]) => ({
        [modules]: macros.map(m => m.name).filter(name => name.startsWith('$')),
      }),
    ),
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
