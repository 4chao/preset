import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      threads: false,
      environment: 'jsdom',
      setupFiles: './test/setup.ts',
      deps: { inline: ['@vue'] },
    },
  }),
)
