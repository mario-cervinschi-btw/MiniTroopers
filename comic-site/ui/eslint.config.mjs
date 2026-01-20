import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
    rules: {
      'no-var': 'error',

      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      'no-console': 'warn',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-else-return': 'error',
      'no-implicit-coercion': 'error',

      'camelcase': ['error', { properties: 'always' }],
      'no-magic-numbers': ['warn', { ignore: [0, 1, -1], ignoreArrayIndexes: true }],
      'no-duplicate-imports': 'error',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { avoidEscape: true }],
    },
  },
]);
