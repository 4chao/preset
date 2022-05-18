import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import App from './App.vue'
import { appPlugin } from './app/index'
import 'uno.css'
export function createApp() {
  const app = createSSRApp(App)
  app.use(appPlugin)
  return { app, Pinia }
}
