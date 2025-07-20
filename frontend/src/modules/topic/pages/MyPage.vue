<script setup lang="ts">
import { authUtils } from '@/utils/auth.ts'
import { useMyPage } from '@/modules/topic/composables/myPage.ts'

const { tableHead, topicData, handleAction } = useMyPage()
</script>
<template>
  <div class="myPage-container">
    <el-descriptions class="description" title="User Info">
      <el-descriptions-item label="用户名">{{
        JSON.parse(authUtils.getUserInfo('userInfo')).username
      }}</el-descriptions-item>
      <el-descriptions-item label="ID">{{
        JSON.parse(authUtils.getUserInfo('userInfo')).id
      }}</el-descriptions-item>
      <el-descriptions-item label="登录状态">
        <el-tag size="small">{{ authUtils.isAuthenticated() }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <div class="table-container">
      <el-table :data="topicData" style="width: 100%">
        <el-table-column
          v-for="(item, index) in tableHead"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :show-overflow-tooltip="item.prop === 'content'"
        >
          <template v-if="item.prop === 'action'" #default="escope">
            <el-button
              @click="handleAction(action.prop, escope.row)"
              size="default"
              v-for="(action, index) in item.actions"
              link
              :key="index"
              >{{ action.label }}</el-button
            >
          </template>
          <template v-else-if="item.prop === 'content'" #default="escope">
            <div class="content-cell">
              {{ escope.row.content }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
.myPage-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh; /* 使用视口高度 */
  overflow: hidden; /* 防止整个页面滚动 */
  box-sizing: border-box;
  padding: 20px;
}

.description {
  flex-shrink: 0; /* 防止描述区域被压缩 */
  width: 100%;
  height: auto; /* 改为自适应高度 */
  min-height: 100px;
  margin-bottom: 20px;
}

.table-container {
  flex: 1; /* 占用剩余空间 */
  overflow-y: auto; /* 允许垂直滚动 - 关键修改！ */
  min-height: 0; /* 重要：允许flex项目缩小 */

  /* 自定义滚动条样式（可选） */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;

    &:hover {
      background: #a1a1a1;
    }
  }
}

.content-cell {
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.5;
  overflow: hidden;
}

/* 移除表格的固定高度设置，让它自然适应内容 */
.table-container .el-table {
  width: 100%;
}
</style>
