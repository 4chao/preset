import { defineStore, Store } from 'pinia'
import { UnwrapRef } from 'vue'

type S = new () => any
interface StoreOptions {
  name?: string
  id?: string
  state?: Record<string, any>
  getters?: Record<string, (state: S) => any>
  actions?: Record<string, (...args: any[]) => any>
  hydrate?(storeState: UnwrapRef<S>, initialState: UnwrapRef<S>): void
}
export function Store(options?: StoreOptions): <C extends S>(target: C) => C
export function Store<C extends S>(target: C): C
export function Store(options) {
  // options 是 function类型，是要装饰的类
  if (typeof options === 'function') {
    return storeFactory(options)
  }

  // 执行后，这个函数作为装饰器函数，接收要装饰的类
  // options 为传入的选项数据。
  return function (Store) {
    return storeFactory(Store, options)
  }
}

const $internalHooks = []

function storeFactory(Store, options: StoreOptions = {}) {
  options.name = options.name || options.id || Store['name']
  options.state || (options.state = {})
  options.actions || (options.actions = {})
  options.getters || (options.getters = {})

  // prototype props.
  const proto = Store.prototype
  Object.getOwnPropertyNames(proto).forEach(function (key) {
    if (key === 'constructor') {
      return
    }

    // hooks
    if ($internalHooks.indexOf(key) > -1) {
      options[key] = proto[key]
      return
    }
    const descriptor = Object.getOwnPropertyDescriptor(proto, key)!

    if (descriptor.value !== void 0) {
      // methods
      if (typeof descriptor.value === 'function') {
        options.actions[key] = descriptor.value
      } else {
        // typescript decorated data
        options.state[key] = descriptor.value
      }
    } else if (descriptor.get) {
      // computed properties
      options.getters[key] = descriptor.get
    }
  })

  const data = new Store()
  Object.keys(data).forEach(key => {
    options.state[key] = data[key]
  })

  // decorate options
  const decorators = Store['__decorators__']
  if (decorators) {
    decorators.forEach(fn => fn(options))
    delete Store['__decorators__']
  }

  let state = options.state
  options.state = () => state
  let useStore = defineStore(options.name, options as any)
  return function () {
    return useStore()
  }
}

export function createDecorator(factory: (options: StoreOptions, key: string, index) => void) {
  return (target, key, index?) => {
    const Ctor = typeof target === 'function' ? target : target.constructor
    if (!Ctor.__decorators__) {
      Ctor.__decorators__ = []
    }
    if (typeof index !== 'number') {
      index = undefined
    }
    Ctor.__decorators__.push(options => factory(options, key, index))
  }
}

export const Persist = createDecorator(
  (options, key) =>
    (options['persist'] ||= {
      enabled: true,
      strategies: [
        {
          key: 'pinia-persist-' + options.name,
          storage: {
            getItem: key => uni.getStorageSync(key),
            setItem: (key, data) => uni.setStorage({ key, data }),
            removeItem: key => uni.removeStorage({ key }),
          },
          paths: [],
        },
      ],
    }) && options['persist'].strategies[0].paths.push(key),
)

export const Pinia = function () {} as unknown as new () => Store
