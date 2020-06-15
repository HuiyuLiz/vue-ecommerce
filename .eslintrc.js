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
    semi: ['error', 'never']
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
