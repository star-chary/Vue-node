import { ref, onMounted, reactive } from 'vue'
import type { Row, Page } from '@/modules/topic/types/topic.ts'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import api from '@/api'
import { useTopicStore } from '@/modules/topic/stores/topic.ts'

export const useMyPage = () => {
  const router = useRouter()
  const { toggleEditing, initFormForEdit } = useTopicStore()

  const topicData = ref([])
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
        {
          label: '编辑',
          prop: 'edit',
        },
      ],
    },
  ])

  const page = reactive<Page>({
    page: 1,
    pageSize: 10,
  })
  const total = ref(0)

  // 获取用户列表
  const handleGetList = async () => {
    const res = await api.topic.getMyTopic(page)
    topicData.value = res.data.data.list
    total.value = res.data.data.total
  }
  const handleSizeChange = async (size: number) => {
    page.pageSize = size
    await handleGetList()
  }
  const handleCurrentChange = async (currentPage: number) => {
    page.page = currentPage
    await handleGetList()
  }

  // 查看
  const handleView = async (row: Row) => {
    try {
      ElMessage.success('查看成功')
      router.push(`/topicDetail/${row._id}`)
    } catch (e) {
      console.log(e)
    }
  }
  // 删除
  const handleDelete = async (row: Row) => {
    try {
      const res = await api.topic.deleteTopic({ id: row._id })
      ElMessage.success('删除成功')
      await handleGetList()
    } catch (e) {
      console.log(e)
    }
  }
  // 编辑
  const handleEdit = async (row: Row) => {
    // 切换编辑状态
    toggleEditing()
    // 设置表单数据
    initFormForEdit({ title: row.title, content: row.content })
    // 跳转到编辑页面
    router.push(`/modifyTopic/${row._id}`)
  }

  // 操作处理
  const handleAction = async (action: string, row: Row) => {
    if (action === 'view') {
      await handleView(row)
    } else if (action === 'delete') {
      await handleDelete(row)
    } else if (action === 'edit') {
      await handleEdit(row)
    }
  }

  onMounted(async () => {
    await handleGetList()
  })

  return {
    topicData,
    tableHead,
    page,
    handleAction,
    handleSizeChange,
    handleCurrentChange,
    total,
  }
}
