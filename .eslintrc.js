module.exports = {
  plugins: ['type-graphql'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:type-graphql/recommended'
  ],
  parser: '@typescript-eslint/parser'
}
