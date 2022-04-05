import { debounce } from 'lodash'
import { useQuery } from '@/hooks'
import { nanoid } from 'nanoid'

export function getPath(p: string, currentGroup: string) {
  let [group, path] = Array.from(p.match(/^(?:#(.*?)(?:\/|$))?(.*)$/)).slice(1)
  if (group === undefined) return path
  else return `/pages/${group || currentGroup}/${path || 'index'}`
}

const pageTools = {
  to: debounce(
    (path: string, obj?: any) => {
      const currentPath = getCurrentPages().pop()['route']
      const currentGroup = currentPath.split('/')[1]
      const id = nanoid()

      const pkg = { data: obj, from: currentPath, id }
      uni.$on(id + '_query', cb => cb(pkg))
      uni
        .navigateTo({ url: getPath(path, currentGroup) + '?id=' + id })
        .then(() => app.info('页面切换', obj || '', '=> ' + path))
        .catch(err => app.error('页面切换失败', '=>' + path, err))
      return new Promise<any>(r => uni.$once(id + '_back', r))
    },
    50,
    { leading: true, trailing: false },
  ),
  back: debounce(
    (data?: any) => {
      if (data) console.log('回调:', data)
      const { id } = useQuery()
      uni.$emit(id.value + '_back', data)
      const url = '/pages/index/index'
      if (getCurrentPages().length > 1) uni.navigateBack()
      else uni.navigateTo({ url }).catch(() => uni.switchTab({ url }))
    },
    50,
    { leading: true, trailing: false },
  ),
}

export default function () {
  Object.assign(app, pageTools)
}

type pageType = typeof pageTools

declare global {
  interface App extends pageType {}
}
