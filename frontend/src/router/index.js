import { createRouter, createWebHistory } from 'vue-router'
import { setupRouterGuards } from '@/router/guards.ts'
// login
import { loginRoutes } from '@/router/login/index.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/mainlayout',
      component: () => import('@/views/MainLayout.vue'),
      redirect: '/mainlayout/createTopic',
      children: [
        {
          path: 'createTopic',
          name: 'createTopic',
          component: () => import('@/views/CreateTopic.vue'),
        },
        {
          path: 'topicList',
          name: 'topicList',
          component: () => import('@/views/TopicList.vue'),
        },
        {
          path: 'topicDetail/:id?',
          name: 'topicDetail',
          component: () => import('@/views/TopicDetail.vue'),
        },
        {
          path: 'logout',
          name: 'logout',
          component: () => import('@/views/Logout.vue'),
        },
        {
          path: 'modifyTopic/:id?',
          name: 'modifyTopic',
          component: () => import('@/views/ModifyTopic.vue'),
        },
        {
          path: 'myPage',
          name: 'myPage',
          component: () => import('@/views/MyPage.vue'),
        },
      ],
    },
    ...loginRoutes,
  ],
})

// 设置路由守卫
setupRouterGuards(router)

export default router
