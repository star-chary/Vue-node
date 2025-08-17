<!--<script setup lang="ts">-->
<!--import justifiedLayout from 'justified-layout'-->
<!--import { ref, onMounted } from 'vue'-->
<!--import api from '@/api'-->
<!--import Card_Box from '@/modules/topic/components/Card_Box.vue'-->

<!--const photos = ref([])-->

<!--const boxes = ref<any[]>([])-->
<!--const containerWidth = ref(0)-->

<!--const layout = () => {-->
<!--  const ratios = photos.value.map((p) => p.cover_image.width / p.cover_image.height)-->
<!--  console.log(ratios, 2)-->
<!--  const geometry = justifiedLayout(ratios, {-->
<!--    containerWidth: containerWidth.value,-->
<!--    // targetRowHeight: 250, // 每行目标高度，可调-->
<!--    containerPadding: {-->
<!--      top: 10,-->
<!--      right: 50,-->
<!--      bottom: 0,-->
<!--      left: 10,-->
<!--    },-->
<!--    boxSpacing: 10,-->
<!--  })-->
<!--  console.log(geometry, 3)-->
<!--  boxes.value = geometry.boxes-->
<!--}-->

<!--const fetchArticleList = async () => {-->
<!--  try {-->
<!--    const res = await api.topic.getTopicList()-->
<!--    photos.value = res.data.data.list-->
<!--    console.log(res, 99)-->
<!--  } catch (error) {-->
<!--    console.error('Error fetching article list:', error)-->
<!--  }-->
<!--}-->

<!--onMounted(async () => {-->
<!--  await fetchArticleList()-->
<!--  containerWidth.value = document.getElementById('container')!.clientWidth-->
<!--  layout()-->
<!--  window.addEventListener('resize', () => {-->
<!--    containerWidth.value = document.getElementById('container')!.clientWidth-->
<!--    layout()-->
<!--  })-->
<!--})-->
<!--</script>-->

<!--<template>-->
<!--  <div id="container" style="position: relative">-->
<!--    <div v-for="(box, i) in boxes" :key="i" class="photo">-->
<!--      <Card_Box-->
<!--        :style="{-->
<!--          position: 'absolute',-->
<!--          top: box.top + 'px',-->
<!--          left: box.left + 'px',-->
<!--          width: box.width + 'px',-->
<!--          // width: '100px',-->
<!--          height: box.height + 'px',-->
<!--        }"-->
<!--        :cover_img="photos[i].cover_image.url"-->
<!--        :title="photos[i].title"-->
<!--        :username="photos[i].author_name"-->
<!--        :image-height="photos[i].cover_image.height"-->
<!--        :image-width="photos[i].cover_image.width"-->
<!--        :content="photos[i].content"-->
<!--      ></Card_Box>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--<style scoped lang="scss"></style>-->

<!--- vue3-masonry-wall 原生js版-->

<!--<script setup lang="ts">-->
<!--import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'-->
<!--import api from '@/api'-->
<!--import Card_Box from '@/modules/topic/components/Card_Box.vue'-->

<!--const photos = ref<any[]>([])-->

<!--const boxes = ref<any[]>([])-->
<!--const containerWidth = ref(0)-->
<!--const containerHeight = ref(0)-->
<!--const containerRef = ref<HTMLElement | null>(null)-->

<!--// Masonry 配置：等宽卡片-->
<!--const columnWidth = 240 // 每个卡片的目标宽度（可按需调整）-->
<!--const columnGap = 12    // 列间距-->

<!--const calcColumnCount = (width: number) => {-->
<!--  if (!width) return 0-->
<!--  // 计算能容纳的列数，至少 1 列-->
<!--  const count = Math.max(1, Math.floor((width + columnGap) / (columnWidth + columnGap)))-->
<!--  return count-->
<!--}-->

