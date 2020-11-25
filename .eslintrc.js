module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    "jest": true,
    "es6": true
  },
  "parser": "babel-eslint",
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: { indent: ['error', 2] },
  settings: {
    react: {
      version: 'detect',
    },
  }
};
