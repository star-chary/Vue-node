import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'
import { authUtils } from '@/utils/auth.ts'
import { ElMessage } from 'element-plus'
import { useUserInfoStore } from '@/stores/userInfo.ts'

// 定义登录表单的类型
interface LoginForm {
  username: string
  password: string
}

export const userLogin = () => {
  const router = useRouter()

  // 用户名和密码
  const loginForm = reactive<LoginForm>({
    username: '',
    password: '',
  })

  // 控制登录/注册的显示与隐藏
  const loginOrRegister = ref('login')
  const loginOrRegisterFn = (data: string) => {
    loginOrRegister.value = data
  }

  const clearFn = () => {
    loginForm.username = ''
    loginForm.password = ''
  }

  // 登录
  const handleLogin = async (loginData: LoginForm) => {
    try {
      const res = await api.user.loginUser({
        username: loginData.username,
        password: loginData.password,
      })
      console.log(res, 66666)
      if (res.data.code === 200) {
        // 将 接收到的 token 存入本地
        authUtils.setToken(res.data.data.token)
        // 将用户信息存入本地
        authUtils.setUserInfo('userInfo', JSON.stringify(res.data.data.userInfo))
        // 跳转到主页
        router.push('/topicList')
      }
    } catch (e) {
      console.log(e)
    }
    // 清空账号密码
    clearFn()
  }

  // 点击注册
  const handleRegister = async (data: LoginForm) => {
    try {
      const res = await api.user.registerUser({
        username: loginForm.username,
        password: loginForm.password,
      })
      ElMessage.success('注册成功')
      loginOrRegisterFn('login')
    } catch (e) {
      console.log(e)
    }
    clearFn()
  }

  // 退出登录
  const handleLogout = () => {
    authUtils.removeToken()
    authUtils.removeUserInfo('userInfo')
  }

  return {
    handleLogin,
    loginForm,
    loginOrRegister,
    handleRegister,
    loginOrRegisterFn,
    handleLogout,
  }
}
