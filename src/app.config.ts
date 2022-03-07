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
        '^u-(.*)': 'uview-ui/components/u-$1/u-$1.vue',
      },
    },
  },
  uniCloud: true,
}
