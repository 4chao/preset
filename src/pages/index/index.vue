<template>
  <meta title="主页" title:微信="微信端主页" />
  <div flex-center-col pt100>
    <div text-4xl py-25>
      <div class="icon" i-ri-leaf-fill inline-block></div>
    </div>
    <p>
      <em text-sm opacity-75>快速，优雅的全栈预设模板</em>
    </p>
    <div py-25>
      <u-input v-model="name" placeholder="你的名字?" inputAlign="center" />
    </div>
    <div py-25>
      <u-button
        text="开冲"
        :disabled="!name"
        color="linear-gradient(120deg, #f093fb 0%, #f5576c 100%)"
        @click="name && sayHi()"
      ></u-button>
      <!-- ↑这里有个小bug,由于组件中没有声明事件,vue3会优先匹配原生事件,导致disabled时仍会触发 -->
      <!-- 欢迎提交pr修复 -->
    </div>
    <p text-sm opacity-75>打开F12进入移动端视图</p>
    <p text-sm opacity-75>向下滑动体验下拉刷新</p>
  </div>
</template>

<script setup lang="ts">
import { useScroll } from '@/hooks'
const { name } = $(app.User)

function sayHi() {
  app
    .to('hi', { name })
    .then(({ text }) =>
      text
        ? uni.showToast({ title: '收到返回值: ' + text })
        : uni.showToast({ title: '未收到返回值', icon: 'none' }),
    )
}

useScroll(onPageScroll).onLoad(page => {
  app.info('页面加载', `第${page.num}页`)
  setTimeout(() => page.endSuccess(1, false), 1000)
})
</script>

<style lang="scss">
.icon {
  background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
}
</style>
