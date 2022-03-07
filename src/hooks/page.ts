import { decode } from 'js-base64'
/**
 * 获得当前页面跳转携带的参数和信息
 * (依赖 app.to )
 * @param fn 回调函数
 * @returns toRefs<{ data?: any; t?: number; from?: string }>
 */
export function useQuery(fn?: (...args: any[]) => void) {
  const query = reactive<{ data?: any; t?: string; from?: string }>({
    data: null,
    t: null,
    from: null,
  })

  try {
    const querystr = getCurrentPages()
      .pop()
      ['$page'].fullPath.split('?q=')[1]
      ?.replace(/%E7%AD%89/g, '=')
    querystr && Object.assign(query, JSON.parse(decode(querystr)))
    fn && fn(query.data)
  } catch (error) {
    onLoad(() => {
      const querystr = getCurrentPages()
        .pop()
        ['$page'].fullPath.split('?q=')[1]
        ?.replace(/%E7%AD%89/g, '=')
      querystr && Object.assign(query, JSON.parse(decode(querystr)))
      fn && fn(query.data)
    })
  }
  return toRefs(query)
}

import { Mescroll } from '@/types'
export const ScrollSymbol = Symbol('mescroll')
export interface ScrollOptions {
  mescroll?: Mescroll
  enable: 'none' | 'up' | 'down' | 'all'
  fetch: (...arg: any[]) => void
}
/**
 * 上拉加载,下拉刷新
 * @returns toRefs<{ data?: any; t?: number; from?: string }>
 */
export function useScroll(onPageScroll?: typeof import('@dcloudio/uni-app')['onPageScroll']) {
  const scrollOptions = reactive<ScrollOptions>({
    enable: 'all',
    mescroll: null,
    fetch: () => {},
  })
  provide(ScrollSymbol, scrollOptions)
  let { mescroll, fetch, enable } = $(scrollOptions)
  onPageScroll?.((e) => mescroll && mescroll.onPageScroll(e))
  onReachBottom(() => mescroll && mescroll.onReachBottom())
  onPullDownRefresh(() => mescroll && mescroll.onPullDownRefresh())

  const o = {
    onLoad: (cb: (mescroll: Mescroll) => void) => ((fetch = cb), o),
    enable: (type: ScrollOptions['enable']) => ((enable = type), o),
    mescroll: $$(mescroll),
  }
  return o
}
