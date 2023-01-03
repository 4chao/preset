import { Store, Pinia, Persist } from '../utils'
import uniqolor from 'uniqolor'

interface LoggerOptions {
  content: any[]
  type?: 'log' | 'warn' | 'error'
  scope?: string
  path?: string
  color?: string
}

@Store
export class Debug extends Pinia {
  @Persist
  includesPath = import.meta.env.DEV ? '.*' : ''

  _logger(options: LoggerOptions) {
    if (options.path && !new RegExp(this.includesPath).test(options.path)) return
    const { path, content, type = '', scope = '' } = options
    const namespace = path
      .replace(/[\\\/]/g, ':')
      .replace(/\.[tj]s$/g, '')
      .replace(/\:index$/, '')

    const meta = []
    if (path) meta.push(...addColor(namespace))
    if (scope) meta.push(`[ ${scope} ]`)
    console.log(...meta, ...content, getTime())
  }
}

function addColor(str: string) {
  const color = uniqolor(str).color
  if (allowDevTools) return ['%c' + str, 'font-weight: bold; color: ' + color]
  else return [str]
}

let lastTime = Date.now()
function getTime(time = Date.now()) {
  let output, unit
  let stack = ['ms', 's', 'm', 'h'] as any
  do {
    unit = stack.pop()
    output = app.time(time).diff(lastTime, unit)
  } while (!output && stack.length)
  lastTime = time
  return `+${output} ${unit}`
}

// #ifdef APP-PLUS
// @ts-expect-error 使用条件编译
const allowDevTools = !!new Function('return this')().__WEEX_DEVTOOL__
// #endif
// #ifndef APP-PLUS
// @ts-expect-error 使用条件编译
const allowDevTools = true
// #endif
