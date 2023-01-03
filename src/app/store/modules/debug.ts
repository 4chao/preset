import { Store, Pinia, Persist } from '../utils'

interface LoggerOptions {
  content: any[]
  type?: 'log' | 'warn' | 'error'
  scope?: string
  path?: string
}

@Store
export class Debug extends Pinia {
  @Persist
  includesPath = import.meta.env.DEV ? '.*' : ''

  _logger(options: LoggerOptions) {
    if (options.path && !new RegExp(this.includesPath).test(options.path)) return

    const { path, content, type = '', scope = '' } = options
    const meta = []
    if (path) meta.push(path.replace(/[\\\/]/g, ':').replace(/\..*$/g, ''))
    if (scope) meta.push(`[${scope}]`)
    console[type]?.(...meta, ...content, path)
  }
}
