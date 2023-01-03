import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import App from './App.vue'
import { appPlugin } from './app/index'
import 'uno.css'

$log<''>('123123123', {}, [{}])
$log('3455')

export function createApp() {
  const app = createSSRApp(App)
  app.use(appPlugin)
  return { app, Pinia }
}
