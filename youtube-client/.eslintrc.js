module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-typescript/base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    import: {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['@typescript-eslint', 'react', 'jest'],
  rules: {
    'linebreak-style': 0,
    'react/jsx-filename-extension': [
      'off',
      { extensions: ['.js', '.jsx', '.tsx', '.ts'] },
    ],
    'import/extensions': 0,
    'class-methods-use-this': ['off', { exceptMethods: [] }],
    '@typescript-eslint/no-var-requires': 0,
  },
};

