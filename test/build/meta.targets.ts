export const PageRETargets = [
  'src/pages/index/index.vue',
  'src/pages/foo/index.vue',
  'src/pages/foo/bar/index.vue',
  'src/pages/foo/components/bar.vue',
  'src/pages/foo/bar/components/baz.vue',
  'src/pages/foo/bar/component/baz.vue',
  'src/pages/foo/static/bar.vue',
  'src/pages/foo/bar/static/baz.vue',
  'src/pages/static/foo.vue',
  'src/pages/component/foo.vue',
  'src/pages/components/foo.vue',
  'src/pages/components/components/foo.vue',
]

export const MetaRETargets = [
  `
<template>
  <meta title="foo" />
  <div></div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
</style>
`,
  `
<template>
  <meta title="foo"></meta>
  <div></div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
</style>
`,
  `
<template>
  <meta title="foo">
  </meta>
  <div></div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
</style>
`,
  `<template><meta title="foo" /><div></div></template><script setup lang="ts"></script><style lang="scss"></style>`,
  `<template><meta title="foo"></meta><div></div></template><script setup lang="ts"></script><style lang="scss"></style>`,
]
export const MetaParserTargets = [
  `<meta navigationBarTitleText="foo"></meta>`,
  `<meta title="foo"></meta>`,
  `<Meta title="foo"></Meta>`,
  `<meta title:mp-weixin="foo"></meta>`,
  `<meta title:微信="foo"></meta>`,
  `<meta hide title="foo"></meta>`,
]
