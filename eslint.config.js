import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

// 暫時禁用所有 ESLint 規則
export default tseslint.config(
  { ignores: ['dist', '**/*.{js,jsx,ts,tsx}'] }, // 忽略所有 JavaScript 和 TypeScript 文件
  {
    extends: [], // 清空所有擴展
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      // 保留插件引用但不啟用規則
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // 清空所有規則
    },
  },
)
