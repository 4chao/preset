<template>
  <meta title="主页" title:微信="微信端主页" />
  <div flex-center-col pt40 class="bg-green" @click="app.to('test/index')">
    {{ title }}
  </div>
  <div id="mocha"></div>
</template>

<script setup lang="ts">
import { useScroll } from '@/hooks'
const title = $ref('Hello')

useScroll(onPageScroll).onLoad(page => {
  app.info('页面加载', `第${page.num}页`)
  setTimeout(() => page.endSuccess(10, false), 1000)
})
</script>

<style></style>
