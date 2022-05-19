export { Store, Pinia } from 'pinia-class-component'
import { createDecorator } from 'pinia-class-component'

/**
 *  持久化装饰器
 */
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
