import { onMounted } from 'vue'
import api from '@/api'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { authUtils } from '@/utils/auth.ts'

export const useTopicDetail = () => {
  const route = useRoute()
  const topicDetailData = ref([])
  // 用户信息
  const userInfo = JSON.parse(authUtils.getUserInfo('userInfo'))
  const userId = userInfo.id
  const userName = userInfo.username

  // 评论内容
  const comment_content = ref('')
  // 获取文章详情
  const topicDetailFn = async () => {
    const id = route.params.id || ''
    const res = await api.topic.getTopicDetail(route.params.id)
    topicDetailData.value = res.data.data
  }

  // 获取文章评论
  const commentList = ref([]) // 文章评论列表
  const getCommentList = async () => {
    const res = await api.comment.getComment({
      topic_id: route.params.id,
    })
    commentList.value = res.data.data
  }

  // 发表评论
  const handleComment = async () => {
    const res = await api.comment.createComment({
      comment_content: comment_content.value, // 评论内容
      topic_id: route.params.id, // 文章id
      author_id: userId, // 用户id
      author_name: userName, // 用户名
    })
    await getCommentList()
    comment_content.value = ''
  }
  onMounted(async () => {
    await topicDetailFn()
    await getCommentList()
  })
  return {
    topicDetailData,
    comment_content,
    commentList,
    handleComment,
  }
}
