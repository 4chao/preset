<template>
  <meta title="页面功能" />
  <div ma w750 pxl>
    <div pb>接收参数:</div>
    <!-- #ifdef MP  -->
    <pre>{{ JSON.stringify(query, null, 2) }}</pre>
    <!-- #endif -->
    <!-- #ifndef MP  -->
    <pre v-html="hanabi(JSON.stringify(query, null, 2))"></pre>
    <!-- #endif -->
    <div mb></div>
    <button @click="app.back<PageDemo2>({ aa: 12 })">返回值</button>
  </div>
</template>

<script setup lang="ts">
import { PageDemo2 } from '@/types'
import hanabi from '@/common/hanabi'

const query = $(useQuery())
</script>

<style lang="scss"></style>
