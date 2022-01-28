module.exports = (pagesJson) => {
  return pagesJson.replace(
    '"navigationBarTitleText": "uni-app"',
    '"navigationBarTitleText": "好耶"'
  )
}
