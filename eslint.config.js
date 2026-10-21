import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // Global ignores (replaces .eslintignore)
  {
    ignores: ['dist', 'node_modules', 'build'],
  },

  // Base JS recommended rules
  js.configs.recommended,

  // React-specific rules
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // 👈 This is the critical line
        },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        ...globals.browser,
      },
    },
  },

  // Prettier config MUST be last to disable conflicting rules
  prettierConfig,
];
