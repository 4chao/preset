/**
 * 定义页面方法, 例如页面跳转, 返回, 传值等
 */

import { debounce } from 'lodash'
import qs from 'qs'
import { definePage, ParamsType, ReturnType, UseReturnType } from '@/types'

export function getPath(p: string, currentGroup: string) {
  let [group, path] = Array.from(p.match(/^(?:#(.*?)(?:\/|$))?(.*)$/)).slice(1)
  if (group === undefined) return path
  else return `/pages/${group || currentGroup}/${path || 'index'}`
}

let to = debounce(
  (path: string, obj: any = {}) => {
    const currentPath = getCurrentPages().pop()['route']
    const currentGroup = currentPath.split('/')[1]
    const id = String.rand()

    const pkg = {
      ...obj,
      __spm_id: id,
      __spm_source: currentPath,
    }

    let url = getPath(path, currentGroup)
    let query = qs.stringify(pkg, { addQueryPrefix: true })
    uni
      .navigateTo({ url: url + query })
      .then(() => $log<'页面切换'>(path === url ? path : `${path} (${url})`, obj))
      .catch(() => uni.switchTab({ url: url + query }))
      .catch(err => $error<'页面切换失败'>(path, err))
    return new Promise<any>((r, e) => (uni.$once(id + '_resolve', r), uni.$once(id + '_reject', e)))
  },
  50,
  { leading: true, trailing: false },
) as <U extends definePage = definePage>(
  path: string,
  obj?: U[typeof ParamsType],
) => Promise<U[typeof UseReturnType]>

const back = debounce(
  (data: any = {}, type: 'resolve' | 'reject' = 'resolve') => {
    if (data) $log<'页面回调'>(data)
    const query = useQuery()
    if (type === 'resolve')
      uni.$emit(`${query.value.__spm_id}_resolve`, { ...data, from: 'navigateBack' })
    else uni.$emit(`${query.value.__spm_id}_reject`, data)
    const url = '/pages/index/index'
    if (getCurrentPages().length > 1) uni.navigateBack()
    else uni.redirectTo({ url }).catch(() => uni.switchTab({ url }))
  },
  50,
  { leading: true, trailing: false },
) as unknown as (<U extends definePage = definePage>(
  data?: U[typeof ReturnType],
  type?: 'resolve' | 'reject',
) => void) & {
  resolve: <U extends definePage = definePage>(data?: U[typeof ReturnType]) => void
  reject: (error?: any) => void
}

back.resolve = data => back(data, 'resolve')
back.reject = data => back(data, 'reject')

const pageTools = {
  to,
  back,
}

export default function () {
  Object.assign(app, pageTools)
}

type pageType = typeof pageTools

declare global {
  interface App extends pageType {}
}
