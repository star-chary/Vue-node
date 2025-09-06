<script setup lang="ts">
import { formatISOTime } from '@/utils/format.ts'
import { getDeviceType } from '@/utils/getDeviceType.ts'

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

const columns = ref([
  {
    label: 'ip',
    prop: 'ip',
  },
  {
    label: '省份',
    prop: 'location.province',
  },
  {
    label: '城市',
    prop: 'location.city',
  },
  {
    label: '地区',
    prop: 'location.district',
  },
  {
    label: '时间',
    prop: 'time',
  },
  {
    label: '设备',
    prop: 'userAgent',
  },
])
</script>
<template>
  <div class="logger-box">
    <div class="slot-box">
      <slot></slot>
    </div>
    <div class="table-box">
      <el-table :data="data" height="100%" style="width: 100%">
        <el-table-column
          v-for="(item, index) in columns"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :show-overflow-tooltip="item.prop === 'content'"
        >
          <template v-if="item.prop === 'time'" #default="escope">
            {{ formatISOTime(escope.row.time) }}
          </template>
          <template v-if="item.prop === 'userAgent'" #default="escope">
            {{ getDeviceType(escope.row.userAgent) }}
          </template>
        </el-table-column>
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
  height: 30vh;
  background-color: white;
  margin-bottom: 16px;
}
.table-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70vh;
  background-color: white;
  overflow: auto;
}
</style>
