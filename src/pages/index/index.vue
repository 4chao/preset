<template>
  <meta title="主页" title:微信="微信端主页" />
  <div flex-center-col pt40 class="bg-green" @click="app.to('index')">
    {{ title }}
  </div>
</template>

<script setup lang="ts">
  const title = $ref('Hello')
</script>

<style></style>
