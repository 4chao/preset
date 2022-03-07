import { createSSRApp } from 'vue'
import App from './App.vue'
// import MescrollBody from 'mescroll-uni/mescroll-body.vue'
// import sys from './sys.vue'
import { appPlugin } from './app/index'
import uView from 'uview-ui'
import 'uno.css'
export function createApp() {
  const app = createSSRApp(App)
  app.use(appPlugin)
  app.use(uView)
  return {
    app,
  }
}
