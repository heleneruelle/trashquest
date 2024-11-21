import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      'prettier/prettier': 'error',
      indent: ['error', 2], // 2 spaces for indentation
    },
  },
  pluginJs.configs.recommended,
  prettier,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];
