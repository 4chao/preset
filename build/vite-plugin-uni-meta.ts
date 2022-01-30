import parse5 from 'parse5'
import fs from 'fs'
import path from 'path'
import c from 'picocolors'
import { pages as pageConfig } from '../src/app.config'
import { merge } from 'lodash'

export interface Options {
  pagesRE: RegExp
  metaRE: RegExp
  configFile: string
  pagesBase: string
  attrEnum: { [unikey: string]: string }
}

export default function (options: Partial<Options> = {}) {
  let {
    pagesRE = /pages\/(.*?)\/(.*?\.vue)$/,
    metaRE = /\<Meta(.|\s)*?(\/\>|\/Meta\>)/m,
    configFile = 'vite.config.js',
    pagesBase = 'src/pages',
    attrEnum = {},
  } = options
  attrEnum = {
    微信: 'mp-weixin',
    app: 'app-plus',

    title: 'navigationBarTitleText',
    ...attrEnum,
  }
  //本来想用异步,但无法保证先于uni插件加载,所以改成同步
  const pageMeta = Object.fromEntries(
    findPage()
      .filter((file) => pagesRE.test(file))
      .map((file) => [normalizePagePath(file), getMeta(fs.readFileSync(file, 'utf-8'))])
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
  // console.log(JSON.stringify(merge(json.parse(pagesJson), META)))

  fs.writeFileSync(
    'src/pages.json',
    '// ⛔ 本文件由 auto pages 插件生成, 自定义配置请更改 app.config.ts 的 page 导出\n' +
      JSON.stringify(merge(META, pageConfig))
  )

  return [
    {
      name: 'vite-plugin-uni-meta',
      enforce: 'pre',
      configResolved() {
        if (fs.existsSync('vite.config.ts')) configFile = 'vite.config.ts'
      },
      handleHotUpdate(hmr) {
        if (pagesRE.test(hmr.file)) {
          hmr.read().then(async (code) => {
            let meta
            try {
              meta = await getMeta(code)
            } catch (error) {
              console.error(`请为文件 ${hmr.file} 提供正确的meta信息`)
              console.error(error)
            }
            // console.log(meta)
            // console.log(pageMeta[hmr.file])
            if (pageMeta[normalizePagePath(hmr.file)] !== meta) {
              touch(configFile)
              console.log(
                c.dim(new Date().toLocaleTimeString()) +
                  c.bold(c.red(' [uni-meta] ')) +
                  c.yellow(`${normalizePagePath(hmr.file)} 更新了meta信息`)
              )
              console.log(
                c.dim(new Date().toLocaleTimeString()) +
                  c.bold(c.red(' [uni-meta] ')) +
                  c.yellow(`正在重启服务并更新meta配置文件...`)
              )
            }
          })
        }
        return hmr.modules
      },
    },
  ]

  function getMeta(code) {
    let str = code.match(metaRE)?.[0]
    return (
      str &&
      JSON.stringify(
        parse5.parseFragment(str).childNodes[0].attrs.reduce((o, e) => {
          let [name, platform] = e.name.split(':')
          name = attrEnum[name] || name
          platform = attrEnum[platform] || platform
          if (platform) {
            o[platform] = o[platform] || {}
            o[platform][name] = e.value
          } else {
            o[name] = e.value
          }
          return o
        }, {})
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
  function findPage(filePath = pagesBase, list = [], deep = 1) {
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
    const separ = file.includes('\\') ? '\\' : '/'
    return path
      .relative(pagesBase, file)
      .split(separ)
      .join('/')
      .replace(/\.vue$/, '')
  }
}