<!--const layout = () => {-->
<!--  if (!containerWidth.value || photos.value.length === 0) return-->

<!--  const cols = calcColumnCount(containerWidth.value)-->
<!--  const colHeights = new Array(cols).fill(0)-->

<!--  // 计算实际卡片宽度：在列数确定后，按 gap 分配剩余空间-->
<!--  const totalGaps = (cols - 1) * columnGap-->
<!--  const usable = containerWidth.value - totalGaps-->
<!--  const itemWidth = Math.floor(usable / cols) // 避免小数带来像素裂缝-->

<!--  const newBoxes: any[] = []-->

<!--  photos.value.forEach((p, i) => {-->
<!--    const w = p?.cover_image?.width || 1-->
<!--    const h = p?.cover_image?.height || 1-->
<!--    const ratio = w / h-->

<!--    // 等宽卡片，高度按比例-->
<!--    const width = itemWidth-->
<!--    const height = Math.round(width / ratio)-->

<!--    // 找到当前最短列-->
<!--    let minCol = 0-->
<!--    for (let c = 1; c < cols; c++) {-->
<!--      if (colHeights[c] < colHeights[minCol]) minCol = c-->
<!--    }-->

<!--    const left = minCol * (itemWidth + columnGap)-->
<!--    const top = colHeights[minCol]-->

<!--    newBoxes.push({ top, left, width, height, index: i })-->

<!--    // 更新该列高度-->
<!--    colHeights[minCol] += height + columnGap-->
<!--  })-->

<!--  boxes.value = newBoxes-->
<!--  containerHeight.value = Math.max(...colHeights, 0) - columnGap // 去掉最后一行多加的 gap-->
<!--}-->

<!--const fetchArticleList = async () => {-->
<!--  try {-->
<!--    const res = await api.topic.getTopicList()-->
<!--    photos.value = res.data.data.list-->
<!--  } catch (error) {-->
<!--    console.error('Error fetching article list:', error)-->
<!--  }-->
<!--}-->

<!--const handleResize = () => {-->
<!--  if (!containerRef.value) return-->
<!--  containerWidth.value = containerRef.value.clientWidth-->
<!--  layout()-->
<!--}-->

<!--onMounted(async () => {-->
<!--  await fetchArticleList()-->
<!--  await nextTick()-->
<!--  if (containerRef.value) {-->
<!--    containerWidth.value = containerRef.value.clientWidth-->
<!--  }-->
<!--  layout()-->
<!--  window.addEventListener('resize', handleResize)-->
<!--})-->

<!--onUnmounted(() => {-->
<!--  window.removeEventListener('resize', handleResize)-->
<!--})-->

<!--// 数据或容器宽度变化时，重新排版-->
<!--watch([photos, containerWidth], () => layout())-->
<!--</script>-->

<!--<template>-->
<!--  <div-->
<!--    id="container"-->
<!--    ref="containerRef"-->
<!--    :style="{ position: 'relative', height: containerHeight + 'px' }"-->
<!--  >-->
<!--    <div v-for="box in boxes" :key="box.index" class="photo">-->
<!--      <Card_Box-->
<!--        :style="{-->
<!--          position: 'absolute',-->
<!--          top: box.top + 'px',-->
<!--          left: box.left + 'px',-->
<!--          width: box.width + 'px',-->
<!--          height: box.height + 'px'-->
<!--        }"-->
<!--        :cover_img="photos[box.index].cover_image.url"-->
<!--        :title="photos[box.index].title"-->
<!--        :username="photos[box.index].author_name"-->
<!--        :image-height="photos[box.index].cover_image.height"-->
<!--        :image-width="photos[box.index].cover_image.width"-->
<!--        :content="photos[box.index].content"-->
<!--      />-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--<style scoped lang="scss"></style>-->

<!--- vue3-masonry-wall 库版-->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/api'
import Card_Box from '@/modules/topic/components/Card_Box.vue'
import MasonryWall from '@yeger/vue-masonry-wall'

const photos = ref<any[]>([])

const fetchArticleList = async () => {
  try {
    const res = await api.topic.getTopicList()
    photos.value = res.data.data.list
  } catch (error) {
    console.error('Error fetching article list:', error)
  }
}

onMounted(async () => {
  await fetchArticleList()
})
</script>

<template>
  <MasonryWall :items="photos" :column-width="240" :gap="12" :rtl="false">
    <template #default="{ item: p, index: i }">
      <Card_Box
        :cover_img="p.cover_image.url"
        :title="p.title"
        :username="p.author_name"
        :image-height="p.cover_image.height"
        :image-width="p.cover_image.width"
        :content="p.content"
        style="width: 100%"
      />
    </template>
  </MasonryWall>
</template>
<style scoped lang="scss"></style>
