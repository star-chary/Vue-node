import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useUserInfoStore = defineStore('userInfo', () => {
  // 用户信息
  const userInfo = reactive({
    username: '',
    id: '',
  })
  // 用户登录状态
  const isLogin = ref(false)

  const setUserInfo = (data: object) => {
    userInfo.username = data.username
    userInfo.id = data.id
  }
  // 从后端获取用户信息
  const getUserInfo = () => {}

  return {
    userInfo,
    setUserInfo,
  }
})
