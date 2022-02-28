<template>
  <meta title="我超!" title:微信="1234" />
  <div class="content">
    <image class="logo" src="/static/logo.png" />
    <div px5 class="text-area">
      <text class="title">{{ title }}</text>
    </div>
    <u-code-input v-model="value" mode="box" :space="0" :maxlength="4" hairline></u-code-input>
    <u-input placeholder="前置插槽">
      <template #prefix>
        <u-text text="http://" margin="0 3px 0 0" type="tips" />
      </template>
    </u-input>
    {{ value }}
    <div data-px5 dsfg @click="abc">我叼,vite真尼玛快啊!</div>
    <div px5 shadow-lg text-white bg-green-500 hover:bg-green-300 border="rounded-lg none" class="">
      Click me
    </div>
  </div>
</template>

<script setup lang="ts">
  const title = $ref('Hello')
  const value = $ref('')
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
