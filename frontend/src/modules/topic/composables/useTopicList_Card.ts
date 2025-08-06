import api from '@/api'
import { defaultPage } from '@/constants/common'
import type { Page, TopicListItem } from '@/types'

export const useTopicList_Card = () => {
  // 文章列表
  const topicList = ref<TopicListItem[]>([])
  // 获取文章
  const pageNum = ref(1)
  // 初始参数
  const page = reactive<Page>({
    page: 1,
    pageSize: 10,
  })
  // 如果加载完毕，或者没有数据
  const isEnd = ref(false)
  // 发起获取列表请求
  const getTopicList = async (isMore = false) => {
    // 如果是第一次加载
    if (!isMore) {
      isEnd.value = false
      const res = await api.topic.getTopicList({
        page: page.page,
        pageSize: page.pageSize,
      })
      topicList.value = res.data.data.list
    } else {
      page.page += 1
      const res = await api.topic.getTopicList({
        page: page.page,
        pageSize: page.pageSize,
      })
      // 如果没有数据了
      if (res.data.data.list.length === 0) {
        isEnd.value = true
        return
      } else {
        isEnd.value = false
      }

      pageNum.value += 1
      topicList.value = [...topicList.value, ...res.data.data.list]
    }
  }

  const moreGetTopicList = async () => {
    if (isEnd.value) {
      page.page = pageNum.value
      return
    }
    await getTopicList(true)
  }

  onMounted(async () => {
    await getTopicList()
  })
  return {
    topicList,
    getTopicList,
    page,
    pageNum,
    moreGetTopicList,
    isEnd,
  }
}

// import api from '@/api'
// import { defaultPage } from '@/constants/common'
// import type { Page, TopicListItem } from '@/types'
//
// export const useTopicList_Card = () => {
//   // 文章列表
//   const topicList = ref<TopicListItem[]>([])
//
//   // 分页管理
//   const pageNum = ref(1)
//   const page = reactive<Page>({
//     page: 1, // 初始化为1
//     pageSize: 10,
//   })
//
//   // 加载状态
//   const isLoading = ref(false)
//   const hasMore = ref(true) // 是否还有更多数据
//
//   // 获取文章列表
//   const getTopicList = async (isLoadMore = false) => {
//     if (isLoading.value) {
//       console.log('正在加载中，跳过请求')
//       return
//     }
//
//     isLoading.value = true
//
//     try {
//       console.log('请求参数:', { page: page.page, pageSize: page.pageSize })
//
//       const res = await api.topic.getTopicList({
//         page: page.page,
//         pageSize: page.pageSize,
//       })
//
//       const newData = res.data.data.list
//       console.log('获取到新数据:', newData.length, '条')
//
//       if (isLoadMore) {
//         // 加载更多：追加数据
//         topicList.value = [...topicList.value, ...newData]
//         console.log('追加后总数据:', topicList.value.length)
//       } else {
//         // 首次加载：替换数据
//         topicList.value = newData
//         console.log('首次加载数据:', topicList.value.length)
//       }
//
//       // 判断是否还有更多数据
//       if (newData.length < page.pageSize) {
//         hasMore.value = false
//         console.log('没有更多数据了')
//       }
//
//     } catch (error) {
//       console.error('获取文章列表失败:', error)
//     } finally {
//       isLoading.value = false
//     }
//   }
//
//   // 加载更多数据
//   const loadMore = async () => {
//     if (!hasMore.value || isLoading.value) {
//       console.log('无法加载更多:', { hasMore: hasMore.value, isLoading: isLoading.value })
//       return
//     }
//
//     // 递增页码
//     page.page += 1
//     pageNum.value = page.page
//
//     console.log('加载第', page.page, '页')
//     await getTopicList(true) // true 表示是加载更多
//   }
//
//   onMounted(async () => {
//     console.log('初始化加载数据')
//     await getTopicList(false) // false 表示是首次加载
//   })
//
//   return {
//     topicList,
//     getTopicList,
//     loadMore, // 新增加载更多方法
//     page,
//     pageNum,
//     isLoading,
//     hasMore,
//   }
// }
