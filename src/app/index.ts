import { App } from 'vue'
export const app = {
  [Symbol.toStringTag]: 'AppUtils',
}
export const appPlugin = {
  install: (vueApp: App, options) => {
    window.app = app
    vueApp.config.globalProperties.app = app
  },
}

declare global {
  interface Window {
    app: typeof app
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    app: typeof app
  }
}
