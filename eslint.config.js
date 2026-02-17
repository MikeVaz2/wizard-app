import globals from 'globals';
import js from '@eslint/js';
import tsEslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tsEslint.config({
  // Common configuration for all files
  files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  languageOptions: {
    parser: tsEslint.parser,
    parserOptions: {
      project: ['./tsconfig.json'], // Enable type-aware linting
      ecmaFeatures: {
        jsx: true, // Enable JSX
      },
    },
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  // Combine base ESLint, TS, React, and Prettier configurations
  extends: [
    js.configs.recommended, // ESLint's recommended rules
    ...tsEslint.configs.recommended, // TypeScript ESLint recommended rules
    pluginReact.configs.recommended, // React recommended rules
    eslintPluginPrettierRecommended, // Must be the last extend to disable conflicting rules
  ],
  plugins: {
    react: pluginReact,
    'react-hooks': pluginReactHooks,
  },
  rules: {
    // Add your custom rules here
    'react/react-in-jsx-scope': 'off', // Not needed for modern React (17+)
    // Example:
    // "semi": ["error", "never"],
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
});
