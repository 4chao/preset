<h1 align="center">Uniapp Preset</h1>
<div align="center">
<img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D" height="31">
<img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" height="31">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="31">
<img src="https://user-images.githubusercontent.com/26431026/159439484-68970ebe-d484-4aff-a556-eb8fd6e58202.png" height="31">
</div>
<div align="center">
<img src="https://img.shields.io/badge/license-MIT-44ccff.svg" height="20">
<img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2F4chao%2Fpreset.svg?type=small" height="20">
</div>

- [💄 Features](#-features)
- [🎉 Getting Started](#-getting-started)
- [📖 Wiki](#-wiki)
  - [⚙️ Presets](#️-presets)
    - [项目配置文件](#项目配置文件)
    - [自动路由配置](#自动路由配置)
    - [API 自动引入](#api-自动引入)
    - [根组件自动引入](#根组件自动引入)
    - [uView UI](#uview-ui)
    - [更新模板](#更新模板)
    - [原子化 css](#原子化-css)
  - [🧰 Utils](#-utils)
    - [页面跳转](#页面跳转)
    - [API 请求封装 (TODO)](#api-请求封装-todo)
    - [状态管理](#状态管理)
    - [时间处理](#时间处理)
  - [🪝 Hooks](#-hooks)
    - [页面传参获取](#页面传参获取)
    - [上拉加载下拉刷新](#上拉加载下拉刷新)
- [🍻 Contributing](#-contributing)
- [📝 License](#-license)

## 💄 Features

已实现：

- 开箱即用 - 下载即可体验最新的技术栈 vite,ts,vue3,...
- 随时更新 - 妈妈再也不用担心项目不能用脚手架的新功能了
- 各种自动按需引入 - 减少代码量，保护你娇弱的手指
- 自动路由配置 - 全自动化构建 pages.json 文件
- 原子化 css - 并且支持小程序使用 Attributify 风格
- 超多 utils - 工具函数加快开发效率
- uView UI 组件库 - 我偷偷适配了 Vue3 哦

TODO:

- [ ] 完善更新日志流程
- [ ] 添加 axios 模块，构建请求封装
- [ ] 添加 UniCloud-ts 基础框架 (`src/app/server/`)
- [ ] 页面跳转传参改为事件机制

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

**所以请不要修改`src/pages.json`文件，会被覆盖，若有需求，可直接修改`app.config.ts`的 pages 项**

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

#### 更新模板

执行`yarn upgrade:template`即可更新模板

window 可能有问题，可以按照下面手动更新：

- `git remote add template https://github.com/4chao/preset.git`
- `git fetch template`
- `git merge template/master -m '🥝 upgrade: template'`

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

1. Attributify 风格直接编译到小程序会被忽略，所以小程序平台将会由`build/vite-plugin-mp-attr-fix.ts`转换成有`data-`前缀的 dataset
2. 小程序 wxss 不支持`hover:`这种类名前缀会报错，请使用`hover-`前缀
3. 如果你有更好的解决方案欢迎 PR

### 🧰 Utils

> 通过 app 变量引入的功能
>
> app 变量将会由 `unplugin-auto-import/vite` 自动按需引入，所以可以当做全局变量直接使用 utils 都写在`src/app/utils`中，你也可以添加自己的 utils

#### 页面跳转

```ts
app.to('/pages/aaa/bbb') // 跳转到 /pages/aaa/bbb.vue 页面
app.to('ccc/ddd') // 跳转到 /pages/ccc/ddd.vue 页面
app.to('eee') // 跳转到 当前分包下的 ddd.vue 页面

// 跳转到 当前分包下的 fff.vue 页面 并携带参数
app.to('fff',{g:'h'})
// 需要在目标页面使用 useQuery 钩子来获取参数
import { useQuery } from '@/hooks'
const { data } = useQuery()

app.back() // 返回上一页

// 返回并携带参数
app.back({i:'j'})
// 在上一个页面的相应app.to的then方法中获取回调参数:
app.to('...').then(res => {...})

```

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

> 项目中定义的组合 API 函数
>
> hook 命名需要以 use 开头
>
> 通过 `import { xxx } from '@/hooks'` 引入

#### 页面传参获取

```ts
import { useQuery } from '@/hooks'
const { data } = useQuery()
```

#### 上拉加载下拉刷新

```ts
import { useScroll } from '@/hooks'
useScroll(onPageScroll).onLoad(page => {
  app.info('页面加载', `第${page.num}页`)
  setTimeout(() => page.endSuccess(10, false), 1000)
})
```

## 🍻 Contributing

我们非常欢迎你参与贡献，你可以将使用过程中添加的新 Hooks 或 Utils 提交至本仓库并获得社区的持续助力！

期待你的 PR 和 Issue!（你甚至可以帮助完善一下这个贡献指南）

## 📝 License

MIT License © 2022 PentaTea

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2F4chao%2Fpreset.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2F4chao%2Fpreset?ref=badge_large)
