import assert from 'power-assert/build/power-assert'
console.log(assert)
let aaa = 123
try {
  assert((aaa as any) === '123', '123123123')
} catch (error) {
  console.error(error.stack)
}
