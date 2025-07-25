import api from '@/api'
import type { FormInstance, FormRules } from 'element-plus'
import type { TopicForm } from '@/types'
import { ElMessage } from 'element-plus'
import { authUtils } from '@/utils/auth.ts'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { ElUpload } from 'element-plus'

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
      { min: 1, max: 40, message: '长度在 3 到 40 个字符', trigger: 'blur' },
    ],
    content: [
      { required: true, message: '请输入内容', trigger: 'blur' },
      { min: 1, max: 10000, message: '长度在 10 到 10000 个字符', trigger: 'blur' },
    ],
  })

  // 新建主题
  const fileList = ref<UploadUserFile[]>([])
  const dialogImageUrl = ref('')
  const dialogVisible = ref(false)
  const uploadRef = ref<InstanceType<typeof ElUpload>>()
  // 移除文件
  const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
  }
  // 上传文件
  const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
  }
  const createTopic = async (fileList: UploadUserFile[]) => {
    try {
      // 如果没有上传图片
      if (fileList.length === 0) {
        ElMessage.error('请上传图片')
        return
      }
      // 如果验证通过
      const isValid = await formRef.value?.validate()
      if (isValid) {
        // 获取用户信息 - 添加空值检查
        const userInfoStr = authUtils.getUserInfo('userInfo')
        if (!userInfoStr) {
          ElMessage.error('用户信息获取失败')
          return
        }
        const userInfo = JSON.parse(userInfoStr)
        const id = userInfo.id

        const formData = new FormData()
        formData.append('title', form.value.title)
        formData.append('content', form.value.content)
        for (const file of fileList) {
          // 如果有文件
          if (fileList.length > 0) {
            formData.append('files', file.raw)
          }
          // 如果没有文件
          else {
            formData.append('files', '')
          }
        }

        // 发起新建主题请求
        const res = await api.topic.createTopic(formData)
        console.log(res, 8888)

        if (res.data.code === 200 || res.status === 200) {
          ElMessage.success('创建成功')
          uploadRef.value?.clearFiles() // ✅ 清除 el-upload 内部缓存
        }
      }

      // 清空内容
      formRef.value?.resetFields()
      // handleRemove()
    } catch (e) {
      console.log(e)
    }
  }

  return {
    formRef,
    form,
    rules,
    fileList,
    dialogImageUrl,
    dialogVisible,
    uploadRef,
    createTopic,
    handleRemove,
    handlePictureCardPreview,
  }
}
