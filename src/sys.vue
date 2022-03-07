<template>
  <!-- 本组件将由uni-provider插件自动混入到每一个页面中 -->
  <div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { useQuery } from '@/hooks'

  const { t } = $(useQuery())

  onUnload(() => uni.$off(t)) // 页面卸载,解绑回调事件

  onPageScroll(console.log)
</script>

<style></style>
