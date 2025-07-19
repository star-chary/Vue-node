<script setup lang="ts">
const props = defineProps({
  loginForm: {
    type: Object,
    default: () => ({
      username: '',
      password: '',
    }),
  },
})

const emit = defineEmits(['handleRegister','onSwitch'])

const onRegister = () => {
  console.log('注册')
  emit('handleRegister',props.loginForm)
}

const onSwitch = () => {
  emit('onSwitch', 'login')
}
</script>

<template>
  <div class="login-content">
    <h1 class="login-title">欢迎注册</h1>
    <el-form :model="loginForm" label-width="auto">
      <el-form-item label-position="right" label="账号">
        <el-input v-no-space v-model="loginForm.username" clearable placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label-position="right" label="密码">
        <el-input
          v-no-space
          clearable
          type="password"
          show-password
          v-model="loginForm.password"
          placeholder="请输入密码"
        />
      </el-form-item>
    </el-form>
    <el-button style="width: 100%" type="primary" @click="onRegister">注册</el-button>
    <div
      @click="onSwitch"
      style="margin-top: 1rem; font-size: 0.6rem; color: gray; cursor: pointer"
    >
      已有账号？点击登录
    </div>
  </div>
</template>

<style scoped></style>
