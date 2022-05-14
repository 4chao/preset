import AutoImport from 'unplugin-auto-import/vite'
import * as Hooks from '../src/hooks'

const Config: Parameters<typeof AutoImport>[0] = {
  imports: [
    'vue',
    'uni-app',
    { '@/app/index': ['app'] },
    getImports('@/hooks', Hooks),
    { 'power-assert': [['default', 'assert']] },
  ],
  dts: 'declare/auto-imports.d.ts',
}

function getImports(path: string, o: Record<string, any>) {
  return { [path]: Object.keys(o) }
}

export default Config
