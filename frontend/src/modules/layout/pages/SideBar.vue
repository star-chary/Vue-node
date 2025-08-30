<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 用路由名称来作为菜单的高亮依据
const activeIndex = computed(() => String(route.name ?? ''))
</script>

<template>
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
    <el-menu-item index="logout" :route="{ name: 'logout' }">
      <el-icon><Close /></el-icon>
      <span>退出</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped></style>
