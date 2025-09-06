<script setup lang="ts">
import { useCreateTopic } from '@/modules/topic/composables/useTopicAdd.ts'

const {
  createTopic,
  formRef,
  form,
  rules,
  fileList,
  dialogImageUrl,
  dialogVisible,
  handlePictureCardPreview,
  handleRemove,
  uploadRef,
  isSubmitting
} = useCreateTopic()
</script>

<template>
  <div class="topic-container">
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item v-no-space label="标题" prop="title">
        <el-input v-model="form.title" clearable placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input
          v-no-space
          v-model="form.content"
          clearable
          type="textarea"
          placeholder="请输入内容"
          :autosize="{ minRows: 3, maxRows: 20 }"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-upload
      ref="uploadRef"
      v-model:file-list="fileList"
      :auto-upload="false"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
    <el-button
      style="display: block; width: 400px; margin: 0 auto"
      @click="createTopic(fileList)"
      type="primary"
      >{{ isSubmitting ? '提交中...' : '提交'}}</el-button
    >
  </div>
</template>

<style scoped>
.topic-container {
  width: 100%;
  height: 100%;
  background-color:var(--bg-color);
  padding: 40px;
  box-sizing: border-box;
}

.avatar-uploader .defaultImage {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

el-upload-list{
  width: 100%;
  height: 100%;
  background-color: red;
}
</style>
