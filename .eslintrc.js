module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [
    {
      excludedFiles: ['**/*.test.*', 'packages/internal/web-entrypoint/**'],
      files: ['**/*.ts', '**/*.tsx', '**/*.js'],
    },
  ],
  plugins: ['import'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/typedef': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-dynamic-require': 'error',
    'no-nested-ternary': 'error',
    'prettier/prettier': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react-native/no-inline-styles': 'error',
    'react-native/no-unused-styles': 'error',
  },
};
