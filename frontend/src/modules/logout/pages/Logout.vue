<script setup lang="ts">
import { userLogin } from '@/modules/loginAndLogout/composables/userLogin.ts'
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  userLogin().handleLogout()
  router.push('/mainlayout/login')
}
</script>

<template>
  <div>
    <el-button @click="logout" style="width: 100%" type="primary">退出登录</el-button>
  </div>
</template>

<style scoped></style>
