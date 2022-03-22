let f: any = ({ title, args }) => console.log(` [ ${title} ] `, ...args)

// h5和微信平台有devools
// #ifdef H5 | MP
f = ({ type, bg, title, args }) =>
  console[['log', 'info', 'warn', 'error'].includes(type) ? type : 'log'](
    `%c ${title} `,
    `color:#fff;background:${bg};padding:5px;margin:5px 0;font-family:Monaco,PingFang SC`,
    ...args,
  )
// #endif

// app平台调试环境有devools
// #ifdef APP-PLUS
try {
  if (global)
    f = ({ type, bg, title, args }) =>
      console[['log', 'info', 'warn', 'error'].includes(type) ? type : 'log'](
        `%c ${title} `,
        `color:#fff;background:${bg};padding:5px;margin:5px 0;font-family:Monaco,PingFang SC`,
        ...args,
      )
} catch (error) {}
// #endif

const types = {
  log: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 150%);',
  info: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);',
  warn: 'linear-gradient(to right, #e6b980 0%, #eacda3 100%);',
  error: 'linear-gradient(45deg, #ff0844 0%, #ffb199 100%);',
  debug: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
  success: 'linear-gradient(45deg, #43e97b 0%, #38f9d7 150%);',
}

export const loggers = fromEntries(
  Object.keys(types).map(type => {
    let [bg] = types[type].split('|')
    // f({ type, bg, title: 'test ' + type, args: [] }) // test
    return [type, (title, ...args) => f({ type, bg, title, args })]
  }),
) as { [K in keyof typeof types]: (title: string, ...args: any[]) => void }

export default function () {
  Object.assign(app, loggers)
}

declare global {
  interface App extends Is<typeof loggers> {}
}

function fromEntries(iterable) {
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val
    return obj
  }, {})
}
