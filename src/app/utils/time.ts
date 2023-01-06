/**
 * 定义时间相关的工具函数
 */

import time from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import calendar from 'dayjs/plugin/calendar'
time.extend(relativeTime)
time.extend(calendar)
time.locale('zh-cn')

export default function () {
  Object.assign(app, { time })
}
declare global {
  interface App {
    time: typeof time
  }
}
