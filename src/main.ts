import { createSSRApp } from 'vue'
import App from './App.vue'
import { appPlugin } from './app/index'
export function createApp() {
  const app = createSSRApp(App)
  app.use(appPlugin)
  return {
    app,
  }
}
