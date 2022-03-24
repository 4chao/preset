import path from 'path'
import c from 'picocolors'
import normallize from 'normalize-path'

export interface Options {
  pagesBasePath: string
  pluginName: string
  excludedFiles: string[]
  includedFiles: RegExp[]
  excludedAttributes: string[]
  excludedTags: string[]
  strippedPrefixes: string[]
  DEBUG: boolean
}

const htmlRE = /<template>[\s\S]*<\/template>/g
const elementRE = /<\w[\w:\.$-]*\s((?:'[\s\S]*?'|"[\s\S]*?"|`[\s\S]*?`|\{[\s\S]*?\}|[\s\S]*?)*?)>/g
const valuedAttributeRE =
  /([?]|(?!\d|-{2}|-\d)[a-zA-Z0-9\u00A0-\uFFFF-@_:%-]+)(?:=(["'])([^\2]*?)\2)?/g
const PREFIX = 'data-'

export default function (options: Partial<Options> = {}) {
  if (!process.env.UNI_PLATFORM?.startsWith('mp')) return []

  let {
    pagesBasePath = 'src/pages',
    pluginName = 'mp-attr-fix',
    excludedFiles = ['node_modules', 'index.html'],
    excludedAttributes = ['style', 'class', 'id', 'src', 'v-'],
    excludedTags = [
      'script',
      'style',
      'link',
      'meta',
      'title',
      'head',
      'html',
      'body',
      'template',
      'Meta',
      'sys',
      'u-',
    ],
    includedFiles = [/.vue/],
    strippedPrefixes = ['v-bind:', ':'],
    DEBUG = process.env.DEBUG,
  } = options

  return {
    name: 'vite-plugin-' + pluginName,
    enforce: 'pre',
    transform(code: string, id) {
      let map = {}
      if (excludedFiles.some(e => id.includes(e)) || !includedFiles.some(e => e.test(id)))
        return null
      let aaa = Array.from(code.match(htmlRE)?.[0]?.matchAll(elementRE) || []).flatMap(match =>
        Array.from(
          (excludedTags.some(e => match[0].startsWith('<' + e)) ? '' : match[1]).matchAll(
            valuedAttributeRE,
          ),
        ),
      )
      aaa.forEach(([s, name, _, content = '']) => {
        if (
          excludedAttributes.some(e => name.includes(e)) ||
          name.startsWith(PREFIX) ||
          name.startsWith('@') ||
          content.includes('/') ||
          content.includes('.') ||
          content.includes('(')
        )
          return []

        map[s] = content
      })

      Object.entries(map).forEach(([s, v]) => {
        let sPrefix = strippedPrefixes.find(e => s.startsWith(e))
        if (sPrefix) return
        let suffix = v ? '' : '=""'
        debug(s, '=>', `${sPrefix || ''}data-${s.replace(/:/g, '-').replace(sPrefix, '')}${suffix}`)
        code = code.replace(
          new RegExp(`(?<=\\s)${s}(?=\\s|>)`, 'g'),
          `${s.replace(/hover:/g, 'hover-')} data-${s
            .replace(/hover:/g, 'hover-')
            .replace(sPrefix, '')}${suffix}`,
        )
      })

      //   console.log(code)
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
