import path from 'path'
import c from 'picocolors'
import normallize from 'normalize-path'
import { defaultPagesRE } from './vite-plugin-uni-meta'

export interface Options {
  pagesRE: RegExp
  name: string
  configFile: string
  pagesBasePath: string
  configPath: string
  pluginName: string
  DEBUG: boolean
}

export default function (options: Partial<Options> = {}) {
  let {
    pagesRE = defaultPagesRE,
    name = 'sys',
    configFile = 'vite.config.js',
    pagesBasePath = 'src/pages',
    pluginName = 'uni-provider',
    DEBUG = process.env.DEBUG,
  } = options

  return {
    name: 'vite-plugin-' + pluginName,
    enforce: 'pre',
    transform(code, id) {
      id = normalizePagePathFromBase(id)
      if (pagesRE.test(normalizePagePathFromBase(id))) {
        // 三种情况:
        // 1. 前后都存在页面根级组件 => 不做操作
        // 2. 页面根级组件只存在于第一行 => 第一行修正结束符,最后一行添加结束符
        // 3. 前后都不存在页面根级组件 => 第一行添加开始符,最后一行添加结束符
        // 其他情况直接语法报错,不需要处理
        let startTag = new RegExp(`\<${name}`).test(code)
        let endTag = new RegExp(`\<\/${name}`).test(code)
        if (startTag && !endTag)
          code = code
            .replace(new RegExp(`(?<=\<${name}.*?)(\/\>|>.*?\<\/${name}\>)`), '>')
            .replace(/([\s\S]*)(\<\/template\>)/, `$1</${name}>\n</template>`)
        if (!startTag && !endTag)
          code = code
            .replace('<template>', `<template>\n<${name}>`)
            .replace(/([\s\S]*)(\<\/template\>)/, `$1</${name}>\n</template>`)
        debug(c.yellow(id), `startTag: ${startTag}`, `endTag: ${endTag}`)
      }
      return { code, map: null }
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
