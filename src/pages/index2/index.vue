<template>
  <meta title="" />
  <div @click="aaa"> 测试 </div>
  <!-- {{ data }}123 -->
</template>

<script setup lang="ts">
  import { useQuery } from '@/hooks'
  // const { data } = $(useQuery())
  // watchEffect(()=>console.log(data))
  const aaa = () =>
    app
      .to('index2/index', { a: 'b', c: ['d', 'e=f'], f: [['g', '喵喵喵'], ['h']] })
      .then((e) => console.log(444, e))
</script>

<style lang="scss"></style>
