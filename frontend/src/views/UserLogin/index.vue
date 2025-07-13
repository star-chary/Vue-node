<script setup lang="ts">
import UserLogin from '@/views/UserLogin/components/UserLogin.vue'
import UserRegister from '@/views/UserLogin/components/UserRegister.vue'
import { userLogin } from '@/views/UserLogin/composables/userLogin'

const { loginForm, handleLogin, handleRegister, loginOrRegister, loginOrRegisterFn } = userLogin()

const onLogin = (loginData: any) => {
  handleLogin(loginData)
}

// 注册
const onRegister = (data: any) => {
  handleRegister(data)
}

// 切换登录或注册
const handleSwitch = (data:string) => {
  loginOrRegisterFn(data)
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div style="display: flex; flex-direction: column">
        <UserLogin
          v-if="loginOrRegister === 'login'"
          :login-form="loginForm"
          @handle-login="onLogin"
          @on-switch="handleSwitch"
          class="login-content login-title"
        ></UserLogin>
        <UserRegister
          @on-switch="handleSwitch"
          @handle-register="onRegister"
          :login-form="loginForm"
          v-else class="login-content login-title"></UserRegister>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden; /* 防止出现滚动条 */
}

.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
  box-sizing: border-box;
}

.login-content {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  min-width: 300px;
}
.login-title {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.login-button:hover {
  background: #5a67d8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .login-container {
    padding: 0.5rem;
  }

  .login-content {
    padding: 2rem;
    min-width: 280px;
  }
}

@media (max-width: 480px) {
  .login-container {
    padding: 0.25rem;
  }

  .login-content {
    padding: 1.5rem;
    min-width: 260px;
  }

  .login-title {
    font-size: 1.25rem;
  }
}
</style>
