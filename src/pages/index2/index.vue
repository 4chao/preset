<Meta title="我迪奥!" title:微信="123"></Meta>

<template>
  <div class="content">
    <image class="logo" src="/static/logo.png" />
    <div class="text-area">
      <text class="title">{{ title }}</text>
    </div>
    <div>我叼,vite真尼玛快啊!</div>
    <div>{{ app.User.token }}</div>
  </div>
</template>

<script setup lang="ts">
  const title = ref('Hello')
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
