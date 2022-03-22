# Uniapp Preset

<div>
<img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D" height="31">
<img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" height="31">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="31">
<img src="https://user-images.githubusercontent.com/26431026/159439484-68970ebe-d484-4aff-a556-eb8fd6e58202.png" height="31">
</div>

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

**欢迎大家提交 PR 和 Issue**

## 🎉 Getting Started

- [Uniapp Preset](#uniapp-preset)
  - [💄 Features](#-features)
  - [🎉 Getting Started](#-getting-started)
  - [⚙️ Presets](#️-presets)
    - [根组件自动引入](#根组件自动引入)
  - [🧰 Utils](#-utils)
  - [🪝 Hooks](#-hooks)

## ⚙️ Presets

> 一些项目级别的预设写法和配置项

### 根组件自动引入

###

## 🧰 Utils

> 通过 app 变量引入的功能
>
> app 变量将会由 `unplugin-auto-import/vite` 自动按需引入，所以可以当做全局变量直接使用

## 🪝 Hooks

> 项目中定义的组合 API 函数
>
> hook 命名需要以 use 开头
>
> 通过 `import { xxx } from '@/hooks'` 引入
