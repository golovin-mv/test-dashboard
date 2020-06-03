module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: [
    'plugin:mocha/recommended',
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'mocha/no-mocha-arrows': 'off',
    'import/extensions': 'off',
  },
  plugins: [
    'mocha',
  ],
  overrides: [
    {
      files: ['*.spec.js'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
};
