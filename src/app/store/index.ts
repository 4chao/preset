import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist-uni'

import * as Module from './modules'

export let stores = {} as ModuleType

export default function (vueApp) {
  vueApp.use(createPinia().use(piniaPersist))
  Object.keys(Module).forEach(k => (stores[k] = new Module[k]()))
  Object.assign(app, stores)
}

type ModuleType = {
  [K in keyof typeof Module]: InstanceType<typeof Module[K]>
}

declare global {
  interface App extends ModuleType {}
}
