<script setup lang="ts">
import { formatTime } from '@/utils/format.ts'
interface Columns {
  ip: String
  location: {
    // 位置信息
    province: String
    city: String
    district: String
  }
  userAgent: String // 浏览器信息
  browser: String // 解析出来的浏览器名
  os: String // 解析出来的操作系统
  path: String // 请求路径
  method: String // 请求方法
  time: Date
}
const props = defineProps({
  columns: Array,
  data: Array,
})

const time = 'time'
</script>
<template>
  <div class="logger-box">
    <div class="slot-box">
      <slot></slot>
    </div>
    <div class="table-box">
      <el-table :data="data" height="100%" style="width: 100%">
        <el-table-column prop="ip" label="ip" width="180" />
        <el-table-column prop="location.province" label="省份" width="0" />
        <el-table-column prop="location.city" label="城市" width="0" />
        <el-table-column prop="location.district" label="地区" width="0" />
      </el-table>
      <!--      <el-pagination-->
      <!--        style="margin-left: auto; padding: 16px 0"-->
      <!--        v-model:current-page="currentPage4"-->
      <!--        v-model:page-size="pageSize4"-->
      <!--        :page-sizes="[100, 200, 300, 400]"-->
      <!--        :size="size"-->
      <!--        :disabled="disabled"-->
      <!--        :background="background"-->
      <!--        layout="total, sizes, prev, pager, next, jumper"-->
      <!--        :total="400"-->
      <!--        @size-change="handleSizeChange"-->
      <!--        @current-change="handleCurrentChange"-->
      <!--      />-->
    </div>
  </div>
</template>
<style scoped lang="scss">
.logger-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 20px;
  background-color: gray;
  box-sizing: border-box;
}

.slot-box {
  width: 100%;
  height: 50vh;
  background-color: white;
  margin-bottom: 16px;
}
.table-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50vh;
  background-color: white;
  overflow: auto;
}
</style>
