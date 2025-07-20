import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import fs from 'node:fs'

// ✅ 从 auto-import 文件中读取 globals
let autoImportGlobals = {}
try {
  const autoImportConfig = JSON.parse(fs.readFileSync('./.eslintrc-auto-import.json', 'utf-8'))
  autoImportGlobals = autoImportConfig.globals || {}
} catch (e) {
  console.warn('⚠️ 未找到 .eslintrc-auto-import.json，自动导入 globals 将不会启用', e)
}

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,ts,jsx,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...autoImportGlobals, // ✅ 自动导入的 globals 合并进来
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,
])
