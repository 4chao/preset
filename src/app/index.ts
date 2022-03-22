import { App as VueApp } from 'vue'
import store from './store'
import server from './server'
import preset from './preset'

export const app = {
  [Symbol.toStringTag]: 'AppGlobalUtils',
  ...preset,
} as unknown as App

export const appPlugin = {
  install: (vueApp: VueApp, options) => {
    app.catch(() => (window['app'] = app))
    app.catch(() => (uni['app'] = app))
    app.catch(() => (wx['app'] = app))
    app.catch(() => (wx['uni'] = uni))
    vueApp.config.globalProperties.app = app
    vueApp.config.globalProperties.uni = uni
    vueApp.use(store())
    vueApp.use(server())
    let sum = ''
    Object.entries(import.meta.globEager('./utils/*.ts')).forEach(([k, v]) => {
      let name = k.replace(/^\.\/utils\//, '')
      try {
        v?.default?.(vueApp)
        sum += name + ' '
      } catch (error) {
        console.error('[appPlugin 加载失败]', `in ${name}\n`, error)
      }
    })
    if (import.meta.env.DEV) app.success('appPlugin 加载完成', sum)
  },
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    app: globalThis.App
    uni: globalThis.UniApp.Uni
  }
}

declare global {
  interface App extends Is<typeof preset> {}
  interface Window {
    app: App
  }
}
