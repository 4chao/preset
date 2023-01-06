import { defineMacro, defineMacroProvider } from 'vite-plugin-macro'
import { relative, resolve } from 'path'
import { getMacroType } from './utils'

const types = ['debug', 'log', 'info', 'warn', 'error']

const debugMacros = types.map(name =>
  defineMacro('$' + name)
    .withSignature(`<T>(...args:any[]): void`, `debug宏函数`)
    .withHandler((ctx, babel, helper) => {
      const { path, args, filepath } = ctx
      const { template, types, generate } = babel

      const scope = getMacroType(ctx, babel).map(item => item.literal['value'])?.[0] || ''

      if (!helper.hasImported({ moduleName: '/src/app/store' })) {
        helper.appendImports({
          exportName: 'stores',
          moduleName: '/src/app/store',
        })
      }
      const relativePath = relative(resolve(process.cwd(), 'src'), filepath)
      const argsStr = args.map(e => generate(e.node as any).code).join(',')

      path.replaceWithMultiple([
        template.statement.ast(
          `stores.Debug?._logger({ content: [${argsStr}], scope: '${scope}', type: '${name}', path: '${relativePath}'})`,
        ),
      ])
    }),
)

export function provideDebug() {
  return defineMacroProvider({
    id: 'debug',
    exports: {
      'debug.macro': {
        macros: debugMacros,
      },
    },
  })
}
