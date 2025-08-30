<script setup lang="ts">
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
}
const props = defineProps<{ detailData: DetailProps }>()
const router = useRouter()
const emit = defineEmits<{
  (e: 'close'): void
}>()

const detailClose = (e?: KeyboardEvent | MouseEvent) => {
  // 键盘 Esc
  if (e instanceof KeyboardEvent) {
    if (e.key === 'Escape') {
      emit('close')
    }
    return
  }
  // 鼠标点击
  emit('close')
}

const base_img_url = import.meta.env.VITE_API_BASE_URL
onMounted(() => {
  window.addEventListener('keydown', detailClose)
})

onUnmounted(() => {
  window.removeEventListener('keydown', detailClose)
})
</script>

<template>
  <!-- 全屏遮罩：拦截滚动与点击 -->
  <div class="ndd-mask" @click.self="emit('close')" role="dialog" aria-modal="true">
    <!-- 居中面板：你的红色方块 -->
    <div class="node-detail-dialog">
      <div class="close" @click="emit('close')">
        <div>×</div>
      </div>
      <!-- 你可以在这里放详情内容 -->
      <div class="content">
        <div class="content-left">
          <div style="width: 100%; height: 100%; box-sizing: border-box">
            <el-carousel
              style="height: 100%; width: 100%"
              height="100%"
              motion-blur
              :autoplay="false"
            >
              <el-carousel-item v-for="item in detailData.images" :key="item._id">
                <div class="carousel-item">
                  <img :src="base_img_url + item.url" alt="" class="carousel-img" />
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="content-right">
          <div class="user-info">
            <div class="user-avatar-name">
              <div class="user-avatar"></div>
              <div class="user-name">用户名</div>
            </div>
            <div class="follow">关注</div>
          </div>
          <div class="right-scroll">
            <div class="detail-body" style="display: flex; flex-direction: column;padding: 10px 0 ">
              <div class="content-title" style="font-weight: bold;font-size: 18px ;margin-bottom: 4px;">{{ detailData.title }}</div>
              <div class="content-text">{{ detailData.content }}</div>
            </div>
            <div class="comment-box">开发中...</div>
          </div>
          <div class="comment-like">这里放发送评论输入框</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.close {
  width: 100px;
  height: 100%;
  opacity: 0.5;
  transform: translateX(-10px);

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    position: absolute;
    transform: translateX(50px);
    font-size: 20px;
    padding: 6px;
    background: rgba(64, 64, 64, 0.25);
    color: white;
    border-radius: 50%;
    cursor: pointer;
  }
}
/* 遮罩层覆盖全屏，阻止底部交互与滚动 */
.ndd-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 3000;
  /* 阻止滚动穿透的辅助属性（配合 body overflow hidden 更稳） */
  overscroll-behavior: contain;
}

/* 居中红色方块 */
.node-detail-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 70vw;
  height: 90%;
  transform: translate(-50%, -50%);
  display: flex;
}

.content {
  display: flex;
  width: 100%;
  height: 100%;
  /* 允许子项在交叉轴方向收缩，别卡住滚动 */
  min-height: 0;

  .content-left {
    width: 684px;
    height: 100%;

    .carousel-item {
      width: 100%;
      height: 100%;
      display: flex;
      background: #000; /* 让空白区域是黑色更像相册 */
      justify-content: center;
      align-items: center;
    }

    .carousel-img {
      width: 100%;
      height: 100%;
      object-fit: contain; /* 关键：完整显示 */
    }
  }

  .content-right {
    width: 45%;
    height: 100%;
    min-height: 0;
    background-color: white;
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    --sendbar-h: 60px;


    .user-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      flex: 0 0 auto;
      height: 8%;

      .user-avatar-name {
        display: flex;
        align-items: center;

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ccc;
          margin-right: 10px;
        }
      }
      .follow {
        width: 30%;
        height: 30px;
        color: white;
        background: #ff2e4d;
        border-radius: 15px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
      }
    }

    .right-scroll {
      flex: 1 1 auto;
      min-height: 0; /* 关键：允许内容区在父容器内收缩，触发滚动 */
      overflow-y: auto;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE/Edge legacy */
      -webkit-overflow-scrolling: touch; /* iOS 惯性滚动（可选） */
      padding-bottom: var(--sendbar-h);

    }
    .right-scroll::-webkit-scrollbar {
      /* Chrome/Safari/Edge */
      width: 0;
      height: 0;
      background: transparent;
    }

    .comment-box {
      width: 100%;
      flex: 1 1 auto;
      padding-top: 6px;
      margin-top: 6px;
      border-top: 1px solid #ccc;
    }

    /* 固定在底部的发送评论栏 */
    .comment-like {
      flex: 0 0 var(--sendbar-h);
      height: var(--sendbar-h);
      width: 100%;
      background: red; /* 这里改成你的输入栏样式 */
      box-shadow: 0 -4px 12px rgba(0,0,0,0.06);
      /* iOS 底部安全区（全面屏可选） */
      padding-bottom: env(safe-area-inset-bottom);
      box-sizing: border-box;
      /* 如果需要内部布局，建议用 display:flex; align-items:center; */
      display: flex;
      align-items: center;
      padding-left: 12px;
      padding-right: 12px;
    }

  }
}
</style>
