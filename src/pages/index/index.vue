<template>
  <meta title="我超!" title:微信="1234" />
  <div class="content">
    <image class="logo" src="/static/logo.png" />
    <div class="text-area">
      <text class="title">{{ title }}</text>
    </div>
    <div @click="abc">我叼,vite真尼玛快啊!</div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const title = ref('Hello')
  function abc() {
    console.log(123123)

    uni.navigateTo({
      url: '/pages/index2/index',
    })
  }
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
