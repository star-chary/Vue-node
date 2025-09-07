<script setup lang="ts">
import Magnetic from '@/components/Magnetic.vue'
import UserLogin from '@/modules/loginAndLogout/components/UserLogin.vue'
import UserRegister from '@/modules/loginAndLogout/components/UserRegister.vue'
import Spline from '@/components/Spline.vue'
import { userLogin } from '@/modules/loginAndLogout/composables/userLogin'

const {
  loginForm,
  handleLogin,
  handleRegister,
  loginOrRegister,
  loginOrRegisterFn,
  loading,
  loadingRegister,
} = userLogin()

const onLogin = (loginData: any) => {
  handleLogin(loginData)
}

// 注册
const onRegister = (data: any) => {
  handleRegister(data)
}

// 切换登录或注册
const handleSwitch = (data: string) => {
  loginOrRegisterFn(data)
}

</script>

<template>
  <!--  <Magnetic></Magnetic>-->
  <div style="width: 100vw; height: 100vh; overflow: hidden; position: relative">
    <!--    <spline-viewer-->
    <!--      style="position: absolute; top: 0; left: 0; width: 100%; height: 110%"-->
    <!--      url=""-->
    <!--    ></spline-viewer>-->
    <spline
      script-url="https://unpkg.com/@splinetool/viewer@1.10.56/build/spline-viewer.js"
      spline-url="https://prod.spline.design/5QgfcF1nxGI77Kzz/scene.splinecode"
    ></spline>
    <!--    <div class="login-page" :class="{ 'register-mode': loginOrRegister === 'register' }">-->
    <!--      <div class="login-container">-->
    <!--        <div style="display: flex; flex-direction: column">-->
    <UserLogin
      style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
      v-if="loginOrRegister === 'login'"
      :login-form="loginForm"
      :loading="loading"
      @handle-login="onLogin"
      @on-switch="handleSwitch"
      class="login-content login-title"
    ></UserLogin>
    <UserRegister
      style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
      @on-switch="handleSwitch"
      @handle-register="onRegister"
      :login-form="loginForm"
      :loading-register="loadingRegister"
      v-else
      class="login-content login-title"
    ></UserRegister>
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<style scoped lang="scss">
// 定义 sass 变量
//$login-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//$login-gradient: #353d3d;
$register-gradient: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
$transition-duration: 0.3s;

.login-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden; /* 防止出现滚动条 */
  transition: all $transition-duration ease-in-out;

  // 默认登录状态
  &:not(.register-mode) {
    .login-container {
      //background-color: $login-gradient;
    }
  }

  // 注册状态
  &.register-mode {
    .login-container {
      //background-color: $register-gradient;
    }
  }
}

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  //background: $login-gradient;
  transition: background $transition-duration ease-in-out;
  padding: 1rem;
  box-sizing: border-box;

  // 注册状态的背景
  .register-mode & {
    background: $register-gradient;
  }
}

.login-register {
}

.login-content {
  background: rgba(255, 255, 255, 0.1);
  /* 毛玻璃效果 */
  backdrop-filter: blur(10px);
  /* 边框、阴影增加层次感 */
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  min-width: 300px;
  transform: translateY(0);
  transition: transform 0.3s ease-in-out;

  // 添加一个轻微的动画效果
  .register-mode & {
    transform: translateY(-5px);
  }
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

  // 在注册模式下改变按钮颜色
  .register-mode & {
    background: #f5576c;

    &:hover {
      background: #e14356;
    }
  }
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
