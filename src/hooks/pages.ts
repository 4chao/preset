/**
 * 获得当前页面跳转携带的参数和信息
 * (依赖 app.to )
 * @param fn 回调函数
 */
export function useQuery(fn?: (...args: any[]) => void) {
  const query = reactive<{ data?: any; id?: string; from?: string }>({
    data: null,
    id: null,
    from: null,
  })
  function getQuery() {
    const id = getCurrentPages().pop()['$page'].fullPath.split('?id=')[1]
    uni.$emit(id + '_query', pkg => Object.assign(query, pkg))
    fn && fn(query.data)
  }

  try {
    getQuery()
  } catch (error) {
    onLoad(getQuery)
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
 *
 * @example
 * useScroll(onPageScroll)
 *   .onLoad((page) => {
 *     page.endSuccess()
 *   })
 */
export function useScroll(onPageScroll?: typeof import('@dcloudio/uni-app')['onPageScroll']) {
  const scrollOptions = reactive<ScrollOptions>({
    enable: 'all',
    mescroll: null,
    fetch: page => setTimeout(() => page.endSuccess(10, false), 1000),
  })
  provide(ScrollSymbol, scrollOptions)
  let { mescroll, fetch, enable } = $(scrollOptions)
  onPageScroll?.(e => mescroll && mescroll.onPageScroll(e))
  onReachBottom(() => mescroll && mescroll.onReachBottom())
  onPullDownRefresh(() => mescroll && mescroll.onPullDownRefresh())

  const o = {
    onLoad: (cb: (mescroll: Mescroll) => void) => ((fetch = cb), o),
    enable: (type: ScrollOptions['enable']) => ((enable = type), o),
    mescroll: $$(mescroll),
  }
  return o
}
