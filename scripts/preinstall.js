if (!/yarn/.test(process.env.npm_execpath || '')) {
  console.warn(
    `\n\u001b[33m本仓库使用 yarn 作为包管理器,请确保已安装 yarn 并使用其进行依赖下载\u001b[39m\n`,
  )
  console.warn(`\u001b[33m若未安装请先使用 npm install -g yarn 安装\u001b[39m\n`)
  process.exit(1)
}
