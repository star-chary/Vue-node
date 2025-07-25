import { createRouter, createWebHistory } from 'vue-router'
import { setupRouterGuards } from '@/router/guards.ts'
// login
import { loginRoutes } from '@/modules/loginAndLogout/router/index.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/mainlayout',
      component: () => import('@/modules/layout/pages/MainLayout.vue'),
      redirect: '/mainlayout/createTopic',
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
          path: 'topicList_card',
          name: 'topicList_card',
          component: () => import('@/modules/topic/pages/TopicList_Card.vue'),
        },
      ],
    },
    ...loginRoutes,
  ],
})

// 设置路由守卫
setupRouterGuards(router)

export default router
