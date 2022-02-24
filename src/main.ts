import { createSSRApp } from 'vue'
import App from './App.vue'
import sys from './sys.vue'
import { appPlugin } from './app/index'
import uView from 'uview-ui'
export function createApp() {
  const app = createSSRApp(App)
  app.use(appPlugin)
  app.use(uView)
  app.component('Sys', sys)
  return {
    app,
  }
}
