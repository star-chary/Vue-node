import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import api from '@/api'

export const useTopicStore = defineStore('topic', () => {
  const formTopic = reactive({
    title: '',
    content: '',
  })
  // 是否为编辑状态
  const isEditing = ref(false)

  // 切换编辑状态
  const toggleEditing = () => {
    isEditing.value = !isEditing.value
  }
  // 初始化表单数据
  const initFormForEdit = (topicData: { title: string; content: string }) => {
    formTopic.title = topicData.title
    formTopic.content = topicData.content
  }
  //提交修改
  const submitEdit = async (id: string) => {
    // 发送修改请求
    const res = await api.topic.modifyTopic({
      id,
      ...formTopic,
    })
    console.log(res, 888)
    if (res.data.code === 200 || res.data.code === '200' || res.status === 200) {
      ElMessage.success('修改成功')
    }
  }
  return {
    isEditing,
    formTopic,
    toggleEditing,
    initFormForEdit,
    submitEdit,
  }
})
