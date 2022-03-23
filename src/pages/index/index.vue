<template>
  <meta title="主页" title:微信="微信端主页" />
  <div flex-center-col pt40 class="bg-green" @click="app.to('index')">
    {{ title }}
  </div>
  <div id="mocha"></div>
</template>

<script setup lang="ts">
import { useScroll } from '@/hooks'
import assert from 'power-assert/build/power-assert'
import mocha, * as mocha1 from 'mocha/mocha'
console.log(mocha, mocha1)
var aaa = 123

onMounted(() => {
  mocha.setup('bdd')
  mocha.cleanReferencesAfterRun(false)
  describe('qweqwe', () => {
    it('123123', () => {
      assert((aaa as any) === '123')
    })
  })
})
const title = $ref('Hello')

useScroll(onPageScroll).onLoad(page => {
  app.info('页面加载', `第${page.num}页`)
  setTimeout(() => page.endSuccess(10, false), 1000)
})
</script>

<style>
@import 'mocha/mocha.css';
</style>
