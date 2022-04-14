import { App as VueApp } from 'vue'

let patch = {
  log: <T>(...args: [T, ...any]) => (
    app.debug(/src(.*?\.vue)/.exec(new Error('123').stack)?.[1] || '页面输出', ...args), args[0]
  ),
  any: arg => arg as any,
}

export default function (vueApp: VueApp) {
  Object.assign(vueApp.config.globalProperties, patch)
}

type patchType = typeof patch

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties extends patchType {}
}
