<script setup lang="ts">
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
// #ifndef APP-NVUE
@import 'uview-ui/index.scss';
@import '@/styles/color-ui.css';
@import '@/styles/index.scss';
// #endif
</style>
