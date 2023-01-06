export declare const ParamsType: unique symbol
export declare const UseParamsType: unique symbol
export declare const ReturnType: unique symbol
export declare const UseReturnType: unique symbol
export interface RouteMeta {
  __spm_id: string
  __spm_source: string
}
export interface BackMeta {
  from: 'backbutton' | 'navigateBack'
}
export type definePage<P extends RecordAny = RecordAny, R extends RecordAny = RecordAny> = {
  [ParamsType]: Partial<P>
  [UseParamsType]: P & RouteMeta
  [ReturnType]: R
  [UseReturnType]: R & BackMeta
}

// demo
export type PageDemo1 = definePage<{ a: number; b: string }>
export type PageDemo2 = definePage<{ a: [number, string, boolean] }>
export type PageDemo3 = definePage<{ a: [number, string, { c: boolean }]; b: { d: Array<number> } }>
