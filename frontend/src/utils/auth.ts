const TOKEN_KEY = 'Accesstoken'

interface AuthUtils {
  getToken: () => string | null
  setToken: (token: string) => void
  removeToken: () => void
  isAuthenticated: () => boolean
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
}
