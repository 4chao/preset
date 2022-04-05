<template>
  <meta title="hi页面" />
  <div flex-center-col pt100>
    <div text-4xl py-25 flex-center>
      <div class="icon" i-ri-compasses-2-line inline-block mrsm></div>
      Hi {{ data.name }}
    </div>
    <p text-sm opacity-75>也可以往回传值哦</p>
    <p text-sm opacity-75>尝试填入内容点击返回↓</p>
    <div py-25>
      <u-input v-model="text" placeholder="喵喵喵" inputAlign="center" />
    </div>
    {{ text }}
    <div py-25 pb-50 flex-center>
      <u-button
        text="返回"
        :customStyle="{ width: '200rpx' }"
        color="linear-gradient(120deg, #f093fb 0%, #f5576c 100%)"
        @click="app.back({ text })"
      ></u-button>
      <div px20></div>
      <u-button
        text="返回并抛个异常"
        :customStyle="{ width: '300rpx' }"
        color="linear-gradient(to right, #4facfe 0%, #00f2fe 100%)"
        @click="app.back.reject({ text })"
      ></u-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@/hooks'
const { data } = $(useQuery({ name: '默认初始值' }))
const text = $ref('')
</script>

<style lang="scss">
.icon {
  background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
}
</style>
