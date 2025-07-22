import api from '@/api'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

interface TopicForm {
  title: string
  content: string
}

export const modifyTopic = () => {
  const route = useRoute()
  const router = useRouter()
  let formRef = ref<FormInstance>()

  // 是否处于编辑模式
  const isEditing = ref(false)

  // 原始数据（用于取消编辑时恢复）
  const originalData = ref<TopicForm>({
    title: '',
    content: ''
  })

  // 表单数据
  const form = ref<TopicForm>({
    title: '',
    content: ''
  })

  // 表单验证规则
  const rules = ref<FormRules<TopicForm>>({
    title: [
      { required: true, message: '请输入标题', trigger: 'blur' },
      { min: 1, max: 50, message: '标题长度在 1 到 50 个字符', trigger: 'blur' }
    ],
    content: [
      { required: true, message: '请输入内容', trigger: 'blur' },
      { min: 1, max: 10000, message: '内容长度在 1 到 10000 个字符', trigger: 'blur' }
    ]
  })

  // 获取主题详情
  const getTopicDetail = async () => {
    try {
      const topicId = route.params.id as string
      if (!topicId) return

      const res = await api.topic.getTopicDetail({ id: topicId })
      const data = res.data.data

      // 设置表单数据
      form.value = {
        title: data.title || '',
        content: data.content || ''
      }

      // 保存原始数据
      originalData.value = {
        title: data.title || '',
        content: data.content || ''
      }
    } catch (error) {
      console.error('获取主题详情失败:', error)
      ElMessage.error('获取主题详情失败')
    }
  }

  // 开始编辑
  const startEdit = () => {
    isEditing.value = true
  }

  // 取消编辑
  const cancelEdit = () => {
    // 恢复原始数据
    form.value = {
      title: originalData.value.title,
      content: originalData.value.content
    }
    isEditing.value = false

    // 清除表单验证状态
    formRef.value?.clearValidate()
  }

  // 保存修改
  const saveEdit = async () => {
    try {
      // 表单验证
      const isValid = await formRef.value?.validate()
      if (!isValid) return

      const topicId = route.params.id as string
      if (!topicId) return

      // 发送更新请求
      await api.topic.updateTopic({
        id: topicId,
        title: form.value.title,
        content: form.value.content
      })

      // 更新原始数据
      originalData.value = {
        title: form.value.title,
        content: form.value.content
      }

      isEditing.value = false
      ElMessage.success('修改成功')
    } catch (error) {
      console.error('保存失败:', error)
      ElMessage.error('保存失败')
    }
  }

  // 返回列表
  const goBack = () => {
    router.push('/mainlayout/topicList')
  }

  // 组件挂载时获取数据
  onMounted(() => {
    getTopicDetail()
  })

  return {
    form,
    rules,
    formRef,
    isEditing,
    startEdit,
    cancelEdit,
    saveEdit,
    goBack
  }
}
