<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <el-menu router :default-active="route.path" class="el-menu-vertical-demo">
    <el-menu-item index="/createTopic">
      <span>新建主题</span>
    </el-menu-item>
    <el-menu-item index="/topicList"> <span>主题列表(table 类型)</span> </el-menu-item>
    <el-menu-item index="/topicListCard">
      <span>主题列表(card 类型)</span>
    </el-menu-item>
    <el-menu-item index="/topicDetail">
      <span>主题详情</span>
    </el-menu-item>
    <el-menu-item index="/modifyTopic">
      <span>修改主题</span>
    </el-menu-item>
    <el-menu-item index="/myPage">我的</el-menu-item>
    <el-menu-item index="/logout">
      <span>退出登录</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped></style>
