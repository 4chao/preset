export default {
  pages: {
    globalStyle: {
      navigationBarTextStyle: 'black',
      navigationBarBackgroundColor: '#F8F8F8',
      backgroundColor: '#F8F8F8',
    },
    easycom: {
      autoscan: true,
      custom: {
        '^sys$': '@/sys.vue',
        '^uni-(.*)': '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue',
      },
    },
  },
  uniCloud: true,
}
