module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  plugins: ['jest', 'react-hooks'],
  env: {
    browser: true,
    node: true,
    es6: true,
    'jest/globals': true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    // false positive が出まくるので off にする
    '@typescript-eslint/no-unused-vars': 'off',

    // わざわざ型を書きたくないケースが多い (コンポーネントなど)
    '@typescript-eslint/explicit-function-return-type': 'off',

    // any を明示するときは何か理由があって any にしているので無視する
    '@typescript-eslint/no-explicit-any': 'off',

    // ReadonlyArray<T> が readonly T[] に変換できないので無視する
    '@typescript-eslint/array-type': 'off',

    // Node.js では require を使用するので無視する
    '@typescript-eslint/no-var-requires': 'off',

    // 空であることを明示したいパターンがあるので無視する
    '@typescript-eslint/no-empty-interface': 'off',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // TypeScript で型付けするので不要
    'react/prop-types': 'off',
  },
}
