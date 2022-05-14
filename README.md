<h1 align="center">Uniapp Preset</h1>
<div align="center">🌁 基于 uniapp，快速，优雅的全栈预设模板</div>
<br>
<div align="center"><a href="https://4chao.github.io/preset/"><table><thead><tr><th>🌟 DEMO</th></tr></thead></table></a></div>
<div align="center">
<img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D" height="31">
<img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" height="31">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="31">
<img src="https://user-images.githubusercontent.com/26431026/159439484-68970ebe-d484-4aff-a556-eb8fd6e58202.png" height="31">
</div>
<div align="center">
<img src="https://img.shields.io/badge/license-MIT-44ccff.svg" height="20">
<img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" height="20">
<img src="https://img.shields.io/github/workflow/status/4chao/preset/Build%20and%20Deploy" height="20">
</div>
<div align="center">
<img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2F4chao%2Fpreset.svg?type=small" height="20">
</div>
<br>

<a href="https://www.pixiv.net/artworks/93782133">
<div align="right">93782133</div>
</a>
<a href="https://www.pixiv.net/artworks/93782133">
<img src="https://user-images.githubusercontent.com/26431026/159630824-ea9fcd0e-0a32-4aae-8be1-61725f6b6bb8.png" align="right" height="580">
</a>

- [💄 Features](#-features)
- [🎉 Getting Started](#-getting-started)
- [📖 Wiki](#-wiki)
  - [⚙️ Presets](#️-presets)
    - [项目配置文件](#项目配置文件)
    - [自动路由配置](#自动路由配置)
    - [API 自动引入](#api-自动引入)
    - [根组件自动引入](#根组件自动引入)
    - [uView UI](#uview-ui)
    - [原子化 css](#原子化-css)
    - [更新模板](#更新模板)
    - [单元测试](#单元测试)
  - [🧰 Utils](#-utils)
    - [页面跳转](#页面跳转)
    - [API 请求封装 (TODO)](#api-请求封装-todo)
    - [状态管理](#状态管理)
    - [时间处理](#时间处理)
  - [🪝 Hooks](#-hooks)
    - [页面传参获取](#页面传参获取)
    - [上拉加载下拉刷新](#上拉加载下拉刷新)
- [🍻 Contribute](#-contribute)
- [📜 License](#-license)

## 💄 Features

- ✅ 开箱即用 - 下载即可体验最新的技术栈 vite,ts,vue3,...
- ✅ 随时更新 - 妈妈再也不用担心项目不能用脚手架的新功能了
- ✅ 各种自动按需引入 - 减少代码量，保护你娇弱的手指
- ✅ 自动路由配置 - 全自动化构建 pages.json 文件
- ✅ 原子化 css - 并且支持小程序使用 Attributify 风格
- ✅ 超多 utils - 工具函数加快开发效率
- ✅ uView UI 组件库 - 我偷偷适配了 Vue3 哦
- ✅ vitest + power-assert 单测 - 最简单的 assert, 最极致的享受
- ✅ 杀手级别的页面间跳转流程 - 像使用 Promise 一样使用页面路由，传值回调应有尽有
- 🚧 完善更新日志流程
- 🚧 添加 axios 模块，构建请求封装
- 🚧 添加 UniCloud-ts 基础框架 (`src/app/server/`)

**欢迎大家提交 PR 和 Issue**

## 🎉 Getting Started

1. fork 或 use 本模板，克隆到本地
2. 进入主目录并执行`yarn bootstrap`
3. 执行`yarn dev:h5`运行服务
4. 若模板有更新，可执行`yarn upgrade:template`升级模板（windows 请参照[此流程](#更新模板)）
5. 请通过`yarn commit`提交更新

## 📖 Wiki

### ⚙️ Presets

> 一些项目级别的预设写法和功能项

#### 项目配置文件

整个项目的配置文件在 `src/app.config.ts` 中，你可以自由的在其中定义新字段并引入到项目中

我们也会在后文反复提到此文件

#### 自动路由配置

source: `build/vite-plugin-uni-meta.ts`

本项目中约定页面路径为`src/pages/包名/页面名.vue`, 将在编译时自动生成一个 pages.json。

| :warning: | 请不要修改`src/pages.json`文件，构建时会被覆盖，若有需求可直接修改`app.config.ts`的 pages 项|
|-|-|

通过 vite-uni-meta 插件，你可以在每个页面头部添加 meta 标签来控制 style 配置。

页面添加流程：

**旧写法：** 需要先在 pages.json 里声明

```json
{
  "pages": [{
      "path": "pages/aaa/bbb",
      "style": {
        "navigationBarTitleText": "首页",
        "navigationBarBackgroundColor":"#66ccff"
        "app-plus":{
            "navigationBarTitleText": "这是app的首页"
        }
      }
    },
  ]
}
```

**新写法：** 创建 `src/pages/aaa/bbb.vue`并写入：

```html
<template>
  <meta title="主页" app:title="这是app的首页" navigationBarBackgroundColor="#66ccff" />
  <!-- ↑ 这行也可以省略 -->
  <div>正常页面内容</div>
</template>
```

你会注意到其中 title 和 app 是一个别名，更多别名可以在`vite.config.ts`文件中修改：

```ts
export default defineConfig({
  // ...
  plugins: [
    // ...
    UniMeta({
      alias: {
        大海星: 'mp-weixin',
      },
    }),
    //...
  ],
})
```

这样就可以：

```html
<meta title="主页" app:title="这是app的首页" 大海星:title="这是微信平台的首页" />
```

#### API 自动引入

我给`unplugin-auto-import`提交了 uniapp preset 的 PR: https://github.com/antfu/unplugin-auto-import/pull/119

所以你现在可以直接在项目中使用 vue 和 uniapp 的 Composition API:

```html
<script setup lang="ts">
  // import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
  // import { ref } from 'vue'
  // ↑ 这两行就不需要了

  const hello = ref('world')
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
```

more info：https://github.com/antfu/unplugin-auto-import

#### 根组件自动引入

source: `build/vite-plugin-uni-provider.ts`

为了方便一些页面级别 provide 的开发，每个页面当中将隐式的引入根组件`<sys>`

当然如果你需要显示的传递 props 或者使用 slot, 应当自行用 sys 组件作为页面根节点

#### uView UI

repo: https://github.com/PentaTea/uView2.0

docs: https://www.uviewui.com/components/intro.html

适配 vue3 可能会带来一些 bug, 你也可以不使用这个库

#### 原子化 css

playground: https://unocss.antfu.me/

docs: https://github.com/unocss/unocss

```html
<!-- 得益于 unocss 的强力驱动，你可以直接使用 Tailwind Bootstrap Windi 等风格的原子化 css 类名 -->
<div class="pasm m-100"></div>
<!-- 支持 Attributify 风格 -->
<div pasm m-100></div>
```

注意：

1. Attributify 风格直接编译到小程序会被忽略，所以小程序平台在解析 ast 时将 attr 压入 class 中
2. 小程序 wxss 不支持`hover:`这种类名前缀会报错，请使用`hover-`前缀
3. 同时请不要使用类似`bg="blue-400 hover-blue-500"`这样的 attr, 因为 unocss 解析时不会生成相应类名选择器，应只使用无 value 的 attr
4. padding 和 margin 等长度属性的默认单位为 rpx, 例如：`p-30`和`pa30`意为`padding: 30rpx`, 注：app 和 h5 下 rpx 单位其实由 uniapp 转换为 $\frac{1}{32}$ rem 实现的，所以请不要显式使用 rpx 单位：`p-30rpx`, 这样不经过转换会样式失灵。
5. 同样的，`paxs`,`pasm`等尺寸也进行了隐式转换。规则：`xs = 10rpx, sm = 20rpx`以此类推
6. 由于 4 中转换逻辑与 uniapp 官方相同，所以 rpxCalcMaxDeviceWidth 等属性不受影响
7. 如果你有更好的解决方案欢迎 PR

相关 patches 文件：
`patches/@unocss+preset-mini+**.patch`
`patches/@dcloudio+uni-mp-compiler+**.patch`

#### 更新模板

执行`yarn upgrade:template`即可更新模板

window 可能有问题，可以按照下面手动更新：

- `git remote add template https://github.com/4chao/preset.git`
- `git fetch template`
- `git merge template/master -m '🥝 upgrade: template'`

#### 单元测试

在`test`目录下编写测试用例后，运行`yarn test`即可进行单元测试

Thanks to [power-assert](https://github.com/power-assert-js/power-assert)，你现在可以获得非常美妙的断言报错信息，即使是复杂的数据结构也不在话下

（适配 espower 的插件源码在`build/vite-plugin-espower.ts`

<img width="543" alt="image" src="https://user-images.githubusercontent.com/26431026/159885473-30cb69c1-045a-495f-aa91-9eed4a28dc46.png">
<img width="607" alt="image" src="https://user-images.githubusercontent.com/26431026/159883357-43092e26-85da-49ed-83d7-5be61f1faf28.png">
<img width="789" alt="image" src="https://user-images.githubusercontent.com/26431026/159884020-f005561b-2e17-4a9b-b3c3-c4e2a0049702.png">

### 🧰 Utils

> 通过 app 变量引入的功能
>
> app 变量将会由 `unplugin-auto-import/vite` 自动按需引入，所以可以当做全局变量直接使用 utils 都写在`src/app/utils`中，你也可以添加自己的 utils

#### 页面跳转

```ts
/**
 * 跳转!
 */
// 使用#作为分包标识, 详情看下方表格
app.to('/pages/aaa/bbb') // 跳转到 /pages/aaa/bbb.vue 页面
app.to('#ccc/ddd') // 跳转到 /pages/ccc/ddd.vue 页面
app.to('eee') // 跳转到 当前目录下的 eee.vue 页面

// 跳转到 当前分包下的 fff.vue 页面 并携带参数
app.to('fff',{g:'h'})

/**
 * 接收参数!
 */
// 需要在目标页面使用 useQuery 钩子来获取参数
const { data } = useQuery()

/**
 * 返回值!
 */
app.back() // 返回上一页

// 返回并携带参数
app.back({i:'j'})
// 在上一个页面的相应app.to的then方法中获取回调参数:
app.to('...').then(res => {...})
```

__页面路径解析规则：__

> 下表中 $currentGroup 为当前分包

|说明|输入|解析|
|-|-|-|
| #后为包名，路径留空默认为 index | #group | /pages/group/index |
| 同上 | #group/ | /pages/group/index |
| #后为包名，提供路径 | #group/foo | /pages/group/foo |
| #留空默认当前分包并提供路径 | #/foo/bar | /pages/$currentGroup/foo/bar |
| 默认当前分包，默认解析到 index | # | /pages/$currentGroup/index |
| 同上 | #/ | /pages/$currentGroup/index |
| 不涉及分包，遵循 uniapp 标准 | foo/bar | foo/bar |
| 不涉及分包，遵循 uniapp 标准 | foo/bar/baz | foo/bar/baz |
| 不涉及分包，遵循 uniapp 标准 | /pages/foo/bar | /pages/foo/bar |
| 不涉及分包，遵循 uniapp 标准 | ./foo/bar | ./foo/bar |
| 不涉及分包，遵循 uniapp 标准 | ../foo | ../foo |

#### API 请求封装 (TODO)

todo...

#### 状态管理

请阅读`src/app/store/module`中的代码

docs: https://github.com/michaelolof/vuex-class-component

```ts
// 可以直接赋值
app.Global.token = '123456'
```

#### 时间处理

docs: https://dayjs.gitee.io/docs/zh-CN/installation/installation

```ts
app.time().format('YYYY-MM-DD')
```

### 🪝 Hooks

> 包含实用的 Composition API

| :bulb: | hook 命名最好以 use 开头 |
|-|-|

| :warning: | `@/hooks` 中导出的所有函数都将被注册为全局变量 |
|-|-|

#### 页面传参获取

```ts
const { data } = useQuery()
```

#### 上拉加载下拉刷新

```ts
useScroll(onPageScroll).onLoad(page => {
  app.info('页面加载', `第${page.num}页`)
  setTimeout(() => page.endSuccess(10, false), 1000)
})
```

## 🍻 Contribute

我们非常欢迎你参与贡献，你可以将使用过程中添加的新 Hooks 或 Utils 提交至本仓库并获得社区的持续助力！

期待你的 PR 和 Issue!（你甚至可以帮助完善一下这个贡献指南）

## 📜 License

<a href="https://app.fossa.com/projects/git%2Bgithub.com%2F4chao%2Fpreset?ref=badge_large">
<img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2F4chao%2Fpreset.svg?type=large" align="left">
</a>

```
MIT License

Copyright © 2022-PRESENT PentaTea

```
