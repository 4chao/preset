import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import * as Module from './modules'

export default function (vueApp) {
  vueApp.use(createPinia().use(piniaPersist))
  Object.keys(Module).forEach(k => (app[k] = new Module[k]()))
}

type ModuleType = {
  [K in keyof typeof Module]: InstanceType<typeof Module[K]>
}

declare global {
  interface App extends ModuleType {}
}
