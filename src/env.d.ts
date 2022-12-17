/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

type Is<T> = T
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare namespace UniApp {
  interface Uni {}
}

type func<P extends any[] = any[], R = any> = (...args: P) => R
type RecordAny = Record<string, any>
