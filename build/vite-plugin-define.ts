import path from 'path'
import c from 'picocolors'
import normallize from 'normalize-path'

export interface Options {
  name: string
  configFile: string
  pagesBasePath: string
  configPath: string
  pluginName: string
  DEBUG: boolean
  map: Record<string, (code: string, id: string) => string | func>
}

export default function (options: Partial<Options> = {}) {
  let {
    configFile = 'vite.config.js',
    pagesBasePath = 'src/pages',
    pluginName = 'define',
    map = {},
    DEBUG = process.env.DEBUG,
  } = options

  map = {
    [['__', 'filename'].join('')]: (_, id) => `"${path.relative(process.cwd(), id)}"`,
    [['__', 'dirname'].join('')]: (_, id) => `"${path.dirname(path.relative(process.cwd(), id))}"`,
    ...map,
  }
  let keys = Object.keys(map).join('|')

  return {
    name: 'vite-plugin-' + pluginName,
    enforce: 'post',
    transform: (code: string, id) => {
      let arr: func[] = []
      code = code.replace(new RegExp(`(${keys})`, 'g'), (org, k) => {
        let r = map[k](code, id)
        if (typeof r === 'string') return r
        else arr.push(r)
        return org
      })
      arr.forEach(e => (code = e(code)))
      return code
    },
  }

  function normalizePagePath(file) {
    return normallize(path.relative(pagesBasePath, file))
  }

  function normalizePagePathFromBase(file) {
    return normallize(path.relative(process.cwd(), file))
  }

  function log(...args) {
    console.log(c.dim(new Date().toLocaleTimeString()), c.bold(c.red(`[${pluginName}]`)), ...args)
  }
  function debug(...args) {
    DEBUG &&
      console.log(
        c.dim(new Date().toLocaleTimeString()),
        c.bold(c.red(`[debug:${pluginName}]`)),
        ...args,
      )
  }
}
