module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "indent": ["error", 2],
    "no-extra-semi": "error",
    "semi": [2, "never"],
    "no-undef": "off",
    "quotes": ["error", "single"],
    "vue/no-v-model-argument": "off",
    "keyword-spacing": 2,
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "object-curly-spacing": ["error", "always"]
  }
}
