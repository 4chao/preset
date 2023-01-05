import { Store, Pinia, Persist } from '../utils'
import uniqolor from 'uniqolor'
import dayjs from 'dayjs'

interface LoggerOptions {
  content: any[]
  path: string
  type?: 'debug' | 'log' | 'info' | 'warn' | 'error'
  scope?: string
}

/**
 * 日志和调试
 */
@Store
export class Debug extends Pinia {
  @Persist
  includes = import.meta.env.DEV ? '.*' : ''

  _logger(options: LoggerOptions) {
    const { path, content, type = 'log', scope = '' } = options
    const namespace = path //构建一些别名, 方便显示
      .replace(/[\\\/]/g, ':')
      .replace(/\.[tj]s$/g, '')
      .replace(/\:index$/, '')
      .replace(/pages\:/, '#')
      .replace(/app\:/, '@')
      .replace(/components\:/, '$')

    // 如果正则命中路径或别名, 则输出到 devtools
    if (new RegExp(this.includes).test(options.path) || new RegExp(this.includes).test(namespace)) {
      const color = uniqolor(namespace).color
      const typeColor = { debug: '#999', log: '#6580b4', info: '#eb8938' }
      const isVue = namespace.endsWith('.vue')
      const output = allowDevTools
        ? [
            `%c${Object.keys(typeColor).includes(type) ? '◍' : ''}` +
              `%c${namespace} %c${scope}  `.padEnd(25, ' ') +
              '%c' +
              content.map(e => (typeof e === 'string' ? '%s' : '%o')).join(' ') +
              ` %c${getTime()}`,
            'margin-right:4px;color:' + (isVue ? '#4FC08D' : typeColor[type]),
            'font-weight: bold; color: ' + color,
            'color: #999',
            '',
            ...content,
            'color: ' + color,
          ]
        : [(namespace + (scope ? ` [${scope}]` : '')).padEnd(30, ' '), ...content, getTime()]
      void {
        debug: () => console.log(...output),
        log: () => console.log(...output),
        info: () => console.info(...output),
        warn: () => console.warn(...output),
        error: () => console.error(...output),
      }[type]?.()
    }

    // TODO: 缓存日志

    // TODO: 拉齐 toast
  }
}

let lastTime = Date.now()
function getTime(time = Date.now()) {
  let output, unit
  let stack = ['ms', 's', 'm', 'h'] as any
  do {
    unit = stack.pop()
    output = dayjs(time).diff(lastTime, unit)
  } while (!output && stack.length)
  lastTime = time
  return `+${output}${unit}`
}

// #ifdef APP-PLUS
// @ts-expect-error 使用条件编译
const allowDevTools = !!new Function('return this')().__WEEX_DEVTOOL__
// #endif
// #ifndef APP-PLUS
// @ts-expect-error 使用条件编译
const allowDevTools = true
// #endif
