<script setup lang="ts">
$log('喵喵喵')
$warn<'mmm'>('123123123', onLaunch, [{}])

$log('3455')
$log('3455')
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
console.log(__filename)
</script>
<style lang="scss">
// #ifndef APP-NVUE
@import 'uview-ui/index.scss';
@import '@/styles/color-ui.css';
@import '@/styles/index.scss';
// #endif
</style>
