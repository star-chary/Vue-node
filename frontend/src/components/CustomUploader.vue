<script setup>
// 1. 文件列表：必须是响应式数据，用于 v-model 绑定
import api from '@/api'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  // 允许上传的图片最大数量
  limit: {
    type: Number,
    default: 1,
  },
})

const fileList = ref([])
// 2. 预览相关的状态
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const uploadRef = ref(null) // 获取组件实例

// 移除逻辑优化：让 el-upload 内部方法处理列表更新
const handleRemove = (file) => {
  // 关键：调用 el-upload 组件实例内部的 removeFile 方法，让它自动更新 fileList
  // 注意：这里的 file.uid 是 Element Plus 用来追踪文件的唯一 ID
  uploadRef.value.handleRemove(file)

  // 你的业务逻辑（例如：调用后端接口删除文件）：
}
const handleExceed = () => {
  ElMessage.warning(`只能上传${props.limit}张图片！`)
}

const loading = ref(false)
// 上传头像函数
const submitUpload = async () => {
  loading.value = true
  if (fileList.value.length === 0) return

  // 新建 formData表单
  const formData = new FormData()
  for (const file of fileList.value) {
    formData.append('files', file.raw)
  }

  // 发起头像上传接口
  try {
    const res = await api.topic.uploadAvatar(formData)
    if (res.data.code !== 200) return
    // 提示上传成功
    ElMessage({
      message: res.data.msg,
      type: 'success',
    })
    // 上传成功，清空数组
    fileList.value.length = 0
    loading.value = false
     router.go(0)
  } catch (e) {
    console.log(e, 88888)
    ElMessage({
      message: `${e}`,
      type: 'error',
    })
  }
}

</script>
<template>
  <template v-if="$slots.avatar">
    <slot name="avatar"></slot>
  </template>
  <el-upload
    v-model:file-list="fileList"
    action="#"
    :limit="limit"
    :auto-upload="false"
    list-type="picture-card"
    ref="uploadRef"
    :on-exceed="handleExceed"
  >
    <el-icon><Plus /></el-icon>
    <template #file="{ file }">
      <div class="uploaded-card-content">
        <img :src="file.url" class="el-upload-list__item-thumbnail" alt="" />

        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>
  <el-button v-if="fileList.length !== 0" @click="submitUpload" :disabled="loading"
    >上传头像</el-button
  >
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>
<style scoped>
.uploaded-card-content {
  width: 100%;
  text-align: center;
}
</style>
