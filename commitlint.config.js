module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 以下时我们自定义的规则
  rules: {
    'type-enum': [0],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
}
