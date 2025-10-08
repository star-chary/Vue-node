import type { LoginData } from '@/modules/loginAndLogout/types'
import { request } from '@/api/request'

// 用户相关 api
export const userApi = {
  // 用户注册
  registerUser: (data: LoginData) => {
    return request({
      url: '/register',
      method: 'post',
      data,
    })
  },
  // 用户登录
  loginUser: (data: LoginData) => {
    return request({
      url: '/login',
      method: 'post',
      data,
    })
  },
  // 获取用户信息
  getUserInfo: () => {
    return request({
      url: '/api/user/profile',
      method: 'get',
    })
  },
}
