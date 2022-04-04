import * as Module from './module/_index'

import { createStore } from 'vuex'

import { createProxy, extractVuexModule, VuexModule } from 'vuex-class-component'
import createPersistedState from 'vuex-persistedstate'
import vuexProxy from './proxy'
import config from './config'

export default function () {
  const ModuleList = {}
  const ModuleTree = {}

  for (const key in Module) {
    if (Object.prototype.hasOwnProperty.call(Module, key)) {
      const e = Module[key]
      Object.assign(ModuleTree, extractVuexModule(e))
    }
  }
  const store = createStore({
    modules: ModuleTree,
    plugins: [
      createPersistedState({
        storage: {
          getItem: key => uni.getStorageSync(key),
          setItem: (key, data) => uni.setStorage({ key, data }),
          removeItem: key => uni.removeStorage({ key }),
        },
        ...config.persistedstate,
      }),
    ],
  })

  for (const key in Module) {
    if (Object.prototype.hasOwnProperty.call(Module, key)) {
      ModuleList[key] = createProxy(store, Module[key])
    }
  }

  //vuex代理,使用代理做一些拦截操作
  Object.keys(ModuleList).forEach(key => {
    app[key] = new Proxy(
      {},
      {
        set: (target, property, value, receiver) =>
          vuexProxy.set(ModuleList[key], property, value, key),
        get: (target, property, receiver) => vuexProxy.get(ModuleList[key], property, key),
      },
    )
  })
  return store
}

type ModuleType = {
  [K in keyof typeof Module]: ReturnType<typeof createProxy> & InstanceType<typeof Module[K]>
}

declare global {
  interface App extends ModuleType {}
}
