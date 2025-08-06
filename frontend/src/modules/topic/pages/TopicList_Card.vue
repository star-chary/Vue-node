<!--<script setup lang="ts">-->
<!--// UI-->
<!--import Card_Box from '@/modules/topic/components/Card_Box.vue'-->

<!--// 逻辑-->
<!--import { useTopicList_Card } from '@/modules/topic/composables/useTopicList_Card.ts'-->

<!--const { topicList } = useTopicList_Card()-->

<!--const containerRef = ref<HTMLElement>()-->

<!--onMounted(async () => {-->
<!--  await nextTick()-->
<!--  if (containerRef.value) {-->
<!--    // 获取最外层盒子的宽度-->
<!--    const containerWidth = containerRef.value.clientWidth-->
<!--    const cards = containerRef.value.querySelectorAll('.card-item')-->
<!--    console.log(cards, 222)-->
<!--  }-->
<!--})-->
<!--</script>-->

<!--<template>-->
<!--  <div class="waterfall-container" ref="containerRef">-->
<!--    <template v-for="item in topicList" :key="item._id">-->
<!--      <div class="card-item" ref="boxWidthRef">-->
<!--        <Card_Box-->
<!--          :title="item.title"-->
<!--          :username="item.author_name"-->
<!--          :cover_img="item.cover_image?.url || ''"-->
<!--          :image-height="item.cover_image?.height || 260"-->
<!--          :image-width="item.cover_image?.width || 260"-->
<!--        />-->
<!--      </div>-->
<!--    </template>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped lang="scss">-->
<!--.waterfall-container {-->
<!--  padding: 20px;-->
<!--  position: relative;-->
<!--}-->

<!--.card-box {-->
<!--  float: left;-->
<!--}-->
<!--</style>-->

<script setup lang="ts">
// UI
import Card_Box from '@/modules/topic/components/Card_Box.vue'

// 逻辑
import { useTopicList_Card } from '@/modules/topic/composables/useTopicList_Card.ts'

const { topicList, moreGetTopicList, isEnd } = useTopicList_Card()

const containerRef = useTemplateRef('containerRef')

interface CardPosition {
  left: number
  top: number
  height: number
}

const cardPositions = ref<CardPosition[]>([])
const columnHeights = ref<number[]>([])

// 计算瀑布流布局
const calculateWaterfallLayout = () => {
  if (!containerRef.value) return

  const container = containerRef.value
  const containerWidth = container.clientWidth
  const cardWidth = 260
  const gap = 16

  // 计算列数
  const columnCount = Math.floor((containerWidth - 40) / (cardWidth + gap)) // 40是padding

  // 初始化列高度数组
  columnHeights.value = new Array(columnCount).fill(0)
  cardPositions.value = []

  // 获取所有卡片元素
  const cardElements = container.querySelectorAll('.card-item')

  cardElements.forEach((cardEl, index) => {
    const height = (cardEl as HTMLElement).offsetHeight

    // 找到最短的列
    const minHeightIndex = columnHeights.value.indexOf(Math.min(...columnHeights.value))

    // 计算位置
    const left = minHeightIndex * (cardWidth + gap)
    const top = columnHeights.value[minHeightIndex]

    cardPositions.value.push({
      left,
      top,
      height,
    })

    // 更新该列的高度
    columnHeights.value[minHeightIndex] += height + gap

    // 应用位置样式
    const cardElement = cardEl as HTMLElement
    cardElement.style.position = 'absolute'
    cardElement.style.left = `${left}px`
    cardElement.style.top = `${top}px`
    cardElement.style.width = `${cardWidth}px`
  })

  // 设置容器高度
  const maxHeight = Math.max(...columnHeights.value)
  container.style.height = `${maxHeight}px`
  console.log(isEnd.value, columnHeights.value, 111)
  if (isEnd.value) {
    // for (let i = 0; i < columnHeights.value.length; i++) {
    //   console.log(columnHeights.value[i])
    //   const card = document.querySelector('.card-item')
    //   const addCard = docut.createElement('div')
    //   card?.appendChild(addCard)
    //   addCard.style.width = '300px'
    //   addCard.style.height = `${maxHeight - columnHeights.value[i]} px`
    //   addCard.style.position = 'absolute'
    //   addCard.style.background = 'red'
    //   addCard.style.left = `${i * (cardWidth + gap)}px`
    //   addCard.style.top = `${columnHeights.value[i]}px`
    //   console.log(card, 22)
    // }
  }
}

const initLayout = async () => {
  await nextTick()
  // 等待图片加载完成后再计算布局
  setTimeout(() => {
    calculateWaterfallLayout()
  }, 100)
}

onMounted(() => {
  initLayout()
})

// 监听数据变化
watch(
  topicList,
  () => {
    initLayout()
  },
  { flush: 'post' },
)

// 监听窗口大小变化
const handleResize = () => {
  calculateWaterfallLayout()
}
// 防抖
const debounce = (fn: Function, delay: number) => {
  let timer: number | null = null
  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// 获取列表
const handleGetTopicList = debounce(async () => {
  const scrollTop = window.scrollY
  const clientHeight = document.documentElement.clientHeight
  const scrollHeight = document.documentElement.scrollHeight
  if (scrollTop + clientHeight >= scrollHeight - 100) {
    await moreGetTopicList()
    if (isEnd) {
      calculateWaterfallLayout()
    }
  }
}, 300)

onMounted(() => {
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleGetTopicList)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleGetTopicList)
})
</script>

<template>
  <div class="waterfall-container" ref="containerRef">
    <template v-for="item in topicList" :key="item._id">
      <div class="card-item">
        <Card_Box
          :title="item.title"
          :username="item.author_name"
          :cover_img="item.cover_image?.url || ''"
          :image-height="item.cover_image?.height || 260"
          :image-width="item.cover_image?.width || 260"
        />
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.waterfall-container {
  padding: 20px;
  position: relative;
  height: 100%;
}

.card-item {
  transition: all 0.3s ease;
}
</style>
