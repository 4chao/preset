<template>
  <view
    :change:scrollTop="wxsBiz.onScroll"
    :scrollTop="scrollTop"
    :change:limit="wxsBiz.limit"
    :limit="limit.join(',')"
  >
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
  /**
   * 滚动吸附组件
   * @example
   *
   *<Sticker
   *  class="sticker"
   *  :style="{ height: uni.upx2px(100) + 'px' }"
   *  :limit="[-uni.upx2px(100), 0]"
   *>
   *  <div>123</div>
   *</Sticker>
   *
   *.sticker {
   *  position: fixed;
   *  top: var(--window-top);
   *  left: 0;
   *  right: 0;
   *  z-index: 900;
   *  height: 100rpx;
   *  background: #66ccff;
   *}
   */

  // #ifdef never
  let wxsBiz
  // #endif
  const props = defineProps({
    limit: { default: () => [-40, 0] },
  })
  let scrollTop = $ref(0)
  onPageScroll((e) => (scrollTop = e.scrollTop))
</script>

<script module="wxsBiz" lang="wxs">
  var h = 0
  var min, max
  function limit(limit) {
    if (!limit) return
    [min, max] = limit.split(',').map(Number)
  }
  function onScroll(y1, y2, ins) {
    if (y1 < 0) return
    h += (y2 - y1) || 0
    h < min && (h = min)
    h > max && (h = max)
    ins.setStyle({
      'will-change': 'transform',
      transform: 'translateY(' + h + 'px)',
    })
  }
  module.exports = { onScroll: onScroll, limit: limit }
</script>

<style lang="scss"></style>
