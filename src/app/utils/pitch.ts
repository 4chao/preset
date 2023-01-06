/**
 * 添加一些辅助函数到组件上下文中, 可以在 template 里直接使用
 */

import { App as VueApp } from 'vue'
import { stores } from '@/app/store'

let patch = {
  // 使用 Error 获取当前组件名称, 调用 logger
  log: <T>(...args: [T, ...any]): T => (
    stores.Debug._logger({
      content: args,
      path:
        (
          /at[\s\S]*?at.*?(?:src|appservice|assets)\/(.*?)\.(?:.*\.)?(?:vue|js)/.exec(
            new Error().stack,
          )?.[1] || 'anonymous'
        ).replace(/\-/g, '/') + '.vue',
    }),
    args[0]
  ),

  // 强制 any 转换
  any: arg => arg as any,
}

export default function (vueApp: VueApp) {
  Object.assign(vueApp.config.globalProperties, patch)
}

type patchType = typeof patch

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties extends patchType {}
}
