import { debounce } from 'lodash'
import { encode } from 'js-base64'
import { useQuery } from '@/hooks'

const pageTools = {
  to: debounce(
    (path: string, obj?: any) => {
      const currentPath = [...getCurrentPages()].pop()['route'].split('/')
      const t = String(+new Date())
      if (!path.startsWith('/')) {
        let pathArray = path.split('/')
        path = [
          null,
          ['', currentPath[0], currentPath[1], pathArray[0]],
          ['', currentPath[0], pathArray[0], pathArray[1]],
        ][pathArray.length].join('/')
      }
      const pkg = { data: obj, from: currentPath, t }
      //TODO: 改成事件机制
      const querystr = encode(JSON.stringify(pkg)).replace(/=/g, '等')
      uni.navigateTo({
        url: path + '?q=' + querystr,
        fail: err => console.log(err),
        success: () => app.info(`页面切换`, obj || '', '=>' + path),
      })
      return new Promise<any>(r => uni.$once(t, r))
    },
    500,
    { leading: true, trailing: false },
  ),
  back: debounce(
    (data?: any) => {
      if (data) {
        console.log('回调:', data)
        const { t } = useQuery()
        uni.$emit(t.value, data)
      }

      //TODO: 这里有bug,不能用try来判断成功与否
      try {
        uni.navigateBack({})
      } catch (error) {
        const url = '/pages/index/index'
        try {
          uni.navigateTo({ url })
        } catch (error) {
          uni.switchTab({ url })
        }
      }
    },
    500,
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
