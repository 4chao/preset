import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import ViteRestart from 'vite-plugin-restart'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    ViteRestart({
      restart: ['src/pages.js', 'src/app.config.js'],
    }),
  ],
})
