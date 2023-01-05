/**
 * 直接修改原生对象的原型链, 请谨慎使用
 */

Promise.prototype.wait = function (ms) {
  return this.then(
    res => new Promise(resolve => setTimeout(() => resolve(res), ms)),
    err => new Promise((_, reject) => setTimeout(() => reject(err), ms)),
  )
}

Promise.prototype.go = function () {
  return this.then(
    res => new Promise(resolve => resolve([res, null])),
    err => new Promise(resolve => resolve([null, err])),
  )
}

Promise.wait = ms => new Promise(r => setTimeout(r, ms))
Promise.do = async fn => await fn()
interface Promise<T> {
  wait(ms: number): Promise<T>
  go(): Promise<[T?, any?]>
}
interface PromiseConstructor {
  wait(n: number): Promise<void>
  do<T extends (...args: any[]) => any>(fn: T): Promise<Awaited<ReturnType<T>>>
}

String.rand = function () {
  return (new Date().getTime() % Math.random()).toString(36).substring(2)
}

interface StringConstructor {
  rand(): string
}

// 小程序Global补全
// #ifdef MP
Object.assign(global, {
  Array: Array,
  Date: Date,
  Error: Error,
  Function: Function,
  Math: Math,
  Object: Object,
  RegExp: RegExp,
  String: String,
  TypeError: TypeError,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval,
})
// #endif
