import is from 'is'

export default {
  set(target, property, value, storeName) {
    console.log('[vuex]', storeName + '.' + property, value)
    target[property] = value
    return true
  },
  get(target, property, storeName) {
    return target[property]
  },
}
