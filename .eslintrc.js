module.exports = {
  extends: [
    'alloy',
    'alloy/typescript',
  ],
  env: {
    jest: true,
  },
  globals: {
  },
  rules: {
  },
  overrides: [
    // tests, no restrictions (runs in Node / jest with jsdom)
    {
      files: ['*.json'],
      rules: {
        '@typescript-eslint/no-unused-expressions': 'off',
      }
    },
    {
      files: ['./scripts/*.js'],
      rules: {
        "@typescript-eslint/no-require-imports": "off"
      }
    }
  ]
};
