// .eslintrc.js

module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser for TypeScript
  extends: [
    'airbnb-typescript', // Airbnb's base rules with TypeScript support
    'plugin:@typescript-eslint/recommended', // Recommended rules from @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Integrates Prettier with ESLint
  ],
  plugins: ['@typescript-eslint', 'react', 'jsx-a11y', 'import', 'prettier'],
  parserOptions: {
    project: './tsconfig.json', // Specifies the path to your TypeScript config
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': 'error', // Shows Prettier errors as ESLint errors
    // Add or override other rules as needed
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Recognizes these file extensions
      },
    },
    'import/no-extraneous-dependencies': ["error", {"devDependencies": true}]
  },
};
