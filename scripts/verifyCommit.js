// Invoked on the commit-msg git hook by yorkie.

const colors = require('picocolors')
const msgPath = process.argv[2]
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim()

const commitRE = /^.*?(\(.+\))?: .{1,100}/

if (!commitRE.test(msg)) {
  console.log()
  console.log(
    `  ${colors.bgRed(colors.white(' ERROR '))} ${colors.red(
      `invalid commit message format.`
    )}\n\n` +
      colors.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`
      ) +
      `    ${colors.green(`feat(compiler): add 'comments' option`)}\n` +
      `    ${colors.green(`fix(v-model): handle events on blur (close #28)`)}\n\n` +
      colors.red(`  See .github/commit-convention.md for more details.\n`)
  )
  process.exit(1)
}
