import { createRouter, createWebHistory } from 'vue-router'
import {setupRouterGuards} from '@/router/guards.ts'
// login
import { loginRoutes } from '@/router/login/index.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/mainlayout',
      component: () => import('@/views/MainLayout.vue'),
      redirect:'/item1-1',
      children: [
        {
          path: '/item1-1',
          component: import('@/views/Item1-1.vue'),
        },
        {
          path: '/item2-1',
          component: import('@/views/Item2-1.vue'),
        },
      ],
    },
    ...loginRoutes,
  ],
})

// 设置路由守卫
setupRouterGuards(router)

export default router
