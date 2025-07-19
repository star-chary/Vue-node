<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useTopicDetail } from '@/views/topicDetail.ts'
import { formatTime } from '@/utils/format.ts'

const { topicDetailData } = useTopicDetail()

const route = useRoute()
</script>

<template>
  <div class="detail-container">
    <!-- 固定头部 -->
    <div class="detail-header">
      <div style="height: 50px"></div>
      <div class="link_router">
        <router-link style="text-decoration: none; color: gray" to="/mainlayout/topicList"
          >主题列表</router-link
        >/<router-link style="text-decoration: none; color: black" :to="route.name"
          >主题详情</router-link
        >
      </div>
      <div class="page-title">主题详情</div>
    </div>

    <!-- 可滚动内容区域 -->
    <div class="detail-content-wrapper">
      <div class="detail">
        <!-- 主题信息 -->
        <div class="detail-header-info">
          <div class="detail-title">
            {{ topicDetailData.title }}
          </div>
          <div class="detail-time">{{ formatTime(topicDetailData.create_at) }}</div>
        </div>

        <!-- 主题内容 -->
        <div class="detail-content">
          <p>{{ topicDetailData.content }}</p>
          <!-- 这里可以添加更多内容，比如图片、视频等 -->
        </div>

        <div v-if="route.params.id">
          <!-- 评论区 -->
          <div class="detail-comments">
            <div class="comments-header">
              <h3>评论区</h3>
            </div>

            <!-- 评论输入框 -->
            <div class="comment-input">
              <el-input
                type="textarea"
                placeholder="发表你的评论..."
                :autosize="{ minRows: 3, maxRows: 6 }"
              />
              <div class="comment-actions">
                <el-button type="primary" style="margin-top: 10px">发表评论</el-button>
              </div>
            </div>

            <!-- 评论列表 -->
            <div class="comments-list">
              <!-- 模拟评论数据 -->
              <div class="comment-item" v-for="i in 10" :key="i">
                <div class="comment-avatar">
                  <el-avatar>用户{{ i }}</el-avatar>
                </div>
                <div class="comment-content">
                  <div class="comment-user">用户{{ i }}</div>
                  <div class="comment-text">
                    这是第{{ i }}条评论内容。这里可以写很长的评论内容，用来测试滚动效果。 Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </div>
                  <div class="comment-time">{{ i }}分钟前</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.detail-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: rgba(240, 240, 240, 0.8);
  overflow: hidden; /* 防止整个容器滚动 */

  .detail-header {
    flex-shrink: 0; /* 固定头部，不参与滚动 */
    background-color: white;
    padding: 0 20px;
    box-sizing: border-box;

    .link_router {
      padding-top: 10px;
      border-top: 1px solid #ccc;
      box-sizing: border-box;
    }

    .page-title {
      height: 50px;
      font-size: 30px;
      margin: 20px 0;
      line-height: 50px;
    }
  }

  .detail-content-wrapper {
    flex: 1;
    overflow-y: auto; /* 只在内容区域启用滚动 */
    padding: 0 20px 20px;

    .detail {
      background-color: white;
      border-radius: 8px;
      overflow:auto;
      height: 100%;

      .detail-header-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #eee;

        .detail-title {
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }

        .detail-time {
          color: #999;
          font-size: 14px;
        }
      }

      .detail-content {
        padding: 30px;
        line-height: 1.8;
        font-size: 16px;
        color: #333;

        p {
          margin: 0 0 20px 0;
          word-wrap: break-word;
        }
      }

      .detail-comments {
        border-top: 1px solid #eee;

        .comments-header {
          padding: 20px 30px 10px;
          border-bottom: 1px solid #f5f5f5;

          h3 {
            margin: 0;
            font-size: 18px;
            color: #333;
          }
        }

        .comment-input {
          padding: 20px 30px;
          border-bottom: 1px solid #f5f5f5;

          .comment-actions {
            display: flex;
            justify-content: flex-end;
          }
        }

        .comments-list {
          padding: 20px 30px;

          .comment-item {
            display: flex;
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #f5f5f5;

            &:last-child {
              border-bottom: none;
              margin-bottom: 0;
            }

            .comment-avatar {
              flex-shrink: 0;
              margin-right: 15px;
            }

            .comment-content {
              flex: 1;

              .comment-user {
                font-weight: bold;
                color: #333;
                margin-bottom: 5px;
              }

              .comment-text {
                color: #666;
                line-height: 1.6;
                margin-bottom: 5px;
              }

              .comment-time {
                color: #999;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
}

/* 自定义滚动条样式 */
.detail-content-wrapper::-webkit-scrollbar {
  width: 6px;
}

.detail-content-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.detail-content-wrapper::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.detail-content-wrapper::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>
