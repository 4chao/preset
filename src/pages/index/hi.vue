<template>
  <meta title="hi页面" />
  <div flex-center-col pt100>
    <div text-4xl py-25 flex-center>
      <div class="icon" i-ri-compasses-2-line inline-block mrsm></div>
      Hi {{ query?.name || '匿名同学' }}
    </div>
    <p text-sm opacity-75>也可以往回传值哦</p>
    <p text-sm opacity-75>尝试填入内容点击返回↓</p>
    <div py-25>
      <uni-easyinput v-model="text" placeholder="输入返回值" />
    </div>
    {{ text }}
    <div py-25 pb-50 flex-center>
      <div
        pxlg
        pysm
        text-white
        bg-gradient-to-br
        from-hex-f093fb
        to-hex-f5576c
        @click="app.back({ text })"
      >
        返回
      </div>
      <div px20></div>
      <div
        pxlg
        pysm
        text-white
        bg-gradient-to-br
        from-hex-00f2fe
        to-hex-4facfe
        @click="app.back.reject({ text })"
      >
        返回并抛个异常
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const query = $(useQuery())
const text = $ref('')
</script>

<style lang="scss">
.icon {
  background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
}
</style>
