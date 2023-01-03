import normallize from 'normalize-path'
import path from 'path'

export default function () {
  const virtualFileId = '~debug'

  return {
    name: 'vite-plugin-debug',
    resolveId(id: string, path: string) {
      if (id === virtualFileId) {
        return virtualFileId + normalizePagePathFromBase(path)
      }
    },
    load(id: string, path: string) {
      // console.log(id, path)

      if (id.startsWith(virtualFileId)) {
        return `import debug from 'debug'; export const log = debug('${
          id.split(virtualFileId)[1]
        }'); export default debug;`
      }
    },
  }
}

function normalizePagePathFromBase(file) {
  return normallize(path.relative(process.cwd(), file))
}
