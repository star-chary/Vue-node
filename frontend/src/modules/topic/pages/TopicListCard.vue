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
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import MasonryWall from '@yeger/vue-masonry-wall'
import api from '@/api'
import { debounce } from '@/utils/debounce.ts'
import Loading from '@/components/Loading.vue'
import Card_Box from '@/modules/topic/components/Card_Box.vue'
import NoteDetailDialog from '@/components/NoteDetailDialog.vue'
import Note from '@/components/Note.vue'

const router = useRouter()
const route = useRoute()
const photos = ref<any[]>([])
let page = 1
let pageSize = 10
const loading = ref(false)
const finish = ref(false)
const scrollContainer = ref<HTMLElement | null>(null)

// 详情弹层状态
const showDetail = ref(false)
const activeId = ref<string>('')
// 详情
const detailData = ref<any>({})
// 打开详情页
const openDetail = async (id: string) => {
  // activeId.value = id
  // showDetail.value = true
  // // 可选：锁定背景滚动
  // document.body.style.overflow = 'hidden'
  // const res = await api.topic.getTopicDetail(id)
  // detailData.value = res.data.data

  // 如果路由里不是当前 id，则同步到 /topicListCard/:id（避免重复 push）
  if (route.params.id !== id) {
    router.replace({ name: 'topicListCard', params: { id } })
  }
  activeId.value = id
  showDetail.value = true
  document.body.style.overflow = 'hidden'
  const res = await api.topic.getTopicDetail(id)
  detailData.value = res.data.data
}

const closeDetail = () => {
  // router.push({ path: 'topicListCard' })
  showDetail.value = false
  activeId.value = ''
  document.body.style.overflow = ''
  // 用 replace 回到无 id 的列表，避免产生额外历史记录
  router.replace({ name: 'topicListCard', params: {} })
}

// 追加数据时：记录并恢复滚动位置
const fetchArticleList = async (params?: object) => {
  if (loading.value || finish.value) return
  loading.value = true
  try {
    const el = scrollContainer.value
    const prevScrollTop = el?.scrollTop ?? 0

    const res = await api.topic.getTopicList(params)
    const list = res.data?.data?.list ?? []

    // 可选：如果后端没有更多了，设置 finish
    if (!Array.isArray(list) || list.length === 0) {
      finish.value = true
      loading.value = false
      return
    }

    // 关键：用新数组引用，避免组件内部侦测不到变更
    photos.value = [...photos.value, ...list]

    // 等待 DOM 和瀑布流重排完成，然后恢复滚动位置
    await nextTick()
    if (el) {
      el.scrollTop = prevScrollTop
      // 如果还有图片加载导致后续高度变化，可再多等一帧
      requestAnimationFrame(() => {
        el.scrollTop = prevScrollTop
      })
    }
  } catch (error) {
    console.error('Error fetching article list:', error)
  } finally {
    loading.value = false
  }
}

const handleScroll = debounce(() => {
  const el = scrollContainer.value
  if (!el || loading.value || finish.value) return
  const { scrollTop, clientHeight, scrollHeight } = el
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    page += 1
    fetchArticleList({ page, pageSize })
  }
}, 200)

onMounted(async () => {
  await fetchArticleList({ page, pageSize })
  // 初次进入，若路由带了 :id，自动打开
  const initialId = route.params.id as string | undefined
  console.log(initialId, 88)
  if (initialId) {
    openDetail(initialId)
  }

  scrollContainer.value?.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  scrollContainer.value?.removeEventListener('scroll', handleScroll)
})

// 路由参数变化时，同步弹层开关
// watch(
//   () => route.params.id,
//   (id) => {
//     const val = (id as string | undefined) ?? ''
//     if (val) {
//       // 若已打开且是同一个 id，不重复拉取
//       if (!showDetail.value || activeId.value !== val) {
//         openDetail(val)
//       }
//     } else if (showDetail.value) {
//       // 去掉 id 时，关闭弹层
//       closeDetail()
//     }
//   },
// )
</script>

<template>
  <div class="water-box" ref="scrollContainer">
    <MasonryWall :items="photos" :item-key="'_id'" :column-width="240" :gap="16" :rtl="false">
      <template #default="{ item: p }">
        <Card_Box
          :cover_img="p.cover_image?.url ?? ''"
          :title="p.title ?? '默认标题'"
          :username="p.author_name ?? '默认用户名'"
          :image-height="p.cover_image?.height ?? 200"
          :image-width="p.cover_image?.width ?? 200"
          :id="p._id"
          style="width: 100%"
          @open-detail="openDetail"
        />
      </template>
    </MasonryWall>
    <Loading v-if="loading"></Loading>
    <div v-if="finish" style="text-align: center; padding: 10px">没有更多了...</div>
  </div>

  <!-- 用 Teleport 把弹层挂到 body，避免被父层裁剪/影响层级 -->
  <Teleport to="body">
    <NoteDetailDialog
      v-if="showDetail"
      :id="activeId"
      @close="closeDetail"
      :detail-data="detailData"
    />
  </Teleport>
</template>

<style scoped lang="scss">
.water-box {
  width: 100%;
  height: 100%;
  padding: 24px;
  box-sizing: border-box;
  overflow-y: auto;
  will-change: transform; /* 提示 GPU 合成，滚动更平滑 */
  background-color: var(--bg-color);
}
/* 可选：仅当卡片滚动时会做 transform/opacity 动画时 */
.card-box {
  contain: content; /* 限制重绘影响范围，现代浏览器支持良好 */
  content-visibility: auto; /* 只渲染视口附近内容（Chromium） */
  contain-intrinsic-size: 400px 300px; /* 给出近似占位，避免布局跳动 */
}
</style>
