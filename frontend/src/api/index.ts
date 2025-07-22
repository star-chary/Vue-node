// import * as user from './user'
import { userApi } from '@/modules/loginAndLogout/api/user.ts'
import { topicApi } from '@/modules/topic/api/topic.ts'
// 评论
import { commentApi } from '@/modules/topic/api/comment.ts'

// 统一导出所有 api
export default {
  user: userApi,
  topic: topicApi,
  comment: commentApi,
}
