<script setup>
import SideBar from '@/modules/layout/pages/SideBar.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isMobile = ref(false)
let mql
const handler = (e) => (isMobile.value = e.matches)

onMounted(() => {
  mql = window.matchMedia('(max-width: 768px)')
  isMobile.value = mql.matches
  mql.addEventListener('change', handler)
})

onBeforeUnmount(() => {
  mql?.removeEventListener('change', handler)
})

const menuList = [
  {
    title: '发布',
    to: '/createTopic',
  },
  {
    title: '发现（table）',
    to: '/topicList',
  },
  {
    title: '发现',
    to: '/topicListCard',
  },
  {
    title: '修改',
    to: '/modifyTopic',
  },
  {
    title: '日志',
    to: '/logger',
  },
  {
    title: '我',
    to: '/myPage',
  },
]
</script>

<template>
  <header style="width: 100vw; height: 6vh">
    <div id="menu-icon">
      <el-dropdown size="large" type="primary">
        <div style="font-size: 32px">
          <el-icon><Menu /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu style="background-color: var(--bg-color)">
            <el-dropdown-item v-for="item in menuList">
              <router-link style="color: var(--text-color); text-decoration: none" :to="item.to">{{
                item.title
              }}</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
  <div class="appContainer">
    <div class="sideBar" :style="{ width: isMobile ? '0' : '200px' }">
      <SideBar></SideBar>
    </div>
    <div class="rightBar">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.appContainer {
  width: 100%;
  height: calc(100vh - 6vh);
  overflow: hidden;
  display: flex;
}
header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: var(--bg-color);
}
#menu-icon {
  color: var(--text-color);
  cursor: pointer;
  margin-right: 10px;
  z-index: 1000;
}

:deep(.el-dropdown-menu__item:focus),
:deep(.el-dropdown-menu__item:not(.is-disabled):hover),
:deep(.el-dropdown-menu__item.is-active) {
  background-color: rgba(61, 59, 59, 0.8); /* 按需改成更暗/更亮的颜色 */
  color: var(--text-color);
}

.sideBar {
  width: 200px;
  transition: width 0.3s ease;
  background-color: white;
  overflow: hidden;
}

.rightBar {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
