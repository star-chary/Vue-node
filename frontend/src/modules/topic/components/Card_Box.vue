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
})

const base_img_url = 'http://localhost:7001'
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
</script>

<template>
  <div class="card-box">
    <div class="avatar" :style="{ height: `${calculateImageHeight}px` }">
      <img :src="url" alt="" />
    </div>
    <div class="title">{{ title }}</div>
    <div class="user-info">
      <div class="user-avatar-name">
        <div>
          <el-avatar :src="cover_img" />
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
  width: 260px;
  height: auto;
  background: gray;
  border-radius: 10px;
  @include flex-column;
  margin-bottom: 16px;
}

.avatar {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.user-info {
  width: 100%;
  padding: 10px 10px;
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
