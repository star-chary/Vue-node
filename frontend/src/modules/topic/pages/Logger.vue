<script setup lang="ts">
import api from '@/api'
import Table from '@/components/Table.vue'

const data = ref<any[]>([])
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)
const testApi = async () => {
  const res = await api.topic.getLogs({ page: page.value, pageSize: pageSize.value,all:true })
  data.value = res.data.data
  total.value = res.data.total
  console.log(res)
}
onMounted(async () => {
  await testApi()
})
</script>

<template>
  <Table :data="data">
    <template #default>开发中...</template>
  </Table>
</template>

<style scoped></style>
