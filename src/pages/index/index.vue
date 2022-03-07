<template>
  <meta title="我超!" title:微信="1234" />
  <div flex-center-col>
    <image class="logo" src="/static/logo.png" />
    <image class="logo" src="/static/logo.png" />
    <image class="logo" src="/static/logo.png" />
    <image class="logo" src="/static/logo.png" />
    <image class="logo" src="/static/logo.png" />
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
    <div
      data-px5
      dsfg
      @click="app.to('index2/index', { a: 'b', c: ['d', 'e=f'], f: [['g', '喵喵喵'], ['h']] })"
      >我叼,vite真尼玛快啊!</div
    >
    <div px shadow-lg text-white bg-green-500 hover:bg-green-300 border="rounded-lg none">
      Click me
      <div pl10 style="padding-right: 75rpx">123</div>
      <i i-ri-profile-line></i>
    </div>
    <div p10 bg-black bg-opacity-20>123</div>
  </div>
</template>

<script setup lang="ts">
  const title = $ref('Hello')
  const value = $ref('')
  onPageScroll(() => {})
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
