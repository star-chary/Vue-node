<script setup lang="ts">
import { authUtils } from '@/utils/auth.ts'
import { useMyPage } from '@/modules/topic/composables/myPage.ts'
import CustomUploader from '@/components/CustomUploader.vue'
const { tableHead, topicData, handleAction, page, handleCurrentChange, handleSizeChange, total } =
  useMyPage()

// 使用 ref 绑定一个字符串，表示头像 URL
const userAvatar = ref('')
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
    <div>
      <CustomUploader
        v-model="userAvatar"
        upload-url="/api/user/upload-avatar"
        file-key="avatar"
        upload-button-text="保存新头像"
        limit="1"
        :extra-data="{ userId: 1001 }"
      >
        <template #avatar><div class="change-avatar">更换头像：</div></template>
      </CustomUploader>
    </div>
    <div class="table-container">
      <el-table :data="topicData" style="width: 100%">
        <el-table-column
          v-for="(item, index) in tableHead"
          :key="index"
          :prop="item.prop"
          :label="item.label"
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
    <el-pagination
      v-model:page-size="page.pageSize"
      v-model:current-page="page.page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total="total"
    />
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
  background-color: var(--bg-color);
}

.description {
  flex-shrink: 0; /* 防止描述区域被压缩 */
  width: 100%;
  height: auto; /* 改为自适应高度 */
  min-height: 100px;
  margin-bottom: 20px;
}

.change-avatar {
  color: var(--text-color);
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
    background: var(--bg-color);
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
