import { Parser } from 'htmlparser2'
import fs from 'fs'
import path from 'path'
import c from 'picocolors'
import { merge, transform, isObject } from 'lodash'
import normallize from 'normalize-path'
import AppConfig from '../src/app.config'
export interface Options {
  pagesRE: RegExp
  metaRE: RegExp
  pagesBasePath: string
  configPath: string
  alias: { [unikey: string]: string }
  pluginName: string
  DEBUG: boolean
}

export default function (options: Partial<Options> = {}) {
  let {
    pagesRE = /pages\/([^\/]*?)\/([^\/]*?\.vue)$/,
    metaRE = /\<meta(.|\s)*?(\/\>|\/meta\>)/im,
    pagesBasePath = 'src/pages',
    alias = {},
    pluginName = 'uni-meta',
    DEBUG = process.env.DEBUG,
  } = options

  alias = {
    微信: 'mp-weixin',
    app: 'app-plus',

    title: 'navigationBarTitleText',
    ...alias,
  }
  let pageMeta: { [key: string]: string }
  function generateMeta() {
    //本来想用异步,但无法保证先于uni插件加载,所以改成同步
    pageMeta = Object.fromEntries(
      findPage()
        .filter(file => pagesRE.test(normalizePagePathFromBase(file)))
        .map(file => [normalizePagePath(file), getMeta(fs.readFileSync(file, 'utf-8')) || '{}']),
    )
    debug(`pageMeta:`, pageMeta)

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
        const sub = META['subPackages'].find(item => item.root == packagePath)
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
        JSON.stringify(merge(META, replaceKeysDeep(AppConfig.pages, alias) || {})),
    )

    debug(`META:`, META)
  }

  generateMeta()

  let server
  return [
    {
      name: 'vite-plugin-' + pluginName,
      enforce: 'pre',
      configureServer(_server) {
        server = _server
      },
      transform(code, id) {
        if (pagesRE.test(normalizePagePathFromBase(id))) {
          if (pageMeta[normalizePagePath(id)]) {
            let meta
            try {
              meta = getMeta(code)
            } catch (error) {
              log(c.red(`请为文件 ${normalizePagePath(id)} 提供正确的meta信息\n` + c.red(error)))
            }
            if (pageMeta[normalizePagePath(id)] !== meta) {
              debug(pageMeta[normalizePagePath(id)], meta)

              log(c.blue(normalizePagePath(id)), c.yellow(`更新了meta信息`))
              log(c.yellow(`正在重启服务并更新meta配置文件...`))
              if (server) server.restart()
              else generateMeta() //适配小程序,小程序使用build所以获取不到dev server
            }
          }
          code = removeMeta(code)
        }
        return { code, map: null }
      },
    },
  ]

  function removeMeta(code) {
    return code.replace(metaRE, '')
  }

  function getMeta(code) {
    let str = code.match(metaRE)?.[0]
    if (!str) return
    let attr
    let parser = new Parser(
      {
        onopentag(name, attributes) {
          attr = attributes
        },
      },
      { lowerCaseAttributeNames: false },
    )
    parser.write(str)
    parser.end()
    return (
      attr &&
      JSON.stringify(
        replaceKeysDeep(
          Object.entries(attr).reduce((style, e: [string, string]) => {
            let [name, platform] = e[0].split(':')
            const add = o => merge(style, o)
            // eslint-disable-next-line no-eval
            if (!name) return add({ [platform]: (0, eval)('str =' + e[1]) }) //以:开头的解析为object
            if (!e[1]) return add(AppConfig['preset']?.[name] || {}) // 不含value的解析为preset
            if (platform) return add({ [platform]: { [name]: e[1] } }) // a:b="c"解析为{b:{a:"c"}}
            if (name) return add({ [name]: e[1] }) // a="b"解析为{a:"b"}
          }, {}),
          alias,
        ),
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
    fs.readdirSync(filePath).forEach(filename => {
      const filedir = path.join(filePath, filename)
      const stats = fs.statSync(filedir)
      if (stats.isFile() && /\.n?vue$/.test(filename)) list.push(filedir)
      if (stats.isDirectory()) findPage(filedir, list, deep + 1)
    })
    return list
  }

  // function touch(path: string) {
  //   const time = new Date()

  //   try {
  //     fs.utimesSync(path, time, time)
  //   } catch (err) {
  //     fs.closeSync(fs.openSync(path, 'w'))
  //   }
  // }

  function normalizePagePath(file) {
    return normallize(path.relative(pagesBasePath, file)).replace(/\.vue$/, '')
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

// keysMap = { oldKey1: newKey1, oldKey2: newKey2, etc...
function replaceKeysDeep(obj, keysMap) {
  return transform(obj, function (result, value, key) {
    // transform to a new object

    let currentKey = keysMap[key] || key // if the key is in keysMap use the replacement, if not use the original key

    result[currentKey] = isObject(value) ? replaceKeysDeep(value, keysMap) : value // if the key is an object run it through the inner function - replaceKeys
  })
}
