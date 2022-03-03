import { App as VueApp } from 'vue'
import store from './store'
import server from './server'

export const app = {
  [Symbol.toStringTag]: 'AppUtils',
} as unknown as App

export const appPlugin = {
  install: (vueApp: VueApp, options) => {
    if (window) window.app = app
    if (wx) wx['app'] = app
    vueApp.config.globalProperties.app = app
    vueApp.config.globalProperties.uni = uni
    vueApp.config.globalProperties.log = (...args) => (console.log(...args), args[0])
    vueApp.config.globalProperties.any = (arg) => arg as any //本函数帮助微信小程序中数据层显式传值到视图层
    vueApp.use(store())
    vueApp.use(server())
    Object.values(import.meta.globEager('./utils/*.ts')).forEach((v) => v.default())
  },
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    app: globalThis.App
    uni: globalThis.UniApp.Uni
    log: <T>(...args: [T, ...any]) => T
    any: (arg: any) => any
  }
}

declare global {
  interface App {}
  interface Window {
    app: App
  }
}
