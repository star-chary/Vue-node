import { createRouter, createWebHashHistory } from 'vue-router'
import { setupRouterGuards } from '@/router/guards.ts'
// login
import { loginRoutes } from '@/modules/loginAndLogout/router/index.js'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/modules/layout/pages/MainLayout.vue'),
      redirect: '/topicListCard',
      children: [
        {
          path: 'createTopic',
          name: 'createTopic',
          component: () => import('@/modules/topic/pages/TopicAdd.vue'),
        },
        {
          path: 'topicList',
          name: 'topicList',
          component: () => import('@/modules/topic/pages/TopicList.vue'),
        },
        {
          path: 'topicDetail/:id?',
          name: 'topicDetail',
          component: () => import('@/modules/topic/pages/TopicDetail.vue'),
        },
        {
          path: 'logout',
          name: 'logout',
          component: () => import('@/modules/logout/pages/Logout.vue'),
        },
        {
          path: 'modifyTopic/:id?',
          name: 'modifyTopic',
          component: () => import('@/modules/topic/pages/TopicModify.vue'),
        },
        {
          path: 'myPage',
          name: 'myPage',
          component: () => import('@/modules/topic/pages/MyPage.vue'),
        },
        {
          path: 'topicListCard/:id?',
          name: 'topicListCard',
          component: () => import('@/modules/topic/pages/TopicListCard.vue'),
        },
        {
          path: 'logger',
          name: 'logger',
          component: () => import('@/modules/topic/pages/Logger.vue'),
        },
      ],
    },
    ...loginRoutes,
  ],
})

// 设置路由守卫
setupRouterGuards(router)

export default router
