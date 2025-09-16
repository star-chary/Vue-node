import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  // 从 localStorage 读取初始值，如果不存在则使用 'light'
  const theme = ref(localStorage.getItem('app-theme') || 'light')

  const changeTheme = (): void => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light'
    theme.value = newTheme
    // 手动将新状态保存到 localStorage
    localStorage.setItem('app-theme', newTheme)
  }

  return {
    theme,
    changeTheme,
  }
})
