module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    '@vue/standard'
  ],
  rules: {
    semi: ['error', 'never'],
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'never'
    }]

  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
