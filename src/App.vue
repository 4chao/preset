<script setup lang="ts">
onLaunch(() => {
  $log('onLaunch')
})
onShow(() => {
  $log('onShow')
})
onHide(() => {
  $log('onHide')
})
</script>
<style lang="scss">
// #ifndef APP-NVUE
@import 'uview-ui/index.scss';
@import '@/styles/color-ui.css';
@import '@/styles/index.scss';
// #endif
</style>
