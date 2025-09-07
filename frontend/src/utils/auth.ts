const TOKEN_KEY = 'Accesstoken'

interface AuthUtils {
  getToken: () => string | null
  setToken: (token: any) => void
  removeToken: (token_key?: string) => void
  isAuthenticated: () => boolean
  getUserInfo: (key: string) => string | null | object
  setUserInfo: (key: string, value: any) => void
  removeUserInfo: (key: string) => void
}

export const authUtils: AuthUtils = {
  // 获取 token
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY)
  },
  // 创建 token
  setToken: (token: string) => {
    return localStorage.setItem(TOKEN_KEY, token)
  },
  // 删除 token
  removeToken: () => {
    return localStorage.removeItem(TOKEN_KEY)
  },
  // 检查是否已登录
  isAuthenticated: () => {
    return !!authUtils.getToken()
  },
  // 获取用户信息
  getUserInfo: (key: string) => {
    return localStorage.getItem(key)
  },
  // 创建用户信息
  setUserInfo: (key: string, value: any) => {
    return localStorage.setItem(key, value)
  },
  // 删除用户信息
  removeUserInfo: (key: string) => {
    return localStorage.removeItem(key)
  },
}

// 退出登录
export const logout = async (): void => {
  authUtils.removeToken()
  authUtils.removeUserInfo('userInfo')
  window.location.href = '/login'
}
