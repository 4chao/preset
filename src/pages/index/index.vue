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
      <uni-easyinput v-model="name" placeholder="你的名字?" />
    </div>
    <!-- ↓这里可以直接使用app -->
    <div @click="app.User.handleClick">reverse: {{ app.User.reverseName }}</div>
    <div py-25>
      <div pxlg pysm text-white bg-gradient-to-br from-hex-f093fb to-hex-f5576c @click="sayHi">
        开始体验
      </div>
    </div>
    <!-- #if H5 -->
    <p text-sm opacity-75>打开F12进入移动端视图</p>
    <!-- #endif -->
    <p text-sm opacity-75>向下滑动体验下拉刷新</p>
    <p text-blue text-sm ptsm @click="app.to('#test')">→ test页面 ←</p>
  </div>
</template>

<script setup lang="ts">
// 可以用ref语法糖解构store
const { name } = $(app.User)

$info(1, '123', true, undefined, null, {}, [], () => {})
$debug(1, '123', true, undefined, null, {}, [], () => {})
$log<'测试log宏'>(1, '123', true, undefined, null, {}, [], () => {})
$warn(1, '123', true, undefined, null, {}, [], () => {})
$error(1, '123', true, undefined, null, {}, [], () => {})

function sayHi() {
  app
    .to('hi', { name })
    .then(({ text }) =>
      text
        ? uni.showToast({ title: '收到返回值: ' + text })
        : uni.showToast({ title: '未收到返回值', icon: 'none' }),
    )
    .catch(({ text }) => {
      uni.showToast({ title: '子页面抛出异常' + text, icon: 'none' })
    })
}

useScroll(onPageScroll).onLoad(page => {
  $log<'页面加载'>(`第${page.num}页`)
  setTimeout(() => page.endSuccess(1, false), 1000)
})
</script>

<style lang="scss">
.icon {
  background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
}
</style>
