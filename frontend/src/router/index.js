import { createRouter, createWebHistory } from 'vue-router'
// login
import { loginRoutes } from '@/router/login/index.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/mainlayout',
      component: () => import('@/views/MainLayout.vue'),
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

export default router
