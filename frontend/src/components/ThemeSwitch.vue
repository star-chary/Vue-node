<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme.ts'

// 获取 store 实例
const themeStore = useThemeStore()

// 解构响应式状态
const { theme } = storeToRefs(themeStore)

// 获取 action 方法
const { changeTheme } = themeStore

// 监听 theme 状态的变化，并同步到 DOM
// 当 theme.value 改变时，这个 watch 会触发
watch(theme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme)
})

// 在组件挂载时，根据当前 store 的状态设置初始主题
onMounted(() => {
  document.documentElement.setAttribute('data-theme', theme.value)
})

</script>

<template>
  <div class="more-item" @click="changeTheme">切换主题</div>
</template>

<style scoped>
div {
  color: var(--text-color);
  cursor: pointer;
  margin: 4px 0;
}
</style>
