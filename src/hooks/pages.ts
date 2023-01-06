import qs from 'qs'
import { parseObject } from 'query-types'
import { definePage, UseParamsType } from '@/types'

/**
 * 获得当前页面跳转携带的参数和信息
 * @param fn 回调函数
 */
export function useQuery<T extends definePage = definePage>(
  fn?: (data: T) => void,
): Ref<T[typeof UseParamsType]> | Ref<undefined> {
  const query = ref<T[typeof UseParamsType]>(null)

  Promise.do(async () => {
    if (!getCurrentPages().pop()?.['$page']?.fullPath) await new Promise(r => onLoad(r))
    const search = getCurrentPages().pop()?.['$page']?.fullPath.split('?').pop()
    query.value = parseObject(qs.parse(decodeURIComponent(search)))
    fn?.(query.value)
  }).catch(err => $error<'参数接收'>('获取失败', err))

  return query
}

import { Mescroll } from '@/types'
import { RefValue } from 'vue/macros'
import { Ref } from 'vue'
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
