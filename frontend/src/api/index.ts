// import * as user from './user'
import { userApi } from '@/api/modules/user'
import { topicApi } from '@/api/modules/topic'

// 统一导出所有 api
export default {
  user: userApi,
  topic: topicApi,
}
