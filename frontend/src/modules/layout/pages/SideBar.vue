<script setup lang="ts">
import { authUtils } from '@/utils/auth.ts'

const route = useRoute()
const router = useRouter()

// 用路由名称来作为菜单的高亮依据
const activeIndex = computed(() => String(route.name ?? ''))
// 退出登录
const handleLogout = () => {
  authUtils.removeToken()
  authUtils.removeUserInfo('userInfo')
  router.push('/login')
}
</script>

<template>
  <div class="sidebar">
    <el-menu router :default-active="activeIndex" class="el-menu-vertical-demo">
      <el-menu-item index="createTopic" :route="{ name: 'createTopic' }">
        <el-icon><Plus /></el-icon>
        <span>发布</span>
      </el-menu-item>
      <el-menu-item index="topicList" :route="{ name: 'topicList' }">
        <el-icon><House /></el-icon>
        <span>发现（table）</span>
      </el-menu-item>
      <el-menu-item index="topicListCard" :route="{ name: 'topicListCard' }">
        <el-icon><House /></el-icon>
        <span>发现</span>
      </el-menu-item>
      <!--    <el-menu-item index="topicDetail" :route="{ name: 'topicDetail' }">-->
      <!--      <span>主题详情</span>-->
      <!--    </el-menu-item>-->
      <el-menu-item index="modifyTopic" :route="{ name: 'modifyTopic' }">
        <el-icon><EditPen /></el-icon>
        <span>修改</span>
      </el-menu-item>
      <el-menu-item index="logger" :route="{ name: 'logger' }">
        <el-icon><Memo /></el-icon>
        <span>日志</span>
      </el-menu-item>
      <el-menu-item index="myPage" :route="{ name: 'myPage' }">
        <el-icon><User /></el-icon>
        我
      </el-menu-item>

    </el-menu>


    <el-popover
      placement="top"
      trigger="click"
      :width="'10vw'"
      transition="el-zoom-in-top"
      popper-class="more-popper"
    >
      <template #reference>
        <div class="more">
          <el-icon><More /></el-icon><span style="margin-left: 6px">更多</span>
        </div>
      </template>
      <div class="more-panel">
        <button class="more-item">切换主题</button>
        <button class="more-item" @click="handleLogout">退出登录</button>
      </div>
    </el-popover>
  </div>
</template>

<style scoped>
.sidebar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.more {
  margin: 30px 20px;
  color: #303133;
  font-size: 14px;
  cursor: pointer;
}

/* 弹层内容样式（宽度由 Popover 的 :width 控制，这里做内部排版） */
.more-panel {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.more-item {
  border-radius: 8px;
  border: 1px solid white;
  background: var(--el-fill-color-blank);
  color: var(--el-text-color-primary);
  cursor: pointer;
  margin: 4px 0;
  transition:
    background-color 180ms ease,
    transform 180ms ease;
}
.more-item:hover {
  background: var(--el-fill-color-lighter);
  transform: translateY(-1px);
}
</style>
