<script setup>
const props = defineProps({
  loginForm: {
    type: Object,
    default: () => ({
      username: '',
      password: '',
    }),
  },
})

const emit = defineEmits(['handleLogin','onSwitch'])

const handleLogin = () => {
  if (!props.loginForm.username || !props.loginForm.password) {
    console.log('请输入用户名和密码')
  }

  emit('handleLogin', {
    ...props.loginForm,
  })
}

const onSwitch = () => {
  emit('onSwitch', 'register')
}
</script>

<template>
  <div class="login-content">
    <h1 class="login-title">欢迎登录</h1>
    <el-form :model="loginForm" label-width="auto">
      <el-form-item label-position="right" label="账号">
        <el-input v-no-space v-model="loginForm.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label-position="right" label="密码">
        <el-input
          v-no-space
          type="password"
          show-password
          clearable
          v-model="loginForm.password"
          placeholder="请输入密码"
        />
      </el-form-item>
    </el-form>
    <el-button style="width: 100%" type="primary" @click="handleLogin">登录</el-button>
    <div @click="onSwitch" style="margin-top: 1rem; font-size: 0.6rem; color: gray; cursor: pointer">
      没有账号？点击注册
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
