module.exports={
  root: true,
  env:{
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
    jest: true,
  },
  parserOptions:{
    requireConfigFile:false,
    ecmaVersion:2021,
    sourceType:'module',
    ecmaFeatures:{
      jsx: true,
      generators: true,
      experimentalObjectRestSpread: true,
    },
    parser: '@babel/eslint-parser',
  },
  globals:{
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    document: true,
    navigator: true,
    window:true,
    node:true,
  },
  settings:{
    'import/ignore': [
      'node_modules',
      'doc',
      'dist',
    ],
  },
  extends: ['eslint:recommended','plugin:vue/essential'],
  // extends: ['plugin:prettier/recommended'],
  rules: {
    'strict': [2, 'never'],
    'quotes': [2, 'single',{'allowTemplateLiterals':true}],

    'eqeqeq': [1, 'smart'],
    'curly': [1, 'all'],
    // 'indent':[2, 2],
    'indent': ['error',2,{'ignoredNodes':['TemplateLiteral']}],
    'jsx-quotes': [2,'prefer-double'],
    'semi':[2,'always'],
    'no-extra-semi':2,
    'no-mixed-spaces-and-tabs': [2, 'smart-tabs'],
    'comma-dangle':[2,'always-multiline'],
    'no-console':1,
    'no-empty':1,

    'no-debugger':1,
    'no-extra-bind':1,
    'no-lone-blocks':1,
    'no-var':2,
    'no-unused-expressions':[1,{ 'allowShortCircuit': true, 'allowTernary': true }],
    'no-unused-vars':[1,{ 'args': 'none', 'ignoreRestSiblings': true }],

    'no-undef':2,
    'no-restricted-globals': [2, 'event'],

    'vue/jsx-uses-vars': 2,
    'vue/require-render-return': 2,
    'vue/html-self-closing': 2,

    // 'react-hooks/rules-of-hooks': 2,
    // 'react-hooks/exhaustive-deps': 1,
    // 'prettier/prettier': 'error',
  },
  plugins: [
    'babel',
    'vue',
  ],
};

