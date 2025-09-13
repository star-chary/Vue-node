<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

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
      <div class="close" @click="emit('close')">
        <div>×</div>
      </div>

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
          <el-carousel
            style="height: 100%; width: 100%"
            height="100%"
            motion-blur
            :autoplay="false"
          >
            <el-carousel-item v-for="item in props.detailData.images" :key="item._id">
              <div class="carousel-item">
                <img :src="imgSrc(item.url)" alt="" class="carousel-img" />
              </div>
            </el-carousel-item>
          </el-carousel>
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
          <div class="comment-like">这里放发送评论输入框</div>
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
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  width: 90%;
  height: 90%;
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
  border-bottom: 1px solid #eee;
  background: #fff;
  z-index: 5;
}
.user-avatar-name {
  display: flex;
  align-items: center;
  gap: 8px;
}
.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #ccc;
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
  flex: 1;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.carousel-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.content-right {
  width: 400px;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #eee;
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
}
.content-text {
  font-size: 14px;
  color: #333;
}
.comment-box {
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}
.comment-like {
  border-top: 1px solid #eee;
  padding: 10px;
  background: #fff;
}

/* ===== 移动端适配 ===== */
@media (max-width: 768px) {
  .node-detail-dialog {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
  .content {
    flex-direction: column;
    overflow-y: auto;
  }
  .close {
    display: flex;
    position: absolute;
    left: 12px;
    top: 12px;
    font-size: 24px;
    cursor: pointer;
    z-index: 10;
  }
  .content-left {
    width: 100%;
    height: auto;
    background: #fff;
  }
  .content-right {
    width: 100%;
    border-left: none;
  }
  .user-info {
    position: sticky;
    top: 0;
    margin-left: 40px;
  }
  .comment-like {
    position: sticky;
    bottom: 0;
  }
}
</style>
