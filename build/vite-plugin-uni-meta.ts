import htmlparser2 from 'htmlparser2'
import fs from 'fs'
import path from 'path'
import c from 'picocolors'
import { merge, transform, isObject } from 'lodash'
import normallize from 'normalize-path'

export interface Options {
  pagesRE: RegExp
  metaRE: RegExp
  configFile: string
  pagesBasePath: string
  configPath: string
  attrEnum: { [unikey: string]: string }
  pluginName: string
}

export default function (options: Partial<Options> = {}) {
  let {
    pagesRE = /pages\/(.*?)\/(.*?\.vue)$/,
    metaRE = /\<Meta(.|\s)*?(\/\>|\/Meta\>)/m,
    configFile = 'vite.config.js',
    pagesBasePath = 'src/pages',
    configPath = 'src/app.config.js',
    attrEnum = {},
    pluginName = 'uni-meta',
  } = options
  let AppConfig
  try {
    AppConfig = require(path.resolve(process.cwd(), configPath))
  } catch (error) {
    debug(c.yellow(`未找到配置文件,将不会进行配置合并与预设合并`))
  }

  attrEnum = {
    微信: 'mp-weixin',
    app: 'app-plus',

    title: 'navigationBarTitleText',
    ...attrEnum,
  }
  //本来想用异步,但无法保证先于uni插件加载,所以改成同步
  const pageMeta: { [key: string]: string } = Object.fromEntries(
    findPage()
      .filter((file) => pagesRE.test(normalizePagePathFromBase(file)))
      .map((file) => [
        normalizePagePath(file).replace(/\.vue$/, ''),
        getMeta(fs.readFileSync(file, 'utf-8')),
      ])
  )

  const basePath = 'pages'
  const META = {
    pages: [],
    subPackages: [],
  }

  Object.entries(pageMeta).forEach(([path, style]) => {
    const [packageName, pageName] = path.split('/')
    if (packageName == 'index') {
      META['pages'][pageName.includes('index') ? 'unshift' : 'push']({
        path: [basePath, packageName, pageName].join('/'),
        style: JSON.parse(style),
      })
    } else {
      const packagePath = [basePath, packageName].join('/')
      const sub = META['subPackages'].find((item) => item.root == packagePath)
      if (!sub) {
        META['subPackages'].push({
          root: packagePath,
          pages: [
            {
              path: pageName,
              style: JSON.parse(style),
            },
          ],
        })
      } else {
        sub['pages'].push({
          path: pageName,
          style: JSON.parse(style),
        })
      }
    }
  })

  fs.writeFileSync(
    'src/pages.json',
    '// ⛔ 本文件由 auto pages 插件生成\n' +
      '// 请将本文件添加至 .gitignore\n' +
      '// 如需覆盖页面 meta 信息或更改原有 pages.json 配置项\n' +
      '// 请修改 app.config.ts 的 page 导出\n' +
      '\n' +
      JSON.stringify(merge(META, replaceKeysDeep(AppConfig.pages, attrEnum) || {}))
  )

  return [
    {
      name: 'vite-plugin-' + pluginName,
      enforce: 'pre',
      configResolved() {
        if (fs.existsSync('vite.config.ts')) configFile = 'vite.config.ts'
      },
      handleHotUpdate(hmr) {
        if (pagesRE.test(normalizePagePathFromBase(hmr.file))) {
          hmr.read().then(async (code) => {
            let meta
            try {
              meta = await getMeta(code)
            } catch (error) {
              debug(c.red(`请为文件 ${hmr.file} 提供正确的meta信息\n` + c.red(error)))
            }
            if (pageMeta[normalizePagePath(hmr.file)] !== meta) {
              touch(configFile)
              debug(c.blue(normalizePagePath(hmr.file)), c.yellow(`更新了meta信息`))
              debug(c.yellow(`正在重启服务并更新meta配置文件...`))
            }
          })
        }
        return hmr.modules
      },
    },
  ]

  function getMeta(code) {
    let str = code.match(metaRE)?.[0]
    if (!str) return
    let attr
    let parser = new htmlparser2.Parser(
      {
        onopentag(name, attributes) {
          if (name !== 'meta') throw new Error()
          attr = attributes
        },
      },
      { lowerCaseAttributeNames: false }
    )
    parser.write(str)
    parser.end()
    return (
      attr &&
      JSON.stringify(
        replaceKeysDeep(
          Object.entries(attr).reduce((style, e: [string, string]) => {
            let [name, platform] = e[0].split(':')
            const add = (o) => merge(style, o)
            // eslint-disable-next-line no-eval
            if (!name) return add({ [platform]: (0, eval)('str =' + e[1]) }) //以:开头的解析为object
            if (!e[1]) return add(AppConfig.preset?.[name] || {}) // 不含value的解析为preset
            if (platform) return add({ [platform]: { [name]: e[1] } }) // a:b="c"解析为{b:{a:"c"}}
            if (name) return add({ [name]: e[1] }) // a="b"解析为{a:"b"}
          }, {}),
          attrEnum
        )
      )
    )
  }

  /**
   * 深搜遍历寻找页面路径
   * @param {string} filePath 目标文件夹
   * @param {string[]} list 路径缓存数组,用于递归时保留数据
   * @param {number} deep 查询深度
   * @returns {string[]} 查找到的页面路径
   */
  function findPage(filePath = pagesBasePath, list = [], deep = 1) {
    if (deep > 2) return list
    filePath = path.resolve(filePath)
    fs.readdirSync(filePath).forEach((filename) => {
      const filedir = path.join(filePath, filename)
      const stats = fs.statSync(filedir)
      if (stats.isFile() && /\.n?vue$/.test(filename)) list.push(filedir)
      if (stats.isDirectory()) findPage(filedir, list, deep + 1)
    })
    return list
  }

  function touch(path: string) {
    const time = new Date()

    try {
      fs.utimesSync(path, time, time)
    } catch (err) {
      fs.closeSync(fs.openSync(path, 'w'))
    }
  }

  function normalizePagePath(file) {
    return normallize(path.relative(pagesBasePath, file))
  }

  function normalizePagePathFromBase(file) {
    return normallize(path.relative(process.cwd(), file))
  }

  function debug(...args) {
    console.log(c.dim(new Date().toLocaleTimeString()), c.bold(c.red(`[${pluginName}]`)), ...args)
  }
}

// keysMap = { oldKey1: newKey1, oldKey2: newKey2, etc...
function replaceKeysDeep(obj, keysMap) {
  return transform(obj, function (result, value, key) {
    // transform to a new object

    let currentKey = keysMap[key] || key // if the key is in keysMap use the replacement, if not use the original key

    result[currentKey] = isObject(value) ? replaceKeysDeep(value, keysMap) : value // if the key is an object run it through the inner function - replaceKeys
  })
}
