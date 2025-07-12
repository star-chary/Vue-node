<script setup>
import { userLogin } from '@/views/UserLogin/userLogin.ts'

const { handleLogin ,loginForm} = userLogin()
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-content">
        <h1 class="login-title">欢迎登录</h1>
        <el-form :model="loginForm" label-width="auto">
          <el-form-item label-position="right" label="账号">
            <el-input v-no-space v-model="loginForm.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label-position="right" label="密码" >
            <el-input v-no-space type="password" v-model="loginForm.password" placeholder="请输入密码" />
          </el-form-item>
        </el-form>
        <el-button style="width: 100%" type="primary" @click="handleLogin">登录</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
