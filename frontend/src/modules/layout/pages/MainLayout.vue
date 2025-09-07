<script setup>
import SideBar from '@/modules/layout/pages/SideBar.vue'
import ThemeSwitch from '@/components/ThemeSwitch.vue'
import { logout } from '@/utils/auth.ts'
const isMobile = ref(false)
let mql
// const handler = (e) => {
//   isMobile.value = e.matches
//   // 如果不是移动端，让头部菜单消失
//   if (!isMobile.value) {
//     // PC 端
//     const header = document.querySelector('header')
//     header.style.display = 'none'
//   } else {
//     // 移动端
//     const header = document.querySelector('header')
//     header.style.display = 'flex'
//   }
// }

// 退出登录
const handleLogout = () => {
  logout()
}
onMounted(() => {
  mql = window.matchMedia('(max-width: 768px)')
  // 首次进入就同步一次，避免状态不同步
  isMobile.value = mql.matches
  // 监听后续窗口变化
  const handler = (e) => (isMobile.value = e.matches)
  mql.addEventListener('change', handler)
  // 卸载
  onBeforeUnmount(() => {
    mql?.removeEventListener('change', handler)
  })
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
  <header v-show="isMobile" style="width: 100vw; height: 6vh">
    <div id="menu-icon">
      <el-dropdown size="large" type="primary">
        <div style="font-size: 32px">
          <el-icon><Menu /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu style="background-color: var(--bg-color)">
            <el-dropdown-item v-for="item in menuList">
              <router-link
                style="width: 100%; height: 100%; color: var(--text-color); text-decoration: none"
                :to="item.to"
                >{{ item.title }}</router-link
              >
            </el-dropdown-item>
            <el-dropdown-item><ThemeSwitch></ThemeSwitch></el-dropdown-item>
            <el-dropdown-item style="width: 100%; height: 100%" @click="handleLogout"
              >退出登录</el-dropdown-item
            >
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
header {
  display: none;
  justify-content: flex-end;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: var(--bg-color);
}

@media (max-width: 768px) {
  header {
    display: flex; /* 移动端显示 */
  }

  .appContainer {
    height: calc(100vh - 6vh);
  }
}

.appContainer {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
}
#menu-icon {
  color: var(--text-color);
  cursor: pointer;
  margin-right: 4vw;
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
