<template>
  <meta title="测试" />
  <div ma w750 pt>
    <div text-sm text-bluegray plsm>页面传值与返回</div>
    <div class="cu-list menu sm-border">
      <div class="cu-item arrow" @click="page1">
        <div class="content">传递对象</div>
      </div>
      <div class="cu-item arrow" @click="page2">
        <div class="content">传递数组</div>
      </div>
      <div class="cu-item arrow" @click="page3">
        <div class="content">传递复杂嵌套内容</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PageDemo1, PageDemo2, PageDemo3 } from '@/types'
const toast = e => uni.showToast({ title: JSON.stringify(e), icon: 'none' })
const page1 = () => app.to<PageDemo1>('page', { a: 1.225, b: '大海星' }).then(toast)
const page2 = () => app.to<PageDemo2>('page', { a: [Math.PI, '喵喵喵', true] }).then(toast)
const page3 = () =>
  app
    .to<PageDemo3>('page', {
      a: [NaN, '草www', { c: false }],
      b: { d: [Infinity, 2] },
    })
    .then(toast)
</script>

<style lang="scss"></style>
