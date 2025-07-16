<script setup lang="ts">
import { authUtils } from '@/utils/auth.ts'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  authUtils.removeToken()
  router.push('/login')
}
</script>

<template>
  <div>
    <el-button @click="handleLogout" style="width: 100%" type="primary">退出登录</el-button>
  </div>
</template>

<style scoped></style>
