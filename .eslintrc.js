module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  // 配置js全局变量，因为是uni-app，全局的uni是不需要引入的，还有5+的plus对象
  globals: {
    uni: 'readonly',
    UniApp: 'readonly',
    uniCloud: 'readonly',
    plus: 'readonly',
    wx: 'readonly',
    swan: 'readonly',
    my: 'readonly',
    getCurrentPages: 'readonly',
    app: 'readonly',
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-eval': 'error',
    'no-alert': 'error',
    'no-empty': 'off',
    'vue/max-attributes-per-line': ['off'],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: false,
        ignores: ['/^u-/'],
      },
    ],
    'vue/no-v-html': 'off',
    'accessor-pairs': 2,

    'block-spacing': [2, 'always'],
    'brace-style': [
      2,
      '1tbs',
      {
        allowSingleLine: true,
      },
    ],
    camelcase: [
      0,
      {
        properties: 'always',
      },
    ],
    'comma-dangle': [2, 'only-multiline'],
    'comma-style': [2, 'last'],
    'constructor-super': 2,
    curly: 'off',
    'dot-location': [2, 'property'],
    'eol-last': 2,
    eqeqeq: 'off',
    'generator-star-spacing': [
      2,
      {
        before: true,
        after: true,
      },
    ],
    'handle-callback-err': [2, '^(err|error)$'],
    'jsx-quotes': [2, 'prefer-single'],
    'new-cap': [
      2,
      {
        newIsCap: true,
        capIsNew: false,
      },
    ],
    'new-parens': 2,
    'no-array-constructor': 2,
    'no-caller': 'off',
    'no-class-assign': 2,
    'no-cond-assign': 2,
    'no-const-assign': 2,
    'no-control-regex': 0,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty-character-class': 2,
    'no-empty-pattern': 2,
    'no-ex-assign': 2,
    'no-extend-native': 0,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': [2, 'functions'],
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [
      2,
      {
        allowLoop: false,
        allowSwitch: false,
      },
    ],
    'no-lone-blocks': 2,
    'no-mixed-spaces-and-tabs': 1,
    'no-multi-spaces': 2,
    'no-multi-str': 2,

    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 'off',
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-return-assign': [2, 'except-parens'],
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 0,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 0,
    'no-trailing-spaces': 0,
    'no-undef-init': 2,
    'no-unexpected-multiline': 'off',
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [
      2,
      {
        defaultAssignment: false,
      },
    ],
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unused-vars': 0,
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,
    'one-var': [
      2,
      {
        initialized: 'never',
      },
    ],
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before',
        },
      },
    ],
    'padded-blocks': [2, 'never'],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'semi-spacing': [
      2,
      {
        before: false,
        after: true,
      },
    ],

    'space-in-parens': [2, 'never'],
    'space-infix-ops': 1,
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false,
      },
    ],
    'template-curly-spacing': [2, 'never'],
    'use-isnan': 2,
    'valid-typeof': 2,
    'wrap-iife': [2, 'any'],
    'yield-star-spacing': [2, 'both'],
    yoda: [2, 'never'],
    'prefer-const': 0,
    'array-bracket-spacing': [2, 'never'],
    'no-prototype-builtins': 0,
    // 自定义开始
    'vue/html-indent': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/html-self-closing': 0,
    indent: 0,
    semi: 0,
    'comma-spacing': 0,
    'space-before-blocks': 0,
    'keyword-spacing': 0,
    'key-spacing': 0,
    'no-multiple-empty-lines': 0,
    'spaced-comment': 0,
    'space-before-function-paren': 0,
    'arrow-spacing': 0,
    'object-curly-spacing': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'no-undef': 0,
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'vue/multi-word-component-names': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-dupe-class-members': 'off',
      },
    },
  ],
}
