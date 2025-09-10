// apps/backend/eslint.config.js
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  // Ignorar artefactos y ESTE archivo
  { ignores: ['dist', 'node_modules', 'eslint.config.js'] },

  // (Opcional) Reglas JS si tuvieras archivos .js
  {
    ...js.configs.recommended,
    files: ['**/*.js'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  },

  // TypeScript SIN type-checking
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // ⛔️ NO poner "project" aquí para evitar type-checking
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // Asegurar desactivada la que te rompe
      '@typescript-eslint/await-thenable': 'off',
    },
  },
];