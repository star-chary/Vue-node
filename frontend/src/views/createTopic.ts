import api from '@/api/index.ts'
import { ref, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserInfoStore } from '@/stores/userInfo.ts'
import type { TopicForm } from '@/types/index.ts'
import { ElMessage } from 'element-plus'
import { authUtils } from '@/utils/auth.ts'

export const useCreateTopic = () => {
  let formRef = ref<FormInstance>()

  // 文章提交内容
  const form = ref<TopicForm>({
    title: '',
    content: '',
  })

  //表单验证
  const rules = ref<FormRules<TopicForm>>({
    title: [
      { required: true, message: '请输入标题', trigger: 'blur' },
      { min: 1, max: 20, message: '长度在 3 到 10 个字符', trigger: 'blur' },
    ],
    content: [
      { required: true, message: '请输入内容', trigger: 'blur' },
      { min: 1, max: 10000, message: '长度在 10 到 10000 个字符', trigger: 'blur' },
    ],
  })

  // 新建主题
  const createTopic = async () => {
    try {
      // 如果验证通过
      const isValid = await formRef.value?.validate()
      if (isValid) {
        const userInfo = JSON.parse(authUtils.getUserInfo('userInfo'))
        const id = userInfo.id
        // 发起新建主题请求
        const res = await api.topic.createTopic({
          title: form.value.title, // 标题
          content: form.value.content, // 内容
          author_id: id,
        })
        console.log(res, 8888)

        if (res.data.code === 200 || res.status === 200) {
          ElMessage.success('创建成功')
        }
      }

      // 情况内容
      formRef.value?.resetFields()
    } catch (e) {
      console.log(e)
    }
  }

  return {
    formRef,
    form,
    rules,
    createTopic,
  }
}
