import { ToRefs } from 'vue'
import { PageParams } from '@/types'

type QueryDefaultData<T> = Omit<PageParams, 'data'> & { data: T & AObjectHasAnyKeys }
/**
 * 获得当前页面跳转携带的参数和信息
 * (依赖 app.to )
 * @param fn 函数时为回调函数,其他为默认返回值
 */
export function useQuery<T>(fn: T): ToRefs<QueryDefaultData<T>>
export function useQuery(fn?: (data: any) => void): ToRefs<PageParams>
export function useQuery<T>(fn?: (data: any) => void | T) {
  let isF = typeof fn === 'function'
  const query = reactive<{ data?: any; id?: string; from?: string }>({
    data: isF ? {} : fn,
    id: null,
    from: null,
  })

  Promise.do(async () => {
    if (!getCurrentPages().pop()?.['$page']?.fullPath) await new Promise(r => onLoad(r))
    let id = getCurrentPages().pop()['$page'].fullPath.split('?id=')[1]
    uni.$emit(id + '_query', pkg => Object.assign(query, pkg))
    isF && fn(query.data)
  }).catch(err => app.error('参数获取失败', err))

  return toRefs(query)
}

import { Mescroll } from '@/types'
import { RefValue } from 'vue/macros'
export const ScrollSymbol = Symbol('mescroll')
export interface ScrollOptions {
  mescroll?: RefValue<Mescroll>
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
