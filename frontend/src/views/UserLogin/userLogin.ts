import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import {request} from '@/api/request'
// 定义登录表单的类型
interface LoginForm {
  username: string
  password: string
}

export const userLogin = () => {
  const router = useRouter()

  const loginForm = reactive<LoginForm>({
    username: '',
    password: '',
  })

  // 登录
  const handleLogin = () => {
    // router.push('/mainlayout')
    request.get('/').then((res) => {
      console.log(res, 888)
    })
  }

  return {
    handleLogin,
    loginForm,
  }
}
