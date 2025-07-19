<script setup lang="ts">
import { authUtils } from '@/utils/auth.ts'
import api from '@/api'
import { onMounted, ref } from 'vue'
import { myPage } from '@/views/myPage.ts'

const topicData = ref([])

const { tableHead } = myPage()

onMounted(async () => {
  const res = await api.topic.getMyTopic()
  topicData.value = res.data.data.list
  console.log(res, 999999)
})
</script>

<template>
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
</template>

<style scoped>
.description {
  width: 100%;
  height: 100px;
}
.content-cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.5;
}
</style>
