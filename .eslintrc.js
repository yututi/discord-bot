module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: 'standard',
  plugins: [
    '@typescript-eslint'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'no-new': 0
  }
}
