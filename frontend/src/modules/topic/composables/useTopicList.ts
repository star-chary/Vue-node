import { ref, onMounted, provide, watch } from 'vue'
import api from '@/api'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { Row, Page } from '@/modules/topic/types/topic.ts'

export const useTopicList = () => {
  const router = useRouter()
  const tableData = ref<Row[]>([])
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
      label: '操作',
      prop: 'action',
      actions: [
        {
          label: '查看',
          prop: 'view',
        },
      ],
    },
  ])

  const inputData = ref('')
  const page = ref<Page>({
    page: 1,
    pageSize: 10,
    title: '',
  })
  const total = ref(0)
  // 获取列表
  const handleGetList = async () => {
    try {
      const res = await api.topic.getTopicList({
        page: page.value.page,
        pageSize: page.value.pageSize,
        title: page.value.title,
      })
      tableData.value = res.data.data.list
      total.value = res.data.data.total
    } catch (e) {
      console.log(e)
    }
  }


  // 分页操作
  const handleCurrentChange = async (currentPage: number) => {
    page.value.page = currentPage
    await handleGetList()
  }
  const handleSizeChange = async (size: number) => {
    page.value.pageSize = size
    await handleGetList()
  }

  // 查看
  const handleView = async (row: Row) => {
    try {
      router.push({ name: 'topicListCard', params: { id: row._id } })
    } catch (e) {
      console.log(e)
    }
  }

  // 搜索- 按钮
  const handleSearch = async (input: string) => {
    // 将搜索词写入分页查询参数，并重置到第一页
    page.value.title = input?.trim() ?? ''
    page.value.page = 1
    await handleGetList()
  }

  // 搜索 回车
  const handleSearchEnter = async (input: string) => {
    await handleSearch(input)
  }

  // 操作处理
  const handleAction = async (action: string, row: Row) => {
    if (action === 'view') {
      await handleView(row)
    }
  }

  watch(
    () => inputData.value,
    async (newVal, oldVal) => {
      if (newVal.length === 0) {
        // 清空搜索时同步清空查询条件并回到第一页
        page.value.title = ''
        page.value.page = 1
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
    page,
    handleView,
    total,
    handleSearch,
    handleAction,
    handleSizeChange,
    handleCurrentChange,
    handleSearchEnter,
  }
}
