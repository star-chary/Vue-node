import type { Router } from 'vue-router'
import { authUtils } from '@/utils/auth.ts'

// 白名单，不需要登录就能访问的页面
const WHITE_LIST = ['/login']

export function setupRouterGuards(router: Router) {
  router.beforeEach((to, from, next) => {
    // 是否登录
    const isAuthenticated = authUtils.isAuthenticated()

    // 如果已经登录，且访问登录页，则重定向首页
    if (isAuthenticated && to.path === '/login') {
      next('/mainlayout')
      return
    } else if (isAuthenticated && to.path === '/') {
      next('/mainlayout')
      return
    }

    // 如果去往页面在白名单内，直接放行
    if (WHITE_LIST.includes(to.path)) {
      next()
      return
    }

    // 如果未登录
    if (!isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }, // 保存原来要访问的页面
      })
      return
    }

    // 其他情况，直接放行
    next()
  })
}
