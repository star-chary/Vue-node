import { ref, onMounted, provide, watch } from 'vue'
import api from '@/api'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export const useTopicList = () => {
  const router = useRouter()
  const tableData = ref([])
  const tableHead = ref([
    {
      label: '标题',
      prop: 'title',
    },
    {
      label: '内容',
      prop: 'content',
    },
    {
      label: '回复数',
      prop: 'reply_count',
    },
    {
      label: '操作',
      prop: 'action',
      actions: [
        {
          label: '查看',
          prop: 'view',
        },
        {
          label: '删除',
          prop: 'delete',
        },
      ],
    },
  ])

  const inputData = ref('')
  // 获取列表
  const handleGetList = async () => {
    try {
      const res = await api.topic.getTopicList()
      tableData.value = res.data.data.list
    } catch (e) {
      console.log(e)
    }
  }

  // 查看
  const handleView = async (row) => {
    try {
      ElMessage.success('查看成功')
      router.push(`/mainlayout/topicDetail/${row._id}`)
    } catch (e) {
      console.log(e)
    }
  }

  // 搜索
  const handleSearch = async (input: string) => {
    const res = await api.topic.getTopicList({
      title: input,
    })
    tableData.value = res.data.data.list
  }

  // 删除
  const handleDelete = async (row) => {
    try {
      const res = await api.topic.deleteTopic({ id: row._id })
      ElMessage.success('删除成功')
      console.log(res, 7777)
      await handleGetList()
    } catch (e) {
      console.log(e)
    }
  }

  const handleAction = async (action, row) => {
    if (action === 'view') {
      await handleView(row)
    } else if (action === 'delete') {
      await handleDelete(row)
    }
  }

  watch(
    () => inputData.value,
    async (newVal, oldVal) => {
      if (newVal.length === 0) {
        await handleGetList()
      }
    },
  )

  onMounted(async () => {
    await handleGetList()
  })

  return {
    tableData,
    tableHead,
    inputData,
    handleView,
    handleSearch,
    handleDelete,
    handleAction,
  }
}
