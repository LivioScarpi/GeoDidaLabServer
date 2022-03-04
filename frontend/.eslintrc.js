module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential'],
  rules: {
    //'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "vue/no-unused-components": ["error", {
      "ignoreWhenBindingPresent": true
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
