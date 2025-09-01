<script setup lang="ts">
const props = defineProps({
  // 标题
  title: {
    type: String,
    default: '默认标题',
  },
  // 用户名
  username: {
    type: String,
    default: '默认用户名',
  },
  // 显示图片
  cover_img: {
    type: String,
    default: '',
  },
  imageWidth: {
    type: Number,
    default: 260,
  },
  imageHeight: {
    type: Number,
    default: 260,
  },
  // 文章 ID
  id: {
    type: String,
    default: '',
  },
})
// 搭配 Ts 使用纯类型标注来声明触发的事件
const emit = defineEmits<{
  (e: 'openDetail', id: string): void
}>()

const router = useRouter()
// const base_img_url = 'http://localhost:7001'
// const base_img_url = 'http://1.92.114.63:7001'
const base_img_url = import.meta.env.VITE_API_BASE_URL
const url = computed(() => {
  return `${base_img_url}${props.cover_img}`
})

// 计算卡片图片区域的高度
const cardWidth = 260 // 固定卡片宽度
const calculateImageHeight = computed(() => {
  if (props.imageWidth && props.imageHeight) {
    // 根据原图比例计算显示高度
    const aspectRatio = props.imageHeight / props.imageWidth
    return Math.round(cardWidth * aspectRatio)
  }
  return 260 // 默认高度
})

// 进入详情页
const intoDetail = (id: string) => {
  console.log(id, 123)
  router.push({ name: 'topicListCard', query: { id } })
  emit('openDetail', id)
}
</script>

<template>
  <div class="card-box">
    <div
      class="defaultImage"
      @click="intoDetail(id)"
      :style="{ height: `${calculateImageHeight}px` }"
    >
      <img
        :src="url ? url : '/uploads/2025-08-17/1755438890765-0-sky.jpg'"
        alt=""
        loading="lazy"
        decoding="async"
      />
      <div class="hover-overlay"></div>
    </div>
    <div class="title">{{ title }}</div>
    <div class="user-info">
      <div class="user-avatar-name">
        <!--    用户头像-->
        <div class="user-avatar" style="cursor: pointer">
          <el-avatar :src="url" />
        </div>
        <div class="user-name">{{ username }}</div>
      </div>
      <div class="likes" style="cursor: pointer">
        <el-icon><Star /></el-icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-box {
  width: 100px;
  background: #fff;
  border-radius: 10px;
  @include flex-column;
}

.defaultImage {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;

    transition:
      transform 0.3s ease,
      filter 0.3s ease;
  }

  .hover-overlay {
    position: absolute;
    inset: 0;
    // 轻微渐变+淡淡暗化，仍能清晰看见图片
    background: rgb(0 0 0 / 0.3);
    opacity: 0;
    transition:
      opacity 0.3s ease,
      backdrop-filter 0.3s ease;
    cursor: pointer;
  }

  &:hover .hover-overlay {
    opacity: 1;
  }
}

.title {
  width: 100%;
  margin: 6px 0;
  text-align: left;
}

.user-info {
  width: 100%;
  padding: 4px 4px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .user-avatar-name {
    width: 60%;
    display: flex;
    align-items: center;

    .user-name {
      font-size: 14px;
      cursor: pointer;
      margin-left: 10px;
    }
  }
}
</style>
