<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import api from '@/api'
import { authUtils } from '@/utils/auth.ts'
import type { UserInfo } from '@/types'

interface Image {
  url: string
  author_id: string
  filename: string
  height: number
  size: number
  width: number
  _id: string
}
interface DetailProps {
  images: Image[]
  like: number
  author_id: string
  _id: string
  title?: string
  content?: string
}

const props = defineProps<{ detailData: DetailProps }>()
const router = useRouter()
const route = useRoute()
const emit = defineEmits<{
  (e: 'close'): void
}>()

const detailClose = (e?: KeyboardEvent | MouseEvent) => {
  if (e instanceof KeyboardEvent) {
    if (e.key === 'Escape') {
      emit('close')
    }
    return
  }
  emit('close')
}

const base_img_url = import.meta.env.VITE_API_BASE_URL
function imgSrc(path: string) {
  try {
    return new URL(path, base_img_url).toString()
  } catch (e) {
    console.warn('构造图片 URL 失败:', { base_img_url, path, e })
    return path
  }
}

let _prevBodyOverflow = ''

// 评论内容
const comment_content = ref('')
const isFocus = ref(false)
const user_info = JSON.parse(authUtils.getUserInfo('userInfo') as string)

const submitComment = async () => {
  console.log(route, 999)
  // 如果输入框有内容
  if (comment_content.value.trim() !== '') {
    // 发起评论请求
    const res = await api.topic.sendComment({
      content: comment_content.value,
      postId: route.params.id,
      userId: user_info.id,
      userName: user_info.username,
      userAvatar: '',
      parentId: '',
      replyTo:'',

    })
    console.log(res, 111)
    comment_content.value = ''
    isFocus.value = false
  }
}
const cancelComment = () => {
  comment_content.value = ''
  isFocus.value = false
}

onMounted(() => {
  window.addEventListener('keydown', detailClose)
  _prevBodyOverflow = document.body.style.overflow || ''
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  window.removeEventListener('keydown', detailClose)
  document.body.style.overflow = _prevBodyOverflow
})
</script>

<template>
  <div class="ndd-mask" @click.self="emit('close')" role="dialog" aria-modal="true">
    <div class="node-detail-dialog" role="document">
      <div class="close" @click="emit('close')">×</div>

      <!-- 用户信息栏 -->
      <div class="user-info">
        <div class="user-avatar-name">
          <div class="user-avatar"></div>
          <div class="user-name">用户名</div>
        </div>
        <div class="follow">关注</div>
      </div>

      <!-- 内容区域 -->
      <div class="content">
        <!-- 左侧 图片区域（PC 显示，移动端整合到纵向流） -->
        <div class="content-left">
          <div
            style="
              height: 100%;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            <el-carousel style="width: 100%" motion-blur :autoplay="false">
              <el-carousel-item
                v-for="item in props.detailData.images"
                :key="item._id"
                :style="{ aspectRatio: `${item.width} / ${item.height} ` }"
              >
                <img
                  style="width: 100%; height: 100%"
                  :src="imgSrc(item.url)"
                  alt=""
                  class="carousel-img"
                />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>

        <!-- 右侧 详情（PC 独立滚动，移动端合并流式） -->
        <div class="content-right">
          <div class="right-scroll">
            <div class="detail-body">
              <div class="content-title">{{ props.detailData.title }}</div>
              <div class="content-text">{{ props.detailData.content }}</div>
            </div>
            <div class="comment-box">开发中...</div>
          </div>

          <!-- 评论输入框 -->
          <div class="comment-like">
            <div class="comment-input" style="display: flex; align-items: center">
              <el-input
                class="base-input"
                type="text"
                v-model="comment_content"
                placeholder="写评论..."
                @focus="isFocus = true"
              />
              <el-button
                v-if="isFocus"
                :style="{
                  borderRadius: '30%',
                  border: 'none',
                  padding: '14px 10px',
                  backgroundColor: '#ff2442',
                  color: 'white',
                  marginLeft: '10px',
                }"
                class="send-btn"
                @click="submitComment"
              >
                发送
              </el-button>
              <el-button
                v-if="isFocus"
                style="
                  border-radius: 30%;
                  padding: 14px 10px;
                  background-color: rgba(55, 55, 55, 0.86);
                  border: none;
                  color: white;
                "
                class="send-btn"
                @click="cancelComment"
              >
                取消
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* 遮罩层 */
.ndd-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

/* dialog */
.node-detail-dialog {
  position: relative;
  background: var(--bg-color);
  border-radius: 8px;
  overflow: hidden;
  width: 60vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
}

/* 关闭按钮 */
.close {
  display: none;
  position: absolute;
  top: 18px;
  right: 12px;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
}

/* 用户信息栏（PC 在右上，移动 sticky 顶部） */
.user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #333;
  background: var(--bg-color);
  z-index: 5;
}
.user-avatar-name {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color);
}
.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--text-color);
}
.follow {
  color: var(--text-color);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: #ff2442;
  margin-right: 20px;
}

/* 内容区：PC 左右布局 */
.content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.content-left {
  width: 60%;
  height: 100%;
  overflow: hidden; /* 防止图片溢出 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.carousel-item {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100%;
  width: 100%;
  background-color: yellow;
}
.carousel-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.content-right {
  width: 40%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #333;
}
.right-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  /* 隐藏滚动条 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}
.right-scroll::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}
.detail-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.content-title {
  font-weight: bold;
  font-size: 18px;
  color: var(--text-color);
}
.content-text {
  font-size: 14px;
  color: var(--text-color);
  line-height: 1.5;
}
.comment-box {
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}
.comment-like {
  border-top: 1px solid #333;
  padding: 10px;
  background: var(--bg-color);
  color: var(--text-color);
  font-size: 14px;
}
:deep(.base-input .el-input__wrapper) {
  box-shadow: none !important;
  background-color: rgba(50, 50, 50, 0.84) !important;
  border-radius: 6px;
}

/* ===== 移动端适配 ===== */
@media (max-width: 768px) {
  .node-detail-dialog {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
  .content {
    width: 100%;
    height: 100vh;
    background-color: var(--bg-color);
    color: var(--text-color);
    flex-direction: column;
    overflow-y: auto;
  }

  .content-text,
  .content-title {
    color: var(--text-color);
  }
  .close {
    display: flex;
    position: absolute;
    left: 12px;
    top: 12px;
    font-size: 24px;
    cursor: pointer;
    z-index: 10;
    color: var(--text-color);
  }
  .content-left {
    width: 100%;
    flex-shrink: 0; /* 防止被压缩 */
  }

  .content-right {
    width: 100%;
    border-left: none;
    color: var(--text-color);
    line-height: 1.5;
  }
  .user-info {
    position: sticky;
    top: 0;
    padding-left: 50px;
    background-color: var(--bg-color);
    color: var(--text-color);
    box-sizing: border-box;
  }
  .comment-like {
    width: 100%;
    height: 4vh;
    line-height: 4vh;
    position: fixed;
    bottom: 0;
    background-color: var(--bg-color);
    color: var(--text-color);
  }
}
</style>
