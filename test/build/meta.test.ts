import { PageRETargets, MetaRETargets, MetaParserTargets } from './meta.targets'
import { defaultPagesRE, defaultMetaRE, MetaParser } from '@root/build/vite-plugin-uni-meta'
describe('页面元数据', () => {
  test('页面路径匹配', async () => {
    const pathOutput = PageRETargets.map(
      path => (path + ': ').padEnd(45) + (defaultPagesRE.test(path) ? '命中页面' : '忽略'),
    )
    expect(pathOutput).toMatchSnapshot()
  })

  test('meta标签匹配', async () => {
    const metaOutput = MetaRETargets.map(str => str.match(defaultMetaRE)[0])
    expect(metaOutput).toMatchSnapshot()
  })

  test('meta标签解析', async () => {
    let alias = {
      微信: 'mp-weixin',
      app: 'app-plus',

      title: 'navigationBarTitleText',
    }
    let preset = {
      hide: {
        navigationStyle: 'custom',
      },
    }

    let metaWithoutAlias = MetaParser('<meta navigationBarTitleText="foo"></meta>', alias, preset)
    let metaWithAlias = MetaParser('<meta title="foo"></meta>', alias, preset)
    assert.deepStrictEqual(metaWithoutAlias, metaWithAlias, '别名应当生效')

    let metaWithPreset = MetaParser('<meta hide title="foo"></meta>', alias, preset)
    assert(metaWithPreset['navigationStyle'] === 'custom', '预设应当生效')

    const metaOutput = MetaParserTargets.map(str => MetaParser(str, alias, preset))
    expect(metaOutput).toMatchSnapshot()
  })
})
