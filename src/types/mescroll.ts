interface OptUp {
  use: boolean
  empty: Empty
  toTop: ToTop
  textLoading: string
  textNoMore: string
  offset: number
  auto: boolean
  isLock: boolean
  isBoth: boolean
  page: Page
  noMoreSize: number
  bgColor: string
  textColor: string
  inited?: any
  errDistance: number
  onScroll: boolean
  hasNext: boolean
}

interface OptDown {
  use: boolean
  textInOffset: string
  textOutOffset: string
  textLoading: string
  textSuccess: string
  textErr: string
  offset: number
  native: boolean
  auto: boolean
  autoShowLoading: boolean
  isLock: boolean
  startTop: number
  inOffsetRate: number
  outOffsetRate: number
  bottomOffset: number
  minAngle: number
  beforeEndDelay: number
  bgColor: string
  textColor: string
  inited?: any
  beforeLoading?: any
}

interface Empty {
  tip: string
  use?: boolean
  icon?: string
  btnText?: string
  btnClick?: any
  fixed?: boolean
  top?: string
  zIndex?: number
}

interface Page {
  num: number
  size: number
  time?: any
}

interface ToTop {
  src: string
  offset: number
  right: number
  bottom: number
  width: number
  duration: number
  btnClick?: any
  zIndex: number
  left?: any
  safearea: boolean
  radius: string
}

interface I18n {
  type: string
  [key: string]:
    | {
        down: OptDown
        up: OptUp
      }
    | string
}

export interface Mescroll {
  version: string
  options: {
    down: OptDown
    up: OptUp
  }
  isScrollBody: boolean
  isDownScrolling: boolean
  isUpScrolling: boolean
  optDown: OptDown
  downHight: number
  optUp: OptUp
  startNum: number
  i18n: I18n
  bodyHeight: number
  prePageNum: number
  prePageTime?: any
  isUpAutoLoad: boolean
  num: number
  size: number
  time?: any
  scrollTop: number
  downLoadType: number
  isDownEndSuccess: boolean

  extendDownScroll: (optDown?) => any
  extendUpScroll: (optUp?) => any
  hasColor: (color?) => any
  initDownScroll: () => any
  touchstartEvent: (e?) => any
  touchmoveEvent: (e?) => any
  touchendEvent: (e?) => any
  getPoint: (e?) => any
  getAngle: (p1?, p2?) => any
  triggerDownScroll: () => any
  showDownScroll: () => any
  showDownLoadingCall: (downHight?) => any
  onPullDownRefresh: () => any
  endDownScroll: () => any
  endDownScrollCall: () => any
  lockDownScroll: (isLock?) => any
  lockUpScroll: (isLock?) => any
  initUpScroll: () => any
  onReachBottom: () => any
  onPageScroll: (e?) => any
  scroll: (e?, onScroll?) => any
  triggerUpScroll: (isCheck?) => any
  showUpScroll: () => any
  showNoMore: () => any
  hideUpScroll: () => any
  endUpScroll: (isShowNoMore?) => any
  resetUpScroll: (isShowLoading?) => any
  setPageNum: (num?) => any
  setPageSize: (size?) => any
  endByPage: (dataSize?, totalPage?, systime?) => any
  endBySize: (dataSize?, totalSize?, systime?) => any
  endSuccess: (dataSize?, hasNext?, systime?) => any
  endErr: (errDistance?) => any
  showEmpty: () => any
  removeEmpty: () => any
  showTopBtn: () => any
  hideTopBtn: () => any
  getScrollTop: () => any
  setScrollTop: (y?) => any
  scrollTo: (y?, t?) => any
  resetScrollTo: (myScrollTo?) => any
  getScrollBottom: () => any
  getStep: (star?, end?, callback?, t?, rate?) => any
  getClientHeight: (isReal?) => any
  setClientHeight: (h?) => any
  getScrollHeight: () => any
  setScrollHeight: (h?) => any
  getBodyHeight: () => any
  setBodyHeight: (h?) => any
  preventDefault: (e?) => any
}
