<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <el-menu router :default-active="route.path" class="el-menu-vertical-demo">
    <el-menu-item index="/mainlayout/createTopic">
      <span>新建主题</span>
    </el-menu-item>
    <el-menu-item index="/mainlayout/topicList">
      <span>主题列表</span>
    </el-menu-item>
    <el-menu-item index="/mainlayout/topicDetail">
      <span>主题详情</span>
    </el-menu-item>
    <el-menu-item index="/mainlayout/logout">
      <span>退出登录</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped></style>
