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
      <span>新建主题</span>
    </el-menu-item>
    <el-menu-item index="topicList" :route="{ name: 'topicList' }">
      <span>主题列表(table 类型)</span>
    </el-menu-item>
    <el-menu-item index="topicListCard" :route="{ name: 'topicListCard' }">
      <span>主题列表(card 类型)</span>
    </el-menu-item>
    <el-menu-item index="topicDetail" :route="{ name: 'topicDetail' }">
      <span>主题详情</span>
    </el-menu-item>
    <el-menu-item index="modifyTopic" :route="{ name: 'modifyTopic' }">
      <span>修改主题</span>
    </el-menu-item>
    <el-menu-item index="logger" :route="{ name: 'logger' }">
      <span>日志</span>
    </el-menu-item>
    <el-menu-item index="myPage" :route="{ name: 'myPage' }">
      我的
    </el-menu-item>
    <el-menu-item index="logout" :route="{ name: 'logout' }">
      <span>退出登录</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped></style>
