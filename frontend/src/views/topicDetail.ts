import { onMounted } from 'vue'
import api from '@/api'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const useTopicDetail = () => {
  const route = useRoute()
  const topicDetailData = ref([])

  const topicDetailFn = async () => {
    const res = await api.topic.getTopicDetail(route.params.id)
    topicDetailData.value = res.data.data.list
    console.log(topicDetailData.value, 888)
  }

  onMounted(async () => {
    await topicDetailFn()
  })
  return {
    topicDetailData,
  }
}
