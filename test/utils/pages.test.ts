import { hashKeyAsGroupAliasTargets } from './pages.targets'
import { getPath } from '@/app/utils/pages'
describe('页面工具', () => {
  test('使用#作为包名标识', async () => {
    const pathOutput = hashKeyAsGroupAliasTargets.map(
      path => (path + ' ').padEnd(20, '-') + '-> ' + getPath(path, '$currentGroup'),
    )
    expect(pathOutput).toMatchSnapshot()
  })
})
