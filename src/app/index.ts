import { App as VueApp } from 'vue'
import store from './store'

export const appPlugin = {
  install: (vueApp: VueApp, options) => {
    if (window) window.app = app
    vueApp.config.globalProperties.app = app
    vueApp.use(store())
  },
}

export const app = {
  [Symbol.toStringTag]: 'AppUtils',
} as unknown as App

declare global {
  interface App {}
  interface Window {
    app: App
  }
}
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    app: globalThis.App
  }
}
