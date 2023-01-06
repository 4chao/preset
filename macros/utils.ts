import readCache from 'read-cache'
import { Babel, MacroContext } from 'vite-plugin-macro'
import { TSLiteralType } from '@babel/types'

export function getSourceCode(path: string) {
  return readCache.sync(path, 'utf-8')
}

export function getMacroName(ctx: MacroContext) {
  return ctx.path.node.callee['name']
}

export function getMacroType(ctx: MacroContext, babel: Readonly<Babel>): TSLiteralType[] {
  const re = new RegExp(`\\${getMacroName(ctx)}(?:\\<[\\s\\S]*?|[\\r\\n]*?)\\(`, 'g')
  const number = ctx.code.slice(0, ctx.path.node.end).match(re).length
  const code = getSourceCode(ctx.filepath).match(re)[number - 1] + ')'
  const ast = babel.parse(code, { plugins: ['typescript'] })
  return ast?.program.body[0]?.['expression']?.typeParameters?.params || []
}
