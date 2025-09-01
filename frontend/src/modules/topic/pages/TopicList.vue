<script setup lang="ts">
import { useTopicList } from '@/modules/topic/composables/useTopicList.ts'

const {
  tableData,
  tableHead,
  handleAction,
  handleSearch,
  inputData,
  page,
  total,
  handleSizeChange,
  handleCurrentChange,
  handleSearchEnter
} = useTopicList()
</script>

<template>
  <div class="list-container">
    <div style="height: 50px"></div>
    <div class="title">主题列表</div>
    <div class="list-table">
      <div class="table-container">
        <div class="search-bar">
          <el-input
            style="height: 50px"
            v-no-space
            v-model="inputData"
            clearable
            placeholder="请输入查询文章"
            @keyup.enter="handleSearchEnter(inputData)"
          >
            <template #append>
              <el-button @click="handleSearch(inputData)">搜索</el-button>
            </template>
          </el-input>
        </div>
        <div class="table-list">
          <el-table :data="tableData" style="width: 100%" height="100%" :scroll-y="true">
            <el-table-column type="index" width="50" />
            <el-table-column
              v-for="item in tableHead"
              :key="item._id"
              :prop="item.prop"
              :label="item.label"
              :show-overflow-tooltip="item.prop === 'content'"
            >
              <template v-if="item.prop === 'action'" #default="escope">
                <el-button
                  v-for="(action, index) in item.actions"
                  :key="index"
                  link
                  size="default"
                  @click="handleAction(action.prop, escope.row)"
                  >{{ action.label }}</el-button
                >
              </template>
              <template v-else-if="item.prop === 'content'" #default="escope">
                <div class="content-cell">{{ escope.row.content }}</div>
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
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh; /* 使用视口高度 */
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;

  .title {
    width: 100%;
    height: 80px;
    line-height: 80px;
    font-size: 30px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    flex-shrink: 0; /* 防止标题被压缩*/
  }

  .list-table {
    flex: 1;
    background-color: rgb(240, 240, 240);
    padding: 30px;
    overflow: hidden; /* 防止溢出 */

    .table-container {
      width: 100%;
      height: 100%;
      background-color: white;
      display: flex;
      flex-direction: column;

      .search-bar {
        width: 100%;
        height: 100px;
        padding: 20px;
        box-sizing: border-box;
        flex-shrink: 0; /* 防止搜索栏被压缩 */
      }

      .table-list {
        flex: 1;
        overflow: hidden; /* 让表格内部处理滚动 */

        // 自定义表格内容样式
        :deep(.el-table__body-wrapper) {
          overflow-y: auto !important;
        }

        // 内容单元格样式
        .content-cell {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 1.5;
        }
      }
    }
  }
}

// 全局样式，限制表格单元格高度
:deep(.el-table td) {
  max-height: 100px !important;
  overflow: hidden !important;
}

:deep(.el-table__cell) {
  max-height: 60px !important;
  overflow: hidden !important;
}
</style>
