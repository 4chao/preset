import espower from 'espower-source'
import path from 'path'

export default function (options = {} as any) {
  let { pluginName = 'espower', DEBUG = process.env.DEBUG } = options

  return {
    name: 'vite-plugin-' + pluginName,
    enforce: 'post',
    transform(code: string, id) {
      if (process.env.NODE_ENV !== 'test') return
      if (!/(\/__tests__\/.*|(\.|\/)(test|spec))\.[jt]sx?$/.test(id)) return
      code = code.replace('import.meta.hot.accept', 'importmetahotaccept')
      code = espower(code, id, {
        patterns: [
          'assert(value, [message])',
          'assert.ok(value, [message])',
          'assert.equal(actual, expected, [message])',
          'assert.notEqual(actual, expected, [message])',
          'assert.strictEqual(actual, expected, [message])',
          'assert.notStrictEqual(actual, expected, [message])',
          'assert.deepEqual(actual, expected, [message])',
          'assert.notDeepEqual(actual, expected, [message])',
        ],
      })
      code = code.replace('importmetahotaccept', 'import.meta.hot.accept')
      return { code }
    },
  }
}
