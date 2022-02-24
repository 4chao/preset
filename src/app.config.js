module.exports.pages = {
  globalStyle: {
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: '#F8F8F8',
    backgroundColor: '#F8F8F8',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^u-(.*)': 'uview-ui/components/u-$1/u-$1.vue',
    },
  },
}
