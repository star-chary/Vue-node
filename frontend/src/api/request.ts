// import axios,{AxiosRequestConfig,AxiosResponse} from 'axios'
// import type {ApiResponse} from '@/api/types/index.js'
import axios from 'axios'
import { authUtils } from '@/utils/auth.ts'

export const request = axios.create({
  baseURL: 'http://localhost:7001',
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 自动添加 token 到请求头
    const token = authUtils.getToken()
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // 处理错误
    // if (error.response.status === 401) {
    //   // 401 状态码，清除 token
    //   authUtils.removeToken()
    //   // 弹出提示
    //   // 跳转到登录页
    //   window.location.href = '/login';
    // }
    return Promise.reject(error)
  },
)
