<script setup lang="ts">
import { useCreateTopic } from '@/views/createTopic.ts'

const { createTopic, formRef, form, rules } = useCreateTopic()
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
          :autosize="{ minRows: 3, maxRows: 20}"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button
      style="display: block; width: 400px; margin: 0 auto"
      @click="createTopic"
      type="primary"
      >提交</el-button
    >
  </div>
</template>

<style scoped>
.topic-container {
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 40px;
  box-sizing: border-box;
}
</style>
