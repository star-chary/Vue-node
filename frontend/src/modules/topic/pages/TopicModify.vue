<script setup lang="ts">
// import { formatTime } from '@/utils/format.ts'
import { useRoute } from 'vue-router'
import { useTopicStore } from '@/modules/topic/stores/topic.ts'

const route = useRoute()

const { isEditing, formTopic, submitEdit } = useTopicStore()
</script>

<template>
  <div class="modify-topic">
    <!-- 固定头部 -->
    <div class="modify-topic__header">
      <div class="modify-topic__spacer"></div>
      <div class="modify-topic__breadcrumb">
        <router-link
          class="modify-topic__breadcrumb-link modify-topic__breadcrumb-link--gray"
          to="/mainlayout/topicList"
          >主题列表</router-link
        >/编辑
      </div>
      <div class="modify-topic__page-title">编辑主题</div>
    </div>

    <!-- 可滚动内容区域 -->
    <div class="modify-topic__content-wrapper">
      <div class="modify-topic__detail">
        <el-form>
          <!-- 主题信息 -->
          <div class="modify-topic__header-info">
            <div v-if="isEditing" class="modify-topic__title">
              <!--            {{ topicDetailData.title }}-->
              <el-form-item label="标题" prop="title">
                <el-input v-model="formTopic.title" clearable></el-input>
              </el-form-item>
            </div>
            <div class="modify-topic__time">
              <!--            {{ formatTime(topicDetailData.create_at) }}-->
            </div>
          </div>

          <!-- 主题内容 -->
          <div v-if="isEditing" class="modify-topic__content">
            <!--          <p>-->
            <!--                        {{ topicDetailData.content }}-->
            <!--          </p>-->
            <el-form-item label="内容" prop="content">
              <el-input
                v-model="formTopic.content"
                clearable
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 20 }"
              ></el-input>
            </el-form-item>
            <el-button @click="submitEdit(route.params.id)" type="primary" style="margin-top: 50px"
              >提交修改</el-button
            >
            <!-- 这里可以添加更多内容，比如图片、视频等 -->
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modify-topic {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: var(--bg-color);
  overflow: hidden; /* 防止整个容器滚动 */
}

.modify-topic__header {
  flex-shrink: 0; /* 固定头部，不参与滚动 */
  background-color: var(--bg-color);
  padding: 0 20px;
  box-sizing: border-box;
  color: var(--text-color);
}

.modify-topic__spacer {
  height: 50px;
}

.modify-topic__breadcrumb {
  padding-top: 10px;
  border-top: 1px solid #ccc;
  box-sizing: border-box;
}

.modify-topic__breadcrumb-link {
  text-decoration: none;

  &--gray {
    color: gray;

  }

  &--active {
    color: black;
  }
}

.modify-topic__page-title {
  height: 50px;
  font-size: 30px;
  margin: 20px 0;
  line-height: 50px;
}

.modify-topic__content-wrapper {
  flex: 1;
  overflow-y: auto; /* 只在内容区域启用滚动 */
  padding: 0 20px 20px;

  /* 自定义滚动条样式 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;

    &:hover {
      background: #a1a1a1;
    }
  }
}

.modify-topic__detail {
  background-color: var(--bg-color);
  min-height: calc(100% - 0px);
  border-radius: 8px;
  overflow: hidden;
  color: var(--text-color);
}

.modify-topic__header-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modify-topic__title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.modify-topic__time {
  color: #999;
  font-size: 14px;
}

.modify-topic__content {
  padding: 30px;
  line-height: 1.8;
  font-size: 16px;
  color: #333;
  background-color: var(--bg-color);

  p {
    margin: 0 0 20px 0;
    word-wrap: break-word;
  }
}
</style>
